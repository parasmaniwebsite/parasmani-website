import Admin from "../models/admin.js";
import PasswordReset from "../models/PasswordReset.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  sendPasswordResetOtp,
  sendPasswordChangedNotice,
} from "../utils/sendEmail.js";

import {
  OTP_TTL_MS,
  MAX_OTP_ATTEMPTS,
  RESEND_COOLDOWN_MS,
  MAX_OTP_REQUESTS_PER_HOUR,
  RESET_TOKEN_TTL_MS,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_BYTES,
  generateOtp,
  hashOtp,
  compareOtp,
  generateResetToken,
  hashResetToken,
  isValidOtpFormat,
} from "../utils/otp.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normaliseEmail = (email) =>
  typeof email === "string" ? email.trim().toLowerCase() : "";

/**
 * Admin emails were not stored case-normalised, so match case-insensitively
 * rather than assuming the stored casing. Collation strength 2 is a
 * case-insensitive exact match — not a regex, so no injection surface.
 */
const findAdminByEmail = (email) =>
  Admin.findOne({ email }).collation({ locale: "en", strength: 2 });

// Every /forgot-password outcome returns this same body. Confirming whether an
// address is registered would turn the endpoint into an account enumerator.
const FORGOT_PASSWORD_RESPONSE = {
  message:
    "If that email is registered, a verification code has been sent to it.",
};

// Likewise, every failed verification looks identical from outside: unknown
// address, wrong code, expired code and burned code are indistinguishable.
const INVALID_OTP_RESPONSE = {
  message: "Invalid or expired verification code.",
};

