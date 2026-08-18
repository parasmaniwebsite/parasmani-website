import { useState, useRef, useEffect, useCallback } from "react";

import plumbingSmall from "../assets/industryMain/Component 31.png";
import medicalSmall from "../assets/industryMain/Component 5.png";
import hvacSmall from "../assets/industryMain/Component 1.png";
import industrialSmall from "../assets/industryMain/Component 4.png";
import householdSmall from "../assets/industryMain/Component 3.png";

import plumbingBig from "../assets/industryMain/Component 32.png";
import medicalBig from "../assets/industryMain/Component 33.png";
import hvacBig from "../assets/industryMain/Component 34.png";
import industrialBig from "../assets/industryMain/Component 36.png";
import householdBig from "../assets/industryMain/Component 35.png";
import { FaArrowUpLong } from "react-icons/fa6";


// ─── Data ──────────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  {
    id: 0,
    title: "Plumbing & Water Supply",
    desc: "Parasmani copper tubes for hot and cold water plumbing in residential buildings, commercial complexes, hotels, hospitals, and institutional facilities.",
    iconSmall: plumbingSmall,
    iconBig: plumbingBig,
    path: "/plumbing-water-supply",
  },
  {
    id: 1,
    title: "Medical Gas",
    desc: "Parasmani MGPS copper tubes are manufactured to BS EN 13348 — the dedicated standard for medical gas pipeline systems.",
    iconSmall: medicalSmall,
    iconBig: medicalBig,
    path: "/medical-gas",
  },
  {
    id: 2,
    title: "HVAC & Refrigeration",
    desc: "From split ACs to chiller plants — Parasmani ACR grade copper tubes, pancake coils, and wrought fittings are specified across India's most demanding HVAC&R installations.",
    iconSmall: hvacSmall,
    iconBig: hvacBig,
    path: "/hvac-refrigeration",
  },
  {
    id: 3,
    title: "Industrial & Process Applications",
    desc: "Parasmani copper tubes for cold storage, food and beverage processing, dairy, life sciences, sugar, heat exchangers, marine, and defence applications.",
    iconSmall: industrialSmall,
    iconBig: industrialBig,
    path: "/industrial-process-application",
  },
  {
    id: 4,
    title: "Household & Fuel Gas",
    desc: "Parasmani copper tubes for PNG and LPG distribution in residential buildings, hotels, commercial kitchens, and institutional gas networks. Non-combustible, non-permeable.",
    iconSmall: householdSmall,
    iconBig: householdBig,
    path: "/household-fuel-gas",
  },
];

