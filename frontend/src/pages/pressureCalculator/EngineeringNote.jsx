import React from 'react';

const EngineeringNote = () => {
  return (
    <div className="border border-[#B7BBC8] rounded-xl px-4 sm:px-6 md:px-10 py-4 bg-slate-50/30">
      <p className="font-albert text-[16px] sm:text-[18px] md:text-[20px] font-medium text-[#646C88] mb-1.5">
        Engineering Note:
      </p>
      <p className="font-albert text-[13px] sm:text-[14px] font-normal text-[#545F7E] leading-relaxed">
        Burst pressure is calculated using the modified Barlow's equation: P = 2 · UTS · t / (D − 0.8t). 
        Maximum working pressure equals burst pressure divided by the safety factor. UTS values are 
        room-temperature minimums and may need derating at elevated service temperatures. Always 
        validate against your project specification and the latest Parasmani submittal sheet.
      </p>
    </div>
  );
};

export default EngineeringNote;