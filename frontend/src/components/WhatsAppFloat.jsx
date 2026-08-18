import { FaWhatsapp } from "react-icons/fa";

/**
 * Single source of truth for the sales WhatsApp link. The Contact page's
 * "Whatsapp Us" button imports this too, so the number and the prefilled
 * message can't drift apart between the two entry points.
 */
export const WHATSAPP_URL =
  "https://wa.me/919819134044?text=Hi%20Parasmani%20Tubes!%20I%20need%20more%20information%20about%20your%20products.";

/**
 * Persistent WhatsApp button, bottom-right on every public page.
 * Mounted in App.jsx alongside Navbar/Footer and hidden on /admin for the
 * same reason they are — it's public site chrome, not part of the CMS.
 *
 * z-50 keeps it above page content but below the enquiry modal (z-100), so
 * it doesn't float over an open dialog.
 */
const WhatsAppFloat = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Parasmani on WhatsApp"
      title="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#1AD054] text-white shadow-[0_6px_20px_rgba(26,208,84,0.45)] transition-transform duration-200 hover:scale-105 hover:bg-[#16B84A] active:scale-95 sm:bottom-6 sm:right-6 sm:h-[60px] sm:w-[60px]"
    >
      <FaWhatsapp className="h-[32px] w-[32px] sm:h-[34px] sm:w-[34px]" />
    </a>
  );
};

export default WhatsAppFloat;
