# Knowledge Base Review — read this before approving anything

Prepared 13 Nov 2026 from 20 PDFs in `frontend/src/assets/downloads/` and every product, industry, about, quality, tools and contact page in `frontend/src/`. Scanned PDFs (brochures, certificates, approvals) were read page by page as images.

**Headline:** the PDFs are mostly consistent with each other. The website is not. It contradicted the Parasmani MGPS datasheet on brazing, temper, cleanliness limit and maximum size; brazing and temper were fixed on 13 Nov 2026. It also describes several approvals more strongly than the documents support (B-01). The BIS certificate on the site appears to have lapsed and covers a narrower scope than the datasheets claim (A-18).

---

## (a) Conflicts between sources

🔴 = safety or credibility risk · 🟠 = a customer would get a different answer depending on where they look · ⚪ = tidy-up

| # | Topic | Source 1 says | Source 2 says | Entries |
|---|---|---|---|---|
| ✅ A-13 | Medical gas brazing filler | **Resolved 13 Nov 2026.** The website's 45%-silver / no-phosphor-copper claim was removed; the Medical Gas FAQ now matches the TDS (CP 104, no flux). | | KB-06-13 |
| ✅ A-08 | MGPS temper | **Resolved 13 Nov 2026.** Parasmani confirmed Hard is also supplied. The website now says Half Hard is the standard supply, Hard (R290) on request, matching the TDS. | | KB-06-03, KB-06-05 |
| 🔴 **A-09** | MGPS internal cleanliness limit | MGPS TDS: "0.20 mg/dm² total residual carbon" | Website FAQ: "BS EN 13348 specifies a maximum oil residue of 100 mg/m²". **Owner not sure (13 Nov 2026). Needs QA or an engineer.** Both stay unapproved, so the bot will hand this question to Sales. | KB-06-06, KB-06-07 |
| 🔴 **A-11** | MGPS largest size | MGPS TDS: "Maximum outside diameter offered is 108 mm" | Website: "OD 133 mm, 159 mm, and 219 mm available to BS EN 13348 on request" | KB-06-08, KB-06-10 |
| 🔴 **A-04** | Which temper for MGPS | MGPS TDS: Half Hard (R250) | Website straight-tube Temper Guide tags **Quarter Hard** with "Medical MGPS" | KB-02-07 |
| 🔴 **A-15** | Brazing rod (general) | Installation Guide: "Copper to copper: phos-copper rod, no flux" (no exception for gas) | Website gas pages: phos-copper "must never be used for gas piping". Website water FAQ: "phosphor-copper acceptable for water". Plumbing page: solder or BAg-7 | KB-12-04, KB-08-05, KB-08-09, KB-07-06 |
| 🟠 **A-18** | BIS licence | **Current licence is CM/L - 7100071995, renewed under the same number (confirmed 13 Nov 2026).** The website card wrongly said 7200083993; fixed. | Still open: the certificate image on /certifications is the pre-renewal copy (valid to 2025-09-11, IS 10773 : 1995, soft annealed and light drawn, 6.35–41.30 mm OD, 0.45–1.43 mm wall). Add the renewal so its validity and scope can be checked against the TDS claims (IS 10773 : 2025, hard drawn). | KB-10-06, KB-10-14 |
| 🟠 A-10 | MGPS sizes offered | MGPS TDS + brochure: 15 sizes | MGPS Packaging Specifications: 21 sizes (adds 10×0.8, 22×1.2, 28×1.2, 35×1.5, 42×1.5, 54×1.5). Website: "compliant across all 18 OD sizes" | KB-06-08, KB-06-09, KB-06-10 |
| 🟠 A-12 | MGPS marking method | MGPS TDS: "laser print / electro-etching" | Website: "Marked At Every Metre — Ink Stamped" | KB-06-12 |
| 🟠 A-02 | Straight tube max wall | Catalogue + Fuel Gas / Plumbing / Industrial brochures: 0.7 (0.70) mm to 3.25 mm | HVAC/R TDS + HVAC/R brochure: 0.70 mm to 2.0 mm | KB-02-01, KB-02-02, KB-02-03 |
| 🟠 A-03 | Straight tube length | Catalogue + TDS: "Up to 6000 mm" | Fuel Gas / Plumbing / Industrial brochures: "3 m" (as the length, not "standard") | KB-02-01, KB-02-03, KB-02-05 |
| 🟠 A-06 | Fittings sizes and walls | Catalogue overview: ID 6–130 mm, wall 0.7–2.0 mm | Same page ASME table: wall 0.71–3.25 mm. EN 1254-1 table: OD 6–108 mm, wall 0.6–2.5 mm. Website: "1/4" to 4" inside diameter" next to "6 mm - 130 mm" (130 mm is 5-1/8") | KB-04-01 to KB-04-06, KB-04-11 |
| 🟠 A-14 | Copper max water temperature | Plumbing brochure: "200ºC+" | Website: "120°C" (also lists CPVC 93°C vs brochure ~60ºC) | KB-07-04, KB-07-05 |
| 🟠 A-17 | What ASTM B819 is | MGPS TDS, website: "Medical gas tube" | Product Catalogue: "ASTM B819 \| Plumbing, Heating & Gas Systems" | KB-10-03 |
| 🟠 A-19 | 0.80 mm wall above 1 1/4" | Generic Weight Chart PDF: gives weights (e.g. 1 1/4" = 0.696 kg/m) | HVAC/R brochure copy of the same chart: "–" (not offered?) | KB-13-05 |
| 🟠 A-01 | Address and email | Website, ISO certificates: "5/2, GIDC, Umbergaon"; sales@parasmanicopper.com | HVAC/R brochure: "6/1, Mahavir Industries, GIDC Umbergaon"; sales@parasmanitubes.com. Installation Guide: "5/2 & 6/1" | KB-01-06 to KB-01-08, KB-16-02 |
| 🟠 A-07 | Raw material | HVAC/R brochure: cathodes "99.99% purity". Website: "Exclusively ... electrolytic copper cathodes" | Quality Policy: "copper cathode and mill berry copper" | KB-01-10 |
| ⚪ A-05 | Straight tube purity panel | Website straight-tube page says "Fully annealed to a soft temper state" | Straight tubes are H / HH / QH (copy-paste from coil page; also on Fittings page) | KB-02-08 |
| ⚪ A-16 | 14 SWG | Catalogue: "2.00 mm (14 SWG)" | Website industrial table: "14 SWG / 2.03 mm" | KB-02-06, KB-09-05 |
| ⚪ A-20 | Coil box layers | Catalogue icon: "Four-Layer Protective Wrap" (lists three) | Packaging Specifications: "three-layer protection" | KB-14-02 |
| ⚪ — | 3/8" OD | All datasheets: 9.53 mm | Website 1.5 TR FAQ: 9.52 mm | KB-11-02 |
| ⚪ — | Coil OD range | Range: 4.76 mm to 22.23 mm; wall 0.4–1.2 mm | Size guide starts at 6.35 mm; walls up to 1.21 mm | KB-03-01, KB-03-02 |
| ⚪ — | ISO 9001 scope | Certificate: "Copper Tubes, Copper Fittings and HVAC/R Products" | HVAC/R TDS: "copper tubes and fittings for use in air conditioning and refrigeration systems" | KB-10-07 |
| ⚪ — | MTC | TDS: certificate "accompanies every despatch" | Website: "available for every batch on request" | KB-10-10 |
| ⚪ — | Company name | Everywhere: Parasmani Tubes Copper Pvt. Ltd. | Tools disclaimer: "Parasmani Copper Pvt. Ltd." | KB-13-02 |
| ⚪ — | MGPS matrix | Brochure: 19 ODs incl. 66.7 | Website: 18 ODs, no 66.7 | KB-06-11 |

