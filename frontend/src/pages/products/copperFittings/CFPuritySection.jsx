import React, { useState } from "react";

export default function CFPuritySection() {
  // 1. Data Structure defining the specific content matrix for each technical attribute
  const materialSpecs = [
    {
      id: "purity",
      label: "C12200 DHP",
      title: "99.90% Purity",
      description:
        "All Parasmani fittings are wrought copper — formed from C12200 DHP at 99.90% purity. Wrought fittings have a denser grain structure than cast alternatives, giving superior pressure rating, leak resistance, and longevity in brazed joints.",
    },
    {
      id: "deoxidized",
      label: "Cu ≥ 99.90%",
      title: "99.90% Purity",
      description:
        "Manufactured from A-Grade copper cathodes using C12200 (DHP) phosphorus - deoxidized copper with a minimum 99.90% copper purity. Superior thermal conductivity, corrosion resistance, and mechanical strength throughout its full cross-section.",
    },
    {
      id: "temper",
      label: "Wrought · Not Cast",
      title: "Wrought · Not Cast",
      description:
        "Fully annealed to a soft temper state. This provides structural technicians with high ductility for easy hand bending, reducing the need for mechanical elbow fittings in complex paths.",
    },
    {
      id: "cathodes",
      label: "Brazeable",
      title: "Brazeable",
      description:
        "Exclusively using premium-grade electrolytic copper cathodes as base feedstock. This guarantees near-zero trace impurities, exceptional thermal performance, and reliable electrical conductivity.",
    },
  ];

  // 2. Active Tab State Engine (defaults to the first purity spec object)
  const [activeSpecId, setActiveSpecId] = useState("");

  // Find the currently active content block based on state
  const activeSpec =
    materialSpecs.find((spec) => spec.id === activeSpecId) || materialSpecs[0];

  return (
    <section className="bg-[#FAF2EC] py-12 border-y border-[#F3E2D5]">
      <div className="max-w-[1440px] mx-auto px-8 md:px-36 flex flex-col md:flex-row md:items-start justify-between gap-6">
        {/* Left Column - Dynamically updates heading based on selection */}
        <div className="w-full md:w-1/2 md:sticky md:top-4 pb-2 md:py-10">
          <span className="eyebrow-2 tracking-[0.3em] text-[#C43A26] uppercase block mb-1">
            Material
          </span>

          <h2 className="h2 text-[#C68344] md:min-h-[80px] transition-all duration-300">
            {activeSpec.title}
          </h2>
        </div>

        {/* Right Column - Dynamically updates paragraph and highlights buttons */}
        <div className="w-full md:w-2/3">
          <div className="md:min-h-[80px]">
            <p className="p2 text-[#454545]/90 leading-relaxed max-w-2xl transition-all duration-300">
              {activeSpec.description}
            </p>
          </div>

          {/* Interactive Specification Grid/Flex Matrix Selection area */}
          <div className="flex flex-wrap gap-4 mt-6 font-semibold uppercase tracking-wider select-none">
            {materialSpecs.map((spec, idx) => {
              const isActive = activeSpecId === spec.id;
              return (
                <button
                  key={idx}
                  // onClick={() => setActiveSpec(idx)}
                  className={`px-3 py-1.5 rounded-4xl border-[1.2px] transition-all duration-300 focus:outline-none text-[14px]
                    ${
                      isActive
                        ? "border-[#9E6936] text-[#9E6936] bg-white shadow-sm ring-0 ring-[#9E6936]/30 font-medium"
                        : "border-[#CFCFCF] text-[#676767] bg-white/60 font-medium hover:border-[#9E6936] hover:text-[#9E6936] hover:bg-white hover:shadow-sm"
                    }
                  `}
                >
                  {spec.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
