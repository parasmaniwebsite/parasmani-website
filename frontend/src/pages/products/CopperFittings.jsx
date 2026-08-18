import React, { useState } from "react";
import AvailableBrands from "../../components/AvailableBrands";

// Given Assets Imports
import heroImg from "../../assets/products/copperFitting/heroImg.png";
import fittingType1 from "../../assets/products/copperFitting/fittingType1.png";
import fittingType2 from "../../assets/products/copperFitting/fittingType2.png";
import fittingType3 from "../../assets/products/copperFitting/fittingType3.png";

import packagingBigImg1 from "../../assets/products/copperFitting/packagingBigImg1.png";
import packagingBigImg2 from "../../assets/products/copperFitting/packagingBigImg2.png";
import packagingBigImg3 from "../../assets/products/copperFitting/packagingBigImg3.png";

import packagingImg1 from "../../assets/products/copperFitting/packagingImg1.svg";
import packagingImg2 from "../../assets/products/copperFitting/packagingImg2.svg";
import packagingImg3 from "../../assets/products/copperFitting/packagingImg3.svg";

import fromParasManiImg1 from "../../assets/products/copperFitting/fromParasManiImg1.png";
import fromParasManiImg2 from "../../assets/products/copperFitting/fromParasManiImg2.png";
import bottomImg from "../../assets/products/copperFitting/bottomImg.png";
import FittingTypesSection from "./copperFittings/FittingTypesSection";

import CFAPplicationSection from "./copperFittings/CFApplicationSection";
import CFPuritySection from "./copperFittings/CFPuritySection";

import CFbyTheNumbers from "./copperFittings/CFbyTheNumbers";
import CFcompliance from "./copperFittings/CFcompliance";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import ProductHeroActions from "../../components/ProductHeroActions";
import { faqs } from "./copperFittings/faqData";

/* Module scope and exported so seo/schema.js can emit these as FAQPage
   markup from the same array the accordion renders -- structured data must
   match what the visitor can actually see on the page. */

