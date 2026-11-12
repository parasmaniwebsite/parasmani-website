# 02 Straight Copper Tubes

## KB-02-01 Product range (Product Catalogue)
status: needs_verification
safety_critical: false
source: frontend/src/assets/downloads/brochures/Parasmani_Product_Catalog_2026.pdf (page 3)
---
Seamless straight copper tubes for HVAC/R, medical gas, plumbing, fuel gas, and industrial applications. Manufactured from C12200 DHP copper cathodes, 100% eddy current tested, available in both Parasmani and PTP K-Series brands.
Temper: Hard, Half Hard, Quarter Hard
Size Range (Outer Diameter): 6 mm to 130 mm
Wall Thickness: 0.7 mm to 3.25 mm
Length: Up to 6000 mm
Applications: HVAC/R, Medical Gas, Plumbing, Industrial, Fuel Gas
Brands: Parasmani and PTP K-Series

## KB-02-02 Product range (HVAC/R TDS and HVAC/R brochure)
status: needs_verification
safety_critical: false
source: frontend/src/assets/downloads/Spec-Sheets/Parasmani-HVAC-R-Copper-Tubes-TDS.pdf (section 4); frontend/src/assets/downloads/Spec-Sheets/PTP-K-Series-HVAC-R-Copper-Tubes-TDS.pdf (section 4); frontend/src/assets/downloads/brochures/Parasmani-HVAC-R-Brochure-2026.pdf (page 3)
---
Condition / Temper: Hard drawn, light drawn (half hard), light annealed (quarter hard)
Size Range (Outside Diameter): 6 mm to 130 mm
Wall Thickness: 0.70 mm to 2.0 mm
Length: Up to 6000 mm
note: Wall thickness conflicts with KB-02-01 (3.25 mm). See REVIEW.md A-02.

## KB-02-03 Product range (Fuel Gas, Plumbing and Industrial brochures)
status: needs_verification
safety_critical: false
source: frontend/src/assets/downloads/brochures/Parasmani-Fuel-Gas-Brochure-2026.pdf (page 2); Parasmani-Plumbing-Brochure-2026.pdf (page 2); Parasmani-Industrial-Brochure-2026.pdf (page 2)
---
Straight Copper Tubes — O.D. Range: 6 mm – 130 mm; W.T. Range: 0.70 mm - 3.25 mm; Temper: H / HH / QH; Length: 3 m
note: Length "3 m" here vs "Up to 6000 mm" in KB-02-01. See REVIEW.md A-03.

## KB-02-04 Hard drawn availability limits
status: needs_verification
safety_critical: false
source: frontend/src/assets/downloads/Spec-Sheets/Parasmani-HVAC-R-Copper-Tubes-TDS.pdf (section 4); frontend/src/assets/downloads/deal-reference/Parasmani-Copper-Tube-Packaging-Specifications.pdf (page 1)
---
TDS: "Hard drawn tubes are available in sizes up to 5⅛" OD, wall thicknesses up to 10 SWG and lengths up to 6 metres."
Packaging Specifications: "Hard temper copper tubes are available in sizes up to 5⅛" OD (Ø), wall thicknesses up to 10 SWG, and lengths up to 6 meters. For custom requirement, please contact our Sales Team."

## KB-02-05 Standard length (website)
status: needs_verification
safety_critical: false
source: website Straight Copper Tube page frontend/src/pages/products/straightCopperTube/SpecificationsSection.jsx and faqData.js
---
"Standard length is 3m ≈ 10ft. Custom lengths available on request to suit specific project requirements."
FAQ: "Our standard idle length is 3 metres. We also regularly supply 6-metre lengths. Custom lengths — including cut-to-size — are available on request, subject to minimum order quantities."
Length slider on the page runs from 300 mm to 6000 mm.

## KB-02-06 OD × thickness availability matrix
status: needs_verification
safety_critical: false
source: frontend/src/assets/downloads/brochures/Parasmani_Product_Catalog_2026.pdf (page 3)
---
"○ = Available in this combination"

| OD (mm) | 2.00 mm (14 SWG) | 1.63 mm (16 SWG) | 1.21 mm (18 SWG) | 1.00 mm (19 SWG) | 0.90 mm (20 SWG) | 0.80 mm (21 SWG) |
|---|---|---|---|---|---|---|
| 6 – 12 mm | | ○ | ○ | ○ | ○ | ○ |
| 12 – 19 mm | | ○ | ○ | ○ | ○ | ○ |
| 19 – 28 mm | | ○ | ○ | ○ | ○ | ○ |
| 28 – 35 mm | ○ | ○ | ○ | ○ | ○ | ○ |
| 35 – 55 mm | ○ | ○ | ○ | ○ | ○ | |
| 55 – 80 mm | ○ | ○ | | | | |
| 86 – 102 mm | ○ | ○ | | | | |
| 102 – 130 mm | ○ | ○ | | | | |

"For custom sizes contact our sales team"
note: There is no row for 80–86 mm. See REVIEW.md D.

## KB-02-07 Tempers explained (website)
status: needs_verification
safety_critical: false
source: website Straight Copper Tube page frontend/src/pages/products/StraightCopperTube.jsx (Temper Guide)
---
"All three tempers are available in straight lengths. Select based on your installation requirements – bending radius, pressure rating, and handling."
Hard: "For rigid straight runs where no bending is required. Maximum pressure rating. Ideal for exposed piping, riser mains, and structural installations." Tags: HVAC Mains, Riser Pipes.
Half Hard: "General-purpose temper offering a balance of strength and limited formability. Suitable for most HVAC and plumbing applications with gentle offsets." Tags: General HVAC, Cold Storage.
Quarter Hard: "Softest straight-length temper — allows field bending with standard tube benders. Used where tight radius changes are needed without coil format." Tags: Medical MGPS, Tight Bends, Field Forming.
note: The "Medical MGPS" tag on Quarter Hard contradicts the MGPS datasheet (Half Hard R250). See REVIEW.md A-04.

## KB-02-08 Material (website)
status: needs_verification
safety_critical: false
source: website frontend/src/pages/products/straightCopperTube/PuritySection.jsx
---
Material: C12200 DHP, 99.90% Purity. "Manufactured from A-Grade copper cathodes using C12200 (DHP) phosphorus - deoxidized copper with a minimum 99.90% copper purity."
Cu ≥ 99.90%; P: 0.015–0.040%
Seamless · Cold Drawn
note: The same section also says "Fully annealed to a soft temper state", which is wrong for straight tubes (copy-paste from the coil page). See REVIEW.md A-05.

## KB-02-09 Straight tube marking (TDS)
status: needs_verification
safety_critical: false
source: frontend/src/assets/downloads/Spec-Sheets/Parasmani-HVAC-R-Copper-Tubes-TDS.pdf (section 9)
---
Every tube carries a permanent surface marking together with two Parasmani authentication holograms. The marking sequence is:
PARASMANI · IS 10773 : 2025 · Cu-DHP · HARD DRAWN · 12.70 mm · 0.80 mm · PT120875
Read in order: brand name · standard · grade · condition · dimensional details · lot number. The lot number is traceable to the mill test certificate issued with the consignment.
(PTP K-Series TDS: same sequence beginning "PTP K-SERIES".)
