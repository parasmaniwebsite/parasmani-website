# 12 Technical FAQs

FAQ answers that belong to one product or industry are filed there (02–09). This file holds the cross-cutting ones.

## KB-12-01 Same tube for R32 as R22?
status: needs_verification
safety_critical: true
source: website frontend/src/pages/industries/HVAC/faqData.js; frontend/src/pages/products/straightCopperTube/faqData.js
---
"Yes — C12200 DHP copper is compatible with R22, R32, R410A, R134a, R407C, and R404A. The difference is working pressure: R32 and R410A operate at significantly higher pressures than R22, so a thicker wall may be required for the same OD. Use our Pressure Calculator to verify your wall selection against the system's maximum allowable working pressure before specifying."
note: The refrigerant list differs from the TDS (KB-05-03). Wall suitability is always escalated.

## KB-12-02 Press-fit compatibility of tube (website FAQ)
status: needs_verification
safety_critical: false
source: website frontend/src/pages/products/straightCopperTube/faqData.js
---
"Yes. Parasmani hard drawn seamless copper tube is compatible with both press-fit and brazed wrought fittings. Hard drawn temper provides the dimensional consistency and roundness that press-fit systems require, while remaining fully compatible with standard brazed jointing practice. Always verify the fitting manufacturer's specified tube standard — most press-fit systems for plumbing reference EN 1057, while HVAC press-fit systems typically specify ASTM B280 or EN 12735. Parasmani tube is manufactured to both."
note: "Manufactured to both" (EN 1057 and EN 12735/ASTM B280) has no datasheet support. The TDS lists neither EN 1057 nor EN 12735. See REVIEW.md B-05.

## KB-12-03 Brazing rods for HVAC fittings (website FAQ)
status: needs_verification
safety_critical: true
source: website frontend/src/pages/products/copperFittings/faqData.js
---
"For most HVAC and refrigeration applications: BCuP-2 or BCuP-5 phosphor-copper brazing rod (no flux required on copper-to-copper joints). For potable water plumbing, use lead-free solder or silver braze per EN 1254. Always purge with nitrogen during brazing to prevent internal oxidation scale formation."
note: The MGPS sentence was removed from the website on 13 Nov 2026.

## KB-12-04 Installation steps (Installation Guide)
status: needs_verification
safety_critical: true
source: frontend/src/assets/downloads/Technical-Handbooks/Parasmani-Installation-Guidelines.pdf
---
Before you start: Wear safety glasses and leather gloves; Wear cotton clothing only (no synthetics); Keep a fan running for air circulation; Keep cylinders upright and secured with a chain/strap; Nitrogen through a regulator, never off the bare cylinder; Keep water or a fire extinguisher within reach.
01 Store It Right — Under a roof, off the floor, caps on till you cut. Away from cement, plaster and chemicals. Coils flat, not on edge.
02 Cut It Square — Tube cutter only, no hacksaw, no grinder. Quarter turn at a time. Point the end down, ream the inside burr.
03 Clean It — Rub the tube end bright with abrasive cloth. Brush the socket inside. No emery paper, no steel wool, no bare fingers after.
04 Fit It — Push the tube fully in till it touches the shoulder. Turn it once to seat it. Support the pipe so it cannot move while hot.
05 Start Nitrogen — Through a regulator, very low flow a drift, not a blast. Far end must stay open, or it blows the joint out. On before the torch, off only when the joint is cool.
06 Braze It — Copper to copper: phos-copper rod, no flux. To brass or steel: silver rod with flux. Heat the copper till dull cherry red, flame always moving. Touch the rod to the joint, not the flame. Stop at one complete ring.
07 Let It Cool — Still air, nitrogen still running. Never water, never a wet cloth.
08 Check Every Joint — Complete ring, no pinholes, copper not grey and scaly. Bad joint? Cut it out. Never braze over it. Photograph anything that is going to be hidden.
09 Pressure Test — Nitrogen only. Isolate the compressor and valves first. Raise in three stages, hold 24 hours. Soap-water every joint. Note start and end temperature.
10 Vacuum and Close — Below 500 microns on a micron gauge, hold steady. Rising then settling = moisture. Pull down again. Insulate after the test passes. Seal every seam.
NEVER DO THIS: Braze a line still under pressure or gas; Purge or test with air or oxygen; Use a phos-copper rod on steel; Skip the nitrogen, black soot inside the pipe is what kills the compressor.
note: The guide is written for refrigeration (compressor, vacuum) but does not say so. Step 06 "phos-copper rod" contradicts the website's gas and medical gas brazing advice. See REVIEW.md A-15.

## KB-12-05 Minimum order quantity (website FAQ)
status: unavailable
safety_critical: false
source: website frontend/src/pages/products/straightCopperTube/faqData.js; frontend/src/pages/industries/IndustrialAndProcessApplications/faqData.js
---
Straight tube FAQ: "MOQ varies by size and temper. For standard sizes (1/4" to 1" OD, ASTM B280), we maintain ready stock and can supply from a single bundle. For larger diameters, non-standard wall thicknesses, or custom lengths, a minimum production quantity applies."
Industrial FAQ: "There is no minimum order quantity on ready stock sizes."
note: MOQ, stock and lead time are commercial and are always escalated to Sales.

## KB-12-06 Does copper react with hard water (website FAQ)
status: needs_verification
safety_critical: false
source: website frontend/src/pages/industries/PlumbingAndWaterSupply/faqData.js
---
"In most cases, hard water is actually beneficial for copper plumbing — the calcium carbonate in hard water deposits a thin protective patina on the inside of copper pipes that reduces copper ion release and extends service life. Copper can be used in virtually all Indian water conditions. In very soft, acidic water (pH below 6.5), copper may corrode at a faster rate — but this is uncommon in India. If you have concerns about local water chemistry, consult with a water quality engineer."
note: General copper chemistry, not a Parasmani document.

## KB-12-07 Fire behaviour of copper gas pipe (website FAQ)
status: needs_verification
safety_critical: true
source: website frontend/src/pages/industries/HouseHoldAndFuelGas/faqData.js
---
"Copper is non-combustible — it does not burn, does not melt and drip, and does not emit toxic fumes when exposed to fire. In a building fire, copper gas pipes hold their structural integrity significantly longer than plastic alternatives."
