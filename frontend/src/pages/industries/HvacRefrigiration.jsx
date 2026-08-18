
import Hero from "./HVAC/Hero";
import ApplicationsPage from "./HVAC/ApplicationsPage";
import ProjectApprovalsSection from "./HVAC/ProjectApprovalsSection";
import ComplianceStandardsSection from "./HVAC/ComplianceStandardsSection";
import FAQSection from "./HVAC/FAQSection";
import HVACGetStartedFooter from "./HVAC/HVACGetStartedFooter";

import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import WhatWeSupplySection from "../../components/WhatWeSupplySection";

const SELECTION_GUIDE_DATA = [
    {
        system: "Split AC (1–2 TR)",
        rows: [
            {
                line: "Liquid",
                product: "Pancake Coil",
                size: '1/4" OD',
                refrigerant: "R22 / R32 / R410A",
                active: false,
            },
            {
                line: "Suction",
                product: "Pancake Coil",
                size: '3/8" OD',
                refrigerant: "R22 / R32 / R410A",
                active: false,
            },
        ],
    },
    {
        system: "Split AC (2–3 TR)",
        rows: [
            {
                line: "Liquid",
                product: "Pancake Coil",
                size: '1/4" OD',
                refrigerant: "R410A / R32",
                active: true,
            }, // Highlighted Row item
            {
                line: "Suction",
                product: "Pancake Coil",
                size: '1/2" OD',
                refrigerant: "R410A / R32",
                active: false,
            },
        ],
    },
    {
        system: "VRF System",
        rows: [
            {
                line: "Branch",
                product: "Pancake Coil",
                size: '3/8"–5/8" OD',
                refrigerant: "R410A / R32",
                active: false,
            },
            {
                line: "Header main",
                product: "Straight Tube",
                size: '7/8"–1 1/8" OD',
                refrigerant: "R410A / R32",
                active: false,
            },
        ],
    },
    {
        system: "Chiller Plant",
        rows: [
            {
                line: "Refrigerant mains",
                product: "Straight Tube",
                size: '1"–4" OD',
                refrigerant: "R410A / R134a",
                active: false,
            },
            {
                line: "Joints & bends",
                product: "Wrought Fittings",
                size: "Matching ID",
                refrigerant: "—",
                active: false,
            },
        ],
    },
    {
        system: "Cold Storage",
        rows: [
            {
                line: "Evaporator coil",
                product: "Pancake Coil",
                size: '3/8"–5/8" OD',
                refrigerant: "R404A / R134a",
                active: false,
            },
            {
                line: "Header pipes",
                product: "Straight Tube",
                size: '3/4"–1 1/8" OD',
                refrigerant: "R404A / R134a",
                active: false,
            },
        ],
    },
];

