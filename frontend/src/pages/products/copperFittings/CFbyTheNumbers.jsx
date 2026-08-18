import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
// Trimmed variants: the originals carry large transparent margins that make
// object-contain letterbox the subject down to a fraction of the frame.
import od from "../../../assets/products/copperFitting/specificationImg1Trim.png";
import wallthickness from "../../../assets/products/copperFitting/specificationImg2Trim.png";
import standardlength from "../../../assets/products/copperFitting/specificationImg4Trim.png";
import temper from "../../../assets/products/copperFitting/specificationImg3Trim.png";

export default function CFbyTheNumbers() {
  const [activeTab, setActiveTab] = useState('od');

  const specDetails = {
    od: {
      title: "Size Range",
      label: "ID: 6 mm - 130 mm",
      description: '1/4" to 4" inside diameter — covering all standard HVAC, plumbing, and industrial piping sizes.',
      image: od,
      alt: "Size Range Visual Preview",
      // Inset from the frame edges; the fittings read as a floating product shot.
      imgClass: "p-6 sm:p-12"
    },
    wall: {
      title: "Wall Thickness",
      label: "0.70 mm - 3.25 mm",
      description: "Matched to tube OD — fittings are dimensioned to slip-fit standard copper tube for clean brazed joints.",
      image: wallthickness,
      alt: "Wall Thickness Visual Preview",
      // Portrait shot: no padding so the glove runs the full height of the frame.
      imgClass: "object-top"
    },
    length: {
      title: "Types Available",
      label: "6+ types",
      description: "90° & 45° Elbow, Coupling, Reducer, Equal Tee, U Bend and more — plus custom configurations on request.",
      image: standardlength,
      alt: "Types Available Visual Preview",
      imgClass: "p-6 sm:p-12"
    },
    temper: {
      title: "Joining Method",
      label: "Brazeable",
      description: "Compatible with silver brazing alloy and phosphor-copper brazing rod across HVAC, plumbing, medical, and industrial applications.",
      image: temper,
      alt: "Joining Method Visual Preview",
      // Portrait shot: runs the full height, sitting toward the right of the frame.
      imgClass: "object-right"
    }
  };

  const tabOrder = ['od', 'wall', 'length', 'temper'];

  return (
    <section className="w-full bg-[#F7F7F7] py-10 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 select-none font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.02)] p-4 sm:p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-stretch">

        {/* ================= LEFT PANEL CONTROLS ================= */}
        <div className="lg:col-span-5 flex flex-col justify-center w-full order-1">
          <span className="eyebrow-2 text-[#C43A26] tracking-[0.3em] uppercase block mb-1.5 sm:mb-3 font-albert">
            SPECIFICATIONS
          </span>

          <h2 className="h2 text-[#272727] tracking-tight leading-tight mb-5 sm:mb-10">
            By the Numbers
          </h2>

          <div className="flex flex-col gap-2.5 sm:gap-4 w-full lg:max-w-[340px]">
            {tabOrder.map((key) => (
              <div key={key} className="flex flex-col">
                {activeTab !== key ? (
                  <button
                    onClick={() => setActiveTab(key)}
                    className="flex justify-between items-center w-full py-3 sm:py-4 px-4 sm:px-6 rounded-full border border-gray-200 text-[#272727] text-sm bg-white hover:bg-gray-50 transition-all duration-300 font-albert"
                  >
                    <span className="font-light text-[13.5px] sm:text-[15px]">{specDetails[key].title}</span>
                    <Plus size={15} className="text-gray-400" />
                  </button>
                ) : (
                  <div className="bg-white p-4 sm:p-6 rounded-[20px] border border-[#C68344]/40 w-full transition-all duration-300 shadow-sm">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-md text-[#C68344] font-normal text-[13.5px] sm:text-[15px] font-albert">
                        {specDetails[key].label}
                      </span>
                      <Minus size={14} className="text-gray-400 cursor-pointer" onClick={() => setActiveTab('od')} />
                    </div>
                    <p className="text-[12.5px] sm:text-[14px] text-[#454545] font-normal leading-relaxed">
                      {specDetails[key].description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT PREVIEW FRAME ================= */}
        <div className="lg:col-span-7 w-full h-[300px] sm:h-[480px] lg:h-[600px] bg-[#F9F3EC] rounded-2xl border border-[#F2E5D9] overflow-hidden relative order-2">
          <img
            key={activeTab}
            src={specDetails[activeTab].image}
            alt={specDetails[activeTab].alt}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-out select-none pointer-events-none ${specDetails[activeTab].imgClass}`}
          />
        </div>

      </div>
    </section>
  );
}
