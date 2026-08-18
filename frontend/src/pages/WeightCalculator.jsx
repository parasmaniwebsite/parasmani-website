import { useMemo, useState, useEffect } from "react";
import { Trash2, Check } from "lucide-react";
import heroMobileImg from "../assets/tools/weightCalHero.png";
import heroImg from '../assets/tools/weightCalHero.jpeg'
import pdfLogo from "../assets/products/sct/availableBrandNew1.png"; // Imported logo asset
import { FaWhatsapp } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { SWG_TO_MM } from "./utils/unitConversion";

// ─── Global button styles injected once ──────────────────────────────────────
const BTN_STYLES = `
  @keyframes ripple {
    to { transform: scale(4); opacity: 0; }
  }
  @keyframes ctw-spin {
    to { transform: rotate(360deg); }
  }
  .ctw-btn {
    position: relative;
    overflow: hidden;
    transition: transform 0.12s ease, box-shadow 0.12s ease, opacity 0.12s ease;
    user-select: none;
  }
  .ctw-btn:not(:disabled):active {
    transform: scale(0.96);
  }
  .ctw-btn:not(:disabled):hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
  .ctw-ripple {
    position: absolute;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin-top: -30px;
    margin-left: -30px;
    background: rgba(255,255,255,0.35);
    pointer-events: none;
    animation: ripple 0.55s ease-out forwards;
  }
  .ctw-btn-dark .ctw-ripple { background: rgba(27,37,93,0.18); }
`;

function injectStyles() {
    if (document.getElementById("ctw-btn-styles")) return;
    const s = document.createElement("style");
    s.id = "ctw-btn-styles";
    s.textContent = BTN_STYLES;
    document.head.appendChild(s);
}

// ─── Animated button with ripple + optional flash feedback ───────────────────
function PressButton({
    onClick,
    disabled,
    children,
    className = "",
    flashLabel,
    style = {},
    dark = true,
}) {
    const [flashing, setFlashing] = useState(false);

    useEffect(() => {
        injectStyles();
    }, []);

    const handleClick = (e) => {
        if (disabled) return;

        const btn = e.currentTarget;
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.className = "ctw-ripple";
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
        btn.appendChild(ripple);
        ripple.addEventListener("animationend", () => ripple.remove());

        if (flashLabel) {
            setFlashing(true);
            setTimeout(() => setFlashing(false), 1200);
        }

        onClick && onClick(e);
    };

    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className={`ctw-btn ${dark ? "" : "ctw-btn-dark"} ${className}`}
            style={{ fontFamily: "var(--font-albert)", ...style }}
        >
            {flashing && flashLabel ? flashLabel : children}
        </button>
    );
}

// ─── Unit conversion helpers ─────────────────────────────────────────────────
const FT_TO_M = 0.3048; // exact
const inToMm = (v) => v * 25.4;
const mmToIn = (v) => v / 25.4;
const mToFt = (v) => v / FT_TO_M;
const ftToM = (v) => v * FT_TO_M;

const SWG_MM = SWG_TO_MM;

// Weight per metre, per the Parasmani reference sheet:
//   kg/m = π × 1000 × t × (OD − t) × 0.00000894
// The 0.00000894 term carries copper's 8.94 g/cm³ density. The result is rounded
// *up* to 3 decimals before any further use, so quoted weights are never short.
const PI = 3.1416;
const COPPER_DENSITY_FACTOR = 0.00000894;

function roundUp3(n) {
    return Math.ceil(n * 1000) / 1000;
}

function calcWeightPerMeter(od_mm, wall_mm) {
    if (od_mm <= 0 || wall_mm <= 0 || wall_mm * 2 >= od_mm) return 0;
    return roundUp3(PI * 1000 * wall_mm * (od_mm - wall_mm) * COPPER_DENSITY_FACTOR);
}

function fmt(n, decimals = 3) {
    return Number(n).toFixed(decimals);
}

// Weights are always presented rounded up to 3 dp, matching the reference tool.
function fmtUp(n) {
    return roundUp3(Number(n) || 0).toFixed(3);
}

function parseSafe(v) {
    const n = parseFloat(v);
    return isNaN(n) ? 0 : n;
}

