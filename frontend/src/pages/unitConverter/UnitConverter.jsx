import { useMemo, useState } from "react";

// ─── Reference data ──────────────────────────────────────────────────────────
// Standard ACR copper tube OD sizes: [inch label, mm]
const OD_TABLE = [
  ['3/16"', 4.76], ['1/4"', 6.35], ['5/16"', 7.94],
  ['3/8"', 9.53], ['1/2"', 12.7], ['5/8"', 15.88],
  ['3/4"', 19.05], ['7/8"', 22.22], ['1"', 25.4],
  ['1-1/8"', 28.58], ['1-1/4"', 31.75], ['1-3/8"', 34.93],
  ['1-1/2"', 38.1], ['1-5/8"', 41.28], ['1-3/4"', 44.45],
  ['2"', 50.8], ['2-1/8"', 53.98], ['2-5/8"', 66.68],
  ['3-1/8"', 79.38], ['3-5/8"', 92.08], ['4-1/8"', 104.78],
  ['5-1/8"', 130.18],
];

const OD_INCH_OPTIONS = [
  "3/16", "1/4", "5/16", "3/8", "1/2", "5/8", "3/4", "7/8", "1",
  "1-1/8", "1-1/4", "1-3/8", "1-1/2", "1-5/8", "1-3/4", "2",
  "2-1/8", "2-5/8", "3-1/8", "3-5/8", "4-1/8", "5-1/8",
];

// Wall thickness SWG gauges: [mm, gauge]
const SWG = [
  [1.016, 19], [0.914, 20], [0.813, 21], [0.711, 22],
  [0.61, 23], [0.559, 24], [0.508, 25],
];

// ─── Shared style tokens (match Pressure/Weight calculator UI) ───────────────
const INPUT =
  "w-full min-w-0 px-3 py-2 rounded-md border border-gray-200 text-[14px] text-gray-700 placeholder-[#B8B8B8] font-albert focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-[#C68344]";

const SELECT_STYLE = {
  backgroundImage:
    'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23676767\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'/%3e%3c/svg%3e")',
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  backgroundSize: "16px",
};

const fmt = (v) => {
  if (v === null || v === undefined || isNaN(v)) return "—";
  const dp = v === 0 ? 0 : v < 1 ? 4 : v < 10 ? 3 : v < 1000 ? 2 : 0;
  return v.toFixed(dp);
};

// ─── Reusable presentational pieces ──────────────────────────────────────────
const Card = ({ title, subtitle, children }) => (
  <section className="bg-white border border-[#5C5C5C] rounded-xl overflow-hidden flex flex-col">
    <div className="bg-[#E8E9ED] text-[#272727] font-albert text-center py-2 px-4">
      <span className="text-[20px] sm:text-[24px] font-normal">{title}</span>
      {subtitle && (
        <span className="block text-[12px] font-normal text-[#6B6B6B] -mt-0.5">
          {subtitle}
        </span>
      )}
    </div>
    <div className="p-4 sm:p-6 flex-1 flex flex-col">{children}</div>
  </section>
);

const Hint = ({ children }) => (
  <p className="text-[12px] text-[#8A8A8A] font-albert mb-3">{children}</p>
);

const Note = ({ children }) => (
  <p className="text-[11px] text-[#A3A3A3] font-albert mt-3 leading-relaxed">
    {children}
  </p>
);

