import { Link } from "react-router-dom";
import heroBg from "../assets/tools/dashboard/img1.png";
import imgWeight from "../assets/tools/dashboard/img2.png";
import imgPressure from "../assets/tools/dashboard/img3.png";
import imgEstimator from "../assets/tools/dashboard/img4.png";
import imgConverter from "../assets/tools/dashboard/img5.png";

// Per-tool line icons (reproduced from the source design)
const ICONS = {
  weight: (
    <>
      <path d="M12 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
      <path d="M6.5 9H4a1 1 0 0 0-.97.757L1.03 19.757A1 1 0 0 0 2 21h20a1 1 0 0 0 .97-1.243L20.97 9.757A1 1 0 0 0 20 9h-2.5" />
    </>
  ),
  pressure: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </>
  ),
  estimator: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),
  converter: (
    <>
      <path d="M17 4l4 4-4 4" />
      <path d="M3 8h18" />
      <path d="M7 20l-4-4 4-4" />
      <path d="M21 16H3" />
    </>
  ),
};

const TOOLS = [
  {
    key: "weight",
    img: imgWeight,
    href: "/weight-calculator",
    name: "Weight Calculator",
    title: "Parasmani Weight Calculator",
    desc: "Calculate weight per metre and total weight using OD, wall thickness (SWG or mm), and length. Supports straight tube and pancake coil. PDF export included.",
  },
  {
    key: "pressure",
    img: imgPressure,
    href: "/pressure-calculator",
    name: "Pressure Calculator",
    title: "Parasmani Pressure Calculator",
    desc: "Determine allowable working pressure for copper tubes based on OD, wall thickness, and alloy grade — per ASTM, EN, IS, and JIS standards. Output in bar or MPa.",
  },
  {
    key: "estimator",
    img: imgEstimator,
    href: "/project-estimator",
    name: "Project Estimator",
    title: "Parasmani Project Estimator",
    desc: "Build a multi-size copper tube BOM for HVAC and plumbing projects. Enter tube sizes, lengths, and quantities to get a consolidated material weight summary.",
  },
  {
    key: "converter",
    img: imgConverter,
    href: "/unit-converter",
    name: "Unit Converter",
    title: "Parasmani Unit Converter",
    desc: "Convert kg↔lb, mm↔inch, MPa↔psi, SWG↔mm, bar↔psi and more — built for copper tube specifications across global standards including ASTM, IS, EN and JIS.",
  },
];

const WA_HREF =
  "https://api.whatsapp.com/send/?phone=919819134044&text=Hi+Parasmani+team%2C+I+need+help+with+a+copper+tube+calculation.&type=phone_number&app_absent=0";

const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.524 3.659 1.438 5.168L2.046 21.9a.5.5 0 0 0 .608.608l4.732-1.392A9.961 9.961 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm4.93 13.337c-.207.583-1.215 1.114-1.66 1.146-.447.033-.861.2-2.9-.605-2.44-.978-3.997-3.46-4.118-3.62-.12-.16-.977-1.3-.977-2.48s.617-1.762.836-2.002c.22-.24.478-.3.638-.3l.458.008c.147.007.345-.056.54.412.2.478.68 1.655.74 1.775.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.252.313-.36.42-.12.12-.245.25-.105.49.14.24.62.964 1.33 1.56.914.79 1.684 1.033 1.924 1.153.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.57-.147 1.153z" />
  </svg>
);

const ToolsPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F4F1] font-albert pb-16">
      {/* HERO — mobile (stacked, image on top, centered text) */}
      <div className="md:hidden bg-[#F5F4F1]">
        <div className="relative w-full h-[190px]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F4F1] via-[#F5F4F1]/10 to-transparent z-10" />
          <img
            src={heroBg}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="px-5 pt-5 pb-8 text-center">
          <span className="eyebrow-1 tracking-[0.15em] block text-[#C43A26] mb-2.5">
            Parasmani Engineering Tools
          </span>
          <h1 className="h1 text-[#1A1A1A] mb-4">Tools Built for Copper Professionals</h1>
          <p className="p1 text-[#454545] font-light font-albert max-w-[390px] mx-auto">
            Precision calculators and estimators for HVAC engineers, procurement
            teams, and contractors working with copper tube.
          </p>
        </div>
      </div>

      {/* HERO — desktop */}
      <section className="relative hidden md:flex items-end overflow-hidden md:h-[320px] bg-[#F5F4F1] px-6 md:px-20 pt-20 pb-14">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-[center_right]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #F5F4F1 34%, rgba(245,244,241,0.6) 58%, rgba(245,244,241,0.05) 100%)",
          }}
        />
        <div className="relative z-10 max-w-[500px]">
          <span className="eyebrow-1 tracking-[0.15em] block text-[#C43A26] mb-2.5">
            Parasmani Engineering Tools
          </span>
          <h1 className="h1 text-[#1A1A1A] mb-4">
            Tools Built for
            <br />
            Copper Professionals
          </h1>
          <p className="p1 text-[#454545] font-light font-albert max-w-[390px]">
            Precision calculators and estimators for HVAC engineers, procurement
            teams, and contractors working with copper tube.
          </p>
        </div>
      </section>

      {/* PAGE */}
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 pt-11">
        {/* Section label */}
        <div className="flex items-center gap-3 text-[0.58rem] font-bold tracking-[0.2em] uppercase text-[#0f152652] mb-5">
          <span>Select a Tool</span>
          <span className="flex-1 h-px bg-[#0f15261a]" />
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
          {TOOLS.map((t) => (
            <Link
              key={t.key}
              to={t.href}
              className="group relative block h-[240px] rounded-[16px] overflow-hidden border border-[#c684454d] bg-white shadow-[0_2px_16px_rgba(25,35,77,0.08)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(25,35,77,0.14)]"
            >
              <img
                src={t.img}
                alt={t.name}
                className="w-full h-full object-cover object-center block transition-[filter,transform] duration-[400ms] group-hover:brightness-[0.22] group-hover:scale-[1.04]"
              />

              {/* Resting label */}
              <div className="absolute inset-x-0 bottom-0 px-5 pt-8 pb-[18px] bg-[linear-gradient(to_top,rgba(25,35,77,0.92)_55%,transparent)] transition-opacity duration-200 group-hover:opacity-0">
                <div className="flex items-center gap-2.5 text-[0.92rem] font-bold text-white">
                  <span className="w-[30px] h-[30px] shrink-0 bg-[#c6844533] rounded-[7px] flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-[15px] h-[15px] stroke-[#d49a3e] fill-none"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {ICONS[t.key]}
                    </svg>
                  </span>
                  {t.name}
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex flex-col justify-center p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="w-[42px] h-[42px] shrink-0 bg-[#c6844529] rounded-[10px] flex items-center justify-center mb-[11px]">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-[21px] h-[21px] stroke-[#d49a3e] fill-none"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {ICONS[t.key]}
                  </svg>
                </span>
                <div className="text-[0.92rem] font-bold text-white mb-[7px]">
                  {t.title}
                </div>
                <div className="text-[0.77rem] text-white/[0.72] leading-[1.65] mb-[15px]">
                  {t.desc}
                </div>
                <span className="inline-flex items-center gap-[7px] w-fit bg-[linear-gradient(135deg,#b55233,#C68345)] text-white text-[0.75rem] font-bold px-[17px] py-2 rounded-full">
                  Open Tool
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3 h-3 stroke-white fill-none"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* WhatsApp strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 bg-[#19234D] rounded-[16px] px-8 py-[22px] mb-7 shadow-[0_2px_16px_rgba(25,35,77,0.08)]">
          <div className="flex items-center gap-[18px]">
            <span className="w-12 h-12 rounded-full shrink-0 bg-[#25d36624] flex items-center justify-center text-[#25D366]">
              <WhatsAppIcon className="w-[26px] h-[26px]" />
            </span>
            <div>
              <div className="text-[0.93rem] font-bold text-white mb-[3px]">
                Need help with a calculation?
              </div>
              <div className="text-[0.77rem] text-white/[0.52] leading-[1.5]">
                Our team is available on WhatsApp — share your specs and we'll
                assist directly.
              </div>
            </div>
          </div>
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[9px] self-start md:self-auto bg-[#25D366] text-white text-[0.8rem] font-bold px-[22px] py-3 rounded-full whitespace-nowrap shrink-0 transition-[background,transform] hover:bg-[#1ebe5a] hover:-translate-y-px"
          >
            <WhatsAppIcon className="w-[18px] h-[18px]" />
            Chat with Our Team
          </a>
        </div>

        {/* Disclaimer */}
        <div className="border border-[#c684454d] border-l-[3px] border-l-[#b55233] rounded-[12px] px-[18px] py-[14px] bg-[#c684450a] mb-12">
          <div className="flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-[#b55233] mb-[5px]">
            <svg
              viewBox="0 0 24 24"
              className="w-[13px] h-[13px] stroke-[#b55233] fill-none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Disclaimer
          </div>
          <div className="text-[0.76rem] text-[#0f152680] leading-[1.7]">
            All calculations provided by these tools are for reference and
            estimation purposes only. Results should not be used as a substitute
            for professional engineering judgement or certified design
            calculations. Parasmani Copper Pvt. Ltd. makes no warranty as to the
            accuracy or completeness of outputs. Always verify critical
            dimensions and pressures against applicable IS, ASTM, EN, JIS, or BS
            standards before use in actual projects.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
