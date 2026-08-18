import { useRef, useState } from "react";
import AvailableBrands from "../../components/AvailableBrands";
import { useNavigate } from "react-router-dom";
import { MdOutlineCheck } from "react-icons/md";
import { HiArrowNarrowRight } from "react-icons/hi";

// Compliance images
import ASTM from "../../assets/about/qualityAssurance/astm.png";
import JIS from "../../assets/about/qualityAssurance/JIS.png";
import CEN from "../../assets/about/qualityAssurance/CEN.png";
import BSI from "../../assets/about/qualityAssurance/BSI.png";
import ISI from "../../assets/about/qualityAssurance/ISI.png";

// Provided Asset Imports
import heroImg from "../../assets/products/sct/sct-hero-image.png";
import chooseRightForm1 from "../../assets/products/sct/chooseRightForm.png";
import chooseRightForm2 from "../../assets/products/sct/chooseRightForm2.png";
import chooseRightForm3 from "../../assets/products/sct/chooseRightForm3.png";
import packagingBigImg1 from "../../assets/products/sct/packagingBigImg.png";
import packagingBigImg2 from "../../assets/products/sct/packagingBigImg2.png";
import packagingBigImg3 from "../../assets/products/sct/packagingBigImg3.png";
import packagingBigImg4 from "../../assets/products/sct/packagingBigImg4.png";

import packaginImg1 from "../../assets/products/pancake/packagingImg1.svg";
import packaginImg2 from "../../assets/products/pancake/packagingImg2.svg";
import packaginImg3 from "../../assets/products/pancake/packagingImg3.svg";
import packaginImg4 from "../../assets/products/pancake/packagingImg4.svg";

import fromParasManiImg1 from "../../assets/products/sct/completeYourSystemImg1.png";
import fromParasManiImg2 from "../../assets/products/sct/completeYourSystemImg2.png";
import getStartedImg from "../../assets/products/sct/getStartedImg.png";
import ApplicationsSection from "./straightCopperTube/ApplicationsSection";
import Compliance from "./straightCopperTube/Compliance";
import SpecificationsSection from "./straightCopperTube/SpecificationsSection";
import PuritySection from "./straightCopperTube/PuritySection";
import { motion, useScroll, useTransform } from "framer-motion";
import ProductHeroActions from "../../components/ProductHeroActions";
import { faqs } from "./straightCopperTube/faqData";

/* Module scope and exported so seo/schema.js can emit these as FAQPage
   markup from the same array the accordion renders -- structured data must
   match what the visitor can actually see on the page. */