// Arc angles: lower-left → upper-left → top-center → upper-right → lower-right
const ARC_ANGLES_DEG = [200, 233, 270, 307, 340];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function IndustryMainPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shownIndex, setShownIndex] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);
  const arenaRef = useRef(null);
  const [arenaDims, setArenaDims] = useState({ w: 0, h: 0 });

  // Bound to the same query as the mobile CSS below so the arc geometry and the
  // layout can never disagree. Deriving it from the arena's own width does not
  // work: the scrollbar shifts that by 8–15px, straddling the breakpoint.
  const NARROW_QUERY = "(max-width: 768px)";
  const [isNarrow, setIsNarrow] = useState(
    () => typeof window !== "undefined" && window.matchMedia(NARROW_QUERY).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(NARROW_QUERY);
    const onChange = (e) => setIsNarrow(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (arenaRef.current) {
        const r = arenaRef.current.getBoundingClientRect();
        setArenaDims({ w: r.width, h: r.height });
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (arenaRef.current) ro.observe(arenaRef.current);
    return () => ro.disconnect();
  }, []);

  const handleSelect = useCallback((idx) => {
    if (idx === activeIndex) return;
    setContentVisible(false);
    setTimeout(() => {
      setActiveIndex(idx);
      setShownIndex(idx);
      setContentVisible(true);
    }, 220);
  }, [activeIndex]);

  const current = INDUSTRIES[shownIndex];

  // The ellipse the icons sit on. On desktop it sweeps the full arena with the
  // copy inside it. On mobile there is not enough width for that, so the arc is
  // anchored to width and parked at the top, letting the arena grow taller for
  // long copy without dragging the icons down with it.
  const W = arenaDims.w;
  const H = arenaDims.h;
  const arc = {
    rx: W * (isNarrow ? 0.44 : 0.42),
    ry: isNarrow ? W * 0.34 : H * 0.83,
    cx: W * 0.49,
    cy: isNarrow ? W * 0.45 : H,
  };

  const iconPositions = ARC_ANGLES_DEG.map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return {
      x: arc.cx + arc.rx * Math.cos(rad),
      y: arc.cy + arc.ry * Math.sin(rad),
    };
  });

  // On mobile, draw the grey backdrop as that same ellipse so its edge runs
  // through the centre of every icon. Its rounded top is exactly the arc:
  // box corners of rx x ry starting at the ellipse's top-left extent.
  const semicircleStyle =
    isNarrow && W > 0
      ? {
          left: arc.cx - arc.rx,
          width: arc.rx * 2,
          top: arc.cy - arc.ry,
          height: Math.max(0, H - (arc.cy - arc.ry)),
          borderRadius: `${arc.rx}px ${arc.rx}px 0 0 / ${arc.ry}px ${arc.ry}px 0 0`,
          bottom: "auto",
          transform: "none",
          paddingBottom: 0,
        }
      : undefined;

  return (
    <>
      <style>{`
        .industry-section * { box-sizing: border-box; }
        .industry-section {
          width: 100%;
          min-height: 100vh;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
          user-select: none;
          padding-top: 32px;
          padding-bottom: 0;
          font-family: AlbertSans;
        }
        .ind-container {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ind-header {
          text-align: center;
          max-width: 640px;
          margin-bottom: 0;
        }
        .ind-eyebrow {
          color: #C43A26;
          display: block;
          margin-bottom: 10px;
        }
        .ind-headline-spacing {
          color: #1A1A1A;
          margin-bottom: 16px;
        }
        .ind-subhead {
          color: #454545;
          font-weight: 300;
          margin-bottom: 28px;
        }
        .ind-arena-wrap {
          width: 100%;
          max-width: 1100px;
          position: relative;
        }
        .ind-arena-inner {
          position: relative;
          width: 100%;
          padding-bottom: 51%;
        }
        .ind-semicircle-bg {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 84%;
          padding-bottom: 42%;
          height: 0;
          border-radius: 50% 50% 0 0 / 100% 100% 0 0;
          background: #F7F7F7;
          pointer-events: none;
        }
        .ind-center-content {
          position: absolute;
          bottom: 12%;
          left: 50%;
          width: 54%;
          text-align: center;
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
        .ind-center-content.visible {
          opacity: 1;
          transform: translateX(-50%) translateY(0px);
        }
        .ind-center-content.hidden {
          opacity: 0;
          transform: translateX(-50%) translateY(8px);
        }
        .ind-ititle {
          font-size: 24px;
          font-weight: 200;
          color: #272727;
          margin-bottom: 13px;
          letter-spacing: -0.01em;
          line-height: 1.2;
          font-family: AlbertSans;
        }
        .ind-idesc {
          font-size: 14px;
          color: #454545;
          line-height: 1.2;
          font-weight: 400;
          margin-bottom: 24px;
        }
        .ind-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #18234D;
          color: #ffffff;
          border: none;
          border-radius: 100px;
          padding: 13px 30px;
          font-size: 12px;
          font-weight: 450;
          cursor: pointer;
          letter-spacing: 0.01em;
          font-family: AlbertSans;
          transition: background 0.18s ease, transform 0.15s ease, box-shadow 0.15s ease;
          text-decoration: none;
        }
        .ind-cta:hover {
          background: #29346A;
          transform: scale(1.02);
          box-shadow: 0 4px 16px rgba(28,38,71,0.22);
        }
        .ind-icon-btn {
          position: absolute;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          outline: none;
          transition: background 0.25s ease, box-shadow 0.25s ease, transform 0.22s ease, width 0.25s ease, height 0.25s ease;
          overflow: hidden;
        }
        .ind-icon-btn.active {
background: linear-gradient(to bottom, #B85535, #EB8047);
          box-shadow: 0 5px 24px rgba(196, 74, 42, 0.30);
        }
        .ind-icon-btn.inactive {
          background: #CFCFCF;
          box-shadow: none;
        }
        .ind-icon-btn.inactive:hover {
          background: #EDD9C5;
          transform: translate(-50%, -50%) scale(1.08) !important;
        }
        .ind-icon-btn:focus-visible {
          outline: 2px solid #C44A2A;
          outline-offset: 3px;
        }
        .ind-icon-img {
          display: block;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }

        /* Mobile: on desktop the arena is a fixed aspect-ratio box with the copy
           absolutely positioned inside the arc. That cannot hold at narrow
           widths — a narrower column wraps the copy taller while the
           percentage-based height gets shorter, so the text overflowed upward
           into the header. Here the copy returns to normal flow below a
           width-anchored arc, letting the arena grow to fit whatever it holds. */
        @media (max-width: 768px) {
          .industry-section {
            min-height: 0;
            padding-top: 24px;
            padding-bottom: 40px;
          }
          .ind-subhead {
            margin-bottom: 30px;
          }
          /* padding-top reserves the arc band; height then comes from the copy */
          .ind-arena-inner {
            padding-bottom: 0;
            padding-top: 58%;
          }
          /* geometry comes from semicircleStyle so it tracks the icon arc */
          .ind-center-content {
            position: static;
            width: 100%;
            max-width: 320px;
            margin: 0 auto;
            padding-bottom: 34px;
          }
          .ind-center-content.visible {
            transform: translateY(0);
          }
          .ind-center-content.hidden {
            transform: translateY(8px);
          }
          .ind-ititle {
            font-size: 19px;
            margin-bottom: 10px;
          }
          .ind-idesc {
            font-size: 13px;
            line-height: 1.35;
            margin-bottom: 18px;
          }
        }
      `}</style>

      <section className="industry-section">
        <div className="ind-container">

          {/* Header */}
          <div className="ind-header">
            <span className="eyebrow-1 tracking-[0.15em] ind-eyebrow">PRODUCT USAGE</span>
            <h1 className="h1 ind-headline-spacing">One Tube. Many Industries.</h1>
            <p className="p1 ind-subhead">
              Select your industry to explore how Parasmani straight copper tubes
              are specified and applied.
            </p>
          </div>

          {/* Semicircle Arena */}
          <div className="ind-arena-wrap">
            <div className="ind-arena-inner" ref={arenaRef}>

              {/* Background semicircle shape */}
              <div className="ind-semicircle-bg" style={semicircleStyle} />

              {/* Dynamic center content */}
              <div className={`ind-center-content ${contentVisible ? "visible" : "hidden"}`}>
                <h3 className="ind-ititle">{current.title}</h3>
                <p className="ind-idesc">{current.desc}</p>
                <button
                  className="ind-cta"
                  onClick={() => (window.location.href = current.path)}
                >
                  Know More

<FaArrowUpLong className="rotate-50 stroke-1" />

                  
                </button>
              </div>

              {/* Industry icons on arc */}
              {arenaDims.w > 0 && INDUSTRIES.map((ind, idx) => {
                const isActive = idx === activeIndex;
                const SIZE = isActive ? 62 : 48;
                const pos = iconPositions[idx];
                // Active state uses the Big (white-on-transparent) icon,
                // inactive uses the Small (dark-on-transparent) icon
                const iconSrc = isActive ? ind.iconBig : ind.iconSmall;
                const imgSize = isActive ? 32 : 24;

                return (
                  <button
                    key={ind.id}
                    className={`ind-icon-btn ${isActive ? "active" : "inactive"}`}
                    style={{
                      left: pos.x,
                      top: pos.y,
                      width: SIZE,
                      height: SIZE,
                      transform: `translate(-50%, -50%)`,
                      zIndex: isActive ? 10 : 5,
                    }}
                    onClick={() => handleSelect(idx)}
                    title={ind.title}
                    aria-label={ind.title}
                    aria-pressed={isActive}
                  >
                    <img
                      src={iconSrc}
                      alt={ind.title}
                      className="ind-icon-img h-15 w-16"
                      width={imgSize}
                      height={imgSize}
                      style={{ objectFit: "contain" }}
                    
                    />
                  </button>
                );
              })}

            </div>
          </div>

        </div>
      </section>
    </>
  );
}
