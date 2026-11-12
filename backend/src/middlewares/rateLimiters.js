import rateLimit from "express-rate-limit";

/**
 * IP-level throttles. These sit in front of the per-account limits in the
 * controller and do a different job: the controller stops one address being
 * spammed, these stop one host walking through many addresses.
 *
 * Keyed by IP, never by email — a 429 that depended on the address would tell
 * an attacker which addresses exist, which is exactly what the generic
 * responses in authController are there to prevent.
 *
 * The default store is in-process memory, so counters are per instance. Running
 * more than one replica means swapping in a shared store (e.g. Redis) or the
 * effective limit multiplies by the replica count.
 */
const baseOptions = {
  standardHeaders: "draft-7",
  legacyHeaders: false,
};

const tooMany = (message) => (req, res) => res.status(429).json({ message });

export const forgotPasswordLimiter = rateLimit({
  ...baseOptions,
  windowMs: 60 * 60 * 1000,
  limit: 10,
  handler: tooMany("Too many password reset requests. Please try again later."),
});

export const verifyOtpLimiter = rateLimit({
  ...baseOptions,
  windowMs: 15 * 60 * 1000,
  limit: 20,
  handler: tooMany("Too many verification attempts. Please try again later."),
});

export const resetPasswordLimiter = rateLimit({
  ...baseOptions,
  windowMs: 60 * 60 * 1000,
  limit: 20,
  handler: tooMany("Too many reset attempts. Please try again later."),
});

// Ask Parasmani: every question can cost an API call. A short-window cap stops
// a script hammering the endpoint; a daily cap bounds what one address can
// spend. Generous enough that a real visitor never sees them.
export const askBurstLimiter = rateLimit({
  ...baseOptions,
  windowMs: 10 * 60 * 1000,
  limit: Number.parseInt(process.env.ASK_LIMIT_10MIN ?? "", 10) || 20,
  handler: tooMany("You've asked a lot of questions in a short time. Please wait a few minutes, or contact our sales team directly."),
});

export const askDailyLimiter = rateLimit({
  ...baseOptions,
  windowMs: 24 * 60 * 60 * 1000,
  limit: Number.parseInt(process.env.ASK_LIMIT_DAY ?? "", 10) || 100,
  handler: tooMany("You've reached today's question limit. Our sales team can help you directly."),
});

// Login had no brute-force ceiling at all; failed sign-ins are what matter, so
// successful ones are not counted against the limit.
export const loginLimiter = rateLimit({
  ...baseOptions,
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  handler: tooMany("Too many login attempts. Please try again later."),
});
