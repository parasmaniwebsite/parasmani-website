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
  q: "What is a pancake coil and why is it used in AC installations?",
  a: "A pancake coil is a pre-coiled soft copper tube wound flat, typically 3–16 metres in length. It is used for connecting the indoor and outdoor units of split AC systems because it can be bent and routed freely through walls, ceilings, and ducts without cracking. The soft annealed temper allows installers to shape the tube on-site with a hand bender, avoiding the need for prefabricated bends or elbows at every turn.",
},
{
  q: "What size coil should I use for a 1.5 TR split AC?",
  a: 'For a standard 1.5 TR split AC, the most common pairing is 3/8" OD (9.52mm) for the suction line and 1/4" OD (6.35mm) for the liquid line. However, always refer to the OEM installation manual — some inverter models specify larger suction lines for longer pipe runs. For runs exceeding 10 metres, upsizing the suction line by one size is generally recommended to minimise pressure drop.',
},
{
  q: "Are these coils compatible with R32 refrigerant?",
  a: "Yes. C12200 DHP copper is compatible with R32, R410A, R22, R134a, R407C, and R404A. The key consideration when switching from R22 to R32 is working pressure — R32 operates at higher pressures, so verify that your chosen wall thickness meets the system's maximum allowable working pressure. Use our Pressure Calculator on the tools page for a quick check.",
},
{
  q: "Do you supply test certificates with every batch?",
  a: "Yes. Mill test certificates (MTC) are available for every batch on request, covering chemical composition, mechanical properties (tensile strength, elongation), and dimensional inspection. For export orders or OEM qualification, third-party lab reports can also be arranged. Please mention your requirement at the time of enquiry so we can prepare documentation alongside your order.",
},
{
  q: "What's the difference between soft (annealed) and hard-drawn copper?",
  a: "Soft copper is annealed to make it flexible, so it can be supplied in pancake coils and bent by hand to follow the pipe routing. This makes it ideal for residential and light commercial split AC and refrigeration line sets. Hard-drawn copper is rigid and supplied in straight lengths, used for exposed runs and larger commercial VRF/VRV systems where the pipe holds its own shape. Both are the same C12200 grade; only the temper differs.",
},
];
