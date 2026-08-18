import { useEffect, useRef, useState } from 'react';
export default function ComplianceSection({ complianceData = [] }) {

    const [isIntersected, setIsIntersected] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersected(true);
                } else {
                    setIsIntersected(false);
                }
            },
            { threshold: 0.15 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="w-full bg-[#FFFFFF] pt-10 pb-14 px-6 md:px-12 lg:px-16 select-none font-albert">

            {/* Header Block */}
            <div className="max-w-7xl mx-auto text-center mb-14">
                <span className="eyebrow-2 text-[#C43A26] font-albert tracking-[0.3em] uppercase block mb-4">
                    COMPLIANCE
                </span>
                <h2 className="h2 text-[#272727] tracking-tight leading-tight">
                    Built to Every Major Standard
                </h2>
            </div>

            {/* Grid Canvas */}
            <div
                ref={containerRef}
                className="max-w-[1320px] mx-auto flex flex-wrap justify-center gap-x-5 gap-y-6"
            >
                {complianceData.map((item, index) => (
                    <div
                        key={index}
                        /* Widths mirror the old 1/2/4-column grid; flex-wrap centres whatever is left on the last row */
                        className="h-[116px] w-full sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] [perspective:1000px] group cursor-pointer"
                        style={{ transitionDelay: `${index * 60}ms` }}
                    >
                        {/* 3D Chassis: Controls dynamic multi-state flip mechanics via state and hover classes */}
                        <div
                            className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ${isIntersected
                                ? '[transform:rotateX(180deg)] group-hover:[transform:rotateX(360deg)]'
                                : '[transform:rotateX(0deg)] group-hover:[transform:rotateX(180deg)]'
                                }`}
                        >

                            {/* FRONT SIDE: Brand Logo Container Layer */}
                            <div className="absolute inset-0 bg-[#5E677F] rounded-[14px] flex items-center justify-center p-6 [backface-visibility:hidden]">
                                <img
                                    src={item.logo}
                                    alt={item.name}
                                    className="w-full h-full max-w-[110px] object-contain filter brightness-0 invert opacity-95"
                                />
                            </div>

                            {/* BACK SIDE: Specifications / Values Text Container Layer */}
                            <div className="absolute inset-0 bg-white border border-[#E2E6EC] rounded-[14px] flex flex-col justify-center items-center px-4 shadow-sm [backface-visibility:hidden] [transform:rotateX(180deg)]">
                                <h3 className="text-[#646C88] font-albert font-medium text-[16px] tracking-wide mb-1.5">
                                    {item.title}
                                </h3>
                                <p className="text-[#646C88] text-[11px] font-albert font-medium tracking-normal leading-normal max-w-[240px] text-center">
                                    {item.subtitle}
                                </p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
