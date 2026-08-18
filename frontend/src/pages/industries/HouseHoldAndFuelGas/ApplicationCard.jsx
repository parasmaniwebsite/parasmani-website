const APPLICATIONS_DATA = [
  {
    title: "Residential PNG Networks",
    desc: "Apartment buildings, housing societies, and townships receiving piped natural gas. Parasmani copper tubes for the riser and floor distribution network — from the meter bank to each flat's kitchen.",
    tags: ["PNG Distribution", "Building Riser", "Floor Mains"],
  },
  {
    title: "Hotels & Hospitality Kitchens",
    desc: "High-volume commercial kitchen gas supply in five-star hotels, resorts, and banquet facilities. Copper handles continuous high-flow rates in large commercial kitchen environments reliably and safely.",
    tags: ["High Flow Rate", "LPG / PNG", "Commercial Kitchen"],
  },
  {
    title: "Restaurants & Cloud Kitchens",
    desc: "Compact kitchen gas distribution for restaurants, standalone eateries, and cloud kitchens. Copper's small OD range works efficiently in tight kitchen spaces. Brazed joints withstand the vibration of commercial kitchens.",
    tags: ["Compact Runs", "LPG Bank", "Brazed Joints"],
  },
  {
    title: "LPG Bank Distribution",
    desc: "Central LPG cylinder bank to multiple points of use within a building. Housing, hostels, PGs, and residential complexes using centralized LPG instead of individual cylinders. Copper piping from the manifold throughout the building.",
    tags: ["Centralised LPG", "Manifold to Points"],
  },
  {
    title: "Institutional & Canteen Kitchens",
    desc: "Gas supply to hospital kitchens, school and college canteens, corporate cafeterias, and government mess facilities. Large-scale institutional cooking requires reliable, permanently jointed gas piping.",
    tags: ["High Volume", "Institutional", "LPG / PNG"],
  },
  {
    title: "Industrial Process Gas",
    desc: "Factory gas lines, laboratory gas distribution, and manufacturing process gas supply. Industrial facilities requiring permanent, leak-free gas piping for process burners, furnaces, and heating systems.",
    tags: ["Process Burners", "Lab Gas", "Industrial Supply"],
  },
];

function AppCard({ title, desc, tags }) {
  return (
    <div className="group rounded-2xl p-6 md:p-7 flex flex-col justify-between text-left transition-all duration-300 min-h-[250px] font-albert bg-[#F9F3EC] border border-[#CCCCCC] hover:bg-[#FDFDFD] hover:border-[#C68344] cursor-pointer">
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
            className="text-[12px]  font-medium px-3.5 py-1.5 rounded-full border tracking-wide transition-colors bg-transparent border-[#8A8A8A] text-[#18234D] group-hover:border-[#C68344]/90"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ApplicationsSection() {
  return (
    <section className="w-full py-10 md:py-10 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-16">
          <span className="eyebrow-2 tracking-[0.3em] uppercase block font-albert text-[#C43A26] mb-1">
            Where we are specified
          </span>
          <h2 className="h2 tracking-tight text-[#272727]">
            Every gas application. Covered.
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

        {/* Brazing Rod Specification Note */}
        <div className="mt-10 md:mt-12 rounded-[20px] border border-[#EFE2D5] bg-[#FDFAF6] px-6 py-8 md:px-10 text-center font-albert">
          <h3 className="text-[20px] font-semibold tracking-tight text-[#18234D] mb-3">
            Important Installation Note — Brazing Rod Specification
          </h3>
          <p className="text-[14px] font-normal leading-[1.6] text-[#18234D]/80 max-w-[1020px] mx-auto">
            Copper gas joints must be brazed with a silver-based alloy of
            minimum 45% silver content (e.g. BAg-7 or equivalent).
            Phosphor–copper rod (BCuP series) must not be used on gas piping —
            it is for HVAC refrigerant joints only. Always purge with nitrogen
            during brazing to prevent internal oxidation scale. All gas
            installations must comply with your local gas authority's
            requirements — MGL, IGL, GAIL, or the applicable city gas
            distribution company — and be commissioned and certified by a
            licensed gas contractor.
          </p>
        </div>
      </div>
    </section>
  );
}
