import React from "react";

// ============================================================================
// REUSABLE SUB-COMPONENTS
// ============================================================================

/**
 * Custom Brand Checkmark Component
 */
const PlumbingCheckIcon = () => (
  <svg
    className="w-[14px] h-[14px] text-[#C27D38] flex-shrink-0 mt-[3px]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const PlumbingComparisonSection = () => {
  // Table 1 Dataset: Material Comparison Matrix
  const comparisonHeaders = [
    "Property",
    "Copper",
    "CPVC",
    "GI Steel",
    "PPR / UPVC",
  ];
  const comparisonRows = [
    {
      prop: "Potable water safety",
      copper: "Certified",
      cpvc: "Acceptable",
      gi: "Rust risk",
      ppr: "Varies",
    },
    {
      prop: "Bacteria resistance",
      copper: "Bacteriostatic",
      cpvc: "Biofilm risk",
      gi: "Corrosion / biofilm",
      ppr: "Biofilm risk",
    },
    {
      prop: "Max service temp",
      copper: "120°C",
      cpvc: "93°C (limit)",
      gi: "~80°C",
      ppr: "60–70°C",
    },
    {
      prop: "Service life",
      copper: "50+ years",
      cpvc: "25–30 years",
      gi: "Corrodes in 10–20 yrs",
      ppr: "20–25 years",
    },
    {
      prop: "Fire behaviour",
      copper: "Non-combustible",
      cpvc: "Burns / toxic fumes",
      gi: "Non-combustible",
      ppr: "Burns / toxic fumes",
    },
    {
      prop: "Recyclability",
      copper: "100% recyclable",
      cpvc: "Not recyclable",
      gi: "Recyclable",
      ppr: "Landfill",
    },
    {
      prop: "Standard compliance",
      copper: "EN 1057 / BS EN 1057",
      cpvc: "Varies",
      gi: "Varies",
      ppr: "Varies",
    },
  ];

  // Table 2 Dataset: Standard Plumbing Sizes
  const sizeHeaders = ["OD (mm)", "Line", "Product"];
  const sizeRows = [
    { od: "12 mm", line: "0.8 mm", product: "Basin, WC branch, single point" },
    { od: "15 mm", line: "1.0 mm", product: "Domestic hot & cold branch" },
    { od: "22 mm", line: "1.0 mm", product: "Flat distribution, small riser" },
    { od: "28 mm", line: "1.2 mm", product: "Building riser, floor mains" },
    { od: "35 mm", line: "1.2 mm", product: "Main riser, commercial building" },
    {
      od: "54 mm",
      line: "1.5 mm",
      product: "Building entry, hotel/hospital mains",
    },
  ];

  return (
    <section className="relative w-full bg-[#FFFFFF] flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 select-none">
      {/* 1. Header Typography Area */}
      <div className="w-full max-w-[1140px] flex flex-col items-center text-center mb-14">
        <span className="eyebrow-2 font-albert tracking-[0.3em] text-[#C43A26] uppercase block">
          Material Comparison
        </span>
        <h2 className="h2 text-[#111827] leading-tight tracking-tight mt-2 mb-8">
          Why copper. The evidence.
        </h2>
        <p className="p2 font-albert font-normal leading-[18px] text-[#4A4A4A] max-w-[760px] antialiased">
          For water supply inside buildings, material choice directly affects
          every occupant's health and safety. Copper's physical and chemical
          properties set it apart from plastic and steel alternatives on every
          critical measure.
        </p>
      </div>

      {/* 2. Table 1: Copper vs Alternatives Matrix */}
      <div className="w-full max-w-[860px] flex flex-col items-center mb-20">
        <h4 className="font-albert font-medium text-[14px] leading-[16px] tracking-[0.12em] text-[#272727] uppercase text-center mb-6">
          Copper vs Alternatives — Plumbing Material Comparison
        </h4>

        <div className="w-full overflow-x-auto border border-[#E5E7EB] rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
          <table className="w-full min-w-[750px] border-collapse text-left font-albert">
            <thead>
              <tr className="bg-[#EDD9C5] border-b border-[#E5E7EB] font-albert text-[16px] tracking-wide text-[#272727]">
                {comparisonHeaders.map((header, i) => (
                  <th
                    key={i}
                    className={`px-6 md:px-8 py-[22px] font-normal ${i === 0 ? "w-[24%]" : "w-[19%]"}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {comparisonRows.map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50/50 transition-colors duration-150"
                >
                  <td className="p-4 text-[14px] font-medium text-[#475569]">
                    {row.prop}
                  </td>
                  <td className="p-4 text-[14px] font-medium text-[#1E293B]">
                    <div className="flex items-start gap-2">
                      <PlumbingCheckIcon />
                      <span>{row.copper}</span>
                    </div>
                  </td>
                  <td className="p-4 text-[14px] font-normal text-[#475569]">
                    {row.cpvc}
                  </td>
                  <td className="p-4 text-[14px] font-normal text-[#475569]">
                    {row.gi}
                  </td>
                  <td className="p-4 text-[14px] font-normal text-[#475569]">
                    {row.ppr}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Table 2: Standard Plumbing Sizes */}
      <div className="w-full max-w-[860px] flex flex-col items-center mb-14">
        <h4 className="font-albert font-medium text-[12px] leading-[16px] tracking-[0.12em] text-[#272727] uppercase text-center mb-6">
          Parasmani Copper Tube — Standard Plumbing Sizes
        </h4>

        <div className="w-full overflow-x-auto border border-[#E5E7EB] rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
          <table className="w-full min-w-[600px] border-collapse text-left font-albert">
            <thead>
              <tr className="bg-[#EDD9C5] border-b border-[#E5E7EB] font-albert text-[16px] tracking-wide text-[#272727]">
                {sizeHeaders.map((header, i) => (
                  <th
                    key={i}
                    className={`px-6 md:px-8 py-[22px] font-normal ${i === 0 ? "w-[20%]" : i === 1 ? "w-[20%]" : "w-[60%]"}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {sizeRows.map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50/50 transition-colors duration-150"
                >
                  <td className="p-4 text-[14px] font-medium text-[#475569]">
                    {row.od}
                  </td>
                  <td className="p-4 text-[14px] font-normal text-[#475569]">
                    {row.line}
                  </td>
                  <td className="p-4 text-[14px] font-normal text-[#475569]">
                    {row.product}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Footnote Disclaimer Container */}
      <div className="w-full max-w-[860px] border border-[#E5E7EB] rounded-xl p-5 text-center">
        <p className="font-albert font-medium text-[14px] leading-[20px] text-[#64748B] antialiased max-w-[780px] mx-auto">
          Note: All sizes available from Parasmani ready stock or within 15
          working days. Sizing must be determined by a qualified plumbing
          engineer based on flow rates and pressure requirements for the
          project.
        </p>
      </div>

    </section>
  );
};

export default PlumbingComparisonSection;