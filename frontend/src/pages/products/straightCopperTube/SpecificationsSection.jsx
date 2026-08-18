import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
// Alpha-trimmed copy: the padded original is ~92% transparent, which would make
// the OD view stretch empty space instead of the pipe itself.
import copperTube1 from "../../../assets/products/sct/copperPipeTrim.png";
import copperTube3 from "../../../assets/products/sct/copperPipeTrim.png";
import copperTube4 from "../../../assets/products/copperFitting/copperPipe4.png";

// The length slider opens on the 3000 mm standard length. Starting it at 50%
// instead put it at the midpoint of the 300-6000 range, which is 3150 mm.
const LENGTH_RANGE = { min: 300, max: 6000 };
const STANDARD_LENGTH = 3000;
const STANDARD_LENGTH_PCT =
  ((STANDARD_LENGTH - LENGTH_RANGE.min) / (LENGTH_RANGE.max - LENGTH_RANGE.min)) *
  100;

export default function SpecificationsSection() {
  const [activeTab, setActiveTab] = useState('od');

  // Continuous fluid ranges driven directly from the input scales (0 to 100)
  const [odSliderVal, setOdSliderVal] = useState(0);
  const [wallSliderVal, setWallSliderVal] = useState(0);
  const [lengthSliderVal, setLengthSliderVal] = useState(STANDARD_LENGTH_PCT);

  // Min and Max Limits for standard continuous mapping
  const limits = {
    od: { min: 6, max: 130 },
    wall: { min: 0.70, max: 3.25 },
    length: LENGTH_RANGE
  };

  // Exact float ratio for 3000 mm over the 300-6000 span to ensure zero precision loss
  const milestonePct = STANDARD_LENGTH_PCT;

  // Helper function to map 0-100 percentage to a linear range
  const getLinearValue = (pct, min, max) => {
    // If we're extremely close to our milestone percentage, return exactly 3000 to prevent range track drift
    if (activeTab === 'length' && Math.abs(pct - milestonePct) < 0.5) {
      return STANDARD_LENGTH;
    }
    return min + (pct / 100) * (max - min);
  };

  // Compute precise continuous numeric readouts on the fly
  const currentOD = getLinearValue(odSliderVal, limits.od.min, limits.od.max);
  const currentWall = getLinearValue(wallSliderVal, limits.wall.min, limits.wall.max);
  const currentLength = getLinearValue(lengthSliderVal, limits.length.min, limits.length.max);

  const specDetails = {
    od: {
      label: `${Math.round(currentOD)} mm`,
      description: "Complete size range engineered to serve applications from HVAC systems to industrial installations."
    },
    wall: {
      label: `${currentWall.toFixed(2)} mm`,
      description: "Available in a range of wall thicknesses — lighter for standard connections, heavier for long runs and high-pressure applications."
    },
    length: {
      label: `${currentLength === 3000 ? 3000 : Math.round(currentLength)} mm`,
      description: "Standard length is 3m ≈ 10ft. Custom lengths available on request to suit specific project requirements."
    },
    temper: {
      label: "H . HH . QH",
      description: "Hard, Half Hard, and Quarter Hard - all tempers available for straight lengths."
    }
  };

  // Determine active values based on global layout status
  const currentSliderPercentage = 
    activeTab === 'od' ? odSliderVal : 
    activeTab === 'wall' ? wallSliderVal : lengthSliderVal;

  const handleSliderChange = (val) => {
    // Snap directly to the precise milestone ratio if standard drag gets close
    let finalVal = val;
    if (activeTab === 'length' && Math.abs(val - milestonePct) < 0.5) {
      finalVal = milestonePct;
    }

    if (activeTab === 'od') {
      setOdSliderVal(finalVal);
    } else if (activeTab === 'wall') {
      setWallSliderVal(finalVal);
    } else if (activeTab === 'length') {
      setLengthSliderVal(finalVal);
    }
  };

  /* RESPONSIVE SCALE CALCULATIONS */
  // Length stays fixed; only the pipe's thickness tracks the OD slider (6 mm - 130 mm)
  const computedOdWidthPct = 1.5 + (odSliderVal / 100) * 11;
  const dynamicOdWidth = `${computedOdWidthPct}%`;

  const getLengthHeightPct = (currentVal) => {
    const minH = 25; 
    const midH = 72; 
    const maxH = 100; 

    if (currentVal <= 3000) {
      const pctOfFirstHalf = (currentVal - 300) / (3000 - 300);
      return minH + pctOfFirstHalf * (midH - minH);
    } else {
      const pctOfSecondHalf = (currentVal - 3000) / (6000 - 3000);
      return midH + pctOfSecondHalf * (maxH - midH);
    }
  };

  const dynamicLengthHeight = `${getLengthHeightPct(currentLength)}%`;
  
  const outerRadius = 100; 
  const computedStroke = 8 + (wallSliderVal / 100) * 27; 
  const innerRadius = outerRadius - computedStroke;

  return (
    <section className="w-full bg-[#F7F7F7] py-10 md:py-15 px-4 sm:px-6 md:px-12 lg:px-20 select-none font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.02)] p-4 sm:p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-stretch">
        
        {/* ================= LEFT PANEL CONTROLS ================= */}
        <div className="lg:col-span-5 flex flex-col justify-center w-full order-1">
          <span className="eyebrow-2 text-[#C43A26] tracking-[0.3em] uppercase block mb-1 font-albert">
            SPECIFICATIONS
          </span>
          
          <h2 className="h2 text-[#272727] tracking-tight leading-tight mb-5 sm:mb-10">
            By the Numbers
          </h2>

          <div className="flex flex-col gap-2.5 sm:gap-4 w-full lg:max-w-[340px]">
            
            {/* CATEGORY 1: OUTER DIAMETER */}
            <div className="flex flex-col">
              {activeTab !== 'od' && (
                <button 
                  onClick={() => setActiveTab('od')}
                  className="flex justify-between items-center w-full py-3 sm:py-4 px-4 sm:px-6 rounded-full border border-gray-200 text-[#272727] text-sm bg-white hover:bg-gray-50 transition-all duration-300 font-albert"
                >
                  <span className="font-light text-[12px]">Size Range</span>
                  <Plus size={15} className="text-gray-400" />
                </button>
              )}

              {activeTab === 'od' && (
                <div className="bg-white p-4 sm:p-6 rounded-[20px] border border-[#C68344]/40 w-full transition-all duration-300 shadow-sm">
                  <span className="text-md text-[#C68344] font-normal block mb-1.5 text-[14px] font-albert">
                    OD: {limits.od.min} mm – {limits.od.max} mm
                  </span>
                  <p className="text-[14px] font-albert text-[#454545] font-normal leading-relaxed">
                    {specDetails.od.description}
                  </p>
                </div>
              )}
            </div>

            {/* CATEGORY 2: WALL THICKNESS */}
            <div className="flex flex-col">
              {activeTab !== 'wall' && (
                <button 
                  onClick={() => setActiveTab('wall')}
                  className="flex justify-between items-center w-full py-3 sm:py-4 px-4 sm:px-6 rounded-full border border-gray-200 text-[#272727] text-sm bg-white hover:bg-gray-50 transition-all duration-300 font-albert"
                >
                  <span className="font-light text-[12px]">Wall Thickness</span>
                  <Plus size={15} className="text-gray-400" />
                </button>
              )}

              {activeTab === 'wall' && (
                <div className="bg-white p-4 sm:p-6 rounded-[20px] border border-[#C68344]/40 w-full transition-all duration-300 shadow-sm">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-md text-[#C68344] font-normal text-[14px] font-albert">
                      {limits.wall.min.toFixed(2)} mm to {limits.wall.max.toFixed(2)} mm
                    </span>
                    <Minus size={14} className="text-gray-400 cursor-pointer" onClick={() => setActiveTab('od')} />
                  </div>
                  <p className="text-[14px] font-albert text-[#676767] font-normal leading-relaxed font-albert">
                    {specDetails.wall.description}
                  </p>
                </div>
              )}
            </div>

            {/* CATEGORY 3: STANDARD LENGTH */}
            <div className="flex flex-col">
              {activeTab !== 'length' && (
                <button 
                  onClick={() => setActiveTab('length')}
                  className="flex justify-between items-center w-full py-3 sm:py-4 px-4 sm:px-6 rounded-full border border-gray-200 text-[#272727] text-sm bg-white hover:bg-gray-50 transition-all duration-300 font-albert"
                >
                  <span className="font-light text-[12px]">Standard Length</span>
                  <Plus size={15} className="text-gray-400" />
                </button>
              )}

              {activeTab === 'length' && (
                <div className="bg-white p-4 sm:p-6 rounded-[20px] border border-[#C68344]/40 w-full transition-all duration-300 shadow-sm">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-md text-[#C68344] font-normal text-[14px] font-albert">
                      {limits.length.min} mm to {limits.length.max} mm
                    </span>
                    <Minus size={14} className="text-gray-400 cursor-pointer" onClick={() => setActiveTab('od')} />
                  </div>
                  <p className="text-[14px] font-albert text-[#676767] font-normal leading-relaxed font-albert">
                    {specDetails.length.description}
                  </p>
                </div>
              )}
            </div>

            {/* CATEGORY 4: TEMPER */}
            <div className="flex flex-col">
              {activeTab !== 'temper' && (
                <button 
                  onClick={() => setActiveTab('temper')}
                  className="flex justify-between items-center w-full py-3 sm:py-4 px-4 sm:px-6 rounded-full border border-gray-200 text-[#272727] text-sm bg-white hover:bg-gray-50 transition-all duration-300 font-albert"
                >
                  <span className="font-light text-[12px]">Temper</span>
                  <Plus size={15} className="text-gray-400" />
                </button>
              )}

              {activeTab === 'temper' && (
                <div className="bg-white p-4 sm:p-6 rounded-[20px] border border-[#C68344]/40 w-full transition-all duration-300 shadow-sm">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-md text-[#C68344] font-normal text-[14px] font-albert">
                      {specDetails.temper.label}
                    </span>
                    <Minus size={14} className="text-gray-400 cursor-pointer" onClick={() => setActiveTab('od')} />
                  </div>
                  <p className="text-[14px] font-albert text-[#676767] font-normal leading-relaxed font-albert">
                    {specDetails.temper.description}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ================= RIGHT INTERACTIVE SCALE WORKBENCH ================= */}
        <div className="lg:col-span-7 w-full h-[340px] sm:h-[480px] lg:h-[540px] bg-[#F9F3EC] rounded-2xl border border-[#F2E5D9] overflow-hidden p-4 sm:p-8 relative flex flex-col justify-between order-2">
          
          {/* Header Metadata Display */}
          <div className="w-full flex justify-between items-center relative z-10">
            <span className="font-albert text-[14px] tracking-wider text-[#373737] uppercase font-light">
              Scale Preview
            </span>
            <div className="px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#C68344]   text-[17px] font-medium text-[#9C9C9C] bg-[#F9F3EC]/80 backdrop-blur-sm">
              <span className='text-[#272727] font-light mr-1'>{specDetails[activeTab].label}</span>
              <span className='text-[#9C9C9C] font-light mr-1'>
                {activeTab === 'wall' ? 'Wall' : activeTab === 'length' ? 'Length' : activeTab === 'temper' ? '' : 'O.D.'}
              </span>
            </div>
          </div>

          {/* Central Interactive Content Display Area */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden px-4">
            
            {/* TAB 1: OUTER DIAMETER VIEW */}
            {activeTab === 'od' && (
              <div className="absolute inset-x-0 top-14 sm:top-24 bottom-0 flex items-end justify-center">
                <img
                  src={copperTube1}
                  alt="Outer Diameter Pipe Preview"
                  className="object-fill drop-shadow-md transition-[width] duration-150 ease-out h-full"
                  style={{ width: dynamicOdWidth }}
                />
              </div>
            )}

            {/* TAB 2: WALL THICKNESS DYNAMIC COIL PROFILE */}
            {activeTab === 'wall' && (
              <div className="flex items-center justify-center pb-6 sm:pb-8 w-full h-full max-h-[220px] sm:max-h-[320px]">
                <svg 
                  viewBox="-130 -130 260 260" 
                  className="w-32 h-32 sm:w-56 sm:h-56 lg:w-64 lg:h-64 filter drop-shadow-[0_12px_24px_rgba(61,26,8,0.4)]"
                >
                  <defs>
                    <radialGradient id="copper-grad" cx="35%" cy="35%" r="75%">
                      <stop offset="0%" stopColor="#f2a07a" />
                      <stop offset="35%" stopColor="#eb8048" />
                      <stop offset="70%" stopColor="#b55233" />
                      <stop offset="100%" stopColor="#3d1a08" />
                    </radialGradient>
                    
                    <radialGradient id="bore-grad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#0c1230" />
                      <stop offset="100%" stopColor="#000510" />
                    </radialGradient>
                  </defs>
                  
                  <circle 
                    cx="0" 
                    cy="0" 
                    r={outerRadius} 
                    fill="url(#copper-grad)" 
                    stroke="rgba(0,0,0,0.3)" 
                    strokeWidth="0.6"
                    className="transition-all duration-100 ease-out"
                  />
                  
                  <circle 
                    cx="0" 
                    cy="0" 
                    r={innerRadius} 
                    fill="url(#bore-grad)" 
                    stroke="rgba(0,0,0,0.4)" 
                    strokeWidth="0.4"
                    className="transition-all duration-100 ease-out"
                  />
                  
                  <line 
                    x1={-outerRadius} 
                    y1="0" 
                    x2={outerRadius} 
                    y2="0" 
                    stroke="rgba(0,0,0,0.15)" 
                    strokeWidth="0.6" 
                    strokeDasharray="2,2"
                    className="transition-all duration-100 ease-out"
                  />
                  
                  <line 
                    x1={innerRadius} 
                    y1="0" 
                    x2={outerRadius} 
                    y2="0" 
                    stroke="#19234D" 
                    strokeWidth="1.5"
                    className="transition-all duration-100 ease-out"
                  />
                  
                  <circle 
                    cx={innerRadius} 
                    cy="0" 
                    r="2" 
                    fill="#19234D"
                    className="transition-all duration-100 ease-out"
                  />
                  
                  <circle 
                    cx={outerRadius} 
                    cy="0" 
                    r="2" 
                    fill="#19234D"
                    className="transition-all duration-100 ease-out"
                  />
                </svg>
              </div>
            )}

            {/* TAB 3: STANDARD LENGTHS BUNDLE VIEW */}
            {activeTab === 'length' && (
              <div className="absolute inset-x-0 top-14 sm:top-24 bottom-0 flex items-end justify-center">
                <img
                  src={copperTube3}
                  alt="Standard Length Preview"
                  className="object-fill drop-shadow-md transition-[height] duration-150 ease-out w-[16px] sm:w-[22px]"
                  style={{ height: dynamicLengthHeight }}
                />
              </div>
            )}

            {/* TAB 4: TEMPERS STRUCTURAL BENT VIEW */}
            {activeTab === 'temper' && (
              <div className="flex items-center justify-center p-2 pb-6 sm:pb-8 w-full max-w-[320px] sm:max-w-[480px]">
                <img 
                  src={copperTube4}
                  alt="Tempers Form Preview"
                  className="w-full object-contain drop-shadow-sm"
                />
              </div>
            )}
          </div>

          {/* ================= CONTINUOUS STEPPING SLIDER CONTROLLER ================= */}
          <div className={`w-full max-w-xl mx-auto px-4 sm:px-6 pb-1 relative z-10 mt-auto transition-all duration-300 ${['temper'].includes(activeTab) ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="relative flex items-center select-none h-6 mt-6 sm:mt-8">
              
              {/* PIXEL PERFECT LOCKED TOOLTIP CONTAINER */}
              <div 
                className="absolute bottom-full mb-3 pointer-events-none z-30 flex flex-col items-center"
                style={{ 
                  left: `${currentSliderPercentage}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                  <div className="bg-[#BC6C3D] text-white text-[12px] font-medium px-2.5 py-0.5 sm:py-1 rounded-lg shadow-md whitespace-nowrap relative flex items-center justify-center min-w-[50px] text-center h-[24px] sm:h-[28px]">
                    {specDetails[activeTab].label}
                    {/* Arrow Pin */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#BC6C3D] sm:border-l-[5px] sm:border-r-[5px] sm:border-t-[5px]" />
                  </div>
              </div>

              {/* Underlying Track Rails */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-[#E8D9CB] rounded-full">
                <div 
                  className="h-full bg-[#BC6C3D] rounded-full transition-all duration-100"
                  style={{ width: `${currentSliderPercentage}%` }}
                />
              </div>

              {/* DYNAMIC CLICKABLE MIDPOINT NOTION (3000 mm Landmark Node) */}
              {activeTab === 'length' && (
                <button
                  type="button"
                  onClick={() => handleSliderChange(milestonePct)}
                  className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FAF3EC] border border-[#BC6C3D] shadow-sm hover:scale-125 transition-transform duration-150 z-10 top-1/2 -translate-y-1/6 cursor-pointer focus:outline-none"
                  style={{ 
                    left: `${milestonePct}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  title="Jump to 3000 mm"
                />
              )}

              {/* Dynamic Sliding Middle Thumb Node */}
              <div 
                className="absolute w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full border-[2.5px] sm:border-4 bg-[#BC6C3D] border-[#FAF3EC] shadow-md transition-all duration-100 pointer-events-none z-10 top-4/5 -translate-y-1/2"
                style={{ 
                  left: `${currentSliderPercentage}%`,
                  transform: 'translate(-50%, -50%)' 
                }}
              />

              {/* Functional Range input driving full values smoothly */}
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="any"
                value={currentSliderPercentage}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="w-full h-6 opacity-0 cursor-pointer relative z-20"
              />
            </div>

            {/* Boundary range metrics text layout */}
            <div className="flex justify-between items-center mt-2 sm:mt-3 text-[20px] text-[#7A7A7A] font-normal tracking-wide font-albert">
              <span>
                {activeTab === 'wall' ? `${limits.wall.min.toFixed(2)} mm` : activeTab === 'length' ? `${limits.length.min} mm` : `${limits.od.min} mm`}
              </span>
              <span>
                {activeTab === 'wall' ? `${limits.wall.max.toFixed(2)} mm` : activeTab === 'length' ? `${limits.length.max} mm` : `${limits.od.max} mm`}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}