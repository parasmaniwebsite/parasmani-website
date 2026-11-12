# Ask Parasmani — Knowledge Base

This folder is the **only** thing Ask Parasmani is allowed to know. If a fact is not here with `status: approved`, the assistant will not say it. It hands the customer to Sales instead.

Extracted on 13 Nov 2026 from the website source and the PDFs in `frontend/src/assets/downloads/`. **Nothing is approved yet.** Everything starts as `needs_verification`.

## How an entry looks

Each `.md` file holds one or more entries. An entry starts with a `## ` heading carrying its ID and a short title. Then come four fixed lines, a `---`, and the content.

```
## KB-02-01 Straight tubes: product range (catalogue)
status: needs_verification
safety_critical: false
source: frontend/src/assets/downloads/brochures/Parasmani_Product_Catalog_2026.pdf (page 3)
---
Temper: Hard, Half Hard, Quarter Hard
Size Range (Outer Diameter): 6 mm to 130 mm
```

| Field | Meaning |
|---|---|
| **ID** | `KB-<folder>-<number>`. Never reuse or renumber; the bot cites these. |
| `status` | `approved` = the bot may say it. `needs_verification` = the bot ignores it. `unavailable` = we know customers ask this but have no approved answer; the bot always hands over to Sales. |
| `safety_critical` | `true` for medical gas, fuel gas, pressure ratings, sizing advice and code compliance. Even when approved, the bot gives general info only and always shows the Sales buttons. |
| `source` | File path (and page) or website page the text was copied from. |
| `note:` (optional) | Reviewer note: why it needs checking, or which entry it conflicts with. The bot never sees notes. |

The content below `---` is copied **exactly as written in the source**. Nothing was rounded, inferred or filled in. Where two sources disagree, each gets its own entry and the conflict is listed in `REVIEW.md`.

## How to approve

1. Read `REVIEW.md` first. It lists the conflicts and risky claims.
2. For each entry you are happy with, change `status: needs_verification` to `status: approved`.
3. If two entries conflict, approve only the correct one, or fix the source document and edit the entry.
4. To add a fact, copy an entry, give it the next free ID in that folder and fill in `source`.

Only you (or someone you name) should change a status. Nothing in this folder is approved automatically.

## Folders

`01-company` · `02-straight-copper-tubes` · `03-pancake-copper-coils` · `04-copper-fittings` · `05-hvac-refrigeration` · `06-medical-gas` · `07-plumbing` · `08-fuel-gas` · `09-industrial` · `10-standards-certifications` · `11-product-selection` · `12-technical-faqs` · `13-calculations` · `14-packaging` · `15-approvals` · `16-sales-enquiry`

The folder names use hyphens instead of spaces, `&` and `/`. Those characters break file paths on some systems, and `/` cannot appear in a folder name at all.
