import React from 'react';

// ============================================================================
// REUSABLE SUB-COMPONENTS
// ============================================================================

/**
 * ComplianceCard Component
 */
const ComplianceCard = ({ standard, description }) => {
  return (
    <div className="w-full mx-auto max-w-[280px] min-h-[120px] rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 font-albert bg-[#FBFBFB] border border-[#EAE2DA] hover:border-[#C68344] hover:shadow-sm cursor-pointer">
      <h3 className="text-[16px]  font-medium tracking-wide text-[#646C88] mb-1">
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

const ComplianceSection = () => {
  // Configurable dynamic data for scaling or localization
  const standardsData = [
    { standard: 'EN 13348', description: 'Medical Gases & Vacuum' },
    { standard: 'ASTM B819', description: 'Medical Gas Tube' },
  ];

  return (
    <section className="relative w-full bg-[#FBFBFB] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-10 overflow-hidden select-none">
      
      {/* Font Injection Hook to guarantee custom font availability without global styling mutations */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;700&display=swap');
        /* Note: 'Obviously' is a premium commercial font. Fallbacks are configured below. */
      `}} />

      {/* Content Container */}
      <div className="w-full max-w-[1140px] flex flex-col items-center text-center">
        
        {/* Category Label */}
        <span className="eyebrow-2 tracking-[0.3em] uppercase block font-albert text-[#C43A26] mb-1">
          Compliance
        </span>

        {/* Main Headline */}
        <h2 className="h2 tracking-tight text-[#272727] mb-4 sm:mb-6 max-w-xl sm:max-w-none">
          Built to the standards that matter most.
        </h2>

        {/* Paragraph Copy */}
        <p className="p2 font-light tracking-normal text-[#454545] font-albert mb-8 sm:mb-10 text-center max-w-2xl mx-auto leading-relaxed">
          Medical gas copper tubes are governed by stricter standards than any other application. 
          Parasmani MGPS tubes are manufactured to BS EN 13348 as the primary standard, 
          and also meet the relevant ACR and plumbing standards used across the rest of the project.
        </p>

        {/* Dynamic Reusable Cards Wrapper Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-[580px] mx-auto justify-center items-center">
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

export default ComplianceSection;