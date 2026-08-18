import React, { useState } from "react";

// Asset Image Imports
import ColdStorage from "../../../assets/industries/IndustrialAndProcessApplications/coldStorage.png";
import FoodBeverage  from "../../../assets/industries/IndustrialAndProcessApplications/foodBeverage.png";
import LifeSciences from "../../../assets/industries/IndustrialAndProcessApplications/life.png";
import ProcessIndustrial from "../../../assets/industries/IndustrialAndProcessApplications/process.png";
import Infrastructure from "../../../assets/industries/IndustrialAndProcessApplications/infrastructure.png";

/**
 * Reusable Functional Sub-Component for individual Grid Cards
 */
function ApplicationCard({ title, description, tags }) {
  return (
    <div className="group bg-[#F5F0EA]/60 border border-[#E6DEC2]/30 hover:bg-[#FFFFFF] hover:border-[#C48A54] rounded-[14px] p-6 sm:p-7 flex flex-col justify-between shadow-none hover:shadow-sm min-h-[220px] sm:min-h-[250px] transition-all duration-300 cursor-pointer font-albert">
      <div>
        <h3 className="text-[24px]  font-normal text-[#272727] tracking-tight mb-2.5 sm:mb-4">
          {title}
        </h3>
        <p className="text-[14px] leading-[1.55] text-[#18234D] font-normal tracking-normal mb-4 sm:mb-6">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-[12px] font-medium px-2.5 sm:px-3 py-1 rounded-full border border-[#C1B7AD] text-[#18234D] whitespace-nowrap transition-colors duration-300 group-hover:border-[#C48A54] group-hover:text-[#4A4A4A]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function IndustrialApplications() {
  const [activeTab, setActiveTab] = useState("cold-storage");

  const tabData = [
    { id: "cold-storage", label: "Cold Storage", imgSource: ColdStorage },
    { id: "food-beverage", label: "Food & Beverage", imgSource: FoodBeverage },
    { id: "life-sciences", label: "Life Sciences", imgSource: LifeSciences },
    { id: "process-industrial", label: "Process & Industrial", imgSource: ProcessIndustrial },
    { id: "infrastructure", label: "Infrastructure", imgSource: Infrastructure },
  ];

  const cardsContent = {
    "cold-storage": [
      {
        title: "Blast Freezers",
        description: "Industrial blast freezing units operating at -30°C to -40°C. Large OD hard tubes for refrigerant headers, smaller ODs for evaporator circuits. High-pressure R404A or R448A systems.",
        tags: ["R404A / R448A", "-40°C Rated", "Large OD Headers"],
      },
      {
        title: "Walk-in Cold Rooms & Freezers",
        description: "Commercial and industrial cold room installations for food storage, warehousing, and distribution. Copper evaporator coils, condensate headers, and connecting pipework.",
        tags: ["R134a / R404A", "All Sizes", "Pancake + Hard Tube"],
      },
      {
        title: "Supermarket Cold Chain",
        description: "Display case refrigeration, back-of-store cold rooms, and centralised refrigeration plant for supermarkets and retail chains. Parasmani tubes for connecting pipework and evaporator circuits.",
        tags: ["R449A / R404A", "Multi-circuit", "Pan-India Supply"],
      },
      {
        title: "Cold Storage Warehouses",
        description: "Large-scale cold storage facilities for agricultural produce, frozen foods, and temperature-sensitive cargo. Bulk supply for project-scale installations with consistent batch quality.",
        tags: ["Project Quantities", "MTC Available", "Bulk Pricing"],
      },
      {
        title: "Ice Plants & Ice Making",
        description: "Industrial ice manufacturing for fishing, hospitality, construction, and food processing. Copper evaporator coils and brine circuit piping for block and flake ice plants.",
        tags: ["R22 / R404A", "Brine Compatible", "All ODs"],
      },
    ],
    "food-beverage": [
      {
        title: "Dairy Processing",
        description: "Milk chilling, pasteurisation heat exchangers, and cooling coils in dairy plants. Copper's thermal conductivity and hygienic surface make it ideal for temperature-critical dairy processing stages.",
        tags: ["Heat Exchangers", "Pasteurisation", "Hygienic Grade"],
      },
      {
        title: "Breweries & Distilleries",
        description: "Copper is the traditional and still-preferred material in brewing and distillation. Wort chillers, condenser coils, cooling jackets, and glycol chilling circuits in breweries and distilleries.",
        tags: ["Wort Chillers", "Condenser Coils", "Glycol Circuits"],
      },
      {
        title: "Sugar Industry",
        description: "Copper and brass tubes have been used in sugar mills for decades. Evaporators processing cane juice to high-grade sugar require large OD tubes capable of handling high-temperature steam and process fluids.",
        tags: ["Large OD Tubes", "Evaporators", "High Temp Service"],
      },
      {
        title: "Confectionery & Bakery",
        description: "Chocolate tempering, cooling tunnels, and ingredient cold storage. Copper tubes for chilling circuits in confectionery production lines.",
        tags: ["Cooling Tunnels", "Glycol Chillers", "Process Cooling"],
      },
    ],
    "life-sciences": [
      {
        title: "Blood Banks",
        description: "Temperature-controlled storage for blood and blood products requires validated, reliable refrigeration systems. Parasmani copper tubes for blood bank cold room refrigerant circuits — precisely controlled between +2°C and +6°C.",
        tags: ["+2°C to +6°C", "Validated Systems", "MTC"],
      },
      {
        title: "Pharma Cold Chain",
        description: "GMP-compliant cold storage for temperature-sensitive pharmaceutical products, vaccines, and biologics. Copper tubes for refrigeration circuits in validated pharmaceutical warehouses and distribution centres.",
        tags: ["GMP Compliant", "Validated Cold Chain"],
      },
      {
        title: "Pharma Manufacturing",
        description: "Process cooling in pharmaceutical manufacturing — API production, tablet coating cooling, fermentation temperature control. Copper tubes for chilled water and refrigerant circuits in clean manufacturing environments.",
        tags: ["Process Cooling", "Clean Environment", "GMP"],
      },
      {
        title: "Research & Biomedical Labs",
        description: "Ultra-low temperature storage, cryogenic sample preservation, and laboratory cooling systems. Copper's performance at extreme sub-zero temperatures makes it suitable for biomedical research cold chain infrastructure.",
        tags: ["Ultra-Low Temp", "Lab Grade", "All Sizes"],
      },
      {
        title: "Hospital Central Chilled Water",
        description: "Central chiller plant piping for hospital building cooling and medical equipment temperature control. Large OD hard copper tubes for chilled water and refrigerant distribution mains within hospital complexes.",
        tags: ["Large OD", "Half Hard", "Hospital Projects"],
      },
      {
        title: "Vaccine Storage & Distribution",
        description: "Cold chain copper piping for vaccine cold rooms and distribution hubs. Reliable temperature maintenance between +2°C and +8°C for WHO-EPI compliant vaccine storage facilities.",
        tags: ["+2°C to +8°C", "Govt Projects"],
      },
    ],
    "process-industrial": [
      {
        title: "Heat Exchangers & Condensers",
        description: "Copper's 391 W/m·K thermal conductivity makes it the first-choice material for industrial heat exchangers. Shell-and-tube heat exchangers, condenser coils, and cooling batteries for process industries.",
        tags: ["391 W/mK", "Shell-and-Tube", "Large OD Available"],
      },
      {
        title: "Data Centre Precision Cooling",
        description: "Chiller plant piping and precision air conditioning copper piping for data centres. High-reliability supply with consistent batch quality and full documentation for critical infrastructure projects.",
        tags: ["Chiller Mains", "Precision Cooling", "Critical Infra"],
      },
      {
        title: "Chemical & Process Plants",
        description: "Process cooling heat exchangers, condenser tubes, and chilled water circuits in chemical manufacturing plants. Custom wall thicknesses for elevated pressure requirements. MTC documentation standard.",
        tags: ["Custom Wall", "High Pressure", "MTC Documentation"],
      },
      {
        title: "Power Generation & Utilities",
        description: "Condenser tubes and cooling water circuits in thermal power stations and industrial utilities. Large diameter hard copper for high-volume cooling water applications.",
        tags: ["Large Diameter", "Condenser Tubes", "Bulk Supply"],
      },
      {
        title: "Solar Thermal Systems",
        description: "Copper tubes in solar water heating collectors and solar thermal heat exchangers. Soft copper coils for solar collector manifolds; hard tubes for system distribution piping.",
        tags: ["Solar Collectors", "Glycol Compatible", "IS 10771"],
      },
      {
        title: "General Industrial Refrigeration",
        description: "Process refrigeration for food manufacturing, chemical processes, and industrial applications requiring reliable, consistently specified copper tube with full traceability documentation.",
        tags: ["All Refrigerants", "Custom Specs", "Bulk Supply"],
      },
    ],
    "infrastructure": [
      {
        title: "Marine Refrigeration",
        description: "Refrigeration copper piping for fishing vessels, cargo ships, and offshore platforms. Marine-grade C12200 DHP copper withstands the combined stresses of vibration, salt air, and continuous refrigeration cycling at sea.",
        tags: ["Marine Grade", "Vibration Resistant", "All Vessel Types"],
      },
      {
        title: "Defence Cold Storage",
        description: "Temperature-controlled storage facilities for defence establishments, military bases, and strategic food reserves. Parasmani copper tubes specified for defence infrastructure projects — CLW (Indian Railways) assessment cleared.",
        tags: ["CLW Approved", "Defence Projects", "MTC"],
      },
      {
        title: "Railways — Pantry & Cold Chain",
        description: "Refrigeration copper piping for railway pantry cars, on-board catering cold chain, and station cold storage. Parasmani holds CLW (Chittaranjan Locomotive Works) capability assessment clearance for railway copper piping.",
        tags: ["CLW Approved", "Pantry Cars", "Railway Cold Chain"],
      },
      {
        title: "Offshore & Oil & Gas",
        description: "HVAC and process cooling copper piping for offshore platforms and oil & gas facilities. Marine-grade copper specified for corrosion resistance in high-humidity, high-vibration environments.",
        tags: ["Offshore Grade", "Custom Specs", "Documentation"],
      },
      {
        title: "Smart City & Government Projects",
        description: "District cooling systems, government cold storage infrastructure, and smart city facility management. Parasmani approvals at SBI, CSIR NAL, and CHIRAAG (Govt. of Chhattisgarh) for government project compliance.",
        tags: ["SBI Approved", "CSIR NAL", "CHIRAAG Project"],
      },
      {
        title: "Hotels & Hospitality Cold Chain",
        description: "Central kitchen cold storage, walk-in freezers, wine and beverage chillers, and central chiller plant copper piping for five-star hotels and resort properties.",
        tags: ["Kitchen Cold Rooms", "Central Chiller", "All Sizes"],
      },
    ],
  };

  return (
    <section className="w-full bg-white py-10 md:py-15 px-4 sm:px-8 md:px-12 lg:px-24 font-sans select-none">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Upper Header Frame */}
        <div className="text-center mb-8 md:mb-12">
          <span className="eyebrow-2 tracking-[0.3em] uppercase text-[#C43A26] font-albert block mb-1.5">
            Where Parasmani is Installed
          </span>
          <h2 className="h2 text-[#272727] tracking-tight">
            Every industrial application covered.
          </h2>
        </div>

        {/* ================= UX REMODEL FOR MOBILE VIEWPORTS ================= */}
        {/* MOBILE ACCORDION STACK: Exclusively rendered on < md layouts */}
        <div className="flex flex-col gap-3 md:hidden">
          {tabData.map((tab) => {
            const isOpen = activeTab === tab.id;
            return (
              <div 
                key={tab.id} 
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-[#C48A54] bg-[#F5F0EA]/20" : "border-gray-200 bg-[#EDD9C5]/30"
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => setActiveTab(isOpen ? "" : tab.id)}
                  className="w-full flex items-center justify-between p-4 font-albert text-[13px] font-medium text-[#272727]"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full transition-colors ${isOpen ? "bg-[#C48A54]/10" : "bg-white"}`}>
                      <img src={tab.imgSource} alt="" className="w-4 h-4 object-contain" />
                    </div>
                    <span>{tab.label}</span>
                  </div>
                  
                  {/* Rotating Chevron Icon */}
                  <svg 
                    className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Inline Card Items Container Box */}
                <div 
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-[2000px] border-t border-[#E6DEC2]/50 p-4" : "max-h-0"
                  }`}
                >
                  <div className="flex flex-col gap-4">
                    {cardsContent[tab.id]?.map((card, idx) => (
                      <ApplicationCard
                        key={idx}
                        title={card.title}
                        description={card.description}
                        tags={card.tags}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* DESKTOP NAV TAB PILL BAR: Preserved pristine style exclusively for md+ devices */}
        <div className="hidden md:flex justify-center mb-12">
          <div className="bg-[#EDD9C5] p-1.5 rounded-[28px] flex items-center gap-1">
            {tabData.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-medium tracking-tight whitespace-nowrap transition-all duration-200 cursor-pointer font-albert ${
                    isActive ? "bg-white text-[#272727] shadow-sm" : "text-[#272727] hover:text-[#1A1A1A]"
                  }`}
                >
                  <img 
                    src={tab.imgSource} 
                    alt="" 
                    className={`w-4 h-4 object-contain transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-75"}`}
                  />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* DESKTOP GRID CONTAINER: Rendered on md+ viewports */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardsContent[activeTab]?.map((card, index) => (
            <ApplicationCard
              key={index}
              title={card.title}
              description={card.description}
              tags={card.tags}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
