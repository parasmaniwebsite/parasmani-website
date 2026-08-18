import { useState } from "react";
import { jsPDF } from "jspdf";

import approvalDownload from "../assets/about/approval NIDJ.png";

import isoCertificate1 from "../assets/certifications/isoCertificate1.png";
import isoCertificate2 from "../assets/certifications/isoCertificate2.png";
import BIScertificate from "../assets/certifications/BIScertificate.png";
import { useNavigate } from "react-router-dom";

// Approval and VRF brand logos resolve by filename instead of individual
// imports, so adding an image to assets/certifications puts it on the page
// with no code change.
// Matching ignores case, spaces, dashes and underscores: "Blue Star" finds
// BlueStar.png, blue-star.png or blue_star.webp. A brand with no file yet is
// simply skipped rather than rendering a broken image.
const LOGO_FILES = import.meta.glob(
  "../assets/certifications/*.{png,jpg,jpeg,webp,svg}",
  { eager: true, import: "default" }
);

const logoKey = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const LOGO_BY_KEY = Object.fromEntries(
  Object.entries(LOGO_FILES).map(([path, url]) => [
    logoKey(path.split("/").pop().replace(/\.[^.]+$/, "")),
    url,
  ])
);

// name is what the page shows; aliases cover filenames that differ from it
const VRF_BRANDS = [
  // Row 1
  { name: "Daikin" },
  { name: "Mitsubishi Electric", aliases: ["mitshubishi_electric"] },
  { name: "LG" },
  { name: "Voltas" },
  // Row 2
  { name: "Hitachi" },
  { name: "Panasonic" },
  { name: "Samsung" },
  { name: "Carrier" },
  // Row 3
  { name: "Toshiba" },
  { name: "Blue Star" },
  {
    name: "Mitsubishi Heavy",
    aliases: ["mitshubishi-heavy-industries", "mitsubishi-heavy-industries"],
  },
  { name: "Lloyd" },
  // Row 4
  { name: "Haier" },
  { name: "O General" },
  { name: "Midea", aliases: ["media"] }, // file is media.png, artwork is Midea
  { name: "Godrej" },
];

const resolveBrandLogo = (brand) =>
  [brand.name, ...(brand.aliases ?? [])]
    .map((candidate) => LOGO_BY_KEY[logoKey(candidate)])
    .find(Boolean);

const APPROVAL_BRANDS = [
  { name: "Indian Railways", aliases: ["IndianRailway"] },
  { name: "Mumbai metro" },
  { name: "Delhi Metro" },
  { name: "Azim Premji" },
  { name: "SBI" },
  { name: "CSIR" },
  { name: "Adani" },
  { name: "Kerala PWD", aliases: ["pwd"] },
  { name: "NIDJ" },
  { name: "LG" },
  { name: "Panasonic" },
  { name: "Reliance Retail", aliases: ["Reliance"] },
];

