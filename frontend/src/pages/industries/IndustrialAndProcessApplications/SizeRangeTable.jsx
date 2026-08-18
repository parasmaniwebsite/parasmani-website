import React from "react";

// 1. Reusable Data Schema representing all values in image_e0ee42.png
const SPEC_DATA = [
  { odSize: '1/2" (12.7 mm)', wallSwg: "21 SWG / 0.80 mm", typicalUse: "Split AC, small connections" },
  { odSize: '5/8" (15.88 mm)', wallSwg: "20 SWG / 0.90 mm", typicalUse: "Suction lines, evaporator coil" },
  { odSize: '7/8" (22.23 mm)', wallSwg: "19 SWG / 1.00 mm", typicalUse: "VRF headers, cold storage" },
  { odSize: '1 1/8" (28.58 mm)', wallSwg: "18 SWG / 1.21 mm", typicalUse: "Refrigeration mains" },
  { odSize: '1 3/8" (34.93 mm)', wallSwg: "16 SWG / 1.63 mm", typicalUse: "Cold room headers" },
  { odSize: '1 5/8" (41.28 mm)', wallSwg: "16 SWG / 1.63 mm", typicalUse: "Industrial suction mains" },
  { odSize: '2 1/8" (53.98 mm)', wallSwg: "16 SWG / 1.63 mm", typicalUse: "Large cold store mains" },
  { odSize: '2 5/8" (66.68 mm)', wallSwg: "14 SWG / 2.03 mm", typicalUse: "Industrial headers" },
  { odSize: '3 1/8" (79.38 mm)', wallSwg: "14 SWG / 2.03 mm", typicalUse: "Large blast freezer" },
  { odSize: '4 1/8" (104.78 mm)', wallSwg: "14 SWG / 2.03 mm", typicalUse: "Industrial condensers" },
  { odSize: '5 1/8" (130.18 mm)', wallSwg: "14 SWG / 2.03 mm", typicalUse: "Sugar evaporators, large heat exchangers" }
];

export default function SizeRangeTable() {
  return (
    <section className="w-full bg-white py-10 px-6 md:px-12 lg:px-24 font-sans selection:bg-[#EADCCF]">
      <div className="max-w-[960px] mx-auto">
        
        {/* Section Heading Metadata Layout */}
        <div className="text-center mb-12">
          <span className="eyebrow-2 tracking-[0.3em] uppercase block font-albert text-[#C43A26] mb-1">
            Size Range & Weights
          </span>
          <h2 className="h2 tracking-tight leading-none text-[#272727] mb-4">
            Standard sizes. Industrial range.
          </h2>
        </div>

        {/* Outer Grid Canvas Shell Container */}
        <div className="w-full overflow-x-auto border border-[#E6DEC2]/50 rounded-[12px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <table className="w-full border-collapse text-left min-w-[720px] font-albert">
            <thead>
              {/* Table Header Row utilizing exact font style variables */}
              <tr className="bg-[#EDD9C5] border-b border-[#E6DEC2]/50 font-albert text-[16px] tracking-wide text-[#272727]">
                <th className="px-6 md:px-8 py-[22px] font-normal w-[28%]">
                  OD Size
                </th>
                <th className="px-6 md:px-8 py-[22px] font-normal w-[28%] border-l border-[#E6DEC2]/40">
                  Wall (SWG)
                </th>
                <th className="px-6 md:px-8 py-[22px] font-normal w-[44%] border-l border-[#E6DEC2]/40">
                  Typical Use
                </th>
              </tr>
            </thead>
            
            {/* Dynamic Iteration Mapping Rows */}
            <tbody className="divide-y divide-[#F0EAE1]">
              {SPEC_DATA.map((row, index) => (
                <tr 
                  key={index} 
                  className="transition-colors duration-150 hover:bg-[#FDFCFB]"
                >
                  {/* OD Size Cell */}
                  <td className="py-3.5 px-6 text-[13.5px] font-normal text-[#3A3A3A] tracking-normal">
                    {row.odSize}
                  </td>
                  
                  {/* Wall (SWG) Cell */}
                  <td className="py-3.5 px-6 text-[13.5px] font-normal text-[#5A5A5A] tracking-normal border-l border-[#F0EAE1]">
                    {row.wallSwg}
                  </td>
                  
                  {/* Typical Use Cell */}
                  <td className="py-3.5 px-6 text-[13.5px] font-normal text-[#5A5A5A] tracking-normal border-l border-[#F0EAE1]">
                    {row.typicalUse}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}