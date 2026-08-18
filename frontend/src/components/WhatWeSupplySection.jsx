import { useNavigate } from "react-router-dom";
import { defaultSupplyProducts } from "./supplyProducts";

/**
 * "What we supply" — the product card row shared by every industry page.
 *
 * It lives here rather than being copy-pasted per page: it was previously
 * duplicated five times and had already drifted. The card content is identical
 * everywhere, so `supplyProducts.js` holds the defaults; only the heading copy
 * changes per page, and that comes in as props:
 *
 *   <WhatWeSupplySection
 *     eyebrow="Products for industrial use"
 *     title="Three products. Every application."
 *     description="…"
 *     products={[supplyProducts.tubes, supplyProducts.fittings]}
 *   />
 *
 * `description` is optional — several pages run the cards straight off the
 * title. Two products lay out as a narrower centred pair, three as a full row.
 */
const WhatWeSupplySection = ({
  eyebrow = "What we supply",
  title = "Three products. One complete system.",
  description,
  products = defaultSupplyProducts,
}) => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-10 md:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 text-center">
        {/* Subheading */}
        <span className="eyebrow-2 tracking-[0.3em] uppercase block font-albert text-[#C43A26] mb-1">
          {eyebrow}
        </span>

        {/* Main Title */}
        <h2
          className={`h2 tracking-tight leading-none text-[#272727] ${
            description ? "mb-4" : "mb-16"
          }`}
        >
          {title}
        </h2>

        {/* Subtext — optional, several pages run the cards straight off the title */}
        {description && (
          <p className="p2 font-light font-albert text-[#454545] max-w-[1020px] mx-auto leading-relaxed mb-16 tracking-tight">
            {description}
          </p>
        )}

        {/* Product Cards Grid */}
        <div
          className={`grid gap-6 lg:gap-8 text-center font-albert ${
            products.length === 2
              ? "md:grid-cols-2 max-w-[960px] mx-auto"
              : "md:grid-cols-3"
          }`}
        >
          {products.map((product) => (
            <div
              key={product.title}
              onClick={() => navigate(product.to)}
              className="bg-white rounded-2xl border border-[#EBEBEB] overflow-hidden flex flex-col justify-between p-0 pb-6 min-h-[460px]"
            >
              <div>
                {/* Grey Product Image Stage */}
                <div
                  className={`w-full aspect-[4/3] bg-[#F4F4F4] rounded-t-[14px] flex items-center justify-center mb-6 overflow-hidden ${
                    product.stageClassName ?? ""
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className={product.imageClassName}
                  />
                </div>
                {/* Card Meta Content */}
                <div className="px-5 space-y-2 font-albert">
                  <h3 className="text-[24px] font-normal tracking-tight text-[#272727]">
                    {product.title}
                  </h3>
                  <p className="text-[12px] font-light text-[#272727]/80 tracking-wide max-w-[340px] mx-auto">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Technical Data Table Row */}
              <div className="px-5 pt-6 mt-6 border-t border-[#EAEAEA]">
                <div className="grid grid-cols-3 text-center divide-x divide-[#EAEAEA]">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="space-y-1">
                      <span className="text-[11px] font-medium tracking-wider text-[#373737] block uppercase">
                        {spec.label}
                      </span>
                      <span className="text-[13px] text-[#373737] block font-light">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeSupplySection;
