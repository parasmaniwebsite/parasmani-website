import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  ChevronDown,
  Check,
  Trash2,
  Eye,
  X,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Building2,
  Wind,
  CalendarClock,
  Calculator,
} from "lucide-react";

/* Shared by the table and the detail modal, so a date or a status badge looks
   the same in both places. */
const formatDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "—";

  const datePart = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const timePart = date
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();

  return `${datePart}, ${timePart}`;
};

const getBadgeColors = (status) => {
  switch (String(status || "").toLowerCase()) {
    case "contacted":
      return "bg-amber-50 text-amber-600 border border-amber-200";
    case "converted":
      return "bg-emerald-50 text-emerald-600 border border-emerald-200";
    case "closed":
      return "bg-slate-100 text-slate-600 border border-slate-200";
    default:
      return "bg-[#E0EBFD] text-[#2563EB] hover:bg-[#D2E4FC]";
  }
};

/* Leads from the project estimator carry extra fields and their own badge.
   Enquiry-form leads have no `source` before this field existed, so anything
   that is not explicitly the estimator is treated as a plain enquiry. */
const isEstimatorLead = (contact) => contact.source === "Project Estimator";

const SourceBadge = ({ contact }) =>
  isEstimatorLead(contact) ? (
    <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-[#F6EDE6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#C27847] uppercase">
      <Calculator size={11} /> Estimator
    </span>
  ) : null;

const ContactTable = ({ contacts, onStatusChange, onDelete }) => {
  const [viewing, setViewing] = useState(null);

  return (
    <>
    {/* Below lg the table would need 1000px of horizontal scrolling, so the
        same rows are stacked as cards instead. */}
    <div className="flex flex-col gap-4 lg:hidden">
      {contacts.length > 0 ? (
        contacts.map((item, index) => (
          <div
            key={item._id || index}
            className="rounded-xl border border-[#ECECEC] bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[12px] font-medium text-[#8A8FA3]">
                  #{contacts.length - index}
                </div>
                <div className="mt-0.5 truncate text-[16px] font-semibold text-[#141C3A]">
                  {item.fullName || "—"}
                </div>
                <SourceBadge contact={item} />
              </div>

              <StatusDropdown
                currentStatus={item.status || "New"}
                onSelect={(newStatus) => onStatusChange(item._id, newStatus)}
              />
            </div>

            <div className="mt-4 flex flex-col gap-1.5 text-[14px]">
              {item.contactNumber && (
                <a
                  href={`tel:${item.contactNumber}`}
                  className="font-medium text-[#C27847]"
                >
                  {item.contactNumber}
                </a>
              )}
              {item.email && (
                <a
                  href={`mailto:${item.email}`}
                  className="break-all text-[#C27847]"
                >
                  {item.email}
                </a>
              )}
            </div>

            <p className="mt-3 line-clamp-2 text-[14px] leading-[21px] text-[#5F6472]">
              {item.message || "—"}
            </p>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#F1F1F1] pt-4">
              <span className="text-[13px] text-[#6D7487]">
                {formatDate(item.createdAt)}
              </span>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => setViewing(item)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#E2E5EC] bg-slate-50 px-3 py-2 text-[13px] font-semibold text-[#141C3A] transition-all hover:bg-slate-100 active:scale-95"
                >
                  <Eye size={15} />
                  <span>View</span>
                </button>
                <button
                  onClick={() => onDelete(item._id)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-[13px] font-semibold text-red-600 transition-all hover:bg-red-100 active:scale-95"
                >
                  <Trash2 size={15} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-xl border border-[#ECECEC] bg-white py-16 text-center text-[15px] text-[#8A8FA3]">
          No enquiries found
        </div>
      )}
    </div>

    <div className="hidden w-full overflow-x-auto bg-white border border-[#ECECEC] rounded-xl shadow-sm lg:block">
      <table className="w-full text-left border-collapse min-w-[1000px]">
        <thead>
          <tr className="border-b border-[#ECECEC] bg-[#F8FAFC]">
            <th className="px-6 py-5 text-[14px] font-semibold text-[#141C3A] w-[60px]">#</th>
            <th className="px-6 py-5 text-[14px] font-semibold text-[#141C3A]">NAME</th>
            <th className="px-6 py-5 text-[14px] font-semibold text-[#141C3A]">PHONE</th>
            <th className="px-6 py-5 text-[14px] font-semibold text-[#141C3A]">EMAIL</th>
            <th className="px-6 py-5 text-[14px] font-semibold text-[#141C3A] max-w-[320px]">MESSAGE</th>
            <th className="px-6 py-5 text-[14px] font-semibold text-[#141C3A] w-[160px]">STATUS</th>
            <th className="px-6 py-5 text-[14px] font-semibold text-[#141C3A]">DATE</th>
            <th className="px-6 py-5 text-[14px] font-semibold text-[#141C3A] w-[200px] text-center">ACTION</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#ECECEC]">
          {contacts.length > 0 ? (
            contacts.map((item, index) => (
              <tr key={item._id || index} className="hover:bg-[#FAFAFA] transition-colors">
                <td className="px-6 py-5 text-[14px] text-[#6D7487]">
                  {contacts.length - index}
                </td>
                <td className="px-6 py-5 text-[14px] font-semibold text-[#141C3A]">
                  <div>{item.fullName || "—"}</div>
                  <SourceBadge contact={item} />
                </td>
                <td className="px-6 py-5 text-[14px] text-[#C27847] font-medium whitespace-nowrap">
                  {item.contactNumber ? (
                    <a href={`tel:${item.contactNumber}`} className="hover:underline">
                      {item.contactNumber}
                    </a>
                  ) : "—"}
                </td>
                <td className="px-6 py-5 text-[14px] text-[#C27847] break-all">
                  {item.email ? (
                    <a href={`mailto:${item.email}`} className="hover:underline">
                      {item.email}
                    </a>
                  ) : "—"}
                </td>
                <td className="px-6 py-5 text-[14px] text-[#5F6472] max-w-[320px] truncate" title={item.message}>
                  {item.message || "—"}
                </td>
                <td className="px-6 py-5">
                  <StatusDropdown
                    currentStatus={item.status || "New"}
                    onSelect={(newStatus) => onStatusChange(item._id, newStatus)}
                  />
                </td>
                <td className="px-6 py-5 text-[14px] text-[#6D7487] whitespace-nowrap">
                  {formatDate(item.createdAt)}
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setViewing(item)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2 text-[13px] font-semibold text-[#141C3A] border border-[#E2E5EC] transition-all hover:bg-slate-100 active:scale-95"
                      title="View Enquiry"
                    >
                      <Eye size={15} />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => onDelete(item._id)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-[13px] font-semibold text-red-600 border border-red-100 transition-all hover:bg-red-100 hover:text-red-700 active:scale-95"
                      title="Delete Enquiry"
                    >
                      <Trash2 size={15} />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="py-16 text-center text-[15px] text-[#8A8FA3]">
                No enquiries found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

      {viewing && (
        <EnquiryModal contact={viewing} onClose={() => setViewing(null)} />
      )}
    </>
  );
};

/* Full enquiry detail, portalled to body so the table's overflow-x-auto
   container cannot clip it. */
const EnquiryModal = ({ contact, onClose }) => {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    // Stop the page behind the overlay scrolling with the wheel.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog so Escape and Tab act on it straight away.
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const estimate = contact.estimate;

  /* The last four only ever have a value on estimator leads, and `rows` drops
     the empty ones, so an enquiry-form lead renders exactly as it did before. */
  const rows = [
    {
      icon: Phone,
      label: "Phone",
      value: contact.contactNumber,
      href: contact.contactNumber ? `tel:${contact.contactNumber}` : null,
    },
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: contact.email ? `mailto:${contact.email}` : null,
    },
    {
      icon: Calendar,
      label: "Received",
      value: formatDate(contact.createdAt),
    },
    { icon: Building2, label: "Company / Firm", value: contact.company },
    { icon: Wind, label: "AC Brand / Make", value: contact.brand },
    { icon: CalendarClock, label: "Project Timeline", value: contact.timeline },
    { icon: Calculator, label: "Source", value: contact.source },
  ].filter((row) => row.value || ["Phone", "Email", "Received"].includes(row.label));

  const estimateFacts = estimate
    ? [
        ["System", estimate.systemLabel],
        ["Project scale", estimate.scale],
        ["Building type", estimate.buildingType],
        ["Location", estimate.city],
        ["Recommended product", estimate.product],
        [
          "Estimated copper",
          estimate.meters ? `~${estimate.meters} m / ${estimate.weight || "—"}` : null,
        ],
      ].filter(([, value]) => value)
    : [];

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#141C3A]/50 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
        // The backdrop closes on click, so stop clicks inside bubbling to it.
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[85vh] w-full max-w-[640px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#ECECEC] px-7 py-5">
          <div className="min-w-0">
            <div className="text-[12px] font-semibold uppercase tracking-wider text-[#8A8FA3]">
              Enquiry Details
            </div>
            <h2
              id="enquiry-modal-title"
              className="mt-1 truncate text-[22px] font-bold text-[#141C3A]"
            >
              {contact.fullName || "—"}
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span
              className={`rounded-lg px-3 py-1.5 text-[13px] font-semibold ${getBadgeColors(contact.status)}`}
            >
              {contact.status || "New"}
            </span>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close"
              className="rounded-lg p-2 text-[#6D7487] transition-colors hover:bg-[#F5F5F5] hover:text-[#141C3A]"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {rows.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="rounded-xl border border-[#ECECEC] bg-[#FAFAFB] p-4"
              >
                <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-[#8A8FA3]">
                  <Icon size={14} />
                  {label}
                </div>
                <div className="mt-2 text-[15px] font-medium break-words text-[#141C3A]">
                  {value ? (
                    href ? (
                      <a href={href} className="text-[#C27847] hover:underline">
                        {value}
                      </a>
                    ) : (
                      value
                    )
                  ) : (
                    "—"
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-[#ECECEC] bg-[#FAFAFB] p-4">
            <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-[#8A8FA3]">
              <MessageSquare size={14} />
              Message
            </div>
            {/* whitespace-pre-wrap keeps the line breaks the sender typed. */}
            <p className="mt-2 text-[15px] leading-[24px] whitespace-pre-wrap break-words text-[#5F6472]">
              {contact.message || "—"}
            </p>
          </div>

          {/* Estimator leads only: what the tool actually quoted them. */}
          {estimate && (
            <div className="mt-4 rounded-xl border border-[#ECECEC] bg-[#FAFAFB] p-4">
              <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-[#8A8FA3]">
                <Calculator size={14} />
                Estimate
              </div>

              <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                {estimateFacts.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[12px] font-medium text-[#8A8FA3]">
                      {label}
                    </dt>
                    <dd className="mt-0.5 text-[14px] font-medium break-words text-[#141C3A]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              {estimate.breakdown?.length > 0 && (
                <div className="mt-4 overflow-hidden rounded-lg border border-[#ECECEC] bg-white">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-[#ECECEC] bg-[#F8FAFC]">
                        <th className="px-3 py-2 text-[12px] font-semibold text-[#141C3A]">
                          SIZE
                        </th>
                        <th className="px-3 py-2 text-right text-[12px] font-semibold text-[#141C3A]">
                          METRES
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F1F1]">
                      {estimate.breakdown.map((line, i) => (
                        <tr key={i}>
                          <td className="px-3 py-2 text-[13px] text-[#5F6472]">
                            {line.size || "—"}
                          </td>
                          <td className="px-3 py-2 text-right text-[13px] font-medium text-[#141C3A]">
                            {line.meters ?? "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-[#ECECEC] bg-[#FAFAFB] px-7 py-4">
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-[#C27847] px-4 py-2.5 text-[14px] font-semibold text-white shadow-sm transition hover:bg-[#a96537]"
            >
              <Mail size={15} /> Reply by Email
            </a>
          )}
          <button
            onClick={onClose}
            className="rounded-lg border border-[#ECECEC] bg-white px-4 py-2.5 text-[14px] font-semibold text-[#141C3A] shadow-sm transition hover:bg-[#F5F5F5]"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

/* Portalized Status Dropdown */
const StatusDropdown = ({ currentStatus, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const statuses = ["New", "Contacted", "Converted", "Closed"];

  const updateCoords = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    updateCoords();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        buttonRef.current && !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      window.addEventListener("resize", updateCoords);
      window.addEventListener("scroll", updateCoords, true);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("resize", updateCoords);
      window.removeEventListener("scroll", updateCoords, true);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={`flex items-center justify-between w-full max-w-[140px] px-3 py-2 rounded-lg text-[14px] font-medium transition-all ${getBadgeColors(currentStatus)}`}
      >
        <span>{currentStatus}</span>
        <ChevronDown size={14} className={`ml-1 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              width: `${Math.max(coords.width, 150)}px`,
            }}
            className="z-[9999] mt-1 overflow-hidden rounded-lg bg-white border border-[#ECECEC] shadow-xl animate-in fade-in slide-in-from-top-1 duration-100"
          >
            <div className="py-1">
              {statuses.map((status) => {
                const isSelected = currentStatus.toLowerCase() === status.toLowerCase();
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      onSelect(status);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-[14px] font-medium transition-colors ${
                      isSelected
                        ? "bg-[#D33629] text-white"
                        : "text-[#141C3A] hover:bg-[#F5F5F5]"
                    }`}
                  >
                    <span>{status}</span>
                    {isSelected && <Check size={14} className="text-white" />}
                  </button>
                );
              })}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default ContactTable;