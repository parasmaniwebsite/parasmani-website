import React, { useEffect, useRef, useState } from "react";
import ASTM from "../../../assets/about/qualityAssurance/astm.png";
import JIS from "../../../assets/about/qualityAssurance/JIS.png";
import CEN from "../../../assets/about/qualityAssurance/CEN.png";
import BSI from "../../../assets/about/qualityAssurance/BSI.png";
import ISI from "../../../assets/about/qualityAssurance/ISI.png";

export default function ComplianceSection() {
  const complianceData = [
    {
      title: "ASME B16.22",
      subtitle: "Wrought Fittings — HVAC, Plumbing & Medical Gas",
      logo: ASTM,
      name: "ASTM",
    },
    {
      title: "EN 1254-1",
      subtitle: "Copper Capillary Solder Fittings",
      logo: BSI,
      name: "BSI",
    },
    {
      title: "JIS H 3401",
      subtitle: "Wrought Copper Pipe Fittings",
      logo: CEN,
      name: "CEN",
    },
  ];

  const [isIntersected, setIsIntersected] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
        } else {
          setIsIntersected(false); // Cleanly resets state if the user scrolls out of view
        }
      },
      { threshold: 0.15 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-[#FFFFFF] pt-20 pb-24 px-6 md:px-12 lg:px-16 select-none font-albert">
      {/* Header Block */}
      <div className="max-w-7xl mx-auto text-center mb-14">
        <span className="eyebrow-2 text-[#C43A26] tracking-[0.3em] uppercase block mb-3 font-albert">
          COMPLIANCE
        </span>
        <h2 className="h2 tracking-tight text-[#272727] leading-tight mb-4">
          Built to Every Major Standard
        </h2>
      </div>

      {/* Grid Canvas */}
      <div
        ref={containerRef}
        className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-6 justify-items-center"
      >
        {complianceData.map((item, index) => (
          <div
            key={index}
            className="w-full max-w-[320px] h-[116px] [perspective:1000px] group cursor-pointer"
            style={{ transitionDelay: `${index * 60}ms` }}
          >
            {/* 3D Chassis */}
            <div
              className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ${
                isIntersected
                  ? "[transform:rotateX(180deg)] group-hover:[transform:rotateX(360deg)]"
                  : "[transform:rotateX(0deg)] group-hover:[transform:rotateX(180deg)]"
              }`}
            >
              {/* FRONT SIDE: Logo layer (0 degrees base, 360 degrees when fully flipped on hover) */}
              <div className="absolute inset-0 bg-[#5E677F] rounded-[14px] flex items-center justify-center p-6 [backface-visibility:hidden] [transform:rotateX(0deg)] group-hover:[transform:rotateX(360deg)]">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-full h-full max-w-[110px] object-contain filter brightness-0 invert opacity-95"
                />
              </div>

              {/* BACK SIDE: Text Value Card (Starts at 180 degrees, hides when flipped to 360) */}
              <div className="absolute inset-0 bg-white border border-[#E2E6EC] rounded-[14px] flex flex-col justify-center items-center px-4 shadow-sm [backface-visibility:hidden] [transform:rotateX(180deg)]">
                <h3 className="text-[#646C88] font-albert font-medium text-[17px] tracking-wide mb-1.5">
                  {item.title}
                </h3>
                <p className="text-[#646C88] text-[11.5px] font-albert font-medium tracking-normal leading-normal max-w-[240px] text-center">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}