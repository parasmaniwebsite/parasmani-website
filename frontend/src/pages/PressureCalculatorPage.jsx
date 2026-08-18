import HeaderBanner from "./pressureCalculator/HeaderBanner";
import PressureCalculator from "./pressureCalculator/PressureCalculator";

const PressureCalculatorPage = () => {


    return (
        <div className="min-h-screen bg-[#FBFAF8]">
            <HeaderBanner />

            <div className="h-full w-full bg-white py-20">

                <PressureCalculator />
            </div>
        </div>
    );
};

export default PressureCalculatorPage;
