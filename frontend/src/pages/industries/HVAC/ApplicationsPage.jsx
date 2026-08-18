import React from 'react';

// Pure, single-responsibility structural data representing the pixel-perfect mock.
// Separating content from layout structure allows clean reusability and scalability.
const APPLICATIONS_DATA = [
  {
    title: "Split & VRF Systems",
    desc: "Residential and commercial split ACs, multi-split systems, and VRF networks across India. Pancake coils for indoor-outdoor connections, hard tubes for VRF header mains.",
    tags: ["1/4\" Liquid Line", "3/8\"–1/2\" Suction", "Pancake Coil"]
  },
  {
    title: "Chiller Plants",
    desc: "Central AC for commercial buildings, hotels, hospitals and data centres. Hard tubes in large ODs for refrigerant mains and chilled water circuits.",
    tags: ["1\"–4\" OD", "Half Hard", "Large Diameter"]
  },
  {
    title: "Cold Storage",
    desc: "Walk-in coolers, deep freeze rooms, industrial cold stores. R404A and R134a compatible. Hard and soft copper for evaporator coils and condensate headers.",
    tags: ["R404A / R134a", "Low Temp Rated", "All Sizes"]
  },
  {
    title: "Metro & Rail Infrastructure",
    desc: "Formally approved for DMRC (Delhi & Patna Metro) and MMRCL (Mumbai Metro) HVAC copper piping. Indian Railways CLW capability assessment cleared.",
    tags: ["DMRC Aprvd.", "MMRCL Aprvd.", "CLW Cleared"]
  },
  {
    title: "Process Cooling",
    desc: "Industrial process chillers, heat exchangers, and condensers. Large diameter hard tubes up to 5 1/8\" OD. Custom wall thicknesses. Bulk project supply.",
    tags: ["Custom Wall", "Up to 5 1/8\" OD", "Bulk Orders"]
  },
  {
    title: "OEM Project Supply",
    desc: "Trusted copper tubes and coils for HVAC OEMs and refrigeration applications. Supply standards aligned with leading brands like LG, Panasonic, and Haier. Consistent quality for demanding production needs.",
    tags: ["OEM Supply", "HVAC Applications", "OEM Trusted"]
  }
];

/**
 * Reusable, presentational AppCard component engineered for architectural separation.
 * Follows rigid typographic tracking, color, and absolute layout scaling rules.
 */
function AppCard({ title, desc, tags }) {
  return (
    <div 
      className="group rounded-2xl p-6 md:p-7 flex flex-col justify-between text-left transition-all duration-300 min-h-[250px] font-albert bg-[#F9F3EC] border border-[#CCCCCC] hover:bg-[#FDFDFD] hover:border-[#C68344] cursor-pointer"
    >
      <div className="space-y-3">
        {/* Title */}
        <h3 className="text-[24px] font-normal tracking-tight text-[#272727] font-albert">
          {title}
        </h3>
        
        {/* Paragraph Details */}
        <p className="text-[12px]  font-light text-[#18234D] leading-[1.6] font-albert">
          {desc}
        </p>
      </div>

      {/* Tags Array Container */}
      <div className="flex flex-wrap gap-2 pt-6">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-[12px] font-medium px-3.5 py-1.5 rounded-full border tracking-wide transition-colors bg-transparent border-[#8A8A8A] text-[#18234D] group-hover:border-[#C68344]/90"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Core Application Layout Section
 * Completely responsive and styled directly against the source architecture mock.
 */
export default function HVACApplicationsSection() {
  return (
    <section className="w-full py-10 md:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-16">
          <span className="eyebrow-2 tracking-[0.3em] uppercase block font-albert text-[#C43A26] mb-1">
            Where we are specified
          </span>
          <h2 className="h2 tracking-tight text-[#272727] leading-10">
            Every HVAC&R application
          </h2>
        </div>

        {/* 3-Column Component Grid Interface */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {APPLICATIONS_DATA.map((app, idx) => (
            <AppCard
              key={idx}
              title={app.title}
              desc={app.desc}
              tags={app.tags}
            />
          ))}
        </div>

      </div>
    </section>
  );
}