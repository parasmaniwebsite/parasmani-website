import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const UnitConverter = () => {
    const navigate = useNavigate()
  return (
    <div className="border border-[#C68344] rounded-lg px-4 py-3 flex items-center justify-between gap-0">
      <div>
        <p className="text-[12px] font-medium font-albert text-[#272727] mb-3">Parasmani Unit Converter</p>
        <p className="text-[12px] font-medium font-albert text-[#5C5C5C] tracking-wide">
          Convert between Bar, PSI, MPa and kPa instantly.
        </p>
      </div>
      <button
  type="button"
      onClick={() => navigate('/unit-converter')}
  className="flex items-center gap-2 whitespace-nowrap text-[12px] font-medium font-albert text-[#5C5C5C] "
>
  Open Unit Converter
  <FaArrowRightLong size={15} />
</button>
    </div>
  );
};

export default UnitConverter;
