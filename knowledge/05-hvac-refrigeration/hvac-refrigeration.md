# 05 HVAC & Refrigeration

## KB-05-01 HVAC/R TDS scope
status: needs_verification
safety_critical: false
source: frontend/src/assets/downloads/Spec-Sheets/Parasmani-HVAC-R-Copper-Tubes-TDS.pdf (section 1); PTP-K-Series-HVAC-R-Copper-Tubes-TDS.pdf (section 1, identical except brand name)
---
This data sheet covers Parasmani Cu-DHP seamless round copper tubes manufactured for air-conditioning and refrigeration service, including VRF / VRV systems, split air-conditioning, general HVAC, refrigeration and industrial process piping. Tubes are supplied as straight lengths in hard drawn, light drawn (half hard) and light annealed (quarter hard) condition, and as soft annealed pancake coils.
"Where a project specification calls for a standard other than the above, requirements shall be confirmed in writing prior to manufacture."

## KB-05-02 Chemical and mechanical properties (HVAC/R brochure)
status: needs_verification
safety_critical: false
source: frontend/src/assets/downloads/brochures/Parasmani-HVAC-R-Brochure-2026.pdf (page 2)
---
| Specification | Alloy / Grade | Cu% | P% | Temper | Tensile (MPa) | Elongation % (Min) | Avg Grain Size (mm) | Hardness | Internal Bore Cleanliness |
|---|---|---|---|---|---|---|---|---|---|
| JIS H3300 | C12200 | 99.90% Min. | 0.015 – 0.040% | Soft Annealed (O) | 205 Min. | 40 | 0.025 – 0.060 | 60 VPN Max | NA |
| JIS H3300 | | | | Half Hard | 245 – 325 | NA | NA | 70 – 110 VPN | NA |
| JIS H3300 | | | | Hard | 315 Min. | NA | NA | 100 VPN Min | NA |
| ASTM B68 | C12200 | 99.90% Min. | 0.015 – 0.040% | Soft Annealed (O60) | 210 Min. | 40 | 0.040 Min. | NA | NA |
| ASTM B280 | C12200 | 99.90% Min. | 0.015 – 0.040% | Soft Annealed (O60) | 205 Min. | 40 | 0.040 Min. | NA | 0.038 g/m² Max. |
| ASTM B280 | | | | Hard (H58) | 250 Min. | NA | NA | NA | – |
| ASTM B75 | C12200 | 99.90% Min. | 0.015 – 0.040% | Half Hard (H55) | 250 – 325 | NA | NA | 30 – 60 (HR 30T) | NA |
| ASTM B75 | | | | Hard (H80) | 310 Min. | NA | NA | 55 Min. (HR 30T) | NA |
| IS 10773 : 2025 | Cu-DHP | 99.90% Min. (Cu + Ag%) | 0.015 – 0.040% | Soft Annealed | 210 Min. | 40 | 0.040 Min. | NA | 0.038 g/m² Max. |
| IS 10773 : 2025 | | | | Hard Drawn | 290 Min. | NA | NA | NA | 0.038 g/m² Max. |

note: The brochure omits the IS 10773 light annealed and light drawn rows, and shows "NA" where the TDS shows bore cleanliness for IS 10773 hard drawn. Prefer KB-05-13 (TDS).

## KB-05-13 Mechanical properties (HVAC/R TDS)
status: needs_verification
safety_critical: false
source: frontend/src/assets/downloads/Spec-Sheets/Parasmani-HVAC-R-Copper-Tubes-TDS.pdf (section 3, page 2); identical in PTP-K-Series-HVAC-R-Copper-Tubes-TDS.pdf
---
| Standard | Condition / Temper | Tensile (MPa) | Elong. % | Grain Size (mm) | Hardness | Bore Cleanliness |
|---|---|---|---|---|---|---|
| IS 10773:2025 | Soft annealed | 210 Min. | 40 | 0.040 Min. | — | 0.038 g/m² Max. |
| IS 10773:2025 | Light annealed | 220 Min. | 40 | 0.015 – 0.040 | — | 0.038 g/m² Max. |
| IS 10773:2025 | Light drawn | 245 Min. | 20 | N/A | — | 0.038 g/m² Max. |
| IS 10773:2025 | Hard drawn | 290 Min. | — | N/A | — | 0.038 g/m² Max. |
| JIS H 3300 | Soft annealed (O) | 205 Min. | 40 | 0.025 – 0.060 | 60 HV Max. | — |
| JIS H 3300 | Half hard | 245 – 325 | — | — | 70 – 110 HV | — |
| JIS H 3300 | Hard | 315 Min. | — | — | 100 HV Min. | — |
| ASTM B 68 | Soft annealed (O60) | 210 Min. | 40 | 0.040 Min. | — | — |
| ASTM B 280 | Soft annealed (O60) | 205 Min. | 40 | 0.040 Min. | — | 0.038 g/m² Max. |
| ASTM B 280 | Hard (H58) | 250 Min. | — | — | — | — |
| ASTM B 75 | Half hard (H55) | 250 – 325 | — | — | 30 – 60 HR 30T | — |
| ASTM B 75 | Hard (H80) | 310 Min. | — | — | 55 Min. HR 30T | — |
Chemical composition (section 2): IS 10773 : 2025 Cu-DHP 99.90% Min. (Cu + Ag), P 0.015 – 0.040%; JIS H 3300, ASTM B 68, ASTM B 280, ASTM B 75: C12200, 99.90% Min., P 0.015 – 0.040%.

