import React from 'react';

// ============================================================================
// REUSABLE SUB-COMPONENTS
// ============================================================================

/**
 * Custom Checkmark Icon Component
 */
const CheckIcon = () => (
  <svg 
    className="w-[14px] h-[14px] text-[#C27D38] flex-shrink-0 mt-[3px]" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const MaterialComparisonSection = () => {
  
  // Table 1 Dataset Configuration: Material Comparison Matrix
  const comparisonHeaders = ["Property", "Copper", "Flexible SS Hose", "HDPE / Plastic"];
  const comparisonRows = [
    { prop: "Fire behaviour", copper: "Non-combustible", flexSS: "Melts at joints", hdpe: "Burns / toxic fumes", isHighlighted: true },
    { prop: "Gas permeation", copper: "Zero", flexSS: "Very low", hdpe: "Risk with age", isHighlighted: true },
    { prop: "Joint integrity", copper: "Permanent braze", flexSS: "Compression (loosens)", hdpe: "Glued / mechanical", isHighlighted: true },
    { prop: "Vibration resistance", copper: "Excellent", flexSS: "Good", hdpe: "Poor", isHighlighted: true },
    { prop: "Ageing / embrittlement", copper: "None in 50+ years", flexSS: "Corrodes at joints", hdpe: "Degrades with UV/age", isHighlighted: true },
    { prop: "Service life", copper: "50+ years", flexSS: "10–15 years", hdpe: "10–15 years", isHighlighted: true },
    { prop: "Standard compliance", copper: "EN 1057 / IS 3589", flexSS: "Varies", hdpe: "Varies", isHighlighted: true }
  ];

  // Table 2 Dataset Configuration: Gas Piping Sizes
  const sizeHeaders = ["OD (mm)", "Line", "Refrigerant"];
  const sizeRows = [
    { od: "12 mm", line: "1.0 mm", ref: "Kitchen branch, single point" },
    { od: "15 mm", line: "1.0 mm", ref: "Flat distribution, small commercial" },
    { od: "22 mm", line: "1.0 mm", ref: "Floor riser, medium commercial" },
    { od: "28 mm", line: "1.2 mm", ref: "Building riser, hotel kitchen" },
    { od: "35 mm", line: "1.2 mm", ref: "Main riser, large building" },
    { od: "42 mm", line: "1.5 mm", ref: "Central gas supply mains" }
  ];

  return (
    <section className="relative w-full bg-[#FFFFFF] flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 select-none">
      
      {/* 1. Header Typography Area */}
      <div className="w-full max-w-[1140px] flex flex-col items-center text-center mb-14">
        <span className="eyebrow-2 tracking-[0.3em] uppercase block font-albert text-[#C43A26] mb-1">
          Material Comparison
        </span>
        <h2 className="h2 tracking-tight leading-none text-[#272727] mb-8">
          Why copper. The evidence.
        </h2>
        <p className="p2 font-albert font-normal leading-[24px] text-[#64748B] max-w-[720px] antialiased">
          For gas piping inside buildings, material choice is a life–safety decision. Copper’s physical properties set it apart from the alternatives on every critical measure.
        </p>
      </div>

      {/* 2. Table 1 Container: Material Comparison */}
      <div className="w-full max-w-[860px] flex flex-col items-center mb-10">
        <h4 className="font-albert font-medium text-[14px] leading-[16px] tracking-[0.12em] text-[#272727] uppercase text-center mb-6">
          Copper vs Alternatives — Gas Piping Safety
        </h4>
        
        <div className="w-full overflow-x-auto border border-[#E5E7EB] rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
          <table className="w-full min-w-[700px] border-collapse text-left font-albert">
            <thead>
              <tr className="bg-[#EDD9C5] border-b border-[#E5E7EB] font-albert text-[16px] tracking-wide text-[#272727]">
                {comparisonHeaders.map((header, i) => (
                  <th key={i} className={`px-6 md:px-8 py-[22px] font-normal ${i === 0 ? 'w-[26%]' : 'w-[24%]'}`}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {comparisonRows.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors duration-150">
                  <td className="px-6 md:px-8 py-4 text-[14px] font-medium text-[#475569]">{row.prop}</td>
                  <td className="px-6 md:px-8 py-4 text-[14px] font-medium text-[#1E293B]">
                    <div className="flex items-start gap-2">
                      <CheckIcon />
                      <span>{row.copper}</span>
                    </div>
                  </td>
                  <td className="px-6 md:px-8 py-4 text-[14px] font-normal text-[#475569]">{row.flexSS}</td>
                  <td className="px-6 md:px-8 py-4 text-[14px] font-normal text-[#475569]">{row.hdpe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Table 2 Container: Sizing Guide */}
      <div className="w-full max-w-[860px] flex flex-col items-center mb-14">
        <h4 className="font-albert font-medium text-[14px] leading-[16px] tracking-[0.12em] text-[#1E293B] uppercase text-center mb-6">
          Parasmani Copper Tube — Typical Gas Piping Sizes
        </h4>
        
        <div className="w-full overflow-x-auto border border-[#E5E7EB] rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
          <table className="w-full min-w-[600px] border-collapse text-left font-albert">
            <thead>
              <tr className="bg-[#EDD9C5] border-b border-[#E5E7EB] font-albert text-[16px] tracking-wide text-[#272727]">
                {sizeHeaders.map((header, i) => (
                  <th key={i} className={`px-6 md:px-8 py-[22px] font-normal ${i === 0 ? 'w-[20%]' : i === 1 ? 'w-[20%]' : 'w-[60%]'}`}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {sizeRows.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors duration-150">
                  <td className="px-6 md:px-8 py-4 text-[14px] font-medium text-[#475569]">{row.od}</td>
                  <td className="px-6 md:px-8 py-4 text-[14px] font-normal text-[#475569]">{row.line}</td>
                  <td className="px-6 md:px-8 py-4 text-[14px] font-normal text-[#475569]">{row.ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Disclaimer Note Frame */}
      <div className="w-full max-w-[860px] border border-[#E5E7EB]  rounded-xl p-5 text-center">
        <p className="font-albert font-normal text-[14px] leading-[20px] text-[#64748B] antialiased max-w-[760px] mx-auto">
          <span className="font-medium text-[#475569]"></span>Note: Sizing must be determined by a licensed gas contractor based on connected load and system pressure. Parasmani can supply any size in this range from ready stock or within 15 working days.
        </p>
      </div>

    </section>
  );
};

export default MaterialComparisonSection;