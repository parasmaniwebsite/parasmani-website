import Hero from "./IndustrialAndProcessApplications/Hero";
import IndusSpecifications from "./IndustrialAndProcessApplications/IndusSpecifications";
import IndustrialApplications from "./IndustrialAndProcessApplications/IndustrialApplications";
import SizeRangeTable from "./IndustrialAndProcessApplications/SizeRangeTable";
import ComplianceStandards from "./IndustrialAndProcessApplications/ComplianceStandards";
import IndustrialFAQ from "./IndustrialAndProcessApplications/IndustrialFAQ";
import IndustrialFooter from "./IndustrialAndProcessApplications/IndustrialFooter";
import { useNavigate } from "react-router-dom";
import WhatWeSupplySection from "../../components/WhatWeSupplySection";

const IndustrialAndProcessApplications = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white font-sans text-slate-800 antialiased selection:bg-navy-500 selection:text-white overflow-x-clip">
      {/* 1 */}
      <Hero />

      {/* 2 */}
      <IndusSpecifications />

      {/* 3 */}
      <section className="w-full grid lg:grid-cols-2 min-h-[660px] overflow-hidden">
        {/* Left Panel: Overview Specs */}
        <div className="bg-white py-10 px-8 md:py-15 md:px-16 lg:pl-29 flex flex-col justify-center">
          <div className="max-w-[480px] w-full mx-auto lg:mr-0 lg:ml-auto space-y-7 font-albert">
            {/* Small Category Pill */}
            <span className="eyebrow-2 tracking-[0.3em] uppercase block font-albert text-[#C43A26] mb-1">
              Refrigerant Compatibility
            </span>

            {/* Main Left Header */}
            <h2 className="h2 tracking-tight leading-[1.15] text-[#272727] max-w-[380px]">
              Compatible with every <br />
              industrial refrigerant.
            </h2>

            {/* Copy Blocks */}
            <div className="space-y-6 pt-2">
              <div className="space-y-1.5">
                <h3 className="text-[14px] font-medium tracking-[0.05em] uppercase text-[#272727] font-albert mb-1">
                  Note on R744 (CO₂):
                </h3>
                <p className="text-[13px] leading-[1.5] text-[#4A4A4A] font-light font-albert">
                  Transcritical CO₂ systems operate at very high pressures (up
                  to 130 bar). Always verify wall thickness against the system
                  MAWP using our Pressure Calculator. Larger OD tubes in thicker
                  wall gauges are typically specified for CO₂ suction and
                  discharge headers.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-[14px] font-medium tracking-[0.05em] uppercase text-[#272727] font-albert mb-1 opacity-0">
                  Internal Cleanliness to ASTM B280
                </h3>
                <p className="text-[13px] leading-[1.5] opacity-0 text-[#4A4A4A] font-light font-albert">
                  Factory degreased and end-capped. No residual cutting oils to
                  contaminate compressor lubricant.
                </p>
              </div>
            </div>

            <hr className="border-[#EAEAEA] my-2" />

            {/* Calculator Bottom Interactive Trigger Group */}
            <div className="space-y-4">
              <p className="text-[13px] leading-[1.5] text-[#4A4A4A] font-light font-albert">
                Use our Pressure Calculator to calculate tube pressure ratings
                based on OD and wall thickness.
              </p>
              <button onClick={() => navigate('/pressure-calculator')}  className="b2 px-7 py-3 bg-[#18234D] hover:bg-[#121b3b] text-white font-medium rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
       
                Calculate Pressure
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel: Matrix Grid of Refrigerant Cards */}
        <div className="bg-[#18234D] py-16 px-8 md:py-24 md:px-16 lg:px-24 flex flex-col justify-center">
          <div className="max-w-[520px] w-full mx-auto lg:ml-0 lg:mr-auto flex flex-col justify-between h-full space-y-10 lg:space-y-0">
            {/* 2-Column Responsive Uniform Cards Grid Layout */}
            <div className="grid grid-cols-2 gap-4 font-albert">
              {/* Card: R22 */}
              <div className="bg-white rounded-xl py-5 px-4 text-center border-2 border-transparent hover:border-[#C68344]/50 shadow-sm cursor-pointer transition-all duration-200">
                <h4 className="text-[20px] font-normal leading-tight text-[#646C88]">
                  R404A
                </h4>
                <span className="text-[12px] text-[#646C88] font-light block mt-0.5">
                  Cold Storage - HFC blend
                </span>
              </div>

              {/* Card: R32 (Now clean by default, styles match on hover) */}
              <div className="bg-white rounded-xl py-5 px-4 text-center border-2 border-transparent hover:border-[#C68344]/50 shadow-sm cursor-pointer transition-all duration-200">
                <h4 className="text-[20px] font-normal leading-tight text-[#646C88]">
                  R448A
                </h4>
                <span className="text-[12px] text-[#646C88] font-light block mt-0.5">
                  Next-gen cold storage
                </span>
              </div>

              {/* Card: R410A */}
              <div className="bg-white rounded-xl py-5 px-4 text-center border-2 border-transparent hover:border-[#C68344]/50 shadow-sm cursor-pointer transition-all duration-200">
                <h4 className="text-[20px] font-normal leading-tight text-[#646C88]">
                  R449A
                </h4>
                <span className="text-[12px] text-[#646C88] font-light block mt-0.5">
                  R404A replacement
                </span>
              </div>

              {/* Card: R134a */}
              <div className="bg-white rounded-xl py-5 px-4 text-center border-2 border-transparent hover:border-[#C68344]/50 shadow-sm cursor-pointer transition-all duration-200">
                <h4 className="text-[20px] font-normal leading-tight text-[#646C88]">
                  R134A
                </h4>
                <span className="text-[12px] text-[#646C88] font-light block mt-0.5">
                  Standard - HFC
                </span>
              </div>

              {/* Card: R407C */}
              <div className="bg-white rounded-xl py-5 px-4 text-center border-2 border-transparent hover:border-[#C68344]/50 shadow-sm cursor-pointer transition-all duration-200">
                <h4 className="text-[20px] font-normal leading-tight text-[#646C88]">
                  R22
                </h4>
                <span className="text-[12px] text-[#646C88] font-light block mt-0.5">
                  Legacy - HCFC
                </span>
              </div>

              {/* Card: R404A */}
              <div className="bg-white rounded-xl py-5 px-4 text-center border-2 border-transparent hover:border-[#C68344]/50 shadow-sm cursor-pointer transition-all duration-200">
                <h4 className="text-[20px] font-normal leading-tight text-[#646C88]">
                  R32
                </h4>
                <span className="text-[12px] text-[#646C88] font-light block mt-0.5">
                  High pressure - HFC
                </span>
              </div>

              {/* Card: R744 */}
              <div className="bg-white rounded-xl py-5 px-4 text-center border-2 border-transparent hover:border-[#C68344]/50 shadow-sm cursor-pointer transition-all duration-200">
                <h4 className="text-[20px] font-normal leading-tight text-[#646C88]">
                  R744
                </h4>
                <span className="text-[12px] text-[#646C88] font-light block mt-0.5">
                  CO2 - Natural
                </span>
              </div>
              {/* Card: R744 */}
              <div className="bg-white rounded-xl py-5 px-4 text-center border-2 border-transparent hover:border-[#C68344]/50 shadow-sm cursor-pointer transition-all duration-200">
                <h4 className="text-[20px] font-normal leading-tight text-[#646C88]">
                  R410A
                </h4>
                <span className="text-[12px] text-[#646C88] font-light block mt-0.5">
                  High pressure - HFC
                </span>
              </div>
            </div>

            {/* Explainer Bottom Inline Row */}
            <p className="text-[14px] text-white leading-relaxed font-albert font-light max-w-[980px] pt-4">
              C12200 DHP copper is chemically inert to all industrial
              refrigerants in active use.
            </p>
          </div>
        </div>
      </section>

      {/* 4 */}
      <IndustrialApplications />

      {/* 5 */}
      <WhatWeSupplySection
        eyebrow="Products for industrial use"
        title="Three products. Every application."
        description="All three Parasmani products are relevant for industrial and process applications — tubes, coils, and fittings supplied as a matched set from one source."
      />

      {/* 6 */}
      <SizeRangeTable />

      {/* 7 */}
      <ComplianceStandards />

      {/* 8. CALCULATOR CALL TO ACTION */}
      <div className="mx-[calc(50%-50vw)]  bg-[#17234F] px-6 py-[70px] md:py-[100px]">
          <div className="mx-auto flex w-full  flex-col items-center justify-between overflow-hidden rounded-[40px] bg-[#4D5A7E] px-6 py-[42px]  sm:px-10 md:rounded-[100px] md:px-[70px] lg:flex-row  lg:px-[90px] lg:py-[48px]">
            <div className="max-w-[590px] text-center lg:text-left">
              <span className="eyebrow-2 mb-3 block font-albert uppercase leading-none tracking-[0.3em] text-[#D58D43]">
                FREE
              </span>
              <h2 className="h2 mb-4 leading-[1.1] tracking-normal text-white">
                Calculate Before You Order
              </h2>
              <p className="p2 font-albert font-normal leading-[1.4] tracking-normal text-white/90">
                Estimate copper tube weight, pressure rating, and material
                requirements instantly using Parasmani Engineering Tools.
              </p>
            </div>

            <div className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row lg:mt-0">
              <button
                onClick={() => navigate("/tools")}
                className="b2 h-[52px] w-full max-w-[222px] rounded-full border border-white font-normal leading-none tracking-normal text-white transition-colors hover:bg-white/10 sm:w-[222px]"
              >
                Explore All Tools
              </button>
              <button
                onClick={() => navigate("/weight-calculator")}
                className="b2 h-[52px] w-full max-w-[222px] rounded-full bg-[#D58D43] font-normal leading-none tracking-normal text-white shadow-lg shadow-[#00000030] transition-all hover:bg-[#C67D55] sm:w-[222px]"
              >
                Calculate Weight
              </button>
            </div>
          </div>
        </div>

      {/* 9 */}
      <IndustrialFAQ />

      {/* 10 */}
      <IndustrialFooter />
    </div>
  );
};

export default IndustrialAndProcessApplications;
