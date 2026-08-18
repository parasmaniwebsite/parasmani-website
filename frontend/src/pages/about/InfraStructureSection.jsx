import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion } from "framer-motion";

// Clean static imports provided by the engineering schema
import built1 from "../../assets/Built/build1.png";
import built2 from "../../assets/Built/build2.png";
import built3 from "../../assets/Built/build3.png";
import built4 from "../../assets/Built/build4.png";
import built5 from "../../assets/Built/build5.png";
import built6 from "../../assets/Built/build6.png";
import built7 from "../../assets/Built/build7.png";
import built8 from "../../assets/Built/build8.jpg";
import built9 from "../../assets/Built/build9.png";

import machiner1 from "../../assets/about/machinery/machinary/Mask group 9.png";
import machiner2 from "../../assets/about/machinery/machinary/Mask group-1.png";
import machiner3 from "../../assets/about/machinery/machinary/Mask group-2.png";
import machiner4 from "../../assets/about/machinery/machinary/Mask group-3.png";
import machiner5 from "../../assets/about/machinery/machinary/Mask group-4.png";
import machiner6 from "../../assets/about/machinery/machinary/Mask group-5.png";
import machiner7 from "../../assets/about/machinery/machinary/Mask group-6.png";
import machiner8 from "../../assets/about/machinery/machinary/Mask group-7.png";
import machiner9 from "../../assets/about/machinery/machinary/Mask group.png";

const SPRING = { type: "spring", stiffness: 260, damping: 34, mass: 0.9 };

const FACILITY_IMAGES = [
  built1,
  built2,
  built3,
  built8,
  built4,
  built5,
  built6,
  built7,
  built9,
];

const MACHINERY_IMAGES = [
  machiner1,
  machiner2,
  machiner3,
  machiner4,
  machiner5,
  machiner6,
  machiner7,
  machiner8,
  machiner9,
];

