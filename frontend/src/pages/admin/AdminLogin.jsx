import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/serviceAPI";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      window.location.href = "/admin/dashboard";
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6] flex items-center justify-center px-4">
      <div className="w-full max-w-[460px] bg-white rounded-[28px] p-10 shadow-[0_10px_40px_rgba(20,28,58,0.08)] border border-[#ECECEC]">
        <h1 className="h1 leading-none text-[#141C3A]">
          Admin Login
        </h1>

        <p className="mt-4 text-[#6D7487] text-[15px] leading-[24px]">
          Login to manage blogs and contact enquiries.
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-10 flex flex-col gap-5"
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[58px] rounded-2xl border border-[#E4E4E4] px-5 outline-none focus:border-[#C67D55]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-[58px] rounded-2xl border border-[#E4E4E4] px-5 outline-none focus:border-[#C67D55]"
          />

          <div className="-mt-1 flex justify-end">
            <Link
              to="/admin/forgot-password"
              className="text-[14px] font-medium text-[#C67D55] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            disabled={loading}
            className="h-[58px] rounded-full bg-[#141C3A] text-white text-[15px] hover:bg-[#1E2B5C] transition-all"
          >
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;