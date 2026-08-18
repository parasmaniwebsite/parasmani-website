import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Shared shell for the two legal pages (Privacy Policy, Terms of Service).
 *
 * Both are long single-column documents, so the layout is a light hero in the
 * usual page style plus a sticky table of contents on desktop. Section copy is
 * passed in as data rather than JSX so the wording stays in one readable block
 * per page and can be diffed against the client's source document.
 *
 * `sections` is an array of { id, heading, body }, where each entry of `body`
 * is one of:
 *   "a paragraph"                          → <p>
 *   { h: "A sub heading" }                 → <h3>
 *   { list: [...] }                        → bulleted list; each item is either
 *                                            a string or { lead, text } for the
 *                                            "Severability. …" style entries
 */

/** Highlights the section currently in view in the sidebar. */
const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);
  // The caller builds `ids` inline, so it is a new array on every render.
  // Key the effect on its contents instead or the observer is torn down and
  // rebuilt on each state change.
  const idKey = ids.join("|");

  useEffect(() => {
    const sectionIds = idKey.split("|");
    const observer = new IntersectionObserver(
      (entries) => {
        // Topmost heading that is inside the band below the sticky navbar wins.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -70% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [idKey]);

  return active;
};

/**
 * Jumps to the section named in the URL hash on a cold load. The browser's own
 * anchor handling runs before React has rendered the section, and ScrollToTop
 * then forces the window back to the top on mount, so shared deep links would
 * otherwise always land at the hero. Clicking a link within the page is
 * unaffected — only the pathname changes trigger ScrollToTop.
 */
const useHashScroll = () => {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // One frame after paint, so this lands after ScrollToTop's mount effect.
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timer);
  }, []);
};

const Bullet = ({ item }) => (
  <li className="relative pl-6 font-albert text-[16px] font-light leading-[1.65] text-[#19234D]/85">
    <span className="absolute left-0 top-[0.6em] h-[6px] w-[6px] rounded-full bg-[#C68344]" />
    {typeof item === "string" ? (
      item
    ) : (
      <>
        <span className="font-medium text-[#18234D]">{item.lead}</span>{" "}
        {item.text}
      </>
    )}
  </li>
);

const Body = ({ body }) =>
  body.map((block, i) => {
    if (typeof block === "string") {
      return (
        <p
          key={i}
          className="font-albert text-[16px] font-light leading-[1.75] text-[#19234D]/85"
        >
          {block}
        </p>
      );
    }

    if (block.h) {
      return (
        <h3
          key={i}
          className="font-obviously text-[18px] font-normal text-[#18234D] pt-1"
        >
          {block.h}
        </h3>
      );
    }

    return (
      <ul key={i} className="flex flex-col gap-3">
        {block.list.map((item, j) => (
          <Bullet key={j} item={item} />
        ))}
      </ul>
    );
  });

const LegalLayout = ({
  eyebrow = "Legal",
  title,
  effective,
  intro,
  sections,
  contact,
  crossLink,
}) => {
  const ids = sections.map((s) => s.id);
  const active = useActiveSection(ids);
  useHashScroll();

  return (
    <div className="min-h-screen bg-[#FBFAF8]">
      {/* Hero */}
      <section className="w-full border-b border-[#19234D]/10 bg-white">
        <div className="mx-auto w-full max-w-[1340px] px-6 py-14 md:px-12 md:py-20 lg:px-16">
          <span className="eyebrow-1 mb-3 block font-albert uppercase tracking-[0.15em] text-[#C43A26]">
            {eyebrow}
          </span>
          <h1 className="h1 mb-5 tracking-tight text-[#18234D]">{title}</h1>
          <p className="p1 max-w-[720px] font-albert font-light text-[#19234D]/85">
            {intro}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#C68344]/40 bg-[#C68344]/10 px-4 py-1.5 font-albert text-[12.5px] font-light tracking-wide text-[#8A5527]">
              {effective}
            </span>
            <span className="font-albert text-[12.5px] font-light text-[#19234D]/55">
              Parasmani Tubes Copper Pvt. Ltd.
            </span>
          </div>
        </div>
      </section>

      {/* Document */}
      <div className="mx-auto w-full max-w-[1340px] px-6 py-14 md:px-12 md:py-16 lg:px-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Table of contents */}
          <aside className="hidden lg:block lg:w-[260px] lg:shrink-0">
            <nav className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto">
              <p className="eyebrow-2 mb-4 font-albert uppercase tracking-[0.15em] text-[#19234D]/45">
                On this page
              </p>
              <ul className="flex flex-col border-l border-[#19234D]/12">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`-ml-px block border-l-2 py-1.5 pl-4 font-albert text-[13.5px] font-light leading-snug transition-colors duration-200 ${
                        active === s.id
                          ? "border-[#C68344] text-[#18234D]"
                          : "border-transparent text-[#19234D]/55 hover:text-[#C68344]"
                      }`}
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Sections */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-12 md:gap-14">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <div className="mb-4 flex items-baseline gap-3">
                    <span className="font-albert text-[13px] font-light tabular-nums text-[#C68344]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="h2 tracking-tight text-[#18234D]">
                      {s.heading}
                    </h2>
                  </div>
                  <div className="flex max-w-[760px] flex-col gap-4 border-l border-[#19234D]/10 pl-4 md:pl-6">
                    <Body body={s.body} />
                  </div>
                </section>
              ))}
            </div>

            {/* Contact card */}
            <div className="mt-14 max-w-[760px] rounded-[20px] bg-[#19234D] px-6 py-8 md:px-9 md:py-10">
              <h2 className="h2 mb-2 text-white">{contact.heading}</h2>
              <p className="mb-7 font-albert text-[15px] font-light leading-[1.7] text-white/75">
                {contact.intro}
              </p>
              <dl className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
                {contact.rows.map((row) => (
                  <div key={row.label}>
                    <dt className="eyebrow-2 mb-1.5 font-albert uppercase tracking-[0.15em] text-[#C68344]">
                      {row.label}
                    </dt>
                    <dd className="font-albert text-[15px] font-light leading-[1.5] text-white/90 break-words">
                      {row.href ? (
                        <a
                          href={row.href}
                          target={
                            row.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            row.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="transition-colors duration-200 hover:text-[#C68344]"
                        >
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Cross-link to the sibling document */}
            <div className="mt-8 max-w-[760px] border-t border-[#19234D]/10 pt-6">
              <p className="font-albert text-[15px] font-light text-[#19234D]/70">
                {crossLink.prefix}{" "}
                <Link
                  to={crossLink.to}
                  className="text-[#C43A26] underline underline-offset-2 transition-colors duration-200 hover:text-[#C68344]"
                >
                  {crossLink.label}
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalLayout;
