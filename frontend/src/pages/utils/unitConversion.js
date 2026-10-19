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

const UNICODE_FRACTIONS = {
  "¼": "1/4", "½": "1/2", "¾": "3/4",
  "⅛": "1/8", "⅜": "3/8", "⅝": "5/8", "⅞": "7/8",
  "⅙": "1/6", "⅚": "5/6", "⅓": "1/3", "⅔": "2/3",
};

// Reads a tube dimension the way the trade writes it. Inch ODs are quoted as
// fractions, so this accepts "7/8", "5/16", "1 1/8" and "1-1/8" (the hyphen
// joins whole and fraction — it is never a minus sign) alongside plain decimals
// like "1.125". A trailing inch mark or "in" is ignored, and a phone keyboard's
// "⅞"-style glyphs are expanded first. Returns 0 for anything unreadable or
// negative, which every caller already treats as "no value".
export const parseDimension = (value) => {
  let s = String(value ?? "")
    .trim()
    .replace(/[¼½¾⅛⅜⅝⅞⅙⅚⅓⅔]/g, (ch) => ` ${UNICODE_FRACTIONS[ch]}`)
    .replace(/,/g, ".")
    .replace(/\s*(?:"|''|”|″|inches|inch|in)\s*$/i, "")
    .trim();
  if (!s) return 0;

  const mixed = s.match(/^(\d+)\s*(?:-|\s)\s*(\d+)\s*\/\s*(\d+)$/);
  if (mixed) {
    const den = parseInt(mixed[3], 10);
    return den ? parseInt(mixed[1], 10) + parseInt(mixed[2], 10) / den : 0;
  }

  const frac = s.match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/);
  if (frac) {
    const den = parseFloat(frac[2]);
    return den ? parseFloat(frac[1]) / den : 0;
  }

  // Whole string must be a number, so "1 1/8" typed half-way ("1 1/") reads as
  // nothing rather than silently as 1.
  if (!/^\d*\.?\d+$|^\d+\.$/.test(s)) return 0;
  const n = parseFloat(s);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

export const toMm = (value, unit) => {
  const v = unit === 'SWG' ? parseFloat(value) : parseDimension(value);
  if (!v || Number.isNaN(v)) return 0;
  if (unit === 'in') return v * 25.4;
  if (unit === 'SWG') return SWG_TO_MM[Math.round(v)] || 0;
  return v; // already mm
};
