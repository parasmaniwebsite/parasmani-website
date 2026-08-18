import AboutStats from "../components/AboutStats";
import BrandsServed from "../components/BrandsServed";
import FeaturesSection from "../components/FeaturesSection";
import Hero from "../components/Hero";
import HVACSolutions from "../components/HVACsolutions";
import InsightsSection from "../components/InsightsSection";
import ProductsSection from "../components/ProductsSection";
import Apollo from "../components/Apollo";

/* Served from public/ at a fixed path rather than imported: Vite content-
   hashes bundled assets, and an indexable video needs a stable, crawlable
   URL that public/sitemap.xml and the VideoObject markup can both name. */
const mainVideo = "/videos/copper-product-range.mp4";
const mainVideoPoster = "/videos/copper-product-range-poster.jpg";

const Home = () => {
  return (
    <div className="w-full relative overflow-x-clip min-h-screen">

      {/* Hero stage: one viewport tall, less the 65px sticky navbar above it.
          The video fills the whole stage and the copy sits on top of its lower
          portion, where the source frames are just white padding — that overlap
          is what keeps the video large without leaving a gap above the text.
          Anchoring the copy to the bottom keeps the eyebrow, heading, paragraph
          and buttons above the fold at any height, which a fixed -41vh pull did
          not: it put the buttons off screen below roughly 880px tall. */}
      <div className="relative flex h-[calc(100svh-65px)] min-h-[420px] w-full flex-col overflow-clip lg:block">
        {/* lg and up: the video fills the stage and the copy overlays its lower
            portion. Below lg the video takes only the space the copy leaves —
            that shorter box scales the frame far less, so cover fills the width
            while still keeping the product clear of the edges (measured across
            frames: nothing clipped, and roughly twice the size contain gave). */}
        <section className="relative min-h-[90px]  flex-1 overflow-clip lg:absolute lg:inset-0">
          {/* The source is wider than the stage, so object-cover crops left and
              right and fills the height exactly — object-position has nothing
              vertical to move. Lifting the product on desktop therefore means
              translating the element; the gap it leaves at the bottom is white
              against a white section, and the frames it crops off the top are
              the source's own empty padding. Mobile is left alone. */}
          {/* `poster` is the video's own first frame, so nothing jumps when
              autoplay starts. It doubles as the VideoObject thumbnail, which
              Google requires and this 3.5 MB file otherwise made the visitor
              wait on: until now the hero was an empty box while it buffered. */}
          <video
            src={mainVideo}
            poster={mainVideoPoster}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full py-20 lg:h-[90%] w-full object-cover lg:object-contain lg:-translate-y-[8%]"
          />
        </section>

        <div className="relative z-10 w-full shrink-0 overflow-x-hidden lg:absolute lg:inset-x-0 lg:bottom-0">
          <Hero />
        </div>
      </div>

      {/* Page Section Block Components */}
      <ProductsSection />
      <FeaturesSection />
      <BrandsServed />
      <AboutStats />
      <InsightsSection />
      <HVACSolutions />
      <Apollo />
    </div>
  );
};

export default Home;
