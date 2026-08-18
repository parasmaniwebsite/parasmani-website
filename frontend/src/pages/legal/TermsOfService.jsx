import LegalLayout from "./LegalLayout";

/**
 * Copy is transcribed from the client's "Parasmani Terms of Service" hand-off
 * document. Treat that document as the source of truth — reword here only
 * when an updated version is supplied.
 */
const SECTIONS = [
  {
    id: "introduction",
    heading: "Introduction",
    body: [
      'Parasmani Tubes Copper Pvt. Ltd. ("Parasmani", "we", "us", or "our"), with its registered office at GIDC Umbergaon, Valsad, Gujarat, and a sales office in Mumbai, Maharashtra, India, operates the website parasmanicopper.com (the "Website").',
      'By accessing or using the Website, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Website. These Terms should be read together with our Privacy Policy, which explains how we handle personal information, and any applicable Cookie Policy governing the use of cookies on the Website.',
    ],
  },
  {
    id: "purpose-of-the-website",
    heading: "Purpose of the Website",
    body: [
      "The Website provides information about Parasmani's products — including seamless copper tubes, pancake coils, and copper fittings — along with technical resources, downloads, the Knowledge Centre, engineering tools, and a means of contacting us for business enquiries.",
      "The Website is informational in nature. It does not constitute an online store, and no products are sold or contracted for directly through the Website. All commercial transactions, pricing, and delivery terms are governed by separate purchase orders, quotations, or agreements executed directly with Parasmani.",
      "In the event of any inconsistency between information published on the Website and an official quotation, purchase order, technical drawing, or written communication issued by Parasmani, the latter shall prevail.",
    ],
  },
  {
    id: "permitted-use",
    heading: "Permitted Use",
    body: [
      "You may use the Website for lawful purposes connected to evaluating or procuring Parasmani's products and services. You agree not to:",
      {
        list: [
          "Copy, reproduce, or republish content from the Website without our prior written consent",
          "Use any automated system (bots, scrapers, or crawlers) to extract data from the Website, including for automated data extraction, AI model training, dataset creation, or similar automated collection",
          "Attempt to gain unauthorised access to the Website, its systems, or related accounts",
          "Use the Website in any way that could damage, disable, or impair its functioning, or interfere with any other party's use of it",
          "Misrepresent your identity or affiliation when submitting an enquiry",
        ],
      },
    ],
  },
  {
    id: "website-security",
    heading: "Website Security",
    body: [
      "You shall not introduce malware or other malicious code, conduct denial-of-service attacks, attempt penetration testing, reverse engineer any Website functionality, or otherwise interfere with the security of the Website.",
    ],
  },
  {
    id: "intellectual-property",
    heading: "Intellectual Property",
    body: [
      "All content on the Website — including text, product specifications, product photographs, technical drawings, Knowledge Centre articles, calculators and tools, logos, and layout — is the property of Parasmani Tubes Copper Pvt. Ltd. or its licensors, and is protected by applicable intellectual property laws.",
      "No licence is granted to you to use any Parasmani trademark, trade name, or logo without our prior written permission. Nothing contained on the Website shall be construed as granting any licence or right to use Parasmani's intellectual property except as expressly permitted under these Terms.",
      "References to third-party brand names on the Website (including OEM and VRF/VRV compatibility listings) are for informational purposes only, to indicate technical compatibility. Compatibility information does not constitute OEM approval unless expressly stated, and such references do not imply any endorsement, sponsorship, or partnership by the respective brand owners. All third-party trademarks remain the property of their respective owners.",
    ],
  },
  {
    id: "downloads",
    heading: "Downloads",
    body: [
      "Documents, catalogues, certificates, technical literature, and other downloadable materials made available on the Website are provided for informational purposes only. You may download these solely for the purpose of evaluating Parasmani's products and services. Redistribution, modification, commercial reuse, or publication of downloaded materials without our prior written permission is prohibited.",
    ],
  },
  {
    id: "knowledge-centre",
    heading: "Knowledge Centre",
    body: [
      "Articles, guides, application notes, and other technical resources published in the Knowledge Centre are intended for general informational purposes only and should not be treated as engineering advice, professional consultancy, or installation instructions. You should seek appropriate professional or technical advice before acting on any such content.",
      "Certain informational content, engineering tools, or Knowledge Centre resources may be generated or assisted using automated technologies, including AI-based tools. Such content is provided for general guidance only and should be independently verified before you rely on it.",
    ],
  },
  {
    id: "product-information-and-tools",
    heading: "Product Information and Engineering Tools",
    body: [
      "We take reasonable care to keep product specifications, applicable standards references, and certification details on the Website accurate and up to date. However:",
      {
        list: [
          "Product specifications, dimensions, performance and pressure values, technical drawings, standards references, certifications, illustrations, photographs, and application information published on the Website are indicative only and do not constitute any representation, warranty, or contractual commitment unless expressly incorporated into a written quotation, purchase order, or signed agreement issued by Parasmani",
          "Product suitability depends on the specific application and operating conditions. Users remain responsible for verifying that the selected product is appropriate for their intended use",
          "The Weight Calculator, Pressure Calculator, Project Estimator, Unit Converter, and any other engineering tools on the Website — including but not limited to any future tools we may add — provide estimates only, intended to assist preliminary evaluation. Outputs are not a substitute for formal quotations, engineering drawings, or datasheets, and must be independently verified before use in procurement, design, or installation decisions",
          "Certifications and approvals displayed on the Website are current as of the stated date and remain subject to periodic audit and renewal; please contact us for the latest certificate copies",
          "We reserve the right to modify product specifications, discontinue products, or update standards compliance information at any time without prior notice",
        ],
      },
    ],
  },
  {
    id: "enquiries-and-communications",
    heading: "Enquiries and Communications",
    body: [
      "Information submitted through our contact or enquiry forms is used to respond to your enquiry and, where relevant, to progress a business relationship, in accordance with our Privacy Policy.",
      "Submitting an enquiry does not create any binding obligation on Parasmani to supply goods or services. Any resulting business relationship is governed exclusively by the terms of a separately executed purchase order, quotation, or contract.",
      "We aim to respond to genuine business enquiries in a timely manner but do not guarantee any specific response time unless separately agreed in writing.",
      "By using the Website or submitting an enquiry, you consent to receive communications electronically relating to your enquiry or business relationship.",
    ],
  },
  {
    id: "user-submissions",
    heading: "User Submissions",
    body: [
      "Any drawings, specifications, enquiry details, RFQs, or other materials you submit through the Website remain your property. By submitting them, you grant Parasmani a non-exclusive licence to use them solely for evaluating, responding to, and servicing your enquiry. Unless otherwise agreed in writing, submissions shall not be treated as confidential.",
      "You should not submit confidential or proprietary information through Website forms unless it is protected by a separate written confidentiality or non-disclosure agreement.",
    ],
  },
  {
    id: "accuracy-and-availability",
    heading: "Accuracy and Availability",
    body: [
      "We make reasonable efforts to ensure the Website is accurate, current, and available. However, we do not warrant that the Website will be uninterrupted, error-free, or free of technical inaccuracies, and we reserve the right to correct, update, or remove content, or to suspend or discontinue the Website (or any part of it), at any time without notice.",
      'The Website and all content, downloads, engineering tools, calculators, specifications, technical information, and materials are provided on an "as is" and "as available" basis without warranties of any kind, whether express, implied, statutory, or otherwise, including warranties of merchantability, fitness for a particular purpose, accuracy, completeness, non-infringement, uninterrupted availability, or freedom from errors.',
    ],
  },
  {
    id: "limitation-of-liability",
    heading: "Limitation of Liability",
    body: [
      "To the fullest extent permitted by applicable law, Parasmani shall not be liable for any indirect, incidental, special, or consequential loss or damage arising from your use of, or inability to use, the Website, including reliance on any calculator, estimator, or other tool output, or on any content that has since been updated or superseded.",
      "Nothing in these Terms limits or excludes liability that cannot lawfully be limited or excluded under applicable Indian law.",
    ],
  },
  {
    id: "indemnity",
    heading: "Indemnity",
    body: [
      "You agree to indemnify, defend, and hold harmless Parasmani Tubes Copper Pvt. Ltd., its directors, officers, employees, and affiliates from any claims, liabilities, damages, costs, and expenses arising from your misuse of the Website, breach of these Terms, or violation of applicable law.",
    ],
  },
  {
    id: "force-majeure",
    heading: "Force Majeure",
    body: [
      "Parasmani shall not be liable for any failure, interruption, or delay in making the Website available due to events beyond its reasonable control, including natural disasters, internet or telecommunications failures, cyber incidents, government actions, labour disputes, pandemics, or other force majeure events.",
    ],
  },
  {
    id: "export-compliance",
    heading: "Export Compliance",
    body: [
      "Users are responsible for complying with all applicable export control laws, sanctions regulations, and trade restrictions relevant to their jurisdiction and their intended use of Parasmani's products.",
    ],
  },
  {
    id: "third-party-links",
    heading: "Third-Party Links",
    body: [
      "The Website may contain links to third-party websites, including industry bodies, standards organisations, or partner resources. These links are provided for convenience only. Parasmani does not control and is not responsible for the content, accuracy, or privacy practices of any linked third-party website.",
    ],
  },
  {
    id: "suspension-or-termination",
    heading: "Suspension or Termination",
    body: [
      "Parasmani reserves the right to suspend, restrict, or terminate your access to the Website, without prior notice, where it reasonably believes these Terms have been violated or the Website is being misused.",
    ],
  },
  {
    id: "governing-law",
    heading: "Governing Law and Jurisdiction",
    body: [
      "These Terms are governed by the laws of India. Any dispute arising out of or in connection with these Terms or your use of the Website shall be subject to the exclusive jurisdiction of the courts at Valsad, Gujarat.",
    ],
  },
  {
    id: "general-provisions",
    heading: "General Provisions",
    body: [
      {
        list: [
          {
            lead: "Severability.",
            text: "If any provision of these Terms is held unenforceable, the remaining provisions shall remain in full force and effect.",
          },
          {
            lead: "Entire Agreement.",
            text: "These Terms govern use of the Website only and do not replace or modify any quotation, purchase order, supply agreement, or other commercial contract executed between Parasmani and its customers.",
          },
          {
            lead: "Waiver.",
            text: "Failure by Parasmani to enforce any provision of these Terms shall not constitute a waiver of its right to enforce that provision, or any other provision, in the future.",
          },
        ],
      },
    ],
  },
  {
    id: "changes-to-these-terms",
    heading: "Changes to These Terms",
    body: [
      "We may update these Terms from time to time to reflect changes in our practices, products, or applicable law. The current version will always be available on the Website, and material changes will be indicated by an updated effective date. Continued use of the Website after changes are posted constitutes acceptance of the revised Terms.",
    ],
  },
];

const CONTACT = {
  heading: "Contact Us",
  intro: "If you have any questions about these Terms, please contact us at:",
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
    {
      label: "Address",
      value: "5/2, GIDC, Umbergaon, Valsad, Gujarat - 396171, INDIA",
    },
  ],
};

const TermsOfService = () => (
  <LegalLayout
    title="Terms of Service"
    effective="Effective 2026"
    intro="The terms on which Parasmani Tubes Copper Pvt. Ltd. makes parasmanicopper.com — its product information, downloads, Knowledge Centre and engineering tools — available to you."
    sections={SECTIONS}
    contact={CONTACT}
    crossLink={{
      prefix: "For how we handle personal information, see our",
      to: "/privacy-policy",
      label: "Privacy Policy",
    }}
  />
);

export default TermsOfService;
