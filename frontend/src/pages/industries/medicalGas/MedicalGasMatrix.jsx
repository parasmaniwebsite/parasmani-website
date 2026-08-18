import React from 'react';
import StressIcon from "../../../assets/industries/medicalGas/stressIcon.png";
import ThermalIcon from "../../../assets/industries/medicalGas/thermalIcon.png";
import VibrationIcon from "../../../assets/industries/medicalGas/AbsorbIcon.png";

// --- Custom SVGs for Table Status Marks matching image_d76869.png ---
const CustomCheckIcon = () => (
  <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 7.5L7.5 13L18 2.5" stroke="#C68344" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CustomCrossIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 1.5L12.5 12.5M12.5 1.5L1.5 12.5" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// --- Feature Item Sub-Component ---
const FeatureItem = ({ iconSrc, title, description }) => (
  <div className="flex gap-5 items-start">
    <div className="w-16 h-16 rounded-xl bg-[#F6EFE6] flex items-center justify-center shrink-0 p-3">
      <img 
        src={iconSrc} 
        alt={`${title} icon`} 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="space-y-1">
      <h3 className="font-albert text-[14px] font-medium text-[#272727] tracking-tight">{title}</h3>
      <p className="font-albert text-[13px] leading-relaxed text-[#4A4A4A]">{description}</p>
    </div>
  </div>
);

// --- Main Matrix Component ---
export default function MedicalGasMatrix() {
  const features = [
    {
      icon: StressIcon,
      title: "Stress cracking resistance",
      description: "Half Hard (R250) resists long-term stress cracking. Hard drawn tubes develop micro-fractures over time under gas pressure cycles."
    },
    {
      icon: VibrationIcon,
      title: "Absorbs vibration",
      description: "Gas flow creates a hammering/humming effect in pipelines. Half Hard absorbs it. Hard tubes cannot — leading to joint failure."
    },
    {
      icon: ThermalIcon,
      title: "Thermal flexibility",
      description: "Handles expansion and contraction from seasonal temperature changes and oxygen on/off flow cycles without fatigue."
    }
  ];

  const tableRows = [
    { property: "Stress cracking", mgpsText: "Resistant", hardText: "Prone" },
    { property: "Vibration absorption", mgpsText: "Good", hardText: "Poor" },
    { property: "Field bending", mgpsText: "Possible", hardText: "Cracks" },
    { property: "Thermal fatigue", mgpsText: "Tolerant", hardText: "Brittle" }
  ];

  return (
    <section className="w-full bg-white py-10 lg:py-14 px-6 md:px-12 lg:px-20 flex justify-center select-none">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Content & Feature Lists */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-1">
            <span className="eyebrow-2 font-albert tracking-[0.3em] text-[#C43A26] uppercase block">
              Why Temper Matters In MGPS
            </span>
            <h2 className="h2 text-[#1C1C1C] leading-[1.15] tracking-tight">
              <span className="text-[#C68344]">Half Hard</span> is not optional in medical gas.
            </h2>
          </div>

          <p className="p2 font-albert leading-relaxed font-light text-[#4A4A4A]">
            For medical gas pipeline systems, temper is a safety requirement — not a choice. BS EN 13348 mandates Half Hard (R250), and Parasmani MGPS tubes are supplied only in this temper. Continuous pressure, vibration, and temperature cycles make hard drawn tubes a long-term failure risk in hospital gas systems.
          </p>

          <div className="space-y-6 pt-2">
            {features.map((item, idx) => (
              <FeatureItem 
                key={idx} 
                iconSrc={item.icon} 
                title={item.title} 
                description={item.description} 
              />
            ))}
          </div>
        </div>

        {/* Right Side: Showcase Container & Pixel-Perfect Matrix Table Card */}
        <div className="lg:col-span-7 bg-[#111E3D] rounded-[24px] p-6 sm:p-10 lg:p-14 shadow-xl flex flex-col items-center w-full">
          
          {/* Top Pill Tags Block */}
          <div className="flex flex-wrap gap-2.5 justify-center mb-6">
            {["BS EN 13348", "Seamless", "Cu ≥ 99.90%"].map((pill, i) => (
              <span key={i} className="font-albert text-[12px] font-normal text-white px-3.5 py-1.5 border border-white/20 rounded-full bg-white/5 tracking-wide">
                {pill}
              </span>
            ))}
          </div>

          {/* Core Branding Heading Title */}
          <h3 className="font-albert text-[24px] font-light text-white tracking-wide text-center mb-8">
            C12200 DHP — Half Hard R250
          </h3>

          {/* Pixel-Perfect Table Matrix Frame matching global styles */}
          <div className="w-full overflow-hidden rounded-[18px] border border-[#E3D7CA] bg-white shadow-md">
            <table className="w-full table-fixed border-collapse">
              <thead>
                {/* Updated font typography tokens for consistency */}
                <tr className="bg-[#EBDCCB] text-[#272727] font-albert text-[14px] tracking-wide">
                  <th className="px-6 md:px-8 py-[22px] font-normal text-left w-[38%] border-r border-[#D9C9B7]/60">
                    Property
                  </th>
                  <th className="px-6 md:px-8 py-[22px] font-normal text-center w-[31%] border-r border-[#D9C9B7]/60">
                    Half Hard R250
                  </th>
                  <th className="px-6 md:px-8 py-[22px] font-normal text-center w-[31%]">
                    Hard Drawn
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA] font-albert text-[14px] sm:text-[15px] text-[#272727]">
                {tableRows.map((row, idx) => (
                  <tr key={idx} className="bg-white">
                    {/* Property Identification Label Row */}
                    <td className="py-5 sm:py-6 px-4 sm:px-7 font-light text-[#272727] border-r border-[#EAEAEA] align-middle text-[14px] font-albert">
                      {row.property}
                    </td>
                    
                    {/* Half Hard (R250) Checked Metric Data Column */}
                    <td className="py-5 sm:py-6 px-2 text-center border-r border-[#EAEAEA] align-middle">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <CustomCheckIcon />
                        <span className=" text-[#272727] font-light tracking-wide text-[14px] font-albert">
                          {row.mgpsText}
                        </span>
                      </div>
                    </td>
                    
                    {/* Hard Drawn Crossed Out Metric Data Column */}
                    <td className="py-5 sm:py-6 px-2 text-center align-middle">
                      <div className="flex flex-col items-center justify-center gap-2.5">
                        <CustomCrossIcon />
                        <span className="text-[13px] sm:text-[14px] text-[#272727] font-light tracking-wide">
                          {row.hardText}
                        </span>
                      </div>
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
}
