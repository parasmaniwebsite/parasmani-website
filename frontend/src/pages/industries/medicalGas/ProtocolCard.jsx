import React from 'react';
import DrawIcon from "../../../assets/industries/medicalGas/drawicon.png";
import DegreaseIcon from "../../../assets/industries/medicalGas/internalIcon.png";
import VisualIcon from "../../../assets/industries/medicalGas/visualIcon.png";
import CapIcon from "../../../assets/industries/medicalGas/capIcon.png";
import CarbonIcon from "../../../assets/industries/medicalGas/carbonIcon.png";

// --- Reusable Protocol Feature Card Component ---
const ProtocolCard = ({ iconSrc, title, description, isTransparent }) => {
  // If explicitly flagged as transparent, return an invisible structural spacer card
  if (isTransparent) {
    return <div className="hidden lg:block w-full h-full pointer-events-none select-none bg-transparent" />;
  }

  return (
    <div className="relative bg-[#F7F3EE] rounded-r-2xl rounded-l-md pl-[18px] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex w-full h-full">
      {/* Dark Left Accent Edge Accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-[#111E3D] rounded-l-md" />
      
      {/* Content Container */}
      <div className="w-full p-6 md:p-8 flex flex-col sm:flex-row items-start gap-5">
        {/* Mini Icon Base */}
        <div className="w-15 h-15 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-gray-100/30 p-4">
          <img 
            src={iconSrc} 
            alt={`${title} status indicator`} 
            className="w-16 h-16 object-cover"
          />
        </div>
        
        {/* Text Copy */}
        <div className="space-y-2 flex-1">
          <h3 className="font-albert text-[24px] font-medium text-[#272727] tracking-wide leading-tight mb-1">
            {title}
          </h3>
          <p className="font-albert text-[12px] leading-relaxed text-[#4A4A4A] font-normal">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main Structural Section Component ---
const CleanlinessProtocol = () => {
  const protocolPillars = [
    {
      icon: DrawIcon,
      title: "Draw & Anneal",
      description: "Parasmani MGPS tubes are cold drawn from C12200 DHP billet, annealed, and then drawn to Half Hard R250 temper in a controlled final pass. No lubricants are used in the final draw pass."
    },
    {
      icon: DegreaseIcon,
      title: "Internal Degreasing",
      description: "Parasmani MGPS tube interiors are chemically degreased after the final draw pass to remove all residual cutting oils, verified to the BS EN 13348 limit of ≤0.20 mg/dm² total carbon (EN 723 method)."
    },
    {
      icon: VisualIcon,
      title: "Visual & Eddy Current",
      description: "External surface inspection and eddy current testing for continuity and wall integrity. Every length verified before packing."
    },
    {
      icon: CapIcon,
      title: "Cap & Seal",
      description: "Both ends sealed with Parasmani MGPS plastic end caps immediately after inspection. Caps remain on until point of brazing on site."
    },
    {
      icon: CarbonIcon,
      title: "Carbon-Free Requirement",
      description: "BS EN 13348 and HTM 02-01 mandate nitrogen purging during brazing. Carbon scale in an oxygen line is a combustion risk. Parasmani tubes leave the factory carbon-free preserving that condition on site requires nitrogen purge throughout brazing."
    }
  ];

  return (
    <section className="w-full bg-white py-10 md:py-14 px-6 md:px-12 lg:px-20 flex justify-center">
      <div className="w-full max-w-7xl flex flex-col items-center">
        
        {/* Centered Typography Wrapper */}
        <div className="text-center max-w-3xl space-y-4 mb-14 md:mb-16">
          <span className="eyebrow-2 font-albert tracking-[0.3em] text-[#C43A26] uppercase block mb-1">
            INTERNAL CLEANLINESS PROTOCOL
          </span>
          <h2 className="h2 text-[#111827] leading-tight tracking-tight">
            What Parasmani does inside, matters most.
          </h2>
          <p className="p2 font-albert leading-relaxed text-[#6B7280] pt-1 max-w-2xl mx-auto">
            Parasmani MGPS tubes are internally cleaned, degreased, and sealed at the factory — meeting the stricter internal cleanliness requirements of BS EN 13348. A single contaminated length in an oxygen pipeline is a patient safety event. We treat it that way.
          </p>
        </div>

        {/* Modular Balanced Grid Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {protocolPillars.map((pillar, idx) => (
            <div key={idx}>
              <ProtocolCard 
                iconSrc={pillar.icon} 
                title={pillar.title}
                description={pillar.description}
              />
            </div>
          ))}
          
          {/* PIXEL PERFECT TRICK: Injects an absolute transparent structural twin directly beside the 5th card on desktop viewports */}
          <ProtocolCard isTransparent={true} />
        </div>

      </div>
    </section>
  );
};

export default CleanlinessProtocol;
