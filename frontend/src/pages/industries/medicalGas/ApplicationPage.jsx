import React from "react";

// Pure, single-responsibility structural data representing the pixel-perfect mock.
// Separating content from layout structure allows clean reusability and scalability.
const APPLICATIONS_DATA = [
  {
    title: "Medical Oxygen (O₂)",
    desc: "Piped oxygen to ICUs, operating theatres, emergency bays, and ward bedhead units. Cleaned, capped, and supplied in Half Hard R250 for continuous pressure service.",
    tags: ['ICU / Critical Care', 'Emergency', "Operating Theatre"],
  },
  {
    title: "Nitrous Oxide (N₂O)",
    desc: "Anaesthetic agent for operating theatres and obstetrics. Supplied to the same BS EN 13348 cleanliness specification as oxygen lines.",
    tags: ['OT / Anaesthesia', "Obstetrics / OBG"],
  },
  {
    title: "Medical Air",
    desc: "Compressed medical air for ventilators, pneumatic surgical tools, and anaesthetic machines. Non-porous C12200 DHP wall ensures zero atmospheric contamination.",
    tags: ["Ventilators", "Surgical Tools", "ICU"],
  },
  {
    title: "Surgical Vacuum",
    desc: "Medical vacuum pipelines for wound drainage, airway management, and surgical aspiration. Half Hard R250 across all gas lines for system-wide consistency.",
    tags: ["OT Suction", "Wound Drainage", "ICU"],
  },
  {
    title: "CO₂ & Specialty Gases",
    desc: 'Carbon dioxide for laparoscopic surgery, helium and nitrogen for diagnostic equipment — same Half Hard R250 copper to EN 13348.',
    tags: ["Laparoscopy", 'Diagnostics', "Research Labs"],
  },
  {
    title: "Pharma & Research",
    desc: "Pharmaceutical manufacturing and biomedical research facilities requiring piped process gases and vacuum to EN 13348 cleanliness standards.",
    tags: ["Pharma GMP", "Research Facilities"],
  },
];

/**
 * Reusable, presentational AppCard component engineered for architectural separation.
 * Follows rigid typographic tracking, color, and interactive state scaling rules.
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
        <p className="text-[12px] font-light text-[#18234D] leading-[1.6] font-albert">
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
    <section className="w-full py-10 md:py-15 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-16">
          <span className="eyebrow-2 tracking-[0.3em] uppercase block font-albert text-[#C43A26] mb-1">
            Where we are specified
          </span>
          <h2 className="h2 tracking-tight text-[#272727]">
            One tube. Every gas. Every ward.
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