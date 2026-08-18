import { useState, useRef, useEffect } from "react";
import api from "../utils/serviceAPI";
import icon1 from "../assets/contact/Icon1.png";
import icon2 from "../assets/contact/Icon2.png";
import icon3 from "../assets/contact/Icon3.png";
import icon4 from "../assets/contact/Icon4.png";

// Static country codes registry extracted from your options
const COUNTRY_CODES = [
  { code: "91", label: "+91 (India)", iso: "IN" },
  { code: "1", label: "+1 (US)", iso: "US" },
  { code: "44", label: "+44 (GB)", iso: "GB" },
  { code: "213", label: "+213", iso: "DZ" },
  { code: "376", label: "+376", iso: "AD" },
  { code: "244", label: "+244", iso: "AO" },
  { code: "1264", label: "+1264", iso: "AI" },
  { code: "1268", label: "+1268", iso: "AG" },
  { code: "54", label: "+54", iso: "AR" },
  { code: "374", label: "+374", iso: "AM" },
  { code: "297", label: "+297", iso: "AW" },
  { code: "61", label: "+61", iso: "AU" },
  { code: "43", label: "+43", iso: "AT" },
  { code: "994", label: "+994", iso: "AZ" },
  { code: "1242", label: "+1242", iso: "BS" },
  { code: "973", label: "+973", iso: "BH" },
  { code: "880", label: "+880", iso: "BD" },
  { code: "1246", label: "+1246", iso: "BB" },
  { code: "375", label: "+375", iso: "BY" },
  { code: "32", label: "+32", iso: "BE" },
  { code: "501", label: "+501", iso: "BZ" },
  { code: "229", label: "+229", iso: "BJ" },
  { code: "1441", label: "+1441", iso: "BM" },
  { code: "975", label: "+975", iso: "BT" },
  { code: "591", label: "+591", iso: "BO" },
  { code: "387", label: "+387", iso: "BA" },
  { code: "267", label: "+267", iso: "BW" },
  { code: "55", label: "+55", iso: "BR" },
  { code: "673", label: "+673", iso: "BN" },
  { code: "359", label: "+359", iso: "BG" },
  { code: "226", label: "+226", iso: "BF" },
  { code: "257", label: "+257", iso: "BI" },
  { code: "855", label: "+855", iso: "KH" },
  { code: "237", label: "+237", iso: "CM" },
  { code: "1", label: "+1 (Canada)", iso: "CA" },
  { code: "238", label: "+238", iso: "CV" },
  { code: "1345", label: "+1345", iso: "KY" },
  { code: "236", label: "+236", iso: "CF" },
  { code: "56", label: "+56", iso: "CL" },
  { code: "86", label: "+86", iso: "CN" },
  { code: "57", label: "+57", iso: "CO" },
  { code: "269", label: "+269", iso: "KM" },
  { code: "242", label: "+242", iso: "CG" },
  { code: "682", label: "+682", iso: "CK" },
  { code: "506", label: "+506", iso: "CR" },
  { code: "385", label: "+385", iso: "HR" },
  { code: "53", label: "+53", iso: "CU" },
  { code: "90392", label: "+90392", iso: "CY" },
  { code: "357", label: "+357", iso: "CY" },
  { code: "42", label: "+42", iso: "CZ" },
  { code: "45", label: "+45", iso: "DK" },
  { code: "253", label: "+253", iso: "DJ" },
  { code: "1809", label: "+1809", iso: "DM" },
  { code: "593", label: "+593", iso: "EC" },
  { code: "20", label: "+20", iso: "EG" },
  { code: "503", label: "+503", iso: "SV" },
  { code: "240", label: "+240", iso: "GQ" },
  { code: "291", label: "+291", iso: "ER" },
  { code: "372", label: "+372", iso: "EE" },
  { code: "251", label: "+251", iso: "ET" },
  { code: "500", label: "+500", iso: "FK" },
  { code: "298", label: "+298", iso: "FO" },
  { code: "679", label: "+679", iso: "FJ" },
  { code: "358", label: "+358", iso: "FI" },
  { code: "33", label: "+33", iso: "FR" },
  { code: "594", label: "+594", iso: "GF" },
  { code: "689", label: "+689", iso: "PF" },
  { code: "241", label: "+241", iso: "GA" },
  { code: "220", label: "+220", iso: "GM" },
  { code: "7880", label: "+7880", iso: "GE" },
  { code: "49", label: "+49", iso: "DE" },
  { code: "233", label: "+233", iso: "GH" },
  { code: "350", label: "+350", iso: "GI" },
  { code: "30", label: "+30", iso: "GR" },
  { code: "299", label: "+299", iso: "GL" },
  { code: "1473", label: "+1473", iso: "GD" },
  { code: "590", label: "+590", iso: "GP" },
  { code: "671", label: "+671", iso: "GU" },
  { code: "502", label: "+502", iso: "GT" },
  { code: "224", label: "+224", iso: "GN" },
  { code: "245", label: "+245", iso: "GW" },
  { code: "592", label: "+592", iso: "GY" },
  { code: "509", label: "+509", iso: "HT" },
  { code: "504", label: "+504", iso: "HN" },
  { code: "852", label: "+852", iso: "HK" },
  { code: "36", label: "+36", iso: "HU" },
  { code: "354", label: "+354", iso: "IS" },
  { code: "62", label: "+62", iso: "ID" },
  { code: "98", label: "+98", iso: "IR" },
  { code: "964", label: "+964", iso: "IQ" },
  { code: "353", label: "+353", iso: "IE" },
  { code: "972", label: "+972", iso: "IL" },
  { code: "39", label: "+39", iso: "IT" },
  { code: "1876", label: "+1876", iso: "JM" },
  { code: "81", label: "+81", iso: "JP" },
  { code: "962", label: "+962", iso: "JO" },
  { code: "7", label: "+7", iso: "KZ" },
  { code: "254", label: "+254", iso: "KE" },
  { code: "686", label: "+686", iso: "KI" },
  { code: "850", label: "+850", iso: "KP" },
  { code: "82", label: "+82", iso: "KR" },
  { code: "965", label: "+965", iso: "KW" },
  { code: "996", label: "+996", iso: "KG" },
  { code: "856", label: "+856", iso: "LA" },
  { code: "371", label: "+371", iso: "LV" },
  { code: "961", label: "+961", iso: "LB" },
  { code: "266", label: "+266", iso: "LS" },
  { code: "231", label: "+231", iso: "LR" },
  { code: "218", label: "+218", iso: "LY" },
  { code: "417", label: "+417", iso: "LI" },
  { code: "370", label: "+370", iso: "LT" },
  { code: "352", label: "+352", iso: "LU" },
  { code: "853", label: "+853", iso: "MO" },
  { code: "389", label: "+389", iso: "MK" },
  { code: "261", label: "+261", iso: "MG" },
  { code: "265", label: "+265", iso: "MW" },
  { code: "60", label: "+60", iso: "MY" },
  { code: "960", label: "+960", iso: "MV" },
  { code: "223", label: "+223", iso: "ML" },
  { code: "356", label: "+356", iso: "MT" },
  { code: "692", label: "+692", iso: "MH" },
  { code: "596", label: "+596", iso: "MQ" },
  { code: "222", label: "+222", iso: "MR" },
  { code: "52", label: "+52", iso: "MX" },
  { code: "691", label: "+691", iso: "FM" },
  { code: "373", label: "+373", iso: "MD" },
  { code: "377", label: "+377", iso: "MC" },
  { code: "976", label: "+976", iso: "MN" },
  { code: "1664", label: "+1664", iso: "MS" },
  { code: "212", label: "+212", iso: "MA" },
  { code: "258", label: "+258", iso: "MZ" },
  { code: "95", label: "+95", iso: "MN" },
  { code: "264", label: "+264", iso: "NA" },
  { code: "674", label: "+674", iso: "NR" },
  { code: "977", label: "+977", iso: "NP" },
  { code: "31", label: "+31", iso: "NL" },
  { code: "687", label: "+687", iso: "NC" },
  { code: "64", label: "+64", iso: "NZ" },
  { code: "505", label: "+505", iso: "NI" },
  { code: "227", label: "+227", iso: "NE" },
  { code: "234", label: "+234", iso: "NG" },
  { code: "683", label: "+683", iso: "NU" },
  { code: "672", label: "+672", iso: "NF" },
  { code: "670", label: "+670", iso: "NP" },
  { code: "47", label: "+47", iso: "NO" },
  { code: "968", label: "+968", iso: "OM" },
  { code: "680", label: "+680", iso: "PW" },
  { code: "507", label: "+507", iso: "PA" },
  { code: "675", label: "+675", iso: "PG" },
  { code: "595", label: "+595", iso: "PY" },
  { code: "51", label: "+51", iso: "PE" },
  { code: "63", label: "+63", iso: "PH" },
  { code: "48", label: "+48", iso: "PL" },
  { code: "351", label: "+351", iso: "PT" },
  { code: "1787", label: "+1787", iso: "PR" },
  { code: "974", label: "+974", iso: "QA" },
  { code: "262", label: "+262", iso: "RE" },
  { code: "40", label: "+40", iso: "RO" },
  { code: "7", label: "+7", iso: "RU" },
  { code: "250", label: "+250", iso: "RW" },
  { code: "378", label: "+378", iso: "SM" },
  { code: "239", label: "+239", iso: "ST" },
  { code: "966", label: "+966", iso: "SA" },
  { code: "221", label: "+221", iso: "SN" },
  { code: "381", label: "+381", iso: "CS" },
  { code: "248", label: "+248", iso: "SC" },
  { code: "232", label: "+232", iso: "SL" },
  { code: "65", label: "+65", iso: "SG" },
  { code: "421", label: "+421", iso: "SK" },
  { code: "386", label: "+386", iso: "SI" },
  { code: "677", label: "+677", iso: "SB" },
  { code: "252", label: "+252", iso: "SO" },
  { code: "27", label: "+27", iso: "ZA" },
  { code: "34", label: "+34", iso: "ES" },
  { code: "94", label: "+94", iso: "LK" },
  { code: "290", label: "+290", iso: "SH" },
  { code: "1869", label: "+1869", iso: "KN" },
  { code: "1758", label: "+1758", iso: "SC" },
  { code: "249", label: "+249", iso: "SD" },
  { code: "597", label: "+597", iso: "SR" },
  { code: "268", label: "+268", iso: "SZ" },
  { code: "46", label: "+46", iso: "SE" },
  { code: "41", label: "+41", iso: "CH" },
  { code: "963", label: "+963", iso: "SI" },
  { code: "886", label: "+886", iso: "TW" },
  { code: "66", label: "+66", iso: "TH" },
  { code: "228", label: "+228", iso: "TG" },
  { code: "676", label: "+676", iso: "TO" },
  { code: "1868", label: "+1868", iso: "TT" },
  { code: "216", label: "+216", iso: "TN" },
  { code: "90", label: "+90", iso: "TR" },
  { code: "993", label: "+993", iso: "TM" },
  { code: "1649", label: "+1649", iso: "TC" },
  { code: "688", label: "+688", iso: "TV" },
  { code: "256", label: "+256", iso: "UG" },
  { code: "380", label: "+380", iso: "UA" },
  { code: "971", label: "+971", iso: "AE" },
  { code: "598", label: "+598", iso: "UY" },
  { code: "678", label: "+678", iso: "VU" },
  { code: "379", label: "+379", iso: "VA" },
  { code: "58", label: "+58", iso: "VE" },
  { code: "84", label: "+84", iso: "VN" },
  { code: "1284", label: "+1284", iso: "VG" },
  { code: "1340", label: "+1340", iso: "VI" },
  { code: "681", label: "+681", iso: "WF" },
  { code: "967", label: "+967", iso: "YE" },
  { code: "260", label: "+260", iso: "ZM" },
  { code: "263", label: "+263", iso: "ZW" }
];

