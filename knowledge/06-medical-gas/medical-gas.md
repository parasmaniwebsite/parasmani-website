# 06 Medical Gas (MGPS)

Every entry in this folder is safety_critical. Even when approved, the bot gives general product information only and always offers WhatsApp Sales and Request a Quote. It never confirms that a tube is suitable or compliant for a specific installation.

## KB-06-01 MGPS TDS scope and standards
status: needs_verification
safety_critical: true
source: frontend/src/assets/downloads/Spec-Sheets/Parasmani-MGPS-Copper-Tubes-TDS.pdf (section 1)
---
This technical data sheet covers Parasmani MGPS phosphorus-deoxidized (DHP) seamless round copper tubes manufactured specifically for Medical Gas Pipeline Systems (MGPS) and medical vacuum services, intended for the safe and reliable distribution of medical gases in accordance with the applicable standards listed in this document.
BS EN 13348 — Medical gases and vacuum — primary medical gas standard for the tube
ASTM B819 — Medical gas tube — relevant requirements met
"Where a project specification calls for a standard other than the above, requirements shall be confirmed in writing prior to manufacture."

## KB-06-02 Material and chemical composition
status: needs_verification
safety_critical: true
source: frontend/src/assets/downloads/Spec-Sheets/Parasmani-MGPS-Copper-Tubes-TDS.pdf (section 2); frontend/src/assets/downloads/brochures/Parasmani-MGPS-Brochure-2026.pdf (page 2)
---
Material Grade: C12200 (DHP) / CW024A
Copper Content: Cu 99.90% minimum (including silver)
Phosphorus (deoxidizer): 0.015–0.040%
Total Impurities: Maximum 0.060% (excluding phosphorus and silver)
Copper Density: 8.94 g/cm³
Copper Melting Point: 1084.6 °C

## KB-06-03 Mechanical properties and temper (TDS)
status: needs_verification
safety_critical: true
source: frontend/src/assets/downloads/Spec-Sheets/Parasmani-MGPS-Copper-Tubes-TDS.pdf (section 3)
---
Temper (standard supply): Half Hard (R250)
Temper (on request): Hard (R290)
Tensile Strength: 250 MPa minimum (R250)
Elongation: 30% minimum
Vickers hardness, HV 5 (indicative)*: 75 to 100
Drift expanding test: No cracking on the surface
Flattening test: No cracking on the surface
Eddy current test: No detrimental flaw
Residual carbon, internal surface**: 0.20 mg/dm² maximum
Surface condition: Clean, smooth and free from scale, loose particles, oil, grease and moisture
"* Hardness is stated for guidance only and is not a requirement of the standard."
"** Determined using a carbon determinator in accordance with the reference method specified in EN 723."

## KB-06-04 Why Half Hard (TDS and brochure)
status: needs_verification
safety_critical: true
source: frontend/src/assets/downloads/Spec-Sheets/Parasmani-MGPS-Copper-Tubes-TDS.pdf (section 3); frontend/src/assets/downloads/brochures/Parasmani-MGPS-Brochure-2026.pdf (page 6)
---
TDS: "Why Half Hard: R250 is the temper recommended under BS EN 13348 for medical gas pipelines and is therefore Parasmani's standard supply. It resists long-term stress cracking, absorbs vibration and hammering rather than transmitting it to the joints, and accommodates thermal and seismic movement -- where hard drawn R290 is less tolerant."
Brochure comparison:
| Property | Half Hard R250 | Hard Drawn R290 |
|---|---|---|
| Long-term stress cracking | Resistant | More prone to stress cracking |
| Vibration and hammering | Absorbed by the tube | Transmitted to joints |
| Field bending / uneven surfaces | Accommodates movement | Higher risk of cracking |
| Thermal expansion & contraction | Absorbed by inherent ductility | Lower tolerance to movement |
| Seismic movement | Tolerant | Lower tolerance |

## KB-06-05 Temper (website, corrected 13 Nov 2026)
status: needs_verification
safety_critical: true
source: website frontend/src/pages/industries/medicalGas/MedicalGasMatrix.jsx, MedicalGasSpecifications.jsx, faqData.js
---
"Half Hard (R250) is the temper recommended under BS EN 13348 for medical gas pipelines and is therefore Parasmani's standard supply. It resists long-term stress cracking, absorbs vibration and hammering, and accommodates thermal and seismic movement. Hard (R290) is available on request."
note: The website previously said "supplied only in this temper". Parasmani confirmed on 13 Nov 2026 that Hard is also supplied, and the website was corrected to match the TDS (KB-06-03).

