import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import qaHeroimg from "../assets/about/qualityAssurance/qabanner.png";
import processImg1 from "../assets/about/qualityAssurance/1.png";
import processImg2 from "../assets/about/qualityAssurance/2.png";
import processImg3 from "../assets/about/qualityAssurance/3.png";
import processImg4 from "../assets/about/qualityAssurance/4.png";
import processImg5 from "../assets/about/qualityAssurance/5.png";
import processImg6 from "../assets/about/qualityAssurance/6.png";
import processImg7 from "../assets/about/qualityAssurance/7.png";
import processImg8 from "../assets/about/qualityAssurance/8.png";
import processImg9 from "../assets/about/qualityAssurance/9.png";
import grid from "../assets/about/qualityAssurance/grid.png";
import QAimg from "../assets/about/qualityAssurance/QAimg.png";
import Compliance from "./about/quality/Compliance";
import testingAndInspectionBG from "../assets/about/qualityAssurance/30a4336a37810060d55385d0bca58984a621bcd7.png";
import testingAndInspection1 from "../assets/about/qualityAssurance/testingAndInspection1.png";
import testingAndInspection2 from "../assets/about/qualityAssurance/testingAndInspection2.png";
import testingAndInspection3 from "../assets/about/qualityAssurance/testingAndInspection3.png";
import testingAndInspection4 from "../assets/about/qualityAssurance/testingAndInspection4.png";
import testingAndInspection5 from "../assets/about/qualityAssurance/testingAndInspection5.png";
import testingAndInspection6 from "../assets/about/qualityAssurance/testingAndInspection6.png";
import testingAndInspection7 from "../assets/about/qualityAssurance/testingAndInspection7.png";
import testingAndInspectionhover1 from "../assets/about/qualityAssurance/testingAndInspectionhover1.png";
import testingAndInspectionhover2 from "../assets/about/qualityAssurance/testingAndInspectionhover2.png";
import testingAndInspectionhover3 from "../assets/about/qualityAssurance/testingAndInspectionhover3.png";
import testingAndInspectionhover4 from "../assets/about/qualityAssurance/testingAndInspectionhover4.png";
import testingAndInspectionhover5 from "../assets/about/qualityAssurance/testingAndInspectionhover5.png";
import testingAndInspectionhover6 from "../assets/about/qualityAssurance/testingAndInspectionhover6.png";
import testingAndInspectionhover7 from "../assets/about/qualityAssurance/testingAndInspectionhover7.png";

const processContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25 } },
};

const processCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { type: "spring", stiffness: 110, damping: 15 },
  },
};

