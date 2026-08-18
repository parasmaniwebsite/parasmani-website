import Hero from "./HouseHoldAndFuelGas/Hero";
import SafePipeline from "./HouseHoldAndFuelGas/SafePipeline";
import MaterialComparisonSection from "./HouseHoldAndFuelGas/MaterialComparisonSection";
import ApplicationCard from "./HouseHoldAndFuelGas/ApplicationCard";
import GasComplianceSection from "./HouseHoldAndFuelGas/GasComplianceSection";
import FAQSectionHouseHold from "./HouseHoldAndFuelGas/FAQSectionHouseHold";
import HouseHoldFooter from "./HouseHoldAndFuelGas/HouseHoldFooter";
import { useNavigate } from "react-router-dom";
import WhatWeSupplySection from "../../components/WhatWeSupplySection";

const HouseHoldAndFuelGas = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white font-sans text-slate-800 antialiased selection:bg-cyan-600 selection:text-white overflow-x-clip">
      {/* 1. hero */}
      <Hero />

      {/* 2. safe pipeline  */}
      <SafePipeline />

      {/* 3 */}
      <MaterialComparisonSection />

      {/* 4 */}
      <ApplicationCard />

      {/* 5 */}
      <GasComplianceSection />

      {/* 6. What we supply */}
      <WhatWeSupplySection title="Tubes and fittings. One source." />

      {/* 7 CALCULATOR CTA CARD*/}
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

      {/* 8 */}
      <FAQSectionHouseHold />

      {/* 9 */}
      <HouseHoldFooter />
    </div>
  );
};

export default HouseHoldAndFuelGas;