export default function InfrastructureSection() {
  const [activeTab, setActiveTab] = useState("facility");
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  // bumped by any manual navigation purely to restart the autoplay timer
  const [nudge, setNudge] = useState(0);

  const currentImagesList =
    activeTab === "facility" ? FACILITY_IMAGES : MACHINERY_IMAGES;
  const len = currentImagesList.length;

  // The track holds three copies of the list. We keep the active slide inside
  // the middle copy and silently re-seat it there after each transition, so the
  // carousel loops in either direction without ever animating backwards across
  // the whole strip.
  const loopItems = useMemo(
    () => [...currentImagesList, ...currentImagesList, ...currentImagesList],
    [currentImagesList]
  );

  const stageRef = useRef(null);
  const scrollerRef = useRef(null);
  const [stageW, setStageW] = useState(0);
  const [pos, setPos] = useState(len);
  const posRef = useRef(len);
  // true while a scroll we started is in flight, so its events are not mistaken
  // for the user scrolling
  const isAutoScrolling = useRef(false);
  const settleTimer = useRef(null);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  useEffect(() => {
    const measure = () => {
      if (stageRef.current) setStageW(stageRef.current.getBoundingClientRect().width);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  // Card width comes off the 1440px content container, not the window, and the
  // active card is taller rather than scaled — this is the original sizing
  // (center w-[64%] h-full, sides h-[60%] inside a max-w-[1440px] row).
  const isSmall = stageW > 0 && stageW < 640;
  const containerW = Math.min(stageW, 1440);
  const cardW = containerW * (isSmall ? 0.66 : 0.64);
  const gap = isSmall ? 16 : 24;
  const step = cardW + gap;

  // The track is a native scroll container: leading/trailing spacers of half the
  // free width let any card sit dead centre, so slide p is simply scrollLeft
  // p * step.
  const sideSpacer = Math.max(0, (stageW - cardW) / 2 - gap);

  // Any user input means the next settle is the user's, not the autoplay's.
  const markUserInput = useCallback(() => {
    isAutoScrolling.current = false;
  }, []);

  // Movement is the browser's own scroll — smooth for a glide, instant for the
  // invisible loop re-seat. Nothing drives scrollLeft frame by frame, so a wheel
  // or trackpad gesture is never fighting a JS animation.
  const scrollToSlide = useCallback(
    (p, behavior) => {
      const el = scrollerRef.current;
      if (!el || !step) return;
      isAutoScrolling.current = true;
      el.scrollTo({ left: p * step, behavior });
    },
    [step]
  );

  // Switching tabs re-seats the track instantly rather than sliding through it.
  const selectTab = (tab) => {
    if (tab === activeTab) return;
    const nextLen = (tab === "facility" ? FACILITY_IMAGES : MACHINERY_IMAGES)
      .length;
    setActiveTab(tab);
    setPos(nextLen);
    posRef.current = nextLen;
    scrollToSlide(nextLen, "instant");
  };

  // Initial seating and any resize: park the active slide back in the centre.
  useEffect(() => {
    if (!stageW || !step) return;
    scrollToSlide(posRef.current, "instant");
  }, [stageW, cardW, step, scrollToSlide]);

  // Every programmatic move goes through here. It simply glides onto the next
  // card, walking off the middle copy into the one either side when it has to —
  // that is what the extra copies are for. Getting back into the middle is left
  // to onSettle: re-seating here, in the same tick as the glide, makes a
  // mandatory-snap container discard the glide and stay put.
  const go = useCallback(
    (delta) => {
      if (!len || !step || !scrollerRef.current) return;
      const next = Math.min(
        3 * len - 1,
        Math.max(0, posRef.current + delta)
      );
      if (next === posRef.current) return;
      isAutoScrolling.current = true;
      posRef.current = next;
      setPos(next);
      scrollToSlide(next, "smooth");
    },
    [len, step, scrollToSlide]
  );

  // A slide here is most of the stage wide, and one mouse notch is nowhere near
  // that — mandatory snap simply pulls it back and the wheel feels dead. So a
  // horizontal wheel (or shift+wheel) is turned into a one-card glide, still the
  // browser's own smooth scroll. Registered by hand because React's onWheel is
  // passive and cannot preventDefault.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let acc = 0;
    let lastStepAt = 0;

    const onWheel = (e) => {
      const wantsX = e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!wantsX) return; // a plain vertical wheel still scrolls the page
      e.preventDefault();

      let delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (e.deltaMode === 1) delta *= 16; // Firefox reports lines, not pixels
      else if (e.deltaMode === 2) delta *= el.clientWidth;

      const now = performance.now();
      if (now - lastStepAt > 500) acc = 0; // a pause starts a fresh gesture
      acc += delta;
      if (Math.abs(acc) < 24 || now - lastStepAt < 320) return;

      lastStepAt = now;
      const direction = acc > 0 ? 1 : -1;
      acc = 0;
      go(direction);
      setNudge((n) => n + 1);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [go]);

  // Autoplay, paused while the user is hovering or scrolling. The timer also
  // restarts on a tab switch or any manual navigation, so the carousel never
  // yanks to the next slide immediately after the user picked one.
  useEffect(() => {
    if (isHovered || isScrolling || !stageW) return;
    const interval = setInterval(() => go(1), 4000);
    return () => clearInterval(interval);
  }, [isHovered, isScrolling, stageW, activeTab, nudge, go]);

  useEffect(() => () => clearTimeout(settleTimer.current), []);

  const activeDot = ((pos % len) + len) % len;

  // Landing on a slide is CSS scroll-snap's job — we only follow along, marking
  // whichever card is centred so it grows. No scrollLeft is written while the
  // user is scrolling, which is what keeps a shift+wheel or trackpad gesture
  // perfectly smooth.
  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el || !step || !len) return;

    const nearest = Math.round(el.scrollLeft / step);
    if (nearest !== posRef.current) {
      posRef.current = nearest;
      setPos(nearest);
    }
    if (!isAutoScrolling.current) setIsScrolling(true);

    // Fallback for browsers without scrollend; onSettle clears this itself.
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(onSettle, 260);
  };

  // Once the scroll (and its snap) has come to rest, hop back into the middle
  // copy if we drifted out of it. The scroller is parked on a snap point by then
  // and the copies are identical, so the jump is invisible and never interrupts
  // a gesture in flight.
  const onSettle = () => {
    clearTimeout(settleTimer.current);
    const el = scrollerRef.current;
    if (!el || !step || !len) return;

    const wasUser = !isAutoScrolling.current;
    isAutoScrolling.current = false;

    let idx = Math.round(el.scrollLeft / step);
    if (idx >= 2 * len || idx < len) {
      idx = (((idx - len) % len) + len) % len + len;
      isAutoScrolling.current = true; // the re-seat's own scroll event
      el.scrollTo({ left: idx * step, behavior: "instant" });
    }
    posRef.current = idx;
    setPos(idx);

    setIsScrolling(false);
    if (wasUser) setNudge((n) => n + 1); // restart the autoplay timer
  };

  // Dots jump by the shortest route rather than sweeping the whole strip.
  const goToDot = (dot) => {
    const current = ((pos % len) + len) % len;
    let diff = dot - current;
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;
    go(diff);
    setNudge((n) => n + 1);
  };

  return (
    <section className="w-full bg-white py-16 md:py-20 overflow-hidden select-none font-sans">
      {/* 1. Header Typography Area Block */}
      <div className="max-w-[1200px] mx-auto text-center px-6 mb-10">
        <span className="eyebrow-2 font-albert tracking-[0.3em] uppercase text-[#C43A26] block mb-3">
          WHAT WE’VE BUILT
        </span>
        <h2 className="h2 text-[#1A1A1A]">
          Infrastructure That Powers Production
        </h2>
        <p className="p2 leading-[1.6] text-[#555555] max-w-[740px] mx-auto mt-4 font-normal">
          Parasmani’s Umbergaon facility operates as an integrated, end-to-end
          system, ensuring strict process control and multi-stage quality
          assurance from raw material to finished tubes.
        </p>

        {/* 2. Interactive Selector Sub-Pill Navigation */}
        <div className="flex justify-center mt-9">
          <div className="bg-[#EADCCF]/60 p-1.5 rounded-[28px] flex items-center gap-1 w-64 relative z-10">
            <button
              onClick={() => selectTab("facility")}
              className={`flex-1 py-2 text-[13px] font-medium rounded-full transition-colors duration-200 relative z-20 focus:outline-none ${
                activeTab === "facility"
                  ? "text-white"
                  : "text-[#5A5A5A] hover:text-[#1A1A1A]"
              }`}
            >
              Facility
              {activeTab === "facility" && (
                <motion.div
                  layoutId="activeTabIndicatorSlider"
                  className="absolute inset-0 bg-[#C48A54] rounded-full -z-10 shadow-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
            </button>
            <button
              onClick={() => selectTab("machinery")}
              className={`flex-1 py-2 text-[13px] font-medium rounded-full transition-colors duration-200 relative z-20 focus:outline-none ${
                activeTab === "machinery"
                  ? "text-white"
                  : "text-[#5A5A5A] hover:text-[#1A1A1A]"
              }`}
            >
              Machinery
              {activeTab === "machinery" && (
                <motion.div
                  layoutId="activeTabIndicatorSlider"
                  className="absolute inset-0 bg-[#C48A54] rounded-full -z-10 shadow-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Horizontally scrollable carousel stage */}
      <div
        ref={stageRef}
        className="relative w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          onScrollEnd={onSettle}
          onPointerDown={markUserInput}
          onTouchStart={markUserInput}
          className="w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px] overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex h-full items-center w-max" style={{ gap }}>
            <div
              aria-hidden="true"
              className="shrink-0"
              style={{ width: sideSpacer }}
            />
            {loopItems.map((url, index) => {
              const isActive = index === pos;
              return (
                <motion.div
                  key={`${activeTab}-${index}`}
                  onClick={() => {
                    if (index !== pos) {
                      go(index - pos);
                      setNudge((n) => n + 1);
                    }
                  }}
                  animate={{ height: isActive ? "100%" : "60%" }}
                  transition={SPRING}
                  style={{ width: cardW || undefined }}
                  className={`relative shrink-0 snap-center overflow-hidden rounded-[20px] border border-black/5 ${
                    isActive
                      ? "z-20 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
                      : "z-10 cursor-pointer"
                  }`}
                >
                  <img
                    src={url}
                    alt="Parasmani infrastructure segment view"
                    draggable={false}
                    loading="lazy"
                    className="w-full h-full object-cover pointer-events-none select-none"
                  />

                  {/* Copyright watermark inside center frame bounds */}
                  {isActive && (
                    <div className="absolute bottom-5 right-6 text-[10px] tracking-wider text-white/60 font-sans font-light bg-black/20 backdrop-blur-sm px-2.5 py-0.5 rounded pointer-events-none z-30">
                      Copyright{" "}
                      <span className="font-medium text-white/80">
                        Parasmani Copper
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
            <div
              aria-hidden="true"
              className="shrink-0"
              style={{ width: sideSpacer }}
            />
          </div>
        </div>
      </div>

      {/* 4. Horizontal Pagination Carousel Indicator Dots Block */}
      <div className="flex justify-center items-center gap-2 mt-8 flex-wrap max-w-[80%] mx-auto">
        {currentImagesList.map((_, dotIndex) => (
          <button
            key={dotIndex}
            onClick={() => goToDot(dotIndex)}
            className="p-1 focus:outline-none"
            aria-label={`Jump to image slide ${dotIndex + 1}`}
          >
            <div
              className={`rounded-full transition-all duration-300 ease-out ${
                dotIndex === activeDot
                  ? "bg-[#C48A54] w-5 h-2"
                  : "bg-[#EADCCF] w-2 h-2 hover:bg-[#C48A54]/50"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
