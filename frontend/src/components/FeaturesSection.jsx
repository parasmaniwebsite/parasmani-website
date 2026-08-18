import precisionImg from "../assets/homePage/precision-engineering.png";
import complianceImg from "../assets/homePage/standards-compliance.png";
import supplyChainImg from "../assets/homePage/india-map.png";
import solutionsImg from "../assets/homePage/application-icons.png";

const FeaturesSection = () => {
  const features = [
    {
      id: "01",
      title: "Precision Engineering & Quality Assurance",
      desc: "Tight tolerances, consistent wall thickness, and rigorous quality checks across every batch.",
      image: precisionImg,
    },
    {
      id: "02",
      title: "Global Standards Compliance",
      desc: "Adherence to JIS H 3300, ASTM, IS, EN 1057 and BS EN 13348 specifications.",
      image: complianceImg,
    },
    {
      id: "03",
      title: "Reliable Supply Chain",
      desc: "Ready stock maintained at our facility with pan-India dispatch capability.",
      image: supplyChainImg,
    },
    {
      id: "04",
      title: "Application-Specific Solutions",
      desc: "Built for every application. Compliant with every relevant standard.",
      image: solutionsImg,
    },
  ];

  return (
    <section className="bg-white py-24 px-6 relative w-full overflow-x-clip">
      <div className="max-w-7xl mx-auto relative">
        
        {/* STICKY HEADER */}
        <div className="sticky top-[64px] bg-white z-30 py-8 text-center">
          <h2 className="h2 text-[#272727] tracking-wider mb-3">
            What Sets Us Apart
          </h2>
          <p className="p2 font-albert tracking-wide text-[#666666] max-w-[750px] mx-auto leading-relaxed">
            Four pillars that have defined Parasmani's manufacturing standards
            for over 3 decades.
          </p>
        </div>

        {/* CARDS LIST */}
        <div className="relative flex flex-col items-center w-full mt-12 gap-20 z-10">
          {features.map((item) => (
            <div
              key={item.id}
              className="w-full bg-white flex flex-col items-center max-w-5xl"
            >
              {/* Image Capsule Frame */}
              <div className="w-full aspect-[2.3/1] md:aspect-[3.2/1] flex items-center justify-center overflow-hidden bg-white rounded-[160px] md:rounded-[240px] mb-8 ">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain select-none pointer-events-none"
                />
              </div>

              {/* SIDE-BY-SIDE TEXT LAYOUT (Matches Screenshot Fix) */}
              <div className="w-full flex flex-row items-center justify-start gap-10 md:gap-30 px-6 md:px-16">
                {/* Left Side: Number */}
                <span className="font-obviously font-medium text-[75px] md:text-[110px] text-[#ECEFF3] select-none leading-none shrink-0 tracking-tighter">
                  {item.id}
                </span>

                {/* Right Side: Content Column */}
                <div className="flex flex-col text-left justify-center pt-2">
                  <h3 className="font-obviously text-[20px] md:text-[26px] text-[#221F20] mb-2 font-normal tracking-wide">
                    {item.title}
                  </h3>
                  <p className="font-albert text-[14px] md:text-[16px] text-[#555555] leading-relaxed max-w-[650px]">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;