import { useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import { FaWhatsapp } from "react-icons/fa";
import api from "../utils/serviceAPI";
import heroImg from "../assets/tools/copperEstimator/estimator-hero.png";

/* ────────────────────────────────────────────────────────────
   HVAC Copper Estimator — cloned from the standalone mock.
   Typography swapped to the app's self-hosted fonts
   (font-obviously-demo for display headings, font-albert for body);
   app Navbar/Footer are kept, the mock's nav / tools-toggle strip
   are dropped. Calculation + PDF logic ported verbatim.
   ──────────────────────────────────────────────────────────── */

const WHATSAPP_NUMBER = "919819134044";

// ── PIPE PAIR DEFINITIONS ──
const pipePairs = {
    "1T": { liquid: '1/4"', suction: '3/8"' },
    "1.5T": { liquid: '1/4"', suction: '1/2"' },
    "2T": { liquid: '3/8"', suction: '5/8"' },
    "3T": { liquid: '1/2"', suction: '3/4"' },
    mixed: { liquid: '1/4"', suction: '1/2"' },
};

const runFactors = {
    wall: { short: 6, medium: 10, long: 15 },
    cassette: { short: 7, medium: 11, long: 16 },
    ducted: { short: 8, medium: 15, long: 22 },
};

const kgPerMetre = {
    vrf: { '1/4"': 0.125, '3/8"': 0.197, '1/2"': 0.268, '5/8"': 0.339, '3/4"': 0.507 },
    split: { '1/4"': 0.099, '3/8"': 0.165, '1/2"': 0.23, '5/8"': 0.295, '3/4"': 0.366 },
};

const sizeToMM = (s) =>
    ({ '1/4"': "6.35mm", '3/8"': "9.53mm", '1/2"': "12.7mm", '5/8"': "15.88mm", '3/4"': "19.05mm" }[s] || s);

const capType = (t) => ({ wall: "Wall", cassette: "Cassette", ducted: "Ducted" }[t] || t);

const getThickness = (sizeKey, isVrf) => {
    const vrfT = { '1/4"': "0.80mm", '3/8"': "0.80mm", '1/2"': "0.80mm", '5/8"': "0.80mm", '3/4"': "1.00mm" };
    const splitT = { '1/4"': "0.61mm", '3/8"': "0.66mm", '1/2"': "0.68mm", '5/8"': "0.69mm", '3/4"': "0.71mm" };
    return isVrf ? vrfT[sizeKey] || "0.80mm" : splitT[sizeKey] || "0.66mm";
};

const getProcurement = (meters, sizeKey) => {
    const coilLen = 15.24;
    const straightLen = 3.0;
    const useCoil = ['1/4"', '3/8"', '1/2"', '5/8"', '3/4"'].includes(sizeKey);
    if (useCoil) {
        const coils = Math.ceil(meters / coilLen);
        return coils + " coil" + (coils !== 1 ? "s" : "") + " × 15.24m";
    }
    const lengths = Math.ceil(meters / straightLen);
    return lengths + " lengths × 3m";
};

const makeRefID = (outdoor) => {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = String(d.getFullYear()).slice(-2);
    const hhmm = String(d.getHours()).padStart(2, "0") + String(d.getMinutes()).padStart(2, "0");
    const sys = outdoor === "vrf" ? "VRF" : "ACR";
    return "PM-" + sys + "-" + yy + mm + dd + "-" + hhmm;
};

const num = (v) => parseInt(v, 10) || 0;

// ── CALCULATE (ported) ──
function calculate({ outdoor, indoorTypes, vrfMode, form, sel }) {
    let allBreakdown = [];
    let totalMeters = 0;
    let totalKg = 0;
    const grade = outdoor === "vrf" ? "vrf" : "split";
    let vrfInfo = { hp: 0, units: 0, floors: 0 };

    if (outdoor === "vrf") {
        let units, floors;
        if (vrfMode === "hp") {
            const hp = num(form.vrfHp);
            floors = num(form.vrfFloorsHp);
            units = Math.round(hp / 1.5);
            vrfInfo = { hp, units, floors };
        } else {
            units = num(form.vrfUnitsTotal);
            floors = num(form.vrfFloors);
            vrfInfo = { hp: 0, units, floors };
        }
        const branchLen = 8, riserLen = 4, wastage = 1.1;
        const liquidM = Math.round((units * branchLen + floors * riserLen) * wastage);
        const gasM = Math.round((units * branchLen + floors * riserLen) * wastage);
        totalMeters = liquidM + gasM;

        const liqSmall = Math.round(liquidM * 0.55);
        const liqMid = Math.round(liquidM * 0.3);
        const liqMain = liquidM - liqSmall - liqMid;
        const gasSmall = Math.round(gasM * 0.4);
        const gasMid = Math.round(gasM * 0.35);
        const gasMain = gasM - gasSmall - gasMid;

        allBreakdown = [
            { size: '1/4" (6.35mm) — Liquid Branches', key: '1/4"', meters: liqSmall },
            { size: '3/8" (9.53mm) — Liquid Sub-mains', key: '3/8"', meters: liqMid },
            { size: '1/2" (12.7mm) — Liquid Main Header', key: '1/2"', meters: liqMain },
            { size: '1/2" (12.7mm) — Gas Branches', key: '1/2"', meters: gasSmall },
            { size: '5/8" (15.88mm) — Gas Sub-mains', key: '5/8"', meters: gasMid },
            { size: '3/4" (19.05mm) — Gas Main Header', key: '3/4"', meters: gasMain },
        ];
    } else {
        ["wall", "cassette", "ducted"].forEach((type) => {
            if (!indoorTypes.includes(type)) return;
            const units = num(form[type + "Units"]);
            const pair = pipePairs[sel[type].tonnage] || pipePairs["1.5T"];
            const runLen = runFactors[type][sel[type].run];
            const mult = type === "cassette" ? 1.15 : type === "ducted" ? 1.2 : 1.0;
            const wastage = 1.1;
            const liquidM = Math.round(units * runLen * mult * wastage);
            const suctionM = Math.round(units * runLen * mult * wastage);
            totalMeters += liquidM + suctionM;
            allBreakdown.push(
                { size: pair.liquid + " (" + sizeToMM(pair.liquid) + ") — " + capType(type) + " Liquid", key: pair.liquid, meters: liquidM },
                { size: pair.suction + " (" + sizeToMM(pair.suction) + ") — " + capType(type) + " Suction", key: pair.suction, meters: suctionM },
            );
        });
    }

    allBreakdown.forEach((item) => {
        totalKg += item.meters * (kgPerMetre[grade][item.key] || 0.165);
    });

    const systemLabel =
        outdoor === "vrf"
            ? "VRF / VRV — " + indoorTypes.map(capType).join(" + ")
            : indoorTypes.map(capType).join(" + ") + " (Non-VRF)";

    const product =
        outdoor === "vrf"
            ? "Parasmani Hard Drawn Copper Tubes — VRF Grade (JIS H3300)"
            : "Parasmani ACR Copper Tubes — Pancake Coil (ASTM B68)";

    const unitsFloors =
        outdoor === "vrf"
            ? (vrfMode === "hp" ? vrfInfo.hp + " HP (~" + vrfInfo.units + " IDUs)" : vrfInfo.units + " IDUs") +
            " / " + vrfInfo.floors + " fl."
            : indoorTypes.map((t) => num(form[t + "Units"]) + " " + capType(t)).join(" + ");

    return {
        meters: totalMeters,
        weight: Math.round(totalKg) + " kg approx.",
        systemLabel,
        product,
        unitsFloors,
        breakdown: allBreakdown,
        vrfInfo,
    };
}

/* ── small presentational helpers ── */
const inr = (n) => n.toLocaleString("en-IN");

const stepMeta = [
    { n: 1, label: "System" },
    { n: 2, label: "Details" },
    { n: 3, label: "Estimate" },
    { n: 4, label: "Done" },
];

const outdoorOptions = [
    { key: "non-vrf", icon: "🌀", name: "Non-VRF", desc: "Individual split systems — one outdoor unit per indoor unit or small multi-split." },
    { key: "vrf", icon: "⬡", name: "VRF / VRV", desc: "Multi-zone system — one outdoor unit serving multiple indoor units across floors." },
];

const indoorOptions = [
    { key: "wall", icon: "🔲", name: "Wall Mounted", desc: "Standard hi-wall split-type indoor unit. Most common residential and light commercial." },
    { key: "cassette", icon: "⊞", name: "Ceiling Cassette", desc: "Four-way ceiling-mounted unit. Common in offices, retail, and commercial interiors." },
    { key: "ducted", icon: "≋", name: "Ducted / AHU", desc: "Concealed ducted unit or air handling unit. Larger capacities, longer pipe runs." },
];

const tonnageSets = {
    wall: [
        { key: "1T", label: "1 TR", sub: '1/4" + 3/8"' },
        { key: "1.5T", label: "1.5 TR", sub: '1/4" + 1/2"' },
        { key: "2T", label: "2 TR", sub: '3/8" + 5/8"' },
        { key: "mixed", label: "Mixed", sub: "Avg 1.5 TR" },
    ],
    cassette: [
        { key: "1.5T", label: "1.5 TR", sub: '1/4" + 1/2"' },
        { key: "2T", label: "2 TR", sub: '3/8" + 5/8"' },
        { key: "mixed", label: "Mixed", sub: "Avg 2 TR" },
    ],
    ducted: [
        { key: "2T", label: "2 TR", sub: '3/8" + 5/8"' },
        { key: "3T", label: "3–5 TR", sub: '1/2" + 3/4"' },
        { key: "mixed", label: "Mixed", sub: "Avg 2–3 TR" },
    ],
};

const runSets = {
    wall: [
        { key: "short", label: "Short", sub: "Same floor / balcony · ~6m" },
        { key: "medium", label: "Medium", sub: "1–2 floors away · ~10m" },
        { key: "long", label: "Long", sub: "Terrace / 3+ floors · ~15m" },
    ],
    cassette: [
        { key: "short", label: "Short", sub: "Same floor · ~6m" },
        { key: "medium", label: "Medium", sub: "1–2 floors · ~10m" },
        { key: "long", label: "Long", sub: "Terrace / 3+ fl. · ~15m" },
    ],
    ducted: [
        { key: "short", label: "Short", sub: "~8m" },
        { key: "medium", label: "Medium", sub: "~15m" },
        { key: "long", label: "Long", sub: "~22m" },
    ],
};

// shared class fragments (mock palette)
const cardBase =
    "relative cursor-pointer rounded-[14px] border-[1.5px] bg-white p-6 transition-all duration-200";
const runCardBase =
    "cursor-pointer rounded-[10px] border-[1.5px] bg-white p-4 text-center transition-all duration-200";
const labelCls =
    "font-albert text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[#19234D]/80";
const inputCls =
    "w-full appearance-none rounded-[10px] border border-[#272727]/10 bg-white px-[18px] py-[14px] font-albert text-[0.92rem] text-[#272727] outline-none transition-colors focus:border-[#C68345] focus:ring-[3px] focus:ring-[#C68345]/10 placeholder:text-[#272727]/32";
const microLabel =
    "font-albert text-[0.72rem] font-medium uppercase tracking-[0.14em] text-[#272727]/55";

/* ── render helpers ──
   These live at module scope on purpose. Defined inside CopperEstimator they
   were a fresh component type on every render, so React unmounted and remounted
   the subtree on each keystroke and TypeGroup's number inputs lost focus after
   a single digit. Anything they used from the component's state is a prop. */
const SysCard = ({ opt, selected, onClick }) => (
    <div
        onClick={onClick}
        className={`${cardBase} ${selected
            ? "border-[#C68345] bg-[#C68345]/[0.04] shadow-[0_0_0_3px_rgba(198,131,69,0.1)]"
            : "border-[#272727]/10 hover:-translate-y-0.5 hover:border-[#C68345]/28 hover:shadow-[0_8px_28px_rgba(198,131,69,0.1)]"
            }`}
    >
        <span className="mb-3 block text-[1.6rem]">{opt.icon}</span>
        <div className="mb-1.5 font-obviously-demo text-[0.88rem] tracking-[-0.01em] text-[#19234D]">{opt.name}</div>
        <div className="font-albert text-[0.74rem] font-light leading-[1.6] text-[#272727]/55">{opt.desc}</div>
        {selected && (
            <div className="absolute right-3.5 top-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#C68345] text-[0.65rem] font-bold text-white">
                ✓
            </div>
        )}
    </div>
);

const RunCard = ({ item, selected, onClick }) => (
    <div
        onClick={onClick}
        className={`${runCardBase} ${selected ? "border-[#C68345] bg-[#C68345]/[0.06]" : "border-[#272727]/10 hover:border-[#C68345]/28"
            }`}
    >
        <div className="mb-1 font-obviously-demo text-[0.9rem] text-[#19234D]">{item.label}</div>
        <div className="font-albert text-[0.68rem] font-light leading-[1.5] text-[#272727]/55">{item.sub}</div>
    </div>
);

const TypeGroup = ({ type, title, form, setField, sel, setSel }) => (
    <div className="mb-5 rounded-[14px] border border-[#272727]/10 bg-white p-7">
        <div className="mb-5 font-obviously-demo text-[1rem] tracking-[-0.01em] text-[#19234D]">{title}</div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-2">
                <label className={labelCls}>
                    Number of {capType(type)} Units <span className="text-[#C68345]">*</span>
                </label>
                <input
                    type="number"
                    className={inputCls}
                    value={form[type + "Units"]}
                    onChange={(e) => setField(type + "Units", e.target.value)}
                    placeholder="e.g. 12"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className={labelCls}>Number of Floors</label>
                <input
                    type="number"
                    className={inputCls}
                    value={form[type + "Floors"]}
                    onChange={(e) => setField(type + "Floors", e.target.value)}
                    placeholder="e.g. 4"
                />
            </div>
        </div>
        <div className="mt-4">
            <p className={`${microLabel} mb-3`}>Average Capacity</p>
            <div className={`grid gap-3 ${tonnageSets[type].length === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-1 sm:grid-cols-3"}`}>
                {tonnageSets[type].map((item) => (
                    <RunCard
                        key={item.key}
                        item={item}
                        selected={sel[type].tonnage === item.key}
                        onClick={() => setSel((s) => ({ ...s, [type]: { ...s[type], tonnage: item.key } }))}
                    />
                ))}
            </div>
        </div>
        <div className="mt-4">
            <p className={`${microLabel} mb-3`}>Typical Pipe Run</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {runSets[type].map((item) => (
                    <RunCard
                        key={item.key}
                        item={item}
                        selected={sel[type].run === item.key}
                        onClick={() => setSel((s) => ({ ...s, [type]: { ...s[type], run: item.key } }))}
                    />
                ))}
            </div>
        </div>
    </div>
);

const ResultCard = ({ full, result }) => (
    <div className="relative overflow-hidden rounded-2xl border border-[#272727]/10 bg-white">
        <div className="flex items-center justify-between bg-[#19234D] px-6 py-4">
            <span className="font-obviously-demo text-[0.85rem] tracking-[0.02em] text-white">
                {full ? "Full Project Copper Estimate" : "Project Copper Estimate"}
            </span>
            <span className="font-albert text-[0.62rem] font-medium uppercase tracking-[0.14em] text-white/40">
                Parasmani Tubes
            </span>
        </div>
        <div className="px-7 pb-6 pt-7">
            <div className="mb-1.5 flex items-baseline gap-2.5">
                <span className="font-obviously-demo text-[3.5rem] leading-none tracking-[-0.04em] text-[#19234D]">
                    {result ? inr(result.meters) : "—"}
                </span>
                <span className="font-albert text-[0.82rem] font-medium uppercase tracking-[0.14em] text-[#C68345]">metres</span>
            </div>
            <p className="mb-5 font-albert text-[0.72rem] tracking-[0.04em] text-[#272727]/55">
                {full
                    ? "Estimated Total Copper Tube Requirement (incl. 10% wastage buffer)"
                    : "Estimated Copper Tube Requirement"}
            </p>
            <div className="mb-5 grid grid-cols-1 gap-px overflow-hidden rounded-[10px] border border-[#272727]/10 bg-[#272727]/10 md:grid-cols-3">
                {[
                    ["Approx Weight", result?.weight],
                    ["System Type", result?.systemLabel],
                    ["Units / Floors", result?.unitsFloors],
                ].map(([lbl, val]) => (
                    <div key={lbl} className="bg-white px-4 py-3.5">
                        <div className="mb-1.5 font-albert text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#272727]/32">
                            {lbl}
                        </div>
                        <div className="font-obviously-demo text-[0.9rem] text-[#19234D]">{val || "—"}</div>
                    </div>
                ))}
            </div>

            {full && result && (
                <div className="my-6">
                    <div className="mb-3.5 font-albert text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#272727]/32">
                        Size-wise Breakdown
                    </div>
                    <div className="flex flex-col gap-2">
                        {result.breakdown.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between rounded-lg border border-[#272727]/[0.08] bg-[#f9f7f4] px-3.5 py-2.5"
                            >
                                <span className="font-albert text-[0.82rem] font-light text-[#272727]/55">{item.size}</span>
                                <span className="font-albert text-[0.88rem] font-medium text-[#19234D]">~{inr(item.meters)} m</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex items-center gap-3.5 rounded-[10px] border border-[#C68345]/28 bg-[#C68345]/[0.04] px-4.5 py-3.5">
                <div className="shrink-0 text-[1.3rem]">🔶</div>
                <div>
                    <div className="mb-0.5 font-albert text-[0.88rem] font-medium text-[#19234D]">{result?.product || "—"}</div>
                    <div className="font-albert text-[0.7rem] font-light text-[#272727]/55">
                        Recommended {full ? "Parasmani product" : "product category"} for this project
                    </div>
                </div>
            </div>

            {full && (
                <div className="mt-5 rounded-[10px] border border-[#C68345]/28 bg-[#C68345]/[0.06] px-4.5 py-3.5 font-albert text-[0.76rem] font-light leading-[1.7] text-[#272727]/55">
                    <strong className="text-[#C68345]">Approximate estimate only.</strong> Actual copper requirement depends on
                    site-specific pipe routing, outdoor unit placement, and contractor layout. This estimate is for early project
                    budgeting purposes only. For an exact BOQ, contact our team.
                </div>
            )}
        </div>

        {!full && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/70 px-10 text-center backdrop-blur-[6px]">
                <p className="mb-3 font-obviously-demo text-[1.4rem] text-[#19234D]">Your estimate is ready.</p>
                <p className="mb-4 max-w-[400px] font-albert text-[0.82rem] font-light leading-[1.8] text-[#272727]/55">
                    Enter your details below to unlock the full breakdown — including size-wise quantity and product
                    recommendation.
                </p>
                <p className="max-w-[400px] font-albert text-[0.68rem] tracking-[0.04em] text-[#272727]/32">
                    Approximation based on typical residential &amp; commercial VRF/non-VRF routing assumptions.
                </p>
            </div>
        )}
    </div>
);

const CopperEstimator = () => {
    const [panel, setPanel] = useState(1);
    const [outdoor, setOutdoor] = useState(null);
    const [indoorTypes, setIndoorTypes] = useState([]);
    const [vrfMode, setVrfMode] = useState("hp");
    const [sel, setSel] = useState({
        wall: { tonnage: "1T", run: "short" },
        cassette: { tonnage: "2T", run: "short" },
        ducted: { tonnage: "2T", run: "medium" },
    });
    const [form, setForm] = useState({
        vrfHp: "", vrfFloorsHp: "", vrfUnitsTotal: "", vrfFloors: "", vrfOdus: "",
        wallUnits: "", wallFloors: "", cassetteUnits: "", cassetteFloors: "",
        ductedUnits: "", ductedFloors: "", btype: "", city: "",
    });
    const [result, setResult] = useState(null);
    const [unlocked, setUnlocked] = useState(false);
    const [lead, setLead] = useState({ name: "", company: "", phone: "", email: "", brand: "", timeline: "" });
    const [errors, setErrors] = useState({ name: false, phone: false });
    const [submitting, setSubmitting] = useState(false);

    const isVrf = outdoor === "vrf";
    const stepsActive = unlocked ? 4 : panel;
    const step1Ready = outdoor && indoorTypes.length > 0;

    const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));
    const setLeadField = (k, v) => setLead((l) => ({ ...l, [k]: v }));

    const goToPanel = (n) => {
        setPanel(n);
        window.scrollTo({ top: 180, behavior: "smooth" });
    };

    const toggleIndoor = (key) =>
        setIndoorTypes((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

    const validatePanel2 = () => {
        if (isVrf) {
            if (vrfMode === "hp") {
                if (!form.vrfHp) return alert("Please enter total HP."), false;
                if (!form.vrfFloorsHp) return alert("Please enter number of floors."), false;
            } else {
                if (!form.vrfUnitsTotal) return alert("Please enter total indoor units."), false;
                if (!form.vrfFloors) return alert("Please enter number of floors."), false;
            }
        } else {
            let hasAny = false;
            for (const type of ["wall", "cassette", "ducted"]) {
                if (!indoorTypes.includes(type)) continue;
                const v = form[type + "Units"];
                if (!v || num(v) < 1) return alert("Please enter number of " + capType(type) + " units."), false;
                hasAny = true;
            }
            if (!hasAny) return alert("Please fill in at least one unit type."), false;
        }
        return true;
    };

    const calculateAndPreview = () => {
        if (!validatePanel2()) return;
        const r = calculate({ outdoor, indoorTypes, vrfMode, form, sel });
        setResult(r);
        setUnlocked(false);
        goToPanel(3);
    };

    /* The lead goes to the same POST /api/contact the enquiry form uses, so it
       lands in the admin Enquiries table. The estimator-only fields ride along
       as optional extras and `source` is what tells the two apart.

       The report itself is computed client-side, so a backend failure only
       costs us the lead — it must not stop the visitor seeing their estimate. */
    const submitLead = async () => {
        const name = lead.name.trim();
        const phone = lead.phone.trim();
        const nameErr = !name;
        const phoneErr = !phone || phone.length < 8;
        setErrors({ name: nameErr, phone: phoneErr });
        if (nameErr || phoneErr) return;

        setSubmitting(true);
        try {
            const scale = isVrf
                ? vrfMode === "hp"
                    ? `Total HP: ${result.vrfInfo.hp} | Floors: ${result.vrfInfo.floors}`
                    : `IDUs: ${result.vrfInfo.units} | Floors: ${result.vrfInfo.floors}`
                : result.unitsFloors;

            const summary = [
                "Project Estimator lead — HVAC copper requirement.",
                "",
                `System: ${result.systemLabel}`,
                `Scale: ${scale}`,
                form.btype ? `Building: ${form.btype}` : null,
                form.city ? `Location: ${form.city}` : null,
                lead.brand.trim() ? `AC Brand: ${lead.brand.trim()}` : null,
                lead.timeline ? `Timeline: ${lead.timeline}` : null,
                `Estimated copper: ~${result.meters} m / ${result.weight}`,
            ]
                .filter((line) => line !== null)
                .join("\n");

            await api.post("/api/contact", {
                fullName: name,
                contactNumber: phone,
                email: lead.email.trim() || undefined,
                message: summary,
                source: "Project Estimator",
                company: lead.company.trim() || undefined,
                brand: lead.brand.trim() || undefined,
                timeline: lead.timeline || undefined,
                estimate: {
                    systemLabel: result.systemLabel,
                    product: result.product,
                    scale,
                    buildingType: form.btype || undefined,
                    city: form.city || undefined,
                    meters: result.meters,
                    weight: result.weight,
                    breakdown: (result.breakdown || []).map((item) => ({
                        size: item.size,
                        meters: item.meters,
                    })),
                },
            });
        } catch (err) {
            console.error("Failed to submit estimator lead:", err);
        } finally {
            setSubmitting(false);
        }

        setUnlocked(true);
        window.scrollTo({ top: 180, behavior: "smooth" });
    };

    const resetTool = () => {
        setPanel(1);
        setOutdoor(null);
        setIndoorTypes([]);
        setVrfMode("hp");
        setSel({
            wall: { tonnage: "1T", run: "short" },
            cassette: { tonnage: "2T", run: "short" },
            ducted: { tonnage: "2T", run: "medium" },
        });
        setForm({
            vrfHp: "", vrfFloorsHp: "", vrfUnitsTotal: "", vrfFloors: "", vrfOdus: "",
            wallUnits: "", wallFloors: "", cassetteUnits: "", cassetteFloors: "",
            ductedUnits: "", ductedFloors: "", btype: "", city: "",
        });
        setResult(null);
        setUnlocked(false);
        setLead({ name: "", company: "", phone: "", email: "", brand: "", timeline: "" });
        setErrors({ name: false, phone: false });
        window.scrollTo({ top: 180, behavior: "smooth" });
    };

    const whatsappHref = useMemo(() => {
        if (!result) return "#";
        const projectScale = isVrf
            ? vrfMode === "hp"
                ? "Total HP: " + result.vrfInfo.hp + " | Floors: " + result.vrfInfo.floors
                : "IDUs: " + result.vrfInfo.units + " | Floors: " + result.vrfInfo.floors
            : result.unitsFloors;
        const msg = encodeURIComponent(
            `Hi Parasmani,\n\nI used your HVAC Copper Estimator:\n\n` +
            `System: ${result.systemLabel}\n` +
            `Scale: ${projectScale}\n` +
            `${form.btype ? "Building: " + form.btype + "\n" : ""}` +
            `${form.city ? "Location: " + form.city + "\n" : ""}` +
            `${lead.brand ? "AC Brand: " + lead.brand + "\n" : ""}` +
            `Estimated Copper: ~${result.meters} metres / ${result.weight}\n\n` +
            `Please share pricing and availability.\n\nName: ${lead.name}\nPhone: ${lead.phone}`,
        );
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    }, [result, isVrf, vrfMode, form.btype, form.city, lead.brand, lead.name, lead.phone]);

    const generatePDF = () => {
        if (!result) return;
        const r = result;
        const doc = new jsPDF();
        const refID = makeRefID(outdoor);
        const company = lead.company || "";
        const dateStr = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

        doc.setFillColor(25, 35, 77);
        doc.rect(0, 0, 210, 34, "F");
        doc.setDrawColor(198, 131, 69);
        doc.setLineWidth(0.8);
        doc.line(0, 34, 210, 34);
        doc.setLineWidth(0.2);

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("PARASMANI TUBES COPPER PVT. LTD.", 14, 13);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(198, 131, 69);
        doc.text("COPPER TUBE REQUIREMENT ESTIMATE", 14, 21);
        doc.setTextColor(180, 180, 200);
        doc.text("parasmanicopper.com  |  +91 98191 34044", 196, 21, { align: "right" });

        doc.setFontSize(7.5);
        doc.setTextColor(140, 140, 140);
        doc.text("Date: " + dateStr, 14, 41);
        doc.text("Ref: " + refID, 196, 41, { align: "right" });
        if (lead.name) {
            doc.setTextColor(25, 35, 77);
            doc.setFont("helvetica", "bold");
            doc.text("Prepared for: ", 14, 48);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(60, 60, 60);
            doc.text(lead.name + (company ? ",  " + company : "") + (form.city ? "  ·  " + form.city : ""), 46, 48);
        }

        doc.setFillColor(248, 246, 242);
        doc.roundedRect(14, 54, 182, 38, 3, 3, "F");
        doc.setFillColor(198, 131, 69);
        doc.rect(14, 54, 3, 38, "F");

        doc.setFontSize(36);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(25, 35, 77);
        doc.text(inr(r.meters), 24, 78);
        const numWidth = doc.getTextWidth(inr(r.meters));
        doc.setFontSize(13);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(198, 131, 69);
        doc.text(" metres", 24 + numWidth, 78);

        doc.setFontSize(8);
        doc.setTextColor(120, 120, 120);
        doc.text("ESTIMATED COPPER TUBE REQUIREMENT  ·  INCLUDES 10% WASTAGE BUFFER", 24, 85);

        doc.setFillColor(25, 35, 77);
        doc.roundedRect(148, 60, 44, 24, 2, 2, "F");
        doc.setFontSize(7);
        doc.setTextColor(198, 131, 69);
        doc.setFont("helvetica", "bold");
        doc.text("EST. WEIGHT", 170, 67, { align: "center" });
        doc.setFontSize(11);
        doc.setTextColor(255, 255, 255);
        doc.text("~" + r.weight.replace(" kg approx.", "") + " kg", 170, 76, { align: "center" });

        let y = 100;
        doc.setDrawColor(230, 230, 230);
        doc.setLineWidth(0.3);
        doc.line(14, y, 196, y);

        const pdfScale = isVrf
            ? vrfMode === "hp"
                ? r.vrfInfo.hp + " HP  (~" + r.vrfInfo.units + " IDUs)  /  " + r.vrfInfo.floors + " floors"
                : r.vrfInfo.units + " IDUs  /  " + r.vrfInfo.floors + " floors"
            : r.unitsFloors;

        const summaryLeft = [
            ["SYSTEM", r.systemLabel],
            ["PROJECT SCALE", pdfScale],
            ["BUILDING TYPE", form.btype || "—"],
        ];
        const summaryRight = [
            ["AC BRAND", lead.brand || "—"],
            ["LOCATION", form.city || "—"],
            ["PRODUCT", isVrf ? "VRF Grade — JIS H3300" : "Non-VRF — ASTM B68"],
        ];

        y = 108;
        summaryLeft.forEach(([lbl, val]) => {
            doc.setFontSize(6.5);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(160, 160, 160);
            doc.text(lbl, 14, y);
            doc.setFontSize(8);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(30, 30, 60);
            doc.text(String(val), 14, y + 5);
            y += 14;
        });
        y = 108;
        summaryRight.forEach(([lbl, val]) => {
            doc.setFontSize(6.5);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(160, 160, 160);
            doc.text(lbl, 108, y);
            doc.setFontSize(8);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(30, 30, 60);
            doc.text(String(val), 108, y + 5);
            y += 14;
        });

        y = 152;
        doc.setDrawColor(230, 230, 230);
        doc.line(14, y, 196, y);
        y += 8;
        doc.setFillColor(198, 131, 69);
        doc.rect(14, y - 1, 2, 5, "F");
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(25, 35, 77);
        doc.text("SIZE-WISE BREAKDOWN & PROCUREMENT GUIDE", 19, y + 3);
        y += 10;

        doc.setFillColor(25, 35, 77);
        doc.rect(14, y, 182, 7, "F");
        doc.setFontSize(7);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(255, 255, 255);
        doc.text("SIZE", 16, y + 5);
        doc.text("APPLICATION", 38, y + 5);
        doc.text("WALL THICKNESS", 90, y + 5);
        doc.text("LENGTH", 128, y + 5);
        doc.text("PROCUREMENT", 158, y + 5);
        y += 7;

        (r.breakdown || []).forEach((item, i) => {
            const rowBg = i % 2 === 0 ? [250, 248, 244] : [255, 255, 255];
            doc.setFillColor(...rowBg);
            doc.rect(14, y, 182, 8, "F");
            if (i % 2 === 0) {
                doc.setFillColor(198, 131, 69);
                doc.rect(14, y, 1, 8, "F");
            }
            doc.setFontSize(7.5);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(25, 35, 77);
            doc.text(item.key, 16, y + 5.5);
            const appText = item.size.replace(/^[\d/"]+\s*\([^)]+\)\s*—\s*/, "");
            doc.setFont("helvetica", "normal");
            doc.setTextColor(60, 60, 60);
            doc.text(appText, 38, y + 5.5);
            doc.setTextColor(100, 100, 100);
            doc.text(item.key + " × " + getThickness(item.key, isVrf), 90, y + 5.5);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(25, 35, 77);
            doc.text("~" + inr(item.meters) + " m", 128, y + 5.5);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(80, 80, 80);
            doc.text(getProcurement(item.meters, item.key), 158, y + 5.5);
            y += 8;
        });

        doc.setDrawColor(198, 131, 69);
        doc.setLineWidth(0.5);
        doc.line(14, y, 196, y);
        doc.setLineWidth(0.2);

        y += 2;
        doc.setFillColor(25, 35, 77);
        doc.rect(14, y, 182, 9, "F");
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(255, 255, 255);
        doc.text("TOTAL ESTIMATED REQUIREMENT", 16, y + 6);
        doc.setTextColor(198, 131, 69);
        doc.text("~" + inr(r.meters) + " m  ·  " + r.weight.replace("approx.", "est."), 128, y + 6);
        y += 14;

        doc.setFillColor(252, 249, 244);
        doc.setDrawColor(198, 131, 69);
        doc.setLineWidth(0.4);
        doc.roundedRect(14, y, 182, 22, 2, 2, "FD");
        doc.setLineWidth(0.2);
        doc.setFontSize(7);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(198, 131, 69);
        doc.text("IMPORTANT DISCLAIMER", 19, y + 6);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        doc.text(
            doc.splitTextToSize(
                "Approximation based on typical residential & commercial VRF/non-VRF routing assumptions. Actual copper requirement depends on site-specific pipe routing, outdoor unit placement, and contractor layout. Use for early project budgeting only — confirm exact quantities after site survey.",
                170,
            ),
            19,
            y + 12,
        );
        y += 28;

        doc.setFontSize(7.5);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        doc.text("Need an exact BOQ?  Contact Parasmani Technical Team:", 14, y + 6);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(25, 35, 77);
        doc.text("WhatsApp: +91 98191 34044", 14, y + 13);
        doc.setTextColor(198, 131, 69);
        doc.text("parasmanicopper.com", 196, y + 13, { align: "right" });

        doc.setFillColor(25, 35, 77);
        doc.rect(0, 272, 210, 25, "F");
        doc.setDrawColor(198, 131, 69);
        doc.setLineWidth(0.8);
        doc.line(0, 272, 210, 272);
        doc.setLineWidth(0.2);
        doc.setFontSize(7);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(180, 180, 200);
        doc.text("Parasmani Tubes Copper Pvt. Ltd.  ·  GIDC Umbergaon, Gujarat  ·  ISO 9001:2015  ·  BIS Certified", 14, 281);
        doc.setTextColor(198, 131, 69);
        doc.text("Ref: " + refID, 196, 281, { align: "right" });
        doc.setTextColor(120, 120, 140);
        doc.text("This document is computer-generated. Verify all quantities before procurement.", 14, 288);

        doc.save("Parasmani-Estimate-" + refID + ".pdf");
    };


    const btnPrimary =
        "inline-flex items-center gap-2 rounded-full bg-[#19234D] px-7 py-[14px] font-albert text-[0.78rem] font-semibold tracking-[0.04em] text-white transition-colors hover:bg-[#0e1830] disabled:cursor-not-allowed disabled:opacity-40";
    const btnSecondary =
        "inline-flex items-center gap-2 rounded-full border border-[#272727]/10 px-6 py-[13px] font-albert text-[0.78rem] font-medium text-[#272727]/55 transition-colors hover:border-[#272727]/18 hover:text-[#19234D]";

    const secLabel = "font-albert text-[0.6rem] font-medium uppercase tracking-[0.22em] text-[#C68345]";
    const secTitle = "font-obviously-demo text-[1.8rem] leading-[1.1] tracking-[-0.02em] text-[#19234D] md:text-[2.4rem]";
    const secBody = "mt-2.5 max-w-[560px] font-albert text-[0.9rem] font-light leading-[1.8] text-[#272727]/55";


    return (
        <div className="min-h-screen bg-[#F5F4F1]">
            {/* ── HERO (matches other tools' banner responsiveness) ── */}
            {/* Mobile — stacked, image on top */}
            <div className="md:hidden">
                <div className="relative h-[190px] w-full">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#F5F4F1] via-[#F5F4F1]/10 to-transparent" />
                    <img src={heroImg} alt="" aria-hidden="true" className="h-full w-full object-cover object-center" />
                </div>
                <div className="px-5 pb-8 pt-5 text-center">
                    <span className="eyebrow-1 block font-albert uppercase tracking-[0.15em] text-[#C43A26]  mb-2">
                        Parasmani Utility Tools
                    </span>
                    <h1 className="h1 mb-4 tracking-tight text-[#18234D]">HVAC Copper Estimator.</h1>
                    <p className="p1 mx-auto max-w-[390px] font-albert font-light leading-5 text-[#19234D] opacity-95">
                        Get an instant copper tube quantity estimate for your VRF or split AC project — by system size, unit count,
                        and pipe run.
                    </p>
                </div>
            </div>

            {/* Desktop */}
            <section
                className="relative hidden w-full items-center overflow-hidden md:flex md:h-[320px]"
                style={{ backgroundImage: `url('${heroImg}')`, backgroundSize: "cover", backgroundPosition: "right center" }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-[#f7f6f3] from-35% via-[#f7f6f3]/85 via-55% to-transparent" />
                <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-16">
                    <div className="max-w-xl text-left">
                        <span className="eyebrow-1 block font-albert uppercase tracking-[0.15em] text-[#C43A26]  mb-2">
                            Parasmani Utility Tools
                        </span>
                        <h1 className="h1 mb-4 tracking-tight text-[#18234D]">
                            HVAC Copper <br /> Estimator.
                        </h1>
                        <p className="p1 max-w-[480px] font-albert font-light leading-5 text-[#19234D] opacity-95">
                            Get an instant copper tube quantity estimate for your VRF or split AC project — by system size, unit
                            count, and pipe run.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── MAIN ── */}
            <div className="mx-auto max-w-[1100px] px-5 pb-20 pt-10 md:px-12">
                {/* Step bar */}
                <div className="mb-10 flex flex-wrap gap-x-2 gap-y-3">
                    {stepMeta.map((s, i) => {
                        const active = s.n === stepsActive;
                        const done = s.n < stepsActive;
                        return (
                            <div key={s.n} className="relative flex items-center gap-2.5 py-2.5 pr-6">
                                <div
                                    className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border text-[0.65rem] font-semibold transition-all ${active
                                        ? "border-[#C68345] bg-[#C68345] text-white"
                                        : done
                                            ? "border-[#C68345]/28 bg-[#C68345]/[0.18] text-[#C68345]"
                                            : "border-[#272727]/15 bg-[#272727]/[0.06] text-[#272727]/40"
                                        }`}
                                >
                                    {s.n}
                                </div>
                                <span
                                    className={`font-albert text-[0.7rem] uppercase tracking-[0.08em] transition-colors ${active ? "text-[#19234D]" : done ? "text-[#272727]/55" : "text-[#272727]/32"
                                        }`}
                                >
                                    {s.label}
                                </span>
                                {i < stepMeta.length - 1 && (
                                    <span className="absolute right-0 text-[0.75rem] text-[#272727]/20">→</span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* ══ PANEL 1 ══ */}
                {panel === 1 && (
                    <div>
                        <p className={secLabel}>Step 1 of 3</p>
                        <h2 className={`${secTitle} mt-4`}>
                            Tell us about
                            <br />
                            <em className="not-italic text-[#C68345]">the system.</em>
                        </h2>
                        <p className={secBody}>
                            Two quick questions — the outdoor system type and the indoor unit types on this project.
                        </p>

                        <p className={`${microLabel} mb-3.5 mt-9`}>Outdoor System Type</p>
                        <div className="mb-9 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                            {outdoorOptions.map((opt) => (
                                <SysCard key={opt.key} opt={opt} selected={outdoor === opt.key} onClick={() => setOutdoor(opt.key)} />
                            ))}
                        </div>

                        <p className={`${microLabel} mb-3.5`}>
                            Indoor Unit Types{" "}
                            <span className="font-light normal-case tracking-normal text-[#272727]/32">(select all that apply)</span>
                        </p>
                        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                            {indoorOptions.map((opt) => (
                                <SysCard
                                    key={opt.key}
                                    opt={opt}
                                    selected={indoorTypes.includes(opt.key)}
                                    onClick={() => toggleIndoor(opt.key)}
                                />
                            ))}
                        </div>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <button className={btnPrimary} onClick={() => goToPanel(2)} disabled={!step1Ready}>
                                Continue <span>→</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* ══ PANEL 2 ══ */}
                {panel === 2 && (
                    <div>
                        <p className={secLabel}>Step 2 of 3</p>
                        <h2 className={`${secTitle} mt-4`}>
                            Tell us about
                            <br />
                            <em className="not-italic text-[#C68345]">the project.</em>
                        </h2>
                        <p className={secBody}>Fill in the details for each unit type. We'll calculate and combine the totals.</p>

                        <div className="mt-9">
                            {isVrf && (
                                <div className="mb-5 rounded-[14px] border border-[#272727]/10 bg-white p-7">
                                    <div className="mb-5 font-obviously-demo text-[1rem] tracking-[-0.01em] text-[#19234D]">
                                        VRF System Scale
                                    </div>
                                    <div className="mb-6 flex w-fit overflow-hidden rounded-[8px] border border-[#272727]/10">
                                        {[
                                            ["hp", "Enter by HP"],
                                            ["units", "Enter by Units"],
                                        ].map(([mode, label]) => (
                                            <button
                                                key={mode}
                                                type="button"
                                                onClick={() => setVrfMode(mode)}
                                                className={`px-[22px] py-[9px] font-albert text-[0.72rem] font-medium uppercase tracking-[0.1em] transition-all ${vrfMode === mode ? "bg-[#19234D] text-white" : "bg-[#F2F0EC] text-[#272727]/55"
                                                    }`}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>

                                    {vrfMode === "hp" ? (
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            <div className="flex flex-col gap-2">
                                                <label className={labelCls}>
                                                    Total Project Capacity (HP) <span className="text-[#C68345]">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    className={inputCls}
                                                    value={form.vrfHp}
                                                    onChange={(e) => setField("vrfHp", e.target.value)}
                                                    placeholder="e.g. 200"
                                                />
                                                <span className="mt-1 block font-albert text-[0.7rem] text-[#272727]/32">
                                                    1 HP ≈ 0.75 kW ≈ 0.75 TR. Enter total connected load.
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className={labelCls}>
                                                    Number of Floors Served <span className="text-[#C68345]">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    className={inputCls}
                                                    value={form.vrfFloorsHp}
                                                    onChange={(e) => setField("vrfFloorsHp", e.target.value)}
                                                    placeholder="e.g. 8"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                            <div className="flex flex-col gap-2">
                                                <label className={labelCls}>
                                                    Total Indoor Units <span className="text-[#C68345]">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    className={inputCls}
                                                    value={form.vrfUnitsTotal}
                                                    onChange={(e) => setField("vrfUnitsTotal", e.target.value)}
                                                    placeholder="e.g. 40"
                                                />
                                                <span className="mt-1 block font-albert text-[0.7rem] text-[#272727]/32">
                                                    Total across all indoor unit types selected.
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className={labelCls}>
                                                    Number of Floors Served <span className="text-[#C68345]">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    className={inputCls}
                                                    value={form.vrfFloors}
                                                    onChange={(e) => setField("vrfFloors", e.target.value)}
                                                    placeholder="e.g. 8"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className={labelCls}>Number of Outdoor Units</label>
                                                <input
                                                    type="number"
                                                    className={inputCls}
                                                    value={form.vrfOdus}
                                                    onChange={(e) => setField("vrfOdus", e.target.value)}
                                                    placeholder="e.g. 4"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {!isVrf && indoorTypes.includes("wall") && <TypeGroup type="wall" title="Wall Mounted Units" form={form} setField={setField} sel={sel} setSel={setSel} />}
                            {!isVrf && indoorTypes.includes("cassette") && <TypeGroup type="cassette" title="Ceiling Cassette Units" form={form} setField={setField} sel={sel} setSel={setSel} />}
                            {!isVrf && indoorTypes.includes("ducted") && <TypeGroup type="ducted" title="Ducted / AHU Units" form={form} setField={setField} sel={sel} setSel={setSel} />}

                            {/* Project info */}
                            <div className="mb-5 rounded-[14px] border border-[#272727]/10 bg-white p-7">
                                <div className="mb-5 font-obviously-demo text-[1rem] tracking-[-0.01em] text-[#19234D]">Project Info</div>
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div className="flex flex-col gap-2">
                                        <label className={labelCls}>Building Type</label>
                                        <select className={inputCls} value={form.btype} onChange={(e) => setField("btype", e.target.value)}>
                                            <option value="">Select type</option>
                                            {[
                                                "Residential Apartment",
                                                "Villa / Bungalow",
                                                "Commercial Office",
                                                "Retail",
                                                "Hotel / Hospitality",
                                                "Hospital / Healthcare",
                                                "Industrial / Warehouse",
                                                "Mixed Use",
                                                "Other",
                                            ].map((o) => (
                                                <option key={o}>{o}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className={labelCls}>City / Location</label>
                                        <input
                                            type="text"
                                            className={inputCls}
                                            value={form.city}
                                            onChange={(e) => setField("city", e.target.value)}
                                            placeholder="e.g. Mumbai"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <button className={btnSecondary} onClick={() => goToPanel(1)}>
                                ← Back
                            </button>
                            <button className={btnPrimary} onClick={calculateAndPreview}>
                                Calculate Estimate →
                            </button>
                        </div>
                    </div>
                )}

                {/* ══ PANEL 3 ══ */}
                {panel === 3 && (
                    <div>
                        <p className={secLabel}>Step 3 of 3</p>
                        <h2 className={`${secTitle} mt-4`}>
                            Your Copper
                            <br />
                            <em className="not-italic text-[#C68345]">Estimate.</em>
                        </h2>
                        <p className={secBody}>
                            Here's your approximate copper tube requirement based on typical installation parameters.
                        </p>

                        <div className="mt-9">
                            {!unlocked ? (
                                <>
                                    <div className="mb-8">
                                        <ResultCard full={false} result={result} />
                                    </div>

                                    {/* Lead form */}
                                    <div className="rounded-2xl border border-[#272727]/10 bg-white p-8">
                                        <p className={`${secLabel} mb-2`}>Unlock Full Report</p>
                                        <h3 className="mb-1.5 font-albert text-[1.3rem] font-light tracking-[-0.01em] text-[#19234D]">
                                            Where should we send your estimate?
                                        </h3>
                                        <p className="mb-6 font-albert text-[0.82rem] font-light leading-[1.7] text-[#272727]/55">
                                            We'll share the full breakdown with size recommendations and our team will follow up with exact
                                            pricing.
                                        </p>

                                        <div className="mb-6 rounded-[10px] border border-[#C68345]/28 border-l-[3px] border-l-[#C68345] bg-[#C68345]/[0.04] px-5 py-4 font-albert text-[0.76rem] font-light leading-[1.75] text-[#272727]/55">
                                            <strong>Note:</strong> This is an approximate estimation tool based on typical installation
                                            assumptions. Actual copper requirement depends on site layout, pipe routing, and outdoor unit
                                            placement — which only your contractor can confirm after a site survey. Use this for early
                                            budgeting only.
                                        </div>

                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            <div className="flex flex-col gap-2">
                                                <label className={labelCls}>
                                                    Your Name <span className="text-[#C68345]">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`${inputCls} ${errors.name ? "!border-[#c0392b]" : ""}`}
                                                    value={lead.name}
                                                    onChange={(e) => setLeadField("name", e.target.value)}
                                                    placeholder="Full name"
                                                />
                                                {errors.name && (
                                                    <span className="font-albert text-[0.68rem] font-medium text-[#c0392b]">
                                                        Please enter your name
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className={labelCls}>Company / Firm</label>
                                                <input
                                                    type="text"
                                                    className={inputCls}
                                                    value={lead.company}
                                                    onChange={(e) => setLeadField("company", e.target.value)}
                                                    placeholder="Company or contractor name"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className={labelCls}>
                                                    Phone Number <span className="text-[#C68345]">*</span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    className={`${inputCls} ${errors.phone ? "!border-[#c0392b]" : ""}`}
                                                    value={lead.phone}
                                                    onChange={(e) => setLeadField("phone", e.target.value)}
                                                    placeholder="+91 98000 00000"
                                                />
                                                {errors.phone && (
                                                    <span className="font-albert text-[0.68rem] font-medium text-[#c0392b]">
                                                        Please enter a valid phone number
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className={labelCls}>Email Address</label>
                                                <input
                                                    type="email"
                                                    className={inputCls}
                                                    value={lead.email}
                                                    onChange={(e) => setLeadField("email", e.target.value)}
                                                    placeholder="you@company.com"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2 md:col-span-2">
                                                <label className={labelCls}>
                                                    AC Brand / Make{" "}
                                                    <span className="font-light normal-case tracking-normal">
                                                        (optional — helps our team prepare the right recommendation)
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className={inputCls}
                                                    value={lead.brand}
                                                    onChange={(e) => setLeadField("brand", e.target.value)}
                                                    placeholder="e.g. Daikin, Voltas, Mitsubishi, Blue Star"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2 md:col-span-2">
                                                <label className={labelCls}>Project Timeline</label>
                                                <select
                                                    className={inputCls}
                                                    value={lead.timeline}
                                                    onChange={(e) => setLeadField("timeline", e.target.value)}
                                                >
                                                    <option value="">Select timeline</option>
                                                    <option>Immediate — ordering within 2 weeks</option>
                                                    <option>Short term — 1–3 months</option>
                                                    <option>Medium term — 3–6 months</option>
                                                    <option>Planning stage — 6+ months</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mt-8 flex flex-wrap items-center gap-3">
                                            <button
                                                onClick={submitLead}
                                                disabled={submitting}
                                                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#b55233] to-[#C68345] px-7 py-[14px] font-albert text-[0.78rem] font-semibold tracking-[0.06em] text-white shadow-[0_2px_16px_rgba(181,82,51,0.28)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                {submitting ? "Sending…" : "Unlock Full Report →"}
                                            </button>
                                            <button className={btnSecondary} onClick={() => goToPanel(2)}>
                                                ← Edit Details
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <ResultCard full={true} result={result} />
                                    <div className="mt-6 flex flex-wrap items-center gap-3">
                                        <a
                                            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-[22px] py-[13px] font-albert text-[0.76rem] font-semibold tracking-[0.04em] text-white transition-opacity hover:opacity-90"
                                            href={whatsappHref}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <FaWhatsapp size={18} /> Send to WhatsApp
                                        </a>
                                        <button
                                            className="inline-flex items-center gap-2 rounded-full bg-[#19234D] px-[22px] py-[13px] font-albert text-[0.76rem] font-medium tracking-[0.04em] text-white transition-colors hover:bg-[#0e1830]"
                                            onClick={generatePDF}
                                        >
                                            ↓ Download PDF
                                        </button>
                                        <button className={btnSecondary} onClick={resetTool}>
                                            New Estimate
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CopperEstimator;
