import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Replace these with your actual image paths
import blueprintImg from "../../../assets/industries/medicalGas/heroImg.png"; 
import realisticImg from "../../../assets/industries/medicalGas/hero2Img.png"; 
import { useNavigate } from "react-router-dom";

export default function HVACSection() {
  const containerRef = useRef(null);

  // Tracks the scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth interpolations based on scroll progress (0 = Blueprint, 0.4+ = Realistic)
  const backgroundColor = useTransform(scrollYProgress, [0, 0.15], ["#01142F", "#FFFFFF"]);
  const textColor = useTransform(scrollYProgress, [0, 0.15], ["#FFFFFF", "#1C1C1C"]);
  
  // Button 1 (Enquire Now) interpolations
  const btn1Bg = useTransform(scrollYProgress, [0, 0.15], ["transparent", "transparent"]);
  const btn1Border = useTransform(scrollYProgress, [0, 0.15], ["1px solid rgba(255, 255, 255, 0.3)", "1px solid #18234D"]);
  const btn1Text = useTransform(scrollYProgress, [0, 0.15], ["#B7BBC8", "#18234D"]);

  // Button 2 (Download Brochure) interpolations
  const btn2Bg = useTransform(scrollYProgress, [0, 0.15], ["#FFFFFF", "#18234D"]);
  const btn2Text = useTransform(scrollYProgress, [0, 0.15], ["#18234D", "#FFFFFF"]);

  // Image Cross-fade interpolations
  const blueprintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const realisticOpacity = useTransform(scrollYProgress, [0.03, 0.15], [0, 1]);
  const navigate = useNavigate();

  return (
    <motion.section
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative w-full min-h-screen flex items-center py-20 overflow-hidden transition-colors duration-150 ease-out"
    >
      <div className="w-full max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24 grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Content Side */}
        <div className="md:col-span-6 lg:col-span-5 space-y-5 z-10">
          <span 
            className="text-[13px] font-extralight tracking-[0.18em] uppercase block font-albert"
            style={{ color: "#C68344" }}
          >
Behind every hospital. Inside every gas line.
          </span>
          
          <motion.h1 
            style={{ color: textColor }}
            className="text-[32px] font-extralight tracking-tight leading-[1.1] font-obviously"
          >
Medical Gas 
          </motion.h1>
          
          <motion.p 
            style={{ color: textColor }}
            className="text-[17px] max-w-[460px] leading-[1.6] font-albert font-light"
          >
Parasmani MGPS copper tubes are manufactured to BS EN 13348 — the dedicated standard for medical gas pipeline systems. Piped oxygen, nitrous oxide, medical air, and vacuum. Supplied clean, capped, and traceable to hospitals and surgical centres across India.
          </motion.p>
          
          {/* BUTTON CONTAINER - Adjusted layout to safely wrap single-line layout strings */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 font-albert text-[15px] font-medium w-full max-w-[420px] sm:max-w-none">
            {/* Button: Enquire Now */}
            <motion.button
              onClick={() => navigate("/contact")}
              style={{ background: btn1Bg, border: btn1Border, color: btn1Text }}
              className="b2 flex items-center justify-center h-[44px] px-6 rounded-full shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-[280px] whitespace-nowrap"
            >
              Enquire Now
            </motion.button>

            {/* Button: Download Brochure */}
            <motion.button 
              style={{ background: btn2Bg, color: btn2Text }}
              onClick={() => navigate("/downloads?category=Brochures")}
              className="b2 flex items-center justify-center h-[44px] px-6 rounded-full shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-[280px] whitespace-nowrap"
            >
Download Medical Brochure
            </motion.button>
          </div>
        </div>

        {/* Right Interactive Image Side */}
        <div className="md:col-span-6 lg:col-span-7 relative w-full aspect-[3/2] flex justify-center items-center">
          {/* Blueprint Render (Visible initially) */}
          <motion.img
            src={blueprintImg}
            alt="HVAC Blueprint Render"
            style={{ opacity: blueprintOpacity }}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none will-change-transform scale-135 mt-10 md:mt-0 md:scale-100"
          />

          {/* Realistic Render (Fades in on scroll) */}
          <motion.img
            src={realisticImg}
            alt="HVAC Realistic Render"
            style={{ opacity: realisticOpacity }}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none will-change-transform scale-135 mt-10 md:mt-0 md:scale-100"
          />
        </div>

      </div>
    </motion.section>
  );
}