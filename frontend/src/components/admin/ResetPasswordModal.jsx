import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Eye, EyeOff, ShieldCheck, CheckCircle2 } from "lucide-react";
import api from "../../utils/serviceAPI";

// Matches RESEND_COOLDOWN_MS on the server.
const RESEND_COOLDOWN_SECONDS = 60;

// Matches PASSWORD_MIN_LENGTH on the server.
const PASSWORD_MIN_LENGTH = 8;

const maskEmail = (email) => {
  const [user, domain] = String(email || "").split("@");
  if (!domain) return email || "";
  return `${user.slice(0, 1)}${"*".repeat(Math.max(user.length - 1, 1))}@${domain}`;
};

/**
 * In-app password change for the admin who is already signed in. It runs the
 * same emailed-OTP flow as the public forgot-password page rather than asking
 * for the current password, so possession of a live session alone is not
 * enough to change the credentials.
 */
const ResetPasswordModal = ({ onClose }) => {
  // "confirm" -> "verify" -> "done"
  const [step, setStep] = useState("confirm");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const closeRef = useRef(null);
  const otpRef = useRef(null);

  // The JWT holds only an id, so ask the server which address is on file.
  useEffect(() => {
    let cancelled = false;

    api
      .get("/api/auth/me")
      .then((res) => {
        if (!cancelled) setEmail(res.data?.admin?.email || "");
      })
      .catch(() => {
        if (!cancelled) setError("Could not load your account details.");
      })
      .finally(() => {
        if (!cancelled) setLoadingEmail(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    if (step === "verify") otpRef.current?.focus();
  }, [step]);

  useEffect(() => {
    const onKeyDown = (e) => {
      // Never let Escape discard a half-finished reset by accident.
      if (e.key === "Escape" && !loading) onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, loading]);

  const sendCode = async (isResend = false) => {
    setError("");
    setNotice("");

    try {
      setLoading(true);
      await api.post("/api/auth/forgot-password", { email });

      setStep("verify");
      setCooldown(RESEND_COOLDOWN_SECONDS);
      setNotice(
        isResend
          ? `A new code has been sent to ${email}.`
          : `A 6-digit code has been sent to ${email}.`,
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
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

      const verified = await api.post("/api/auth/verify-otp", { email, otp });

      await api.post("/api/auth/reset-password", {
        resetToken: verified.data.resetToken,
        newPassword: password,
      });

      setStep("done");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Changing the password revokes every existing token, this session's
  // included, so there is nothing to return to.
  const signOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  const inputClass =
    "h-[52px] w-full rounded-xl border border-[#E4E4E4] px-4 outline-none focus:border-[#C67D55] transition-colors";

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#141C3A]/50 p-4 backdrop-blur-[2px]"
      onClick={() => !loading && step !== "done" && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-password-title"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[88vh] w-full max-w-[480px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#ECECEC] px-7 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4EDE7] text-[#C67D55]">
              <ShieldCheck size={20} />
            </span>
            <h2
              id="reset-password-title"
              className="text-[19px] font-bold text-[#141C3A]"
            >
              Reset Password
            </h2>
          </div>

          {step !== "done" && (
            <button
              ref={closeRef}
              onClick={onClose}
              disabled={loading}
              aria-label="Close"
              className="rounded-lg p-2 text-[#6D7487] transition-colors hover:bg-[#F5F5F5] hover:text-[#141C3A] disabled:opacity-40"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-6">
          {error && (
            <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-[14px] leading-[21px] text-red-700">
              {error}
            </div>
          )}

          {notice && step !== "done" && (
            <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-[14px] leading-[21px] text-[#2563EB]">
              {notice}
            </div>
          )}

          {step === "confirm" && (
            <>
              <p className="text-[15px] leading-[24px] text-[#5F6472]">
                For security, we'll email a 6-digit verification code before
                changing your password.
              </p>

              <div className="mt-5 rounded-xl border border-[#ECECEC] bg-[#FAFAFB] p-4">
                <div className="text-[12px] font-semibold tracking-wider text-[#8A8FA3] uppercase">
                  Code will be sent to
                </div>
                <div className="mt-1.5 text-[15px] font-semibold text-[#141C3A]">
                  {loadingEmail ? "Loading..." : email || "—"}
                </div>
              </div>

              <button
                onClick={() => sendCode(false)}
                disabled={loading || loadingEmail || !email}
                className="mt-6 h-[52px] w-full rounded-full bg-[#141C3A] text-[15px] text-white transition-all hover:bg-[#1E2B5C] disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Verification Code"}
              </button>
            </>
          )}

          {step === "verify" && (
            <form onSubmit={handleReset} className="flex flex-col gap-4">
              <p className="text-[15px] leading-[24px] text-[#5F6472]">
                Enter the code sent to{" "}
                <span className="font-semibold text-[#141C3A]">
                  {maskEmail(email)}
                </span>{" "}
                and choose a new password.
              </p>

              <input
                ref={otpRef}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="6-digit code"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                className={`${inputClass} text-center text-[20px] font-semibold tracking-[8px]`}
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-[#8A8FA3] transition-colors hover:text-[#141C3A]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                className="h-[52px] rounded-full bg-[#141C3A] text-[15px] text-white transition-all hover:bg-[#1E2B5C] disabled:opacity-60"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              <button
                type="button"
                disabled={cooldown > 0 || loading}
                onClick={() => sendCode(true)}
                className="text-[14px] font-semibold text-[#C67D55] transition-colors hover:text-[#a96537] disabled:cursor-not-allowed disabled:text-[#B9BDC7]"
              >
                {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
              </button>
            </form>
          )}

          {step === "done" && (
            <div className="py-2 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={30} />
              </div>

              <h3 className="mt-5 text-[18px] font-bold text-[#141C3A]">
                Password Changed
              </h3>

              <p className="mt-3 text-[15px] leading-[24px] text-[#5F6472]">
                You have been signed out of all devices. Sign in again with your
                new password.
              </p>

              <button
                onClick={signOut}
                className="mt-6 h-[52px] w-full rounded-full bg-[#141C3A] text-[15px] text-white transition-all hover:bg-[#1E2B5C]"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ResetPasswordModal;
