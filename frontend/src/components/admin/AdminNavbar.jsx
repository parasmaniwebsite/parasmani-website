import { useState } from "react";
import { KeyRound, Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import ResetPasswordModal from "./ResetPasswordModal.jsx";

const AdminNavbar = ({ title, collapsed, onToggleCollapse, onOpenMobile }) => {
  const [showReset, setShowReset] = useState(false);

  const CollapseIcon = collapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <div className="flex h-[72px] items-center justify-between gap-3 border-b border-[#E8E8E8] bg-white px-4 sm:px-6 lg:px-10">
      <div className="flex min-w-0 items-center gap-3">
        {/* Opens the drawer below lg... */}
        <button
          onClick={onOpenMobile}
          aria-label="Open menu"
          className="rounded-lg p-2 text-[#141C3A] transition-colors hover:bg-[#F5F5F5] lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* ...and collapses the docked rail from lg up. */}
        <button
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="hidden rounded-lg p-2 text-[#141C3A] transition-colors hover:bg-[#F5F5F5] lg:inline-flex"
        >
          <CollapseIcon size={20} />
        </button>

        <h2 className="h2 truncate text-[#141C3A]">{title}</h2>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          onClick={() => setShowReset(true)}
          // The label is dropped on narrow screens; the icon and the
          // accessible name carry it.
          aria-label="Reset Password"
          className="flex h-[42px] items-center gap-2 rounded-full border border-[#E4E4E4] bg-white px-3 text-[14px] text-[#141C3A] transition-all hover:bg-[#F5F5F5] sm:px-5"
        >
          <KeyRound size={15} />
          <span className="hidden sm:inline">Reset Password</span>
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/admin/login";
          }}
          className="h-[42px] rounded-full bg-[#141C3A] px-4 text-[14px] text-white transition-all hover:bg-[#1E2B5C] sm:px-6"
        >
          Logout
        </button>
      </div>

      {showReset && <ResetPasswordModal onClose={() => setShowReset(false)} />}
    </div>
  );
};

export default AdminNavbar;
