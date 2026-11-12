# 11 Product Selection

Selection here means "which Parasmani product fits which kind of system". Sizing a specific installation is always escalated to Sales.

## KB-11-01 Which product for which system (website selection guide)
status: needs_verification
safety_critical: true
source: website HVAC page frontend/src/pages/industries/HvacRefrigiration.jsx (SELECTION_GUIDE_DATA)
---
| System Type | Line | Product | Typical Size | Refrigerant |
|---|---|---|---|---|
| Split AC (1–2 TR) | Liquid | Pancake Coil | 1/4" OD | R22 / R32 / R410A |
| Split AC (1–2 TR) | Suction | Pancake Coil | 3/8" OD | R22 / R32 / R410A |
| Split AC (2–3 TR) | Liquid | Pancake Coil | 1/4" OD | R410A / R32 |
| Split AC (2–3 TR) | Suction | Pancake Coil | 1/2" OD | R410A / R32 |
| VRF System | Branch | Pancake Coil | 3/8"–5/8" OD | R410A / R32 |
| VRF System | Header main | Straight Tube | 7/8"–1 1/8" OD | R410A / R32 |
| Chiller Plant | Refrigerant mains | Straight Tube | 1"–4" OD | R410A / R134a |
| Chiller Plant | Joints & bends | Wrought Fittings | Matching ID | — |
| Cold Storage | Evaporator coil | Pancake Coil | 3/8"–5/8" OD | R404A / R134a |
| Cold Storage | Header pipes | Straight Tube | 3/4"–1 1/8" OD | R404A / R134a |
"Every component dimensioned to work together — tubes, coils, and fittings from the same manufacturer for guaranteed compatibility."
note: Sizes are sizing advice with no Parasmani document behind them. If approved, the bot should give only the Product column and send sizing to Sales.

## KB-11-02 1.5 TR split AC coil size (website FAQ)
status: needs_verification
safety_critical: true
source: website frontend/src/pages/industries/HVAC/faqData.js; frontend/src/pages/products/pancake/faqData.js
---
HVAC FAQ: "Standard pairing for 1.5 TR: 1/4" OD (6.35mm) liquid line + 3/8" OD (9.52mm) suction line. For runs exceeding 10 metres, consider upsizing the suction line by one size to minimise pressure drop. Always confirm with the OEM installation manual — inverter models may specify differently."
note: 9.52 mm here vs 9.53 mm in every datasheet. "Upsize for runs over 10 m" is engineering advice with no source. Recommend NOT approving; send to Sales and the OEM manual.

## KB-11-03 Which temper for which job (website)
status: needs_verification
safety_critical: false
source: website frontend/src/pages/industries/HVAC/faqData.js
---
"Hard (H): Rigid straight runs, riser mains, any installation where no bending is required — maximum pressure rating. Half Hard (HH): General-purpose for chiller plants and most commercial HVAC — some formability for gentle offsets. Quarter Hard (QH): Field bending where tight radius changes are needed without using coil format. Soft Annealed (Pancake Coil): Split AC and VRF branch connections — bends freely by hand on site."

## KB-11-04 Which brand for which application
status: needs_verification
safety_critical: false
source: frontend/src/assets/downloads/brochures/Parasmani_Product_Catalog_2026.pdf (page 1); website frontend/src/components/AvailableBrands.jsx
---
PTP K-Series: "our dedicated HVAC line for VRF and non-VRF refrigerant applications."
Parasmani: "our flagship brand covering the full spectrum of copper tube applications."
Medical gas tubes are sold under "Parasmani MGPS" (MGPS brochure page 1: "Under the Parasmani MGPS range, our Medical Grade Copper Tubes are engineered to deliver exceptional quality, cleanliness, and reliability for critical healthcare infrastructure.")

## KB-11-05 Product per application (overview)
status: needs_verification
safety_critical: false
source: frontend/src/assets/downloads/brochures/Parasmani_Product_Catalog_2026.pdf (pages 3, 5, 7)
---
Straight Copper Tubes — Applications: HVAC/R, Medical Gas, Plumbing, Industrial, Fuel Gas
Pancake Copper Coil — Applications: HVAC/R, Plumbing, Industrial
Copper Fittings — Applications: HVAC/R, Medical Gas, Plumbing, Industrial, Fuel Gas
note: The catalogue does not list Fuel Gas for pancake coils, but the Fuel Gas brochure says "soft annealed pancake coils are ideal for long jointless runs, concealed piping".
