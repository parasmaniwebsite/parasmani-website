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
    question: "Why must medical gas tubes be Half Hard and not Hard?",
    answer: "BS EN 13348 mandates Half Hard (R250) for medical gas copper tubes for three reasons: Hard drawn tubes develop micro-fractures under the continuous pressure cycling of gas supply systems. Hard tubes cannot absorb the vibration and hammering effect from gas flow — leading to joint failure over time. And hard copper cannot flex to accommodate thermal expansion from seasonal temperature changes and daily O₂ on/off cycles. Half Hard provides ductility while retaining the pressure rating required for MGPS."
  },
  {
    id: "faq-2",
    question: "What brazing rod should be used for medical gas copper joints?",
    answer: "Per HTM 02-01 and BS EN 13348, medical gas copper joints must be brazed using a silver-based brazing alloy with a minimum 45% silver content (e.g. BAg-7 or equivalent). Standard phosphor-copper brazing rod (BCuP-2/BCuP-5) used in HVAC must not be used for medical gas — it contains phosphorus which is incompatible with the metallurgical requirements of medical grade joints. Nitrogen purging during brazing is mandatory. Without a continuous nitrogen purge through the tube during brazing, oxidation creates carbon scale on the internal bore. Carbon particulate inside an oxygen line is a direct fire and combustion risk — oxygen accelerates the ignition of carbon residue under pressure. Every Parasmani MGPS tube is supplied carbon-free from the factory; maintaining that standard on site requires nitrogen purge from start to finish of every brazed joint."
  },
  {
    id: "faq-3",
    question: "What is the maximum oil residue allowed in medical gas tubes?",
    answer: "BS EN 13348 specifies a maximum oil residue of 100 mg/m² on the internal surface of medical gas copper tubes. This is measured on the internal surface area, not by length. Parasmani MGPS tubes are chemically degreased after the final draw pass and verified against this limit before packing. End caps are fitted immediately after degreasing. Mill test certificates confirming cleanliness compliance are available on request."
  },
  {
    id: "faq-4",
    question: "Do you supply test certificates and can I see them before ordering?",
    answer: "Yes. Parasmani MGPS mill test certificates (MTC) covering chemical composition (Cu%, P%), mechanical properties (tensile strength, elongation, hardness), and dimensional inspection are available for every batch. For critical hospital projects, third-party lab test reports can also be arranged. Mention your documentation requirements at enquiry stage — we prepare batch-level MTC alongside every project order."
  },
  {
    id: "faq-5",
    question: "Do you have project references for hospital installations?",
    answer: "Parasmani MGPS copper tubes have been supplied for medical gas pipeline systems across government and private hospital projects in India, through MGPS turnkey contractors and system integrators. Project references and MTC documentation are available on request — contact our sales team with your project or consultant details and we will provide the relevant supply history."
  }
];
