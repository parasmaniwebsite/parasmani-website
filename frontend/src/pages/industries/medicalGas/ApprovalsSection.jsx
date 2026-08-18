import React from 'react';

// Imported PNG assets as requested
import GovtHospitalIcon from "../../../assets/industries/medicalGas/govtIcon.png";
import MGPSSystemIcon from "../../../assets/industries/medicalGas/mgpsicon.png";
import PrivateHospitalIcon from "../../../assets/industries/medicalGas/privateIcon.png";
import PharmaIcon from "../../../assets/industries/medicalGas/pharmaIcon.png";
import { useNavigate } from 'react-router-dom';

// ============================================================================
// REUSABLE SUB-COMPONENTS
// ============================================================================
const APPROVALS_DATA = [
  {
    logo: GovtHospitalIcon,
    name: "Government Hospital Projects",
    desc: "Parasmani MGPS tubes supplied for state government hospital infrastructure programmes.",
    badge: "Government Project"
  },
  
  {
    logo: PrivateHospitalIcon,
    name: "Private Hospital Projects",
    desc: "Parasmani MGPS tubes used in private hospital and surgical centre installations across India.",
    badge: "Hospital Project"
  },
  {
    logo: MGPSSystemIcon,
    name: "MGPS System Integrators",
    desc: "Supplied as the copper tube component to MGPS turnkey contractors and system integrators.",
    badge: "MGPS Contractor"
  },
  {
    logo: PharmaIcon,
    name: "Pharmaceutical & Research Facilities",
    desc: "Parasmani MGPS tubes supplied for process gas and vacuum piping systems in pharmaceutical manufacturing.",
    badge: "Pharma / Research"
  },
];
/**
 * ProjectCard Component
 * Implements the card structure seen in the main 2x2 grid using image assets.
 */
const ApprovalCard = ({ logo, name, desc, badge }) => {
  return (
    <div className="flex items-start gap-5 font-albert text-left">
      {/* Square Logo Base Container */}
      <div className="w-[100px] h-[100px] md:w-[110px] md:h-[110px] bg-[#F9F5F0] rounded-2xl flex items-center justify-center p-5 flex-shrink-0 border border-[#EAE2DA]/20">
        <img 
          src={logo} 
          alt={`${name} Logo`} 
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Content Details Panel */}
      <div className="flex flex-col justify-between py-1 min-h-[100px] md:min-h-[110px]">
        <div className="space-y-1">
          <h5 className="text-[16px]  font-medium tracking-tight text-[#000000] font-albert">
            {name}
          </h5>
          <p className="text-[12px] leading-[1.1] text-[#272727] font-light max-w-[340px]">
            {desc}
          </p>
        </div>

        {/* Dynamic Meta Tag Info */}
        <div className="pt-3">
          <span className="inline-block text-[12px] font-light text-[#18234D] bg-[#E8E9ED] px-3 py-1 rounded-full tracking-wide">
            {badge}
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const ApprovalsSection = () => {
  const navigate = useNavigate()
  return (
    <section className="w-full py-10 md:py-15 bg-white border-t border-[#F0F0F0]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Top Centered Headers */}
        <div className="text-center mb-16 md:mb-20">
          <span className="eyebrow-2 tracking-[0.3em] uppercase block font-albert text-[#C43A26] mb-1">
            Formal Approvals
          </span>
          <h2 className="h2 tracking-tight text-[#272727]">
            Supplied across India's hospital projects.
          </h2>
        </div>

        {/* 2-Column Grid matching image design framework structure exactly */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 lg:gap-x-16 lg:gap-y-12">
          {APPROVALS_DATA.map((item, idx) => (
            <ApprovalCard
              key={idx}
              logo={item.logo}
              name={item.name}
              desc={item.desc}
              badge={item.badge}
            />
          ))}
        </div>

        {/* Divider and Bottom Callout Row Area */}
        <div className="mt-16 md:mt-20 pt-8 border-t border-[#F0F0F0] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-albert">
          <p className="text-[16px] font-light text-[#454545] leading-relaxed max-w-[520px] text-left">
            Material test certificates (MTC) and project references are available on request to support your specification, approval, and procurement requirements.
          </p>
          <button
          onClick={() => navigate("/contact")}
          className="b2 whitespace-nowrap px-6 py-3.5 bg-[#18234D] hover:bg-[#121b3b] text-white font-medium rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm">
            Contact Sales Team 
          </button>
        </div>

      </div>
    </section>
  );
}

export default ApprovalsSection;