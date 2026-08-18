import React from "react";

const COMPLIANCE_STANDARDS_DATA = [
  {
    code: "ASTM B280",
    subtitle: "Air Conditioning & Refrigeration",
  },
  {
    code: "JIS H 3300",
    subtitle: "Copper & Alloy Seamless Tubes",
  },
  {
    code: "IS 10773",
    subtitle: "ACR Copper Tubes",
  },

  {
    code: "ASTM B75",
    subtitle: "Air Conditioning & Refrigeration",
  },
  {
    code: "EN 12735",
    subtitle: "HVAC/R",
  },
  {
    code: "ASME B16.22",
    subtitle: "Wrought Copper Fittings",
  },
  {
    code: "ASTM B68",
    subtitle: "Bright Annealed Copper Tubes",
  },
];

function StandardCard({ code, subtitle }) {
  return (
    <div
      className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] min-w-[240px] max-w-[280px] min-h-[120px] rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 font-albert bg-[#FBFBFB] border border-[#EAE2DA] hover:border-[#C68344] hover:shadow-sm cursor-pointer"
    >
      <div className="space-y-1">
        {/* Core Compliance Code */}
        <h3 className="text-[16px] font-medium tracking-wide text-[#646C88]">
          {code}
        </h3>

        {/* Engineering/Sector Classification Subtext */}
        <p className="text-[11px] font-normal text-[#646C88] tracking-wide leading-normal">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

/**
 * Core Compliance Infrastructure Section Layer
 */
export default function ComplianceStandardsSection() {
  return (
    <section className="w-full py-10 md:py-20 bg-[#FBFBFB]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Typography Section Header Blocks */}
        <div className="text-center mb-6 md:mb-2">
          <span className="eyebrow-2 tracking-[0.3em] uppercase block font-albert text-[#C43A26] mb-1">
            Compliance
          </span>
          <h2 className="h2 tracking-tight text-[#272727]">
            Built to Every Major Standard
          </h2>
        </div>

        {/* Detailed Copy Text Paragraph Description Block */}
        <div className="max-w-[960px] mx-auto  mb-16 font-albert">
          <p className="p2 font-light text-[#454545] leading-[1.2] text-center">
            Parasmani copper tubes for air conditioning and refrigeration are manufactured to the American, European, Japanese, and Indian standards for ACR copper tube, supplied with mill test certificates for consultant and contractor sign-off on HVAC/R projects.
          </p>
        </div>

        {/* Flex Centered Container System to automatically wrap asymmetric rows (4 on top, 2 centered below) */}
        <div className="flex flex-wrap justify-center items-center gap-6 max-w-[1200px] mx-auto">
          {COMPLIANCE_STANDARDS_DATA.map((std, idx) => (
            <StandardCard
              key={idx}
              code={std.code}
              subtitle={std.subtitle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
