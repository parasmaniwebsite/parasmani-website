/**
 * Route -> the FAQ array that route's page actually renders.
 *
 * These are re-exports of the arrays the accordions map over, not copies.
 * Google requires FAQ markup to match content visible on the page, and a
 * second transcription of ~50 answers would drift from the first the moment
 * anyone edited one. Importing the source array makes that impossible.
 *
 * Each import is the page's own faqData module, not its component — sharing a
 * constant out of a component file breaks Fast Refresh, which is what
 * eslint's react-refresh rule flags.
 *
 * Kept out of schema.js so that file stays pure data with no page imports;
 * this is the one seam where the SEO layer reaches into pages.
 */

import { FAQ_DATA as hvacFaqs } from "../pages/industries/HVAC/faqData";
import { FAQ_DATA as medicalGasFaqs } from "../pages/industries/medicalGas/faqData";
import { FAQ_DATA as houseHoldFaqs } from "../pages/industries/HouseHoldAndFuelGas/faqData";
import { FAQ_DATA as plumbingFaqs } from "../pages/industries/PlumbingAndWaterSupply/faqData";
import { FAQ_DATA as industrialFaqs } from "../pages/industries/IndustrialAndProcessApplications/faqData";

import { faqs as straightTubeFaqs } from "../pages/products/straightCopperTube/faqData";
import { faqs as pancakeCoilFaqs } from "../pages/products/pancake/faqData";
import { faqs as copperFittingsFaqs } from "../pages/products/copperFittings/faqData";

export const faqsByRoute = {
  "/hvac-refrigeration": hvacFaqs,
  "/medical-gas": medicalGasFaqs,
  "/household-fuel-gas": houseHoldFaqs,
  "/plumbing-water-supply": plumbingFaqs,
  "/industrial-process-application": industrialFaqs,
  "/straight-copper-tubes": straightTubeFaqs,
  "/pancake-copper-coil": pancakeCoilFaqs,
  "/copper-fittings": copperFittingsFaqs,
};