const HvacRefrigiration = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full bg-white font-sans text-slate-800 antialiased selection:bg-navy-500 selection:text-white overflow-x-clip">
            {/* Title and description for this route live in src/seo/pageMeta.js */}

            {/* 1. HERO SECTION */}

            <Hero />

            {/* 2. STATS & WHY COPPER */}
            <section className="w-full grid lg:grid-cols-2 bg-[#F6ECE3]/40 min-h-[580px] overflow-hidden select-none">
                {/* Left Panel: Overview Stats */}
                <div className="bg-[#F5EBE1] py-16 px-8 md:py-24 md:px-16 lg:px-24 flex flex-col justify-center">
                    <div className="max-w-[480px] w-full mx-auto lg:mr-0 lg:ml-auto space-y-6">
                        <span className="eyebrow-2 tracking-[0.3em] uppercase block font-albert text-[#C43A26] mb-1">
                            Thermal Conductivity Comparison
                        </span>

                        <h2 className="h2 tracking-tight leading-[1.15] text-[#272727] max-w-[380px]">
                            Why copper is the only choice for refrigeration.
                        </h2>

                        {/* Grid Specs with individual Micro-Hover interactions */}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-10 pt-8 font-albert">
                            <div className="group cursor-pointer">
                                <span className="text-[14px] font-medium tracking-[0.01em] text-[#5C5C5C] uppercase block mb-1 transition-colors duration-200 group-hover:text-[#C68344]">
                                    Thermal Conductivity
                                </span>
                                <span className="text-[24px] font-normal leading-none  transition-colors duration-200 text-[#C68344] font-obviously">
                                    391{" "}
                                    <span className="text-[20px] font-normal ml-0.5 transition-colors duration-200 text-[#C68344] font-albert">
                                        W/mk
                                    </span>
                                </span>
                            </div>

                            <div className="group cursor-pointer">
                                <span className="text-[14px] font-medium tracking-[0.01em] text-[#5C5C5C] uppercase block mb-1 transition-colors duration-200 group-hover:text-[#C68344]">
                                    Copper Purity
                                </span>
                                <span className="text-[24px] font-normal leading-none  transition-colors duration-200 text-[#C68344] font-obviously">
                                    99.90{" "}
                                    <span className="text-[20px] font-normal ml-0.5 transition-colors duration-200 text-[#C68344] font-albert">
                                        %
                                    </span>
                                </span>
                            </div>

                            <div className="group cursor-pointer">
                                <span className="text-[14px] font-medium tracking-[0.01em] text-[#5C5C5C] uppercase block mb-1 transition-colors duration-200 group-hover:text-[#C68344]">
                                    Service Life
                                </span>
                                <span className="text-[24px] font-normal leading-none  transition-colors duration-200 text-[#C68344] font-obviously">
                                    50+{" "}
                                    <span className="text-[20px] font-normal ml-0.5 transition-colors duration-200 text-[#C68344] font-albert">
                                        yrs
                                    </span>
                                </span>
                            </div>

                            <div className="group cursor-pointer">
                                <span className="text-[14px] font-medium tracking-[0.01em] text-[#5C5C5C] uppercase block mb-1 transition-colors duration-200 group-hover:text-[#C68344]">
                                    Gas Permeability
                                </span>
                                <span className="text-[24px] font-normal leading-none text-[#535353] transition-colors duration-200 text-[#C68344] font-obviously">
                                    0{" "}
                                    <span className="text-[20px] font-normal ml-0.5 transition-colors duration-200 text-[#C68344] font-albert">
                                        %
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Progress Bars & Explainer */}
                <div className="bg-white py-16 px-8 md:py-24 md:px-16 lg:px-24 flex flex-col justify-center">
                    <div className="max-w-[540px] w-full mx-auto lg:ml-0 lg:mr-auto flex flex-col h-full justify-between space-y-12 lg:space-y-0">
                        {/* Bars Container */}
                        <div className="space-y-7 font-albert w-full">
                            {/* Bar 1: Copper */}
                            <div className="group space-y-2 cursor-pointer">
                                <div className="flex justify-between items-end text-sm font-albert">
                                    <span className="font-medium  transition-colors duration-200 text-[#C68344]">
                                        Copper
                                    </span>
                                    <span className=" font-medium transition-colors duration-200 text-[#C68344]">
                                        391 W/mK
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-[#E6E6E6] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "85%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, ease: "easeOut" }}
                                        className="h-full  transition-colors duration-200 bg-[#C68344]"
                                    />
                                </div>
                            </div>

                            {/* Bar 2: Aluminium */}
                            <div className="group space-y-2 cursor-pointer">
                                <div className="flex justify-between items-end text-sm">
                                    <span className="font-medium text-[#535353] transition-colors duration-200 ">
                                        Aluminium
                                    </span>
                                    <span className="text-[#535353] transition-colors duration-200 ">
                                        205 W/mK
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-[#E6E6E6] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "45%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                                        className="h-full bg-[#BDBDBD] transition-colors duration-200 "
                                    />
                                </div>
                            </div>

                            {/* Bar 3: Stainless Steel */}
                            <div className="group space-y-2 cursor-pointer">
                                <div className="flex justify-between items-end text-sm">
                                    <span className="font-medium text-[#535353] transition-colors duration-200 ">
                                        Stainless Steel
                                    </span>
                                    <span className="text-[#535353] transition-colors duration-200 ">
                                        50 W/mK
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-[#E6E6E6] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "13%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                                        className="h-full bg-[#BDBDBD] transition-colors duration-200 "
                                    />
                                </div>
                            </div>

                            {/* Bar 4: Carbon Steel */}
                            <div className="group space-y-2 cursor-pointer">
                                <div className="flex justify-between items-end text-sm">
                                    <span className="font-medium text-[#535353] transition-colors duration-200 ">
                                        Carbon Steel
                                    </span>
                                    <span className="text-[#535353] transition-colors duration-200 ">
                                        46 W/mK
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-[#E6E6E6] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "12%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                                        className="h-full bg-[#BDBDBD] transition-colors duration-200 "
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bottom Explainer Text */}
                        <p className="text-[14px]   text-[#535353] leading-relaxed font-albert font-light max-w-[500px]">
                            No other commercially available piping metal combines copper's
                            thermal conductivity, pressure rating, corrosion resistance, and
                            workability in a single material. It bends without cracking,
                            brazes cleanly, and outlasts the systems it's installed in.
                        </p>
                    </div>
                </div>
            </section>

            <WhatWeSupplySection description="Every component dimensioned to work together — tubes, coils, and fittings from the same manufacturer for guaranteed compatibility." />


            {/* 4. REFRIGERANT COMPATIBILITY */}
            <section className="w-full grid lg:grid-cols-2 min-h-[660px] overflow-hidden">
                {/* Left Panel: Overview Specs */}
                <div className="bg-white py-10   px-8 md:py-24 md:px-16 lg:pl-29 flex flex-col justify-center">
                    <div className="max-w-[480px] w-full mx-auto lg:mr-0 lg:ml-auto space-y-7 font-albert">
                        {/* Small Category Pill */}
                        <span className="eyebrow-2 tracking-[0.3em] uppercase block font-albert text-[#C43A26] mb-1">
                            Refrigerant Compatibility
                        </span>

                        {/* Main Left Header */}
                        <h2 className="h2 tracking-tight leading-[1.15] text-[#272727] max-w-[380px]">
                            Works with every <br />
                            modern refrigerant.
                        </h2>

                        {/* Copy Blocks */}
                        <div className="space-y-6 pt-2">
                            <div className="space-y-1.5">
                                <h3 className="text-[14px] font-medium tracking-[0.05em] uppercase text-[#272727] font-albert mb-1">
                                    R32 and R410A
                                </h3>
                                <p className="text-[13px] leading-[1.5] text-[#4A4A4A] font-light font-albert">
                                    Operate at significantly higher pressures than R22 — verify
                                    wall thickness against your system's MAWP using our Pressure
                                    Calculator before specifying.
                                </p>
                            </div>

                            <div className="space-y-1.5">
                                <h3 className="text-[14px] font-medium tracking-[0.05em] uppercase text-[#272727] font-albert mb-1">
                                    Internal Cleanliness to ASTM B280
                                </h3>
                                <p className="text-[13px] leading-[1.5] text-[#4A4A4A] font-light font-albert">
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
                            <button
                                onClick={() => navigate("/pressure-calculator")}
                                className="b2 px-7 py-3 bg-[#18234D] hover:bg-[#121b3b] text-white font-medium rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                            >
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
                                    R22
                                </h4>
                                <span className="text-[12px] text-[#646C88] font-light block mt-0.5">
                                    Legacy – HCFC
                                </span>
                            </div>

                            {/* Card: R32 (Now clean by default, styles match on hover) */}
                            <div className="bg-white rounded-xl py-5 px-4 text-center border-2 border-transparent hover:border-[#C68344]/50 shadow-sm cursor-pointer transition-all duration-200">
                                <h4 className="text-[20px] font-normal leading-tight text-[#646C88]">
                                    R32
                                </h4>
                                <span className="text-[12px] text-[#646C88] font-light block mt-0.5">
                                    Next-gen – HFC
                                </span>
                            </div>

                            {/* Card: R410A */}
                            <div className="bg-white rounded-xl py-5 px-4 text-center border-2 border-transparent hover:border-[#C68344]/50 shadow-sm cursor-pointer transition-all duration-200">
                                <h4 className="text-[20px] font-normal leading-tight text-[#646C88]">
                                    R410A
                                </h4>
                                <span className="text-[12px] text-[#646C88] font-light block mt-0.5">
                                    High pressure – HFC
                                </span>
                            </div>

                            {/* Card: R134a */}
                            <div className="bg-white rounded-xl py-5 px-4 text-center border-2 border-transparent hover:border-[#C68344]/50 shadow-sm cursor-pointer transition-all duration-200">
                                <h4 className="text-[20px] font-normal leading-tight text-[#646C88]">
                                    R134a
                                </h4>
                                <span className="text-[12px] text-[#646C88] font-light block mt-0.5">
                                    Standard – HFC
                                </span>
                            </div>

                            {/* Card: R407C */}
                            <div className="bg-white rounded-xl py-5 px-4 text-center border-2 border-transparent hover:border-[#C68344]/50 shadow-sm cursor-pointer transition-all duration-200">
                                <h4 className="text-[20px] font-normal leading-tight text-[#646C88]">
                                    R407C
                                </h4>
                                <span className="text-[12px] text-[#646C88] font-light block mt-0.5">
                                    Blend – HFC
                                </span>
                            </div>

                            {/* Card: R404A */}
                            <div className="bg-white rounded-xl py-5 px-4 text-center border-2 border-transparent hover:border-[#C68344]/50 shadow-sm cursor-pointer transition-all duration-200">
                                <h4 className="text-[20px] font-normal leading-tight text-[#646C88]">
                                    R404A
                                </h4>
                                <span className="text-[12px] text-[#646C88] font-light block mt-0.5">
                                    Cold storage – HFC
                                </span>
                            </div>

                            {/* Card: R744 */}
                            <div className="bg-white rounded-xl py-5 px-4 text-center border-2 border-transparent hover:border-[#C68344]/50 shadow-sm cursor-pointer transition-all duration-200">
                                <h4 className="text-[20px] font-normal leading-tight text-[#646C88]">
                                    R744
                                </h4>
                                <span className="text-[12px] text-[#646C88] font-light block mt-0.5">
                                    CO₂ – Natural
                                </span>
                            </div>
                        </div>

                        {/* Explainer Bottom Inline Row */}
                        <p className="text-[14px] text-white leading-relaxed font-albert font-light max-w-[980px] pt-4">
                            C12200 DHP copper is chemically inert to all current commercial
                            refrigerants. The tube wall is non-porous — refrigerant cannot
                            migrate, permeate, or react with the copper at operating
                            temperatures.
                        </p>
                    </div>
                </div>
            </section>

            {/* 5. APPLICATIONS */}
            <ApplicationsPage />

            {/* 6. MATRIX SELECTOR TABLE */}
            <section className="w-full py-10 md:py-20 bg-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
                    {/* Section Header Elements */}
                    <div className="text-center mb-14">
                        <span className="eyebrow-2 tracking-[0.3em] uppercase block font-albert text-[#C43A26] mb-1">
                            Selection Guide
                        </span>
                        <h2 className="h2 tracking-tight text-[#272727]">
                            Which product for which system?
                        </h2>
                    </div>

                    {/* Responsive Table Scaffold Wrapper */}
                    <div className="overflow-x-auto border border-[#EBEBEB] rounded-2xl bg-white shadow-sm font-albert select-none">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            {/* Table Column Header Structure */}
                            <thead>
                                <tr className="bg-[#EAECEF] text-[#272727] text-[13px] md:text-[14px] font-normal tracking-wide border-b border-[#EBEBEB]">
                                    <th className="py-4 px-6 md:px-8 font-normal w-[24%]">
                                        System Type
                                    </th>
                                    <th className="py-4 px-6 font-normal w-[20%]">Line</th>
                                    <th className="py-4 px-6 font-normal w-[20%]">Product</th>
                                    <th className="py-4 px-6 font-normal w-[16%]">
                                        Typical Size
                                    </th>
                                    <th className="py-4 px-6 md:px-8 font-normal w-[20%]">
                                        Refrigerant
                                    </th>
                                </tr>
                            </thead>

                            {/* Table Body Block with Interactive Group Row-Hover Mapping */}
                            <tbody className="text-[13px] md:text-[14px]">
                                {SELECTION_GUIDE_DATA.map((group, groupIdx) => (
                                    <React.Fragment key={groupIdx}>
                                        {group.rows.map((row, rowIdx) => (
                                            <tr
                                                key={rowIdx}
                                                className="group border-b border-[#F0F0F0] hover:bg-[#FDFBF7]/60 transition-colors duration-200 last:border-b-0 cursor-pointer"
                                            >
                                                {/* Category Rowspan Cell - keeps its structural static color base */}
                                                {rowIdx === 0 && (
                                                    <td
                                                        rowSpan={group.rows.length}
                                                        className="py-5 px-6 md:px-8 font-normal text-[#272727] align-middle border-r border-[#F0F0F0]"
                                                    >
                                                        {group.system}
                                                    </td>
                                                )}

                                                {/* Line Detail Cell */}
                                                <td className="py-4 px-6 font-light text-[#8E93A1] transition-colors duration-200 group-hover:text-[#272727] group-hover:font-normal">
                                                    {row.line}
                                                </td>

                                                {/* Dynamic Brand Product Badge Cell */}
                                                <td className="py-4 px-6">
                                                    <span className="inline-block text-[11px] md:text-xs font-light px-4 py-1 rounded-full border tracking-wide bg-transparent border-[#C5BCB4] text-[#646C88] transition-all duration-200 group-hover:border-[#C68344] group-hover:text-[#C68344]">
                                                        {row.product}
                                                    </span>
                                                </td>

                                                {/* Size Specs Metric Cell */}
                                                <td className="py-4 px-6 font-light text-[#8E93A1] transition-colors duration-200 group-hover:text-[#18234D] group-hover:font-normal">
                                                    {row.size}
                                                </td>

                                                {/* Compatible Chemical Variant Match Cell */}
                                                <td className="py-4 px-6 md:px-8 font-light text-[#8E93A1] transition-colors duration-200 group-hover:text-[#18234D] group-hover:font-normal">
                                                    {row.refrigerant}
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 7. TRUSTED BY INDUSTRIAL LEADERS */}
            <ProjectApprovalsSection />

            {/* 8. COMPLIANCE STANDARDS */}
            <ComplianceStandardsSection />

            {/* 9. CALCULATOR CALL TO ACTION */}
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
                            onClick={() => navigate("/copper-estimator")}
                            className="b2 h-[52px] w-full max-w-[222px] rounded-full bg-[#D58D43] font-normal leading-none tracking-normal text-white shadow-lg shadow-[#00000030] transition-all hover:bg-[#C67D55] sm:w-[222px]"
                        >
                            Estimate Copper
                        </button>
                    </div>
                </div>
            </div>

            {/* 10. FAQ ACCORDION SECTION */}
            <FAQSection />

            {/* 11. PERSISTENT FOOTER STRIP */}
            <HVACGetStartedFooter />
        </div>
    );
};

export default HvacRefrigiration;