## (b) Claims with no supporting document

| # | Claim (where) | Problem |
|---|---|---|
| 🔴 **B-01** | **Approvals wording** (HVAC page, Industrial page) | **Panasonic**: website says "Vendor Approval Certificate"; the PDF is a purchase order. **Haier**: "Vendor Approval"; no document at all. **CLW**: "assessment cleared" / "CLW Approved"; the letter says the offer is "under active consideration ... subject to successful capacity cum capability assessment". **DMRC**: "Delhi & Patna Metro"; the letter covers Patna Metro PE-02 only. **SBI**: "across SBI premises"; the document is one Surat branch tender. **Adani**: "Approved"; the document is printed "Issue for approval". Fix the website wording, or add the missing documents. |
| 🔴 B-02 | RoHS and CE compliance (Downloads, Quality Policy, brochure icons) | No certificate or declaration in the repo. CE marking is unusual for copper tube; confirm it exists before listing it. |
| 🟠 B-03 | Refrigerants R407C, R404A, R744, R448A, R449A and "inert to all current commercial refrigerants" (website) | The TDS lists only R-410A, R-32, R-22, R-134a, R-600, R-600a. |
| 🟠 B-04 | "Marine Grade", "Offshore Grade", "GMP Compliant", "Hygienic Grade", "Lab Grade", "Validated Systems", "-40°C Rated" (Industrial page tags) | Same C12200 tube; no grade, test or certificate backs these labels. |
| 🟠 B-05 | Standards JIS H 3401, IS 10771, IS 3589, BS 2871, EN 12449, ASTM B837, EN 12735, EN 1057 | Cited on site or brochures, but no Parasmani TDS covers them. IS 10771 and IS 3589 look like errors: IS 3589 is a steel pipe standard. The straight-tube FAQ says "Parasmani tube is manufactured to both" EN 1057 and EN 12735 / ASTM B280. There is no TDS for EN 1057 or EN 12735. |
| 🟠 B-06 | Gas: "Permitted above ground", "every serious code recommends", "Zero" permeation (Fuel Gas brochure + website) | Code claims with no reference. |
| 🟠 B-07 | BS EN 13348 dimensional matrix (MGPS brochure + website) | It is the standard's table, presented as Parasmani's range. Customers will read 6 × 1.0, 64 × 2.0, 88.9 × 2.0 etc. as available, but the TDS does not list them. |
| 🟠 B-08 | Hospital and MGPS project supply (website) | No hospital approval or project document in the repo. |
| 🟠 B-09 | "approved for drinking water contact under ... WHO guidelines"; "Copper ions actively inhibit Legionella" (Plumbing) | Regulatory/health claims, no source. |
| 🟠 B-10 | "Brands We've Served" logo wall (40 brands) | Only the disclaimer ("directly or indirectly ... through our vendors and channel partners") makes it defensible. The bot should not repeat it. |
| 🟠 B-11 | Pressure calculator UTS: Half Hard 275 MPa, Quarter Hard 240 MPa | Not in any datasheet (JIS half hard is 245–325). The calculator's quarter-hard pressures have no documented basis. |
| ⚪ — | "Third-party lab reports can be arranged" (many FAQs) | Only support: "Select tests are conducted through NABL-approved third-party laboratories, as required." |
| ⚪ — | "Since 1989", "36+ years", "300+ MT/Month" | No document. |
| ⚪ — | Ready stock up to 2 1/8" / 16 SWG; "no MOQ on ready stock"; "15 working days"; "10-15 days" | Commercial; always escalated anyway. |
| ⚪ — | "1.5 TR = 1/4" + 3/8"; upsize suction over 10 m"; gas riser "22 mm for 4–6 flats" | Sizing advice with no engineering source. |
| ⚪ — | Industrial "Industry standard is 4-6 weeks" | Competitor claim, no source. |

