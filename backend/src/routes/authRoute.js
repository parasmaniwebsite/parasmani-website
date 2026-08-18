import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getMe,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  forgotPasswordLimiter,
  verifyOtpLimiter,
  resetPasswordLimiter,
  loginLimiter,
} from "../middlewares/rateLimiters.js";

const router = express.Router();

router.post("/register", authMiddleware, registerAdmin);
router.post("/login", loginLimiter, loginAdmin);
router.get("/me", authMiddleware, getMe);

// Password reset runs in three steps: request a code, trade the code for a
// short-lived reset token, then set the new password with that token.
router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);
router.post("/verify-otp", verifyOtpLimiter, verifyResetOtp);
router.post("/reset-password", resetPasswordLimiter, resetPassword);

export default router;
