import supplyProduct1 from "../assets/industries/HVAC/supplyProduct1.png";
import supplyProduct2 from "../assets/industries/HVAC/supplyProduct2.png";
import supplyProduct3 from "../assets/industries/HVAC/supplyProduct3.png";

/**
 * Card content for <WhatWeSupplySection />.
 *
 * Every industry page currently shows the same three cards, so these are the
 * component's defaults. A page that needs a different set — or different copy —
 * composes its own array from these, e.g.
 *
 *   products={[supplyProducts.tubes, supplyProducts.fittings]}
 *   products={[{ ...supplyProducts.tubes, description: "…" }]}
 *
 * `stageClassName` / `imageClassName` are per-product because the three source
 * PNGs carry different transparent margins and have to be nudged individually.
 *
 * It sits in its own module so the section file only exports a component and
 * keeps working with fast refresh.
 */
export const supplyProducts = {
  tubes: {
    title: "Straight Copper Tubes",
    description: "Rigid hard copper for mains, risers & headers.",
    image: supplyProduct1,
    to: "/straight-copper-tubes",
    stageClassName: "",
    imageClassName: "max-h-[180%] object-top pt-30",
    specs: [
      { label: "OD", value: "6–130 mm" },
      { label: "Temper", value: "H / HH / QH" },
      { label: "Length", value: "3 m" },
    ],
  },
  pancake: {
    title: "Pancake Copper Coils",
    description: "Soft annealed coils for split AC & VRF connections.",
    image: supplyProduct2,
    to: "/pancake-copper-coil",
    stageClassName: "p-6",
    imageClassName: "max-h-[160%] object-top pt-5",
    specs: [
      { label: "OD", value: "4.7–22.23 mm" },
      { label: "Temper", value: "Soft Annealed" },
      { label: "Length", value: "15.24 m" },
    ],
  },
  fittings: {
    title: "Copper Fittings",
    description: "Precision fittings designed for clean brazed joints.",
    image: supplyProduct3,
    to: "/copper-fittings",
    stageClassName: "p-6",
    imageClassName: "max-h-[180%] object-top pt-30",
    specs: [
      { label: "ID", value: "6–130 mm" },
      { label: "Types", value: "8+" },
      { label: "Joint", value: "Braze" },
    ],
  },
};

export const defaultSupplyProducts = [
  supplyProducts.tubes,
  supplyProducts.pancake,
  supplyProducts.fittings,
];
