import React from 'react';
import heroImg from "../../assets/tools/pressureCalHero.jpeg";
import heroMobileImg from '../../assets/tools/pressureCalHero.png'
/**
 * Decorative top banner. The reference design shows a photographic strip of
 * a pressure gauge and coiled copper pipe. We use a CSS gradient backdrop
 * with an inline SVG illustration so the banner needs no external image
 * assets while keeping the same height/position as the source design.
 */
const HeaderBanner = () => {
    return (
        <>
            {/* Mobile — stacked, image on top */}
            <div className="md:hidden">
                <div className="relative w-full h-[190px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FBFAF8] via-[#FBFAF8]/10 to-transparent z-10" />
                    <img src={heroMobileImg} alt="" aria-hidden="true" className="w-full h-full object-cover object-center" />
                </div>
                <div className="px-5 pt-5 pb-8 text-center">

                    <span className="eyebrow-1 block font-albert uppercase tracking-[0.15em] text-[#C43A26]  mb-2">
                        Parasmani Utility Tools
                    </span>
                    <h1 className="h1 text-[#18234D] tracking-tight mb-4">
                        Copper Tube Pressure Calculator.
                    </h1>
                    <p className="p1 text-[#19234D] font-light leading-5 max-w-[390px] mx-auto opacity-95 font-albert">
                        Compute burst pressure and maximum working pressure for any copper tube — enter outside diameter, wall thickness and temper.
                    </p>
                </div>
            </div>

            {/* Desktop */}
            <section
                className="relative w-full hidden md:flex md:h-[320px] items-center overflow-hidden"
                style={{
                    backgroundImage: `url('${heroImg}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 relative z-10">
                    <div className="max-w-xl text-left">

                        <span className="eyebrow-1 block font-albert uppercase tracking-[0.15em] text-[#C43A26]  mb-2">
                            Parasmani Utility Tools
                        </span>
                        <h1 className="h1 text-[#18234D] tracking-tight mb-4">
                            Copper Tube <br /> Pressure Calculator.
                        </h1>
                        <p className="p1 text-[#19234D] font-light leading-5 max-w-[340px] md:max-w-[480px] opacity-95 font-albert">
                            Compute burst pressure and maximum working pressure for any copper tube — enter outside diameter, wall thickness and temper.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeaderBanner;