## (c) Safety content an engineer must review before approval

Everything below is marked `safety_critical: true`. Even after approval, the bot gives only general product information on these topics and always shows the Sales buttons.

1. **Medical gas, all of folder 06.** A-13 and A-08 are fixed. Still open on the website: A-09 (cleanliness limit), A-11 (max OD 219 mm vs 108 mm) and A-04 (Quarter Hard tagged "Medical MGPS").
2. **Fuel gas, all of folder 08.** Brazing alloy (A-15), sizing table KB-08-03, riser sizing KB-08-04, code claims KB-08-06 / KB-08-07. There is no fuel gas datasheet, so ASTM B837 / EN 1057 conformance is asserted but not documented.
3. **Pressure ratings**: KB-05-06, KB-05-07, KB-05-08, KB-05-09, KB-13-03. Check that the published working and bursting pressures are what Parasmani is prepared to stand behind. The arithmetic matches (burst ÷ SF), but no tested values back them.
4. **Installation Guide** (KB-12-04): written for refrigeration but not labelled as such; its "phos-copper rod" step conflicts with the gas and MGPS guidance.
5. **Sizing tables** for plumbing (KB-07-03), gas (KB-08-03), industrial (KB-09-05) and HVAC selection (KB-11-01, KB-11-02).
6. **CO₂ / R744** (KB-09-03) and the refrigerant list (KB-05-04, KB-12-01).
7. **Tolerances** (KB-10-13) and **standards lists** (KB-10-01 to KB-10-05), including the BIS licence number (A-18).