## KB-05-03 Refrigerant compatibility (TDS)
status: needs_verification
safety_critical: false
source: frontend/src/assets/downloads/Spec-Sheets/Parasmani-HVAC-R-Copper-Tubes-TDS.pdf (section 2)
---
The internal bore is compatible with prominent modern refrigerants including R-410A, R-32, R-22, R-134a, R-600 and R-600a.

## KB-05-04 Refrigerant compatibility (website)
status: needs_verification
safety_critical: true
source: website HVAC page frontend/src/pages/industries/HvacRefrigiration.jsx; Straight tube FAQ frontend/src/pages/products/straightCopperTube/faqData.js
---
HVAC page lists: R22 (Legacy – HCFC), R32 (Next-gen – HFC), R410A (High pressure – HFC), R134a (Standard – HFC), R407C (Blend – HFC), R404A (Cold storage – HFC), R744 (CO₂ – Natural).
"C12200 DHP copper is chemically inert to all current commercial refrigerants. The tube wall is non-porous — refrigerant cannot migrate, permeate, or react with the copper at operating temperatures."
"R32 and R410A — Operate at significantly higher pressures than R22 — verify wall thickness against your system's MAWP using our Pressure Calculator before specifying."
note: The website lists R407C, R404A and R744, which the TDS does not. The TDS lists R-600 and R-600a, which the website does not. "Inert to all current commercial refrigerants" has no supporting document. See REVIEW.md B-03.

## KB-05-05 Internal cleanliness (TDS)
status: needs_verification
safety_critical: false
source: frontend/src/assets/downloads/Spec-Sheets/Parasmani-HVAC-R-Copper-Tubes-TDS.pdf (section 7)
---
Tubes are cut to size, duly drafted, and sealed at both ends.
Tubes are internally cleaned and tested to ensure residue after solvent evaporation does not exceed 0.038 g/m² of interior surface, ensuring optimal refrigeration performance.

## KB-05-06 VRV/VRF hard drawn tubes to JIS H3300: dimensions and pressure (3 m)
status: needs_verification
safety_critical: true
source: frontend/src/assets/downloads/brochures/Parasmani-HVAC-R-Brochure-2026.pdf (page 4); also frontend/src/assets/downloads/Spec-Sheets/Parasmani-HVAC-R-Copper-Tubes-TDS.pdf (section 6.1) and frontend/src/assets/downloads/deal-reference/Parasmani-VRF-Copper-Tube-Weight-Chart.pdf
---
PARASMANI - VRV/VRF COPPER TUBES AS PER JIS H3300 | STANDARD PIPE LENGTH: 3 MTR | Temper: Hard