## KB-06-06 Manufacturing route and internal cleanliness (TDS)
status: needs_verification
safety_critical: true
source: frontend/src/assets/downloads/Spec-Sheets/Parasmani-MGPS-Copper-Tubes-TDS.pdf (section 4)
---
Tubes are produced by extrusion and cold drawing. No welded, brazed or seamed construction is used at any stage. The process sequence is: melting and casting → extrusion → drawing → cutting → straightening → annealing → visual inspection → eddy current and allied testing → packing.
For medical gas service, cleanliness of the bore is the governing requirement:
• Every tube is internally degreased after the final draw pass, thoroughly dried and securely end-capped before leaving the factory.
• Internal cleanliness is verified to the BS EN 13348 limit of 0.20 mg/dm² total residual carbon.
• Tubes are free from oil, grease, drawing lubricant, moisture, scale and metallic particles on both internal and external surfaces, and free from odour in the as-supplied condition.
• End caps remain in place through transport and storage and are removed only at the point of installation.

## KB-06-07 Oil residue claim (website) — CONFLICTS with KB-06-06
status: needs_verification
safety_critical: true
source: website frontend/src/pages/industries/medicalGas/faqData.js
---
"BS EN 13348 specifies a maximum oil residue of 100 mg/m² on the internal surface of medical gas copper tubes. This is measured on the internal surface area, not by length. Parasmani MGPS tubes are chemically degreased after the final draw pass and verified against this limit before packing."
note: CONFLICT. The TDS states the limit as 0.20 mg/dm² total residual carbon. The website also says "No lubricants are used in the final draw pass", while the TDS lists "drawing lubricant" as something removed. See REVIEW.md A-09.

## KB-06-08 Standard MGPS sizes, tolerances and packing (TDS / brochure, 15 sizes)
status: needs_verification
safety_critical: true
source: frontend/src/assets/downloads/Spec-Sheets/Parasmani-MGPS-Copper-Tubes-TDS.pdf (section 6); frontend/src/assets/downloads/brochures/Parasmani-MGPS-Brochure-2026.pdf (page 5)
---
PARASMANI MGPS STRAIGHT COPPER TUBES | STANDARD PIPE LENGTH: 3 MTR

| O.D. (mm) | W.T. (mm) | O.D. Tolerance | W.T. Tolerance | Weight Per Mtr. (kg) | Pipes Per Bundle | Weight Per Bundle |
|---|---|---|---|---|---|---|
| 10 | 0.9 | ±0.09 | ±0.09 | 0.231 | 50 | 34.65 |
| 12 | 0.7 | ±0.09 | ±0.07 | 0.223 | 50 | 33.45 |
| 12 | 1.0 | ±0.09 | ±0.10 | 0.309 | 40 | 37.08 |
| 15 | 0.7 | ±0.09 | ±0.07 | 0.282 | 40 | 33.84 |
| 15 | 0.9 | ±0.09 | ±0.09 | 0.357 | 40 | 42.84 |
| 15 | 1.0 | ±0.09 | ±0.10 | 0.394 | 35 | 41.37 |
| 22 | 0.9 | ±0.10 | ±0.09 | 0.534 | 25 | 40.05 |
| 22 | 1.0 | ±0.10 | ±0.10 | 0.590 | 20 | 35.40 |
| 28 | 0.9 | ±0.10 | ±0.09 | 0.686 | 20 | 41.16 |
| 28 | 1.0 | ±0.10 | ±0.10 | 0.759 | 15 | 34.16 |
| 35 | 1.2 | ±0.11 | ±0.12 | 1.140 | 10 | 34.20 |
| 42 | 1.2 | ±0.11 | ±0.12 | 1.376 | 10 | 41.28 |
| 54 | 1.2 | ±0.11 | ±0.12 | 1.780 | 8 | 42.72 |
| 76.1 | 1.5 | ±0.15 | ±0.225 | 3.143 | 4 | 37.72 |
| 108 | 1.5 | ±0.30 | ±0.225 | 4.487 | 3 | 40.38 |

