# Launch list: approve these first (about 10 minutes)

These entries are low-risk and cover the questions most visitors ask first. None is medical gas, fuel gas, pressure or sizing advice. Approving them lets Ask Parasmani go live answering real questions. Everything else can be approved later, and anything unapproved is handed to Sales.

To approve: open the file, find the ID, change `status: needs_verification` to `status: approved`, save, then commit and push (Render redeploys; the bot picks it up within a minute).

| ID | What it answers | File | Check before approving |
|---|---|---|---|
| KB-01-01 | Who Parasmani is, capacity, location | 01-company/company.md | |
| KB-01-03 | Parasmani vs PTP K-Series brands | 01-company/company.md | |
| KB-01-11 | How tubes are made | 01-company/company.md | |
| KB-02-01 | Straight tube range: OD, wall, length, tempers | 02-straight-copper-tubes/straight-tubes.md | Wall says 0.7–3.25 mm; the HVAC/R TDS says 0.70–2.0 mm (REVIEW A-02). Approve whichever is right, not both. |
| KB-02-09 | What the marking on a tube means | 02-straight-copper-tubes/straight-tubes.md | |
| KB-03-01 | Pancake coil range | 03-pancake-copper-coils/pancake-coils.md | |
| KB-03-02 | Coil sizes, walls, coils per box | 03-pancake-copper-coils/pancake-coils.md | |
| KB-04-01 | Fittings overview and types | 04-copper-fittings/copper-fittings.md | Overview says wall 0.7–2.0 mm; the table says 0.71–3.25 mm (REVIEW A-06). |
| KB-04-02 | Fittings range to ASME B16.22 | 04-copper-fittings/copper-fittings.md | |
| KB-04-07 | What each fitting type is for | 04-copper-fittings/copper-fittings.md | |
| KB-04-09 | Press-fit fittings not offered | 04-copper-fittings/copper-fittings.md | |
| KB-05-01 | What the HVAC/R datasheet covers | 05-hvac-refrigeration/hvac-refrigeration.md | |
| KB-05-13 | Mechanical properties by standard and temper | 05-hvac-refrigeration/hvac-refrigeration.md | |
| KB-10-07 | ISO 9001 / 14001 / 45001 certificates | 10-standards-certifications/standards-certifications.md | |
| KB-10-11 | The nine quality tests | 10-standards-certifications/standards-certifications.md | |
| KB-11-04 | Which brand for which application | 11-product-selection/product-selection.md | |
| KB-13-01 | What the four online tools do | 13-calculations/calculations.md | |
| KB-14-01 | How straight tubes are packed | 14-packaging/packaging.md | |
| KB-14-02 | How coils are packed | 14-packaging/packaging.md | Catalogue says "four-layer" but lists three (REVIEW A-20). |
| KB-14-03 | How fittings are packed | 14-packaging/packaging.md | |
| KB-16-01 | Phone and WhatsApp numbers | 16-sales-enquiry/sales-enquiry.md | |
| KB-16-03 | Enquiry response time (24 hours) | 16-sales-enquiry/sales-enquiry.md | |
| KB-16-05 | Which documents are on the Downloads page | 16-sales-enquiry/sales-enquiry.md | |

The automated eval (`npm run ask:eval` in `backend/`) assumes exactly this list is approved.
