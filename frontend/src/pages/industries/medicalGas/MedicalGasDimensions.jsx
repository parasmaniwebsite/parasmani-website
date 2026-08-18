import React from 'react';
import { useNavigate } from 'react-router-dom';

// --- Reusable Key/Legend Badge Component ---
const LegendBadge = ({ letter, description, color = "#C48A54" }) => (
  <div className="flex items-center gap-4">
    <div className="w-10 h-10 rounded-xl bg-[#F6EFE6] flex items-center justify-center shrink-0">
      <span className="font-albert text-[20px] font-medium" style={{ color }}>
        {letter}
      </span>
    </div>
    <span className="font-albert text-[14px] leading-relaxed text-[#6B7280]">
      {description}
    </span>
  </div>
);

const MedicalGasDimensions = () => {
  const navigate = useNavigate();
  // Matrix Table Data Rows
  const tableData = [
    { od: "6", steps: ["-", "-", "-", "X", "-", "-", "-"], use: "Instrument lines" },
    { od: "8", steps: ["-", "R", "-", "R", "-", "-", "-"], use: "Small branch, instrument drops" },
    { od: "10", steps: ["-", "R", "-", "R", "-", "-", "-"], use: "Branch lines" },
    { od: "12", steps: ["-", "X", "-", "R", "-", "-", "-"], use: "Branch lines, bedhead units" },
    { od: "14", steps: ["-", "-", "-", "X", "-", "-", "-"], use: "Branch lines" },
    { od: "15", steps: ["R", "-", "-", "R", "X", "-", "-"], use: "Ward distribution, bedhead" },
    { od: "16", steps: ["-", "-", "-", "X", "-", "-", "-"], use: "Branch lines" },
    { od: "18", steps: ["-", "-", "-", "R", "X", "-", "-"], use: "Sub-main distribution" },
    { od: "22", steps: ["-", "-", "R", "R", "X", "R", "-"], use: "Zone valve to ward headers" },
    { od: "28", steps: ["-", "-", "R", "R", "X", "R", "-"], use: "Floor headers, OT supply" },
    { od: "35", steps: ["-", "-", "-", "X", "R", "R", "X"], use: "Building mains" },
    { od: "42", steps: ["-", "-", "-", "X", "R", "R", "X"], use: "Rising mains, plant room" },
    { od: "54", steps: ["-", "-", "-", "X", "R", "R", "R"], use: "Main distribution headers" },
    { od: "64", steps: ["-", "-", "-", "-", "-", "-", "R"], use: "Large hospital mains" },
    { od: "76.1", steps: ["-", "-", "-", "-", "-", "R", "R"], use: "Multi-building distribution" },
    { od: "88.9", steps: ["-", "-", "-", "-", "-", "-", "R"], use: "Hospital campus main" },
    { od: "104", steps: ["-", "-", "-", "-", "-", "-", "X"], use: "Central plant output" },
    { od: "108", steps: ["-", "-", "-", "-", "-", "R", "-"], use: "Central plant output" },
  ];

  const thicknessHeaders = ["0.7", "0.8", "0.9", "1.0", "1.2", "1.5", "2.0"];

  return (
    <section className="w-full bg-white py-10 lg:py-15 px-6 md:px-12 lg:px-20 flex justify-center">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Content Header, Legend Info & CTA */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
          <div className="space-y-3">
            <span className="eyebrow-2 font-albert tracking-[0.3em] text-[#C43A26] uppercase block mb-1">
              Dimensions — BS EN 13348
            </span>
            <h2 className="h2 text-[#1F2937] leading-[1.15] tracking-tight">
              Standard range. <br />
              <span className="text-[#C48A54]">6mm to 108mm.</span>
            </h2>
          </div>

          <p className="p2 font-albert leading-relaxed text-[#4B5563] max-w-md">
            Nominal outside diameters and wall thicknesses per BS EN 13348 Table 2.
          </p>

          {/* Interactive Legend System */}
          <div className="space-y-4 pt-2">
            <LegendBadge letter="R" description="European recommended dimension" />
            <LegendBadge letter="X" description="Other European dimension" color="#272727" />
          </div>

          <hr className="border-gray-100 my-2 max-w-md" />

          {/* Secondary Informational Disclaimer */}
          <p className="font-albert text-[14px] leading-relaxed text-[#272727] max-w-md">
            OD 133 mm, 159 mm, and 219 mm available to BS EN 13348 on request. Custom wall thicknesses and cut-to-length also available for project requirements.
          </p>

          {/* Core Navigation Action Button */}
          <div className="pt-2">
            <button
              onClick={() => navigate("/contact")}
              className="b2 bg-[#111E3D] hover:bg-[#1A2E5C] text-white font-medium px-6 py-3.5 rounded-full shadow-md transition-all duration-200 tracking-wide"
            >
              Contact Us for More Sizes & Types
            </button>
          </div>
        </div>

        {/* Right Column: Spec Grid Matrix Component */}
        <div className="lg:col-span-7 w-full overflow-visible rounded-2xl border border-gray-100 shadow-xl bg-white">
          {/* A horizontal scroll container anchors sticky children to itself, so
              the header can only stick to the page where the table needs no
              horizontal scrolling. It needs ~720px and the column only reaches
              that at 2xl, so below 2xl this stays scrollable and unchanged.
              overflow-x-clip rather than visible: clip is not a scroll
              container, so sticky still works, and any few-px overshoot is
              trimmed instead of spilling outside the card. */}
          <div className="overflow-x-auto 2xl:overflow-x-clip rounded-2xl scrollbar-thin scrollbar-thumb-gray-200">
            <table className="w-full min-w-[800px] 2xl:min-w-0 border-collapse text-center table-auto">
              
              {/* Complex Dimensional Header Split utilizing uniform font style configurations */}
              <thead className="2xl:sticky 2xl:top-24 z-20">
                <tr className="bg-[#EFE5DA] text-[#272727] font-albert text-[12px] uppercase tracking-[0.12em] border-b border-white/70">
                  <th className="bg-[#EFE5DA] px-6 md:px-8 py-[18px] text-left align-middle min-w-[120px] w-[15%] font-normal border-r border-white/70" rowSpan="2">
                    Nominal OD <br /> (MM)
                  </th>
                  <th className="bg-[#EFE5DA] py-3.5 px-2 font-normal border-b border-white/70" colSpan={thicknessHeaders.length}>
                    Nominal Wall Thickness (MM)
                  </th>
                  <th className="bg-[#EFE5DA] px-6 md:px-8 py-[18px] text-center align-middle min-w-[240px] w-[40%] font-normal border-l border-white/70" rowSpan="2">
                    Typical <br /> Use
                  </th>
                </tr>
                <tr className="bg-[#EFE5DA] text-[#272727] font-albert text-[13px] tracking-wide">
                  {thicknessHeaders.map((header, i) => (
                    <th key={i} className="bg-[#EFE5DA] py-2.5 px-3 font-normal min-w-[45px]">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Specification Coordinates Body */}
              <tbody className="divide-y divide-gray-100 font-albert text-[13px] text-[#4B5563]">
                {tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/60 transition-colors duration-150">
                    {/* OD Metric Marker */}
                    <td className="py-3 px-2 text-left pl-6 text-[16px] font-medium text-gray-400 whitespace-nowrap">
                      {row.od}
                    </td>

                    {/* Matrix Coordinates Status Distribution */}
                    {row.steps.map((step, stepIdx) => (
                      <td 
                        key={stepIdx} 
                        className={`py-3 px-3 font-medium ${
                          step === '-'
                            ? 'text-gray-300'
                            : step === 'X'
                              ? 'text-[#272727] text-[17px] font-bold'
                              : 'text-[#C48A54] text-[17px] font-bold'
                        }`}
                      >
                        {step}
                      </td>
                    ))}

                    {/* Operational Application Field */}
                    <td className="py-3 px-4 text-left pl-6 text-[14px] text-gray-400 font-normal whitespace-nowrap">
                      {row.use}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MedicalGasDimensions;
