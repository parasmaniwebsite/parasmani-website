# 07 Plumbing & Water Supply

## KB-07-01 Plumbing overview and standard (brochure)
status: needs_verification
safety_critical: false
source: frontend/src/assets/downloads/brochures/Parasmani-Plumbing-Brochure-2026.pdf (page 1)
---
"Parasmani manufactures copper tubes for hot and cold water distribution in homes, hotels, hospitals and institutions. Safe for drinking water, bacteriostatic by nature, and built to last the life of the building — copper is the pipe every serious plumbing standard was written around."
"Manufactured in compliance with: BS EN 1057"

## KB-07-02 Material (plumbing brochure)
status: needs_verification
safety_critical: false
source: frontend/src/assets/downloads/brochures/Parasmani-Plumbing-Brochure-2026.pdf (page 2)
---
"Manufactured from C12200 DHP (phosphorus-deoxidized copper) at 99.90% purity."
Material Grade: C12200 (DHP) / CW024A
Copper Content: Cu 99.90% minimum (including silver)
Phosphorus (deoxidizer): 0.015–0.040%

## KB-07-03 Typical plumbing sizes (brochure)
status: needs_verification
safety_critical: true
source: frontend/src/assets/downloads/brochures/Parasmani-Plumbing-Brochure-2026.pdf (page 2); website frontend/src/pages/industries/PlumbingAndWaterSupply/PlumbingSpecification.jsx
---
"Hard straight tubes are used for risers, floor mains and branch distribution, while soft annealed pancake coils are ideal for long jointless runs, concealed piping and tight-radius bends."
PARASMANI STRAIGHT COPPER TUBES | STANDARD LENGTH 3 MTR
| O.D. (mm) | W.T. (mm) | Weight/Mtr (kg) | Typical Use |
|---|---|---|---|
| 12 | 0.8 | 0.252 | Basin, WC branch, single point |
| 15 | 1.0 | 0.394 | Domestic hot & cold branch |
| 22 | 1.0 | 0.590 | Flat distribution, small riser |
| 28 | 1.2 | 0.903 | Building riser, floor mains |
| 35 | 1.2 | 1.140 | Main riser, commercial building |
| 54 | 1.5 | 2.212 | Building entry, hotel / hospital mains |
"The sizes shown are typical recommendations only. Final tube selection should be verified by a qualified plumbing engineer in accordance with project requirements and local plumbing codes."
note: Typical-use sizing counts as sizing advice, so it is marked safety_critical. The website adds "All sizes available from Parasmani ready stock or within 15 working days" (stock/lead time, always escalated).

## KB-07-04 Copper vs alternatives (plumbing brochure)
status: needs_verification
safety_critical: false
source: frontend/src/assets/downloads/brochures/Parasmani-Plumbing-Brochure-2026.pdf (page 1)
---
| Property | Copper | CPVC | GI Steel | PPR / uPVC |
|---|---|---|---|---|
| Potable safety | Inherently safe | Acceptable | Rust risk | Varies |
| Bacteria | Bacteriostatic | Biofilm risk | Biofilm risk | Biofilm risk |
| Max. Temp @ Full Pressure | 200ºC+ | ~60ºC | 200ºC+ | ~45ºC |
| Service life | 50+ years | 25–30 yrs | 10–20 yrs | 20–25 yrs |
note: CONFLICT with the website table (KB-07-05). See REVIEW.md A-14. Also, no test document supports these figures.

## KB-07-05 Copper vs alternatives (website)
status: needs_verification
safety_critical: false
source: website frontend/src/pages/industries/PlumbingAndWaterSupply/PlumbingComparisonSection.jsx and PlumbingAndWaterSupply.jsx
---
Max service temp: Copper 120°C; CPVC 93°C (limit); GI Steel ~80°C; PPR / UPVC 60–70°C
"Copper handles continuous water temperatures up to 120°C — well above the operating range of domestic hot water systems."
Service life: copper "50+ years"
Standard compliance: "EN 1057 / BS EN 1057"
"Copper ions actively inhibit Legionella pneumophila, E. coli, and biofilm formation on the pipe wall."
note: Copper max temperature here is 120°C; the brochure says 200ºC+. See REVIEW.md A-14.

## KB-07-06 Joining plumbing tubes (website)
status: needs_verification
safety_critical: true
source: website frontend/src/pages/industries/PlumbingAndWaterSupply/faqData.js and PlumbingFooter.jsx
---
"(1) Capillary soldering — the most common method for domestic plumbing. Use lead-free solder (Sn97Cu3) with an appropriate flux. ... (2) Silver brazing — used for high-temperature circuits (solar, commercial hot water above 80°C). Uses BAg-7 silver alloy filler at higher temperature — stronger joint than solder. (3) Press-fit fittings — proprietary systems that crimp onto the tube mechanically with no heat required. ... In all cases, flush the system thoroughly with clean water before handover to remove flux residue."
"Never use lead-bearing solder on potable water joints — lead is toxic and prohibited."
note: The Fuel Gas FAQ says "phosphor-copper acceptable for water", and the Installation Guide says "Copper to copper: phos-copper rod, no flux". Three different answers. See REVIEW.md A-15.

## KB-07-07 Tempers for plumbing (website FAQ)
status: needs_verification
safety_critical: false
source: website frontend/src/pages/industries/PlumbingAndWaterSupply/faqData.js
---
"Hard (H): Fully rigid. Best for straight runs, risers, and any installation where no field bending is needed — maximum pressure rating. Half Hard (HH): Slightly more formable. Can be bent on site with a pipe bender for gentle offsets without a fitting. Good all-round choice for domestic plumbing runs. Soft Annealed (Coil): Bends freely by hand. Best for underfloor heating loops, solar connections, and tight-radius bends where a rigid tube would require multiple fittings. Do not use soft annealed tube for straight high-pressure mains — its lower wall hardness means a lower pressure rating than H or HH temper."

## KB-07-08 Is copper safe for drinking water (website FAQ)
status: needs_verification
safety_critical: true
source: website frontend/src/pages/industries/PlumbingAndWaterSupply/faqData.js
---
"Yes — copper is approved for drinking water contact under EN 1057, BS EN 1057, and WHO guidelines. Copper does not leach harmful chemicals, plasticisers, or microplastics into water."
note: Regulatory claim ("approved ... under WHO guidelines") with no supporting document. Code compliance must be escalated. See REVIEW.md B-09.

## KB-07-09 Plumbing applications (website)
status: needs_verification
safety_critical: false
source: website frontend/src/pages/industries/PlumbingAndWaterSupply/ (applications)
---
Residential Hot & Cold Water; Hotels & Hospitality; Solar Thermal Systems; Underfloor Heating; Hospitals & Institutions; Swimming Pools & Spa.
Solar: "Copper is the only appropriate material for solar water heater connections — collector outlet temperatures can exceed 90°C."