/**
 * Shared enquiry form — used inline on the Contact page and inside EnquiryModal.
 * Posts to /api/contact, which is what the admin Contacts table reads.
 * `onSuccess` lets the modal close itself once the enquiry goes through.
 */
const EnquiryForm = ({ onSuccess, autoFocus = false }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    countryCode: "91", // Assigned initial state value matching your default
    contactNumber: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Search and selector logic states
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const firstFieldRef = useRef(null);

  // Close country code selection on external wrapper click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (autoFocus) firstFieldRef.current?.focus();
  }, [autoFocus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleCountrySelect = (code) => {
    setFormData((prev) => ({ ...prev, countryCode: code }));
    setDropdownOpen(false);
    setSearchQuery("");
  };

  const validateForm = () => {
    if (!formData.fullName.trim())
      return (setError("Please enter your full name"), false);
    if (!formData.contactNumber.trim())
      return (setError("Please enter your contact number"), false);
    if (!/^[0-9\s\-+()]+$/.test(formData.contactNumber))
      return (setError("Please enter a valid contact number"), false);
    if (!formData.email.trim())
      return (setError("Please enter your email address"), false);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return (setError("Please enter a valid email address"), false);
    if (!formData.message.trim())
      return (setError("Please enter your message"), false);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError("");
      await api.post("/api/contact", {
        fullName: formData.fullName.trim(),
        countryCode: formData.countryCode,
        contactNumber: formData.contactNumber.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });
      setSuccess("Thank you! Your enquiry has been submitted successfully.");
      setFormData({ fullName: "", countryCode: "91", contactNumber: "", email: "", message: "" });
      setTimeout(() => setSuccess(""), 5000);
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit enquiry.");
    } finally {
      setLoading(false);
    }
  };

  // Filter country items dynamically via search bar context
  const filteredCountries = COUNTRY_CODES.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.includes(searchQuery)
  );

  return (
    <>
      {error && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Full Name */}
        <div className="relative border-b border-gray-400/80 pb-2 group">
          <input
            ref={firstFieldRef}
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={70}
            pattern="^[A-Za-z\s\.\']+$"
            title="Name should only contain letters, spaces, or periods."
            className="w-full bg-transparent outline-none text-[14px] text-slate-800 placeholder-gray-400 font-albert pr-8"
          />
          <img
            src={icon1}
            alt=""
            className="absolute right-2 top-0.5 text-slate-400/80 text-sm w-4 h-4 object-contain"
          />
        </div>

        {/* Contact Phone (Updated to Custom Searchable View Layout) */}
        <div className="relative border-b border-gray-400/80 pb-2 flex items-center group z-30" ref={dropdownRef}>
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-transparent outline-none text-[14px] text-slate-700 font-albert mr-2 cursor-pointer pr-1 flex items-center gap-0.5 whitespace-nowrap"
            >
              +{formData.countryCode}
              <span className="text-[10px] text-slate-400/80 select-none">▼</span>
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 max-h-60 bg-white border border-gray-200 rounded-xl shadow-lg overflow-y-auto flex flex-col z-50">
                {/* Search field bar element */}
                <div className="p-2 border-b border-gray-100 sticky top-0 bg-white z-10">
                  <input
                    type="text"
                    placeholder="Search country code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded-lg p-2 outline-none focus:border-slate-400 font-albert"
                  />
                </div>
                {/* Option interface elements matrix */}
                <div className="flex-1">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country, idx) => (
                      <button
                        key={`${country.iso}-${country.code}-${idx}`}
                        type="button"
                        onClick={() => handleCountrySelect(country.code)}
                        className={`w-full text-left px-3 py-2 text-xs font-albert hover:bg-slate-50 transition-colors flex items-center justify-between text-slate-700 ${
                          formData.countryCode === country.code ? "bg-slate-50 font-medium" : ""
                        }`}
                      >
                        <span>{country.label}</span>
                        <span className="text-slate-400">+{country.code}</span>
                      </button>
                    ))
                  ) : (
                    <div className="text-center text-xs text-slate-400 py-3 font-albert">
                      No country found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <input
            type="number"
            name="contactNumber"
            placeholder="Contact"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            pattern="^[0-9]{7,12}$"
            title="Please enter a valid phone number (7 to 12 digits)."
            className="w-full bg-transparent outline-none text-[14px] text-slate-800 placeholder-gray-400 font-albert pl-1 pr-8"
          />
          <img
            src={icon2}
            alt=""
            className="absolute right-2 top-0.5 text-slate-400/80 text-sm w-4 h-4 object-contain"
          />
        </div>

        {/* Email */}
        <div className="relative border-b border-gray-400/80 pb-2 group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            title="Please enter a valid email address."
            className="w-full bg-transparent outline-none text-[14px] text-slate-800 placeholder-gray-400 font-albert pr-8"
          />
          <img
            src={icon3}
            alt=""
            className="absolute right-2 top-0.5 text-slate-400/80 text-sm w-4 h-4 object-contain"
          />
        </div>

        {/* Message Layout */}
        <div className="relative border-b border-gray-400/80 pb-1 group">
          <textarea
            rows="2"
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
            minLength={10}
            maxLength={300}
            title="Message must be between 10 and 300 characters."
            className="w-full bg-transparent outline-none text-[14px] text-slate-800 placeholder-gray-400 resize-none font-albert pr-8 pt-1"
          ></textarea>
          <img
            src={icon4}
            alt=""
            className="absolute right-2 top-0.5 text-slate-400/80 text-sm w-4 h-4 object-contain"
          />
          {/* Micro character counter layout alignment */}
          <div className="text-right text-[10px] text-slate-400 font-albert mt-0.5">
            {(formData.message || "").length} / 300 characters
          </div>
        </div>

        {/* Action Button Layer */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="b2 bg-[#131E3D] text-white px-9 py-3.5 rounded-full font-medium tracking-wide hover:bg-[#0B1226] transition-all cursor-pointer active:scale-95 disabled:opacity-60 text-center whitespace-nowrap"
          >
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>
        </div>
      </form>
    </>
  );
};

export default EnquiryForm;
