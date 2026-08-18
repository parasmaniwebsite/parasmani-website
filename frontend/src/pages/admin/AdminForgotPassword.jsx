import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import api from "../../utils/serviceAPI";

// Matches RESEND_COOLDOWN_MS on the server; sending sooner is silently ignored.
const RESEND_COOLDOWN_SECONDS = 60;

// Matches PASSWORD_MIN_LENGTH on the server.
const PASSWORD_MIN_LENGTH = 8;

/** a***@example.com — confirms the address without reprinting it in full. */
const maskEmail = (email) => {
  const [user, domain] = String(email).split("@");
  if (!domain) return email;
  return `${user.slice(0, 1)}${"*".repeat(Math.max(user.length - 1, 1))}@${domain}`;
};

const AdminForgotPassword = () => {
  const navigate = useNavigate();

  // "email" -> "reset" -> "done"
  const [step, setStep] = useState("email");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const otpRef = useRef(null);

  // Countdown that re-enables "Resend code".
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Send focus straight to the code field when the second step appears.
  useEffect(() => {
    if (step === "reset") otpRef.current?.focus();
  }, [step]);

  const requestOtp = async (isResend = false) => {
    setError("");
    setNotice("");

    try {
      setLoading(true);
      await api.post("/api/auth/forgot-password", { email });

      // The server answers identically whether or not the address is
      // registered, so the UI must not claim the account exists either.
      setStep("reset");
      setCooldown(RESEND_COOLDOWN_SECONDS);
      setNotice(
        isResend
          ? "If that email is registered, a new code is on its way."
          : "If that email is registered, a verification code has been sent to it.",
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    requestOtp(false);
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");

    if (otp.length !== 6) {
      return setError("Enter the 6-digit code from your email.");
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
      return setError(
        `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
      );
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);

      // The code buys a short-lived reset token, which is what actually
      // authorises the change — the code itself is spent at this point.
      const verified = await api.post("/api/auth/verify-otp", { email, otp });

      await api.post("/api/auth/reset-password", {
        resetToken: verified.data.resetToken,
        newPassword: password,
      });

      // Any existing session is invalid now that the password changed.
      localStorage.removeItem("token");
      setStep("done");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "h-[58px] w-full rounded-2xl border border-[#E4E4E4] px-5 outline-none focus:border-[#C67D55] transition-colors";

  return (
    <div className="min-h-screen bg-[#F6F6F6] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[460px] bg-white rounded-[28px] p-10 shadow-[0_10px_40px_rgba(20,28,58,0.08)] border border-[#ECECEC]">
        {step === "done" ? (
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={30} />
            </div>

            <h1 className="h1 mt-6 leading-none text-[#141C3A]">
              Password Reset
            </h1>

            <p className="mt-4 text-[#6D7487] text-[15px] leading-[24px]">
              Your password has been changed and you have been signed out
              everywhere. Sign in with your new password.
            </p>

            <button
              onClick={() => navigate("/admin/login")}
              className="mt-8 h-[58px] w-full rounded-full bg-[#141C3A] text-[15px] text-white transition-all hover:bg-[#1E2B5C]"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <>
            {/* Step indicator */}
            <div className="mb-7 flex items-center gap-2">
              {["email", "reset"].map((name, index) => {
                const isCurrent = step === name;
                const isComplete = step === "reset" && name === "email";

                return (
                  <div key={name} className="flex flex-1 items-center gap-2">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-bold transition-colors ${
                        isCurrent || isComplete
                          ? "bg-[#141C3A] text-white"
                          : "bg-[#EFEFEF] text-[#8A8FA3]"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={`h-[3px] flex-1 rounded-full transition-colors ${
                        isComplete ? "bg-[#141C3A]" : "bg-[#EFEFEF]"
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            <h1 className="h1 leading-none text-[#141C3A]">
              {step === "email" ? "Forgot Password" : "Verify & Reset"}
            </h1>

            <p className="mt-4 text-[#6D7487] text-[15px] leading-[24px]">
              {step === "email" ? (
                "Enter your admin email and we'll send you a 6-digit verification code."
              ) : (
                <>
                  Enter the code sent to{" "}
                  <span className="font-semibold text-[#141C3A]">
                    {maskEmail(email)}
                  </span>{" "}
                  and choose a new password.
                </>
              )}
            </p>

            {notice && (
              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-[14px] leading-[21px] text-[#2563EB]">
                {notice}
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-[14px] leading-[21px] text-red-700">
                {error}
              </div>
            )}

            {step === "email" ? (
              <form
                onSubmit={handleEmailSubmit}
                className="mt-8 flex flex-col gap-5"
              >
                <input
                  type="email"
                  required
                  autoFocus
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />

                <button
                  disabled={loading}
                  className="h-[58px] rounded-full bg-[#141C3A] text-[15px] text-white transition-all hover:bg-[#1E2B5C] disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Verification Code"}
                </button>
              </form>
            ) : (
              <form
                onSubmit={handleResetSubmit}
                className="mt-8 flex flex-col gap-5"
              >
                <input
                  ref={otpRef}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="6-digit code"
                  value={otp}
                  // Strip anything that is not a digit so a pasted code with
                  // spaces or a stray letter still lands cleanly.
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className={`${inputClass} text-center text-[22px] font-semibold tracking-[10px]`}
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${inputClass} pr-14`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#8A8FA3] transition-colors hover:text-[#141C3A]"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={inputClass}
                />

                <button
                  disabled={loading}
                  className="h-[58px] rounded-full bg-[#141C3A] text-[15px] text-white transition-all hover:bg-[#1E2B5C] disabled:opacity-60"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>

                <div className="flex items-center justify-between text-[14px]">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("email");
                      setOtp("");
                      setError("");
                      setNotice("");
                    }}
                    className="flex items-center gap-1.5 font-medium text-[#6D7487] transition-colors hover:text-[#141C3A]"
                  >
                    <ArrowLeft size={15} /> Change email
                  </button>

                  <button
                    type="button"
                    disabled={cooldown > 0 || loading}
                    onClick={() => requestOtp(true)}
                    className="font-semibold text-[#C67D55] transition-colors hover:text-[#a96537] disabled:cursor-not-allowed disabled:text-[#B9BDC7]"
                  >
                    {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
                  </button>
                </div>
              </form>
            )}

            <p className="mt-8 text-center text-[14px] text-[#6D7487]">
              Remembered it?{" "}
              <Link
                to="/admin/login"
                className="font-semibold text-[#141C3A] hover:underline"
              >
                Back to Login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminForgotPassword;