// Inch diameters are quoted as fractions in the trade — accept "1/2", "3/8",
// "1-3/8" and "1 3/8" alongside plain decimals.
function parseDimension(str) {
    const s = String(str ?? "").trim();
    if (!s) return 0;
    const mixed = s.match(/^(\d+(?:\.\d+)?)\s*[-\s]\s*(\d+)\s*\/\s*(\d+)$/);
    if (mixed) return parseFloat(mixed[1]) + parseInt(mixed[2], 10) / parseInt(mixed[3], 10);
    const frac = s.match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+)$/);
    if (frac) return parseFloat(frac[1]) / parseInt(frac[2], 10);
    return parseSafe(s);
}

function UnitToggle({ options, value, onChange }) {
    return (
        <div style={{ display: "flex", background: "#f1f5f9", borderRadius: 8, border: "1px solid #cbd5e1" }}>
            {options.map((opt) => (
                <button
                    key={opt}
                    onClick={() => onChange(opt)}
                    style={{
                        padding: "4px 12px",
                        fontSize: 13,
                        borderRadius: 6,
                        background: value === opt ? "#1b255d" : "transparent",
                        color: value === opt ? "#ffffff" : "#18234D",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        fontFamily: "var(--font-albert)",
                    }}
                >
                    {opt}
                </button>
            ))}
        </div>
    );
}

// ─── Flexible Metrics Display Card Component ─────────────────────────────────
function ResultCard({ label, value, unit, accent }) {
    return (
        <div
            style={{
                background: accent ? "#1b255d" : "#f8fafc",
                border: accent ? "none" : "1px solid #e2e8f0",
                borderRadius: 12,
                padding: "16px 20px",
                flex: "1 1 160px",
                boxShadow: accent ? "0 4px 14px rgba(27, 37, 93, 0.15)" : "none",
            }}
        >
            <p style={{ fontFamily: "var(--font-albert)", fontSize: 11, letterSpacing: "0.05em", fontWeight: 700, color: accent ? "#94a3b8" : "#64748b", textTransform: "uppercase", margin: "0 0 6px 0" }}>
                {label}
            </p>
            <h3 style={{ fontFamily: "var(--font-albert)", fontSize: 24, fontWeight: 700, color: accent ? "#ffffff" : "#0f172a", margin: 0, display: "flex", alignItems: "baseline", gap: 4 }}>
                {value}
                <span style={{ fontFamily: "var(--font-albert)", fontSize: 13, fontWeight: 500, color: accent ? "#cbd5e1" : "#64748b" }}>
                    {unit}
                </span>
            </h3>
        </div>
    );
}

// ─── Blueprint Cross Section Render Function ─────────────────────────────────
function TubeSection({ od_mm, wall_mm }) {
    const MAX_SIZE = 200;
    const MIN_SIZE = 10;
    const outerPx = Math.min(MAX_SIZE, Math.max(MIN_SIZE, od_mm * 3.5));
    const id_mm = Math.max(0, od_mm - wall_mm * 2);
    const innerPx = Math.max(12, (id_mm / od_mm) * outerPx);

    const svgSize = MAX_SIZE + 40;
    const cx = svgSize / 2;
    const cy = svgSize / 2;
    const outerR = outerPx / 2;
    const innerR = innerPx / 2;

    return (
        <svg
            width="100%"
            style={{ maxWidth: svgSize, height: "auto", display: 'block', margin: '0 auto' }}
            viewBox={`0 0 ${svgSize} ${svgSize + 36}`}
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_12px_24px_rgba(61,26,8,0.35)]"
        >
            <defs>
                <radialGradient id="tube-copper-grad" cx="35%" cy="35%" r="75%">
                    <stop offset="0%" stopColor="#f2a07a" />
                    <stop offset="35%" stopColor="#eb8048" />
                    <stop offset="70%" stopColor="#b55233" />
                    <stop offset="100%" stopColor="#3d1a08" />
                </radialGradient>
                <radialGradient id="tube-bore-grad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0c1230" />
                    <stop offset="100%" stopColor="#000510" />
                </radialGradient>
            </defs>
            <circle cx={cx} cy={cy} r={outerR} fill="url(#tube-copper-grad)" stroke="rgba(0,0,0,0.4)" strokeWidth="0.6" className="transition-all duration-150 ease-out" />
            <circle cx={cx} cy={cy} r={innerR} fill="url(#tube-bore-grad)" stroke="rgba(0,0,0,0.3)" strokeWidth="0.4" className="transition-all duration-150 ease-out" />
            <line x1={cx - outerR} y1={cy} x2={cx + outerR} y2={cy} stroke="rgba(0,0,0,0.15)" strokeWidth="0.6" strokeDasharray="2,2" className="transition-all duration-150 ease-out" />
            <line x1={cx + innerR} y1={cy} x2={cx + outerR} y2={cy} stroke="#19234D" strokeWidth="1.5" className="transition-all duration-150 ease-out" />
            <circle cx={cx + innerR} cy={cy} r="1.8" fill="#19234D" className="transition-all duration-150 ease-out" />
            <circle cx={cx + outerR} cy={cy} r="1.8" fill="#19234D" className="transition-all duration-150 ease-out" />
        </svg>
    );
}

