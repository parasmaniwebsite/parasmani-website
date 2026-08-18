import kFlexLogo from "../assets/hvac/kflex.png";
import gurutronicsLogo from "../assets/hvac/gurutronics.png";
import activeLogo from "../assets/hvac/active.png";

const HVACSolutions = () => {
  const partners = [
    { name: "K-FLEX", logo: kFlexLogo, offset: "lg:-translate-x-50" },
    { name: "Gurutronics", logo: gurutronicsLogo, offset: "lg:-translate-x-10" },
    { name: "ACtive", logo: activeLogo, offset: "lg:-translate-x-50" },
  ];

  return (
    <section className="bg-[#F6F6F6] py-[80px] px-6 lg:px-10 overflow-hidden">
      <div className="max-w-[1269px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left Content Column */}
        <div className="max-w-[620px]">
          <h2 className="h2 mb-[10px] leading-[1.1] tracking-wide text-[#4A4A4A]">
            Complete HVAC Solutions
          </h2>

          <h3 className="mb-[30px] font-albert text-[24px] font-[400] leading-[1.1] tracking-wide text-[#C68344]">
            Gurutronics Automations Pvt Ltd | K-Flex | Active
          </h3>

          <p className="font-albert text-[17px] font-normal leading-[1.35] tracking-wide text-[#4A4A4A]">
            Alongside our copper tubes, we offer complementary HVAC products–
            insulation, condensate drain pumps, and control panels giving
            contractors and installers a single, reliable source and simplifying
            procurement.
          </p>
        </div>

        {/* Right Staggered Card Column */}
        <div className="flex flex-col gap-5 w-full lg:w-auto">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`
                ${partner.offset}
                bg-white border border-[#C68345] rounded-[30px] 
                w-full lg:w-[200px] h-[100px] flex items-center justify-center p-4
                shadow-[0_10px_15px_-3px_rgba(0,0,0,0.15)]
                
                /* Added Hover Effects */
                cursor-pointer group
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:scale-[1.03]
                hover:shadow-[0_20px_25px_-5px_rgba(198,131,69,0.2)]
                hover:border-[#A1652E]
            `}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HVACSolutions;