import  { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Card width (342px) + flex gap (24px) = per-card slide step.
const CARD_STEP = 342 + 24;

import fittingType1 from "../../../assets/products/copperFitting/fittingType1White.png";
import fittingType2 from "../../../assets/products/copperFitting/fittingType2White.png";
import fittingType3 from "../../../assets/products/copperFitting/fittingType3White.png";
import fittingType4 from "../../../assets/products/copperFitting/fittingType4White.png"; // Note: Swap with coupling png if needed!
import fittingType5 from "../../../assets/products/copperFitting/SCR-20260608-trgiWhite.png";
import fittingType6 from "../../../assets/products/copperFitting/SCR-20260608-trojWhite.png";
import { useNavigate } from 'react-router-dom';

export default function FittingTypesSection() {
  const fittingData = [
    {
      title: "90° Elbow",
      desc: "Most common — used at every direction change. Available in standard and long-radius variants for HVAC and plumbing.",
      tags: ["HVAC Mains", "Riser Pipes", "Plumbing"],
      imgUrl: fittingType1
    },
    {
      title: "45° Elbow",
      desc: "Gentler offset — lower pressure drop than 90° at high flow rates. Preferred in chilled water and long-run systems.",
      tags: ["Chilled Water", "Long Runs", "Industrial"],
      imgUrl: fittingType2
    },
    {
      title: "Equal Tee",
      desc: "Three-way junction for branching a line. All ports are the same diameter. Used in headers and distribution systems.",
      tags: ["Headers", "Distribution", "Medical MGPS"],
      imgUrl: fittingType3
    },
    {
      title: "Coupling",
      desc: "Straight joiner for two lengths of the same diameter tube. Standard for pipe extensions and field repairs.",
      tags: ["Extensions", "Field Repairs", "All Applications"],
      imgUrl: fittingType4
    },
    {
      title: "Reducer",
      desc: "Steps down pipe diameter between sections for smooth size transitions between headers and branches.",
      tags: ["HVAC Mains", "Riser Pipes", "Plumbing"],
      imgUrl: fittingType5
    },
    {
      title: "U Bend",
      desc: "180° return for coil headers, heat exchangers, and any application requiring full flow reversal.",
      tags: ["HVAC Mains", "Riser Pipes", "Plumbing"],
      imgUrl: fittingType6
    }
  ];
const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(fittingData.length - 1);

  // Dynamic boundary calculation allows viewing all cards up to the U-Bend
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const cardWidthWithGap = CARD_STEP; // 366px card step size
      
      // Calculate available space for the slider on the right
      let availableWidth = width;
      if (width >= 1024) {
        // Approximate space allocated for the left side panel
        const leftSideWidth = Math.max(400, width * 0.38);
        availableWidth = width - leftSideWidth;
      } else {
        availableWidth = width - (width >= 768 ? 96 : 48); // account for padding
      }

      const visibleCards = Math.floor(availableWidth / cardWidthWithGap);
      // Ensure max index allows sliding to view remaining hidden trailing elements
      const calculatedMax = Math.max(0, fittingData.length - Math.max(1, visibleCards));
      
      setMaxIndex(calculatedMax);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fittingData.length]);

  // Safely clamp indices if viewport changes dynamically
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  return (
    <section className="w-full bg-white py-16 md:py-24 overflow-hidden font-sans select-none">
      {/* UPPER SECTION WRAPPER CORE */}
      <div className="w-full flex flex-col lg:flex-row items-start gap-12 lg:gap-0">
        
        {/* LEFT COMPONENT CONTENT HOUSING */}
        <div className="w-full lg:w-[38%] shrink-0 px-6 md:px-12 flex flex-col justify-between custom-lg-left-calc z-10 bg-white">
          <div className="max-w-[400px] lg:max-w-none mx-auto lg:mx-0">
            <span className="eyebrow-2 text-[#C43A26] tracking-[0.3em] uppercase block mb-3 font-albert">
              FITTING TYPES
            </span>
            <h2 className="h2 tracking-tight text-[#272727] leading-tight mb-4">
              Every Joint.<br />Every Configuration.
            </h2>
            <p className="p2 text-[#454545] leading-6 mb-8 font-albert">
              Six standard types covering all directional changes, diameter transitions, and line terminations across every piping application.
            </p>
          </div>

          <div className="pt-6 border-t border-[#E6E6E6] hidden lg:block">
            <p className="text-[#454545] text-[17px] leading-6   mb-8 font-albert">
              Need reducing tees, long elbows, or custom fitting solutions?
            </p>
            <button
            onClick={() => navigate("/contact")}
            className="b2 px-6 py-3.5 bg-[#19223E] text-white rounded-full font-medium hover:bg-[#202b4e] transition-colors duration-200 shadow-xs cursor-pointer">
              Contact Sales Team
            </button>
          </div>
        </div>

        {/* RIGHT FULL-EDGE OVERFLOW VIEWPORT SLIDER */}
        <div className="w-full flex-grow overflow-hidden pl-6 md:pl-12 lg:pl-6">
          <motion.div
            className="flex gap-6 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: -maxIndex * CARD_STEP, right: 0 }}
            dragElastic={0.12}
            dragMomentum={false}
            animate={{ x: -currentIndex * CARD_STEP }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            onDragEnd={(_, info) => {
              // Snap to the nearest neighbour, letting a quick flick jump too.
              let next = currentIndex;
              if (info.offset.x < -CARD_STEP / 4 || info.velocity.x < -400) {
                next = currentIndex + 1;
              } else if (info.offset.x > CARD_STEP / 4 || info.velocity.x > 400) {
                next = currentIndex - 1;
              }
              setCurrentIndex(Math.max(0, Math.min(next, maxIndex)));
            }}
          >
            {fittingData.map((item, idx) => (
              <div
                key={idx}
                className="w-[342px] min-w-[342px] bg-[#F7F7F7] rounded-2xl border border-gray-200/40 overflow-hidden flex flex-col h-[460px] transition-all duration-300 shadow-2xs"
              >
                {/* Image wrapper using contain framework to avoid cropping asset edges */}
                <div className="w-full aspect-[5.9/3.9] bg-white flex items-center justify-center p-0 border-b border-gray-200/30 overflow-hidden">
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain pointer-events-none mix-blend-multiply transition-transform duration-300"
                  />
                </div>

                {/* Main Information Drawer */}
                <div className="p-6 flex flex-col justify-between flex-grow bg-[#F7F7F7]">
                  <div>
                    <h4 className="text-[19px] font-medium text-[#231F20] tracking-tight mb-2 font-albert">
                      {item.title}
                    </h4>
                    <p className="text-[13.5px] text-[#545454] font-normal leading-[1.6] min-h-[72px] font-albert">
                      {item.desc}
                    </p>
                  </div>

                  {/* Badges Pill Track Row */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[12px] font-normal text-[#646C88] bg-white border border-[#646C88] px-3 py-1 rounded-full shadow-3xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* LOWER NAVIGATION CONTROL FOOTER STRIP */}
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 mt-12 flex flex-col sm:flex-row items-center justify-between gap-8">
        
        {/* Mobile View Bottom Action Form Block */}
        <div className="pt-4 border-t border-gray-100 w-full sm:w-auto lg:hidden">
          <p className="text-[13.5px] text-[#231F20]/80 font-normal leading-normal max-w-[260px] mb-4">
            Need reducing tees, long elbows, or custom fitting solutions?
          </p>
          <button className="b2 px-6 py-3.5 bg-[#19223E] text-white rounded-full font-medium hover:bg-[#202b4e] transition-colors duration-200 shadow-xs cursor-pointer">
            Contact Sales Team
          </button>
        </div>

        {/* Action Controls aligned below slider boundaries */}
        <div className="flex items-center gap-3 ml-auto lg:w-[62%] lg:pl-6 lg:justify-start">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`w-11 h-11 border rounded-full flex items-center justify-center transition-all duration-200 ${
              currentIndex === 0 
                ? 'opacity-20 border-gray-300 text-gray-400 cursor-not-allowed' 
                : 'border-gray-900 bg-white text-gray-900 hover:bg-gray-50 active:scale-95 cursor-pointer shadow-xs'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`w-11 h-11 border rounded-full flex items-center justify-center transition-all duration-200 ${
              currentIndex >= maxIndex 
                ? 'opacity-20 border-gray-300 text-gray-400 cursor-not-allowed' 
                : 'border-gray-900 bg-white text-gray-900 hover:bg-gray-50 active:scale-95 cursor-pointer shadow-xs'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Inline Layout Balancing CSS Inject Styles Rule Block */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 1024px) {
          .custom-lg-left-calc {
            padding-left: calc((100vw - 1240px) / 2 + 48px) !important;
          }
        }
      `}} />
    </section>
  );
}