| Ø Size (inches) | Ø Size (mm) | Thickness (mm) | ≈Thickness (SWG) | Weight per Ft. (KG) | Weight per Mtr. (KG) | Weight per Pipe (KG) | Max Working Pressure (MPa) | Bursting Pressure (MPa) | Pipes Per bundle |
|---|---|---|---|---|---|---|---|---|---|
| 1/4" | 6.35 | 0.80 | 21 | 0.039 | 0.125 | 0.380 | 44.14 | 88.27 | 100 |
| 3/8" | 9.53 | 0.80 | 21 | 0.061 | 0.197 | 0.600 | 28.35 | 56.69 | 50 |
| 1/2" | 12.70 | 0.80 | 21 | 0.082 | 0.268 | 0.810 | 20.90 | 41.79 | 50 |
| 5/8" | 15.88 | 0.80 | 21 | 0.104 | 0.339 | 1.020 | 16.54 | 33.07 | 40 |
| 5/8" | 15.88 | 1.00 | 19 | 0.128 | 0.418 | 1.260 | 20.89 | 41.78 | 30 |
| 3/4" | 19.05 | 0.80 | 21 | 0.126 | 0.411 | 1.240 | 13.69 | 27.38 | 30 |
| 3/4" | 19.05 | 1.00 | 19 | 0.155 | 0.507 | 1.530 | 17.26 | 34.52 | 25 |
| 7/8" | 22.23 | 0.80 | 21 | 0.147 | 0.482 | 1.450 | 11.67 | 23.34 | 25 |
| 7/8" | 22.23 | 1.00 | 19 | 0.182 | 0.597 | 1.800 | 14.70 | 29.40 | 20 |
| 1" | 25.40 | 0.88 | 20 | 0.186 | 0.607 | 1.830 | 11.23 | 22.45 | 25 |
| 1" | 25.40 | 1.00 | 19 | 0.210 | 0.686 | 2.060 | 12.81 | 25.61 | 20 |
| 1 1/8" | 28.58 | 1.00 | 19 | 0.237 | 0.775 | 2.330 | 11.34 | 22.68 | 15 |
| 1 1/4" | 31.75 | 1.10 | 18.5 | 0.289 | 0.947 | 2.850 | 11.23 | 22.45 | 15 |
| 1 3/8" | 34.93 | 1.21 | 18 | 0.350 | 1.146 | 3.440 | 11.23 | 22.45 | 10 |
| 1 1/2" | 38.10 | 1.32 | 17.5 | 0.416 | 1.364 | 4.100 | 11.23 | 22.45 | 10 |
| 1 5/8" | 41.28 | 1.43 | 17 | 0.488 | 1.601 | 4.810 | 11.23 | 22.45 | 8 |

Footer: "Safety Factor - Hard Copper Pipe: 2 | Soft Copper Coil: 3"
note: Pressure ratings must always be escalated to Sales (design brief rule), even when approved.

## KB-05-07 VRV/VRF soft annealed coils to JIS H3300 (15.24 m)
status: needs_verification
safety_critical: true
source: frontend/src/assets/downloads/brochures/Parasmani-HVAC-R-Brochure-2026.pdf (page 4); TDS section 6.2
---
PARASMANI - VRV/VRF COPPER TUBES AS PER JIS H3300 | STANDARD COIL LENGTH: 15.24 MTR | Temper: Soft (O)

| Ø Size (inches) | Ø Size (mm) | Thickness (mm) | ≈Thickness (SWG) | Wt. per Ft. (KG) | Wt. per Mtr. (KG) | Wt. per Coil (KG) | Max Working Pressure (MPa) | Bursting Pressure (MPa) | Coils Per Box |
|---|---|---|---|---|---|---|---|---|---|
| 1/4" | 6.35 | 0.80 | 21 | 0.039 | 0.125 | 1.900 | 19.15 | 57.44 | 12 |
| 3/8" | 9.53 | 0.80 | 21 | 0.061 | 0.197 | 3.000 | 12.30 | 36.90 | 9 |
| 1/2" | 12.70 | 0.80 | 21 | 0.082 | 0.268 | 4.100 | 9.07 | 27.20 | 7 |
| 5/8" | 15.88 | 0.80 | 21 | 0.104 | 0.339 | 5.150 | 7.17 | 21.52 | 5 |
| 5/8" | 15.88 | 1.00 | 19 | 0.128 | 0.418 | 6.350 | 9.06 | 27.19 | 5 |
| 3/4" | 19.05 | 1.00 | 19 | 0.155 | 0.507 | 7.750 | 7.49 | 22.47 | 4 |

## KB-05-08 Non VRV/VRF soft annealed coils to ASTM B68 (15.24 m)
status: needs_verification
safety_critical: true
source: frontend/src/assets/downloads/brochures/Parasmani-HVAC-R-Brochure-2026.pdf (page 4); TDS section 6.3
---
PARASMANI - NON VRV/VRF COPPER TUBES AS PER ASTM B68 | STANDARD COIL LENGTH: 15.24 MTR | Temper: Soft (O)