const QualityAndAssurance = () => {
  const trackRef = useRef(null);
  const [sectionInView, setSectionInView] = useState(false);
  const [animatedMetrics, setAnimatedMetrics] = useState(new Set());
  const qaMatrixSectionRef = useRef(null);
  const processSectionRef = useRef(null);
  
  // Slider State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const items = [
    { title: "Universal Testing Machine (UTM) IS / BS / ASTM Compliant", img: testingAndInspection1, img2: testingAndInspectionhover1 },
    { title: "Hardness Testing Machines (Vickers)", img: testingAndInspection2, img2: testingAndInspectionhover2 },
    { title: "Online Eddy Current Testing System", img: testingAndInspection3, img2: testingAndInspectionhover3 },
    { title: "Hydrostatic Pressure Tester", img: testingAndInspection4, img2: testingAndInspectionhover4 },
    { title: "Pneumatic Pressure Tester", img: testingAndInspection5, img2: testingAndInspectionhover5 },
    { title: "Metallurgical Microscope", img: testingAndInspection6, img2: testingAndInspectionhover6 },
    { title: "Hardness Testing Machines (Rockwell)", img: testingAndInspection7, img2: testingAndInspectionhover7 },
  ];

  // Responsive constants
  const cardWidth = typeof window !== "undefined" && window.innerWidth >= 1024 ? 378 : 320;
  const gap = typeof window !== "undefined" && window.innerWidth >= 768 ? 30 : 24;
  const centerOffset = containerWidth > 0 ? (containerWidth - cardWidth) / 2 : 0;

  // Calculate drag limits: strictly linear
  const maxDragX = centerOffset;
  const minDragX = centerOffset - ((items.length - 1) * (cardWidth + gap));

  useEffect(() => {
    if (!trackRef.current) return;
    const calculateSizes = () => setContainerWidth(trackRef.current.offsetWidth);
    calculateSizes();
    window.addEventListener("resize", calculateSizes);
    return () => window.removeEventListener("resize", calculateSizes);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const qaMetrics = [
    { id: "01", title: "Chemical Composition Analysis" },
    { id: "02", title: "Hydrostatic Pressure Test" },
    { id: "03", title: "Eddy Current Test" },
    { id: "04", title: "Freedom from Defects Inspection" },
    { id: "05", title: "Pneumatic Pressure Test" },
    { id: "06", title: "Drift Expanding Test" },
    { id: "07", title: "Flattening Test" },
    { id: "08", title: "Hydrogen Embrittlement Test" },
    { id: "09", title: "Residue & Cleanliness Test" },
  ];

  const processSteps = [
    { num: "1", title: "Copper Melting and Casting", img: processImg1 },
    { num: "2", title: "Extrusion", img: processImg2 },
    { num: "3", title: "Drawing", img: processImg3 },
    { num: "4", title: "Cutting", img: processImg4 },
    { num: "5", title: "Straightening / Coiling", img: processImg5 },
    { num: "6", title: "Annealing", img: processImg6 },
    { num: "7", title: "Visual Inspection", img: processImg7 },
    { num: "8", title: "Eddy Current & Other Tests", img: processImg8 },
    { num: "9", title: "Packaging and Dispatch", img: processImg9 },
  ];

  const matrixContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
  };

  const matrixCardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 17 },
    },
  };

  return (
    <div className="w-full bg-white selection:bg-[#C43A26]/20 overflow-hidden">
      <style>{`
        @keyframes slideInLeftSmooth {
          0% { opacity: 0; transform: translateX(-30px) scale(0.98); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }

        @keyframes fadeInUpStaggered {
          0% { opacity: 0; transform: translateY(25px) scale(0.95); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(196, 58, 38, 0.1); }
          50% { box-shadow: 0 0 0 8px rgba(196, 58, 38, 0); }
        }

        .qa-metric-item {
          transition: all 400ms cubic-bezier(0.4, 0.0, 0.2, 1);
        }

        .qa-metric-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
        }
      `}</style>

      {/* ================= SECTION 1: HERO HEADER ================= */}
      <section
        className="relative w-full min-h-[220px] md:min-h-[260px] lg:min-h-[280px] flex items-center overflow-hidden border-b border-gray-100 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: `url(${qaHeroimg})` }}
      >
        {/* Left-focused subtle white overlay to guarantee readability on smaller screens */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent md:bg-none z-10" />

        <div className="max-w-7xl mx-auto w-full px-6 lg:px-16 grid grid-cols-1 md:grid-cols-12 items-center gap-8 relative z-20 py-16 md:py-20">
          <div className="md:col-span-8 lg:col-span-7 max-w-2xl">
            <h1 className="h1 text-[#272727] leading-[1.1] mb-6 tracking-tight">
              Built on Process. Verified by Standards.
            </h1>
            <p className="p1 text-[#4a4a4a] font-albert font-normal leading-relaxed max-w-xl">
              Every Parasmani copper tube passes through a structured
              manufacturing process and a rigorous 9-step quality assurance plan
              before it leaves our facility. From raw material sourcing to final
              dispatch, each stage is governed by documented protocols, in-house
              testing, and compliance with national and international standards.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: 9-STEP JOURNEY MAP ================= */}
      <section
        ref={processSectionRef}
        className="w-full bg-white py-24 px-6 relative z-10"
      >
        <div className="max-w-7xl mx-auto text-center mb-16">
          <span className="eyebrow-2 text-[#C43A26] font-albert tracking-[0.3em] uppercase block mb-3">
            PROCESS WE FOLLOW
          </span>
          <h2 className="h2 text-[#272727] tracking-tight">
            Journey from Melt to Market
          </h2>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Staggered container forces a strict 1 -> 9 sequential flow direction */}
          <motion.div
            variants={processContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-12 relative"
          >
            {processSteps.map((step, idx) => {
              // The grid is 2 columns on mobile and 3 from md up, so a card sits
              // at the end of its row at different points in each layout. Show
              // the connector only where the card actually has a neighbour to
              // its right in that layout.
              const isLastStep = idx === processSteps.length - 1;
              const hasMobileNeighbour = !isLastStep && idx % 2 === 0;
              const hasDesktopNeighbour = !isLastStep && (idx + 1) % 3 !== 0;
              const arrowVisibility =
                hasMobileNeighbour && hasDesktopNeighbour
                  ? "block"
                  : hasMobileNeighbour
                    ? "block md:hidden"
                    : "hidden md:block";

              return (
              <motion.div
                key={step.num}
                variants={processCardVariants}
                className="flex flex-col items-center text-center group relative"
              >
                {/* Horizontal Connector Arrow with synchronized infinite front animation */}
                {(hasMobileNeighbour || hasDesktopNeighbour) && (
                  <motion.svg
                    className={`${arrowVisibility} absolute top-1/3 -translate-y-1/2 -right-3 md:-right-2 lg:-right-5 w-6 md:w-8 lg:w-16 h-40 origin-left`}
                    viewBox="0 0 70 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Animated Group: Moves both the horizontal stick and right tick together */}
                    <motion.g
                      animate={{
                        x: [0, 6, 0], // Entire arrow group shifts forward and back cleanly
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                    >
                      {/* Connector Line Stem */}
                      <motion.line
                        x1="5"
                        y1="15"
                        x2="52"
                        y2="15"
                        stroke="#B65233"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                          delay: idx * 0.1,
                        }}
                      />
                      {/* Arrowhead Pointer Tick */}
                      <motion.polyline
                        points="45,10 55,15 45,20"
                        stroke="#B65233"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 + 0.3 }}
                      />
                    </motion.g>
                  </motion.svg>
                )}

                {/* Process Image Container */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 flex-shrink-0">
                  <motion.img
                    whileHover={{ y: -8, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 250, damping: 18 }}
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-contain object-center"
                  />
                  {/* P Logo */}
                </div>

                {/* Step Number */}
                <span className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-[#EDD9C5] text-[#774F29] border border-[#D4B5A0] text-[12px] md:text-[13px] font-bold font-albert rounded-full mb-2 tracking-wide flex-shrink-0">
                  {step.num}
                </span>

                {/* Step Title */}
                <h4 className="font-albert text-xs md:text-sm font-normal text-[#221F20] max-w-[140px] leading-tight">
                  {step.title}
                </h4>
              </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= SECTION 3: 9-STEP QUALITY ASSESSMENT MATRIX ================= */}
      <section
      ref={qaMatrixSectionRef}
      className="w-full bg-[#F7F7F7] py-16 md:py-24 px-4 sm:px-6 border-t border-b border-gray-100 overflow-hidden select-none"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto text-center mb-12 md:mb-16">
        <span className="eyebrow-2 text-[#C43A26] font-albert tracking-[0.3em] uppercase block mb-3">
          OUR POST MANUFACTURING PROCEDURE
        </span>
        <h2 className="h2 text-[#272727] tracking-tight">
          9-Step Quality Assurance Process
        </h2>
      </div>

      {/* Structural Inner Wrapper Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side Machinery Image Frame */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20,
            delay: 0.1,
          }}
          className="lg:col-span-4 rounded-xl overflow-hidden shadow-md bg-gray-200 border border-gray-300/50 h-auto min-h-[320px] sm:min-h-[420px] will-change-transform"
        >
          <img
            src={QAimg}
            alt="Quality checking unit machinery"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </motion.div>

        {/* 
          Right Side Matrix Grid Container 
          FIX: Responsively scales columns from 1 -> 2 -> 3 to prevent extreme text distortion on mobile.
        */}
        <motion.div
          variants={matrixContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-[#C68344] rounded-xl overflow-hidden bg-white shadow-lg relative z-10"
        >
          {qaMetrics.map((metric, idx) => {
            // Precise grid coordinate computation logic for fluid layout rendering lines
            const totalItems = qaMetrics.length;
            
            return (
              <motion.div
                key={metric.id}
                variants={matrixCardVariants}
                className={`p-6 flex flex-col items-center justify-center text-center min-h-[130px] sm:min-h-[140px] bg-white transition-colors duration-300 hover:bg-[#FFF9F5] will-change-transform group relative
                  
                  /* Mobile-first Stack Borders (Single Column Rules) */
                  border-b border-[#EDD9C5] last:border-b-0
                  
                  /* Tablet Viewport Boundaries (2-Column Architecture Rules) */
                  sm:border-b sm:border-r-[#EDD9C5]
                  ${idx % 2 === 1 ? "sm:border-r-0" : "sm:border-r"}
                  ${idx >= totalItems - 2 ? "sm:border-b-0" : ""}
                  ${totalItems % 2 !== 0 && idx === totalItems - 2 ? "sm:border-b" : ""}
                  
                  /* Desktop Viewport Boundaries (Exact 3x3 Matrix Architecture Rules) */
                  lg:border-b lg:border-r-[#EDD9C5]
                  ${idx % 3 === 2 ? "lg:border-r-0" : "lg:border-r"}
                  ${idx >= 6 ? "lg:border-b-0" : "lg:border-b"}
                `}
              >
                {/* ID Token Wrapper Element */}
                <span className="text-[#C43A26] font-albert text-base font-semibold tracking-wider mb-2 block transition-transform duration-300 group-hover:scale-105">
                  {metric.id}
                </span>
                
                {/* Description Wording Block centered fully inside text frames */}
                <p className="font-albert text-[13px] text-[#272727] font-normal leading-relaxed max-w-[240px] opacity-90 group-hover:opacity-100 transition-opacity">
                  {metric.title}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>

      {/* ================= SECTION 4: COMPLIANCE LOGOS GRID ================= */}
      <Compliance />

      {/* ================= SECTION 5: TESTING & INSPECTION CAROUSEL ================= */}
        <section className="w-full bg-white py-24 px-4 sm:px-6 md:px-16 relative overflow-hidden select-none">
        <div className="max-w-[1360px] mx-auto relative">
          <div className="text-center mb-16">
            <span className="eyebrow-2 text-[#C43A26] font-albert tracking-[0.3em] uppercase block mb-3">
              FACILITIES
            </span>
            <h2 className="h2 text-[#272727] tracking-tight">
              Testing & Inspection
            </h2>
          </div>

          <div ref={trackRef} className="relative w-full overflow-visible mb-16">
            <motion.div
              drag="x"
              dragConstraints={{ left: minDragX, right: maxDragX }}
              dragElastic={0.2}
              animate={{ x: centerOffset - (currentIndex * (cardWidth + gap)) }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="flex will-change-transform cursor-grab active:cursor-grabbing select-none"
              style={{ gap: `${gap}px` }}
            >
              {items.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between transition-all duration-300 min-h-[480px] sm:min-h-[504px] pointer-events-auto shrink-0"
                  style={{ width: `${cardWidth}px` }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                   {/* ... [CARD CONTENT] ... */}
                   <div className="bg-[#18234D] w-full aspect-[10/9] p-6 sm:p-8 md:p-12 flex items-center justify-center relative rounded-t-2xl overflow-hidden"
                        style={{ backgroundImage: `url(${testingAndInspectionBG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                        <div className={`absolute inset-0 bg-[#18234D]/95 transition-opacity ${hoveredIndex === idx ? "opacity-0" : "opacity-100"}`} />
                        <img src={grid} alt="grid" className={`absolute inset-0 w-full h-full object-cover mix-blend-screen ${hoveredIndex === idx ? "opacity-0" : "opacity-70"}`} />
                        <div className={`absolute inset-0 bg-white transition-opacity ${hoveredIndex === idx ? "opacity-100" : "opacity-0"}`} />
                        <div className={`absolute inset-0 z-10 flex items-center justify-center ${hoveredIndex === idx ? "p-0" : "p-6 sm:p-8 md:p-12"}`}>
                           <img src={hoveredIndex === idx ? card.img2 : card.img} alt={card.title} className={`w-full h-full object-cover ${hoveredIndex === idx ? "scale-100" : "scale-[0.96]"}`} />
                        </div>
                   </div>
                   <div className="p-6 md:p-8 bg-white flex items-center justify-center text-center min-h-[110px]">
                     <h4 className="font-albert text-[13px] md:text-[13.5px] text-[#272727] font-medium leading-relaxed max-w-[260px]">{card.title}</h4>
                   </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Controls Footer */}
          <div className="w-full relative flex flex-col md:flex-row items-center justify-center min-h-[48px] gap-4">
            <p className="font-albert text-[13px] text-[#707A94] text-center md:absolute md:left-1/2 md:-translate-x-1/2 max-w-[90%]">
              Disclaimer: Select tests are conducted through NABL-approved third-party laboratories, as required.
            </p>
            <div className="flex gap-3 md:ml-auto self-center md:self-auto">
              <button onClick={handlePrev} disabled={currentIndex === 0} className="w-11 h-11 rounded-full border border-slate-400 text-slate-700 disabled:opacity-30 flex items-center justify-center hover:bg-slate-50 transition-colors">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              </button>
              <button onClick={handleNext} disabled={currentIndex >= items.length - 1} className="w-11 h-11 rounded-full border border-slate-400 text-slate-700 disabled:opacity-30 flex items-center justify-center hover:bg-slate-50 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QualityAndAssurance;
