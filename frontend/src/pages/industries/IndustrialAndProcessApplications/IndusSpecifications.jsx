

import React from 'react';
import section2 from "../../../assets/industries/IndustrialAndProcessApplications/section2.png";

// Reusable Feature Block Component
const FeatureBlock = ({ label, value, description }) => {
  return (
    <div className="flex flex-col gap-2 max-w-sm">
      <span className="font-albert text-[14px] font-medium tracking-[0.1em] text-[#5C5C5C] uppercase">
        {label}
      </span>
      <h3 className="font-obviously text-[24px] font-extralight leading-none text-[#C68344] tracking-tight">
        {value}
      </h3>
      <p className="font-albert text-[14px] leading-4.4 text-[#5C5C5C]">
        {description}
      </p>
    </div>
  );
};

// Main Section Component
const MedicalGasSpecifications = () => {
  const specsData = [
    {
      label: "Operating Temperature",
      value: "-40°C",
      description: "Copper retains full ductility and strength at sub-zero temperatures. No embrittlement, no cracking under cryogenic cycling."
    },
    {
      label: "Ready Stock — Max OD",
      value: '2⅛"',
      description: 'Up to 2 1/8" OD typically available in ready stock. Fast dispatch, no waiting on standard sizes.'
    },
    {
      label: "Custom Lead Time",
      value: "15 days",
      description: "Custom OD, wall, temper, or length — 15 days from order. Industry standard is 4-6 weeks. No surprises."
    },
    {
      label: "Max OD Available",
      value: '5⅛"',
      description: 'Large diameter hard copper tubes up to 5 1/8" OD for industrial headers, condensers, and evaporators.'
    }
  ];

  return (
    <section className="w-full bg-[#FBF6EE] min-h-[600px] flex flex-col lg:flex-row items-stretch">
      {/* Left Side: Content Grid */}
      <div className="w-full lg:w-[50%] flex items-center justify-center px-8 py-16 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 w-full max-w-2xl">
          {specsData.map((spec, index) => (
            <FeatureBlock 
              key={index}
              label={spec.label}
              value={spec.value}
              description={spec.description}
            />
          ))}
        </div>
      </div>

      {/* Right Side: Image Showcase */}
      <div className="w-full lg:w-[50%] relative min-h-[400px] lg:min-h-auto overflow-hidden">
        <img 
          src={section2} 
          alt="Medical gas pipeline system installation" 
          className="w-full h-full object-left object-center absolute inset-0"
        />
      </div>
    </section>
  );
};

export default MedicalGasSpecifications;