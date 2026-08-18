import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import coilImg from "../../assets/products/productMain/pancakeCoil.webp";
import tubeImg from "../../assets/products/productMain/straightTube.webp";
import fittingsImg from "../../assets/products/productMain/copperFittings.webp";
import ProductHeroActions from "../../components/ProductHeroActions";

/**
 * Products landing page.
 *
 * The hero is a cluster of three product shots layered over each other and
 * pinned to the hero's bottom-right. Each one links through to its own
 * product page. The percentages below come from the approved design and are
 * what keep the overlap reading correctly — the images are 2000x1200 with
 * almost no transparent margin, so they cannot be re-cropped without
 * re-deriving every offset.
 *
 * Stacking is deliberate and not DOM order: tubes in front, then fittings,
 * with the coil furthest back.
 *
 * Hit testing is alpha-aware. The three images are mostly transparent and
 * their boxes overlap heavily, so plain <a> boxes made the coil completely
 * unclickable — the tubes' and fittings' transparent corners covered it.
 * We sample each image's alpha at the pointer and route to whichever product
 * is actually painted there, which is what the user sees. The <a> elements
 * stay in the DOM for keyboard, screen readers and crawlers.
 */
const PRODUCTS = [
  {
    to: "/pancake-copper-coil",
    img: coilImg,
    alt: "Soft annealed pancake copper coil",
    z: 2, // furthest back, highest off the baseline
    position:
      "right-[25.5%] bottom-[5.7%] w-[56.9%] lg:right-[27.5%] lg:bottom-[6.8%] lg:w-[54.5%]",
  },
  {
    to: "/straight-copper-tubes",
    img: tubeImg,
    alt: "Bundle of seamless straight copper tubes",
    z: 5, // anchors the cluster to the bottom-right corner
    position: "right-0 bottom-0 w-[53%] lg:w-[54.7%]",
  },
  {
    to: "/copper-fittings",
    img: fittingsImg,
    alt: "Copper elbows, tees and couplers",
    z: 4, // overlaps the tubes from the left
    position:
      "right-[56%] bottom-[1.6%] w-[42.7%] lg:right-[53.5%] lg:bottom-[2.6%] lg:w-[40.3%]",
  },
];

/** Front-to-back, so the first match under the pointer is the visible one. */
const HIT_ORDER = [...PRODUCTS].sort((a, b) => b.z - a.z);

/** Downsampled mask width. 256 is plenty to hit-test a product silhouette. */
const MASK_W = 256;
/** Ignore anti-aliased edge pixels so the target matches what reads as solid. */
const ALPHA_MIN = 32;

