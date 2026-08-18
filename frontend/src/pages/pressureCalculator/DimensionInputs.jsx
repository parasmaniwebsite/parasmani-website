import React from 'react';
import { TEMPERS } from '../data/tempers';
import { SWG_TO_MM, WALL_MIN_MM, WALL_MAX_MM } from '../utils/unitConversion';

// Only gauges inside the calculator's wall range (10–30 SWG); offering one
// outside it would just get clamped, and offering one absent from SWG_TO_MM
// would resolve the wall to 0 and silently blank the result panel.
const SWG_OPTIONS = Object.entries(SWG_TO_MM)
  .filter(([, mm]) => mm >= WALL_MIN_MM && mm <= WALL_MAX_MM)
  .map(([gauge, mm]) => ({ value: gauge, label: `SWG ${gauge} (${mm.toFixed(3)} mm)` }));

const UnitToggle = ({ options, value, onChange }) => (
  <div className="inline-flex rounded-md border border-[#B8B8B8] overflow-hidden text-[13px] sm:text-[14px] font-normal shrink-0">
    {options.map((opt, idx) => (
      <button
        key={opt}
        type="button"
        onClick={() => onChange(opt)}
        className={`px-3 py-2 transition-colors ${
          value === opt ? 'bg-[#18234D] text-white' : 'bg-white text-[#18234D] hover:bg-slate-50'
        } ${idx !== 0 ? 'border-l border-[#B8B8B8]' : ''}`}
      >
        {opt}
      </button>
    ))}
  </div>
);

const DimensionInputs = ({
  od,
  setOd,
  wall,
  setWall,
  odUnit,
  setOdUnit,
  wallUnit,
  setWallUnit,
  temper,
  setTemper,
}) => {
  
  // Intercept unit change to supply a valid default gauge state if switching to SWG
  const handleWallUnitChange = (newUnit) => {
    setWallUnit(newUnit);
    if (newUnit === 'SWG') {
      // Defaults cleanly to SWG 18 if no current selection matches an SWG value
      const isValidSWG = SWG_OPTIONS.some(opt => opt.value === wall);
      if (!isValidSWG) {
        setWall('18');
      }
    }
  };

  return (
    <div className="w-full">
      {/* Outer Diameter Input */}
      <div className="mb-4 sm:mb-5">
        <label className="block text-[11px] sm:text-[12px] font-semibold tracking-wide text-[#272727] font-albert mb-1.5 uppercase">
          Outer Diameter (OD)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={od}
            onChange={(e) => setOd(e.target.value)}
            placeholder="e.g. 15.88"
            className="flex-1 min-w-0 px-3 py-2 rounded-md border border-gray-200 text-[14px] text-gray-700 placeholder-[#B8B8B8] font-albert focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-[#C68344]"
          />
          <UnitToggle options={['mm', 'in']} value={odUnit} onChange={setOdUnit} />
        </div>
      </div>

      {/* Wall Thickness Conditional Layout Box */}
      <div className="mb-5">
        <label className="block text-[11px] sm:text-[12px] font-semibold tracking-wide text-[#272727] font-albert mb-1.5 uppercase">
          Wall Thickness (T)
        </label>
        <div className="flex items-center gap-2">
          {wallUnit === 'SWG' ? (
            <select
              value={wall}
              onChange={(e) => setWall(e.target.value)}
              className="flex-1 min-w-0 px-3 py-2.5 rounded-md border border-gray-200 bg-white text-[14px] text-gray-700 font-albert focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-[#C68344] cursor-pointer appearance-none"
              style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23676767\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'/%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
            >
              {SWG_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="number"
              value={wall}
              onChange={(e) => setWall(e.target.value)}
              placeholder="e.g. 1.00"
              className="flex-1 min-w-0 px-3 py-2 rounded-md border border-gray-200 text-[14px] text-gray-700 placeholder-[#B8B8B8] font-albert focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-[#C68344]"
            />
          )}
          <UnitToggle 
            options={['mm', 'in', 'SWG']} 
            value={wallUnit} 
            onChange={handleWallUnitChange} 
          />
        </div>
      </div>

      {/* Temper Array Grid Layout Container Area */}
      <div>
        <label className="block text-[11px] sm:text-[12px] font-semibold tracking-wide text-[#272727] font-albert mb-2 uppercase">
          Temper
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {TEMPERS.map((t) => {
            const active = temper === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTemper(t.id)}
                className={`text-left px-3.5 py-2.5 rounded-md border transition-all duration-200 focus:outline-none ${
                  active
                    ? 'border-[#C68344] bg-orange-50/10 ring-1 ring-[#C68344]'
                    : 'border-[#B8B8B8] bg-white hover:border-gray-400'
                }`}
              >
                <div className="font-albert text-[13px] sm:text-[14px] font-normal text-[#454545] leading-tight mb-0.5">
                  {t.label}
                </div>
                <div className={`font-albert text-[11px] sm:text-[12px] ${active ? 'text-[#C68344] font-medium' : 'text-[#A3A3A3]'}`}>
                  {t.spec}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DimensionInputs;