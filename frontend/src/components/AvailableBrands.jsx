import availableBrand1 from "../assets/products/sct/availableBrand1.png";
import availableBrand2 from "../assets/about/parasmaniabt2.png";

/**
 * Shared "Available Brands" band used across every product page
 * (Straight Copper Tube, Pancake Coil, Copper Fittings).
 */
export default function AvailableBrands({ description }) {
    const defaultDescription =
        "PTP K-Series is our established, project-preferred HVAC line, with particular strength in VRF/VRV applications, broad consultant approvals, institutional acceptance, and a long-standing project track record. PARASMANI represents our full product range across HVAC/R, medical gas, plumbing, and industrial applications, manufactured under the same controlled production standards.";
    return (
        <section className="bg-[#F6ECE3] border-y border-gray-100 py-12 px-4 sm:px-6 md:px-16">
            <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-10">
                {/* Left Column: Brand Badges Wrap Container */}
                <div className="w-full lg:w-1/2">
                    <span className="eyebrow-2 text-[#C43A26] block mb-4 text-center sm:text-left ">
                        Available Brands
                    </span>

                    {/*
             Flex Matrix: Stacked on mobile screens, clean side-by-side row architecture on matching breakpoints.
             Cards grow smoothly matching view limits without breaking raw viewport bounds.
           */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center sm:justify-start">
                        {/* Brand Card 1 */}
                        <div className="h-[100px] md:h-[116px] w-full sm:w-[203px] max-w-[280px] sm:max-w-none bg-white px-4 py-4 hover:border hover:border-[#C68344] rounded-lg flex items-center justify-cen
ter shrink-0">
                            <img
                                src={availableBrand1}
                                alt="Paramount Logo"
                                className="h-full w-full object-contain"
                            />
                        </div>

                        {/* Brand Card 2 */}
                        <div className="h-[100px] md:h-[116px] w-full sm:w-[203px] max-w-[280px] sm:max-w-none bg-white px-4 py-4 hover:border hover:border-[#C68344] rounded-lg flex items-center justify-center shrink-0">
                            <img
                                src={availableBrand2}
                                alt="Pip & Co Logo"
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Narrative Copy Frame */}
                <div className="w-full lg:w-[540px]  lg:border-t-0 pt-6 lg:pt-0 lg:pl-6 text-center sm:text-left">
                    <p className="font-albert text-[14px] text-gray-600 leading-relaxed">
                        {description || defaultDescription}
                    </p>
                </div>
            </div>
        </section>
    );
}