// ─── High Compatibility Inline Iframe Document Export Function ───────────────
function exportPDF(projectName, jobList, grandTotal) {
    const tableRows = jobList
        .map((item, index) => {
            const displayDesc = item.description || `OD ${fmt(item.od_mm, 2)} mm · t ${fmt(item.wall_mm, 2)} mm`;
            const weightPerPiece = item.totalWeight / item.pieces;
            return `
      <tr style="background: #ffffff;">
        <td style="padding: 10px 8px; font-size: 12px; font-weight: 500; color: #18234D; text-align: center; border: 1px solid #C4B69E;">${index + 1}</td>
        <td style="padding: 10px 8px; font-size: 12px; font-weight: 700; color: #18234D; text-align: left; border: 1px solid #C4B69E;">${displayDesc}</td>
        <td style="padding: 10px 8px; font-size: 12px; color: #18234D; text-align: center; border: 1px solid #C4B69E;">${fmt(item.od_mm, 2)}</td>
        <td style="padding: 10px 8px; font-size: 12px; color: #18234D; text-align: center; border: 1px solid #C4B69E;">${fmt(item.wall_mm, 2)}</td>
        <td style="padding: 10px 8px; font-size: 12px; color: #18234D; text-align: center; border: 1px solid #C4B69E;">${fmt(item.length_m, 2)} m</td>
        <td style="padding: 10px 8px; font-size: 12px; color: #18234D; text-align: center; border: 1px solid #C4B69E;">${item.pieces}</td>
        <td style="padding: 10px 8px; font-size: 12px; color: #18234D; text-align: center; border: 1px solid #C4B69E;">${fmtUp(weightPerPiece)} kg</td>
        <td style="padding: 10px 8px; font-size: 12px; font-weight: 700; color: #18234D; text-align: right; border: 1px solid #C4B69E; padding-right: 12px;">${fmtUp(item.totalWeight)} kg</td>
      </tr>`;
        }).join("");

    const formattedDate = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

    const printHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>@import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@300;400;500;700&display=swap'); @page { size: A4 portrait; margin: 0; } body { margin: 0; padding: 12mm 10mm; box-sizing: border-box; font-family: 'Albert Sans', sans-serif; color: #18234D; background: #ffffff; -webkit-print-color-adjust: exact; } .layout-wrapper { width: 100%; position: relative; } .masthead { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 8px; padding-top: 10px; } .brand-logo { display: flex; flex-direction: column; align-items: center; } .brand-logo img { height: 60px; width: auto; object-fit: contain; } .report-header { text-align: right; } .main-title { font-size: 24px; font-weight: 700; color: #18234D; letter-spacing: 0.5px; margin: 0; text-transform: uppercase; font-family: 'Albert Sans', sans-serif; } .project-name { font-size: 15px; font-weight: 400; color: #18234D; margin: 4px 0 0 0; text-transform: lowercase; } .doc-date { font-size: 13px; color: #18234D; margin: 2px 0 0 0; } .accent-bar { height: 3px; background-color: #C33B26; margin: 10px 0 20px 0; border: none; } .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; } .meta-table th { text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #8F8071; letter-spacing: 0.5px; padding: 0 0 4px 0; } .meta-table td { font-size: 15px; font-weight: 700; color: #18234D; padding: 0 0 10px 0; } .ledger-grid { width: 100%; border-collapse: collapse; margin-bottom: 24px; border: 1.5px solid #C4B69E; } .ledger-grid th { background-color: #FFFFFF; border: 1px solid #C4B69E; color: #8F8071; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 10px 8px; text-align: center; } .ledger-grid th.col-desc { text-align: left; } .grand-total-section { border: 2px solid #18234D; border-radius: 8px; background-color: #ffffff; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center; margin-top: 20px; } .total-label { font-size: 16px; font-weight: 500; color: #18234D; } .total-amount { font-size: 22px; font-weight: 700; color: #18234D; } .footer-line { margin-top: 30px; border-top: 1.5px solid #C4B69E; padding-top: 12px; display: flex; justify-content: space-between; font-size: 11px; color: #8F8071; }</style></head><body><div class="layout-wrapper"><div class="masthead"><div class="brand-logo"><img src="${pdfLogo}" alt="Parasmani Logo" /></div><div class="report-header"><h1 class="main-title">Weight Calculation Report</h1><p class="project-name">${projectName || "weight pipe"}</p><p class="doc-date">Date: ${formattedDate}</p></div></div><hr class="accent-bar" /><table class="meta-table"><thead><tr><th style="width: 25%;">Project</th><th style="width: 25%;">Date</th><th style="width: 15%;">Items</th><th>Prepared By</th></tr></thead><tbody><tr><td>${projectName || "weight pipe"}</td><td>${formattedDate}</td><td>${jobList.length}</td><td>Parasmani Copper Tubes</td></tr></tbody></table><table class="ledger-grid"><thead><tr><th style="width: 5%;">#</th><th class="col-desc" style="width: 30%;">Description</th><th style="width: 11%;">OD (MM)</th><th style="width: 11%;">WALL (MM)</th><th style="width: 12%;">LENGTH / PC</th><th style="width: 8%;">QTY</th><th style="width: 11%;">WT / PC (KG)</th><th style="width: 12%; text-align: right; padding-right: 12px;">TOTAL WT (KG)</th></tr></thead><tbody>${tableRows}</tbody></table><div class="grand-total-section"><div class="total-label">Grand Total Weight</div><div class="total-amount">${fmtUp(grandTotal)} kg</div></div><div class="footer-line"><div>Parasmani Copper Tubes &middot; Weight Calculation Report</div><div style="font-style: italic;">tubes you can rely on</div></div></div></body></html>`;

    // Create a hidden frame to run the print process without page direction
    let iframe = document.getElementById("pdf-print-iframe");
    if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.id = "pdf-print-iframe";
        iframe.style.position = "fixed";
        iframe.style.right = "0";
        iframe.style.bottom = "0";
        iframe.style.width = "0";
        iframe.style.height = "0";
        iframe.style.border = "none";
        document.body.appendChild(iframe);
    }

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(printHtml);
    doc.close();

    // Handshake delay to handle rendering safely inside the context framework
    setTimeout(() => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
    }, 400);
}

