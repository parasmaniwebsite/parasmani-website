import React from "react";
import DrawIcon from "../../../assets/industries/household/nonComb.svg";
import DegreaseIcon from "../../../assets/industries/household/zeroGas.svg";
import VisualIcon from "../../../assets/industries/household/noEmb.svg";
import CapIcon from "../../../assets/industries/household/permanent.svg";
import CarbonIcon from "../../../assets/industries/household/noTaste.svg";

const ProtocolCard = ({ iconSrc, title, description, isTransparent }) => {
  // If explicitly flagged as transparent, return an invisible structural spacer card
  if (isTransparent) {
    return (
      <div className="hidden lg:block w-full h-full pointer-events-none select-none bg-transparent" />
    );
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
            className="w-full h-full object-contain"
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

const SafePipeline = () => {
  const protocolPillars = [
    {
      icon: DrawIcon,
      title: "Non-combustible",
      description:
        "Copper does not burn, does not melt and drip like plastic, and does not emit toxic fumes in a fire. In a building fire, copper gas pipes hold their integrity — plastic pipes fail and feed the fire.",
    },
    {
      icon: DegreaseIcon,
      title: "Zero gas permeation",
      description:
        "Gas cannot permeate through copper walls. Plastic pipes — even HDPE — allow trace gas molecules to migrate through the pipe wall over time, creating an accumulation risk inside walls and ceiling voids.",
    },
    {
      icon: VisualIcon,
      title: "No embrittlement with age",
      description:
        "Copper does not become brittle or degrade in contact with LPG or PNG over decades. Rubber and flexible hose alternatives degrade, stiffen, and crack — copper lasts the life of the building.",
    },
    {
      icon: CapIcon,
      title: "Permanent brazed joints",
      description:
        "Brazed copper joints are metallurgically bonded — permanent and leak-free. Compression fittings on flexible hose can loosen with vibration or thermal cycling. Copper brazed joints do not.",
    },
    {
      icon: CarbonIcon,
      title: "No taste, no odour contamination",
      description:
        "Copper is chemically inert to LPG and PNG. It does not impart any smell or taste to the gas supply — important in commercial kitchen applications where gas quality affects food.",
    },
  ];

  return (
    <section className="w-full bg-white py-10 md:py-14 px-6 md:px-12 lg:px-20 flex justify-center">
      <div className="w-full max-w-7xl flex flex-col items-center">
        {/* Centered Typography Wrapper */}
        <div className="text-center max-w-3xl space-y-4 mb-14 md:mb-16">
          <span className="eyebrow-2 font-albert tracking-[0.3em] text-[#C43A26] uppercase block mb-1">
            Why copper for gas piping
          </span>
          <h2 className="h2 text-[#111827] leading-tight tracking-tight">
            The safest pipe for gas. By design.
          </h2>
          <p className="p2 font-albert leading-relaxed text-[#6B7280] pt-1 max-w-2xl mx-auto">
            For gas piping inside buildings, material choice is a life-safety
            decision — not just a specification. Copper's physical properties
            make it the most appropriate material for LPG and PNG distribution,
            from the meter to the point of use.{" "}
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

export default SafePipeline;
