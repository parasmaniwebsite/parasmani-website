import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

import od from "../../../assets/products/pancake/specificationImg1.png";
import standardlength from "../../../assets/products/pancake/specificationImg3.png";
import temper from "../../../assets/products/pancake/specificationImg4.png";

export default function SpecificationsSection() {
    const [activeTab, setActiveTab] = useState('od');

    // Discrete Fixed Milestone Steps for OD Selection
    const odSteps = [4.76, 6.35, 7.94, 9.53, 12.70, 15.88, 19.05, 22.23];
    const [odIndex, setOdIndex] = useState(0);
    const odValue = odSteps[odIndex];

    // Continuous tracking variables for Wall Thickness
    const [wallSliderVal, setWallSliderVal] = useState(0); // Driven scale (0 to 100)
    const limits = {
        wall: { min: 0.40, max: 1.20 }
    };

    // Helper function to map 0-100 percentage to a linear range
    const getLinearValue = (pct, min, max) => {
        return min + (pct / 100) * (max - min);
    };

    // Compute precise continuous wall readout on the fly
    const currentWall = getLinearValue(wallSliderVal, limits.wall.min, limits.wall.max);

    const specDetails = {
        od: {
            label: `OD: ${odValue.toFixed(2)} mm`,
            description: '3/16" to 7/8" outer diameter — covering all standard split AC, refrigeration, and industrial connection sizes.',
            image: od,
            alt: "Outer Diameter Visual Preview"
        },
        wall: {
            label: `${currentWall.toFixed(2)} mm`,
            description: "Available in a range of wall thickness. Lighter walls are supplied in pancake coils for split AC unit connections, and heavier walls for long runs and high-pressure applications.",
            alt: "Wall Thickness Geometric Ring Preview"
        },
        length: {
            label: "3 m – 16 m",
            description: "Standard coil length of 15.24m (50 ft). Custom lengths available on request to suit specific project requirements.",
            image: standardlength,
            alt: "Standard Length Visual Preview"
        },
        temper: {
            label: "Soft Annealed",
            description: "Bends freely by hand or with standard tube benders, and flares cleanly for compression and flare-type fittings, without cracking or splitting.",
            image: temper,
            alt: "Temper Visual Preview"
        }
    };

    // Custom tracking formula to snap nodes cleanly across arrays
    const getStepPercentage = (currentIdx, totalSteps) => (currentIdx / (totalSteps - 1)) * 100;

    /* DYNAMIC VECTOR WALL GEOMETRY CALCULATIONS */
    const outerRadius = 100;
    const computedStroke = 8 + (wallSliderVal / 100) * 27;
    const innerRadius = outerRadius - computedStroke;

    const currentOdPct = getStepPercentage(odIndex, odSteps.length);

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

                        {/* CATEGORY 1: SIZE RANGE (OD) */}
                        <div className="flex flex-col">
                            {activeTab !== 'od' ? (
                                <button
                                    onClick={() => setActiveTab('od')}
                                    className="flex justify-between items-center w-full py-3 sm:py-4 px-4 sm:px-6 rounded-full border border-gray-200 text-[#272727] text-sm bg-white hover:bg-gray-50 transition-all duration-300 font-albert"
                                >
                                    <span className="font-light text-[13.5px] sm:text-[15px]">Size Range</span>
                                    <Plus size={15} className="text-gray-400" />
                                </button>
                            ) : (
                                <div className="bg-white p-4 sm:p-6 rounded-[20px] border border-[#C68344]/40 w-full transition-all duration-300 shadow-sm">
                                    <span className="text-md text-[#C68344] font-normal block mb-1.5 text-[13.5px] sm:text-[15px] font-albert">
                                        OD: 4.76 mm - 22.23 mm
                                    </span>
                                    <p className="text-[12.5px] sm:text-[14px] text-[#454545] font-normal leading-relaxed">
                                        {specDetails.od.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* CATEGORY 2: WALL THICKNESS */}
                        <div className="flex flex-col">
                            {activeTab !== 'wall' ? (
                                <button
                                    onClick={() => setActiveTab('wall')}
                                    className="flex justify-between items-center w-full py-3 sm:py-4 px-4 sm:px-6 rounded-full border border-gray-200 text-[#272727] text-sm bg-white hover:bg-gray-50 transition-all duration-300 font-albert"
                                >
                                    <span className="font-light text-[13.5px] sm:text-[15px]">Wall Thickness</span>
                                    <Plus size={15} className="text-gray-400" />
                                </button>
                            ) : (
                                <div className="bg-white p-4 sm:p-6 rounded-[20px] border border-[#C68344]/40 w-full transition-all duration-300 shadow-sm">
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="text-md text-[#C68344] font-normal text-[13.5px] sm:text-[15px]">
                                            {limits.wall.min.toFixed(2)} mm to {limits.wall.max.toFixed(2)} mm
                                        </span>
                                        <Minus size={14} className="text-gray-400 cursor-pointer" onClick={() => setActiveTab('od')} />
                                    </div>
                                    <p className="text-[12.5px] sm:text-[14px] text-[#676767] font-normal leading-relaxed">
                                        {specDetails.wall.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* CATEGORY 3: COIL LENGTH */}
                        <div className="flex flex-col">
                            {activeTab !== 'length' ? (
                                <button
                                    onClick={() => setActiveTab('length')}
                                    className="flex justify-between items-center w-full py-3 sm:py-4 px-4 sm:px-6 rounded-full border border-gray-200 text-[#272727] text-sm bg-white hover:bg-gray-50 transition-all duration-300 font-albert"
                                >
                                    <span className="font-light text-[13.5px] sm:text-[15px]">Coil Length</span>
                                    <Plus size={15} className="text-gray-400" />
                                </button>
                            ) : (
                                <div className="bg-white p-4 sm:p-6 rounded-[20px] border border-[#C68344]/40 w-full transition-all duration-300 shadow-sm">
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="text-md text-[#C68344] font-normal text-[13.5px] sm:text-[15px]">
                                            {specDetails.length.label}
                                        </span>
                                        <Minus size={14} className="text-gray-400 cursor-pointer" onClick={() => setActiveTab('od')} />
                                    </div>
                                    <p className="text-[12.5px] sm:text-[14px] text-[#676767] font-normal leading-relaxed">
                                        {specDetails.length.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* CATEGORY 4: TEMPER */}
                        <div className="flex flex-col">
                            {activeTab !== 'temper' ? (
                                <button
                                    onClick={() => setActiveTab('temper')}
                                    className="flex justify-between items-center w-full py-3 sm:py-4 px-4 sm:px-6 rounded-full border border-gray-200 text-[#272727] text-sm bg-white hover:bg-gray-50 transition-all duration-300 font-albert"
                                >
                                    <span className="font-light text-[13.5px] sm:text-[15px]">Temper</span>
                                    <Plus size={15} className="text-gray-400" />
                                </button>
                            ) : (
                                <div className="bg-white p-4 sm:p-6 rounded-[20px] border border-[#C68344]/40 w-full transition-all duration-300 shadow-sm">
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="text-md text-[#C68344] font-normal text-[13.5px] sm:text-[15px]">
                                            {specDetails.temper.label}
                                        </span>
                                        <Minus size={14} className="text-gray-400 cursor-pointer" onClick={() => setActiveTab('od')} />
                                    </div>
                                    <p className="text-[12.5px] sm:text-[14px] text-[#676767] font-normal leading-relaxed">
                                        {specDetails.temper.description}
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* ================= RIGHT INTERACTIVE SCALE WORKBENCH ================= */}
                <div className="lg:col-span-7 w-full h-[430px] sm:h-[570px] lg:h-[640px] bg-[#F9F3EC] rounded-2xl border border-[#F2E5D9] overflow-hidden p-4 sm:p-8 relative flex flex-col justify-between order-2">

                    {/* Header Metadata Display */}
                    <div className="w-full flex justify-between items-center relative z-10">
                        <span className="font-albert text-[11px] sm:text-[15px] tracking-wider text-[#373737] uppercase font-light">
                            Scale Preview
                        </span>
                        <div className="px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#C68344] text-[12px] sm:text-[16px] font-medium text-[#9C9C9C] bg-[#F9F3EC]/80 backdrop-blur-sm">
                            <span className='text-[#272727] font-light mr-1'>
                                {activeTab === 'od' && `${odValue.toFixed(2)} mm`}
                                {activeTab === 'wall' && `${currentWall.toFixed(2)} mm`}
                                {activeTab === 'length' && `3 m – 16 m`}
                                {activeTab === 'temper' && `Soft Annealed`}
                            </span>
                            <span className='text-[#9C9C9C] font-light mr-1'>
                                {activeTab === 'wall' ? 'Thickness' : activeTab === 'length' ? 'Length' : activeTab === 'temper' ? '' : 'O.D.'}
                            </span>
                        </div>
                    </div>

                    {/* 
            ================= DYNAMIC CENTRAL PREVIEW WINDOW FRAME ================= 
            If the active tab is 'temper', we clear the standard padded absolute bounds (top-14 bottom-24 px-4)
            and let the inner container span the absolute bottom-right corner ('inset-0 justify-end items-end').
          */}
                    <div className={`absolute z-0 flex pointer-events-none overflow-hidden transition-all duration-300 ${activeTab === 'temper'
                            ? 'inset-0 justify-end items-center sm:items-end p-0'
                            : activeTab === 'length'
                                ? 'inset-x-0 px-1 sm:px-2 top-9 sm:top-10 bottom-1 justify-center items-center'
                                : 'inset-x-0 px-2 sm:px-4 top-10 sm:top-12 bottom-20 sm:bottom-24 justify-center items-center'
                        }`}>
                        {activeTab === 'wall' ? (
                            <div className="w-full h-full flex items-center justify-center">
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
                        ) : (
                            <img
                                key={activeTab}
                                src={specDetails[activeTab].image}
                                alt={specDetails[activeTab].alt}
                                style={{
                                    transform:
                                        activeTab === 'od' ? `scale(${0.5 + (currentOdPct / 100) * 0.6})` : 'none'
                                }}
                                className={`transition-transform duration-300 ease-out select-none pointer-events-none object-contain
                  ${activeTab === 'od' ? 'w-full h-full max-w-[115%] max-h-[270px] sm:max-h-[380px] md:max-h-[450px]' : ''}
                  ${activeTab === 'length' ? 'w-full h-full max-w-full max-h-full' : ''}
                  ${activeTab === 'temper' ? 'w-full sm:w-[95%] md:w-[92%] h-auto object-right-bottom ml-auto translate-y-4 sm:translate-y-6 lg:translate-y-8' : ''}
                `}
                            />
                        )}
                    </div>

                    {/* Bottom Dynamic Interactive Slider Control Track Station */}
                    <div className={`w-full max-w-xl mx-auto px-1 pb-1 relative z-10 mt-auto transition-all duration-300 ${['length', 'temper'].includes(activeTab) ? 'opacity-0 pointer-events-none h-0 pt-0 overflow-hidden' : 'opacity-100'}`}>

                        {/* FIXED STEP INTERACTIVE CONTROLLER FOR SIZE RANGE (OD) */}
                        {activeTab === 'od' && (
                            <div className="w-full flex flex-col">
                                {/* px-4 gutter gives the centred tooltip room at either extreme */}
                                <div className="relative w-full mb-5 px-4 sm:px-6 flex items-center select-none pt-4 h-6">
                                    <div className="relative w-full h-full flex items-center">
                                        {/* Centred Floating Dynamic Tooltip Bubble */}
                                        <div
                                            className="absolute bottom-full mb-7 pointer-events-none z-30 flex flex-col items-center transition-all duration-200"
                                            style={{
                                                left: `${currentOdPct}%`,
                                                transform: 'translateX(-50%)'
                                            }}
                                        >
                                            <div className="bg-[#BC6C3D] text-white text-[12px] font-medium px-2.5 py-0.5 sm:py-1 rounded-lg shadow-md whitespace-nowrap relative flex items-center justify-center min-w-[50px] text-center h-[24px] sm:h-[28px]">
                                                {odValue.toFixed(2)} mm
                                                {/* Arrow Pin */}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#BC6C3D] sm:border-l-[5px] sm:border-r-[5px] sm:border-t-[5px]" />
                                            </div>
                                        </div>

                                        {/* Underlay Track Rails */}
                                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-[#E9D6C5] rounded-full">
                                            <div
                                                className="h-full bg-[#BC6C3D] rounded-full transition-all duration-200"
                                                style={{ width: `${currentOdPct}%` }}
                                            />
                                        </div>

                                        {/* Dynamic Sliding Middle Thumb Node */}
                                        <div
                                            className="absolute w-4 h-4 rounded-full border-[3px] bg-[#BC6C3D] border-[#FAF3EC] shadow-md transition-all duration-100 pointer-events-none z-20 top-1/2"
                                            style={{
                                                left: `${currentOdPct}%`,
                                                transform: 'translate(-50%, -50%)'
                                            }}
                                        />

                                        {/* Range Slider input mapped directly to index landmarks */}
                                        <input
                                            type="range"
                                            min="0"
                                            max={odSteps.length - 1}
                                            step="1"
                                            value={odIndex}
                                            onChange={(e) => setOdIndex(parseInt(e.target.value))}
                                            className="w-full h-full opacity-0 cursor-pointer relative z-30"
                                        />
                                    </div>
                                </div>

                                {/* Step Labels — anchored to the same track percentages as the thumb */}
                                <div className="relative w-full h-4 px-4 sm:px-6 text-[10px] sm:text-xs font-light font-albert pb-1">
                                    {odSteps.map((step, idx) => {
                                        const pct = getStepPercentage(idx, odSteps.length);
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => setOdIndex(idx)}
                                                style={{ left: `${pct}%`, transform: `translateX(-${pct}%)` }}
                                                className={`absolute top-0 transition-colors duration-200 hover:text-[#BC6C3D] focus:outline-none whitespace-nowrap ${odIndex === idx ? 'text-[#BC6C3D] font-bold' : 'text-[#7A7A7A] font-normal'
                                                    }`}
                                            >
                                                {step.toFixed(2)}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* CONTINUOUS CONTROLLER FOR WALL THICKNESS */}
                        {activeTab === 'wall' && (
                            <div className="w-full flex flex-col">
                                {/* px-4 gutter gives the centred tooltip room at either extreme */}
                                <div className="relative w-full mb-5 pt-4 px-4 sm:px-6 flex items-center h-6">
                                    <div className="relative w-full h-full flex items-center">
                                        {/* Centred Floating Tooltip Bubble Container */}
                                        <div
                                            className="absolute bottom-full mb-7 pointer-events-none z-30 flex flex-col items-center"
                                            style={{
                                                left: `${wallSliderVal}%`,
                                                transform: 'translateX(-50%)'
                                            }}
                                        >
                                            <div className="bg-[#BC6C3D] text-white text-[12px] font-medium px-2.5 py-0.5 sm:py-1 rounded-lg shadow-md whitespace-nowrap relative flex items-center justify-center min-w-[50px] text-center h-[24px] sm:h-[28px]">
                                                {currentWall.toFixed(2)} mm
                                                {/* Arrow Pin */}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#BC6C3D] sm:border-l-[5px] sm:border-r-[5px] sm:border-t-[5px]" />
                                            </div>
                                        </div>

                                        {/* Underlay Track Rails */}
                                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-[#E9D6C5] rounded-full">
                                            <div
                                                className="h-full bg-[#BC6C3D] rounded-full"
                                                style={{ width: `${wallSliderVal}%` }}
                                            />
                                        </div>

                                        {/* Dynamic Sliding Middle Thumb Node */}
                                        <div
                                            className="absolute w-4 h-4 rounded-full border-[3px] bg-[#BC6C3D] border-[#FAF3EC] shadow-md pointer-events-none z-20 top-1/2"
                                            style={{
                                                left: `${wallSliderVal}%`,
                                                transform: 'translate(-50%, -50%)'
                                            }}
                                        />

                                        {/* Range Slider input driving full values smoothly */}
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            step="any"
                                            value={wallSliderVal}
                                            onChange={(e) => setWallSliderVal(Number(e.target.value))}
                                            className="w-full h-full opacity-0 cursor-pointer relative z-30"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between px-4 sm:px-6 text-xs sm:text-sm text-[#231F20]/70 font-light font-albert">
                                    <span className="cursor-pointer hover:text-[#BC6C3D] transition-colors" onClick={() => setWallSliderVal(0)}>
                                        {limits.wall.min.toFixed(2)} mm
                                    </span>
                                    <span className="cursor-pointer hover:text-[#BC6C3D] transition-colors" onClick={() => setWallSliderVal(100)}>
                                        {limits.wall.max.toFixed(2)} mm
                                    </span>
                                </div>
                            </div>
                        )}

                    </div>

                </div>

            </div>
        </section>
    );
}
