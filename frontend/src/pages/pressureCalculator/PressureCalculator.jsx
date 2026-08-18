import { useState } from 'react';
import TubePreview from './TubePreview';
import DimensionInputs from './DimensionInputs';
import ResultPanel from './ResultPanel';
import EngineeringNote from './EngineeringNote';
import { useBarlowCalculation } from '../hooks/useBarlowCalculation';

const PressureCalculator = () => {
  const [od, setOd] = useState('');
  const [wall, setWall] = useState('');
  const [odUnit, setOdUnit] = useState('mm');
  const [wallUnit, setWallUnit] = useState('mm');
  const [temper, setTemper] = useState('hard-drawn');

  const calc = useBarlowCalculation({ od, wall, odUnit, wallUnit, temperId: temper });

  // Preview reads the clamped dimensions the calculation actually used.
  const { odMm, wallMm, innerDiameter: idMm } = calc;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 bg-white select-none">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tube Dimensions Card */}
        <section className="bg-white border border-[#5C5C5C] rounded-xl overflow-hidden flex flex-col">
          <div className="bg-[#E8E9ED] text-[#272727] font-albert text-center text-[20px] sm:text-[24px] font-normal py-2 px-4">
            Tube Dimensions
          </div>
          <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
            <TubePreview od={odMm} wall={wallMm} id={idMm} />
            <DimensionInputs
              od={od}
              setOd={setOd}
              wall={wall}
              setWall={setWall}
              odUnit={odUnit}
              setOdUnit={setOdUnit}
              wallUnit={wallUnit}
              setWallUnit={setWallUnit}
              temper={temper}
              setTemper={setTemper}
            />
          </div>
        </section>

        {/* Result Card */}
        <section className="bg-white border rounded-xl overflow-hidden font-albert border-[#C68344] text-[#272727] flex flex-col">
          <div className="bg-orange-50 text-[#272727] font-albert text-center text-[20px] sm:text-[24px] font-normal py-2 px-4">
            Result
          </div>
          <div className="p-4 sm:p-6 flex-1">
            <ResultPanel results={calc} />
          </div>
        </section>
      </div>


      <div className="mt-6 mb-8 md:mb-10">
        <EngineeringNote />
      </div>

      <p className="font-albert text-center text-[12px] sm:text-[14px] text-[#646C88] pb-8 max-w-4xl mx-auto leading-relaxed px-2">
        Disclaimer: The Copper Tube Pressure Calculator is provided by Parasmani Tubes Copper
        Pvt. Ltd. for reference only. Results are indicative, and actual working pressures may
        vary due to manufacturing tolerances and application conditions. Calculations should be
        independently verified before use.
      </p>
    </div>
  );
};

export default PressureCalculator;
