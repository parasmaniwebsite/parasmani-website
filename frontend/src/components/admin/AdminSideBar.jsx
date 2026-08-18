import { LayoutDashboard, Newspaper, Mail, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Blogs",
    path: "/admin/blogs",
    icon: Newspaper,
  },
  {
    name: "Enquiries",
    path: "/admin/enquiries",
    icon: Mail,
  },
];

/**
 * `collapsed` only applies from lg up — on smaller screens the panel is a
 * drawer, where a half-width icon rail would be worse than no sidebar at all,
 * so it always opens at full width there.
 */
const AdminSidebar = ({ collapsed, mobileOpen, onClose }) => {
  return (
    <>
      {/* Dimmed backdrop, drawer only. */}
      {mobileOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#0B1023]/60 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-[#141C3A] py-6 text-white transition-[width,transform] duration-300 ${
          collapsed ? "lg:w-[76px] lg:px-3" : "lg:w-[260px] lg:px-6"
        } px-6 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between">
          {/* The full wordmark does not fit the rail, so it becomes a monogram. */}
          <h1
            className={`h1 tracking-tight ${collapsed ? "lg:w-full lg:text-center lg:text-[22px]" : ""}`}
          >
            {collapsed ? (
              <>
                <span className="lg:hidden">PARASMANI</span>
                <span className="hidden lg:inline">P</span>
              </>
            ) : (
              "PARASMANI"
            )}
          </h1>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-10 flex flex-col gap-2">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                // Tapping a link should navigate and get the drawer out of the
                // way. No-op on desktop, where it is never open.
                onClick={onClose}
                // Native tooltip is the only label left once the rail collapses.
                title={collapsed ? item.name : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                    collapsed ? "lg:justify-center lg:px-0" : ""
                  } ${isActive ? "bg-[#C67D55] text-white" : "hover:bg-[#1E2B5C]"}`
                }
              >
                <Icon size={18} className="shrink-0" />
                <span
                  className={`text-[15px] whitespace-nowrap ${collapsed ? "lg:hidden" : ""}`}
                >
                  {item.name}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
