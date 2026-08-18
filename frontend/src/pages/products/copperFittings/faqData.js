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
q: "What is the difference between wrought and cast copper fittings?",
a: "Wrought fittings are formed from solid copper stock — the grain structure is continuous and dense, giving higher pressure ratings, better ductility, and superior joint strength when brazed. Cast fittings are made by pouring molten copper into moulds — the grain is coarser and may contain micro-porosity, making them more prone to leaks at joints under pressure. For all HVAC, medical, and potable water applications, wrought fittings (ASME B16.22) are the correct and safer specification.",
},
{
q: "Are Parasmani fittings compatible with all copper tube brands?",
a: "Yes — our fittings are dimensioned to the same OD standards as ASTM B280, EN 1057, and IS 10773 copper tubes, so they will slip-fit any compliant tube of the same nominal size. For guaranteed compatibility, we recommend ordering tube and fittings together from Parasmani — both are manufactured to the same dimensional tolerances, ensuring consistent clearance for capillary brazing with silver or phosphor-copper rod.",
},
{
q: "Can these fittings be used for press-fit (Pressfit) systems?",
a: "Our standard range is designed for silver brazing and soft soldering only. We do not currently offer press-fit fittings. For all HVAC, plumbing, and medical gas applications, our brazeable wrought copper fittings are the recommended solution. Please contact us to confirm the correct fitting type for your joining method.",
},
{
q: "What brazing rod should I use with copper fittings?",
a: "For most HVAC and refrigeration applications: BCuP-2 or BCuP-5 phosphor-copper brazing rod (no flux required on copper-to-copper joints). For medical gas (MGPS) systems, silver-based brazing alloy with a minimum 45% silver content is mandatory per BS EN 13348 and HTM 02-01. For potable water plumbing, use lead-free solder or silver braze per EN 1254. Always purge with nitrogen during brazing to prevent internal oxidation scale formation.",
},
{
q: "Do you supply non-standard sizes or custom fittings?",
a: 'Yes. Beyond our standard range of 1/4"–4" (6–130mm), we can supply custom reducing combinations, non-standard wall thicknesses, and special configurations on request, subject to minimum order quantities. This is particularly relevant for OEM manufacturers and large HVAC projects with bespoke piping requirements. Contact our sales team with your drawing or specification for a quotation.',
},
];
