import heroBg from "../../assets/tools/unitConverter/heroBg.png";

/**
 * Hero for the Unit Converter — same design and typography as the other tool
 * heroes (Pressure/Weight HeaderBanner: image cover, left-aligned .h2 / .p2),
 * using this tool's own background image and copy.
 */
const UnitConverterBanner = () => {
    return (
        <>
            {/* Mobile — stacked, image on top */}
            <div className="md:hidden">
                <div className="relative w-full h-[190px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FBFAF8] via-[#FBFAF8]/10 to-transparent z-10" />
                    <img src={heroBg} alt="" aria-hidden="true" className="w-full h-full object-cover object-center" />
                </div>
                <div className="px-5 pt-5 pb-8 text-center">
                    <span className="eyebrow-1 block font-albert uppercase tracking-[0.15em] text-[#C43A26]  mb-2">
                        Parasmani Utility Tools
                    </span>
                    <h1 className="h1 text-[#18234D] tracking-tight mb-4">
                        Every unit, instantly.
                    </h1>
                    <p className="p1 text-[#19234D] font-light leading-5 max-w-[390px] mx-auto opacity-95 font-albert">
                        Length, coils, pipe sizing, capacity, pressure and weight — all in
                        one place.
                    </p>
                </div>
            </div>

            {/* Desktop */}
            <section
                className="relative w-full hidden md:flex md:h-[320px] items-center overflow-hidden"
                style={{
                    backgroundImage: `url(${heroBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center right",
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to right, rgba(245,244,241,0.96) 30%, rgba(245,244,241,0.6) 55%, transparent 85%)",
                    }}
                />

                <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 relative z-10">
                    <div className="max-w-xl text-left">
                    <span className="eyebrow-1 block font-albert uppercase tracking-[0.15em] text-[#C43A26]  mb-2">
                        Parasmani Utility Tools
                    </span>
                        <h1 className="h1 text-[#18234D] tracking-tight mb-4">
                            Every unit, instantly.
                        </h1>
                        <p className="p1 text-[#19234D] font-light leading-5 max-w-[340px] md:max-w-[480px] opacity-95 font-albert">
                            Length, coils, pipe sizing, capacity, pressure and weight — all in
                            one place.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default UnitConverterBanner;
