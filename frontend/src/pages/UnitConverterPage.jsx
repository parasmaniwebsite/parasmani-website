import UnitConverterBanner from "./unitConverter/UnitConverterBanner";
import UnitConverter from "./unitConverter/UnitConverter";

const UnitConverterPage = () => {
  return (
    <div className="min-h-screen bg-[#FBFAF8]">
      <UnitConverterBanner />

      <div className="w-full bg-white py-16 md:py-20">
        <UnitConverter />
      </div>
    </div>
  );
};

export default UnitConverterPage;