const StraightCopperTube = () => {
    const navigate = useNavigate();
    const complianceData = [
        { title: "ASTM B280", subtitle: "Air Conditioning & Refrigeration", logo: ASTM, name: "ASTM" },
        { title: "JIS H 3300", subtitle: "Copper & Alloy Seamless Tubes", logo: JIS, name: "JIS" },
        { title: "EN 1057", subtitle: "Plumbing, Heating & Gas Systems", logo: BSI, name: "BSI" },
        { title: "ASTM B819", subtitle: "Medical Gas Tube", logo: ASTM, name: "ASTM" },
        { title: "IS 10773", subtitle: "ACR Copper Tubes", logo: ISI, name: "ISI" },
        { title: "ASTM B68", subtitle: "Bright Annealed Copper Tubes", logo: ASTM, name: "ASTM" },
        { title: "EN 13348", subtitle: "Medical Gases & Vacuum", logo: BSI, name: "BSI" },
        { title: "EN 12735", subtitle: "HVAC/R", logo: CEN, name: "CEN" }
    ];

    // Interactive States
    const [selectedForm, setSelectedForm] = useState("Hard");
    const [openFaq, setOpenFaq] = useState(0);
    const [activeStep, setActiveStep] = useState(0);

    const contentMap = {
        Hard: {
            title: "Hard",
            desc: "For rigid straight runs where no bending is required. Maximum pressure rating. Ideal for exposed piping, riser mains, and structural installations.",
            tags: ["HVAC Mains", "Riser Pipes", "Industrial"],
            image: chooseRightForm1,
        },
        "Half Hard": {
            title: "Half Hard",
            desc: "General-purpose temper offering a balance of strength and limited formability. Suitable for most HVAC and plumbing applications with gentle offsets.",
            tags: ["General HVAC", "Plumbing", "Cold Storage"],
            image: chooseRightForm2,
        },
        "Quarter Hard": {
            title: "Quarter Hard",
            desc: "Softest straight-length temper — allows field bending with standard tube benders. Used where tight radius changes are needed without coil format.",
            tags: ["Medical MGPS", "Tight Bends", "Field Forming"],
            image: chooseRightForm3,
        },
    };

    const packingSteps = [
        {
            label: "Plastic End Caps",
            desc: "Both ends sealed to prevent contamination and moisture ingress during transit and storage.",
            icon: packaginImg1,
            bigImage: packagingBigImg1,
        },
        {
            label: "Dual Hologram Authentication",
            desc: "Each pipe carries two holograms for brand authentication — eliminating counterfeit risk on site.",
            icon: packaginImg2,
            bigImage: packagingBigImg2,
        },
        {
            label: "Four-Layer Protective Wrap",
            desc: "Inner polythene wrap → protective cardboard layer → thick white plastic covering → outer polythene wrap. Surface arrives exactly as it left the factory.",
            icon: packaginImg3,
            bigImage: packagingBigImg3,
        },
        {
            label: "Full Traceability Label",
            desc: "Every bundle labelled with brand name, size, batch number, and complete pipe specifications — matching the ink stamp on every length.",
            icon: packaginImg4,
            bigImage: packagingBigImg4,
        },
    ];

    const tabs = [
        { id: "Hard", label: "Hard", short: "H" },
        { id: "Half Hard", label: "Half Hard", short: "HH" },
        { id: "Quarter Hard", label: "Quarter Hard", short: "QH" },
    ];


    const systems = [
        {
            category: "SOFT ANNEALED",
            title: "Pancake Copper Coils",
            image: fromParasManiImg1,
            desc: "Pre-coiled C12200 DHP copper, 15.24m standard coil. Soft annealed for easy field bending.",
            alt: "Pancake copper coil layout",
            link: "/pancake-copper-coil",
        },
        {
            category: "Wrought",
            title: "Copper Fittings",
            image: fromParasManiImg2,
            desc: "Different types of copper fittings engineered to match our tube dimensions.",
            alt: "Assorted premium industrial copper fittings and pipe joints",
            link: "/copper-fittings",
        },
    ];
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });
    const btn2Bg = useTransform(
        scrollYProgress,
        [0, 0.3],
        ["#162046", "#18234D"],
    );
    const btn2Text = useTransform(
        scrollYProgress,
        [0, 0.3],
        ["#FFFFFF", "#FFFFFF"],
    );
    return (
        <div className="w-full bg-[#FEFEFE] font-albert text-[#1E2229] overflow-x-hidden">
            {/* 1. HERO SECTION */}
            <section className="w-full bg-white overflow-hidden select-none">
                {/* Inner wrapper constrains alignment within the 1440px page boundary */}
                <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-12 sm:py-16 lg:py-0 grid grid-cols-1 lg:grid-cols-12 items-center h-auto lg:h-[516px] relative gap-10 lg:gap-0">
                    {/* Text Column - Stays strictly aligned to the left margins of the 1440px container */}
                    <div className="w-full lg:col-span-6 z-10 text-center lg:text-left flex flex-col items-center lg:items-start justify-center h-auto lg:h-full">
                        <span className="eyebrow-1 text-[#C43A26] tracking-[0.15em]st uppercase block mb-3 font-AlbertSans">
                            DRAWN TO PERFORM
                        </span>
                        <h1 className="h1 tracking-tight text-[#231F20] leading-[1.15] mb-4">
                            Straight Copper Tube
                        </h1>
                        <p className="p1 text-[#545454] font-albert leading-relaxed mb-8 font-AlbertSans max-w-xl">
                            Seamless straight copper tubes for HVAC/R, plumbing, medical, and
                            industrial use. Cold drawn. Pressure tested. Built to global
                            standards.
                        </p>

                        {/* Action Buttons */}
                        <ProductHeroActions />
                    </div>

                    {/* Image Column - Renders relative on mobile, absolute on desktop to cleanly exit the container constraint on the right side.
              Breaks out of the container's horizontal padding on mobile/tablet so the tubes bleed to the screen edge without being scaled/cropped. */}
                    <div className="relative lg:absolute right-0 w-full lg:w-1/2 h-auto lg:h-full mt-8 lg:mt-0 translate-x-1/6  md:translate-x-1/3 lg:col-span-6  -mx-6 md:-mx-12 lg:mx-0 flex items-center justify-end select-none">
                        <img
                            src={heroImg}
                            alt="Polished pristine straight copper industrial pipelines"
                            className="w-full h-auto lg:h-full max-h-[420px] sm:max-h-[500px] lg:max-h-none object-contain object-right"
                        />
                    </div>
                </div>
            </section>

            {/* 2. PURITY BANNER */}
            <PuritySection />

            {/* 3. BY THE NUMBERS (DIMENSIONS) */}
            <SpecificationsSection />

            {/* 4. BRAND / ECOSYSTEM SECTIONS */}
            <AvailableBrands />

            {/* 5. COMPLIANCE STANDARDS */}
            <Compliance complianceData={complianceData} />

            {/* 6. CHOOSE THE RIGHT FORM TEMPER CHOOSER */}
            <section className="bg-white py-10 md:py-15">
                <div className="max-w-[1280px] mx-auto px-6 md:px-18 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div>
                        <span className="eyebrow-2 text-[#C43A26] tracking-[0.3em] uppercase block mb-1 font-albert">
                            TEMPER GUIDE
                        </span>
                        <h2 className="h2 tracking-tight text-[#272727] leading-tight mb-4">
                            Choose The Right Form
                        </h2>
                        <p className="p2 font-light text-[#454545] leading-relaxed mb-8 max-w-xl font-albert">
                            All three tempers are available in straight lengths. Select based
                            on your installation requirements – bending radius, pressure
                            rating, and handling.
                        </p>
                        <div className="bg-[#F6ECE3] p-3 rounded-2xl grid grid-cols-3 gap-1 mb-8 max-w-md">
                            {tabs.map((tab) => {
                                const isActive = selectedForm === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setSelectedForm(tab.id)}
                                        className={`flex flex-col items-center justify-center py-2 px-2 rounded-xl transition-all duration-200 ${isActive
                                                ? "bg-white text-[#231F20] shadow-sm border border-[#C68344]"
                                                : "text-[#6E645E] hover:bg-white/40"
                                            }`}
                                    >
                                        <span
                                            className={`text-[16px] font-normal px-3 py-2 rounded-md mb-1.5 transition-colors tracking-wider ${isActive
                                                    ? "bg-[#C68344] text-white"
                                                    : "bg-[#EDD9C5] text-[#464F71]"
                                                }`}
                                        >
                                            {tab.short}
                                        </span>
                                        <span className="text-[13px] font-medium tracking-wide">
                                            {tab.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                        <hr className="h-[1px] text-[#CFCFCF] mb-5" />
                        <div className="mb-8 min-h-[110px]">
                            <h3 className="text-[20px] font-medium text-[#272727] mb-2 font-albert">
                                {contentMap[selectedForm].title}
                            </h3>
                            <p className="text-[14px] text-[#454545]/90 font-light font-albert leading-relaxed max-w-xl">
                                {contentMap[selectedForm].desc}
                            </p>
                        </div>
                        <hr className="border-[#CFCFCF] mb-6" />
                        <div className="flex flex-wrap gap-3">
                            {contentMap[selectedForm].tags.map((tag) => (
                                <div
                                    key={tag}
                                    className="flex items-center gap-1.5 px-6 py-2 rounded-full border border-[#C68344] bg-[#F9F3EC] text-[12px] text-[#272727] font-albert"
                                >
                                    {tag} <MdOutlineCheck size={16} color="black" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center lg:justify-end">
                        <div className="w-full max-w-[540px] aspect-[4/3] lg:aspect-square overflow-hidden rounded-3xl">
                            <img
                                src={contentMap[selectedForm].image}
                                alt={`${contentMap[selectedForm].title} copper pipe`}
                                className="w-full h-full object-cover transition-all duration-300"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. FACTORY PACKAGING SECTION - SIZING & HEIGHT BREAKING FIX APPLIED HERE */}
            <section className="bg-white py-8 md:py-10">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center">
                    <span className="eyebrow-2 text-[#C43A26] tracking-[0.3em] uppercase block mb-1 font-albert">
                        PACKAGING
                    </span>
                    <h2 className="h2 tracking-tight text-[#272727] leading-tight mb-4">
                        Sealed From Factory to Site
                    </h2>
                    <p className="p2 text-[#454545]/80 max-w-2xl mx-auto mb-6 font-albert font-extralight">
                        Every bundle leaves Parasmani's factory protected – ends sealed,
                        surface guarded, clearly labelled. What you receive is exactly as it
                        was made.
                    </p>

                    {/* Fixed aspect-ratio wrapper with object-cover ensures a seamless fit with zero side margins */}
                    <div className="bg-[#FAF4ED] rounded-3xl max-w-4xl mx-auto overflow-hidden mb-6 border border-gray-100 aspect-[2.2/1] md:aspect-[3.2/1] w-full flex items-center justify-center">
                        <img
                            src={packingSteps[activeStep].bigImage}
                            alt={packingSteps[activeStep].label}
                            className="w-full h-full object-cover transition-all duration-300"
                        />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto mb-5">
                        {packingSteps.map((step, idx) => {
                            const isActive = activeStep === idx;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setActiveStep(idx)}
                                    className={`py-1 rounded-2xl border bg-white flex flex-col items-center justify-center min-h-[110px] text-center transition-all duration-200
                  ${isActive ? "border-[#CD8B4E] shadow-sm ring-1 ring-[#CD8B4E]" : "border-gray-200 hover:border-gray-300"}
                `}
                                >
                                    <div className="h-10 flex items-center justify-center mb-3">
                                        <img
                                            src={step.icon}
                                            alt={step.label}
                                            className="h-full object-contain"
                                        />
                                    </div>
                                    <span className="text-[14px] font-normal leading-tight text-[#272727]/90 max-w-[140px] font-albert">
                                        {step.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="min-h-[48px] max-w-2xl mx-auto mb-0">
                        <p className="text-[14px] text-[#272727] leading-relaxed transition-opacity duration-300 font-albert font-light">
                            {packingSteps[activeStep].desc}
                        </p>
                    </div>

                    <div className="inline-block bg-[#E8E9ED] py-2 rounded-[10px] md:min-w-4xl mx-auto">
                        <p className="text-[14px] text-[#646C88]/90 font-normal font-albert tracking-wide">
                            Note: Wooden crate packaging available on request at additional
                            cost for export shipments.
                        </p>
                    </div>
                </div>
            </section>

            {/* 8. APPLICATIONS / INDUSTRIES */}
            <ApplicationsSection />

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

            {/* 10. SYSTEM COMPLEMENTS */}
            <section className="bg-white py-10 md:py-15 font-AlbertSans selection:bg-[#C43A26]/10">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center">
                    <span className="eyebrow-2 text-[#C43A26] tracking-[0.3em] uppercase block mb-1 font-albert">
                        ALSO FROM PARASMANI
                    </span>
                    <h2 className="h2 tracking-tight text-[#272727] leading-tight mb-12">
                        Complete Your System
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {systems.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl overflow-hidden border border-[#E2E6EC] hover:border-[#D5C2B5] shadow-sm flex flex-col text-left group h-[450px] relative transition-all duration-300"
                            >
                                <div className="bg-[#FAF5F0] h-[270px] w-full flex items-center justify-center pt-36 overflow-hidden select-none">
                                    <img
                                        src={item.image}
                                        alt={item.alt}
                                        className="max-h-[280%] max-w-full object-contain"
                                    />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end bg-white min-h-[180px] group-hover:bg-white/95 transition-all duration-500 ease-in-out z-10">
                                    <span className="text-[12px] text-[#272727] font-medium tracking-widest uppercase block mb-1 font-albert">
                                        {item.category}
                                    </span>
                                    <h3 className="text-[24px] text-[#272727] font-normal tracking-tight transition-colors group-hover:text-[#545454] font-albert">
                                        {item.title}
                                    </h3>
                                    <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-500 ease-in-out">
                                        <div className="overflow-hidden">
                                            <p className="text-[12px] text-[#666666] leading-relaxed line-clamp-2 pt-3">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            onClick={() => navigate(item.link)}
                                            className="b2 px-6 py-2 border border-gray-900 bg-white group-hover:bg-[#FAF5F1] rounded-full font-medium text-gray-900 transition-all duration-300 flex items-center gap-1.5 group-hover:border-[#D5C2B5] group-hover:text-[#6E645E]"
                                        >
                                            <span>View Product</span>
                                            <span className="text-sm font-light relative top-[0.5px]">
                                                <HiArrowNarrowRight />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 11. FAQ ACCORDION SECTION */}
            <section className="bg-white py-16 md:py-24 relative">
                <div className="max-w-[1140px] mx-auto px-6 md:px-12 text-left">
                    <div className="mb-14">
                        <span className="eyebrow-2 text-[#C43A26] tracking-[0.3em] uppercase block mb-1 font-albert">
                            FREQUENTLY ASKED QUESTIONS (FAQ)
                        </span>
                        <h2 className="h2 tracking-tight text-[#272727] leading-tight mb-4">
                            Questions We Hear Often
                        </h2>
                    </div>
                    <div className="w-full flex flex-col">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    className={`w-full transition-all duration-300 ${isOpen ? "border-b border-[#CD8B4E]" : "border-b border-gray-200"}`}
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                                        className="w-full text-left py-6 flex items-center justify-between gap-6 bg-transparent group"
                                    >
                                        <span className="text-[16px] text-[#272727] font-normal tracking-wide leading-snug font-albert">
                                            {faq.q}
                                        </span>
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${isOpen
                                                    ? "bg-[#EDD9C5]"
                                                    : "bg-[#F4F4F4] group-hover:bg-[#EAEAEA]"
                                                }`}
                                        >
                                            {isOpen ? (
                                                <svg
                                                    className="w-6.5 h-6.5 text-[#231F20]"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={1}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    className="w-6 h-5 text-[#231F20]"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={1.5}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 4v16m8-8H4"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                    </button>
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[300px] opacity-100 pb-8" : "max-h-0 opacity-0"}`}
                                    >
                                        <p className="text-[13px] text-[#454545] leading-relaxed max-w-[860px] font-albert">
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 12. GET STARTED / BOTTOM CALL OUT BANNER */}
            <section className="bg-[#FBFBFB] pt-10 lg:pt-15 pb-0 lg:pb-24 overflow-hidden relative min-h-none lg:min-h-[480px] flex items-center">
                <div className="max-w-[1240px] mx-auto w-full px-4 md:px-2 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                    <div className="lg:col-span-7 text-center lg:text-left lg:pl-12 xl:pl-20">
                        <span className="eyebrow-2 text-[#C43A26] tracking-[0.3em] uppercase block mb-1 font-albert">
                            GET STARTED
                        </span>
                        <h2 className="h2 tracking-tight text-[#272727] leading-tight mb-4">
                            The Right Tube for Your Upcoming Project.
                        </h2>
                        <p className="p2 text-[#454545]/80 max-w-3xl mx-auto lg:mx-0 mb-8 lg:mb-10 font-albert font-extralight">
                            Download the full technical brochure, or speak with our team
                            directly for sizing, certifications, pricing, and project support.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <button
                                onClick={() => navigate("/contact")}
                                className="b2 flex items-center justify-center text-[#162046] bg-white border border-[#162046] h-[54px] px-6 rounded-full font-medium w-full sm:w-[280px] whitespace-nowrap transition-colors hover:bg-[#162046]/5 relative z-20"
                            >
                                Enquire Now
                            </button>
                            <motion.button
                                style={{ background: btn2Bg, color: btn2Text }}
                                onClick={() => navigate("/downloads?category=Brochures")}
                                className="b2 flex items-center justify-center h-[54px] px-6 rounded-full shadow-sm font-medium w-full sm:w-[280px] whitespace-nowrap transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Download Brochure
                            </motion.button>
                        </div>
                    </div>
                    <div className="block translate-x-2 lg:hidden w-screen -mx-6 mt-8 select-none pointer-events-none overflow-hidden">
                        <img
                            src={getStartedImg}
                            alt="Hands presenting a clean straight copper line tube"
                            className="w-full h-auto min-h-[220px] translate-y-2  object-cover object-center"
                        />
                    </div>
                    <div className="hidden lg:block lg:col-span-5 h-full pointer-events-none" />
                </div>
                <div className="hidden lg:flex absolute bottom-0 right-0 lg:w-[45%] h-full justify-end items-end select-none pointer-events-none z-0">
                    <img
                        src={getStartedImg}
                        alt="Hands presenting a clean straight copper line tube"
                        className="h-full w-auto translate-y-2 max-w-[640px] xl:max-w-[720px] object-contain object-bottom object-right"
                    />
                </div>
            </section>
        </div>
    );
};

export default StraightCopperTube;
