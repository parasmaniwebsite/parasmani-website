import crypto from "crypto";
import bcrypt from "bcryptjs";

export const OTP_LENGTH = 6;

// How long a code stays valid once emailed.
export const OTP_TTL_MS = 10 * 60 * 1000;

// Wrong guesses allowed against a single code before it is burned.
export const MAX_OTP_ATTEMPTS = 5;

// Minimum gap between two "send me a code" requests for the same address.
export const RESEND_COOLDOWN_MS = 60 * 1000;

// Ceiling on codes issued to one address per hour.
export const MAX_OTP_REQUESTS_PER_HOUR = 5;

// Window the user gets to choose a new password after the code is verified.
export const RESET_TOKEN_TTL_MS = 15 * 60 * 1000;

export const PASSWORD_MIN_LENGTH = 8;

// bcrypt silently ignores anything past 72 bytes, so a longer password would
// give the user false confidence. Reject instead of truncating.
export const PASSWORD_MAX_BYTES = 72;

const OTP_CEILING = 10 ** OTP_LENGTH;

/**
 * crypto.randomInt is a CSPRNG with no modulo bias — never use Math.random for
 * anything an attacker would like to predict.
 */
export const generateOtp = () =>
  String(crypto.randomInt(0, OTP_CEILING)).padStart(OTP_LENGTH, "0");

// Codes are only 6 digits, so a leaked database of fast hashes would be trivial
// to reverse. bcrypt keeps that brute force expensive for the code's short life.
export const hashOtp = (otp) => bcrypt.hash(otp, 10);

export const compareOtp = (otp, hash) => bcrypt.compare(otp, hash);

// 256 bits of entropy, so a plain SHA-256 at rest is enough — there is nothing
// to brute force, and it keeps token lookup a single indexed query.
export const generateResetToken = () => crypto.randomBytes(32).toString("hex");

export const hashResetToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const isValidOtpFormat = (value) =>
  typeof value === "string" && new RegExp(`^\\d{${OTP_LENGTH}}$`).test(value);
