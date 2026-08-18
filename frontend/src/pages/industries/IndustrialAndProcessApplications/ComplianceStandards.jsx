import React from "react";

/**
 * Reusable Standard Compliance Grid Card
 */
function ComplianceCard({ standardCode, description }) {
  // CLEANED: Removed math calculations and let the parent grid structure handle width fluidly
  const cardBaseStyles = "w-full min-h-[120px] rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 font-albert bg-[#FBFBFB] border border-[#EAE2DA] hover:border-[#C68344] hover:shadow-sm cursor-pointer";

  return (
    <div className={cardBaseStyles}>
      <h3 className="text-[16px] font-medium tracking-wide text-[#646C88] mb-1">
        {standardCode}
      </h3>
      <p className="text-[11px] font-normal text-[#646C88] tracking-wide leading-normal">
        {description}
      </p>
    </div>
  );
}

export default function ComplianceStandards() {
  const standardsData = [
    { id: 1, code: "ASTM B280", desc: "Air Conditioning & Refrigeration" },
    { id: 2, code: "JIS H 3300", desc: "Copper & Alloy Seamless Pipes" },
    { id: 3, code: "ASME B16.22", desc: "Wrought Copper Fittings" },
    { id: 4, code: "ASTM B68", desc: "Bright Annealed Copper Tubes" },
    { id: 5, code: "IS 10773", desc: "ACR Copper Tubes" },
    { id: 6, code: "EN 12735", desc: "Copper Tubes for HVAC/R" },
  ];

  return (
    <section className="w-full bg-[#F5F5F5] py-10 md:py-15 px-4 sm:px-8 md:px-12 lg:px-24 font-sans select-none">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Top Segment Section Typography Header Block */}
        <div className="text-center mb-10 max-w-[840px] mx-auto">
          <span className="eyebrow-2 tracking-[0.3em] uppercase block font-albert text-[#C43A26] mb-1">
            Compliance
          </span>
          <h2 className="h2 tracking-tight text-[#272727] mb-4">
            Meets every major industrial standard.
          </h2>
          {/* FIXED: Restructured inverted font rules from text-2xl back down to normal mobile scales */}
          <p className="p2 font-light tracking-tight text-[#646C88] font-albert leading-relaxed px-2 sm:px-0">
            Parasmani industrial copper tubes are manufactured to the international ACR and refrigeration standards, 
            each supply backed by mill test certificates for engineering sign-off on industrial projects.
          </p>
        </div>

        {/* 
          RESTRUCTURED GRID SYSTEM:
          - Mobile (default): Clean, readable 2-column grid instead of huge stretched full-width boxes.
          - Tablet (sm/md): Transitions perfectly to 3 columns.
          - Desktop (lg): Renders beautifully as a 6-column single row layout.
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 w-full justify-center">
          {standardsData.map((item) => (
            <ComplianceCard
              key={item.id}
              standardCode={item.code}
              description={item.desc}
            />
          ))}
        </div>

      </div>
    </section>
  );
}