# 08 Household & Fuel Gas (LPG / PNG)

Every entry in this folder is safety_critical. Gas installations must be designed, sized and commissioned by a licensed gas contractor. The bot gives general product information only and always offers WhatsApp Sales and Request a Quote.

## KB-08-01 Fuel gas overview and standards (brochure)
status: needs_verification
safety_critical: true
source: frontend/src/assets/downloads/brochures/Parasmani-Fuel-Gas-Brochure-2026.pdf (page 1)
---
"Parasmani makes seamless copper tubes for LPG and PNG distribution from the utility meter to every burner inside the building."
"Manufactured in compliance with: BS EN 1057, ASTM B837"
note: Neither the Fuel Gas brochure nor any datasheet gives ASTM B837 test data. No fuel-gas TDS exists. See REVIEW.md C.

## KB-08-02 Fuel gas standards (website)
status: needs_verification
safety_critical: true
source: website frontend/src/pages/industries/HouseHoldAndFuelGas/GasComplianceSection.jsx
---
EN 1057 — Plumbing, Heating & Gas Systems
ASTM B837 — Natural gas & LPG distribution
EN 1254-1 — Copper Capillary Solder Fittings
"Note: Your gas contractor or consultant should verify that the installation design and commissioning comply with your city gas distribution company's (CGD) approved material specifications and connection procedures."

## KB-08-03 Typical gas piping sizes (brochure)
status: needs_verification
safety_critical: true
source: frontend/src/assets/downloads/brochures/Parasmani-Fuel-Gas-Brochure-2026.pdf (page 2)
---
"Hard straight tubes are used for risers, floor mains and branch distribution, while soft annealed pancake coils are ideal for long jointless runs, concealed piping and tight-radius bends."
PARASMANI STRAIGHT COPPER TUBES | STANDARD LENGTH 3 MTR
| O.D. (mm) | W.T. (mm) | Weight/Mtr (kg) | Typical Use |
|---|---|---|---|
| 12 | 1.0 | 0.309 | Kitchen branch, single point |
| 15 | 1.0 | 0.394 | Flat distribution, small commercial |
| 22 | 1.0 | 0.590 | Floor riser, medium commercial |
| 28 | 1.2 | 0.903 | Building riser, hotel kitchen |
| 35 | 1.2 | 1.140 | Main riser, large building |
| 42 | 1.5 | 1.706 | Central gas supply mains |
"The sizes shown are typical recommendations only. Final tube selection should be verified by a licensed gas contractor or qualified engineer in accordance with project requirements and local regulations."

## KB-08-04 Riser sizing (website FAQ) — no supporting document
status: needs_verification
safety_critical: true
source: website frontend/src/pages/industries/HouseHoldAndFuelGas/faqData.js
---
"Sizing depends on the number of connected points and the total gas load (in kW or m³/hr). As a general reference: 22mm OD is typical for a 4–6 flat riser, 28mm for a larger building riser, and 35–42mm for the main supply from the meter bank in large buildings. Your gas contractor or a registered gas engineer must size the system correctly for your specific building — do not size by reference alone."
note: Do not approve. Gas sizing is always escalated.

## KB-08-05 Brazing for gas (website) — CONFLICTS with Installation Guide
status: needs_verification
safety_critical: true
source: website frontend/src/pages/industries/HouseHoldAndFuelGas/faqData.js and HouseHoldFooter.jsx
---
"Gas joints must be brazed with a silver-based brazing alloy with a minimum 45% silver content — typically BAg-7 or a similar high-silver alloy. Phosphor-copper brazing rod (BCuP-2, BCuP-5) must never be used for gas piping. Phosphor-copper is fine for HVAC refrigerant joints, but is not approved for gas applications. Always purge the pipe with dry nitrogen during brazing to prevent internal oxidation scale, which can contaminate the gas supply and block regulators."
"All gas installations must comply with your local gas authority's requirements — MGL, IGL, GAIL, or the applicable city gas distribution company — and be commissioned and certified by a licensed gas contractor."
note: CONFLICT. The Installation Guide says "Copper to copper: phos-copper rod, no flux" without excluding gas. See REVIEW.md A-13 and A-15.

## KB-08-06 Is copper approved for PNG/LPG in India (website FAQ)
status: needs_verification
safety_critical: true
source: website frontend/src/pages/industries/HouseHoldAndFuelGas/faqData.js
---
"Yes. Copper tube is specified for internal gas piping under EN 1057 and BS EN 1057 — the European and British standards for copper tubes in gas and water service. However, every city gas distribution company (CGD) — MGL, IGL, GAIL, MNGL, etc. — has its own approved material list and installation specifications. Always confirm with your local CGD that copper tube is on their approved list and use a licensed gas contractor for installation and commissioning."
note: Code compliance is always escalated. Only the "confirm with your CGD" part is safe to repeat.

## KB-08-07 Copper vs alternatives for gas (brochure)
status: needs_verification
safety_critical: true
source: frontend/src/assets/downloads/brochures/Parasmani-Fuel-Gas-Brochure-2026.pdf (page 1)
---
| Property | Copper | Flexible SS Hose | HDPE / Plastic |
|---|---|---|---|
| Fire Behaviour | Non-combustible | Seals fail under heat | Burns / Toxic Fumes |
| Gas Permeation | Zero | Very Low | Increases with Age |
| Permitted Above Ground | Yes — full run | Appliance connection only | No — buried service only |
| Service Life | 50+ Years | 10-15 Years | Not rated for exposed service |
"Copper is the material every serious code recommends for this reason"
note: "Permitted above ground" is a code claim, and "every serious code recommends" has no source. The website version lists "Standard compliance: EN 1057 / IS 3589". IS 3589 is not cited in any Parasmani document. See REVIEW.md B-06.

## KB-08-08 Gas applications (website)
status: needs_verification
safety_critical: true
source: website frontend/src/pages/industries/HouseHoldAndFuelGas/HouseHoldApplicationsSection.jsx
---
Residential PNG Networks; Hotels & Hospitality Kitchens; Restaurants & Cloud Kitchens; LPG Bank Distribution; Institutional & Canteen Kitchens; Industrial Process Gas.
Residential PNG: "Parasmani copper tubes for the riser and floor distribution network — from the meter bank to each flat's kitchen."

## KB-08-09 Gas and water in the same building (website FAQ)
status: needs_verification
safety_critical: true
source: website frontend/src/pages/industries/HouseHoldAndFuelGas/faqData.js
---
"Yes — the same copper tube is suitable for both gas (EN 1057) and potable water (EN 1057 / IS 10771) applications. The tube is identical; the difference is in the specification standard applied, the brazing alloy used at joints (silver alloy for gas, phosphor-copper acceptable for water), and the installation and commissioning requirements. Never connect a gas tube and a water tube together — they must be completely separate systems with no interconnection."
