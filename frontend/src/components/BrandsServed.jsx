import metroLogo from "../assets/brands/metro.png";
import appleLogo from "../assets/brands/apple.png";
import phonepeLogo from "../assets/brands/phonepe.png";
import narayanaLogo from "../assets/brands/narayana.png";
import adaniLogo from "../assets/brands/adani.png";
import metroCashLogo from "../assets/brands/metroCash.png";
import rahejaLogo from "../assets/brands/raheja.png";
import dellLogo from "../assets/brands/dell.png";
import metroCash from "../assets/brands/metroCash.png"
import narayna from "../assets/brands/narayana.png"

import starbucks from "../assets/brands/starbucks.png"
import deloitte from "../assets/brands/deloitte.png"
import decathelon from "../assets/brands/decathelon.png"
import worldtradercenter from "../assets/brands/worldtradercenter.png"
import prestige from "../assets/brands/prestige.png"
import wipro from "../assets/brands/wipro.png"
import qualcom from "../assets/brands/qualcom.png"
import amazon from "../assets/brands/amazon.png"
import ongc from "../assets/brands/ongc.png"
import hindustan from "../assets/brands/hindustan.png"
import ibm from "../assets/brands/ibm.png"
import indianrailways from "../assets/brands/indianrailways.png"
import hydrabad from "../assets/brands/hydrabad.png"
import mahindra from "../assets/brands/mahindra.png"
import infosys from "../assets/brands/infosys.png"
import mercedes from "../assets/brands/mercedes.png"
import hp from "../assets/brands/hp.png"
import ccd from "../assets/brands/ccd.png"
import mcd from "../assets/brands/mcd.png"
import gsk from "../assets/brands/gsk.png"
import flipkart from "../assets/brands/flipkart.png"
import cocacola from "../assets/brands/cocacola.png"
import drReddy from "../assets/brands/dr-reddy.png"
import itc from "../assets/brands/itc.png"
import lt from "../assets/brands/lt.png"
import himalaya from "../assets/brands/himalaya.png"

const BrandsServed = () => {
  const logos = [
    metroLogo,
    appleLogo,
    phonepeLogo,
    narayanaLogo,
    adaniLogo,
    metroCashLogo,
    rahejaLogo,
    dellLogo,
    metroCash,
    narayna,
    starbucks,
    deloitte,
    decathelon,
    worldtradercenter,
    prestige,
    wipro,
    qualcom,
    amazon,
    ongc,
    hindustan,
    ibm,
    indianrailways,
    hydrabad,
    mahindra,
    infosys,
    mercedes,
    hp,
    ccd,
    mcd,
    gsk,
    flipkart,
    cocacola,
    drReddy,
    itc,
    lt,
    himalaya
  ];

  // Production Tip: If the screen is ultra-wide, 2 sets might show a gap.
  // For safety, 3 sets ensure total coverage.
  const scrollLogos = [...logos, ...logos, ...logos];

  return (
    <section className="bg-[#F7F7F7] mt-20 py-[40px] overflow-hidden">
      <div className="max-w-[1269px] mx-auto text-center mb-[60px]">
        <h2 className="h2 text-[#141C3A] tracking-tight">
          Brands We’ve Served
        </h2>
      </div>

      {/* Added 'pause-on-hover' class here.
         Adding 'will-change-transform' tells the browser to use the GPU.
      */}
      <div className="relative w-full pause-on-hover group">
        {/* Gradients */}
        <div className="absolute left-0 top-0 w-[200px] h-full bg-linear-to-r from-[#F7F7F7] via-[#F7F7F7]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-[200px] h-full bg-linear-to-l from-[#F7F7F7] via-[#F7F7F7]/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track - Adjusted from 90s to 140s for a calmer, slower drift */}
        <div className="flex w-fit animate-infinite-scroll [animation-duration:140s] items-center gap-[60px] will-change-transform">
          {scrollLogos.map((logo, index) => (
            <div
              key={index}
              className="w-[180px] shrink-0 flex items-center justify-center opacity-100 transition-all duration-500 cursor-pointer"
            >
              <img
                src={logo}
                alt="Partner Brand Logo"
                loading="lazy"
                className="max-w-full max-h-[65px] object-contain select-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto text-center mt-[80px] px-6">
        <p className="font-albert text-[14px] text-[#646C88] leading-relaxed opacity-85 ">
          Disclaimer: Products supplied directly or indirectly through our
          company, vendors, or channel partners. Logos belong to their
          respective owners.
        </p>
      </div>
    </section>
  );
};

export default BrandsServed;