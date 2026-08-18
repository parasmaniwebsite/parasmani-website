import React from 'react';

const TubePreview = ({ od, wall, id }) => {
  const odNum = parseFloat(od) || 0;
  const wallNum = parseFloat(wall) || 0;
  const idNum = parseFloat(id) || 0;

  // Preserve your exact proportional scaling constraints
  const ratio = odNum > 0 ? Math.min(Math.max(wallNum / odNum, 0.04), 0.28) : 0.12;

  const size = 140;
  const center = size / 2;
  
  // Calculate distinct outer and inner radii to apply separate radial gradients
  const outerR = size / 2 - 4; // 4px padding so drop-shadow / strokes don't clip
  const computedStrokeWidth = ratio * size;
  const innerR = Math.max(10, outerR - computedStrokeWidth);

  return (
    <div className="flex flex-col items-center mb-6 sm:mb-10 w-full">
      <p className="text-[12px] sm:text-[14px] font-light tracking-wide text-[#646C88] mb-4 text-center font-albert max-w-xs sm:max-w-none uppercase">
        Cross-Section Showing OD &amp; Wall Thickness (Illustrative)
      </p>
      
      <div className="flex items-center justify-center">
        <svg 
          width={size} 
          height={size} 
          viewBox={`0 0 ${size} ${size}`}
          className="filter drop-shadow-[0_8px_16px_rgba(61,26,8,0.35)]"
        >
          <defs>
            {/* Asymmetric 3D Metallic Copper Gradient */}
            <radialGradient id="preview-copper-grad" cx="35%" cy="35%" r="75%">
              <stop offset="0%" stopColor="#f2a07a" />
              <stop offset="35%" stopColor="#eb8048" />
              <stop offset="70%" stopColor="#b55233" />
              <stop offset="100%" stopColor="#3d1a08" />
            </radialGradient>
            
            {/* Deep Dimensional Inner Bore Gradient */}
            <radialGradient id="preview-bore-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0c1230" />
              <stop offset="100%" stopColor="#000510" />
            </radialGradient>
          </defs>

          {/* Outer circle - Copper Pipe Profile */}
          <circle
            cx={center}
            cy={center}
            r={outerR}
            fill="url(#preview-copper-grad)"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="0.5"
            className="transition-all duration-150 ease-out"
          />

          {/* Inner hole - Deep Core Dark Bore */}
          <circle
            cx={center}
            cy={center}
            r={innerR}
            fill="url(#preview-bore-grad)"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="0.4"
            className="transition-all duration-150 ease-out"
          />

          {/* Center Axis Guideline */}
          <line 
            x1={center - outerR} 
            y1={center} 
            x2={center + outerR} 
            y2={center} 
            stroke="rgba(0,0,0,0.12)" 
            strokeWidth="0.5" 
            strokeDasharray="2,2"
            className="transition-all duration-150 ease-out"
          />

          {/* Wall Thickness Blueprint Ruler line */}
          <line 
            x1={center + innerR} 
            y1={center} 
            x2={center + outerR} 
            y2={center} 
            stroke="#19234D" 
            strokeWidth="1.5"
            className="transition-all duration-150 ease-out"
          />

          {/* Blueprint Measurement Dots */}
          <circle cx={center + innerR} cy={center} r="1.5" fill="#19234D" className="transition-all duration-150 ease-out" />
          <circle cx={center + outerR} cy={center} r="1.5" fill="#19234D" className="transition-all duration-150 ease-out" />
        </svg>
      </div>
      
      {/* Dynamic responsive badge array tags mapping layout logic */}
      <div className="flex flex-wrap items-center justify-center gap-2 font-albert mt-4 w-full">
        <span className="text-[11px] sm:text-[12px] px-2.5 py-1 bg-white border font-medium rounded-full border-[#CFCFCF] text-[#676767] shadow-sm">
          OD: {odNum ? odNum.toFixed(2) : '00.00'} mm
        </span>
        <span className="text-[11px] sm:text-[12px] px-2.5 py-1 bg-white border font-medium rounded-full border-[#CFCFCF] text-[#676767] shadow-sm">
          Wall: {wallNum ? wallNum.toFixed(2) : '00.00'} mm
        </span>
        <span className="text-[11px] sm:text-[12px] px-2.5 py-1 bg-white border font-medium rounded-full border-[#CFCFCF] text-[#676767] shadow-sm">
          ID: {idNum ? idNum.toFixed(2) : '00.00'} mm
        </span>
      </div>
    </div>
  );
};

export default TubePreview;