import { motion } from "framer-motion";
import copperCoilLg from "../assets/homePage/copper_coil_lg.png";
import ShieldCheck from "../assets/homePage/iso.png";
import CalendarDays from "../assets/homePage/sheildCheck.png";
import Factory from "../assets/homePage/factory.png";
import Award from "../assets/homePage/bis.png";
import Pan from "../assets/homePage/pan.png";
import { useNavigate } from "react-router-dom";

const trustFeatures = [
  { icon: CalendarDays, text: "Since 1989" },
  { icon: Factory, text: "3600 MT+ Capacity" },
  { icon: ShieldCheck, text: "ISO Certified" },
  { icon: Award, text: "BIS Certified" },
  { icon: Pan, text: "Pan India & Export" },
];

const Hero = () => {
  const springTransition = {
    type: "spring",
    stiffness: 260,
    damping: 20,
  };

  const coilContainerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const coilHoverVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 0.96,
      transition: springTransition,
    },
  };

  const barHoverVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.05,
      y: -10,
      transition: springTransition,
    },
  };

  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-white px-4 pt-[25px] pb-[22px] text-center font-sans md:px-6 md:pt-[22px]">
      <div className="mx-auto max-w-[1440px]">
        {/* Text Section */}
        <div className="mx-auto flex w-full max-w-[864px] flex-col items-center">
          <p className="eyebrow-1 mb-2  font-albert uppercase tracking-[0.15em] text-[#C43A26]">
            {/* Copper Tubes Built on a Legacy of Precision */}
            BIS Certified • ISO 9001:2015
          </p>

          <h1 className="h1 mb-3 leading-[1.1] tracking-normal text-[#202020]">
            Tubes You Can Rely On
          </h1>

          {/* tightened on short viewports so the buttons stay above the fold */}
          <p className="p1 max-w-[720px] font-albert font-extralight leading-[1.5] text-[#272727] mt-5 [@media(max-height:720px)]:mt-3 [@media(max-height:720px)]:text-[15px] [@media(max-height:720px)]:leading-[1.4]">
            {/* Copper tubes manufactured to global standards, trusted by OEMs,
            contractors, and infrastructure developers across India and global
            markets. */}
            Parasmani manufactures seamless straight copper tubes, pancake copper coils, and copper fittings trusted by OEMs and contractors.
          </p>

          {/* Buttons */}
          <div className="mt-[26px] flex flex-wrap items-center justify-center gap-4 [@media(max-height:720px)]:mt-4">
            <button
              onClick={() => {
                const section = document.getElementById("products");

                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="b2 h-[38px] min-w-[148px] [@media(max-height:620px)]:min-w-[124px] [@media(max-height:620px)]:px-4 [@media(max-height:620px)]:text-[14px] rounded-full border border-[#14204A] bg-white px-7 font-medium text-[#14204A] transition-colors hover:bg-[#F7F4EF]"
            >
              View Products
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="b2 h-[38px] min-w-[148px] [@media(max-height:620px)]:min-w-[124px] [@media(max-height:620px)]:px-4 [@media(max-height:620px)]:text-[14px] rounded-full bg-[#14204A] px-7 font-medium text-white transition-colors hover:bg-[#1E2B5C]"
            >
              Enquire Now
            </button>
          </div>
        </div>

        {/* Interactive Image Section */}
       
      </div>

      {/* Floating Plus Button */}
      {/* <div className="group absolute right-[22px] bottom-[42px] z-20 hidden items-center gap-3 md:flex lg:right-[105px]">
        <div className="pointer-events-none translate-x-3 scale-95 rounded-full bg-white px-5 py-2.5 font-albert text-[12px] font-medium text-[#141C3A] opacity-0 shadow-[0_10px_30px_rgba(20,28,58,0.12)] transition-all duration-200 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100">
          Quick Access
        </div>

        <button
          type="button"
          aria-label="Quick Access"
          className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#C68345] text-[26px] font-light leading-none text-white shadow-[0_8px_20px_rgba(198,131,69,0.35)] transition-transform duration-200 group-hover:scale-110"
        >
          +
        </button>
      </div> */}
    </section>
  );
};

export default Hero;
