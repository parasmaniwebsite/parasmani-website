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
    question: "What is the difference between ACR grade and plumbing grade copper tube?",
    answer: "ACR (Air Conditioning & Refrigeration) grade tubes are manufactured to ASTM B280 — internally cleaned, degreased, and sealed with plastic end caps to prevent oil and moisture contamination. Plumbing grade tubes (EN 1057 / IS 10771) do not meet this internal cleanliness requirement. Using a plumbing-grade tube in a refrigeration circuit can contaminate compressor oil and void equipment warranties. Always specify ASTM B280 for any HVAC or refrigeration application."
  },
  {
    id: "faq-2",
    question: "Can the same copper tube be used for R32 as R22?",
    answer: "Yes — C12200 DHP copper is compatible with R22, R32, R410A, R134a, R407C, and R404A. The difference is working pressure: R32 and R410A operate at significantly higher pressures than R22, so a thicker wall may be required for the same OD. Use our Pressure Calculator to verify your wall selection against the system's maximum allowable working pressure before specifying."
  },
  {
    id: "faq-3",
    question: "Which temper should I specify for which application?",
    answer: "Hard (H): Rigid straight runs, riser mains, any installation where no bending is required — maximum pressure rating. Half Hard (HH): General-purpose for chiller plants and most commercial HVAC — some formability for gentle offsets. Quarter Hard (QH): Field bending where tight radius changes are needed without using coil format. Soft Annealed (Pancake Coil): Split AC and VRF branch connections — bends freely by hand on site."
  },
  {
    id: "faq-4",
    question: "What size pancake coil for a 1.5 TR split AC?",
    answer: "Standard pairing for 1.5 TR: 1/4\" OD (6.35mm) liquid line + 3/8\" OD (9.52mm) suction line. For runs exceeding 10 metres, consider upsizing the suction line by one size to minimise pressure drop. Always confirm with the OEM installation manual — inverter models may specify differently."
  },
  {
    id: "faq-5",
    question: "Are Parasmani tubes approved for VRF systems?",
    answer: "Yes. Parasmani holds a Vendor Approval Certificate from Panasonic India and is listed as an approved make in LG Electronics India's (LGEIL) Tech Tree for System Air Conditioners. Additionally approved for VRF/VRV refrigerant piping at CSIR National Aerospace Laboratories and School of Planning & Architecture, New Delhi. Approval documents are available in our Downloads section."
  },
  {
    id: "faq-6",
    question: "Do you supply test certificates with every batch?",
    answer: "Yes. Mill test certificates (MTC) covering chemical composition, mechanical properties (tensile, yield, elongation), and dimensional inspection are available on request for every batch. For large project orders, third-party lab reports can be arranged. Mention your documentation requirement at the enquiry stage."
  }
];
