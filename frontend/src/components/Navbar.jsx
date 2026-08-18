import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import logoMain from "../assets/logoVideo.mp4";
import EnquiryModal from "./EnquiryModal";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "/about",
    dropdownItems: [
      { label: "About Us", href: "/about" },
      { label: "Quality and Assurance", href: "/quality" },
      { label: "Certifications and Approvals", href: "/certifications" },
    ],
  },
  {
    name: "Products",
    href: "/products",
    dropdownItems: [
      { label: "Straight Copper Tube", href: "/straight-copper-tubes" },
      { label: "Pancake Copper Coil", href: "/pancake-copper-coil" },
      { label: "Copper Fittings", href: "/copper-fittings" },
    ],
  },
  {
    name: "Industries",
    href: "/industry",
    dropdownItems: [
      { label: "HVAC & Refrigeration", href: "/hvac-refrigeration" },
      { label: "Medical Gas", href: "/medical-gas" },
      { label: "Industrial & Process Applications", href: "/industrial-process-application" },
      { label: "Household & Fuel Gas", href: "/household-fuel-gas" },
      { label: "Plumbing & Water Supply", href: "/plumbing-water-supply" },
    ],
  },
  {
    name: "Tools",
    href: "/tools",
    dropdownItems: [
      { label: "Weight Calculator", href: "/weight-calculator" },
      { label: "Pressure Calculator", href: "/pressure-calculator" },
      { label: "Copper Estimator", href: "/project-estimator" },
      { label: "Unit Converter", href: "/unit-converter" },
    ],
  },
  { 
    name: "Downloads", 
    href: "/downloads",
    dropdownItems: [
      { label: "All Downloads", href: "/downloads?category=All" },
      { label: "Brochures", href: "/downloads?category=Brochures" },
      { label: "Submittal", href: "/downloads?category=Submittal" },
      { label: "Spec Sheets", href: "/downloads?category=Spec Sheets" },
      { label: "Technical Handbooks", href: "/downloads?category=Technical Handbooks" },
      { label: "Dealer Reference", href: "/downloads?category=Dealer Reference" },
      { label: "Approvals", href: "/downloads?category=Approvals" },
      { label: "Certifications", href: "/downloads?category=Certifications" },
      { label: "Policies", href: "/downloads?category=Policies" },
    ],
  },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

