import { Link } from "react-router-dom";

/* The hero call-to-action pair shared by the products landing page and all
   three product pages.

   These four heroes had drifted into four different treatments: two different
   navies (#162046 on straight tubes and the landing page, #19223E on coils and
   fittings), bg-white against bg-transparent on the outline button,
   `tracking-wide` on two pages but not the other two, and a scale hover on the
   landing page against a colour hover everywhere else. Rendering them from one
   component is what keeps them identical -- style the buttons here, never at
   the call site.

   `relative z-20` is load-bearing, not decoration. Every product hero places
   its artwork with `lg:absolute` so it can bleed past the container, and that
   image overlaps this row from the `lg` breakpoint up. Without the stacking
   context the buttons sit under it and stop being clickable. */
const baseButton =
  "b2 relative z-20 flex h-[54px] w-full items-center justify-center " +
  "whitespace-nowrap rounded-full px-6 font-medium transition-colors " +
  "duration-200 sm:w-[280px]";

export default function ProductHeroActions({
  brochureLabel = "Download Brochure",
  className = "",
}) {
  return (
    <div
      className={`relative z-20 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row lg:justify-start ${className}`}
    >
      <Link
        to="/contact"
        className={`${baseButton} border border-[#162046] bg-white text-[#162046] hover:bg-[#162046]/5`}
      >
        Enquire Now
      </Link>
      <Link
        to="/downloads?category=Brochures"
        className={`${baseButton} bg-[#162046] text-white shadow-sm hover:bg-[#253159]`}
      >
        {brochureLabel}
      </Link>
    </div>
  );
}
