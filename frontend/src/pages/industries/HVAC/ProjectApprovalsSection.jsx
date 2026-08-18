import React from 'react';

import LGlogo from "../../../assets/industries/HVAC/LGlogo.png";
import adaniLogo from "../../../assets/industries/HVAC/AdaniLogo.png";
import SBIlogo from "../../../assets/industries/HVAC/SBIlogo.png";
import DelhiMetroLogo from "../../../assets/industries/HVAC/DelhiMetroLogo.png";
import HAIERlogo from "../../../assets/industries/HVAC/Hairelogo.png";
import PanasonicLogo from "../../../assets/industries/HVAC/Panasonic.png";
import IndianRailwaysLogo from "../../../assets/industries/HVAC/IndianRailwayLogo.png";
import CSIRlogo from "../../../assets/industries/HVAC/CSIRlogo.png";
import { useNavigate } from 'react-router-dom';

const APPROVALS_DATA = [
    {
        logo: LGlogo,
        name: "LG Electronics India",
        desc: "Listed as approved copper tube make in LGEIL System Air Conditioners Tech Tree, September 2022.",
        badge: "Institutional Approval"
    },
    {
        logo: HAIERlogo,
        name: "Haier Appliances India Pvt. Ltd. ",
        desc: "Vendor Approval for Parasmani Copper Tubes for use in Haier Appliances HVAC systems",
        badge: "OEM Vendor Approval"
    },
    {
        logo: adaniLogo,
        name: "Adani / Kutch Copper",
        desc: "Approved HVAC make for the MTPA Copper Complex at Mundra, Gujarat.",
        badge: "Project Approval"
    },
    {
        logo: PanasonicLogo,
        name: "Panasonic India Pvt. Ltd.",
        desc: "Vendor Approval for Parasmani Copper Tubes for use in Panasonic HVAC systems",
        badge: "OEM Vendor Approval"
    },
    {
        logo: SBIlogo,
        name: "State Bank of India",
        desc: "Approved make for copper piping in air conditioning works across SBI premises.",
        badge: "Institutional Approval"
    },
    {
        logo: IndianRailwaysLogo,
        name: "Indian Railways — CLW",
        desc: "Chittaranjan Locomotive Works capacity cum capability assessment cleared for HVAC copper piping.",
        badge: "Institutional Approval"
    },
    {
        logo: DelhiMetroLogo,
        name: "Delhi Metro Railway",
        desc: "Approved make for VAC copper piping — DMRC (Delhi & Patna Metro) and MMRCL (Mumbai Metro) projects.",
        badge: "Institutional Approval"
    },
    {
        logo: CSIRlogo,
        name: "CSIR India",
        desc: "Approved for VRF/VRV refrigerant copper piping at CSIR NAL facilities.",
        badge: "Institutional Approval"
    }
];

/**
 * Reusable Approvals Client Card Component
 * Strictly designed to match typography hierarchy and spacing rules from the design.
 */
function ApprovalCard({ logo, name, desc, badge }) {
    return (
        <div className="flex items-start gap-5 font-albert text-left">
            {/* Square Logo Base Container */}
            <div className="w-[100px] h-[100px] md:w-[110px] md:h-[110px] bg-[#F9F5F0] rounded-2xl flex items-center justify-center p-4 flex-shrink-0 border border-[#EAE2DA]/20">
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
                    <span className="inline-block text-[12px] font-light text-[#18234D] bg-[#E8E9ED] px-3 py-1 rounded-full tracking">
                        {badge}
                    </span>
                </div>
            </div>
        </div>
    );
}

/**
 * Core Approvals Section Component Layout
 */
export default function ProjectApprovalsSection() {
    const navigate = useNavigate()
    return (
        <section className="w-full py-10 md:py-24 bg-white border-t border-[#F0F0F0]">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">

                {/* Top Centered Headers */}
                <div className="text-center mb-16 md:mb-20">
                    <span className="eyebrow-2 tracking-[0.3em] uppercase block font-albert text-[#C43A26] mb-1">
                        Formal Approvals
                    </span>
                    <h2 className="h2 tracking-tight text-[#272727]">
                        Trusted by India's most demanding projects.
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
                        These are not logos, but formal project approvals from OEMs, government bodies, and infrastructure authorities across India.
                    </p>
                    <button

                        onClick={() => navigate("/downloads?category=Approvals")}
                        className="b2 whitespace-nowrap px-6 py-3.5 bg-[#18234D] hover:bg-[#121b3b] text-white font-medium rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm">
                        Download Approvals Certificates
                    </button>
                </div>

            </div>
        </section>
    );
}
