import React from "react";
import { useRef } from "react";
import bottomLogo from "../../../assets/industries/medicalGas/footerImg.png";
import bottomLogoMobile from "../../../assets/industries/medicalGas/footerImg2.png";

import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HouseHoldFooter() {
    const containerRef = useRef(null);

    // Tracks the scroll progress of this specific section
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

    const navigate = useNavigate();

    return (
        <section
            ref={containerRef}
            className="relative w-full bg-[#ffffff] overflow-hidden flex flex-col md:relative md:flex-row md:items-center md:min-h-[540px] py-12 md:py-0"
        >
            {/* BACKGROUND IMAGE LAYER

               Both layers use `bg-cover`, never `bg-[size:100%_100%]`: these are
               ~3:1 landscape plates and the section is portrait on phones, so a
               100%/100% stretch squeezed the art to roughly half its width and
               read as blur. Cover crops instead of distorting.

               The split is at `md`, not `lg` -- the portrait 4:5 cut only suits
               a phone-shaped box; on a tablet it had to be cropped so hard that
               the subject fell out of frame. And `inset-0` alone, with no
               `w-[108vw] -left-[4vw]`, is what keeps the plate centred on the
               section rather than offset 4vw to the left. */}
            <div
                className="absolute inset-0 z-0 hidden md:block pointer-events-none select-none bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${bottomLogo})` }}
                aria-hidden="true"
            />

            <div
                className="absolute inset-0 z-0 md:hidden pointer-events-none select-none bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${bottomLogoMobile})` }}
                aria-hidden="true"
            />

            {/* MOBILE LEGIBILITY SCRIM. The desktop plate carries its own empty
               left third for the copy; the 4:5 mobile cut does not, so at phone
               widths the pipework runs straight behind the heading. The old
               `bg-[size:100%_100%]` stretch washed the art out enough to hide
               that -- this does the same thing on purpose, and only where the
               text actually sits, so the copper still reads at the bottom. */}
            <div
                className="absolute inset-0 z-0 md:hidden pointer-events-none select-none bg-gradient-to-b from-white/95 from-45% via-white/70 via-78% to-transparent"
                aria-hidden="true"
            />

            {/* 1. Content block - Adjusted with responsive constraints and a mobile white overlay shield */}
            <div className="relative z-10 max-w-[1440px] mx-auto w-full px-4 sm:px-12 lg:px-24 flex justify-center">
                <div className="w-full max-w-[740px]">
                    {/* 
            MOBILE TEXT SHIELD: 
            On mobile, this adds a solid white background with slight opacity (bg-white/90) 
            to lift the text off the busy AC unit image detail. 
            On tablet/desktop (md:), it turns completely invisible (md:bg-transparent md:p-0 md:shadow-none).
          */}
                    <div className="flex flex-col items-center text-center mx-auto w-full px-5 py-8 md:p-0 md:bg-transparent md:backdrop-blur-none rounded-2xl md:border-none shadow-black/5 md:shadow-none">
                        <span className="eyebrow-2 tracking-[0.3em] uppercase block font-albert text-[#C43A26] mb-1 mt-2">
                            Get Started
                        </span>

                        <h2 className="h2 tracking-tight text-[#272727] leading-[1.2] mb-4 max-w-[90%] md:max-w-none">
                            Parasmani MGPS — the right copper for your next hospital project.
                        </h2>

                        <p className="p2 font-light text-[#454545] leading-[1.6] md:leading-[1.65] font-albert mb-8 max-w-[290px] sm:max-w-[480px] md:max-w-[580px]">
                            Download the Parasmani MGPS catalogue or speak with our team for
                            project-specific sizing, test certificates and quantities.
                        </p>

                        {/* BUTTON CONTAINER - Standardized structure with dynamic mobile full-width scaling */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-albert w-full max-w-[420px] sm:max-w-none">
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
                                Download Medical Brochure
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
