import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSideBar.jsx";
import AdminNavbar from "./AdminNavbar.jsx";

const COLLAPSED_KEY = "adminSidebarCollapsed";

/**
 * Chrome shared by every admin screen. It owns the sidebar state because the
 * toggle lives in the navbar while the panel it controls is a sibling.
 *
 * Two independent behaviours, split at the lg breakpoint:
 *   - below lg the sidebar is an off-canvas drawer over the content
 *   - at lg and up it is docked, and collapses to an icon rail
 */
const AdminLayout = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem(COLLAPSED_KEY) === "1",
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(COLLAPSED_KEY, collapsed ? "1" : "0");
  }, [collapsed]);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);

    // The drawer covers the page, so the page behind it must not scroll.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <AdminSidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Both margins are literal class names so Tailwind can see them. */}
      <div
        className={`transition-[margin] duration-300 ${
          collapsed ? "lg:ml-[76px]" : "lg:ml-[260px]"
        }`}
      >
        <AdminNavbar
          title={title}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((v) => !v)}
          onOpenMobile={() => setMobileOpen(true)}
        />

        <div className="p-4 sm:p-6 lg:p-10">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