| Ø Size (inches) | Ø Size (mm) | Thickness (mm) | ≈Thickness (SWG) | Wt. per Ft. (KG) | Wt. per Mtr. (KG) | Wt. per Coil (KG) | Max Working Pressure (MPa) | Bursting Pressure (MPa) | Coils Per Box |
|---|---|---|---|---|---|---|---|---|---|
| 1/4" | 6.35 | 0.61 | 23 | 0.031 | 0.099 | 1.500 | 14.22 | 42.66 | 12 |
| 3/8" | 9.53 | 0.66 | 23 | 0.051 | 0.165 | 2.500 | 10.02 | 30.06 | 9 |
| 1/2" | 12.70 | 0.68 | 22 | 0.071 | 0.230 | 3.500 | 7.65 | 22.94 | 7 |
| 5/8" | 15.88 | 0.69 | 22 | 0.090 | 0.295 | 4.500 | 6.15 | 18.46 | 5 |
| 3/4" | 19.05 | 0.71 | 22 | 0.112 | 0.366 | 5.600 | 5.25 | 15.75 | 4 |
| 3/4" | 19.05 | 0.80 | 21 | 0.126 | 0.411 | 6.250 | 5.94 | 17.82 | 4 |

## KB-05-09 How the pressure figures are calculated (TDS)
status: needs_verification
safety_critical: true
source: frontend/src/assets/downloads/Spec-Sheets/Parasmani-HVAC-R-Copper-Tubes-TDS.pdf (section 6, footnote)
---
"W.T. = wall thickness · SWG = Standard Wire Gauge (approximate equivalent) · Ø = outside diameter."
"Bursting pressure is calculated by the modified Barlow equation, P = 2 × UTS × t / (D − 0.8 × t), where P is bursting pressure in MPa, UTS is ultimate tensile strength in MPa, t is wall thickness in mm and D is outside diameter in mm. Safety factor: hard temper 2, soft annealed 3. Maximum working pressure = bursting pressure ÷ safety factor. Conversion: 1 MPa = 145.038 psi."

## KB-05-10 ACR grade vs plumbing grade (website FAQ)
status: needs_verification
safety_critical: false
source: website frontend/src/pages/industries/HVAC/faqData.js; frontend/src/pages/products/straightCopperTube/faqData.js
---
"ACR (Air Conditioning & Refrigeration) grade tubes are manufactured to ASTM B280 — internally cleaned, degreased, and sealed with plastic end caps to prevent oil and moisture contamination. Plumbing grade tubes (EN 1057 / IS 10771) do not meet this internal cleanliness requirement. Using a plumbing-grade tube in a refrigeration circuit can contaminate compressor oil and void equipment warranties. Always specify ASTM B280 for any HVAC or refrigeration application."
note: Cites "IS 10771", which appears in no Parasmani document. See REVIEW.md B-05.

## KB-05-11 HVAC&R applications (website)
status: needs_verification
safety_critical: false
source: website frontend/src/pages/industries/HvacRefrigiration.jsx
---
Split & VRF Systems: "Residential and commercial split ACs, multi-split systems, and VRF networks across India. Pancake coils for indoor-outdoor connections, hard tubes for VRF header mains."
Chiller Plants: "Central AC for commercial buildings, hotels, hospitals and data centres. Hard tubes in large ODs for refrigerant mains and chilled water circuits."
Cold storage: "Walk-in coolers, deep freeze rooms, industrial cold stores. R404A and R134a compatible. Hard and soft copper for evaporator coils and condensate headers."
Process Cooling: "Industrial process chillers, heat exchangers, and condensers. Large diameter hard tubes up to 5 1/8"."
OEM Project Supply: "Trusted copper tubes and coils for HVAC OEMs and refrigeration applications. Supply standards aligned with leading brands like LG, Panasonic, and Haier."

## KB-05-12 Why copper for refrigeration (website)
status: needs_verification
safety_critical: false
source: website frontend/src/pages/industries/HvacRefrigiration.jsx (Thermal Conductivity Comparison)
---
Thermal conductivity shown: Aluminium 205 W/mK; Stainless Steel 50 W/mK; Carbon Steel 46 W/mK (copper value shown elsewhere on site as 391 W/mK).
"No other commercially available piping metal combines copper's thermal conductivity, pressure rating, corrosion resistance, and workability in a single material. It bends without cracking, brazes cleanly, and outlasts the systems it's installed in."
note: General copper physics, not a Parasmani document. The bot rule says no outside copper knowledge, so approve only if you want it repeated.
