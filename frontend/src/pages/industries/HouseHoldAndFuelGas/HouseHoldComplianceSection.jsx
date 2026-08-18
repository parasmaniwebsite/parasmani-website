import React from "react";

// ============================================================================
// REUSABLE SUB-COMPONENTS
// ============================================================================

/**
 * ComplianceCard Component
 * @param {string} standard - The main standard name/number (e.g., 'EN 13348')
 * @param {string} description - The sub-label describing the scope (e.g., 'Medical Gas Tube')
 */
const ComplianceCard = ({ standard, description }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[264px] h-[100px] bg-[#FBFBFB] border border-[#B8B8B8] rounded-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-[#C27D38] hover:shadow-[0_4px_30px_rgba(194,125,56,0.15)] px-6 cursor-pointer">
      <h3 className="font-albert font-light text-[16px] leading-[32px] text-[#646C88] tracking-tight">
        {standard}
      </h3>
      <p className="font-albert font-medium text-[11px] leading-[20px] text-[#646C88] tracking-normal text-center">
        {description}
      </p>
    </div>
  );
};

// ============================================================================
// MAIN SECTION COMPONENT
// ============================================================================

const HouseHoldComplianceSection = () => {
  // Configurable dynamic data for scaling or localization
  const standardsData = [
    { standard: "EN 1057", description: "Plumbing, Heating & Gas Systems" },
    { standard: "EN 1254-1", description: "Copper Capillary Solder Fittings" },
  ];

  return (
    <section className="relative w-full min-h-[640px] bg-[#FBFBFB] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10 overflow-hidden select-none">
      {/* Font Injection Hook to guarantee custom font availability without global styling mutations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;700&display=swap');
        /* Note: 'Obviously' is a premium commercial font. Fallbacks are configured below. */
      `,
        }}
      />

      {/* Content Container */}
      <div className="w-full max-w-[1140px] flex flex-col items-center text-center">
        {/* Category Label */}
        <span className="eyebrow-2 font-albert leading-[20px] tracking-[0.3em] text-[#C43A26] uppercase mb-0">
          Compliance
        </span>

        {/* Main Headline */}
        <h2 className="h2 leading-[52px] sm:leading-[58px] text-[#272727] tracking-[-0.02em] max-w-[950px] mb-6">
          Manufactured to the right standards.
        </h2>

        {/* Paragraph Copy */}
        <p className="p2 font-albert font-normal leading-[26px] text-[#4A4A4A] max-w-[1090px] mb-16 antialiased">
          Parasmani copper tubes for plumbing and water supply are manufactured
          to the primary European standards for copper tube in water and
          sanitary installations, supplied with mill test certificates for
          consultant and contractor sign-off on residential, commercial, and
          hospitality projects.
        </p>

        {/* Dynamic Reusable Cards Wrapper */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-[760px]">
          {standardsData.map((item, index) => (
            <ComplianceCard
              key={index}
              standard={item.standard}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HouseHoldComplianceSection;