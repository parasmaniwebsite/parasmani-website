/**
 * FAQ content for this page's accordion.
 *
 * Its own module because seo/faqSources.js re-exports it as FAQPage markup and
 * eslint's react-refresh rule (correctly) refuses shared constants exported
 * from a component file. One array, rendered and marked up from the same
 * place -- structured data has to match what the visitor can see.
 */

export const FAQ_DATA = [
{
  id: "faq-1",
  question: "Is copper tube approved for PNG and LPG piping in India?",
  answer: "Yes. Copper tube is specified for internal gas piping under EN 1057 and BS EN 1057 — the European and British standards for copper tubes in gas and water service. However, every city gas distribution company (CGD) — MGL, IGL, GAIL, MNGL, etc. — has its own approved material list and installation specifications. Always confirm with your local CGD that copper tube is on their approved list and use a licensed gas contractor for installation and commissioning."
},
{
  id: "faq-2",
  question: "What happens to copper gas pipe in a fire?",
  answer: "Copper is non-combustible — it does not burn, does not melt and drip, and does not emit toxic fumes when exposed to fire. In a building fire, copper gas pipes hold their structural integrity significantly longer than plastic alternatives. This is one of the primary reasons copper is the preferred material for internal gas piping — a plastic gas pipe failure in a fire dramatically worsens the situation. Copper gives occupants more time to evacuate safely."
},
{
  id: "faq-3",
  question: "What brazing rod should I use for copper gas joints?",
  answer: "Gas joints must be brazed with a silver-based brazing alloy with a minimum 45% silver content — typically BAg-7 or a similar high-silver alloy. Phosphor-copper brazing rod (BCuP-2, BCuP-5) must never be used for gas piping. Phosphor-copper is fine for HVAC refrigerant joints, but is not approved for gas applications. Always purge the pipe with dry nitrogen during brazing to prevent internal oxidation scale, which can contaminate the gas supply and block regulators."
},
{
  id: "faq-4",
  question: "What size copper tube should I use for a residential PNG riser?",
  answer: "Sizing depends on the number of connected points and the total gas load (in kW or m³/hr). As a general reference: 22mm OD is typical for a 4–6 flat riser, 28mm for a larger building riser, and 35–42mm for the main supply from the meter bank in large buildings. Your gas contractor or a registered gas engineer must size the system correctly for your specific building — do not size by reference alone. Parasmani can supply any size in the typical gas piping range."
},
{
  id: "faq-5",
  question: "How long does copper gas piping last?",
  answer: "Copper gas piping properly installed with brazed joints has a service life exceeding 50 years — effectively the life of the building. Copper does not corrode in the presence of LPG or natural gas, does not become brittle with age, and does not degrade when exposed to the trace moisture occasionally present in gas supplies. The only maintenance typically required is periodic inspection of the joints and valve points by a licensed gas contractor."
},
{
  id: "faq-6",
  question: "Can the same copper tube be used for both gas and water in the same building?",
  answer: "Yes — the same copper tube is suitable for both gas (EN 1057) and potable water (EN 1057 / IS 10771) applications. The tube is identical; the difference is in the specification standard applied, the brazing alloy used at joints (silver alloy for gas, phosphor-copper acceptable for water), and the installation and commissioning requirements. Never connect a gas tube and a water tube together — they must be completely separate systems with no interconnection. Ensure gas pipes are clearly marked and identifiable from water pipes."
}
];