const ProductMainPage = () => {
  const navigate = useNavigate();
  const linkRefs = useRef({});
  const masksRef = useRef({});
  const [hovered, setHovered] = useState(null);
  // If a canvas read ever fails (e.g. images move to a CDN and taint it), fall
  // back to letting the plain <a> boxes take clicks rather than breaking them.
  const [alphaHit, setAlphaHit] = useState(true);

  const buildMask = useCallback((to, img) => {
    if (masksRef.current[to] || !img?.naturalWidth) return;
    try {
      const h = Math.max(
        1,
        Math.round((MASK_W * img.naturalHeight) / img.naturalWidth)
      );
      const canvas = document.createElement("canvas");
      canvas.width = MASK_W;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, MASK_W, h);
      const { data } = ctx.getImageData(0, 0, MASK_W, h);
      const alpha = new Uint8Array(MASK_W * h);
      for (let i = 0; i < alpha.length; i++) alpha[i] = data[i * 4 + 3];
      masksRef.current[to] = { w: MASK_W, h, alpha };
    } catch {
      setAlphaHit(false);
    }
  }, []);

  // Images may already be decoded from cache before onLoad can fire.
  useEffect(() => {
    PRODUCTS.forEach(({ to }) => {
      const img = linkRefs.current[to]?.querySelector("img");
      if (img?.complete) buildMask(to, img);
    });
  }, [buildMask]);

  const hitTest = useCallback((clientX, clientY) => {
    for (const product of HIT_ORDER) {
      const el = linkRefs.current[product.to];
      const mask = masksRef.current[product.to];
      if (!el || !mask) continue;
      const r = el.getBoundingClientRect();
      if (
        clientX < r.left ||
        clientX > r.right ||
        clientY < r.top ||
        clientY > r.bottom
      )
        continue;
      const mx = Math.min(
        mask.w - 1,
        Math.max(0, Math.floor(((clientX - r.left) / r.width) * mask.w))
      );
      const my = Math.min(
        mask.h - 1,
        Math.max(0, Math.floor(((clientY - r.top) / r.height) * mask.h))
      );
      if (mask.alpha[my * mask.w + mx] >= ALPHA_MIN) return product.to;
    }
    return null;
  }, []);

  const handleClick = (e) => {
    const to = hitTest(e.clientX, e.clientY);
    if (to) navigate(to);
  };

  return (
    <div className="w-full bg-[#FEFEFE] font-albert text-[#1E2229] my-14  overflow-x-hidden">
      {/* HERO — text left, layered product cluster right */}
      <section className="w-full bg-white overflow-hidden select-none">
        <div className="relative flex w-full flex-col items-center lg:min-h-[600px] lg:flex-row">
          {/* Text column — stays on the site's 1440px page grid while the
              cluster behind it runs full-bleed to the viewport edge.
              pointer-events-none: this wrapper is full width and sits above
              the cluster at z-10, so without it the invisible half of this
              box swallows every click meant for the images. The buttons opt
              back in; the copy itself is select-none anyway. */}
          <div className="pointer-events-none z-10 mx-auto w-full max-w-[1440px] px-6 pb-2 pt-12 text-center sm:pt-16 md:px-12 lg:px-20 lg:pb-0 lg:pt-0 lg:text-left">
            <div className="lg:w-[46%] lg:pb-10">
              <span className="eyebrow-1 mb-3 block font-albert uppercase tracking-[0.15em] text-[#C43A26]">
                OUR PRODUCTS
              </span>
              <h1 className="h1 mb-4 leading-[1.15] tracking-tight text-[#231F20]">
                One Range.
                <br />
                Every Connection.
              </h1>
              <p className="p1 mx-auto mb-8 max-w-xl font-albert leading-relaxed text-[#545454] lg:mx-0">
                Seamless straight tubes, pancake coils and precision fittings —
                engineered for HVAC/R, plumbing, medical gas and industrial use.
              </p>

              {/* Action Buttons */}
              <ProductHeroActions
                brochureLabel="Download Brochure"
                className="pointer-events-auto"
              />
            </div>
          </div>

          {/* Product cluster — flows below the copy on mobile, pinned bottom-right from lg up */}
          <div
            className="relative z-[1] mt-2 aspect-[1/0.72] w-full lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[60%]"
            onClick={alphaHit ? handleClick : undefined}
            onPointerMove={
              alphaHit
                ? (e) => setHovered(hitTest(e.clientX, e.clientY))
                : undefined
            }
            onPointerLeave={alphaHit ? () => setHovered(null) : undefined}
            style={alphaHit ? { cursor: hovered ? "pointer" : "default" } : undefined}
          >
            {PRODUCTS.map((product) => (
              <Link
                key={product.to}
                to={product.to}
                ref={(el) => {
                  linkRefs.current[product.to] = el;
                }}
                aria-label={product.alt}
                style={{ zIndex: product.z }}
                // Alpha hit testing on the container decides the target, so the
                // anchor boxes must not intercept. Keyboard activation is
                // unaffected by pointer-events.
                className={`absolute block ${product.position} ${
                  alphaHit ? "pointer-events-none" : ""
                }`}
              >
                <img
                  src={product.img}
                  alt={product.alt}
                  onLoad={(e) => buildMask(product.to, e.currentTarget)}
                  className={`block h-auto w-full origin-bottom transition-transform duration-[450ms] ease-[cubic-bezier(.2,.7,.3,1)] ${
                    hovered === product.to ? "scale-[1.035]" : ""
                  } ${alphaHit ? "" : "hover:scale-[1.035]"}`}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductMainPage;
