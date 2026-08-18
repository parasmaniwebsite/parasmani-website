  import React, { useState } from 'react';
import { FAQ_DATA } from "./faqData";
  
  // FIXED: Added unique ID properties to each data object
  
  function FAQItem({ id, question, answer, isOpen, onToggle }) {
    return (
      <div className="border-b border-[#EAEAEA] font-albert text-left">
        <button
          onClick={() => onToggle(id)}
          aria-expanded={isOpen}
          className="w-full py-6 md:py-7 flex items-center justify-between gap-6 text-left group focus:outline-none"
        >
          {/* Accordion Question Title */}
          <span className="text-[16px] font-albert font-normal text-[#272727] tracking-tight group-hover:text-black transition-colors ">
            {question}
          </span>
          
          {/* Dynamic Circular Toggle Control Button UI Block */}
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
              isOpen 
                ? "bg-[#F3E6DA] text-[#272727]" 
                : "bg-[#F4F4F4] text-[#272727]"
            }`}
          >
            {isOpen ? (
              <span className="text-[20px] font-albert font-light leading-none relative -top-[0.1px]">&times;</span>
            ) : (
              <span className="text-[18px] font-albert font-light leading-none relative -top-[0.5px]">+</span>
            )}
          </div>
        </button>
  
        {/* Dynamic Content Slider Transition Scaffold */}
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: isOpen ? "500px" : "0px", // FIXED: Height increased to prevent long answers from being cut off
            opacity: isOpen ? 1 : 0
          }}
        >
          <div className="pb-7 text-[13px] font-albert font-light text-[#4A4A4A] leading-[1.65] max-w-[900px]">
            {answer}
          </div>
        </div>
      </div>
    );
  }
  
  export default function FAQSection() {
    // Keeps track of the currently active open tab ID. Initialized to first tab open ("faq-1").
    const [activeId, setActiveId] = useState("faq-1");
  
    const handleToggle = (id) => {
      setActiveId(activeId === id ? null : id);
    };
  
    return (
      <section className="w-full py-15 md:py-24 bg-white">
        <div className="max-w-[1140px] mx-auto px-6 md:px-12">
          
          {/* Section Segmented Header Framework */}
          <div className="text-left mb-12 md:mb-16">
            <span className="eyebrow-2 tracking-[0.3em] uppercase block font-albert text-[#C43A26] mb-1">
              Frequently Asked Questions (FAQ)
            </span>
            <h2 className="h2 tracking-tight text-[#272727]">
              Gas piping questions answered.
            </h2>
          </div>
  
          {/* Accordion Layout Matrix Grouping wrapper box */}
          <div className="w-full border-[#EAEAEA]">
            {FAQ_DATA.map((faq) => (
              <FAQItem
                key={faq.id}
                id={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={activeId === faq.id}
                onToggle={handleToggle}
              />
            ))}
          </div>
  
        </div>
      </section>
    );
  }