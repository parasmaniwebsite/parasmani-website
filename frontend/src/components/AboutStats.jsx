import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

/* Served from public/ at a fixed path rather than imported: Vite content-
   hashes bundled assets, and an indexable video needs a stable, crawlable
   URL that public/sitemap.xml and the VideoObject markup can both name. */
const factoryVideo = "/videos/copper-foundry.mp4";
const factoryPoster = "/videos/copper-foundry-poster.jpg";

// Dedicated counter sub-component to prevent top-level re-renders
const Counter = ({ value }) => {
  const ref = useRef(null);
  // Trigger animation when the stat is visible in viewport
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Extract number (e.g., "300" from "300+ MT/Month")
  const numericTarget = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  
  // Safely extract whatever characters come right after the first digits block
  const match = value.match(/[0-9]+(.*)/);
  const suffix = match ? match[1] : "";

  const count = useMotionValue(0);
  
  // FIX: Cast the rounded value explicitly to a String to ensure stable node updates
  const rounded = useTransform(count, (latest) => String(Math.round(latest)));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, numericTarget, {
        duration: 2, // Animation duration in seconds
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, count, numericTarget]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const AboutStats = () => {
  const navigate = useNavigate();
  
  const stats = [
    { label: "Years of Experience", value: "36+ Years" },
    { label: "Monthly Production Capacity", value: "300+ MT/Month" },
    { label: "Quality Checkpoints", value: "9 Steps" },
    { label: "Annual Projects", value: "2000+" },
  ];

  return (
    <section className="bg-white py-[80px] px-6 lg:px-10">
      <div className="max-w-[1269px] mx-auto flex flex-col lg:flex-row justify-between items-stretch gap-[80px]">
        {/* Left Content */}
        <div className="w-full lg:w-[620px]">
          <span className="eyebrow-2 font-albert uppercase tracking-[0.3em] text-[#C43A26] block mb-6">
            ABOUT PARASMANI
          </span>

          <h2 className="h2 tracking-wide text-[#272727]/95 leading-[1.08] mb-6">
            Defined by Scale, Consistency, and
            <br />
            Control
          </h2>

          <p className="p2 font-albert text-[#272727] opacity-85 leading-[1.5] mb-[30px]">
            Every figure reflects a manufacturing process built on strict
            quality standards and
            <br />
            dependable supply built over decades of experience. Supplying across
            India and to
            <br />
            select export markets.
          </p>

          {/* FIX: Set a solid layout relative position container block and enforce absolute object coverage */}
          <div className="rounded-2xl overflow-hidden aspect-10/4 w-full max-w-xl bg-gray-200 relative">
            {/* First frame as poster: no jump when autoplay starts, and it is
                the thumbnail the VideoObject markup points at. */}
            <video
              src={factoryVideo}
              poster={factoryPoster}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full  object-cover"
            />
          </div>
        </div>

        {/* Right Stats Table */}
        <div className="flex-1 w-full lg:max-w-[620px] mt-5 flex flex-col justify-between">
          {stats.map((stat, idx) => (
            <div key={idx} className="group">
              <div className="grid grid-cols-[1fr_auto] items-center gap-8 py-[26px]">
                <span className="font-albert text-[17px] text-[#373737] font-normal tracking-wide">
                  {stat.label}
                </span>

                <span className="min-w-[170px] text-right font-albert text-[24px] text-[#C68344] font-[100] tracking-wide">
                  {/* Dynamic animating component replaces static string */}
                  <Counter value={stat.value} />
                </span>
              </div>

              <div className="h-[1px] w-full bg-[#141C3A]/15" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;