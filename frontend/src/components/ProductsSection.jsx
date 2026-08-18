import React, { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import straightTubes from "../assets/homePage/straight-tubes.png";
import copperPipes2 from "../assets/homePage/SCT-BLUE-Photoroom.png";
// import copperPipes2 from "../assets/homePage/sct-outline-3.png";
import pancakeCoils from "../assets/homePage/pancake-coils.png";
import copperFittings from "../assets/homePage/copper-fittings.png";
import copperFittings2 from "../assets/homePage/CF-BLUE-Photoroom.png";
import copperCoil2 from "../assets/homePage/PC-BLUE-Photoroom.png";
import { useNavigate } from "react-router-dom";

const ProductsSection = () => {
  const nav = useNavigate();
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const navigate = useNavigate();

  return (
    <section
      id="products"
      className="bg-white pt-[50px] pb-0 px-6 lg:px-0 select-none mt-15"
    >
      <div className="max-w-[1166px] mx-auto">
        {/* Header Section */}
        <div className="mb-[48px] flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <div className="w-full max-w-[545px]">
            <span className="eyebrow-2 mt-4 mb-[14px] block font-albert uppercase leading-none tracking-[0.3em] text-[#C43A26]">
              Engineered for Absolute Reliability
            </span>
            <h2 className="h2 leading-[1.1] tracking-normal text-[#272727]">
              Our Products
            </h2>
          </div>

          <button
            onClick={() => nav("/straight-copper-tubes")}
            className="b2 group flex h-[46px] w-fit shrink-0 items-center gap-6 rounded-full bg-[#19234D] px-[34px] text-white transition-all hover:bg-[#1E2749] sm:mt-[18px]"
          >
            <span className="font-albert b2 font-normal leading-none">
              Know More
            </span>
            <GoArrowRight
              size={22}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-[40px]">
          {/* Card 1: Straight Copper Tubes */}
          <div
            onClick={() => navigate("/straight-copper-tubes")}
            className="relative border border-[#C68345] rounded-[20px] pt-[0px] pb-[18px] px-[0px] flex flex-col items-center justify-between h-[450px] transition-all duration-500 ease-in-out cursor-pointer overflow-hidden bg-white hover:bg-[#1A274E] hover:border-transparent hover:shadow-[0_20px_50px_rgba(24,37,77,0.25)]"
            onMouseEnter={() => setHoveredIdx(0)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div className="relative z-10 w-full flex-1 flex items-center justify-center mb-6 overflow-hidden">
              <img
                src={straightTubes}
                alt="Straight Copper Tubes"
                className={`w-full h-full max-h-[440px] object-contain absolute transition-all duration-400 ease-in-out ${
                  hoveredIdx === 0
                    ? "opacity-0 scale-95"
                    : "opacity-100 scale-100"
                } ${hoveredIdx === 0 ? "mix-blend-multiply" : ""}`}
              />
              <img
                src={copperPipes2}
                alt="Straight Copper Tubes Alternate"
                className={`w-[120%] h-[170%] max-h-[440px] object-contain absolute transition-all duration-400 ease-in-out pt-20 ${
                  hoveredIdx === 0
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                } ${hoveredIdx === 0 ? "mix-blend-multiply" : ""}`}
              />
            </div>
            <div className="relative z-10 w-full min-h-[75px] flex flex-col items-center justify-center overflow-hidden">
              <h3
                className={`absolute font-albert text-[#19234D] text-[16px] font-[240] text-center tracking-wide transition-all duration-500 ease-in-out transform ${hoveredIdx === 0 ? "-translate-y-12 opacity-0" : "translate-y-0 opacity-100"}`}
              >
                Straight Copper Tubes
              </h3>
              <p
                className={`absolute font-albert text-white text-[12px] font-light text-center leading-relaxed px-2 transition-all duration-500 ease-in-out transform ${hoveredIdx === 0 ? "translate-y-0 opacity-90" : "translate-y-12 opacity-0"}`}
              >
                Seamless, high-precision copper tubes drawn to tight tolerances
                for HVAC/R, Medical Gas and Industrial applications.
              </p>
            </div>
          </div>

          {/* Card 2: Pancake Copper Coils */}
          <div
            onClick={() => navigate("/pancake-copper-coil")}
            className="relative border border-[#C68345] rounded-[20px] pt-[0px] pb-[18px] px-[0px] flex flex-col items-center justify-between h-[450px] transition-all duration-500 ease-in-out cursor-pointer overflow-hidden bg-white hover:bg-[#1B264F] hover:border-transparent hover:shadow-[0_20px_50px_rgba(24,37,77,0.25)]"
            onMouseEnter={() => setHoveredIdx(1)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div className="relative z-10 w-full flex-1 flex items-center justify-center mb-6 overflow-hidden">
              <img
                src={pancakeCoils}
                alt="Pancake Copper Coils"
                className={`w-full h-full max-h-[440px] object-contain absolute transition-all duration-400 ease-in-out ${
                  hoveredIdx === 1
                    ? "opacity-0 scale-95"
                    : "opacity-100 scale-100"
                } ${hoveredIdx === 1 ? "mix-blend-multiply" : ""}`}
              />
              <img
                src={copperCoil2}
                alt="Pancake Copper Coils Alternate"
                className={`w-full h-full mt-10 max-h-[640px] object-contain absolute transition-all duration-400 ease-in-out ${
                  hoveredIdx === 1
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                } ${hoveredIdx === 1 ? "mix-blend-multiply" : ""}`}
              />
            </div>
            <div className="relative z-10 w-full min-h-[75px] flex flex-col items-center justify-center overflow-hidden">
              <h3
                className={`absolute font-albert text-[#19234D] text-[16px] font-[240] text-center tracking-wide transition-all duration-500 ease-in-out transform ${hoveredIdx === 1 ? "-translate-y-12 opacity-0" : "translate-y-0 opacity-100"}`}
              >
                Pancake Copper Coils
              </h3>
              <p
                className={`absolute font-albert text-white text-[12px] font-light text-center leading-relaxed px-2 transition-all duration-500 ease-in-out transform ${hoveredIdx === 1 ? "translate-y-0 opacity-90" : "translate-y-12 opacity-0"}`}
              >
                Soft annealed coils engineered for modern HVAC and refrigeration
                systems.
              </p>
            </div>
          </div>

          {/* Card 3: Copper Fittings */}
          <div
            onClick={() => navigate("/copper-fittings")}
            className="relative border border-[#C68345] rounded-[20px] pt-[0px] pb-[18px] px-[0px] flex flex-col items-center justify-between h-[450px] transition-all duration-500 ease-in-out cursor-pointer overflow-hidden bg-white hover:bg-[#17244D] hover:border-transparent hover:shadow-[0_20px_50px_rgba(24,37,77,0.25)]"
            onMouseEnter={() => setHoveredIdx(2)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div className="relative z-10 w-full flex-1 flex items-center justify-center mb-6 overflow-hidden">
              <img
                src={copperFittings}
                alt="Copper Fittings"
                className={`w-full h-full max-h-[440px] object-contain absolute transition-all duration-400 ease-in-out ${
                  hoveredIdx === 2
                    ? "opacity-0 scale-95"
                    : "opacity-100 scale-100"
                } ${hoveredIdx === 2 ? "mix-blend-multiply" : ""}`}
              />
              <img
                src={copperFittings2}
                alt="Copper Fittings Alternate"
                className={`w-full h-full max-h-[440px] object-contain absolute transition-all duration-400 ease-in-out ${
                  hoveredIdx === 2
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                } ${hoveredIdx === 2 ? "mix-blend-multiply" : ""}`}
              />
            </div>
            <div className="relative z-10 w-full min-h-[75px] flex flex-col items-center justify-center overflow-hidden">
              <h3
                className={`absolute font-albert text-[#19234D] text-[16px] font-[240] text-center tracking-wide transition-all duration-500 ease-in-out transform ${hoveredIdx === 2 ? "-translate-y-12 opacity-0" : "translate-y-0 opacity-100"}`}
              >
                Copper Fittings
              </h3>
              <p
                className={`absolute font-albert text-white text-[12px] font-light text-center leading-relaxed px-2 transition-all duration-500 ease-in-out transform ${hoveredIdx === 2 ? "translate-y-0 opacity-90" : "translate-y-12 opacity-0"}`}
              >
                Precision-crafted fittings for secure, leak proof joints in
                HVAC/R and plumbing installations.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <p className="font-albert text-[14px] text-[#272727] opacity-80 mb-[100px]">
          Copper tubes, coils and fittings built for the applications that
          matter.
        </p>

        {/* CTA Section */}
        <div className="mx-[calc(50%-50vw)] mt-[90px] bg-[#17234F] px-6 py-[70px] md:py-[100px]">
          <div className="mx-auto flex max-w-[1270px] flex-col items-center justify-between overflow-hidden rounded-[40px] bg-[#4D5A7E] px-6 py-[42px]  sm:px-10 md:rounded-[100px] md:px-[70px] lg:flex-row  lg:px-[90px] lg:py-[48px]">
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
      </div>
    </section>
  );
};

export default ProductsSection;
