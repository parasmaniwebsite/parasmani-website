import { useMemo } from 'react';
import { TEMPERS } from '../data/tempers';
import { toMm, OD_MAX_MM, WALL_MAX_MM } from '../utils/unitConversion';

/**
 * Modified Barlow's Equation (used for copper tube burst pressure):
 *   P_burst   = 2 * UTS * t / (D - 0.8 * t)
 *   P_working = P_burst / SF
 *
 * UTS is supplied in MPa, so both pressures come out in MPa. Burst is rounded to
 * 2 dp *before* dividing by SF — this mirrors the published Parasmani spreadsheet,
 * so working pressures here match the printed tables rather than drifting by a
 * fraction of a bar.
 */
const round2 = (n) => Math.round(n * 100) / 100;

export const useBarlowCalculation = ({ od, wall, odUnit, wallUnit, temperId }) => {
  return useMemo(() => {
    // Upper bounds are clamped the same way the reference calculator clamps them;
    // beyond these the modified Barlow form is outside its validated range.
    const dMm = Math.min(toMm(od, odUnit), OD_MAX_MM);
    const tMm = Math.min(toMm(wall, wallUnit), WALL_MAX_MM);
    const temper = TEMPERS.find((t) => t.id === temperId) || TEMPERS[0];
    const { uts, sf: safetyFactor } = temper;

    // A wall of half the OD or more leaves no bore — not a tube, so no result.
    const isValid = dMm > 0 && tMm > 0 && tMm < dMm / 2;

    const burstPressureMpa = isValid ? round2((2 * uts * tMm) / (dMm - 0.8 * tMm)) : 0;
    const workingPressureMpa = isValid ? round2(burstPressureMpa / safetyFactor) : 0;

    const todRatio = isValid ? tMm / dMm : 0;
    const innerDiameter = isValid ? dMm - 2 * tMm : 0;

    return {
      isValid,
      uts,
      safetyFactor,
      todRatio,
      burstPressureMpa,
      workingPressureMpa,
      burstPressureBar: burstPressureMpa * 10,
      workingPressureBar: workingPressureMpa * 10,
      innerDiameter,
      odMm: dMm,
      wallMm: tMm,
    };
  }, [od, wall, odUnit, wallUnit, temperId]);
};