## (d) Likely questions the knowledge base does not cover

The bot will escalate these. Adding an approved answer for the common ones will cut Sales load.

- **Price, stock, delivery, MOQ, payment terms, GST invoicing, freight.** Escalate by design.
- **Dealer / distributor near me**, city-wise availability, and whether Parasmani sells retail to a single plumber.
- **Exact availability of a specific size** that falls between the published tables (e.g. 80–86 mm OD, which the catalogue matrix skips; 5/16" coil in walls other than 0.50–0.60 mm).
- **Copper tube types K / L / M (ASTM B88)**: ASTM B88 is listed, but there is no K/L/M size table.
- **Insulated (pre-insulated) copper pipe** and K-Flex pairing: Parasmani distributes K-Flex but no product data is here.
- **Fittings:** pressure ratings, long-radius elbow sizes, end caps, U-bend radii, brass or flare fittings. There is no fittings datasheet at all.
- **Fuel gas datasheet** (sizes per ASTM B837, gas-specific marking): none exists.
- **Plumbing datasheet** for EN 1057 (tolerances, R220/R250/R290 tempers): none exists.
- **Warranty** on tubes and fittings: not stated anywhere.
- **Returns and claims process**; what to do with a damaged bundle on arrival.
- **Export:** which countries, export packaging, documents (COO, test reports).
- **Counterfeit check:** how to verify a hologram. Holograms are mentioned everywhere, but nothing says how to check one.
- **Inner diameter / flow capacity** per size, and **bend radius** limits for soft coils.
- **Annealing a hard tube on site**, and **flaring** limits.
- **Compatibility with ammonia (R717).** Only the Industrial brochure says "Not suitable"; this is worth a clear approved entry.
- **Copper price basis (LME/BME)** and price-escalation clauses.
- **PTP K-Series vs Parasmani**: what is actually different apart from the brand. The TDSs are identical.
- **Submittal / compliance letter** for a consultant: the Downloads page offers an HVAC-R submittal by hard copy only.
- **Sales office address in Mumbai**: mentioned, no address given.

## What I did not include

- **Supplier Code of Conduct**: read; it is internal policy for suppliers, not customer information.
- **Blog posts**: they come from the live database, not the repo, so I could not read them. They are also editorial; I recommend the bot never cites blogs.
- **Privacy Policy / Terms**: not product knowledge. The bot should link to them, not quote them.
- **SEO structured data** (`frontend/src/seo/schema.js`, `faqSources.js`): it duplicates the page FAQs captured above.
