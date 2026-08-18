import React from "react";
import { Link } from "react-router-dom";

import img1 from "../../../assets/products/sct/applicationImg1.png";
import img2 from "../../../assets/products/sct/applicationImg2.png";
import img3 from "../../../assets/products/sct/applicationImg3.png";
import img4 from "../../../assets/products/sct/applicationImg4.png";
import img5 from "../../../assets/products/sct/applicationImg5.png";

const industries = [
  {
    title: "HVAC & Refrigeration",
    image: img1,
    codes: [],
    path: "/hvac-refrigeration",
  },
  {
    title: "Medical Gas",
    image: img2,
    codes: [],
    path: "/medical-gas",
  },
  {
    title: "Plumbing & Water Supply",
    image: img3,
    codes: [],
    path: "/plumbing-water-supply",
  },
  {
    title: "Household & Fuel Gas",
    image: img4,
    codes: [],
    path: "/household-fuel-gas",
  },
  {
    title: "Process Piping",
    image: img5,
    codes: [],
    path: "/industrial-process-application",
  },
];

export default function CFApplicationSection() {
  return (
    <section className="bg-white py-16 md:py-24 font-sans selection:bg-[#C43A26]/10">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8 text-center">
        {/* Header Block */}
        <span className="eyebrow-2 text-[#C43A26] tracking-[0.3em] uppercase block mb-3 font-albert">
          Applications
        </span>
        <h2 className="h2 tracking-tight text-[#272727] leading-tight mb-4">
          Every System. Every Industry.
        </h2>
        <p className="p2 text-[#454545]/80 max-w-3xl mx-auto mb-10 font-albert font-extralight">
          Parasmani fittings connect every type of copper piping system — from
          split AC connections to hospital gas lines.
        </p>

        {/* Asymmetric Responsive Grid Container */}
        <div className="flex flex-wrap justify-center gap-6">
          {industries.map((item, idx) => (
            <Link
              to={item.path}
              key={idx}
              className={`relative group overflow-hidden rounded-[14px] h-[220px] cursor-pointer transition-all duration-300 border-2 border-[#E5E5E5]/60 hover:border-[#B37D4E] shadow-sm z-30 block
                w-full 
                ${
                  idx < 3
                    ? "md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                    : "md:w-[calc(50%-12px)] lg:max-w-[350px] lg:flex-1"
                }
              `}
            >
              {/* Card Image Background */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />

              {/* Refined Linear Dark Gradient Overlay Layer */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60 group-hover:from-black/60 group-hover:via-black/30 group-hover:to-black/70 transition-colors duration-300 z-10" />

              {/* Top Text Line & Action Arrow */}
              <div className="absolute top-5 left-5 right-5 flex justify-between items-center text-white z-20">
                <h3 className="text-[17px] font-normal tracking-wide">
                  {item.title}
                </h3>
                <svg
                  className="w-4 h-4 text-white/90 transform group-hover:translate-x-1 transition-transform duration-300 ease-out"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>

              {/* Bottom Standards/Codes Badges Row */}
              <div className="absolute bottom-5 left-5 flex flex-wrap gap-2 z-20">
                {item.codes.map((code, codeIdx) => (
                  <span
                    key={codeIdx}
                    className="bg-white text-[#535353] group-hover:bg-[#F9F3EC] text-[14px] font-albert font-normal tracking-wide px-3.5 py-1.5 rounded-full border border-gray-200/50 shadow-sm transition-all duration-300 ease-out group-hover:border-[#B37D4E] group-hover:text-[#B37D4E]"
                  >
                    {code}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
