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
    question: "Why is Half Hard the standard temper for medical gas tubes?",
    answer: "Half Hard (R250) is the temper recommended under BS EN 13348 for medical gas pipelines and is therefore Parasmani's standard supply. It resists long-term stress cracking, absorbs vibration and hammering rather than transmitting it to the joints, and accommodates thermal and seismic movement — where hard drawn R290 is less tolerant. Hard (R290) MGPS tubes are also available on request."
  },
  {
    id: "faq-2",
    question: "What brazing rod should be used for medical gas copper joints?",
    answer: "Braze with CP 104 copper-silver-phosphorus filler to BS EN ISO 17672 — no flux is required on copper-to-copper joints. Indicative minimum brazing temperature is 710 °C. Penetration must reach three times the wall thickness or 3 mm, whichever is greater. Nitrogen purging during brazing is mandatory. Without a continuous nitrogen purge through the tube during brazing, oxidation creates carbon scale on the internal bore. Carbon particulate inside an oxygen line is a direct fire and combustion risk — oxygen accelerates the ignition of carbon residue under pressure. Every Parasmani MGPS tube is supplied carbon-free from the factory; maintaining that standard on site requires nitrogen purge from start to finish of every brazed joint."
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
