// BS Imperial Standard Wire Gauge → mm, gauges 4–30, matching the Parasmani
// reference sheets exactly. Consumers narrow this to the range they support
// rather than keeping their own partial copy.
export const SWG_TO_MM = {
  4: 5.893, 5: 5.385, 6: 4.877, 7: 4.470, 8: 4.064,
  9: 3.658, 10: 3.251, 11: 2.946, 12: 2.642, 13: 2.337,
  14: 2.032, 15: 1.829, 16: 1.626, 17: 1.422, 18: 1.219,
  19: 1.016, 20: 0.914, 21: 0.813, 22: 0.711, 23: 0.610,
  24: 0.559, 25: 0.508, 26: 0.457, 27: 0.417, 28: 0.376,
  29: 0.345, 30: 0.315,
};

// Dimensional limits the calculator operates within (mm), per the reference sheet.
export const OD_MIN_MM = 4.76;
export const OD_MAX_MM = 150;
export const WALL_MIN_MM = 0.315;
export const WALL_MAX_MM = 3.251;

export const toMm = (value, unit) => {
  const v = parseFloat(value);
  if (!v || Number.isNaN(v)) return 0;
  if (unit === 'in') return v * 25.4;
  if (unit === 'SWG') return SWG_TO_MM[Math.round(v)] || 0;
  return v; // already mm
};