const validatePassword = (password) => {
  if (typeof password !== "string" || password.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`;
  }

  if (Buffer.byteLength(password, "utf8") > PASSWORD_MAX_BYTES) {
    return `Password must be at most ${PASSWORD_MAX_BYTES} bytes long.`;
  }

  return null;
};

export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Admin registered",
      admin,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * The signed-in admin's own record. The JWT carries only an id, so the admin
 * UI needs this to know which address a reset code would be sent to.
 * authMiddleware has already loaded and verified the account.
 */
export const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      admin: {
        _id: req.admin._id,
        email: req.admin.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Step 1 — email a one-time code.
 *
 * Always answers with FORGOT_PASSWORD_RESPONSE. Unknown address, throttled
 * address and successful send are deliberately indistinguishable, so this
 * cannot be used to discover which emails have admin accounts.
 */
export const forgotPassword = async (req, res) => {
  try {
    const email = normaliseEmail(req.body?.email);

    if (!EMAIL_PATTERN.test(email)) {
      return res.status(400).json({
        message: "A valid email address is required.",
      });
    }

    const admin = await findAdminByEmail(email);

    if (!admin) {
      return res.status(200).json(FORGOT_PASSWORD_RESPONSE);
    }

    const now = new Date();
    const windowStart = new Date(now.getTime() - 60 * 60 * 1000);

    const recentRequests = await PasswordReset.find({
      email,
      createdAt: { $gte: windowStart },
    })
      .sort({ createdAt: -1 })
      .select("createdAt")
      .lean();

    const lastRequest = recentRequests[0];

    // Throttled callers get the normal response with no email sent. Returning
    // 429 here would leak that the address is registered.
    if (recentRequests.length >= MAX_OTP_REQUESTS_PER_HOUR) {
      console.warn(`Password reset hourly cap reached for ${email}`);
      return res.status(200).json(FORGOT_PASSWORD_RESPONSE);
    }

    if (
      lastRequest &&
      now.getTime() - new Date(lastRequest.createdAt).getTime() <
        RESEND_COOLDOWN_MS
    ) {
      console.warn(`Password reset cooldown active for ${email}`);
      return res.status(200).json(FORGOT_PASSWORD_RESPONSE);
    }

    // Only the newest code may ever be valid.
    await PasswordReset.updateMany(
      { admin: admin._id, consumedAt: null },
      { $set: { consumedAt: now } },
    );

    const otp = generateOtp();

    const record = await PasswordReset.create({
      admin: admin._id,
      email,
      otpHash: await hashOtp(otp),
      otpExpiresAt: new Date(now.getTime() + OTP_TTL_MS),
    });

    const delivered = await sendPasswordResetOtp({ to: admin.email, otp });

    if (!delivered) {
      // Drop the row so the failed attempt does not eat the user's quota and a
      // retry starts clean. The response stays generic either way.
      await PasswordReset.deleteOne({ _id: record._id });
      console.error(`Failed to deliver password reset code to ${email}`);
    }

    return res.status(200).json(FORGOT_PASSWORD_RESPONSE);
  } catch (error) {
    console.error("forgotPassword failed:", error);
    return res.status(500).json({
      message: "Unable to process the request. Please try again later.",
    });
  }
};

/**
 * Step 2 — exchange a valid code for a single-use reset token.
 *
 * Keeping this separate from the reset itself means the code is burned the
 * moment it is used, the user learns immediately that it was wrong, and the
 * new password never travels in the same request as the emailed secret.
 */
export const verifyResetOtp = async (req, res) => {
  try {
    const email = normaliseEmail(req.body?.email);
    const { otp } = req.body ?? {};

    if (!EMAIL_PATTERN.test(email) || !isValidOtpFormat(otp)) {
      return res.status(400).json(INVALID_OTP_RESPONSE);
    }

    const now = new Date();

    const candidate = await PasswordReset.findOne({
      email,
      consumedAt: null,
      otpHash: { $ne: null },
      otpExpiresAt: { $gt: now },
    })
      .sort({ createdAt: -1 })
      .select("_id");

    if (!candidate) {
      return res.status(400).json(INVALID_OTP_RESPONSE);
    }

    // Charge the attempt before checking it. Incrementing first means parallel
    // guesses can never slip past the cap the way a read-then-write would.
    const record = await PasswordReset.findOneAndUpdate(
      {
        _id: candidate._id,
        consumedAt: null,
        otpExpiresAt: { $gt: now },
        attempts: { $lt: MAX_OTP_ATTEMPTS },
      },
      { $inc: { attempts: 1 } },
      { new: true },
    );

    if (!record) {
      return res.status(400).json(INVALID_OTP_RESPONSE);
    }

    const matches = await compareOtp(otp, record.otpHash);

    if (!matches) {
      if (record.attempts >= MAX_OTP_ATTEMPTS) {
        await PasswordReset.updateOne(
          { _id: record._id, consumedAt: null },
          { $set: { consumedAt: new Date() } },
        );
      }

      return res.status(400).json(INVALID_OTP_RESPONSE);
    }

    const resetToken = generateResetToken();

    // Clearing otpHash in the same conditional update makes verification a
    // single-winner operation: a replay finds otpHash already null.
    const verified = await PasswordReset.findOneAndUpdate(
      { _id: record._id, consumedAt: null, otpHash: { $ne: null } },
      {
        $set: {
          otpHash: null,
          verifiedAt: new Date(),
          resetTokenHash: hashResetToken(resetToken),
          resetTokenExpiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
        },
      },
      { new: true },
    );

    if (!verified) {
      return res.status(400).json(INVALID_OTP_RESPONSE);
    }

    return res.status(200).json({
      message: "Verification successful.",
      resetToken,
      expiresInSeconds: Math.floor(RESET_TOKEN_TTL_MS / 1000),
    });
  } catch (error) {
    console.error("verifyResetOtp failed:", error);
    return res.status(500).json({
      message: "Unable to process the request. Please try again later.",
    });
  }
};

/** Step 3 — set the new password using the token from step 2. */
export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body ?? {};

    if (typeof resetToken !== "string" || resetToken.length === 0) {
      return res.status(400).json({
        message: "Invalid or expired reset token.",
      });
    }

    const passwordError = validatePassword(newPassword);

    // Checked before the token is spent, so a weak password is a retry rather
    // than a restart of the whole flow.
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    const now = new Date();

    const record = await PasswordReset.findOne({
      resetTokenHash: hashResetToken(resetToken),
      consumedAt: null,
      resetTokenExpiresAt: { $gt: now },
    });

    if (!record) {
      return res.status(400).json({
        message: "Invalid or expired reset token.",
      });
    }

    const admin = await Admin.findById(record.admin);

    if (!admin) {
      await PasswordReset.updateOne(
        { _id: record._id },
        { $set: { consumedAt: now } },
      );

      return res.status(400).json({
        message: "Invalid or expired reset token.",
      });
    }

    if (await bcrypt.compare(newPassword, admin.password)) {
      return res.status(400).json({
        message: "New password must be different from the current password.",
      });
    }

    // Conditional consume — whichever request wins gets to change the password,
    // any concurrent duplicate falls through to the invalid-token branch.
    const consumed = await PasswordReset.findOneAndUpdate(
      { _id: record._id, consumedAt: null },
      { $set: { consumedAt: now } },
    );

    if (!consumed) {
      return res.status(400).json({
        message: "Invalid or expired reset token.",
      });
    }

    admin.password = await bcrypt.hash(newPassword, 10);

    // JWT `iat` is whole seconds, rounded down, so back-date by a second to
    // avoid revoking a token minted inside the same second as the reset.
    admin.passwordChangedAt = new Date(Date.now() - 1000);

    await admin.save();

    // Any other in-flight reset for this admin is now meaningless.
    await PasswordReset.updateMany(
      { admin: admin._id, consumedAt: null },
      { $set: { consumedAt: new Date() } },
    );

    // Best-effort: the password is already changed, so a mail failure must not
    // turn a successful reset into an error for the user.
    sendPasswordChangedNotice({ to: admin.email }).catch((error) =>
      console.error("Password change notice failed:", error),
    );

    return res.status(200).json({
      message: "Password reset successfully. Please sign in again.",
    });
  } catch (error) {
    console.error("resetPassword failed:", error);
    return res.status(500).json({
      message: "Unable to process the request. Please try again later.",
    });
  }
};