TDS: "Custom wall thicknesses, cut-to-length and additional sizes are available on request -- including OD 70 mm and 80 mm, and 108 × 2.5 mm. Maximum outside diameter offered is 108 mm."
Standard pipe length: 3 mtr, (3000 mm) straight lengths. Length tolerance: + 10 mm / − 0 mm, unless otherwise agreed at the time of order.
Packing: Segregated by size, wall thickness and temper; both ends capped; bundled and crated for despatch by common carrier.
note: The MGPS Packaging Specifications PDF lists 21 sizes (KB-06-09). See REVIEW.md A-10.

## KB-06-09 MGPS sizes (MGPS Packaging Specifications, 21 sizes)
status: needs_verification
safety_critical: true
source: frontend/src/assets/downloads/deal-reference/Parasmani-MGPS-Copper-Tube-Packaging-Specifications.pdf (page 1)
---
Same table format as KB-06-08, plus these rows that are NOT in the TDS:
| O.D. (mm) | W.T. (mm) | O.D. Tolerance | W.T. Tolerance | Weight Per Mtr. (kg) | Pipes Per Bundle | Weight Per Bundle |
|---|---|---|---|---|---|---|
| 10 | 0.8 | ±0.09 | ±0.08 | 0.207 | 50 | 31.05 |
| 22 | 1.2 | ±0.10 | ±0.12 | 0.701 | 20 | 42.06 |
| 28 | 1.2 | ±0.10 | ±0.12 | 0.903 | 15 | 40.64 |
| 35 | 1.5 | ±0.11 | ±0.225 | 1.411 | 10 | 42.33 |
| 42 | 1.5 | ±0.11 | ±0.225 | 1.706 | 8 | 40.94 |
| 54 | 1.5 | ±0.11 | ±0.225 | 2.212 | 6 | 39.82 |
"Custom wall thicknesses and additional sizes available on request — contact sales."

## KB-06-10 Large-size claim (website) — CONFLICTS with TDS
status: needs_verification
safety_critical: true
source: website frontend/src/pages/industries/medicalGas/MedicalGasDimensions.jsx and ComplianceSection.jsx
---
"Standard range. 6mm to 108mm. Nominal outside diameters and wall thicknesses per BS EN 13348 Table 2."
"OD 133 mm, 159 mm, and 219 mm available to BS EN 13348 on request."
"The dedicated European standard for MGPS copper tubes. Parasmani is compliant across all 18 OD sizes."
note: CONFLICT. The TDS says "Maximum outside diameter offered is 108 mm". See REVIEW.md A-11.

## KB-06-11 BS EN 13348 dimensional matrix (brochure)
status: needs_verification
safety_critical: true
source: frontend/src/assets/downloads/brochures/Parasmani-MGPS-Brochure-2026.pdf (page 4)
---
"Nominal outside diameters and wall thicknesses as per BS EN 13348, in millimetres." R = European recommended dimension; X = Other European dimension.
| Nominal OD (mm) | 0.7 | 0.8 | 0.9 | 1.0 | 1.2 | 1.5 | 2.0 | Typical Use |
|---|---|---|---|---|---|---|---|---|
| 6 | – | – | – | X | – | – | – | Instrument lines |
| 8 | – | R | – | R | – | – | – | Small branch, instrument drops |
| 10 | – | R | – | R | – | – | – | Branch lines |
| 12 | – | X | – | R | – | – | – | Branch lines, bedhead |
| 14 | – | – | – | X | – | – | – | Branch lines |
| 15 | R | – | – | R | X | – | – | Ward distribution |
| 16 | – | – | – | X | – | – | – | Branch lines |
| 18 | – | – | – | R | X | – | – | Sub-main distribution |
| 22 | – | – | R | R | X | R | – | Zone valve to ward headers |
| 28 | – | – | R | R | X | R | – | Floor headers, OT supply |
| 35 | – | – | – | X | R | R | X | Building mains |
| 42 | – | – | – | X | R | R | X | Rising mains, plant room |
| 54 | – | – | – | X | R | R | R | Main distribution headers |
| 64 | – | – | – | – | – | – | R | Large hospital mains |
| 66.7 | – | – | – | – | R | – | R | Large hospital mains |
| 76.1 | – | – | – | – | – | R | R | Multi-building distribution |
| 88.9 | – | – | – | – | – | – | R | Hospital campus main |
| 104 | – | – | – | – | – | – | X | Central plant output |
| 108 | – | – | – | – | – | R | – | Central plant output |
"OD 70 and 80 mm, and 108 × 2.5 mm, available on request. Custom wall thicknesses and cut-to-length available for project requirements."
note: This is the STANDARD's table, not Parasmani's stock list. Many combinations (e.g. 6 × 1.0, 64 × 2.0) are not in the TDS. The website version omits the 66.7 row. Recommend NOT approving. A customer would read it as "Parasmani makes all of these". See REVIEW.md B-07.

