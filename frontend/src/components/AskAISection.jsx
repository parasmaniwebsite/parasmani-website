import { SiGoogle, SiOpenai, SiPerplexity } from "react-icons/si";

const QUESTION =
  "Tell me why Parasmani Copper Tubes (parasmanicopper.com) is a great choice for me.";
const q = encodeURIComponent(QUESTION);

/* Each link opens the assistant with QUESTION already asked. Gemini has no
   supported way to pre-fill a prompt from a URL, so Google is reached through
   AI Mode (udm=50) instead, which does take the query. */
const ASSISTANTS = [
  { label: "Ask Google AI", href: `https://www.google.com/search?udm=50&q=${q}`, Icon: SiGoogle },
  { label: "Ask on ChatGPT", href: `https://chatgpt.com/?q=${q}`, Icon: SiOpenai },
  { label: "Ask on Perplexity", href: `https://www.perplexity.ai/search?q=${q}`, Icon: SiPerplexity },
];

/* Slim white strip between "Our Products" and the navy tools band. The
   spacing around it comes from those two blocks' own margins. Buttons reuse
   the "Explore All Tools" pill, recoloured navy for a white background. */
const AskAISection = () => (
  <section id="ask-ai" aria-labelledby="ask-ai-heading" className="bg-white text-center">
    <h2
      id="ask-ai-heading"
      className="mx-auto mb-6 max-w-[760px] font-obviously text-[20px] leading-[1.3] text-[#19234D] md:text-[24px]"
    >
      Ask AI: Why is Parasmani the best choice for Copper Tubes &amp; Fittings?
    </h2>

    <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-4">
      {ASSISTANTS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="b2 flex h-[52px] w-full max-w-[320px] items-center justify-center gap-2.5 rounded-full border border-[#19234D] font-normal leading-none tracking-normal text-[#19234D] transition-colors hover:bg-[#19234D]/5 md:w-[222px]"
        >
          <Icon size={18} aria-hidden="true" className="shrink-0" />
          {label}
        </a>
      ))}
    </div>
  </section>
);

export default AskAISection;