function shareWhatsApp(projectName, jobList, grandTotal) {
    const lines = jobList.map((item, i) => `${i + 1}. ${item.description || "Copper Tube"} | OD:${fmt(item.od_mm, 2)}mm Wall:${fmt(item.wall_mm, 2)}mm | ${fmt(item.length_m, 2)}m × ${item.pieces}pc = ${fmtUp(item.totalWeight)} kg`);
    const text = `*Copper Tube Weight Report*\nProject: ${projectName || "—"}\n\n${lines.join("\n")}\n\n*Grand Total: ${fmtUp(grandTotal)} kg*\n\n_Parasmani Tubes Copper Pvt. Ltd._`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
}

export default function CopperTubeWeightCalculator() {
    const [odDisplay, setOdDisplay] = useState("15.88");
    const [odUnit, setOdUnit] = useState("mm");
    const [wallDisplay, setWallDisplay] = useState("1.0");
    const [wallUnit, setWallUnit] = useState("mm");
    const [swgValue, setSwgValue] = useState("18");
    const [lengthDisplay, setLengthDisplay] = useState("3");
    const [lengthUnit, setLengthUnit] = useState("m");
    const [pieces, setPieces] = useState("1");
    const [description, setDescription] = useState("");
    const [projectName, setProjectName] = useState("");
    const [jobList, setJobList] = useState([]);

    const od_mm = useMemo(() => { const v = parseDimension(odDisplay); return odUnit === "in" ? inToMm(v) : v; }, [odDisplay, odUnit]);
    const wall_mm = useMemo(() => { if (wallUnit === "SWG") { return SWG_MM[parseInt(swgValue, 10)] ?? 0; } const v = parseSafe(wallDisplay); return wallUnit === "in" ? inToMm(v) : v; }, [wallDisplay, wallUnit, swgValue]);
    const length_m = useMemo(() => { const v = parseSafe(lengthDisplay); return lengthUnit === "ft" ? ftToM(v) : v; }, [lengthDisplay, lengthUnit]);
    const piecesNum = useMemo(() => Math.max(1, parseInt(pieces, 10) || 1), [pieces]);

    const id_mm = useMemo(() => Math.max(0, od_mm - wall_mm * 2), [od_mm, wall_mm]);
    const weightPerMeter = useMemo(() => calcWeightPerMeter(od_mm, wall_mm), [od_mm, wall_mm]);
    const totalWeight = useMemo(() => weightPerMeter * length_m * piecesNum, [weightPerMeter, length_m, piecesNum]);
    const grandTotal = useMemo(() => jobList.reduce((acc, item) => acc + Number(item.totalWeight), 0), [jobList]);

    const isValid = useMemo(() => od_mm > 0 && wall_mm > 0 && wall_mm * 2 < od_mm && length_m > 0 && piecesNum >= 1, [od_mm, wall_mm, length_m, piecesNum]);
    const validationMsg = useMemo(() => {
        if (od_mm <= 0) return "Outer diameter must be greater than zero.";
        if (wall_mm <= 0) return "Wall thickness must be greater than zero.";
        if (wall_mm * 2 >= od_mm) return `Wall thickness (${fmt(wall_mm, 3)} mm) is too large — must be less than OD/2 (${fmt(od_mm / 2, 3)} mm).`;
        if (length_m <= 0) return "Length must be greater than zero.";
        return null;
    }, [od_mm, wall_mm, length_m]);

    const handleOdUnitChange = (newUnit) => {
        const cur = parseDimension(odDisplay);
        if (odUnit === "mm" && newUnit === "in") setOdDisplay(fmt(mmToIn(cur), 4));
        if (odUnit === "in" && newUnit === "mm") setOdDisplay(fmt(inToMm(cur), 3));
        setOdUnit(newUnit);
    };

    const handleWallUnitChange = (newUnit) => {
        if (newUnit === "SWG") { setWallUnit("SWG"); return; }
        const cur = parseSafe(wallDisplay);
        if (wallUnit === "mm" && newUnit === "in") setWallDisplay(fmt(mmToIn(cur), 4));
        if (wallUnit === "in" && newUnit === "mm") setWallDisplay(fmt(inToMm(cur), 3));
        if (wallUnit === "SWG") setWallDisplay(fmt(SWG_MM[parseInt(swgValue, 10)] ?? 1, 3));
        setWallUnit(newUnit);
    };

    const handleLengthUnitChange = (newUnit) => {
        const cur = parseSafe(lengthDisplay);
        if (lengthUnit === "m" && newUnit === "ft") setLengthDisplay(fmt(mToFt(cur), 3));
        if (lengthUnit === "ft" && newUnit === "m") setLengthDisplay(fmt(ftToM(cur), 3));
        setLengthUnit(newUnit);
    };

    const LENGTH_PRESETS = lengthUnit === "m"
        ? [{ label: "3m", val: "3" }, { label: "6m", val: "6" }, { label: "15.24m", val: "15.24" }, { label: "50m", val: "50" }]
        : [{ label: "10ft", val: "10" }, { label: "20ft", val: "20" }, { label: "50ft", val: "50" }, { label: "100ft", val: "100" }];

    const addToJobList = () => {
        if (!isValid) return;
        setJobList((prev) => [...prev, { id: Date.now(), od_mm, wall_mm, length_m, pieces: piecesNum, description, totalWeight }]);
        setDescription("");
    };

    const removeItem = (id) => setJobList((prev) => prev.filter((x) => x.id !== id));
    const resetForm = () => { setOdDisplay("15.88"); setOdUnit("mm"); setWallDisplay("1.0"); setWallUnit("mm"); setLengthDisplay("3"); setLengthUnit("m"); setPieces("1"); setDescription(""); };

    const cardLayout = { background: "#ffffff", borderRadius: 12, border: "0.9px solid #5C5C5C", overflow: "hidden", marginTop: 24 };
    const cardHeaderBar = { background: "#E8E9ED", padding: "12px 20px", display: "flex", alignItems: "center", justifycontent: "center" };
    const navigate = useNavigate();

    return (
        <div style={{ background: "#ffffff", minHeight: "100vh", paddingBottom: 60, fontFamily: "var(--font-albert)" }}>
            {/* ── HERO BANNER — mobile (stacked, image on top) ── */}
            <div className="md:hidden">
                <div className="relative w-full h-[190px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent z-10" />
                    <img src={heroMobileImg} alt="" aria-hidden="true" className="w-full h-full object-cover  object-right" />
                </div>
                <div className="px-5 pt-5 pb-8 text-center">

                    <span className="eyebrow-1 block font-albert uppercase tracking-[0.15em] text-[#C43A26]  mb-2">
                        Parasmani Utility Tools
                    </span>
                    <h1 className="h1 text-[#18234D] tracking-tight mb-4">
                        Copper Tube Weight Calculator.
                    </h1>
                    <p className="p1 text-[#19234D] font-light leading-5 max-w-[390px] mx-auto opacity-95 font-albert">
                        Calculate weight per metre, per piece, and total job weight — with OD, wall thickness, length, and quantity inputs.
                    </p>
                </div>
            </div>

            {/* ── HERO BANNER — desktop ── */}
            <section className="relative w-full hidden md:flex md:h-[320px] items-center overflow-hidden" style={{ backgroundImage: `url('${heroImg}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 relative z-10">
                    <div className="max-w-xl text-left">

                        <span className="eyebrow-1 block font-albert uppercase tracking-[0.15em] text-[#C43A26]  mb-2">
                            Parasmani Utility Tools
                        </span>
                        <h1 className="h1 text-[#18234D] tracking-tight mb-4">

                            Copper Tube <br /> Weight Calculator.
                        </h1>
                        <p className="p1 text-[#19234D] font-light leading-5 max-w-[340px] md:max-w-[480px] opacity-95 font-albert">
                            Calculate weight per metre, per piece, and total job weight — with OD, wall thickness, length, and quantity inputs.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── GRID CONTROLLER MAIN CONTAINER ── */}
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">

                {/* ── CARD SECTION 1: SPECIFICATION ── */}
                <div style={cardLayout}>
                    <div style={cardHeaderBar}>
                        <h2 className="h2" style={{ color: "#272727", margin: 0 }}>
                            Tube Specification
                        </h2>
                    </div>

                    <div className="p-4 sm:p-6">
                        <div style={{ padding: "16px 0", display: "flex", flexDirection: "column", alignItems: "center", background: "#ffffff", marginBottom: 24 }}>
                            <p style={{ color: "#646C88", fontWeight: 300, letterSpacing: "0.06em", marginBottom: 12, fontSize: 13, textTransform: "uppercase" }}>
                                Cross-section — OD & wall (illustrative)
                            </p>
                            <div className="w-full flex justify-center px-4">
                                <TubeSection od_mm={od_mm > 0 ? od_mm : 50} wall_mm={wall_mm > 0 && wall_mm * 2 < od_mm ? wall_mm : 5} />
                            </div>
                            <div className="flex flex-wrap justify-center gap-2 mt-4">
                                {[{ label: "OD", val: od_mm, dec: 2 }, { label: "WALL", val: wall_mm, dec: 3 }, { label: "ID", val: id_mm, dec: 2 }].map((chip) => (
                                    <span key={chip.label} style={{ fontSize: 11, color: "#475569", background: "#f8fafc", border: "1px solid #e2e8f0", padding: "4px 10px", borderRadius: 12 }}>
                                        {chip.label}: {fmt(chip.val, chip.dec)} mm
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                            <div>
                                <div className="flex justify-between items-center mb-1.5">
                                    <label style={{ fontSize: 13, fontWeight: 400, color: "#272727", textTransform: "uppercase" }}>Outer Diameter (OD)</label>
                                    <UnitToggle options={["mm", "in"]} value={odUnit} onChange={handleOdUnitChange} />
                                </div>
                                <input
                                    type={odUnit === "in" ? "text" : "number"}
                                    inputMode="decimal"
                                    min="0"
                                    value={odDisplay}
                                    onChange={(e) => setOdDisplay(e.target.value)}
                                    placeholder={odUnit === "in" ? "e.g. 1/2  or  1-3/8" : "e.g. 15.88"}
                                    className="w-full h-[38px] border border-slate-300 rounded-md px-3 text-sm focus:border-[#1b255d] outline-none text-slate-900"
                                />
                                {odUnit === "in" && (
                                    <p style={{ fontSize: 11, color: "#64748b", margin: "4px 0 0 0" }}>
                                        Fractions: 1/2 · 3/4 · 1-1/8 · 1-3/8 — or plain decimal
                                    </p>
                                )}
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-1.5">
                                    <label style={{ fontSize: 13, fontWeight: 400, color: "#272727", textTransform: "uppercase" }}>Wall Thickness (T)</label>
                                    <UnitToggle options={["mm", "in", "SWG"]} value={wallUnit} onChange={handleWallUnitChange} />
                                </div>
                                {wallUnit === "SWG" ? (
                                    <select
                                        value={swgValue} onChange={(e) => setSwgValue(e.target.value)}
                                        className="w-full h-[38px] border border-slate-300 rounded-md px-2 text-sm outline-none text-slate-900 bg-white"
                                    >
                                        {Object.keys(SWG_MM).map((g) => (
                                            <option key={g} value={g}>SWG {g} ({SWG_MM[g]} mm)</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type="number" min="0" value={wallDisplay} onChange={(e) => setWallDisplay(e.target.value)} placeholder="e.g. 1.00"
                                        className="w-full h-[38px] border border-slate-300 rounded-md px-3 text-sm focus:border-[#1b255d] outline-none text-slate-900"
                                    />
                                )}
                            </div>
                        </div>

                        {validationMsg && (
                            <div style={{ marginBottom: 20, padding: "10px 14px", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 6, color: "#991b1b", fontSize: 13, fontWeight: 500 }}>
                                ⚠ {validationMsg}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                            <div>
                                <div className="flex justify-between items-center mb-1.5">
                                    <label style={{ fontSize: 13, fontWeight: 400, color: "#272727", textTransform: "uppercase" }}>Length Per Piece</label>
                                    <UnitToggle options={["m", "ft"]} value={lengthUnit} onChange={handleLengthUnitChange} />
                                </div>
                                <input
                                    type="number" min="0" value={lengthDisplay} onChange={(e) => setLengthDisplay(e.target.value)}
                                    className="w-full h-[38px] border border-slate-300 rounded-md px-3 text-sm focus:border-[#1b255d] outline-none text-slate-900"
                                />
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                    {LENGTH_PRESETS.map((p) => (
                                        <button
                                            key={p.label} onClick={() => setLengthDisplay(p.val)}
                                            style={{ padding: "3px 10px", borderRadius: "24px", border: "1px solid", borderColor: lengthDisplay === p.val ? "#1b255d" : "#cbd5e1", background: lengthDisplay === p.val ? "#E8E9ED" : "#ffffff", color: "#373737", fontWeight: 500, fontSize: 11, cursor: "pointer", fontFamily: "var(--font-albert)" }}
                                        >
                                            {p.label}
                                        </button>
                                    ))}
                                    <button onClick={() => setLengthDisplay("")} style={{ fontFamily: "var(--font-albert)", padding: "3px 10px", borderRadius: 4, border: "1px solid #cbd5e1", background: "#ffffff", color: "#475569", fontSize: 11, cursor: "pointer" }}>Custom</button>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 400, color: "#272727", textTransform: "uppercase", marginBottom: 6 }}>Number of Pieces</label>
                                <input
                                    type="number" min="1" step="1" value={pieces} onChange={(e) => setPieces(e.target.value)}
                                    className="w-full h-[38px] border border-slate-300 rounded-md px-3 text-sm focus:border-[#1b255d] outline-none text-slate-900"
                                />
                            </div>
                        </div>

                        <div className="mt-5 mb-6">
                            <label style={{ display: "block", fontSize: 13, fontWeight: 400, color: "#272727", textTransform: "uppercase", marginBottom: 6 }}>
                                Description <span style={{ fontWeight: 400, textTransform: "none", color: "#64748b" }}>(optional — used in job list)</span>
                            </label>
                            <input
                                type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Suction line — 3rd floor AHU"
                                className="w-full h-[38px] border border-slate-300 rounded-md px-3 text-sm focus:border-[#1b255d] outline-none text-slate-900"
                            />
                        </div>

                        <div className="flex flex-wrap gap-3 mb-6">
                            <ResultCard label="Weight / Meter" value={fmt(weightPerMeter, 3)} unit="kg/m" />
                            <ResultCard label="Inner Diameter" value={fmt(id_mm, 2)} unit="mm" />
                            <ResultCard label="Weight / Piece" value={fmtUp(weightPerMeter * length_m)} unit="kg" />
                            <ResultCard label="Total Weight" value={fmtUp(totalWeight)} unit="kg" accent />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <PressButton onClick={resetForm} dark={false} style={{ height: 40, borderRadius: "24px", border: "1px solid #162046", background: "#ffffff", color: "#162046", fontWeight: 500, fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                Reset
                            </PressButton>
                            <PressButton
                                onClick={addToJobList} disabled={!isValid}
                                flashLabel={<span style={{ display: "flex", alignItems: "center", gap: 6 }}><Check size={18} /> Added!</span>}
                                style={{ height: 40, borderRadius: "24px", border: "none", background: "#162046", color: "#ffffff", fontSize: "12px", fontWeight: 400, cursor: isValid ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                            >
                                Calculate Weight
                            </PressButton>
                        </div>
                    </div>
                </div>

                {/* ── CARD SECTION 2: JOB MANAGEMENT & LEDGER EXPORT ── */}
                <div style={cardLayout}>
                    <div style={cardHeaderBar}>
                        <h2 className="h2" style={{ color: "#1e293b", margin: 0 }}>
                            Job List & Export
                        </h2>
                    </div>

                    <div className="p-4 sm:p-6">
                        <div className="mb-5">
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#334155", textTransform: "uppercase", marginBottom: 6 }}>Project / Reference Name</label>
                            <input
                                type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="e.g. Hotel HVACR Installation — Block B"
                                className="w-full h-[38px] border border-slate-300 rounded-md px-3 text-sm focus:border-[#1b255d] outline-none text-slate-900"
                            />
                        </div>

                        <div className="mt-3" style={{ minHeight: 60 }}>
                            {jobList.length === 0 ? (
                                <p style={{ textAlign: "center", color: "#64748b", fontSize: 12, padding: "24px 0", textTransform: "uppercase", letterSpacing: "0.02em", margin: 0 }}>
                                    No items yet — calculate a weight and click "Calculate Weight"
                                </p>
                            ) : (
                                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                                    {jobList.map((item) => (
                                        <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-slate-200 rounded-md p-3 bg-slate-50">
                                            <div className="text-xs sm:text-sm text-slate-700">
                                                <span className="font-semibold">{item.description || "Copper Tube"}</span>
                                                <span className="text-slate-500 block sm:inline sm:ml-1.5">
                                                    ({fmt(item.od_mm, 1)}mm OD × {fmt(item.wall_mm, 2)}mm Wall, {fmt(item.length_m, 1)}m × {item.pieces}pcs)
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                                                <span style={{ fontFamily: "var(--font-obviously)", fontWeight: 700, color: "#0f172a", fontSize: 14 }}>
                                                    {fmtUp(item.totalWeight)} kg
                                                </span>
                                                <button onClick={() => removeItem(item.id)} className="bg-transparent border-none text-red-500 cursor-pointer p-0.5 flex items-center hover:text-red-700 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div style={{ background: "#f1f5f9", borderRadius: 6, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color: "#334155", textTransform: "uppercase" }}>Grand Total Weight</span>
                                <span style={{ fontFamily: "var(--font-obviously)", fontSize: 16, fontWeight: 700, color: "#1b255d" }}>{fmtUp(grandTotal)} kg</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                            <PressButton
                                onClick={() => setJobList([])}
                                dark={false}
                                disabled={jobList.length === 0}
                                style={{
                                    height: 40,
                                    borderRadius: "24px",
                                    border: "1px solid #162046",
                                    background: "#ffffff",
                                    color: "#162046",
                                    fontWeight: 500,
                                    fontSize: "12px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                Clear All
                            </PressButton>
                            <PressButton
                                onClick={() => exportPDF(projectName, jobList, grandTotal)}
                                disabled={jobList.length === 0}
                                style={{
                                    height: 40,
                                    borderRadius: "24px",
                                    border: "none",
                                    background: "#162046",
                                    color: "#ffffff",
                                    fontSize: "12px",
                                    fontWeight: 400,
                                    cursor: jobList.length > 0 ? "pointer" : "not-allowed",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                Export as PDF
                            </PressButton>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                            <button onClick={() => navigate("/contact")} className="h-[40px] rounded-[24px] border border-[#162046] bg-white text-[#162046] font-medium text-[12px] cursor-pointer flex items-center justify-center gap-1.5 transition-shadow hover:shadow-sm">
                                <FiMessageSquare size={20} /> Request Quote
                            </button>
                            <button onClick={() => shareWhatsApp(projectName, jobList, grandTotal)} className="h-[40px] rounded-[24px] border border-[#162046] bg-white text-[#162046] font-medium text-[12px] cursor-pointer flex items-center justify-center gap-1.5 transition-shadow hover:shadow-sm">
                                <FaWhatsapp size={20} /> Share with your Team
                            </button>
                        </div>
                    </div>
                </div>

                <p className="text-xs sm:text-[13px] text-[#646C88] text-center mt-8 leading-relaxed px-2 sm:px-12 font-normal">
                    Disclaimer: The Copper Tube Weight Calculator is provided by Parasmani Tubes Copper Pvt. Ltd. for reference only. Results are indicative, and actual weight may vary due to manufacturing tolerances. Calculations should be independently verified before use.
                </p>
            </div>
        </div>
    );
}
