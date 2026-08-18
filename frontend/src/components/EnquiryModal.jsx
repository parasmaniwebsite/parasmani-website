import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import EnquiryForm from "./EnquiryForm";

/**
 * Enquiry dialog opened from the "Enquire Now" buttons.
 * Wraps the same EnquiryForm the Contact page renders inline, so both paths
 * share one validation flow and one POST /api/contact call.
 */
const EnquiryModal = ({ open, onClose }) => {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  // Escape to dismiss
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Lock background scroll, compensating for the scrollbar so the page
  // behind the overlay does not shift sideways as it disappears.
  useEffect(() => {
    if (!open) return;
    const { body, documentElement } = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [open]);

  // Keep tabbing inside the dialog while it is open
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[#0B1226]/60 px-4 py-8 backdrop-blur-sm sm:items-center sm:py-10"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
        className="relative my-auto w-full max-w-[540px] rounded-[24px] border border-gray-100/80 bg-[#F8F9FB] p-6 shadow-[0_24px_60px_rgba(11,18,38,0.28)] sm:p-8 md:p-10"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close enquiry form"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#141C3A] transition-colors hover:bg-[#141C3A]/8 sm:right-5 sm:top-5"
        >
          <X size={20} strokeWidth={1.8} />
        </button>

        <h2
          id="enquiry-modal-title"
          className="mb-2 pr-10 font-obviously text-[24px] font-normal tracking-tight text-[#1A1A1A]"
        >
          Get In Touch
        </h2>
        <p className="mb-8 max-w-sm font-albert text-[14px] font-light leading-relaxed text-[#555555]">
          Fill in the form and our team will respond within 24 hours.
        </p>

        <EnquiryForm autoFocus onSuccess={() => setTimeout(onClose, 2500)} />
      </div>
    </div>
  );
};

export default EnquiryModal;
