import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import built1 from "../../assets/Built/build1.png";
import built2 from "../../assets/Built/build2.png";
import built3 from "../../assets/Built/build3.png";

export default function InfrastructureSection() {
  const [activeTab, setActiveTab] = useState("facility");
  
  // Carousel images configuration mapping (Defaulting center index to index 1 -> built2)
  const [activeIndex, setActiveIndex] = useState(1);

  // Array reference mapped explicitly to build structural order requested: left, center, right
  const imagesList = [built1, built2, built3];

  /**
   * Generates a structural static sequence matrix layer mimicking image_8b713b.jpg layout
   * where built1 is left, built2 is center, and built3 is right.
   */
  const getLayoutItems = () => {
    return [
      { id: "left-item", url: imagesList[0], pos: "left", index: 0 },
      { id: "center-item", url: imagesList[1], pos: "center", index: 1 },
      { id: "right-item", url: imagesList[2], pos: "right", index: 2 },
    ];
  };

  return (
    <section className="bg-white py-16 md:py-20 overflow-hidden select-none font-sans">
      
      {/* 1. Header Typography Area Block */}
      <div className="max-w-[1200px] mx-auto text-center px-6 mb-10">
        <span className="eyebrow-2 tracking-[0.3em] uppercase text-[#D25A3B] block mb-3">
          WHAT WE’VE BUILT
        </span>
        <h2 className="h2 text-[#1A1A1A] tracking-tight">
          Infrastructure That Powers Production
        </h2>
        <p className="p2 leading-[1.6] text-[#555555] max-w-[740px] mx-auto mt-4 font-normal">
          Parasmani’s Umbergaon facility operates as an integrated, end-to-end
          system, ensuring strict process control and multi-stage quality
          assurance from raw material to finished tubes.
        </p>

        {/* 2. Interactive Toggle Pill Bar Container Component Frame */}
        <div className="flex justify-center mt-9">
          <div className="bg-[#EADCCF]/70 p-1.5 rounded-[28px] flex items-center gap-1 w-64 relative z-10">
            <button
              onClick={() => setActiveTab("facility")}
              className={`flex-1 py-2 text-[13px] font-medium rounded-full transition-colors duration-200 relative z-20 ${
                activeTab === "facility" ? "text-white" : "text-[#5A5A5A] hover:text-[#1A1A1A]"
              }`}
            >
              Facility
              {activeTab === "facility" && (
                <motion.div
                  layoutId="activeTabBackground"
                  className="absolute inset-0 bg-[#C48A54] rounded-full -z-10 shadow-sm"
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("machinery")}
              className={`flex-1 py-2 text-[13px] font-medium rounded-full transition-colors duration-200 relative z-20 ${
                activeTab === "machinery" ? "text-white" : "text-[#5A5A5A] hover:text-[#1A1A1A]"
              }`}
            >
              Machinery
              {activeTab === "machinery" && (
                <motion.div
                  layoutId="activeTabBackground"
                  className="absolute inset-0 bg-[#C48A54] rounded-full -z-10 shadow-sm"
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Core Image Carousel Stage - Pixel-Perfect replication of image_8b713b.jpg */}
      <div className="relative w-full flex items-center justify-center h-[340px] sm:h-[420px] md:h-[460px] lg:h-[500px] overflow-visible px-4">
        <div className="relative flex items-center justify-center w-full max-w-[1440px] h-full gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {getLayoutItems().map((item) => {
              const isCenter = item.pos === "center";
              
              return (
                <motion.div
                  key={`${activeTab}-${item.id}`}
                  layout
                  initial={{ opacity: 0, scale: isCenter ? 0.96 : 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 28,
                  }}
                  onClick={() => setActiveIndex(item.index)}
                  className={`relative shrink-0 transition-all duration-300 overflow-hidden grayscale border border-black/5
                    ${
                      isCenter
                        ? "w-[56%] md:w-[62%] rounded-[20px] z-20 shadow-md grayscale-0"
                        : "w-[20%] md:w-[17%] rounded-[20px] opacity-40 z-10 pointer-events-none"
                    }
                  `}
                >
                  <img
                    src={item.url}
                    alt={`Parasmani Production Layer - ${item.pos}`}
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />

                  {/* Copyright micro-text watermark layered inside center frame bounds */}
                  {isCenter && (
                    <div className="absolute bottom-5 right-6 text-[10px] tracking-wider text-white/60 font-sans font-light bg-black/10 backdrop-blur-[2px] px-2 py-0.5 rounded-md">
                      Copyright <span className="font-medium text-white/80">Parasmani Copper</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* 4. Center Micro Dot Segment Controllers layout */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {imagesList.map((_, dotIndex) => (
          <button
            key={dotIndex}
            onClick={() => setActiveIndex(dotIndex)}
            className="p-1 focus:outline-none"
            aria-label={`Slide target navigation node tracker ${dotIndex + 1}`}
          >
            <div
              className={`rounded-full transition-all duration-300 ease-out ${
                dotIndex === activeIndex
                  ? "bg-[#C48A54] w-5 h-2"
                  : "bg-[#EADCCF] w-2 h-2 hover:bg-[#C48A54]/50"
              }`}
            />
          </button>
        ))}
      </div>

    </section>
  );
}