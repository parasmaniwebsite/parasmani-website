# 13 Calculations & Tools

The bot does not do calculations itself. It explains what each tool does and links to it.

## KB-13-01 The four tools
status: needs_verification
safety_critical: false
source: website frontend/src/pages/ToolsPage.jsx
---
Parasmani Weight Calculator (/weight-calculator): "Calculate weight per metre and total weight using OD, wall thickness (SWG or mm), and length. Supports straight tube and pancake coil. PDF export included."
Parasmani Pressure Calculator (/pressure-calculator): "Determine allowable working pressure for copper tubes based on OD, wall thickness, and alloy grade — per ASTM, EN, IS, and JIS standards. Output in bar or MPa."
Parasmani Project Estimator (/project-estimator): "Build a multi-size copper tube BOM for HVAC and plumbing projects. Enter tube sizes, lengths, and quantities to get a consolidated material weight summary."
Parasmani Unit Converter (/unit-converter): "Convert kg↔lb, mm↔inch, MPa↔psi, SWG↔mm, bar↔psi and more — built for copper tube specifications across global standards including ASTM, IS, EN and JIS."

## KB-13-02 Tools disclaimer
status: needs_verification
safety_critical: true
source: website frontend/src/pages/ToolsPage.jsx
---
"All calculations provided by these tools are for reference and estimation purposes only. Results should not be used as a substitute for professional engineering judgement or certified design calculations. Parasmani Copper Pvt. Ltd. makes no warranty as to the accuracy or completeness of outputs. Always verify critical dimensions and pressures against applicable IS, ASTM, EN, JIS, or BS standards before use in actual projects."
note: The company name here is "Parasmani Copper Pvt. Ltd."; everywhere else it is "Parasmani Tubes Copper Pvt. Ltd.".

## KB-13-03 Pressure calculator method
status: needs_verification
safety_critical: true
source: website frontend/src/pages/hooks/useBarlowCalculation.js; frontend/src/pages/data/tempers.js
---
Modified Barlow's Equation: P_burst = 2 × UTS × t / (D − 0.8 × t); P_working = P_burst / SF. Burst is rounded to 2 dp before dividing.
Tempers used: Hard Drawn UTS 315, SF 2; Half Hard UTS 275, SF 2; Quarter Hard UTS 240, SF 2; Soft Annealed UTS 205, SF 3.
OD capped at 150 mm; wall capped at 3.251 mm.
note: The Half Hard (275) and Quarter Hard (240) UTS values appear in no datasheet. See REVIEW.md B-11.

## KB-13-04 Weight calculator method
status: needs_verification
safety_critical: false
source: website frontend/src/pages/WeightCalculator.jsx
---
Weight per metre (kg) = π × 1000 × wall_mm × (od_mm − wall_mm) × 0.00000894, rounded up to 3 decimals. "The 0.00000894 term carries copper's 8.94 g/cm³ density."

## KB-13-05 General weight chart (kg/m)
status: needs_verification
safety_critical: false
source: frontend/src/assets/downloads/deal-reference/Parasmani-Copper-Tube-Generic-Weight-Chart.pdf
---
PARASMANI COPPER TUBES – GENERAL WEIGHT CHART | WEIGHT (KG/MTR)
| ø Size | | 1.63 mm (≈16 SWG) | 1.21 mm (≈18 SWG) | 1.00 mm (≈19 SWG) | 0.90 mm (≈20 SWG) | 0.80 mm (≈21 SWG) |
|---|---|---|---|---|---|---|
| 1/4" | 6.35 mm | 0.217 | 0.175 | 0.151 | 0.138 | 0.125 |
| 3/8" | 9.53 mm | 0.362 | 0.283 | 0.240 | 0.219 | 0.197 |
| 1/2" | 12.70 mm | 0.507 | 0.391 | 0.329 | 0.299 | 0.268 |
| 5/8" | 15.88 mm | 0.653 | 0.499 | 0.418 | 0.379 | 0.339 |
| 3/4" | 19.05 mm | 0.798 | 0.607 | 0.507 | 0.459 | 0.411 |
| 7/8" | 22.23 mm | 0.944 | 0.715 | 0.597 | 0.540 | 0.482 |
| 1" | 25.40 mm | 1.089 | 0.823 | 0.686 | 0.620 | 0.553 |
| 1 1/8" | 28.58 mm | 1.234 | 0.931 | 0.775 | 0.700 | 0.625 |
| 1 1/4" | 31.75 mm | 1.379 | 1.038 | 0.864 | 0.780 | 0.696 |
| 1 3/8" | 34.93 mm | 1.525 | 1.146 | 0.953 | 0.861 | 0.767 |
| 1 1/2" | 38.10 mm | 1.670 | 1.254 | 1.042 | 0.941 | 0.839 |
| 1 5/8" | 41.28 mm | 1.816 | 1.362 | 1.132 | 1.021 | 0.910 |
| 1 3/4" | 44.45 mm | 1.961 | 1.470 | 1.221 | 1.101 | 0.981 |
| 2 1/8" | 53.98 mm | 2.397 | 1.794 | 1.488 | 1.342 | 1.195 |
The same PDF gives a kg/ft table.
note: The HVAC/R brochure's copy of this chart (page 5) shows "–" for 0.80 mm from 1 1/4" upward, while this chart gives values. That matters because it implies whether the size is made. The catalogue matrix (KB-02-06) has no 0.80 mm for 35–55 mm. See REVIEW.md A-19.