// Numeric input with a fixed unit tag on the right
const Field = ({ tag, ...props }) => (
  <div className="relative">
    <input type="number" min="0" {...props} className={`${INPUT} pr-12`} />
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-medium text-[#A3A3A3] font-albert">
      {tag}
    </span>
  </div>
);

const OutputBox = ({ children }) => (
  <div className="px-3 py-2.5 rounded-md border border-gray-200 bg-[#F7F6F3] text-[14px] font-albert text-[#272727] min-h-[42px] flex items-center">
    {children ?? <span className="text-[#B8B8B8]">—</span>}
  </div>
);

const ToggleGroup = ({ options, value, onChange }) => (
  <div className="inline-flex rounded-md border border-[#B8B8B8] overflow-hidden text-[13px] font-normal shrink-0">
    {options.map((opt, idx) => (
      <button
        key={opt.value}
        type="button"
        onClick={() => onChange(opt.value)}
        className={`px-3.5 py-2 transition-colors ${
          value === opt.value
            ? "bg-[#18234D] text-white"
            : "bg-white text-[#18234D] hover:bg-slate-50"
        } ${idx !== 0 ? "border-l border-[#B8B8B8]" : ""}`}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

const UnitConverter = () => {
  // Length (m ↔ ft)
  const [len, setLen] = useState({ m: "", ft: "" });
  const lenSync = (from, val) => {
    if (val === "") return setLen({ m: "", ft: "" });
    const v = parseFloat(val);
    if (isNaN(v) || v < 0) return setLen({ m: "", ft: "" });
    setLen(
      from === "m"
        ? { m: val, ft: +(v * 3.28084).toFixed(3) }
        : { ft: val, m: +(v / 3.28084).toFixed(4) }
    );
  };

  // Weight (kg ↔ lbs)
  const [wt, setWt] = useState({ kg: "", lbs: "" });
  const wtSync = (from, val) => {
    if (val === "") return setWt({ kg: "", lbs: "" });
    const v = parseFloat(val);
    if (isNaN(v) || v < 0) return setWt({ kg: "", lbs: "" });
    setWt(
      from === "kg"
        ? { kg: val, lbs: +(v * 2.20462).toFixed(3) }
        : { lbs: val, kg: +(v / 2.20462).toFixed(3) }
    );
  };

  // Capacity (TR ↔ kW ↔ HP ↔ BTU/hr) — Indian HVAC convention
  const [cap, setCap] = useState({ tr: "", kw: "", hp: "", btu: "" });
  const capSync = (from, val) => {
    if (val === "") return setCap({ tr: "", kw: "", hp: "", btu: "" });
    const v = parseFloat(val);
    if (isNaN(v) || v < 0) return;
    const tr =
      from === "tr" ? v : from === "kw" ? v / 3.517 : from === "hp" ? v * 0.75 : v / 12000;
    const res = { tr, kw: tr * 3.517, hp: tr / 0.75, btu: tr * 12000 };
    setCap({
      tr: from === "tr" ? val : +res.tr.toFixed(2),
      kw: from === "kw" ? val : +res.kw.toFixed(2),
      hp: from === "hp" ? val : +res.hp.toFixed(2),
      btu: from === "btu" ? val : Math.round(res.btu),
    });
  };

  // Pressure (Bar ↔ PSI ↔ MPa)
  const [pres, setPres] = useState({ bar: "", psi: "", mpa: "" });
  const presSync = (from, val) => {
    if (val === "") return setPres({ bar: "", psi: "", mpa: "" });
    const v = parseFloat(val);
    if (isNaN(v) || v < 0) return;
    const bar = from === "bar" ? v : from === "psi" ? v / 14.5038 : v * 10;
    const res = { bar, psi: bar * 14.5038, mpa: bar / 10 };
    setPres({
      bar: from === "bar" ? val : +res.bar.toFixed(3),
      psi: from === "psi" ? val : +res.psi.toFixed(3),
      mpa: from === "mpa" ? val : +res.mpa.toFixed(3),
    });
  };

  // Coils & lengths — how many to order
  const [coilVal, setCoilVal] = useState("");
  const [coilLenUnit, setCoilLenUnit] = useState("m");
  const [tubeType, setTubeType] = useState("coil");
  const coilResult = useMemo(() => {
    const v = parseFloat(coilVal);
    if (isNaN(v) || v <= 0) return null;
    const coilLens = { m: 15.24, ft: 50 };
    const straightLens = { m: 3, ft: 10 };
    const unitLen =
      tubeType === "coil" ? coilLens[coilLenUnit] : straightLens[coilLenUnit];
    const label =
      tubeType === "coil"
        ? coilLenUnit === "m" ? "15.24m" : "50ft"
        : coilLenUnit === "m" ? "3m" : "10ft";
    const lbl = tubeType === "coil" ? "coil" : "length";
    const count = Math.ceil(v / unitLen);
    const total = count * unitLen;
    const left = (total - v).toFixed(2);
    return { count, label, lbl, total: total.toFixed(2), left };
  }, [coilVal, coilLenUnit, tubeType]);

  // Pipe sizing
  const [odInch, setOdInch] = useState("");
  const [odMmIn, setOdMmIn] = useState("");
  const [swgSel, setSwgSel] = useState("");
  const [mmSwgIn, setMmSwgIn] = useState("");

  const odInchOut = useMemo(() => {
    if (!odInch) return null;
    const found = OD_TABLE.find((r) => r[0] === odInch + '"');
    return found ? `${found[1]} mm` : null;
  }, [odInch]);

  const odMmOut = useMemo(() => {
    const v = parseFloat(odMmIn);
    if (isNaN(v) || v <= 0) return null;
    const best = OD_TABLE.reduce((a, b) =>
      Math.abs(b[1] - v) < Math.abs(a[1] - v) ? b : a
    );
    const diff = parseFloat(Math.abs(best[1] - v).toFixed(2));
    return `${best[0]}  (${best[1]} mm${diff > 0 ? " · ±" + diff : ""})`;
  }, [odMmIn]);

  const mmSwgOut = useMemo(() => {
    const v = parseFloat(mmSwgIn);
    if (isNaN(v) || v <= 0) return null;
    const best = SWG.reduce((a, b) =>
      Math.abs(b[0] - v) < Math.abs(a[0] - v) ? b : a
    );
    return `SWG ${best[1]}  (${best[0]} mm)`;
  }, [mmSwgIn]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 bg-white select-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* LENGTH */}
        <Card title="Length" subtitle="Metres & Feet">
          <Hint>Enter any value — both update</Hint>
          <div className="grid grid-cols-2 gap-3">
            <Field placeholder="Metres" step="0.01" value={len.m} tag="m" onChange={(e) => lenSync("m", e.target.value)} />
            <Field placeholder="Feet" step="0.1" value={len.ft} tag="ft" onChange={(e) => lenSync("ft", e.target.value)} />
          </div>
        </Card>

        {/* WEIGHT */}
        <Card title="Weight" subtitle="kg & lbs">
          <Hint>Enter any value — both update</Hint>
          <div className="grid grid-cols-2 gap-3">
            <Field placeholder="kg" step="0.01" value={wt.kg} tag="kg" onChange={(e) => wtSync("kg", e.target.value)} />
            <Field placeholder="lbs" step="0.1" value={wt.lbs} tag="lbs" onChange={(e) => wtSync("lbs", e.target.value)} />
          </div>
        </Card>

        {/* CAPACITY */}
        <Card title="Capacity" subtitle="TR, kW, HP & BTU">
          <Hint>Enter any value — all others update</Hint>
          <div className="grid grid-cols-2 gap-3">
            <Field placeholder="TR" step="0.1" value={cap.tr} tag="TR" onChange={(e) => capSync("tr", e.target.value)} />
            <Field placeholder="kW" step="0.01" value={cap.kw} tag="kW" onChange={(e) => capSync("kw", e.target.value)} />
            <Field placeholder="HP" step="0.1" value={cap.hp} tag="HP" onChange={(e) => capSync("hp", e.target.value)} />
            <Field placeholder="BTU/hr" step="100" value={cap.btu} tag="BTU" onChange={(e) => capSync("btu", e.target.value)} />
          </div>
          <Note>1 HP = 0.75 TR = 3.517 kW = 12,000 BTU/hr · Indian HVAC industry convention</Note>
        </Card>

        {/* PRESSURE */}
        <Card title="Pressure" subtitle="Bar, PSI & MPa">
          <Hint>Enter any value — all others update</Hint>
          <div className="grid grid-cols-3 gap-3">
            <Field placeholder="Bar" step="0.1" value={pres.bar} tag="Bar" onChange={(e) => presSync("bar", e.target.value)} />
            <Field placeholder="PSI" step="1" value={pres.psi} tag="PSI" onChange={(e) => presSync("psi", e.target.value)} />
            <Field placeholder="MPa" step="0.01" value={pres.mpa} tag="MPa" onChange={(e) => presSync("mpa", e.target.value)} />
          </div>
          <Note>
            For reference only. Always verify working pressure against tube grade and manufacturer specifications before installation.
          </Note>
        </Card>

        {/* COILS */}
        <Card title="Coils & Lengths" subtitle="How many to order">
          <Hint>Enter quantity needed</Hint>
          <div className="flex flex-wrap gap-2 mb-3">
            <ToggleGroup
              options={[{ value: "m", label: "Metres" }, { value: "ft", label: "Feet" }]}
              value={coilLenUnit}
              onChange={setCoilLenUnit}
            />
            <ToggleGroup
              options={[{ value: "coil", label: "Coil" }, { value: "straight", label: "Straight" }]}
              value={tubeType}
              onChange={setTubeType}
            />
          </div>
          <Field placeholder="Total needed" step="0.01" value={coilVal} tag={coilLenUnit} onChange={(e) => setCoilVal(e.target.value)} />
          <div className="mt-3">
            <OutputBox>
              {coilResult && (
                <span>
                  <span className="text-[18px] font-medium text-[#18234D]">{coilResult.count}</span>
                  <span className="text-[#6B6B6B]">
                    {" "}
                    {coilResult.lbl}
                    {coilResult.count !== 1 ? "s" : ""} × {coilResult.label}
                  </span>
                </span>
              )}
            </OutputBox>
          </div>
          {coilResult && (
            <Note>
              {coilResult.count} × {coilResult.label} = {coilResult.total} {coilLenUnit} total · {coilResult.left} {coilLenUnit} leftover
            </Note>
          )}
        </Card>

        {/* PIPE SIZE */}
        <Card title="Pipe Sizing" subtitle="OD & Wall Thickness">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <Hint>OD — select inch size → see mm</Hint>
              <select value={odInch} onChange={(e) => setOdInch(e.target.value)} className={`${INPUT} appearance-none cursor-pointer`} style={SELECT_STYLE}>
                <option value="">Select OD (inch)</option>
                {OD_INCH_OPTIONS.map((o) => (
                  <option key={o} value={o}>{`${o}"`}</option>
                ))}
              </select>
              <div className="mt-3">
                <OutputBox>{odInchOut}</OutputBox>
              </div>
            </div>

            <div>
              <Hint>OD — enter mm → nearest standard inch</Hint>
              <Field placeholder="e.g. 15.88" step="0.01" value={odMmIn} tag="mm" onChange={(e) => setOdMmIn(e.target.value)} />
              <div className="mt-3">
                <OutputBox>{odMmOut}</OutputBox>
              </div>
            </div>

            <div>
              <Hint>Wall thickness — SWG → mm</Hint>
              <select value={swgSel} onChange={(e) => setSwgSel(e.target.value)} className={`${INPUT} appearance-none cursor-pointer`} style={SELECT_STYLE}>
                <option value="">Select SWG gauge</option>
                {SWG.map(([mm, g]) => (
                  <option key={g} value={mm}>{`SWG ${g} — ${mm} mm`}</option>
                ))}
              </select>
              <div className="mt-3">
                <OutputBox>{swgSel ? `${swgSel} mm` : null}</OutputBox>
              </div>
            </div>

            <div>
              <Hint>Wall thickness — mm → nearest SWG</Hint>
              <Field placeholder="e.g. 0.80" step="0.01" value={mmSwgIn} tag="mm" onChange={(e) => setMmSwgIn(e.target.value)} />
              <div className="mt-3">
                <OutputBox>{mmSwgOut}</OutputBox>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* DISCLAIMER */}
      <div className="mt-8 mb-4 rounded-xl border border-gray-200 border-l-[3px] border-l-[#C68344] bg-[#F0EEE9] px-5 py-5">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#C68344] font-albert mb-1.5">
          Note
        </p>
        <p className="text-[13px] font-light text-[#646C88] font-albert leading-relaxed">
          All conversions are based on standard industry values. Capacity figures
          use Indian HVAC convention (1 HP = 0.75 TR). OD nearest-match is based
          on standard ACR copper tube sizes. For exact specifications, always
          refer to Parasmani product datasheets or contact our technical team.
        </p>
      </div>

      <p className="font-albert text-center text-[12px] sm:text-[14px] text-[#646C88] pb-8 max-w-4xl mx-auto leading-relaxed px-2">
        Disclaimer: The Unit Converter is provided by Parasmani Tubes Copper
        Pvt. Ltd. for reference only. Results are indicative and should be
        independently verified against your project specification before use.
      </p>
    </div>
  );
};

export default UnitConverter;
