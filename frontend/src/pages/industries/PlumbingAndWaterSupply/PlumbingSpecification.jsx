import DrawIcon from "../../../assets/industries/PlumbingAndWaterSupply/potable.png";
import DegreaseIcon from "../../../assets/industries/PlumbingAndWaterSupply/bacteria.png";
import VisualIcon from "../../../assets/industries/PlumbingAndWaterSupply/thermometer-03.png";
import CapIcon from "../../../assets/industries/PlumbingAndWaterSupply/hourglass.png";
import CarbonIcon from "../../../assets/industries/PlumbingAndWaterSupply/recyclable.png";


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
      title: "Potable water certified",
      description:
        "Copper is globally approved for contact with drinking water — EN 1057 and WHO guidelines govern copper tube for water supply. No leaching of plasticisers, no taste or odour contamination, no microplastic shedding.",
    },
    {
      icon: DegreaseIcon,
      title: "Bacteriostatic",
      description:
        "Copper ions actively inhibit Legionella pneumophila, E. coli, and biofilm formation on the pipe wall. In hospitals, hotels, and large residential buildings where Legionnaires' disease is a risk, copper is the material of choice.",
    },
    {
      icon: VisualIcon,
      title: "High temperature rated",
      description:
        "Copper handles continuous water temperatures up to 120°C — well above the operating range of domestic hot water systems. CPVC, PPR, and uPVC degrade, soften, and fail at sustained high temperatures.",
    },
    {
      icon: CapIcon,
      title: "50+ year service life",
      description:
        "Properly installed copper plumbing does not crack, corrode, or leach with age. Unlike plastic pipe that becomes brittle and degrades over time, copper remains structurally sound for the entire life of the building.",
    },
    {
      icon: CarbonIcon,
      title: "Fully recyclable",
      description:
        "Copper is 100% recyclable and retains its full material value at end of life. Copper plumbing has the lowest lifecycle environmental footprint of any pipe material — plastic pipes are not recyclable and add to landfill.",
    },
  ];

  return (
    <section className="w-full bg-white py-10 md:py-14 px-6 md:px-12 lg:px-20 flex justify-center">
      <div className="w-full max-w-7xl flex flex-col items-center">
        {/* Centered Typography Wrapper */}
        <div className="text-center max-w-3xl space-y-4 mb-14 md:mb-16">
          <span className="eyebrow-2 font-albert tracking-[0.3em] text-[#C43A26] uppercase block mb-1">
            Why copper for water
          </span>
          <h2 className="h2 text-[#111827] leading-tight tracking-tight">
            The healthy pipe. By design.
          </h2>
          <p className="p2 font-albert leading-relaxed text-[#6B7280] pt-1 max-w-2xl mx-auto">
            For water supply inside buildings, material choice directly affects
            the health of every occupant. Copper's physical and chemical
            properties make it uniquely suited to both hot and cold water
            distribution — safe, permanent, and biologically beneficial.{" "}
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
