import dotenv from "dotenv";
dotenv.config();

import resend from "./resend.js";
import { OTP_TTL_MS } from "./otp.js";

const APP_NAME = process.env.APP_NAME || "Parasmani Copper";

// resend.dev is Resend's shared sandbox sender. It only delivers to the address
// that owns the API key, so production must set MAIL_FROM to a verified domain.
const MAIL_FROM = process.env.MAIL_FROM || "onboarding@resend.dev";

const NAVY = "#18234D";
const COPPER = "#C68344";
const OTP_TTL_MINUTES = Math.round(OTP_TTL_MS / 60000);

/**
 * Sends through Resend and reports success as a boolean rather than throwing,
 * so callers can decide whether a delivery failure should surface to the user.
 * Errors are logged here and never bubble the OTP into a log line.
 */
const send = async ({ to, subject, html, text }) => {
  if (!resend) {
    console.warn(`Email skipped (no RESEND_API_KEY): "${subject}" to ${to}`);
    return false;
  }

  try {
    // The SDK resolves rather than throws on API errors, so check `error`.
    const { data, error } = await resend.emails.send({
      from: `${APP_NAME} <${MAIL_FROM}>`,
      to,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("Resend rejected email:", error);
      return false;
    }

    console.log(`Email sent (${subject}) id=${data?.id}`);
    return true;
  } catch (error) {
    console.error("Resend request failed:", error);
    return false;
  }
};

const layout = (heading, body) => `
  <div style="margin:0;padding:24px;background:#F4F5F7;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;margin:0 auto;background:#FFFFFF;border-radius:12px;overflow:hidden;">
      <tr>
        <td style="background:${NAVY};padding:24px 32px;">
          <p style="margin:0;color:#FFFFFF;font-size:18px;font-weight:bold;letter-spacing:0.4px;">${APP_NAME}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:32px;">
          <h1 style="margin:0 0 16px;color:${NAVY};font-size:20px;">${heading}</h1>
          ${body}
        </td>
      </tr>
      <tr>
        <td style="padding:20px 32px;background:#F4F5F7;color:#6B7280;font-size:12px;line-height:18px;">
          This is an automated message from ${APP_NAME}. Please do not reply to it.
        </td>
      </tr>
    </table>
  </div>
`;

/**
 * Nothing user-supplied is interpolated into these templates — the only dynamic
 * value is the server-generated code — so there is no HTML injection surface.
 */
export const sendPasswordResetOtp = async ({ to, otp }) => {
  const html = layout(
    "Reset your password",
    `
      <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:23px;">
        Use the verification code below to reset your ${APP_NAME} admin password.
      </p>
      <p style="margin:0 0 20px;padding:16px;background:#FBF5EF;border:1px solid ${COPPER};border-radius:8px;color:${NAVY};font-size:30px;font-weight:bold;letter-spacing:8px;text-align:center;">
        ${otp}
      </p>
      <p style="margin:0 0 8px;color:#374151;font-size:15px;line-height:23px;">
        The code expires in ${OTP_TTL_MINUTES} minutes and can only be used once.
      </p>
      <p style="margin:0;color:#6B7280;font-size:13px;line-height:20px;">
        If you did not request a password reset, you can safely ignore this email — your password will not change.
      </p>
    `,
  );

  const text = [
    `Use this verification code to reset your ${APP_NAME} admin password: ${otp}`,
    `The code expires in ${OTP_TTL_MINUTES} minutes and can only be used once.`,
    "If you did not request a password reset, you can safely ignore this email.",
  ].join("\n\n");

  return send({
    to,
    subject: `Your ${APP_NAME} password reset code`,
    html,
    text,
  });
};

/** Post-change notification — how a user finds out an attacker reset them. */
export const sendPasswordChangedNotice = async ({ to }) => {
  const html = layout(
    "Your password was changed",
    `
      <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:23px;">
        The password for your ${APP_NAME} admin account was just changed, and you have been signed out everywhere.
      </p>
      <p style="margin:0;color:#6B7280;font-size:13px;line-height:20px;">
        If this wasn't you, reset your password again immediately and contact your administrator.
      </p>
    `,
  );

  const text = [
    `The password for your ${APP_NAME} admin account was just changed, and you have been signed out everywhere.`,
    "If this wasn't you, reset your password again immediately and contact your administrator.",
  ].join("\n\n");

  return send({
    to,
    subject: `Your ${APP_NAME} password was changed`,
    html,
    text,
  });
};
