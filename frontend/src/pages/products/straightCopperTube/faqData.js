/**
 * FAQ content for this page's accordion.
 *
 * Its own module because seo/faqSources.js re-exports it as FAQPage markup and
 * eslint's react-refresh rule (correctly) refuses shared constants exported
 * from a component file. One array, rendered and marked up from the same
 * place -- structured data has to match what the visitor can see.
 */

export const faqs = [
{
  q: "What is the difference between ACR grade and plumbing grade copper tube?",
  a: "ACR (Air Conditioning & Refrigeration) grade tubes are manufactured to ASTM B280 — they are internally cleaned, degreased, and sealed with plastic caps to prevent oil and moisture contamination. Plumbing grade tubes (EN 1057 / IS 10771) do not require the same internal cleanliness standard. Using a plumbing-grade tube in a refrigeration system can contaminate the compressor oil and void equipment warranties. Always specify ASTM B280 for HVAC/R applications.",
},
{
  q: "Can the same tube be used for R32 as it was for R22?",
  a: "Yes — C12200 DHP copper tube is compatible with R22, R32, R410A, R134a, R407C, R404A, and R744 (CO₂). The key factor is wall thickness and working pressure, not the alloy. R32 and R410A operate at higher pressures than R22, so you may need a thicker wall for the same OD. Use our Pressure Calculator to verify your wall selection for the specific refrigerant and system pressure.",
},
{
  q: "Do you supply test certificates with every batch?",
  a: "Yes. Mill test certificates (MTC) are available for every batch on request, covering chemical composition, mechanical properties, and dimensional inspection results. For medical gas (MGPS) and critical industrial projects, we can also provide third-party lab reports and batch traceability documents. Please mention your requirement at the time of enquiry.",
},
{
  q: "What is the standard length and can you supply custom lengths?",
  a: "Our standard idle length is 3 metres. We also regularly supply 6-metre lengths. Custom lengths — including cut-to-size — are available on request, subject to minimum order quantities. Custom lengths are useful for medical gas installations and export projects where exact lengths reduce on-site waste. Contact our sales team to discuss your requirement.",
},
{
  q: "What is the minimum order quantity?",
  a: 'MOQ varies by size and temper. For standard sizes (1/4" to 1" OD, ASTM B280), we maintain ready stock and can supply from a single bundle. For larger diameters, non-standard wall thicknesses, or custom lengths, a minimum production quantity applies. Reach out via WhatsApp or the enquiry form for a quick confirmation on your specific requirement.',
},
{
  q: "Is your copper tube compatible with press-fit and push-fit fittings?",
  a: "Yes. Parasmani hard drawn seamless copper tube is compatible with both press-fit and brazed wrought fittings. Hard drawn temper provides the dimensional consistency and roundness that press-fit systems require, while remaining fully compatible with standard brazed jointing practice. Always verify the fitting manufacturer's specified tube standard — most press-fit systems for plumbing reference EN 1057, while HVAC press-fit systems typically specify ASTM B280 or EN 12735. Parasmani tube is manufactured to both.",
},
];
