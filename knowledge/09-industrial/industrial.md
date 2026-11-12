# 09 Industrial & Process Applications

## KB-09-01 Industrial overview and standards (brochure)
status: needs_verification
safety_critical: false
source: frontend/src/assets/downloads/brochures/Parasmani-Industrial-Brochure-2026.pdf (page 1)
---
"Parasmani manufactures copper tubes for cold storage, food & beverage, life sciences, heat exchangers, marine and defence — from cryogenic blast freezers to high-temperature process circuits, one supply source with mill test certificates as standard."
"Manufactured in compliance with: ASTM B280 / B75"

## KB-09-02 Refrigerant suitability (industrial brochure)
status: needs_verification
safety_critical: true
source: frontend/src/assets/downloads/brochures/Parasmani-Industrial-Brochure-2026.pdf (page 1)
---
"Refrigerant compatible — Compatible with HFC, HFO and CO₂ (R744) refrigerants. Not suitable for ammonia (R717) systems."
"ASTM B280 cleanliness — factory degreased and end-capped — no residual cutting oils to contaminate compressor lubricant."
"Cryogenic ductility — full strength and toughness at deep sub-zero temperatures, no embrittlement or cracking under repeated cycling."

## KB-09-03 CO₂ transcritical note
status: needs_verification
safety_critical: true
source: frontend/src/assets/downloads/brochures/Parasmani-Industrial-Brochure-2026.pdf (page 2); website frontend/src/pages/industries/IndustrialAndProcessApplications/faqData.js
---
Brochure: "Transcritical CO₂ (R744) runs up to ~130 bar — verify wall thickness against system MAWP"
Website FAQ: "Thicker wall gauges (2.03mm and above) are typically specified for CO₂ refrigerant mains. Contact us with your system pressure and we will recommend the appropriate size."
note: Pressure and wall-suitability questions are always escalated.

## KB-09-04 Built for industrial duty (brochure)
status: needs_verification
safety_critical: false
source: frontend/src/assets/downloads/brochures/Parasmani-Industrial-Brochure-2026.pdf (page 2)
---
| Parameter | Capability |
|---|---|
| Operating temperature | Deep sub-zero to high-temp process service |
| Ready-stock max O.D. | 2⅛" — fast dispatch on standard sizes |
| Large diameter available | Up to 5⅛" O.D. for headers & condensers |
| Custom lead time | Typically 15 days |
| Documentation | MTC standard |
note: Stock and lead time are always escalated. Only the "Large diameter available" and "Documentation" rows are safe to approve.

## KB-09-05 Industrial size range and weights (website)
status: needs_verification
safety_critical: true
source: website frontend/src/pages/industries/IndustrialAndProcessApplications/SizeRangeTable.jsx
---
| OD Size | Wall (SWG) | Typical Use |
|---|---|---|
| 1/2" (12.7 mm) | 21 SWG / 0.80 mm | Split AC, small connections |
| 5/8" (15.88 mm) | 20 SWG / 0.90 mm | Suction lines, evaporator coil |
| 7/8" (22.23 mm) | 19 SWG / 1.00 mm | VRF headers, cold storage |
| 1 1/8" (28.58 mm) | 18 SWG / 1.21 mm | Refrigeration mains |
| 1 3/8" (34.93 mm) | 16 SWG / 1.63 mm | Cold room headers |
| 1 5/8" (41.28 mm) | 16 SWG / 1.63 mm | Industrial suction mains |
| 2 1/8" (53.98 mm) | 16 SWG / 1.63 mm | Large cold store mains |
| 2 5/8" (66.68 mm) | 14 SWG / 2.03 mm | Industrial headers |
| 3 1/8" (79.38 mm) | 14 SWG / 2.03 mm | Large blast freezer |
| 4 1/8" (104.78 mm) | 14 SWG / 2.03 mm | Industrial condensers |
| 5 1/8" (130.18 mm) | 14 SWG / 2.03 mm | Sugar evaporators, large heat exchangers |
note: 14 SWG = 2.03 mm here but 2.00 mm in the catalogue (KB-02-06). The "Typical Use" column is sizing advice. See REVIEW.md A-16.

## KB-09-06 Low temperature (website)
status: needs_verification
safety_critical: false
source: website frontend/src/pages/industries/IndustrialAndProcessApplications.jsx and faqData.js
---
"Operating Temperature -40°C — Copper retains full ductility and strength at sub-zero temperatures. No embrittlement, no cracking under cryogenic cycling."
FAQ: "Yes. C12200 DHP copper retains full ductility and strength at sub-zero temperatures, including -40°C and below. ... No special grade or treatment is required for cold storage applications."

## KB-09-07 Industrial applications (website)
status: needs_verification
safety_critical: false
source: website frontend/src/pages/industries/IndustrialAndProcessApplications/IndustrialApplications.jsx
---
Cold Storage: Blast Freezers; Walk-in Cold Rooms & Freezers; Supermarket Cold Chain; Cold Storage Warehouses; Ice Plants & Ice Making.
Food & Beverage: Dairy Processing; Breweries & Distilleries; Sugar Industry; Confectionery & Bakery.
Life Sciences: Blood Banks; Pharma Cold Chain; Pharma Manufacturing; Research & Biomedical Labs; Hospital Central Chilled Water; Vaccine Storage & Distribution.
Process & Industrial: Heat Exchangers & Condensers; Data Centre Precision Cooling; Chemical & Process Plants; Power Generation & Utilities; Solar Thermal; General Industrial Refrigeration; Marine Refrigeration; Defence Cold Storage; Railways — Pantry & Cold Chain; Offshore & Oil & Gas; Smart City & Government Projects; Hotels & Hospitality Cold Chain.
note: Tags such as "Marine Grade", "Offshore Grade", "GMP Compliant", "Hygienic Grade", "Lab Grade" and "CLW Approved" have no supporting document. See REVIEW.md B-04.
