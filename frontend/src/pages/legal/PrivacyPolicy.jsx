import LegalLayout from "./LegalLayout";

/**
 * Copy is transcribed from the client's "Parasmani Privacy Policy" hand-off
 * document. Treat that document as the source of truth — reword here only
 * when an updated version is supplied.
 */
const SECTIONS = [
  {
    id: "introduction",
    heading: "Introduction",
    body: [
      'Parasmani Tubes Copper Pvt. Ltd. ("Parasmani", "we", "us", or "our"), with its principal place of business in Mumbai, Maharashtra, India, operates the website parasmanicopper.com (the "Website"). We are committed to protecting the privacy of visitors to our Website and individuals who contact us for business purposes.',
      "This Privacy Policy explains what personal information we collect, how we use it, how we protect it, and your rights in relation to it. It applies to information collected through our Website and through direct business communications.",
    ],
  },
  {
    id: "information-we-collect",
    heading: "Information We Collect",
    body: [
      { h: "Information You Provide" },
      "We may collect personal information that you voluntarily provide when you:",
      {
        list: [
          "Submit an enquiry or contact form on our Website",
          "Send us an email or call us",
          "Enter into a business relationship with us as a customer, supplier, or partner",
        ],
      },
      "This may include your name, job title, company name, email address, phone number, and the content of your communication.",
      { h: "Information Collected Automatically" },
      "When you visit our Website, certain technical information may be collected automatically, including your IP address, browser type, pages visited, and the date and time of your visit. This information is used solely for website analytics and security purposes and is not used to identify you personally.",
    ],
  },
  {
    id: "how-we-use-your-information",
    heading: "How We Use Your Information",
    body: [
      "We use personal information collected for the following purposes:",
      {
        list: [
          "To respond to your enquiries and communicate with you about our products and services",
          "To manage and fulfil business transactions, orders, and contractual obligations",
          "To maintain supplier, customer, and partner records as required for business operations",
          "To comply with applicable legal and regulatory obligations",
          "To improve our Website and the services we offer",
        ],
      },
      "We do not use your personal information for unsolicited marketing communications without your consent.",
    ],
  },
  {
    id: "sharing-of-information",
    heading: "Sharing of Information",
    body: [
      "Parasmani does not sell, rent, or trade your personal information to third parties. We may share information in the following limited circumstances:",
      {
        list: [
          "With service providers who assist us in operating our business (e.g. IT, logistics, accounting), subject to confidentiality obligations",
          "Where required by applicable law, regulation, or court order",
          "In connection with a merger, acquisition, or sale of business assets, where the receiving party agrees to protect your information under terms no less protective than this Policy",
        ],
      },
    ],
  },
  {
    id: "data-retention",
    heading: "Data Retention",
    body: [
      "We retain personal information for as long as necessary to fulfil the purposes for which it was collected, including to satisfy legal, accounting, or reporting obligations. Business contact and transaction records are generally retained for a minimum of seven years in accordance with applicable Indian law.",
    ],
  },
  {
    id: "data-security",
    heading: "Data Security",
    body: [
      "We implement reasonable technical and organisational measures to protect personal information against unauthorised access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    id: "your-rights",
    heading: "Your Rights",
    body: [
      "Subject to applicable law, you may have the right to:",
      {
        list: [
          "Request access to the personal information we hold about you",
          "Request correction of inaccurate or incomplete information",
          "Request deletion of your personal information, where we are not legally required to retain it",
          "Object to or request restriction of certain processing activities",
        ],
      },
      "To exercise any of these rights, please contact us using the details below. We will respond within a reasonable timeframe and in accordance with applicable law.",
    ],
  },
  {
    id: "cookies",
    heading: "Cookies",
    body: [
      "Our Website may use cookies — small text files stored on your device — to improve your browsing experience and gather basic analytics. You may configure your browser to refuse cookies; however, this may affect certain functionality of the Website.",
    ],
  },
  {
    id: "third-party-links",
    heading: "Third-Party Links",
    body: [
      "Our Website may contain links to third-party websites. Parasmani is not responsible for the privacy practices or content of those websites, and this Policy does not apply to them. We encourage you to review the privacy policies of any third-party sites you visit.",
    ],
  },
  {
    id: "changes-to-this-policy",
    heading: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. The current version will always be available on our Website. We encourage you to review this Policy periodically.",
    ],
  },
];

const CONTACT = {
  heading: "Contact Us",
  intro:
    "If you have any questions, concerns, or requests relating to this Privacy Policy or the handling of your personal information, please contact us at:",
  rows: [
    { label: "Company", value: "Parasmani Tubes Copper Pvt. Ltd." },
    {
      label: "Email",
      value: "sales@parasmanicopper.com",
      href: "mailto:sales@parasmanicopper.com",
    },
    {
      label: "Website",
      value: "parasmanicopper.com",
      href: "https://www.parasmanicopper.com",
    },
    { label: "Address", value: "5/2, GIDC, Umbergaon, Valsad, Gujarat - 396171, INDIA" },
  ],
};

const PrivacyPolicy = () => (
  <LegalLayout
    title="Privacy Policy"
    effective="Effective 2026"
    intro="How Parasmani Tubes Copper Pvt. Ltd. collects, uses, and protects personal information from visitors to parasmanicopper.com and from the people who contact us for business purposes."
    sections={SECTIONS}
    contact={CONTACT}
    crossLink={{
      prefix: "For the rules governing use of this Website, see our",
      to: "/terms-of-service",
      label: "Terms of Service",
    }}
  />
);

export default PrivacyPolicy;
