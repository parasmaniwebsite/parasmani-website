import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import BrandsServed from "../components/BrandsServed";

import brand1 from "../assets/parasmani-logo.png";
import brand2 from "../assets/about/parasmaniabt2.png";
import down1 from "../assets/about/left.png";
import down2 from "../assets/about/right.png";
import factory from "../assets/about/factory.png";
import built1 from "../assets/Built/build1.png";
import built2 from "../assets/Built/build2.png";
import InfraStructureSection from "./about/InfraStructureSection";
import ABoutPM from "./about/AboutPM";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("facility");
  const [activeIndex, setActiveIndex] = useState(1); // Default center active item

  const cards = [
    {
      tag: "Multiple Applications",
      title: "Parasmani",
      description:
        "Parasmani is our flagship brand covering the full spectrum of copper tube applications.",
      logo: brand1,
      sideImage: down1,
      align: "left",
    },
    {
      tag: "HVAC/R Specialized",
      title: "PTP K-Series",
      description:
        "PTP K-Series is our dedicated HVAC line for VRF and non-VRF refrigerant applications.",
      logo: brand2,
      sideImage: down2,
      align: "right",
    },
  ];

  const INFRA_DATA = {
    facility: [built1, built2, built1, built2, built1],
    machinery: [built2, built1, built2, built1, built2],
  };

  const images = INFRA_DATA[activeTab];

  // Carousel Auto-play sequence
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length, activeTab]);

  const getVisibleImages = () => {
    const len = images.length;
    const leftIndex = (activeIndex - 1 + len) % len;
    const rightIndex = (activeIndex + 1) % len;

    return [
      { index: leftIndex, pos: "left", url: images[leftIndex] },
      { index: activeIndex, pos: "center", url: images[activeIndex] },
      { index: rightIndex, pos: "right", url: images[rightIndex] },
    ];
  };

  return (
    <div className="w-full overflow-hidden bg-white selection:bg-[#C68344]/30">
      {/* ================= HERO SECTION ================= */}
     <section className="relative w-full h-[540px] sm:h-[600px] lg:h-[720px] bg-white flex flex-col items-center justify-start overflow-hidden select-none">
      
      {/* ================= BACKGROUND IMAGE LAYER & MASKS ================= */}
      <div className="absolute inset-0 w-full h-full z-0 flex items-end">
        {/* Grayscale Factory Image placed at the bottom */}
        <img
          src={factory}
          alt="Factory Campus Backdrop"
          className="w-full h-[70%] sm:h-[75%] lg:h-[80%] object-cover object-bottom grayscale contrast-[0.95] brightness-[1.03] pointer-events-none"
          style={{
            mixBlendMode: "luminosity",
            // Fades the image's own top edge out instead of relying on the
            // white overlay to cover it, which left a visible seam.
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 14%, rgba(0,0,0,0.6) 34%, #000 58%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 14%, rgba(0,0,0,0.6) 34%, #000 58%)"
          }}
        />
        
        {/* 
          Pixel-Perfect Gradient Overlay:
          - Starts pure solid white at the top of the image to blend with the page flow.
          - Gradually fades out to transparent towards the bottom to allow the building details to shine through.
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/25 to-transparent h-full w-full pointer-events-none" />
      </div>

      {/* ================= CONTENT LAYOUT ================= */}
      <div className="relative z-10 text-center max-w-4xl mx-auto pt-16 sm:pt-24 lg:pt-28 px-6 flex flex-col items-center">
        
        {/* Category Tag */}
        <span className="eyebrow-1 text-[#C43A26] font-albert tracking-[0.15em] uppercase block mb-3 sm:mb-4">
          ABOUT US
        </span>
        
        {/* Hero Title */}
        <h1 className="h1 text-[#18234D] tracking-tight leading-[1.15] mb-4 sm:mb-5">
          Forged Over Three Decades
        </h1>
        
        {/* Supporting Description */}
        <p className="p1 text-[#272727]/90 font-albert font-light max-w-md sm:max-w-xl lg:max-w-[720px] leading-relaxed tracking-wide">
          A legacy of precision engineering, uncompromising quality, and global trust since 1989.
        </p>
        
      </div>
    </section>

      {/* ================= ABOUT US PROFILE & STATS ================= */}

      <ABoutPM />

      {/* ================= PROPRIETARY ASSETS BRANDS ================= */}
      <section className="w-full bg-[#FDFDFD] py-2 md:py-24 px-6 relative border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <span className="eyebrow-2 text-[#C43A26] font-albert uppercase tracking-[0.3em] block mb-4">
            PROPRIETARY ASSETS
          </span>
          <h2 className="h2 text-[#272727] tracking-tight">
            Brands We Proudly Present
          </h2>
          <p className="p2 font-albert text-gray-500 mt-4 max-w-3xl mx-auto leading-relaxed">
            Parasmani and PTP K-Series are our two proprietary brands,
            manufactured under a unified processing and quality control
            framework ensuring consistent specifications, reliability, and
            performance across all product lines.
          </p>
        </div>

        <div className="max-w-7xl mx-auto relative mt-16 px-4 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-24 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 hidden lg:block transform -translate-x-1/2 z-0" />

            {cards.map((card, idx) => {
              const isLeft = card.align === "left";
              return (
                <div
                  key={idx}
                  className="relative w-full h-auto min-h-[320px] lg:min-h-[340px] group"
                >
                  {/* Background Images */}
                  {isLeft ? (
                    <div className="absolute -left-15 md:-left-20 lg:-left-70 bottom-[-5px] md:bottom-[-225px] w-0 md:w-66 lg:w-[420px] z-0 pointer-events-none rotate-15">
                      <img
                        src={down1}
                        alt="Parasmani Copper Tubes"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  ) : (
                    <div className="absolute -right-20 md:-right-24 lg:-right-80 -bottom-90 w-48 md:w-72 lg:w-[600px] z-0 pointer-events-none">
                      <img
                        src={down2}
                        alt="PTP K-Series Copper Coil"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  )}

                  {/* Static Card Container -> Enhanced with .group hover states */}
                  <div className="w-full bg-[#FBFBFB] border border-[#C68344]/60 hover:border-[#C68344] rounded-3xl p-8 lg:p-7 flex flex-col justify-between backdrop-blur-md h-[70%] shadow-[0px_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0px_20px_40px_rgba(198,131,68,0.08)] transition-all duration-500 ease-out hover:-translate-y-2 relative z-10 top-0">
                    {/* Card Header Section */}
                    <div className="flex justify-between items-start gap-6 mb-1">
                      <div className="inline-flex bg-[#F6ECE3] border border-[#C68344] rounded-full px-4 py-3 text-xs text-[#5A4A3A] font-semibold tracking-wide font-albert whitespace-nowrap shadow-sm select-none">
                        {card.tag}
                      </div>
                      <img
                        src={card.logo}
                        alt={card.title}
                        className="h-10 md:h-20 max-w-[30%] mr-0 md:mr-10 object-contain flex-shrink-0 pointer-events-none select-none transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Card Typography Content */}
                    <div className="flex flex-col relative z-20">
                      <h4 className="text-xl font-light text-[#1C1C1C] font-albert mb-1 tracking-tight">
                        {card.title}
                      </h4>

                      <p className="text-[#666666] font-albert text-[14px] leading-relaxed max-w-[90%] sm:max-w-[80%]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= INFRASTRUCTURE (TABS) SECTION ================= */}
      <InfraStructureSection />

      {/* ================= COMPREHENSIVE MATRIX COMPARISON ================= */}
      <section className="w-full bg-[#FDFDFD] py-24 px-6 relative border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="eyebrow-2 text-[#C43A26] font-albert uppercase tracking-[0.3em] block mb-4">
              WHY SOURCE LOCAL
            </span>
            <h2 className="h2 text-[#272727] tracking-tight">
              Parasmani <span className="lowercase">VS</span> International Supply
            </h2>
            <p className="p2 font-albert text-[#373737] mt-5 max-w-[700px] mx-auto leading-relaxed">
              A side-by-side comparison of sourcing factors that influence lead
              time, pricing exposure, and supply reliability.
            </p>
          </div>

          {/* Responsive Horizontal Scroll Container */}
          <div className="overflow-x-auto rounded-[20px] bg-white shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100/70 scrollbar-thin scrollbar-thumb-gray-200">
            <table className="w-full min-w-[750px] border-collapse border-[#EDD9C5] text-left table-auto">
              <thead>
                <tr className="font-albert text-[16px] tracking-wide text-[#272727]">
                  <th className="bg-[#E8E9ED] px-6 md:px-8 py-[22px] font-normal min-w-[200px] w-[35%] rounded-tl-[20px]">
                    Factor
                  </th>
                  <th className="bg-[#C68344] text-white px-6 md:px-8 py-[22px] font-normal min-w-[240px] w-[32%]">
                    Parasmani India
                  </th>
                  <th className="bg-[#E8E9ED] px-6 md:px-8 py-[22px] font-normal min-w-[240px] w-[33%] rounded-tr-[20px]">
                    International Import
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/80 font-albert text-[15px]">
                <tr>
                  <td className="px-6 md:px-8 py-5 text-[#454545] font-medium">
                    Production planning
                  </td>
                  <td className="px-6 md:px-8 py-5 text-[#B2763D] font-medium">
                    10-15 Days Ideal Lead time
                  </td>
                  <td className="px-6 md:px-8 py-5 text-[#959AAD]">
                    6–10 weeks lead time
                  </td>
                </tr>

                <tr>
                  <td className="px-6 md:px-8 py-5 text-[#272727] font-medium">
                    Pricing basis
                  </td>
                  <td className="px-6 md:px-8 py-5 text-[#B27F4D] font-medium">
                    <div className="flex items-center gap-2">
                      <span>BME or LME</span>
                    </div>
                  </td>
                  <td className="px-6 md:px-8 py-5 text-[#9B9DA2]">
                    <div className="flex items-center gap-2">
                      <span>LME only</span>
                      <span className="bg-[#9B9DA2]/20 text-[#6B7280] text-[11px] px-3 py-0.5 rounded-full font-medium tracking-wide">
                        LME
                      </span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 md:px-8 py-5 text-[#272727] font-medium">
                    Import duty / GST
                  </td>
                  <td className="px-6 md:px-8 py-5 text-[#B27F4D] font-medium">
                    No Import Duty, only GST as applicable
                  </td>
                  <td className="px-6 md:px-8 py-5 text-[#9B9DA2]">
                    Customs + GST
                  </td>
                </tr>

                <tr>
                  <td className="px-6 md:px-8 py-5 text-[#272727] font-medium">
                    Currency risk
                  </td>
                  <td className="px-6 md:px-8 py-5 text-[#B27F4D] font-medium">
                    None – INR
                  </td>
                  <td className="px-6 md:px-8 py-5 text-[#9B9DA2]">
                    USD/CNY exposure
                  </td>
                </tr>

                <tr>
                  <td className="px-6 md:px-8 py-5 text-[#272727] font-medium">
                    Port / logistics delays
                  </td>
                  <td className="px-6 md:px-8 py-5 text-[#B27F4D] font-medium">
                    Zero
                  </td>
                  <td className="px-6 md:px-8 py-5 text-[#9B9DA2]">
                    Unpredictable
                  </td>
                </tr>

                <tr>
                  <td className="px-6 md:px-8 py-5 text-[#272727] font-medium">
                    Quality documentation
                  </td>
                  <td className="px-6 md:px-8 py-5 text-[#B27F4D] font-medium">
                    Full MTC provided
                  </td>
                  <td className="px-6 md:px-8 py-5 text-[#9B9DA2]">Varies</td>
                </tr>

                <tr>
                  <td className="px-6 md:px-8 py-5 text-[#272727] font-medium">
                    Cathode-grade input
                  </td>
                  <td className="px-6 md:px-8 py-5 text-[#B27F4D] font-medium">
                    Guaranteed
                  </td>
                  <td className="px-6 md:px-8 py-5 text-[#9B9DA2]">
                    Not always verifiable
                  </td>
                </tr>

                <tr>
                  <td className="px-6 md:px-8 py-5 text-[#272727] font-medium rounded-bl-[20px]">
                    Site visits / audits
                  </td>
                  <td className="px-6 md:px-8 py-5 text-[#B27F4D] font-medium">
                    Open – always welcome
                  </td>
                  <td className="px-6 md:px-8 py-5 text-[#9B9DA2] rounded-br-[20px]">
                    Impractical
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="font-albert text-[11px] text-[#717680] mt-10 max-w-4xl mx-auto leading-relaxed text-center">
            Disclaimer: Comparison reflects typical differences between domestic
            and international copper tube sourcing models. Actual commercial
            terms may vary by supplier and agreement structure.
          </p>
        </div>
      </section>

      <BrandsServed />
    </div>
  );
};

export default AboutUs;