const CertificatesAndApprovals = () => {
  const [activeTab, setActiveTab] = useState("Certificates");
    const navigate = useNavigate()

  const certificatesData = [
    {
      id: 1,
      type: "ISO Certificate",
      title: "ISO 9001:2015",
      issuer: "Certificate of Registration",
      imgUrl: isoCertificate1,
      isAvailable: true,
    },
    {
      id: 2,
      type: "ISO Certificate",
      title: "ISO 9001:2015",
      issuer: "Certificate of Registration",
      imgUrl: isoCertificate2,
      isAvailable: true,
    },
    {
      id: 3,
      type: "BIS Certificate",
      title: "BUREAU OF INDIAN STANDARDS",
      issuer: "CM/L - 7200083993",
      imgUrl: BIScertificate,
      isAvailable: true,
    },
    // 6 "Coming Soon" Slots to make it a perfect 9-card matrix
    { id: 4, type: "Certification", title: "Coming Soon", isAvailable: false },
    { id: 5, type: "Certification", title: "Coming Soon", isAvailable: false },
    { id: 6, type: "Certification", title: "Coming Soon", isAvailable: false },
  ];

  const approvalsLogos = APPROVAL_BRANDS.map((brand) => ({
    name: brand.name,
    logo: resolveBrandLogo(brand),
  })).filter((brand) => brand.logo);

  // Brands whose logo file is present, in the order the 4-column grid lays out.
  const oemLogos = VRF_BRANDS.map((brand) => ({
    name: brand.name,
    logo: resolveBrandLogo(brand),
  })).filter((brand) => brand.logo);

  // Robust HTML5 Canvas conversion engine to ensure images bake properly into jsPDF layout
  const handleIndividualDownload = (imgUrl, title) => {
    const img = new Image();
    img.src = imgUrl;
    img.crossOrigin = "anonymous"; 

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: img.width > img.height ? "landscape" : "portrait",
        unit: "px",
        format: [img.width, img.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, img.width, img.height);
      const fileName = `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_certificate.pdf`;
      pdf.save(fileName);
    };

    img.onerror = (err) => {
      console.error("Failed to process certificate download image target:", err);
    };
  };

  // Triggers the Canvas -> PDF conversion specifically for the imported approval certificate image
  const handleApprovalDownload = () => {
    handleIndividualDownload(approvalDownload, "Approval_NIDJ");
  };

  return (
    <div className="w-full bg-[#FAFAFA] selection:bg-[#C68344]/20 py-16 md:py-24 px-4 sm:px-6 lg:px-16 min-h-screen flex flex-col relative overflow-hidden">
      
      {/* ================= HEADER CONTROLS NAVIGATION MATRIX ================= */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row flex-wrap items-center justify-between gap-6 md:gap-8 mb-16 md:mb-20">
        {/* min-w-0 so the heading wraps inside its share of the row instead of
            overflowing across the tab pill, which cannot shrink */}
        <div className="text-center md:text-left min-w-0 md:flex-1">
          <h2 className="h2 text-[#18234D] tracking-tight">
            Compatible with Major VRV/VRF Systems
          </h2>
        </div>

        <div className="w-full md:w-auto shrink-0 overflow-x-auto max-w-full no-scrollbar pb-2 md:pb-0 flex justify-start sm:justify-center md:justify-end">
          <div className="bg-[#EFECE9] rounded-full p-1.5 flex items-center gap-1 sm:gap-2 shadow-sm mx-auto md:mx-0">
            {["Certificates", "VRF Compatibility", "Approvals"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-medium font-albert rounded-full transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-white text-[#18234D] shadow-md font-semibold"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= DYNAMIC MAIN RENDER STAGE ================= */}
      <div className="max-w-7xl mx-auto w-full flex-1 mb-16 md:mb-24 flex items-center justify-center">
        
        {/* VIEW 1: CERTIFICATES LAYOUT TAB */}
        {activeTab === "Certificates" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full max-w-6xl mx-auto items-start justify-center">
            {certificatesData.map((cert) => (
              <div key={cert.id} className="flex flex-col items-center w-full max-w-sm mx-auto">
                <span className={`font-albert text-xs sm:text-sm font-medium mb-4 md:mb-6 block text-center uppercase tracking-wider ${
                  cert.isAvailable ? "text-gray-400" : "text-gray-300"
                }`}>
                  {cert.type}
                </span>
                
                {/* Active and Unreleased Conditional Render Blocks */}
                {cert.isAvailable ? (
                  <div className="relative group w-full aspect-[3/4] bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden flex items-center justify-center">
                    
                    {/* Tiny structural background pattern gradient block so the glass overlay has colors/edges to refract */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-50/50 via-transparent to-gray-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <img
                      src={cert.imgUrl}
                      alt={cert.title}
                      className="w-full h-full rounded-xl object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                    />

                    {/* Premium High-Visibility Glassmorphism Download Button */}
                    <button
                      onClick={() => handleIndividualDownload(cert.imgUrl, cert.title)}
                      className="absolute bottom-5 right-5 w-12 h-12 rounded-full bg-[#1A254C]/75 backdrop-blur-xl border border-white/40 text-white flex items-center justify-center opacity-0 scale-75 translate-y-4 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 hover:bg-[#1A254C]/90 hover:border-white/60 hover:shadow-[0_12px_24px_-4px_rgba(26,37,76,0.4)] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) focus:outline-none z-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.15),inset_0_1px_1px_0_rgba(255,255,255,0.2)]"
                      aria-label={`Download ${cert.title}`}
                    >
                      <svg
                        className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform duration-300 ease-out"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  /* Coming Soon Card Layout Structure */
                  <div className="w-full aspect-[3/4] bg-[#F9F8F6] rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center p-6 select-none group relative overflow-hidden transition-all duration-300 hover:border-gray-300">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                      <svg 
                        className="w-5 h-5 text-gray-400" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="font-albert text-xs font-medium text-gray-400 tracking-wide uppercase">
                      Coming Soon
                    </span>
                  </div>
                )}
                
                <h3 className={`font-albert text-sm mt-4 tracking-tight text-center ${
                  cert.isAvailable ? "font-semibold text-[#18234D]" : "font-normal text-gray-400 italic"
                }`}>
                  {cert.title}
                </h3>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 2: APPROVALS LAYOUT TAB */}
        {activeTab === "Approvals" && (
          <div className="w-full max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-12 sm:gap-x-12 sm:gap-y-16 lg:grid lg:grid-cols-4 lg:gap-12 items-start justify-items-center">
              {approvalsLogos.map((logo, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center group w-[calc(50%-16px)] sm:w-[calc(33.33%-32px)] lg:w-full"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center bg-transparent">
                    <img
                      src={logo.logo}
                      alt={logo.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="font-albert text-xs sm:text-sm text-[#474747] font-medium tracking-tight mt-4 sm:mt-6 px-2">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: VRF COMPATIBILITY LAYOUT TAB */}
        {activeTab === "VRF Compatibility" && (
          <div className="w-full max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-12 sm:gap-x-12 sm:gap-y-16 lg:grid lg:grid-cols-4 lg:gap-12 items-start justify-items-center">
              {oemLogos.map((logo, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center group w-[calc(50%-16px)] sm:w-[calc(33.33%-32px)] lg:w-full"
                >
                  <div className="w-23 h-23 sm:w-24 sm:h-24 md:w-35 md:h-35 flex items-center justify-center bg-transparent">
                    <img
                      src={logo.logo}
                      alt={logo.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="font-albert text-xs sm:text-sm text-[#474747] font-medium tracking-tight mt-4 sm:mt-6 px-2">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ================= TRADEMARK DISCLAIMER (all tabs) ================= */}
      <p className="max-w-4xl mx-auto w-full text-center font-albert text-[14px] font-normal leading-relaxed text-[#474747] mb-12 md:mb-16 px-2">
        Brand names and trademarks belong to their respective owners and are
        referenced solely to indicate system compatibility. Parasmani Tubes
        Copper Pvt. Ltd. is not affiliated with, endorsed by, or authorised by
        the respective brand owners unless explicitly stated.
      </p>

      {/* ================= ACTION REGION DOWNLOAD FOOTER ================= */}
      {activeTab == "VRF Compatibility" && (
        <div className="max-w-7xl mx-auto w-full flex flex-row items-center justify-center md:justify-end gap-4 pt-8 border-t border-gray-100 z-30">
          <span className="font-albert text-xs sm:text-[14px] text-[#474747] font-medium select-none tracking-normal">
            Download Approval Certificates
          </span>

          <button
            onClick={() => navigate('/downloads?category=Approvals')}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1A254C] text-white flex items-center justify-center shadow-md hover:bg-[#253468] hover:shadow-xl transition-all duration-300 focus:outline-none"
            aria-label="Download Approval Certificates Asset Bundle"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          </button>
        </div>
      )}


      {activeTab == "Approvals" && (
        <div className="max-w-7xl mx-auto w-full flex flex-row items-center justify-center md:justify-end gap-4 pt-8 border-t border-gray-100 z-30">
          <span className="font-albert text-xs sm:text-[14px] text-[#474747] font-medium select-none tracking-normal">
            Download Approval Certificates
          </span>

          <button
            onClick={() => navigate('/downloads?category=Approvals')}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1A254C] text-white flex items-center justify-center shadow-md hover:bg-[#253468] hover:shadow-xl transition-all duration-300 focus:outline-none"
            aria-label="Download Approval Certificates Asset Bundle"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          </button>
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default CertificatesAndApprovals;
