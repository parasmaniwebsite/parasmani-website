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
  question: "Can copper tubes be used in R744 (CO₂) transcritical systems?",
  answer: "Yes — C12200 DHP copper is compatible with CO₂ refrigerant. However, transcritical CO₂ systems operate at very high pressures — up to 130 bar on the high side. Standard HVAC wall thicknesses are insufficient. You must select wall thickness based on the system's maximum allowable working pressure (MAWP), not just OD. Use our Pressure Calculator to verify. Thicker wall gauges (2.03mm and above) are typically specified for CO₂ refrigerant mains. Contact us with your system pressure and we will recommend the appropriate size."
},
{
  id: "faq-2",
  question: "What sizes are available from ready stock for cold storage projects?",
  answer: "Parasmani carries ready stock up to 2 1/8\" OD / 16 SWG wall across all standard sizes. This covers the majority of cold storage evaporator and header requirements. For sizes above 2 1/8\" OD, or for non-standard wall thicknesses, production lead time is 15 working days — confirmed at order stage. There is no minimum order quantity on ready stock sizes."
},
{
  id: "faq-3",
  question: "Does copper work at -40°C without becoming brittle?",
  answer: "Yes. C12200 DHP copper retains full ductility and strength at sub-zero temperatures, including -40°C and below. Unlike ferrous metals which can undergo ductile-to-brittle transition at low temperatures, copper's FCC crystal structure remains ductile down to cryogenic temperatures. This makes copper the preferred material for blast freezer evaporators, cryogenic process piping, and any refrigeration application at extremely low temperatures. No special grade or treatment is required for cold storage applications."
},
{
  id: "faq-4",
  question: "Do you supply mill test certificates (MTCs) for industrial orders?",
  answer: "Yes. Mill test certificates covering chemical composition and mechanical properties (tensile strength, elongation, hardness) are available for every batch on request. For large industrial and project orders, third-party lab test reports can also be arranged. Pressure test certificates and dimensional inspection reports are available for specific requirements. Please mention your documentation requirements at the enquiry stage so we can prepare the correct paperwork alongside your order."
},
{
  id: "faq-5",
  question: "Can you supply custom wall thicknesses for high-pressure industrial applications?",
  answer: "Yes. Parasmani can manufacture custom OD and wall combinations for elevated pressure requirements. Standard wall thicknesses range from 0.80mm to 3.25mm across OD sizes from 1/4\" to 5 1/8\". For industrial applications requiring non-catalogue specifications, send us your OD, wall, temper, length, and quantity — we will confirm feasibility and lead time within 24 hours. Custom production lead time is 15 working days."
}
];
