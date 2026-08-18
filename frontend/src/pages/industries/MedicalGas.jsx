import Hero from "./medicalGas/Hero";
import MedicalGasSpecifications from "./medicalGas/MedicalGasSpecifications";
import MedicalGasMatrix from "./medicalGas/MedicalGasMatrix";
import MedicalGasDimensions from "./medicalGas/MedicalGasDimensions";
import ProtocolCard from "./medicalGas/ProtocolCard";
import GasCompatibilityMatrix from "./medicalGas/ComplianceSection";
import ApplicationPage from "./medicalGas/ApplicationPage";
import ApprovalsSection from "./medicalGas/ApprovalsSection";
import FAQSection from "./medicalGas/FAQSectionMedicalGas";
import MedicalGasFooter from "./medicalGas/MedicalGasFooter";
import { useNavigate } from "react-router-dom";
import WhatWeSupplySection from "../../components/WhatWeSupplySection";

const MedicalGas = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full bg-white font-sans text-slate-800 antialiased selection:bg-cyan-600 selection:text-white overflow-x-clip">
      {/* 1. HERO SECTION */}

      <Hero />

      {/* 2. STATS & GRAPHIC HERO SPLIT */}
      <MedicalGasSpecifications />

      {/* 3. MATERIAL TEMPER PROFILE */}
      <MedicalGasMatrix />

      {/* 4. METRIC SIZING GUIDE */}
      <MedicalGasDimensions />

      {/* 5. QUALITY ATTRIBUTES - WHAT PRECISION MEANS */}
      <ProtocolCard />

      {/* 6. SYSTEM APPLICATION SELECTOR */}
      <GasCompatibilityMatrix />
      {/* 7. PROJECT SECTORS */}
      <ApplicationPage />

      {/* 8. PRODUCTS IN FOCUS */}
      <ApprovalsSection />

      {/* 8.5. What we supply */}

      <WhatWeSupplySection title="Three products. One complete system." />

      {/* 9. CALCULATOR CTA CARD */}
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

      {/* 10. FAQ ACCORDION */}
      <FAQSection />

      {/* 11. PERSISTENT FOOTER STRIP */}
      <MedicalGasFooter />
    </div>
  );
};

export default MedicalGas;
