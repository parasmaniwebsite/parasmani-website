// UTS (Ultimate Tensile Strength) values in MPa for copper tube tempers
// Reference values typical for ASTM B88 / EN 1057 copper tube
// `sf` is the safety factor the working pressure is derived with — keep it as a
// real field, the `spec` string is display copy only.
export const TEMPERS = [
  { id: 'hard-drawn', label: 'Hard Drawn', spec: 'UTS 315 - SF 2', uts: 315, sf: 2 },
  { id: 'half-hard', label: 'Half Hard', spec: 'UTS 275 - SF 2', uts: 275, sf: 2 },
  { id: 'quarter-hard', label: 'Quarter Hard', spec: 'UTS 240 - SF 2', uts: 240, sf: 2 },
  { id: 'soft-annealed', label: 'Soft Annealed', spec: 'UTS 205 - SF 3', uts: 205, sf: 3 },
];

// Conversions from MPa, which is what the Barlow equation produces.
export const MPA_TO = {
  bar: 10,
  psi: 145.038,
  mpa: 1,
  kpa: 1000,
};

export const convertFromMpa = (mpa, unit) => mpa * MPA_TO[unit];
