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
  id: "potable-safety",
  question: "Is copper tube safe for drinking water?",
  answer: "Yes — copper is approved for drinking water contact under EN 1057, BS EN 1057, and WHO guidelines. Copper does not leach harmful chemicals, plasticisers, or microplastics into water. At the trace concentrations of copper ions that naturally occur from copper piping, the water is within safe drinking limits and actually has a beneficial bacteriostatic effect. Copper has been used for water supply for thousands of years and remains the material most trusted globally for potable water plumbing."
},
{
  id: "european-standards",
  question: "Which European standards cover copper plumbing tubes?",
  answer: "EN 1057 is the primary European standard covering copper tubes for water and gas in sanitary and heating applications — it specifies dimensional tolerances, mechanical properties, and material composition for copper plumbing tube. BS EN 1057 is the British adoption of the same standard. EN 1254-1 covers wrought copper fittings for capillary and compression joints. EN 806 covers the specification for installations inside buildings for the conveyance of water for human consumption. Parasmani tubes are manufactured to comply with EN 1057 — you can specify either EN 1057 or BS EN 1057 depending on your project requirement."
},
{
  id: "thermal-utility",
  question: "Can copper pipe be used for both hot and cold water in the same building?",
  answer: "Yes — the same copper tube to EN 1057 is suitable for both hot and cold water distribution. Hot and cold risers are typically separate pipes running in parallel — this is standard practice for all buildings. Copper handles the full temperature range from cold municipal supply to domestic hot water at 60–80°C and solar-heated water above 90°C without degradation. Ensure hot and cold pipes are clearly identified — typically red banding for hot, blue for cold — and insulate hot water pipes to maintain temperature and prevent heat loss."
},
{
  id: "water-reaction",
  question: "Does copper react with hard water?",
  answer: "In most cases, hard water is actually beneficial for copper plumbing — the calcium carbonate in hard water deposits a thin protective patina on the inside of copper pipes that reduces copper ion release and extends service life. Copper can be used in virtually all Indian water conditions. In very soft, acidic water (pH below 6.5), copper may corrode at a faster rate — but this is uncommon in India. If you have concerns about local water chemistry, consult with a water quality engineer. Parasmani copper tube is manufactured to EN 1057 wall thickness specifications to account for normal service conditions."
},
{
  id: "temper-selection",
  question: "What temper should I use — Hard or Half Hard?",
  answer: "Hard (H): Fully rigid. Best for straight runs, risers, and any installation where no field bending is needed — maximum pressure rating. Half Hard (HH): Slightly more formable. Can be bent on site with a pipe bender for gentle offsets without a fitting. Good all-round choice for domestic plumbing runs. Soft Annealed (Coil): Bends freely by hand. Best for underfloor heating loops, solar connections, and tight-radius bends where a rigid tube would require multiple fittings. Do not use soft annealed tube for straight high-pressure mains — its lower wall hardness means a lower pressure rating than H or HH temper."
},
{
  id: "joining-methods",
  question: "How do I join copper plumbing tubes?",
  answer: "There are three main methods for joining copper plumbing tubes: (1) Capillary soldering — the most common method for domestic plumbing. Use lead-free solder (Sn97Cu3) with an appropriate flux. Clean the pipe end and fitting socket, apply flux, assemble, heat evenly with a torch, and apply solder. (2) Silver brazing — used for high-temperature circuits (solar, commercial hot water above 80°C). Uses BAg-7 silver alloy filler at higher temperature — stronger joint than solder. (3) Press-fit fittings — proprietary systems that crimp onto the tube mechanically with no heat required. Suitable for domestic plumbing where naked flame is prohibited. In all cases, flush the system thoroughly with clean water before handover to remove flux residue."
}
];