const CopperFittings = () => {
  // State for active FAQ panel indices
  const [openFaq, setOpenFaq] = useState(null);

  const [activeStep, setActiveStep] = useState(0);
  const fittingTypes = [
    {
      title: "90° Elbow",
      desc: "Most common — used at every direction change. Available in standard and long-radius variants for HVAC and plumbing.",
      tags: ["HVAC Mains", "Riser Pipes", "Plumbing"],
      img: fittingType1,
    },
    {
      title: "45° Elbow",
      desc: "Gentler offset — lower pressure drop than 90° at high flow rates. Preferred in chilled water and long-run systems.",
      tags: ["Chilled Water", "Long Runs", "Industrial"],
      img: fittingType2,
    },
    {
      title: "Equal Tee",
      desc: "Three-way junction connecting lines of identical diameter. Engineered to distribute flow smoothly without turbulent drops.",
      tags: ["Headers", "Distribution"],
      img: fittingType3,
    },
  ];

  const packingSteps = [
    {
      label: "Individually Bagged",
      desc: "Each fitting type is sealed in its own plastic bag — keeping the surface clean and oxide-free from factory to installation, ready to braze straight from the pack.",
      icon: packagingImg1,
      bigImage: packagingBigImg1,
    },
    {
      label: "Specification Label on Every Pack",
      desc: "Each plastic bag carries a printed label with fitting type, size, alloy grade, and applicable standard — so every piece is identified before it reaches the joint.",
      icon: packagingImg2,
      bigImage: packagingBigImg2,
    },
    {
      label: "Corrugated Box Packing",
      desc: "Individually packed fittings are grouped by size and type into labelled corrugated boxes — easy to sort, count, and store on site with no mix-ups.",
      icon: packagingImg3,
      bigImage: packagingBigImg3,
    },
  ];


  const systems = [
    {
      category: "H / HH / QH",
      title: "Straight Copper Tube",
      image: fromParasManiImg1,
      desc: "Pre-cut C12200 DHP copper, 3-metre straight lengths. Hard drawn for rigid, high-pressure installations.",
      alt: "Pancake copper coil layout",
      link: "/straight-copper-tubes",
    },
    {
      category: "SOFT ANNEALED",
      title: "Pancake Copper Coils",
      image: fromParasManiImg2,
      desc: "Pre-coiled C12200 DHP copper, 15.24m standard coil. Soft annealed for easy field bending.",
      alt: "Assorted premium industrial copper fittings and pipe joints",
      link: "/pancake-copper-coil",
    },
  ];
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const maxSteps = fittingTypes.length - 2;
  const isAtEnd = activeIndex >= maxSteps;

  return (
    <div className="w-full bg-[#FAFAFA] font-albert text-[#1E2229] overflow-x-hidden antialiased">
      {/* 1. HERO SECTION */}
      <section className="w-full bg-white overflow-hidden select-none">
        {/* Inner wrapper constrains alignment within the 1440px page boundary */}
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-12 sm:py-16 lg:py-0 grid grid-cols-1 lg:grid-cols-12 items-center h-auto lg:h-[516px] relative gap-10 lg:gap-0">
          {/* Text Column - Stays strictly aligned to the left margins of the 1440px container */}
          <div className="w-full lg:col-span-6 z-10 text-center lg:text-left flex flex-col items-center lg:items-start justify-center h-auto lg:h-full">
            <span className="eyebrow-1 text-[#C43A26] tracking-[0.15em] uppercase block mb-3 font-AlbertSans">
              BUILT TO CONNECT
            </span>
            <h1 className="h1 tracking-tight text-[#231F20] leading-[1.15] mb-4">
              Copper Fittings
            </h1>
            <p className="p1 text-[#545454] leading-relaxed mb-8 font-AlbertSans max-w-xl">
              Wrought copper fittings engineered for reliable joins and
              versatile integration across multiple applications. Built to
              global standards.
            </p>

            {/* Action Buttons */}
            <ProductHeroActions />
          </div>

          {/* Image Column - Renders relative on mobile, absolute on desktop to cleanly exit the container constraint on the right side */}
          <div className="relative lg:absolute w-full lg:w-1/2 flex items-center justify-center lg:justify-end select-none h-auto lg:h-full right-0 mt-6 lg:mt-0 lg:col-span-6">
            <div className="relative w-full max-w-[520px] sm:max-w-[650px] lg:max-w-[800px] flex items-center justify-center lg:justify-end ml-auto">
              <img
                src={heroImg}
                alt="Polished Premium Wrought Copper Fittings Array"
                className="w-full max-h-[300px] sm:max-h-[350px] lg:max-h-[480px] object-contain lg:object-right transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PURITY LEVEL BANNER */}

      <CFPuritySection />

      {/* 3. BY THE NUMBERS (SPECIFICATIONS) */}
      <CFbyTheNumbers />

      {/* 4. BRAND ALLIANCES (WITH REWORDED BRAND NARRATIVE) */}
      <AvailableBrands description="PTP K-Series fittings are our established, project-preferred joining solution for HVAC and VRF/VRV systems, trusted for dimensional precision, installation reliability, and broad application compatibility. PARASMANI fittings extend the same manufacturing standards across HVAC/R, plumbing, medical gas, and industrial piping systems, ensuring dependable connections throughout the product range." />

      {/* 5. COMPLIANCE STANDARDS PANEL */}

      <CFcompliance />

      {/* 6. EVERY JOINT. EVERY CONFIGURATION. (FITTING TYPES) */}

      <FittingTypesSection />

      {/* 7. FACTORY PACKAGING SECTION */}
      <section className="relative bg-[#FBFBFB] py-8 md:py-10 px-4 md:px-8 lg:px-12 font-sans select-none">
        {/* Central Content Card Canvas Frame wrapper */}
        <div className="max-w-[1200px] mx-auto p-2 md:px-12 md:py-6 text-center">
          {/* Section Header Elements Block */}
          <span className="eyebrow-2 text-[#C43A26] tracking-[0.3em] uppercase block mb-3 font-albert">
            PACKAGING
          </span>
          <h2 className="h2 tracking-tight text-[#272727] leading-tight mb-4">
            Individually Packed. Perfectly Protected.
          </h2>
          <p className="p2 text-[#454545]/80 max-w-3xl mx-auto mb-6 font-albert font-extralight leading-relaxed">
            Each fitting is individually wrapped and carton-packed to prevent
            surface damage, oxidation, and dimensional distortion in transit and
            on site.
          </p>

          {/* Dynamic Display Graphic Box Container Frame - Swapped to bg-white & object-contain */}
          <div className="bg-white rounded-2xl max-w-4xl mx-auto overflow-hidden mb-6 border border-gray-100 flex items-center justify-center relative h-[160px] sm:h-[220px] md:h-[280px] shadow-sm">
            <img
              src={packingSteps[activeStep].bigImage}
              alt={packingSteps[activeStep].label}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>

          {/* 4-Column Feature Grid Matrix Selection Trigger Area */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 max-w-4xl mx-auto mb-5">
            {packingSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`basis-[calc(50%-8px)] md:basis-[calc(25%-12px)] p-3 md:p-4 rounded-xl border bg-white flex flex-col items-center justify-center min-h-[100px] md:min-h-[110px] text-center transition-all duration-200 max-w-xs mx-auto w-full
              ${
                isActive
                  ? "border-[#CD8B4E] border-0 shadow-sm ring-1 ring-[#CD8B4E]"
                  : "border-gray-200 hover:border-gray-300"
              }
            `}
                >
                  {/* Vector Layout Box Wrapper Frame */}
                  <div className="h-9 md:h-10 flex items-center justify-center mb-2">
                    <img
                      src={step.icon}
                      alt={step.label}
                      className="h-full object-contain"
                    />
                  </div>
                  <span className="text-[11px] md:text-[13px] font-medium leading-tight text-[#231F20] max-w-[130px]">
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Descriptive Panel viewport text block */}
          <div className="min-h-[48px] max-w-2xl mx-auto mb-0 px-2">
            <p className="text-[14px] md:text-[16px] text-[#272727] leading-relaxed transition-opacity duration-300 font-albert font-light">
              {packingSteps[activeStep].desc}
            </p>
          </div>
        </div>
      </section>

      {/* 8. APPLICATIONS SECTION */}
      <CFAPplicationSection />

      {/* 9. CALCULATOR CALL OUT BANNER */}
      <section className="mx-[calc(50%-50vw)] bg-[#17234F] px-6 py-[70px] md:py-[100px]">
        <div className="mx-auto flex w-full flex-col items-center justify-between overflow-hidden rounded-[40px] bg-[#4D5A7E] px-6 py-[42px] sm:px-10 md:rounded-[100px] md:px-[70px] lg:flex-row lg:px-[90px] lg:py-[48px]">
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
              Calculate Pressure
            </button>
          </div>
        </div>
      </section>

      {/* 10. COMPLETE YOUR SYSTEM COMPLEMENTS */}
      <section className="bg-white py-16 md:py-24 font-AlbertSans selection:bg-[#C43A26]/10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center">
          {/* Section Typography Grouping Header */}
          <span className="eyebrow-2 text-[#C43A26] tracking-[0.3em] uppercase block mb-3 font-albert">
            ALSO FROM PARASMANI
          </span>
          <h2 className="h2 tracking-tight text-[#272727] leading-tight mb-12">
            Complete Your System
          </h2>

          {/* Dual-Card Side-by-Side System Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {systems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-[#E2E6EC] hover:border-[#D5C2B5] shadow-sm flex flex-col text-left group h-[450px] relative transition-all duration-300"
              >
                {/* Upper Boxed Warm Media Container */}
                <div className="bg-[#FAF5F0] h-[270px] w-full flex items-center justify-center pt-36 overflow-hidden select-none">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="max-h-[280%] max-w-full object-contain"
                  />
                </div>

                {/* Lower Informational Overlay Panel */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end bg-white min-h-[180px] group-hover:bg-white/95 transition-all duration-500 ease-in-out z-10">
                  {/* Category Tag */}
                  <span className="text-[12px] text-[#272727] font-medium tracking-widest uppercase block mb-1 font-albert">
                    {item.category}
                  </span>

                  {/* Title */}
                  <h4 className="text-[22px] text-[#272727] font-normal tracking-tight transition-colors group-hover:text-[#545454] font-albert">
                    {item.title}
                  </h4>

                  {/* Smooth Expandable Description Wrapper */}
                  <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-[13px] text-[#666666] leading-relaxed font-normal line-clamp-2 pt-3">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* View Product Button (Pushed down sequentially on hover) */}
                  <div className="mt-4">
                    <button
                      onClick={() => navigate(item.link)}
                      className="b2 px-6 py-2 border border-gray-900 bg-white group-hover:bg-[#FAF5F1] rounded-full font-medium text-gray-900 transition-all duration-300 flex items-center gap-1.5 group-hover:border-[#D5C2B5] group-hover:text-[#6E645E]"
                    >
                      <span>View Product</span>
                      <span className="text-sm font-light relative -top-[0.5px]">
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

      {/* 11. FAQ PANEL */}
      <section className="bg-white py-16 md:py-24 relative">
        <div className="max-w-[1140px] mx-auto px-6 md:px-12 text-left">
          {/* Header Block Section */}
          <div className="mb-14">
            <span className="eyebrow-2 text-[#C43A26] tracking-[0.3em] uppercase block mb-3 font-albert">
              FREQUENTLY ASKED QUESTIONS (FAQ)
            </span>
            <h2 className="h2 tracking-tight text-[#272727] leading-tight mb-4">
              Questions We Hear Often
            </h2>
          </div>

          {/* Minimalist Accordion Container Row Grid */}
          <div className="w-full flex flex-col">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`w-full transition-all duration-300 ${
                    isOpen
                      ? "border-b border-[#CD8B4E]"
                      : "border-b border-gray-200"
                  }`}
                >
                  {/* Header Toggle Trigger Area Button */}
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full text-left py-6 flex items-center justify-between gap-6 bg-transparent group"
                  >
                    <span className="text-[16px] md:text-[17px] text-[#272727] font-normal tracking-wide leading-snug font-albert">
                      {faq.q}
                    </span>

                    {/* Circular Functional Action State Indicators */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                        isOpen
                          ? "bg-[#EDD9C5]"
                          : "bg-[#F4F4F4] group-hover:bg-[#EAEAEA]"
                      }`}
                    >
                      {isOpen ? (
                        // Custom Thin Cancel Icon '✕'
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
                        // Custom Thin Plus Icon '＋'
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

                  {/* Collapsible Answer Animated Viewport Wrapper */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen
                        ? "max-h-[300px] opacity-100 pb-8"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-[14px] text-[#454545] leading-relaxed max-w-[860px] font-AlbertSans">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. GET STARTED / BOTTOM BANNER */}
      <section className="bg-[#FBFBFB] pt-12 lg:pt-4 pb-0 lg:pb-24 overflow-hidden relative min-h-none lg:min-h-[480px] flex items-center">
        {/* Core Content Layer */}
        <div className="max-w-[1240px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column - Core Copy Content (7 Columns wide) */}
          <div className="lg:col-span-7 text-center lg:text-left lg:pl-12 xl:pl-20">
            <span className="eyebrow-2 text-[#C43A26] tracking-[0.3em] uppercase block mb-3 font-albert">
              GET STARTED
            </span>
            <h2 className="h2 tracking-tight text-[#272727] leading-tight mb-4">
              The Right Fitting for Your Next Project.
            </h2>
            <p className="p2 text-[#454545]/80 max-w-3xl mx-auto lg:mx-0 mb-8 lg:mb-10 font-albert font-extralight">
              Download the full technical brochure, or speak with our team
              directly for sizing, certifications, pricing, and project support.
            </p>

            {/* Action Call-To-Action Layout Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => navigate("/contact")}
                className="b2 flex items-center justify-center h-[54px] px-6 w-full sm:w-[280px] bg-transparent border border-[#19223E] text-[#19223E] rounded-full font-medium tracking-wide whitespace-nowrap hover:bg-[#19223E]/5 transition-colors duration-200"
              >
                Enquire Now
              </button>
              <button
                onClick={() => navigate("/downloads?category=Brochures")}
                className="b2 flex items-center justify-center h-[54px] px-6 w-full sm:w-[280px] bg-[#19223E] text-white rounded-full font-medium tracking-wide whitespace-nowrap hover:bg-[#253159] transition-colors duration-200 shadow-sm"
              >
                Download Brochure
              </button>
            </div>
          </div>

          {/* Mobile/Tablet Fallback Image Space - Forced edge-to-edge layout configuration */}
          <div className="block lg:hidden w-screen -mx-6 mt-8 select-none pointer-events-none overflow-hidden">
            <img
              src={bottomImg}
              alt="Hands in blue protective gloves presenting a clean laser-etched straight copper line tube"
              className="w-full h-auto min-h-[220px] object-cover object-center"
            />
          </div>

          {/* Empty Column spacer on desktop to preserve text layout safety zone */}
          <div className="hidden lg:block lg:col-span-5 h-full pointer-events-none" />
        </div>

        {/* Absolute Bottom-Right Image Wrapper tied straight to the <section> base frame (Desktop Only) */}
        <div className="hidden lg:flex absolute bottom-0 right-0 lg:w-[45%] h-full justify-end items-end select-none pointer-events-none z-0">
          <img
            src={bottomImg}
            alt="Hands in blue protective gloves presenting a clean laser-etched straight copper line tube"
            className="h-full w-auto max-w-[640px] xl:max-w-[720px] object-contain object-bottom object-right"
          />
        </div>
      </section>
    </div>
  );
};

export default CopperFittings;
