import React from "react";

// ============================================================================
// REUSABLE SUB-COMPONENTS
// ============================================================================

/**
 * StandardCard Component
 * @param {string} standard - The main standard identifier (e.g., 'EN 1057')
 * @param {string} description - Sub-label describing standard use-case
 */
const StandardCard = ({ standard, description }) => {
  return (
    <div
      className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] min-w-[240px] max-w-[280px] min-h-[120px] rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 font-albert bg-[#FBFBFB] border border-[#EAE2DA] hover:border-[#C68344] hover:shadow-sm cursor-pointer"
    >
      <h3 className="text-[16px] font-medium tracking-wide text-[#646C88]">
        {standard}
      </h3>
      <p className="text-[11px] font-normal text-[#646C88] tracking-wide leading-normal">
        {description}
      </p>
    </div>
  );
};

// ============================================================================
// MAIN SECTION COMPONENT
// ============================================================================

const GasComplianceSection = () => {
  // Config data array driving clean layout structure without manual overrides
  const complianceData = [
    {
      standard: "EN 1057",
      description: "Plumbing, Heating & Gas Systems",
    },
    {
      standard: "ASTM B837",
      description: "Natural gas & LPG distribution",
    },
    {
      standard: "EN 1254-1",
      description: "Copper Capillary Solder Fittings",
    },
  ];

  return (
    <section className="relative w-full min-h-[680px] bg-[#fbfbfb] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10 overflow-hidden select-none">
      {/* Content Container */}
      <div className="w-full max-w-[1140px] flex flex-col items-center text-center">
        {/* Category Context Label */}
        <span className="eyebrow-2 tracking-[0.3em] uppercase block font-albert text-[#C43A26] mb-1">
          Compliance
        </span>

        {/* Section Headline */}
        <h2 className="h2 tracking-tight text-[#272727] mb-10">
          Manufactured to the right standards.
        </h2>

        {/* Explanatory Copy */}
        <p className="p2 font-albert font-normal leading-4.4 text-[#272727] max-w-[790px] mb-16 antialiased">
          Parasmani copper tubes for gas piping are manufactured to the primary
          European and American standards for copper tube in gas service,
          supplied with mill test certificates for contractor and consultant
          sign–off.
        </p>

        {/* 3-Column Reusable Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1120px] justify-items-center mb-12">
          {complianceData.map((item, index) => (
            <StandardCard
              key={index}
              standard={item.standard}
              description={item.description}
            />
          ))}
        </div>

        {/* Disclaimer Note Box */}
        <div className="w-full max-w-[1120px] bg-[#EBEFF5] rounded-[14px] p-5 text-center mt-4">
          <p className="font-albert font-normal text-[14px] leading-[18px] text-[#646C88] antialiased max-w-[1020px] mx-auto">
            Note: Your gas contractor or consultant should verify that the
            installation design and commissioning comply with your city gas
            distribution company's (CGD) approved material specifications and
            connection procedures.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GasComplianceSection;