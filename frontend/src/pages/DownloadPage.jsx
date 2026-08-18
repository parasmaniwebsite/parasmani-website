import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiDownload, FiBookOpen, FiArrowUpRight } from "react-icons/fi";
import EnquiryModal from "../components/EnquiryModal";
import heroImage from "../assets/downloads/catalog-stack.png";

/* Vite emits each of these as a hashed asset URL. The `download` attribute on
   the row's anchor supplies the clean filename the visitor actually saves, so
   the hash never reaches their downloads folder. */
import productCatalogPdf from "../assets/downloads/brochures/Parasmani_Product_Catalog_2026.pdf";
import hvacrBrochurePdf from "../assets/downloads/brochures/Parasmani-HVAC-R-Brochure-2026.pdf";
import mgpsBrochurePdf from "../assets/downloads/brochures/Parasmani-MGPS-Brochure-2026.pdf";
import plumbingBrochurePdf from "../assets/downloads/brochures/Parasmani-Plumbing-Brochure-2026.pdf";
import fuelGasBrochurePdf from "../assets/downloads/brochures/Parasmani-Fuel-Gas-Brochure-2026.pdf";
import industrialBrochurePdf from "../assets/downloads/brochures/Parasmani-Industrial-Brochure-2026.pdf";
import hvacrTubesTdsPdf from "../assets/downloads/Spec-Sheets/Parasmani-HVAC-R-Copper-Tubes-TDS.pdf";
import ptpKSeriesTdsPdf from "../assets/downloads/Spec-Sheets/PTP-K-Series-HVAC-R-Copper-Tubes-TDS.pdf";
import mgpsTubesTdsPdf from "../assets/downloads/Spec-Sheets/Parasmani-MGPS-Copper-Tubes-TDS.pdf";
import packagingSpecsPdf from "../assets/downloads/deal-reference/Parasmani-Copper-Tube-Packaging-Specifications.pdf";
import mgpsPackagingSpecsPdf from "../assets/downloads/deal-reference/Parasmani-MGPS-Copper-Tube-Packaging-Specifications.pdf";
import genericWeightChartPdf from "../assets/downloads/deal-reference/Parasmani-Copper-Tube-Generic-Weight-Chart.pdf";
import vrfWeightChartPdf from "../assets/downloads/deal-reference/Parasmani-VRF-Copper-Tube-Weight-Chart.pdf";
import oemApprovalsPdf from "../assets/downloads/Approvals/Parasmani_OEM_Vendor_Approvals.pdf";
import projectApprovalsPdf from "../assets/downloads/Approvals/Parasmani_Project_Approvals.pdf";
import govtApprovalsPdf from "../assets/downloads/Approvals/Parasmani_Government_Approvals.pdf";
import supplierCodePdf from "../assets/downloads/Policies/Parasmani-Supplier-Code-of-Conduct.pdf";
import qualityPolicyPdf from "../assets/downloads/Policies/Parasmani-Quality-Policy.pdf";

const DownloadPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeFilter = searchParams.get("category") || "All";
    const [enquiryOpen, setEnquiryOpen] = useState(false);
    const setActiveFilter = (filterVal) => {
        if (filterVal === "All") {
            setSearchParams({});
        } else {
            setSearchParams({ category: filterVal });
        }
    };

    const categories = [
        "All",
        "Brochures",
        "Submittal",
        "Spec Sheets",
        "Technical Handbooks",
        "Dealer Reference",
        "Approvals",
        "Certifications",
        "Policies",
    ];

    /* An item is downloadable when it carries `file` (the bundled asset URL) and
       `filename` (what the visitor saves it as). `route` marks an in-app page
       rather than a file. An item with neither has no artwork yet — it stays
       listed but its action is disabled instead of pointing at a dead "#". */
    const downloadData = [
        {
            category: "Brochures",
            items: [
                {
                    title: "Parasmani-Product-Catalog-2026",
                    file: productCatalogPdf,
                    filename: "Parasmani-Product-Catalog-2026.pdf",
                },
                {
                    title: "Parasmani-HVAC-R-Brochure-2026 ",
                    file: hvacrBrochurePdf,
                    filename: "Parasmani-HVAC-R-Brochure-2026.pdf",
                },
                {
                    title: "Parasmani-Medical-Brochure-2026",
                    file: mgpsBrochurePdf,
                    filename: "Parasmani-MGPS-Brochure-2026.pdf",
                },
                {
                    title: "Parasmani-Plumbing-Brochure-2026 ",
                    file: plumbingBrochurePdf,
                    filename: "Parasmani-Plumbing-Brochure-2026.pdf",
                },
                {
                    title: "Parasmani-Fuel-Gas-Brochure-2026",
                    file: fuelGasBrochurePdf,
                    filename: "Parasmani-Fuel-Gas-Brochure-2026.pdf",
                },
                {
                    title: "Parasmani-Industrial-Brochure-2026",
                    file: industrialBrochurePdf,
                    filename: "Parasmani-Industrial-Brochure-2026.pdf",
                },
            ],
        },
        {
            category: "Submittal",
            items: [{ title: "Parasmani-HVAC-R-Submittal-2026" }],
            hasHardCopyRequest: true,
        },
        {
            category: "Spec Sheets",
            items: [
                {
                    title: "Parasmani-HVAC-R-Copper-Tube-Technical-Data-Sheet",
                    file: hvacrTubesTdsPdf,
                    filename: "Parasmani-HVAC-R-Copper-Tubes-TDS.pdf",
                },
                {
                    title: "PTP-K-Series-HVAC-R-Copper-Tube-Technical-Data-Sheet",
                    file: ptpKSeriesTdsPdf,
                    filename: "PTP-K-Series-HVAC-R-Copper-Tubes-TDS.pdf",
                },
                {
                    title: "Parasmani-Medical-Copper-Tube-Technical-Data-Sheet",
                    file: mgpsTubesTdsPdf,
                    filename: "Parasmani-MGPS-Copper-Tubes-TDS.pdf",
                },

            ],
        },
        {
            category: "Technical Handbooks",
            items: [
                { title: "Parasmani-Installation-Guidelines" },
            ],
        },
        {
            category: "Dealer Reference",
            items: [
                {
                    title: "Parasmani-VRF-Copper-Tube-Weight-Chart ",
                    file: vrfWeightChartPdf,
                    filename: "Parasmani-VRF-Copper-Tube-Weight-Chart.pdf",
                },
                {
                    title: "Parasmani-Generic-Copper-Tube-Weight-Chart",
                    file: genericWeightChartPdf,
                    filename: "Parasmani-Copper-Tube-Generic-Weight-Chart.pdf",
                },
                {
                    title: "Parasmani-Copper-Tube-Packaging-Specifications",
                    file: packagingSpecsPdf,
                    filename: "Parasmani-Copper-Tube-Packaging-Specifications.pdf",
                },
                {
                    title: "Parasmani-MGPS-Copper-Tube-Packaging-Specifications",
                    file: mgpsPackagingSpecsPdf,
                    filename: "Parasmani-MGPS-Copper-Tube-Packaging-Specifications.pdf",
                },
            ],
        },
        {
            category: "Approvals",
            items: [
                {
                    title: "Parasmani-OEM-Vendor-Approvals",
                    file: oemApprovalsPdf,
                    filename: "Parasmani-OEM-Vendor-Approvals.pdf",
                },
                {
                    title: "Parasmani-Project-Approvals",
                    file: projectApprovalsPdf,
                    filename: "Parasmani-Project-Approvals.pdf",
                },
                {
                    title: "Parasmani-Government-Approvals",
                    file: govtApprovalsPdf,
                    filename: "Parasmani-Government-Approvals.pdf",
                },
            ],
        },
        {
            category: "Certifications",
            items: [
                { title: "Parasmani-ISO-Certifications" },
                { title: "Parasmani-Llyods-Register-Certificate" },
                { title: "Parasmani-CE-Compliance" },
                { title: "Parasmani-Green-Pro-Compliance" },
                { title: "Parasmani-RoHS-Compliance" },
                { title: "Parasmani-Directive-2007-47-EEC" },
                { title: "Parasmani-Directive-EU-2002-95-EC" },
                { title: "Parasmani-Directive-EU-2002-95-EC" },
            ],
        },
        {
            category: "Policies",
            items: [
                {
                    title: "Parasmani-Supplier-Code-of-Conduct",
                    file: supplierCodePdf,
                    filename: "Parasmani-Supplier-Code-of-Conduct.pdf",
                },
                {
                    title: "Parasmani-Quality-Policy",
                    file: qualityPolicyPdf,
                    filename: "Parasmani-Quality-Policy.pdf",
                },
                { title: "Parasmani-Privacy-Policy", route: "/privacy-policy" },
            ],
        },
    ];

    const filteredData = useMemo(() => {
        if (activeFilter === "All") return downloadData;
        return downloadData.filter((section) => section.category === activeFilter);
    }, [activeFilter]);

    /* Browsers throttle a burst of synchronous downloads from one gesture, so the
       anchors are clicked on a short stagger. Items without a file are skipped. */
    const handleDownloadAll = (items) => {
        items
            .filter((item) => item.file)
            .forEach((item, idx) => {
                setTimeout(() => {
                    const anchor = document.createElement("a");
                    anchor.href = item.file;
                    anchor.download = item.filename;
                    document.body.appendChild(anchor);
                    anchor.click();
                    anchor.remove();
                }, idx * 400);
            });
    };

    return (
        <div className="bg-white min-h-screen font-albert">

            {/* 
        OPTIMIZED HERO HEADER BLOCK: 
        Swaps from stacked rendering on mobile to edge-to-edge inline rendering on md+ layouts.
      */}
            <header className="relative w-full bg-white overflow-hidden select-none min-h-[300px] md:min-h-[260px] lg:min-h-[280px] flex flex-col-reverse md:flex-row items-stretch md:items-center border-b border-gray-100 md:border-b-0">

                {/* Typography Content Layer */}
                <div className="relative z-20 w-full max-w-[1360px] mx-auto px-5 sm:px-12 md:px-16 lg:px-20 py-8 md:py-0 flex items-center">
                    <div className="max-w-[550px] w-full text-center md:text-left">
                        <h1 className="h1 text-[#18234D] tracking-tight mb-3">
                            Downloads
                        </h1>
                        <p className="p1 text-[#19234D]/85 font-light leading-relaxed max-w-[440px] mx-auto md:mx-0">
                            Access our comprehensive technical documentation, product catalogs, and certifications.
                        </p>
                    </div>
                </div>

                {/* Dynamic Graphic Asset Component frame */}
                <div className="relative w-full h-[180px] md:h-full md:absolute md:inset-y-0 md:right-0 md:w-2/3 lg:w-3/5 z-0 pointer-events-none self-stretch shrink-0">
                    {/* Fading Mask Matrix (active only for md+ viewports to prevent dynamic text clashing) */}
                    <div className="hidden md:block absolute inset-y-0 left-0 w-full md:w-1/3 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                    <div className="block md:hidden absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
                    <img
                        src={heroImage}
                        alt="Technical publications documentation asset stack layout"
                        className="w-full h-full object-cover object-center md:object-top select-none"
                    />
                </div>
            </header>

            {/* 
        STICKY FILTER BAR MATRIX:
        Fixed horizontal edge container clipping boundaries by injecting side bleeding values (-mx-5 px-5)
      */}
            <nav className="sticky top-[64px]  flex justify-center  z-30 bg-white/90 backdrop-blur-md py-4 md:py-6 border-b border-gray-100">
                {/* `max-w-full`, not `max-w-screen`: 100vw includes the vertical
           scrollbar, so the bar sat ~15px wider than the page and the -mx-5
           bleed pushed it wider still, giving the whole page a horizontal
           scrollbar. Capping against the parent instead keeps the bleed. */}
                <div className="max-w-full mx-auto px-5">
                    <div className="-mx-5 px-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex">
                        <div className="bg-[#EAEAEA] rounded-full p-1.5 flex items-center gap-1 flex-nowrap shrink-0">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    className={`px-4 sm:px-5 py-2 rounded-full transition-all duration-200 text-[13px] sm:text-[14px] font-medium whitespace-nowrap cursor-pointer
                    ${activeFilter === cat
                                            ? "bg-white text-[#141C3A] shadow-sm font-semibold"
                                            : "text-[#141C3A]/60 hover:text-[#141C3A]"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content Grid Stack Frame */}
            {/* The gutter steps up with the breakpoint so the section cards stop
         sitting almost flush to the window on tablet and small laptop widths,
         where the 1269px cap has not started centring them yet. */}
            <main className="max-w-[1269px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-6 space-y-8 md:space-y-12">
                {filteredData.length === 0 ? (
                    <div className="text-center py-16 text-gray-500 text-[14px]">No documents found under this criteria.</div>
                ) : (
                    filteredData.map((section, sIdx) => (
                        <div key={sIdx} className="space-y-4 animate-fade-in">
                            {/* Category Title Heading */}
                            <h2 className="h2 text-[#141C3A] tracking-tight px-1">
                                {section.category}
                            </h2>

                            {/* Group Card Layout Container */}
                            <div className="bg-[#F6F6F6]/70 border border-gray-100 rounded-[20px] p-4 sm:p-6 space-y-3 relative">

                                {/* Download All Placement Inside Container */}
                                {section.items.filter((item) => item.file).length > 1 && (
                                    <div className="flex justify-end mb-1">
                                        <button
                                            onClick={() => handleDownloadAll(section.items)}
                                            className="text-[12px] font-semibold text-[#141C3A] underline underline-offset-4 hover:text-[#C67D55] transition-colors cursor-pointer"
                                        >
                                            Download All
                                        </button>
                                    </div>
                                )}

                                {/* Nested Resource Rows */}
                                {section.items.map((item, iIdx) => (
                                    <div
                                        key={iIdx}
                                        className="bg-white border border-gray-100 rounded-xl p-3.5 sm:p-4 flex justify-between items-center gap-4 shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:border-gray-200 transition-all"
                                    >
                                        <span className="text-[13px] sm:text-[14px] text-[#141C3A]/90 font-normal leading-normal">
                                            {item.title}
                                        </span>
                                        {item.file ? (
                                            <a
                                                href={item.file}
                                                download={item.filename}
                                                aria-label={`Download ${item.title}`}
                                                className="text-[#C67D55] hover:scale-110 transition-transform p-1.5 bg-gray-50 rounded-lg sm:bg-transparent flex-shrink-0"
                                            >
                                                <FiDownload size={18} />
                                            </a>
                                        ) : item.route ? (
                                            <Link
                                                to={item.route}
                                                aria-label={`Read ${item.title}`}
                                                className="text-[#C67D55] hover:scale-110 transition-transform p-1.5 bg-gray-50 rounded-lg sm:bg-transparent flex-shrink-0"
                                            >
                                                <FiArrowUpRight size={18} />
                                            </Link>
                                        ) : (
                                            <span
                                                title="Available on request"
                                                aria-label={`${item.title} — available on request`}
                                                className="text-[#141C3A]/25 p-1.5 bg-gray-50 rounded-lg sm:bg-transparent flex-shrink-0 cursor-not-allowed"
                                            >
                                                <FiDownload size={18} />
                                            </span>
                                        )}
                                    </div>
                                ))}

                                {/* Submittal Request Inner Accent Block */}
                                {section.hasHardCopyRequest && (
                                    <div className="bg-white border border-[#C67D55]/30 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
                                        <div className="flex items-center gap-3 w-full sm:w-auto">
                                            <div className="text-[#C67D55] shrink-0">
                                                <FiBookOpen size={19} />
                                            </div>
                                            <p className="text-[12.5px] sm:text-[13px] text-[#141C3A]/80 font-normal leading-normal">
                                                Need a printed copy for your project documentation?
                                            </p>
                                        </div>
                                        <button onClick={() => setEnquiryOpen(true)} className="b2 w-full sm:w-auto bg-[#C67D55] text-white px-5 py-2.5 sm:py-2 rounded-full font-medium hover:bg-[#B36A43] transition-colors whitespace-nowrap cursor-pointer shadow-sm shadow-[#C67D55]/10">
                                            Request Hard Copy of Submittal
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </main>

            {/* Bottom Legal Disclaimer Section */}
            <footer className="max-w-[1269px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-4 pb-12 md:pb-16">
                <div className="border-t border-gray-100 pt-6 text-center">
                    <p className="text-[11.5px] md:text-[12px] text-[#646C88] leading-relaxed font-light max-w-4xl mx-auto font-albert">
                        Disclaimer: The documents available for download are for general reference only. Specifications, product designs, and packaging may change without prior notice. Please contact our sales team for the latest information.
                    </p>
                </div>
            </footer>

            {/* Same dialog the navbar's "Enquire Now" opens, so the hard-copy request
          and every other enquiry share one form and one POST /api/contact. */}
            <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
        </div>
    );
};

export default DownloadPage;