const desktopLinkClass =
  "flex items-center gap-1 whitespace-nowrap font-albert text-[16px] font-normal leading-none tracking-normal text-[#141C3A] transition-colors hover:text-[#C67D55] cursor-pointer";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  // Helper function to check if any of the sub-routes are currently active
  const isDropdownActive = (dropdownItems) => {
    if (!dropdownItems) return false;
    return dropdownItems.some((item) => {
      const fullPath = location.pathname + location.search;
      
      // If the link has search parameters, check for a full path match
      if (item.href.includes("?")) {
        // Fallback to active route if default search parameters are absent
        if (item.href.endsWith("category=All") && location.pathname === "/downloads" && !location.search) {
          return true;
        }
        return fullPath === item.href;
      }
      return location.pathname === item.href;
    });
  };

  return (
    <>
    <nav className="sticky top-0 z-50 w-full bg-[#ffffff] border-b border-[#E4D4C4]/30">
      <div className="relative mx-auto flex h-[64px] max-w-[1440px] items-center px-5 md:px-10 lg:px-[120px]">
        {/* Logo */}
        <NavLink to="/" onClick={closeMenu} className="flex shrink-0 items-center">
          <video autoPlay muted loop playsInline className="h-[48px] w-auto object-contain">
            <source src={logoMain} type="video/mp4" />
          </video>
        </NavLink>

        {/* Desktop Menu */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[24px] xl:gap-[30px] lg:flex">
          {NAV_LINKS.map((link) => {
            const hasSubmenuActive = isDropdownActive(link.dropdownItems);
            
            return (
              <div key={link.name} className="group relative py-4">
                {link.href === "#" ? (
                  <span className={`${desktopLinkClass} ${hasSubmenuActive ? "text-[#C67D55]" : ""}`}>
                    {link.name}
                    <ChevronDown size={12} strokeWidth={1.8} className="transition-transform duration-200 group-hover:rotate-180" />
                  </span>
                ) : (
                  <NavLink
                    to={link.href}
                    end={link.href === "/downloads"} // Prevents /downloads from matching nested query params
                    className={({ isActive }) =>
                      `${desktopLinkClass} ${isActive || hasSubmenuActive ? "text-[#C67D55]" : ""}`
                    }
                  >
                    {link.name}
                    {link.dropdownItems && (
                      <ChevronDown size={12} strokeWidth={1.8} className="transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </NavLink>
                )}

                {/* Desktop Dropdown */}
                {link.dropdownItems && (
                  <div className="invisible absolute left-1/2 top-[38px] min-w-[240px] -translate-x-1/2 translate-y-2 rounded-b-[8px] border border-[#E4D4C4] bg-[#ffffff] py-2 opacity-0 shadow-[0_12px_30px_rgba(20,28,58,0.08)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 z-50">
                    {link.dropdownItems.map((item) => {
                      const isItemActive = 
                        (location.pathname + location.search === item.href) ||
                        (item.href.endsWith("category=All") && location.pathname === "/downloads" && !location.search);

                      return (
                        <NavLink
                          key={item.label}
                          to={item.href}
                          className={`block px-4 py-3 font-albert text-[12px] font-normal leading-none tracking-normal transition-colors hover:bg-[#F8F1E8] hover:text-[#C67D55] ${
                            isItemActive ? "bg-[#F8F1E8] text-[#C67D55]" : "text-[#141C3A]"
                          }`}
                        >
                          {item.label}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop Enquire Button */}
        <button
          onClick={() => { closeMenu(); setEnquiryOpen(true); }}
          className="b2 ml-auto hidden h-[38px] min-w-[132px] items-center justify-center rounded-full bg-[#14204A] px-6 font-normal leading-none text-white transition-colors hover:bg-[#1E2B5C] lg:flex"
        >
          Enquire Now
        </button>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-full text-[#141C3A] transition-colors hover:bg-white/50 lg:hidden"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden bg-white/95 shadow-[0_14px_32px_rgba(20,28,58,0.08)] backdrop-blur-md transition-all duration-300 lg:hidden ${
          isOpen ? "max-h-[700px] border-t border-[#E4D4C4]" : "max-h-0"
        }`}
      >
        <div className="px-5 py-4 max-h-[calc(100vh-64px)] overflow-y-auto">
          {NAV_LINKS.map((link) => {
            const hasSubmenuActive = isDropdownActive(link.dropdownItems);

            return (
              <div key={link.name} className="border-b border-[#E4D4C4] last:border-b-0">
                {link.dropdownItems ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpenDropdown((current) => current === link.name ? null : link.name)}
                      className={`flex w-full items-center justify-between py-3 font-albert text-[14px] font-normal leading-none tracking-normal transition-colors ${
                        hasSubmenuActive ? "text-[#C67D55]" : "text-[#141C3A]"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown size={16} strokeWidth={1.8} className={`transition-transform duration-200 ${openDropdown === link.name ? "rotate-180" : ""}`} />
                    </button>

                    {/* Mobile Dropdown Options */}
                    <div className={`grid transition-all duration-300 ${openDropdown === link.name ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden">
                        <div className="pb-3 pl-4">
                          {link.dropdownItems.map((item) => (
                            <NavLink
                              key={item.label}
                              to={item.href}
                              onClick={closeMenu}
                              className={({ isActive }) =>
                                `block py-2 font-albert text-[12px] font-normal leading-none tracking-normal transition-colors ${
                                  isActive ? "text-[#C67D55]" : "text-[#4A4A4A]"
                                }`
                              }
                            >
                              {item.label}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={link.href}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block py-3 font-albert text-[14px] font-normal leading-none tracking-normal ${
                        isActive ? "text-[#C67D55]" : "text-[#141C3A]"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                )}
              </div>
            );
          })}

          {/* Mobile Enquire Button */}
          <button
            onClick={() => { closeMenu(); setEnquiryOpen(true); }}
            className="b2 mt-5 flex h-[42px] w-full items-center justify-center rounded-full bg-[#14204A] font-normal leading-none text-white transition-colors hover:bg-[#1E2B5C]"
          >
            Enquire Now
          </button>
        </div>
      </div>

    </nav>

    {/* Outside <nav> on purpose: the nav is sticky with z-50, which creates a
        stacking context that would trap the dialog's z-100 inside it — the
        overlay could then be painted over by the WhatsApp floater or any
        page content above z-50. */}
    <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  );
};

export default Navbar;