## KB-06-12 MGPS tube marking
status: needs_verification
safety_critical: true
source: frontend/src/assets/downloads/Spec-Sheets/Parasmani-MGPS-Copper-Tubes-TDS.pdf (section 7)
---
Every straight length carries a permanent surface marking applied by laser print / electro-etching, together with a Parasmani security hologram. The marking sequence is:
PARASMANI MGPS · EN 13348 · HH / R250 · Cu DHP · 15 mm · 1.0 mm · PT120875
Read in order: brand name · standard · temper · grade · outside diameter · wall thickness · batch number. The batch number is traceable to the mill test certificate issued with the consignment.
note: The website says "Marked At Every Metre — Ink Stamped", which conflicts with "laser print / electro-etching". See REVIEW.md A-12.

## KB-06-13 Jointing and brazing guidance (TDS / brochure)
status: needs_verification
safety_critical: true
source: frontend/src/assets/downloads/Spec-Sheets/Parasmani-MGPS-Copper-Tubes-TDS.pdf (section 8); frontend/src/assets/downloads/brochures/Parasmani-MGPS-Brochure-2026.pdf (page 6)
---
Brochure: "Use end-feed capillary fittings to BS EN 1254-1:2021, factory degreased for oxygen service and supplied individually sealed in protective packaging. Insert the tube fully to the shoulder stop."
"Braze with CP 104 copper-silver-phosphorus filler to BS EN ISO 17672 — no flux is required on copper-to-copper joints. Indicative minimum brazing temperature is 710 °C. Penetration must reach three times the wall thickness or 3 mm, whichever is greater."
"Nitrogen shielding. Oxygen-free nitrogen must flow through the pipework throughout brazing to prevent oxide scale forming on the bore. Flush first to clear air, maintain flow while brazing, and purge afterwards to remove shield gas and particulate."
"Ensure the torch reaches brazing temperature across the full joint; oxy-acetylene or oxygen-fed LPG is recommended, as air-fed LPG may not reach temperature on larger sizes. Avoid prolonged heating. In confined spaces, ventilate to prevent nitrogen build-up and monitor ambient oxygen content."
note: The website Medical Gas FAQ was aligned to this wording on 13 Nov 2026.

KB-06-14 retired 13 Nov 2026. The website claim (45% silver alloy mandatory, phosphor-copper rod forbidden for MGPS) was removed at Parasmani's request. The Medical Gas FAQ now uses the TDS wording in KB-06-13. Do not reuse this ID.

## KB-06-15 Gases and applications (website)
status: needs_verification
safety_critical: true
source: website frontend/src/pages/industries/medicalGas/ApplicationPage.jsx
---
Medical Oxygen (O₂): "Piped oxygen to ICUs, operating theatres, emergency bays, and ward bedhead units. Cleaned, capped, and supplied in Half Hard R250 for continuous pressure service."
Nitrous Oxide (N₂O): "Anaesthetic agent for operating theatres and obstetrics. Supplied to the same BS EN 13348 cleanliness specification as oxygen lines."
Medical Air: "Compressed medical air for ventilators, pneumatic surgical tools, and anaesthetic machines."
Surgical Vacuum: "Medical vacuum pipelines for wound drainage, airway management, and surgical aspiration."
CO₂ & Specialty Gases: "Carbon dioxide for laparoscopic surgery, helium and nitrogen for diagnostic equipment — same Half Hard R250 copper to EN 13348."
Pharma & Research: "Pharmaceutical manufacturing and biomedical research facilities requiring piped process gases and vacuum to EN 13348 cleanliness standards."

## KB-06-16 Hospital project supply (website)
status: needs_verification
safety_critical: true
source: website frontend/src/pages/industries/medicalGas/ApprovalsSection.jsx and faqData.js
---
"Material test certificates (MTC) and project references are available on request to support your specification, approval, and procurement requirements."
"Parasmani MGPS copper tubes have been supplied for medical gas pipeline systems across government and private hospital projects in India, through MGPS turnkey contractors and system integrators. Project references and MTC documentation are available on request."
note: No hospital project or approval document is in the repo. See REVIEW.md B-08.
