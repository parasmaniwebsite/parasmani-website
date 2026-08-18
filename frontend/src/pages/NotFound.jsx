import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LuArrowLeft,
  LuArrowRight,
  LuCalculator,
  LuDownload,
  LuFactory,
  LuPackage,
} from "react-icons/lu";

/**
 * Catch-all screen for unmatched routes (the `path="*"` entry in App.jsx).
 *
 * Renders its own <title> and a noindex tag rather than going through
 * seo/pageMeta.js — that file keys on exact pathnames and a 404 can be any
 * path. React 19 hoists these into <head> the same way PageMeta's are.
 *
 * Note this is a soft 404: the SPA host rewrites every path to index.html, so
 * the response status is still 200. The noindex tag is what actually keeps a
 * mistyped URL out of the index.
 */

const DESTINATIONS = [
  {
    to: "/products",
    icon: LuPackage,
    label: "Products",
    blurb: "Seamless tubes, pancake coils and wrought fittings.",
  },
  {
    to: "/industry",
    icon: LuFactory,
    label: "Industries",
    blurb: "HVAC/R, medical gas, plumbing, fuel gas and process.",
  },
  {
    to: "/tools",
    icon: LuCalculator,
    label: "Tools",
    blurb: "Weight, pressure, unit conversion and project estimates.",
  },
  {
    to: "/downloads",
    icon: LuDownload,
    label: "Downloads",
    blurb: "Catalogues, datasheets and certifications.",
  },
];

const NotFound = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Someone who typed the URL or followed a bad external link has nothing to
  // go back to inside the site, and navigate(-1) would either do nothing or
  // throw them off it entirely. React Router stamps an incrementing `idx` on
  // history state, so a non-zero one means there is a real in-app entry
  // behind us. Read once — it cannot change while this page is mounted.
  const [canGoBack] = useState(() => (window.history.state?.idx ?? 0) > 0);

  return (
    <>
      <title>Page Not Found | Parasmani Copper</title>
      <meta name="robots" content="noindex, follow" />

      {/* Not min-h-screen: the navbar already takes a slice of the viewport, so
          a full 100vh here pushes the footer well below the fold and leaves a
          dead band under the cards. */}
      <div className="min-h-[70vh] bg-[#FBFAF8]">
        <div className="mx-auto w-full max-w-[1340px] px-6 py-16 md:px-12 md:py-20 lg:px-16">
          <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:gap-20">
            {/* Message */}
            <div className="w-full lg:flex-1">
              <span className="eyebrow-1 mb-3 block font-albert uppercase tracking-[0.15em] text-[#C43A26]">
                Error 404
              </span>
              <h1 className="h1 mb-4 tracking-tight text-[#18234D]">
                This page isn't in our catalogue.
              </h1>
              <p className="p1 mb-2 max-w-[520px] font-albert font-light text-[#19234D]/85">
                The link may be out of date, or the address mistyped. Everything
                else on the site is exactly where you left it.
              </p>

              {/* The path they actually asked for, so a wrong link is obvious. */}
              <p className="mb-8 max-w-[520px] break-all font-albert text-[13px] font-light text-[#19234D]/50">
                Requested:{" "}
                <span className="rounded bg-[#19234D]/6 px-1.5 py-0.5 text-[#19234D]/70">
                  {pathname}
                </span>
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/"
                  className="b2 flex h-[44px] items-center justify-center rounded-full bg-[#18234D] px-7 font-normal leading-none text-white shadow-sm transition-colors duration-200 hover:bg-[#1E2B5C]"
                >
                  Back to Home
                </Link>
                {canGoBack ? (
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="b2 flex h-[44px] items-center justify-center gap-2 rounded-full border border-[#18234D]/25 px-7 font-normal leading-none text-[#18234D] transition-colors duration-200 hover:border-[#C68344] hover:text-[#C68344]"
                  >
                    <LuArrowLeft size={16} />
                    Go Back
                  </button>
                ) : (
                  <Link
                    to="/contact"
                    className="b2 flex h-[44px] items-center justify-center rounded-full border border-[#18234D]/25 px-7 font-normal leading-none text-[#18234D] transition-colors duration-200 hover:border-[#C68344] hover:text-[#C68344]"
                  >
                    Contact Us
                  </Link>
                )}
              </div>

              <p className="mt-6 font-albert text-[15px] font-light text-[#19234D]/70">
                Looking for something specific?{" "}
                <Link
                  to="/contact"
                  className="text-[#C43A26] underline underline-offset-2 transition-colors duration-200 hover:text-[#C68344]"
                >
                  Get in touch
                </Link>{" "}
                and we'll point you to it.
              </p>
            </div>

            {/* Oversized numeral — decorative, hidden from assistive tech */}
            <div
              aria-hidden="true"
              className="hidden select-none lg:block lg:shrink-0"
            >
              <span
                className="block leading-none tracking-tighter text-[#18234D]/10"
                style={{
                  fontFamily: "var(--font-obviously)",
                  fontSize: "200px",
                }}
              >
                404
              </span>
            </div>
          </div>

          {/* Popular destinations */}
          <div className="mt-16 border-t border-[#19234D]/10 pt-10 md:mt-20">
            <p className="eyebrow-2 mb-6 font-albert uppercase tracking-[0.15em] text-[#19234D]/45">
              Popular destinations
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {DESTINATIONS.map(({ to, icon: Icon, label, blurb }) => (
                <Link
                  key={to}
                  to={to}
                  className="group flex flex-col rounded-[16px] border border-[#c684454d] bg-white px-5 py-6 shadow-[0_2px_16px_rgba(25,35,77,0.08)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(25,35,77,0.14)]"
                >
                  <span className="mb-3 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[10px] bg-[#c6844529]">
                    <Icon size={20} className="text-[#B55233]" />
                  </span>
                  <span className="mb-1.5 flex items-center gap-1.5 font-obviously text-[17px] text-[#18234D]">
                    {label}
                    <LuArrowRight
                      size={15}
                      className="text-[#C68344] transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                  <span className="font-albert text-[14px] font-light leading-[1.5] text-[#19234D]/70">
                    {blurb}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
