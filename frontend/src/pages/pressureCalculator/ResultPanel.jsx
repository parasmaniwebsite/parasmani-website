import React from "react";
import { MPA_TO } from "../data/tempers";
import UnitConverter from "./UnitConverter";

const BLANK = "—";

// PSI and kPa read as whole numbers with thousands separators; MPa keeps 2 dp,
// otherwise a ~20 MPa working pressure would round away to a bare integer.
const UNIT_PILLS = [
  { key: "psi", label: "PSI", format: (mpa) => Math.round(mpa * MPA_TO.psi).toLocaleString() },
  { key: "mpa", label: "MPa", format: (mpa) => mpa.toFixed(2) },
  { key: "kpa", label: "kPa", format: (mpa) => Math.round(mpa * MPA_TO.kpa).toLocaleString() },
];

const PressureUnitPills = ({ valueInMpa, isValid }) => (
  <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
    {UNIT_PILLS.map(({ key, label, format }) => (
      <span
        key={key}
        className="text-[11px] sm:text-[12px] px-2.5 py-1 bg-gray-50 border font-medium rounded-full border-[#CFCFCF] text-[#676767]"
      >
        {isValid ? format(valueInMpa) : BLANK} {label}
      </span>
    ))}
  </div>
);

const ResultPanel = ({ results }) => {
  const {
    isValid,
    workingPressureMpa,
    burstPressureMpa,
    workingPressureBar,
    burstPressureBar,
    safetyFactor,
    todRatio,
    uts,
  } = results;

  return (
    <div className="w-full">
      <div className="mb-5 pb-5 border-b border-[#E6E6E6]">
        <p className="text-[12px] sm:text-[14px] font-light tracking-wide text-[#646C88] mb-1 font-albert uppercase">
          Maximum Working Pressure
        </p>
        <p className="font-obviously text-2xl sm:text-3xl font-medium text-[#272727] tracking-tight">
          {isValid ? workingPressureBar.toFixed(1) : BLANK}{" "}
          <span className="font-albert text-[18px] sm:text-[20px] font-medium text-[#272727]">
            Bar
          </span>
        </p>
        <PressureUnitPills valueInMpa={workingPressureMpa} isValid={isValid} />
      </div>

      <div className="mb-5 pb-5 border-b border-[#E6E6E6]">
        <p className="text-[11px] font-semibold tracking-wide text-gray-400 mb-1 uppercase">
          Bursting Pressure
        </p>
        <p className="font-obviously text-2xl sm:text-3xl font-medium text-[#272727] tracking-tight">
          {isValid ? burstPressureBar.toFixed(1) : BLANK}{" "}
          <span className="font-albert text-[18px] sm:text-[20px] font-medium text-[#272727]">
            Bar
          </span>
        </p>
        <PressureUnitPills valueInMpa={burstPressureMpa} isValid={isValid} />
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 font-albert text-center sm:text-left">
        <div className="border-r border-[#B8B8B8] pr-1 sm:p-2">
          <p className="text-[11px] sm:text-[13px] md:text-[14px] font-normal tracking-wide text-[#454545] mb-1 leading-tight">
            SAFETY FACTOR
          </p>
          <p className="text-[12px] sm:text-[14px] font-semibold text-[#888888]">
            {isValid ? `${safetyFactor}×` : BLANK}
          </p>
        </div>
        <div className="border-r border-[#B8B8B8] px-1 sm:p-2">
          <p className="text-[11px] sm:text-[13px] md:text-[14px] font-normal tracking-wide text-[#454545] mb-1 leading-tight">
            T/OD RATIO
          </p>
          <p className="text-[12px] sm:text-[14px] font-semibold text-[#888888]">
            {isValid ? todRatio.toFixed(3) : BLANK}
          </p>
        </div>
        <div className="pl-1 sm:p-2">
          <p className="text-[11px] sm:text-[13px] md:text-[14px] font-normal tracking-wide text-[#454545] mb-1 leading-tight">
            UTS
          </p>
          <p className="text-[12px] sm:text-[14px] font-semibold text-[#888888]">
            {isValid ? uts : BLANK}{" "}
            <span className="text-[10px] sm:text-[12px] font-normal">MPa</span>
          </p>
        </div>
      </div>

      <div className="bg-[#F9F3EC] rounded-lg p-3 sm:p-4 mb-5 border border-[#F2E5D9]">
        <p className="text-[12px] sm:text-[13px] font-albert font-medium tracking-wide text-[#272727] mb-2 uppercase">
          Modified Barlow's Equation
        </p>

        {/* Scroll Containment Zone for Dynamic Formulas */}
        <div className="overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="flex items-center gap-3 whitespace-nowrap min-w-max font-albert py-2 text-gray-800">
            {/* P burst */}
            <div className="flex items-end gap-[4px]">
              <span className="text-[18px] sm:text-[20px] font-light">P</span>
              <span className="text-[10px] mb-[2px] font-medium text-gray-500">burst</span>
            </div>

            <span className="text-[16px] sm:text-[18px] text-gray-400">=</span>

            {/* Fraction */}
            <div className="flex flex-col items-center leading-none px-1">
              <div className="border-b border-[#2B2B2B] pb-1.5 mb-1">
                <span className="text-[16px] sm:text-[18px] tracking-wide">2 · UTS · t</span>
              </div>
              <span className="text-[16px] sm:text-[18px] tracking-wide">D − 0.8 t</span>
            </div>

            {/* Separator Dot */}
            <span className="text-gray-300 mx-1.5 text-xl">•</span>

            {/* P working */}
            <div className="flex items-end gap-[4px]">
              <span className="text-[18px] sm:text-[20px] font-light">P</span>
              <span className="text-[10px] mb-[2px] font-medium text-gray-500">working</span>
            </div>

            <span className="text-[16px] sm:text-[18px] text-gray-400">=</span>

            {/* P burst / SF */}
            <div className="flex items-end gap-[4px]">
              <span className="text-[18px] sm:text-[20px] font-light">P</span>
              <span className="text-[10px] mb-[2px] font-medium text-gray-500">burst</span>
            </div>

            <span className="text-[16px] sm:text-[18px] font-medium text-[#BC6C3D]">/ SF</span>
          </div>
        </div>
      </div>

      <UnitConverter />
    </div>
  );
};

export default ResultPanel;
