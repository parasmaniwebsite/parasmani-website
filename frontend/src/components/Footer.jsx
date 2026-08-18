import React from "react";

import { LuMapPin, LuMail } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";
import logoWhite from "../assets/footer/logo_white.png";
import certIcons from "../assets/footer/certIcons.png";
import footerArt from "../assets/footer/footer_piping_art.png";

import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

// Navigation Mapping Configuration Array
const NAV_ITEMS = [
  { label: "Products", path: "/products" },
  { label: "Tools", path: "/tools" },
  { label: "Industries", path: "/industry" },
  { label: "Contact Us", path: "/contact" },
  { label: "Downloads", path: "/downloads" },
];

const Footer = () => {
  const h3Style = {
    fontFamily: "var(--font-obviously)",
    fontWeight: "240",
    fontSize: "24px",
    color: "#ffffff",
    letterSpacing: "0.5px",
    marginBottom: "24px",
  };

  const aTagStyle = {
    fontFamily: "var(--font-albert)",
    fontWeight: "300",
    fontSize: "16.5px",
    color: "#E4E4E4",
    textDecoration: "none",
  };

  const contactTextStyle = {
    fontFamily: "var(--font-albert)",
    fontWeight: "300",
    fontSize: "13px",
    lineHeight: "1.4",
    color: "#E4E4E4",
  };

  const iconBoxStyle = {
    width: "36px",
    height: "36px",
    backgroundColor: "#C67D55",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  return (
    <footer className="w-full bg-[#19234D] text-white pt-16 pb-6 px-6 md:px-12 lg:px-16 select-none font-sans">
      {/* A plain centred cap, not `max-w-screen px-40`. That padding was a flat
         160px at every width, on top of the responsive px the <footer> already
         carries, and it is what starved the contact column: the longest email
         needs 210px on one line and the column only offered 166px. */}
      <div className="max-w-[1240px] mx-auto">
        {/* Main Content Layout Block */}
        {/* Twelve tracks from `xl`, not `lg`: at 1024 a track is ~51px, so the
           2-span nav column came to 127px and the "Company" heading (133px)
           spilled into "Reach Out". The two-column layout carries 1024-1279
           comfortably instead. */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-10 xl:gap-6 pb-12 items-start">
          {/* Column 1: Brand & Legacy Credentials (Span 3) */}
          <div className="xl:col-span-3 flex flex-col gap-6 max-w-[350px]">
            <img
              src={logoWhite}
              alt="PARASMANI Logo"
              className="h-auto w-[230px] object-contain"
            />
            <p className="font-albert text-[14px] font-light leading-[1.3] text-[#FFFFFF]/90 tracking-wide">
              Parasmani Tubes Copper Pvt. Ltd. is a BIS & ISO 9001:2015 certified manufacturer of seamless copper tubes, pancake copper coils, and copper fittings in Umbergaon, Gujarat.
            </p>
            <div className="pt-2">
              <img
                src={certIcons}
                alt="Certifications (ISI, ISO, Made in India)"
                className="h-[44px] w-auto object-contain"
              />
            </div>
          </div>

          {/* Column 2: Navigational Links (Span 2) */}
          <div className="xl:col-span-2 xl:pl-6">
            <h3 style={h3Style}>Company</h3>
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.path}
                  style={aTagStyle}
                  className="transition-colors duration-200 hover:text-[#C67D55]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Contact & Channels (Span 4)

             Four tracks, not three: the longest email is 210px on one line and
             a 3-span does not clear that until the viewport is past any real
             screen, so it wrapped on every laptop. The fourth comes from the
             brand column, which is capped at max-w-[350px] and never used it. */}
          <div className="xl:col-span-4 xl:pl-2">
            <h3 style={h3Style}>Reach Out</h3>
            <div className="flex flex-col gap-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div style={iconBoxStyle}>
                  <LuMapPin size={16} color="white" />
                </div>
                <div style={contactTextStyle} className="pt-0.5">
                  <a
                    href="https://www.google.com/maps/place/Parasmani+Tubes+Copper+Private+Limited/@20.158758,72.778787,15535m/data=!3m1!1e3!4m6!3m5!1s0x3be72b2555905ecb:0x3146c773d37a094f!8m2!3d20.1587581!4d72.7787865!16s%2Fg%2F11nj42czcj?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDcyMS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    5/2, GIDC, Umbergaon,
                    <br />
                     Valsad, Gujarat - 396171,
                    <br />
                     INDIA
                  </a>
                </div>
              </div>

              {/* Phones */}
              <div className="flex items-center gap-4">
                <div style={iconBoxStyle}>
                  <FiPhone
                    size={15}
                    color="white"
                    className="transform rotate-[12deg]"
                  />
                </div>
                <div style={contactTextStyle}>
                  <a href="tel:+919819134044" className="hover:text-white transition-colors">
                    +91 98191 34044
                  </a>
                  {" | "}
                  <a href="tel:+918169808254" className="hover:text-white transition-colors">
                    +91 81698 08254
                  </a>
                </div>
              </div>

              {/* Email Addresses */}
              <div className="flex items-start gap-4">
                <div style={iconBoxStyle}>
                  <LuMail size={16} color="white" />
                </div>
                {/* `whitespace-nowrap`, never `break-all`: break-all is what
                   split the address after "...co" and dropped a lone "m" onto
                   the next line. An email must stay on one line. */}
                <div style={contactTextStyle} className="pt-0.5 whitespace-nowrap">
                  <a href="mailto:sales@parasmanicopper.com" className="hover:text-white transition-colors">
                    sales@parasmanicopper.com
                  </a>
                  <br />
                  <a href="mailto:preetadani@parasmanicopper.com" className="hover:text-white transition-colors">
                    preetadani@parasmanicopper.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Engineering Isometric Art (Span 3)

             The span the contact column needed comes off the brand column,
             which is capped at max-w-[350px] and never used its fourth. Taking
             it from the art instead left the drawing rendering at ~187px
             against its 280px intended size. */}
          <div className="xl:col-span-3 flex justify-center xl:justify-end pt-2">
            <img
              src={footerArt}
              alt="Engineering Technical Blueprint Artwork"
              className="w-full max-w-[280px] h-auto object-contain"
            />
          </div>
        </div>

        {/* Bottom Horizontal Consolidated Status Ribbon */}
        <div className="w-full h-auto min-h-[52px] mt-2 rounded-[10px] border border-[#434F75]/50 bg-[#5E6582] px-5 py-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Social Profiles */}
          <div className="flex items-center justify-center gap-5">
            <a
              href="https://www.facebook.com/ParasmaniTubesCopper"
              aria-label="Facebook Profile"
              className="text-white/90 hover:text-[#C67D55] transition-colors duration-200"
            >
              <FaFacebook size={23}/>
            </a>
            <a
              href="https://www.instagram.com/parasmanitubes"
              aria-label="Instagram Profile"
              className="text-white/90 hover:text-[#C67D55] transition-colors duration-200"
            >
              <FaInstagram size={23}/>
            </a>
            <a
              href="https://www.linkedin.com/company/parasmani-tubes/"
              aria-label="LinkedIn Profile"
              className="text-white/90 hover:text-[#C67D55] transition-colors duration-200"
            >
              <FaLinkedin size={23}/>
            </a>

            <a
              href="https://www.youtube.com/@ParasmaniCopper"
              aria-label="Youtube Profile"
              className="text-white/90 hover:text-[#C67D55] transition-colors duration-200"
            >
              <FaYoutube size={23}/>
            </a>
          </div>

          {/* Copyright text notation */}
          <p className="text-center font-albert text-[13px] font-light tracking-wide text-white/80 sm:order-none order-last">
            © 2026 Parasmani Tubes Copper Pvt. Ltd. All rights reserved.
          </p>

          {/* Compliance & Operations Legal Anchor Tags */}
          <div className="flex justify-center items-center gap-6">
            <a
              href="/privacy-policy"
              className="font-albert text-[12.5px] font-light text-white/90 hover:text-[#C67D55] transition-colors duration-200 underline "
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="font-albert text-[12.5px] font-light text-white/90 hover:text-[#C67D55] transition-colors duration-200 underline"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
