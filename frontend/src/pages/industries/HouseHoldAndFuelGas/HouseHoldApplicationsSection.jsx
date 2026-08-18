// import React from "react";

// const ApplicationCard = ({ title, desc, tags }) => {
//   return (
//     <div
//       className="group w-full bg-[#F9F3EC] rounded-[16px] p-6 sm:p-8 flex flex-col justify-between border border-[#EAE3DA] min-h-[300px] transition-all duration-300 hover:border-[#C27D38] hover:bg-[#FDFDFD] hover:shadow-[0_4px_24px_rgba(194,125,56,0.06)] cursor-pointer"
//     >
//       {/* Top Text Segment */}
//       <div>
//         <h3 className="font-albert font-medium text-[19px] leading-[26px] text-[#1E293B] mb-3 tracking-tight">
//           {title}
//         </h3>
//         <p className="font-albert font-normal text-[14px] leading-[22px] text-[#475569] mb-6 antialiased">
//           {desc}
//         </p>
//       </div>

//       {/* Dynamic Pill Tags Layout */}
//       <div className="flex flex-wrap gap-2 pt-2">
//         {tags.map((tag, idx) => (
//           <span
//             key={idx}
//             className="font-albert font-medium text-[11px] leading-[14px] tracking-wide px-3 py-1.5 rounded-full border bg-transparent border-[#C5BCB4] text-[#4A4A4A] transition-colors duration-300 group-hover:border-[#C68344]/40"
//           >
//             {tag}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// const HouseHoldApplicationsSection = () => {
  // const cardsData = 

//   return (
//     <section className="relative w-full bg-[#FFFFFF] flex flex-col items-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 select-none">
//       {/* 1. Header Copy Block */}
//       <div className="w-full max-w-[1140px] flex flex-col items-center text-center mb-16">
//         <span className="eyebrow-2 font-albert leading-[18px] tracking-[0.3em] text-[#C43A26] uppercase mb-4">
//           Where We Are Specified
//         </span>
//         <h2 className="h2 leading-[44px] sm:leading-[50px] text-[#1E293B] tracking-tight">
//           Every gas application. Covered.
//         </h2>
//       </div>

//       {/* 2. Responsive 3-Column Workspace Grid */}
//       <div className="w-full max-w-[1140px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
//         {cardsData.map((card, index) => (
//           <ApplicationCard
//             key={index}
//             title={card.title}
//             desc={card.desc}
//             tags={card.tags}
//           />
//         ))}
//       </div>

      
//     </section>
//   );
// };

// export default HouseHoldApplicationsSection;



const APPLICATIONS_DATA = [
    {
      title: "Residential Hot & Cold Water",
      desc:
        "Apartment buildings, villas, and townships receiving municipal supply or borewell water. Parasmani copper tubes for both cold water risers and hot water circuits — from the main to each flat's kitchen and bathrooms.",
      tags: ["Hot and Cold Riser", "Floor distr.", "Potable Water"],
    },
    {
      title: "Hotels & Hospitality",
      desc:
        "High-volume hot water supply for five-star hotels, resorts, and serviced apartments — large kitchen supply, laundry circuits, spa and pool heating, and guest room distribution. Continuous high-temperature service life.",
      tags: ["High Temp Circuits", "Spa & Laundry", "EN 1057"],
    },
    {
      title: "Solar Thermal Systems",
      desc:
        "Copper is the only appropriate material for solar water heater connections — collector outlet temperatures can exceed 90°C. Plastic pipes degrade and fail at these temperatures. Copper handles it indefinitely.",
      tags: ["High-Temp Rated", "Collector Lines", "Soft Annealed Coil"],
    },
    {
      title: "Underfloor Heating",
      desc:
        "Embedded copper loops for radiant floor heating in premium residential and commercial spaces. Copper's thermal conductivity ensures highly efficient heat transfer from the circuit to the floor slab and room above.",
      tags: ["Radiant Heating", "Embedded Loops", "391 W/mK"],
    },
    {
      title: "Hospitals & Institutions",
      desc:
        "Potable water supply in hospitals, schools, government buildings, and canteen facilities. Where water quality is a health matter — not just a comfort — copper's bacteriostatic nature is the standard of care.",
      tags: ["Bacteriostatic", "Legionella Control", "Institutional"],
    },
    {
      title: "Swimming Pools & Spa",
      desc:
        "Pool heating circuits, spa plumbing, and water feature supply. Copper's natural resistance to chlorinated water and its thermal conductivity make it the preferred choice for pool and leisure facility applications.",
      tags: ["Chlorine Resistant", "Pool Heating", "Spa Circuits"],
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
            className="text-[12px] font-medium px-3.5 py-1.5 rounded-full border tracking-wide transition-colors bg-transparent border-[#8A8A8A] text-[#18234D] group-hover:border-[#C68344]/90"
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
    <section className="w-full py-10 md:py-15 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-16">
          <span className="eyebrow-2 tracking-[0.3em] uppercase block font-albert text-[#C43A26] mb-1">
            Where we are specified
          </span>
          <h2 className="h2 tracking-tight text-[#272727]">
            Every water application. Covered.
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

      {/* 3. Bottom Important Installation Callout Panel */}
      <div className="w-full max-w-[1140px] border border-[#E2E8F0] bg-white rounded-[16px] p-6 sm:p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.01)] mt-20 mx-auto">
        <h4 className="font-albert font-medium text-[15px] sm:text-[16px] leading-[22px] text-[#646C88] mb-3 tracking-tight">
          Soldering vs Brazing for Water Joints
        </h4>
        <p className="font-albert font-normal text-[13px] sm:text-[12.5px] leading-[18px] text-[#646C88] max-w-[1020px] mx-auto antialiased">
          For potable water plumbing, capillary solder joints with lead-free solder (e.g. Sn97Cu3) are widely accepted for domestic use and meet EN 1057 requirements. Never use lead-bearing solder on potable water joints — lead is toxic and prohibited. For high-temperature circuits — solar thermal or commercial hot water above 80°C continuously — silver braze (BAg-7 or equivalent) is recommended for joint integrity at elevated temperature. In all cases, use a water-soluble flux, flux the joint thoroughly, and flush the system with clean water before commissioning to clear all flux residue.
        </p>
      </div>
      
      
    </section>
  );
}
