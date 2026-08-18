import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import ContactTable from "../../components/admin/ContactTable.jsx";
import api from "../../utils/serviceAPI";
import {
  RefreshCw,
  Download,
  Users,
  Mail,
  PhoneCall,
  CheckCircle,
} from "lucide-react";

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Tabs state
  const [activeTab, setActiveTab] = useState("enquiry");

  // Filter States (Matching default mockup dates)
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Analytical Metrics State
  const [metrics, setMetrics] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    converted: 0,
  });

  const getContacts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/api/contact");

      console.log("API response:", res.data);

      const data = res.data?.contacts || [];

      console.log("Contacts:", data);

      setContacts(data);
      calculateMetrics(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);

      setError(error.response?.data?.message || "Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  const calculateMetrics = (data) => {
    const total = data.length;
    const newLeads = data.filter(
      (c) => c.status?.toLowerCase() === "new" || !c.status,
    ).length;
    const contacted = data.filter(
      (c) => c.status?.toLowerCase() === "contacted",
    ).length;
    const converted = data.filter(
      (c) => c.status?.toLowerCase() === "converted",
    ).length;
    setMetrics({ total, new: newLeads, contacted, converted });
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await api.patch(`/api/contact/${id}/status`, {
        status: newStatus,
      });

      if (res.data.success) {
        const updated = contacts.map((c) =>
          c._id === id ? { ...c, status: res.data.contact.status } : c,
        );
        setContacts(updated);
        calculateMetrics(updated);
      }
    } catch (error) {
      console.error("Error updating status via PATCH:", error);
      alert(
        error.response?.data?.message ||
          "Failed to update status configuration",
      );
    }
  };

  const handleDeleteContact = async (id) => {
    if (
      !window.confirm(
        "Are you absolutely sure you want to remove this enquiry entry permanently?",
      )
    ) {
      return;
    }
    try {
      await api.delete(`/api/contact/${id}`);

      const updated = contacts.filter((c) => c._id !== id);
      setContacts(updated);
      calculateMetrics(updated);
    } catch (error) {
      console.error("Error deleting contact record:", error);
      alert(error.response?.data?.message || "Failed to delete record entry");
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  // Filter Logic client-side processing
  useEffect(() => {
    let result = [...contacts];

    // Status filter
    if (statusFilter !== "All") {
      result = result.filter(
        (c) => (c.status || "New").toLowerCase() === statusFilter.toLowerCase(),
      );
    }

    // From date filter
    if (fromDate) {
      result = result.filter(
        (c) => new Date(c.createdAt) >= new Date(fromDate),
      );
    }

    // To date filter
    if (toDate) {
      const endOfDay = new Date(toDate);

      endOfDay.setHours(23, 59, 59, 999);

      result = result.filter((c) => new Date(c.createdAt) <= endOfDay);
    }

    console.log("Filtered Contacts:", result);

    setFilteredContacts(result);
  }, [contacts, statusFilter, fromDate, toDate]);

  const exportToCSV = () => {
    // Quote every field so the estimator's multi-line message and any comma in
    // a company name cannot shift the columns.
    const cell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

    const headers = [
      "ID,Source,Name,Company,Phone,Email,Brand,Timeline,Estimated Metres,Estimated Weight,Message,Status,Date\n",
    ];
    const rows = filteredContacts.map((c, index) =>
      [
        index + 1,
        cell(c.source || "Enquiry Form"),
        cell(c.fullName),
        cell(c.company),
        cell(c.contactNumber),
        cell(c.email),
        cell(c.brand),
        cell(c.timeline),
        cell(c.estimate?.meters),
        cell(c.estimate?.weight),
        cell(c.message),
        cell(c.status || "New"),
        cell(c.createdAt),
      ].join(","),
    );
    const blob = new Blob([headers + rows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute(
      "download",
      `Leads_Export_${new Date().toISOString().split("T")[0]}.csv`,
    );
    a.click();
  };

  return (
    <AdminLayout title="Enquiries">
      <div>
        {/* TOP SEGMENTED NAVIGATION TABS — bled back out to full width so it
            still sits flush under the navbar inside the padded layout. */}
        <div className="-mx-4 -mt-4 mb-6 flex overflow-x-auto border-b border-[#ECECEC] bg-white px-4 sm:-mx-6 sm:-mt-6 sm:px-6 lg:-mx-10 lg:-mt-10 lg:px-10">
          <button
            onClick={() => setActiveTab("enquiry")}
            className={`flex items-center gap-2.5 px-6 py-4 text-[14px] font-bold tracking-wide transition-all border-b-[3px] ${
              activeTab === "enquiry"
                ? "border-[#141C3A] text-[#141C3A]"
                : "border-transparent text-[#8A8FA3] hover:text-[#5F6472]"
            }`}
          >
            <span className="flex h-[22px] px-1.5 min-w-[22px] items-center justify-center rounded-full bg-[#141C3A] text-[11px] font-bold text-white">
              {metrics.total}
            </span>
            ENQUIRY LEADS
          </button>
          {/* <button
            onClick={() => setActiveTab("hardcopy")}
            className={`flex items-center gap-2 px-6 py-4 text-[14px] font-bold tracking-wide transition-all border-b-[3px] ${
              activeTab === "hardcopy"
                ? "border-[#141C3A] text-[#141C3A]"
                : "border-transparent text-[#8A8FA3] hover:text-[#5F6472]"
            }`}
          >
            HARD COPY REQUESTS
          </button> */}
        </div>

        <div className="mx-auto max-w-[1600px]">
          {/* ANALYTICAL OVERVIEW CARDS (Perfect Target Theme Match) */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
            <div className="rounded-xl border border-[#ECECEC] bg-white p-6 shadow-sm flex items-start justify-between">
              <div>
                <div className="text-[13px] font-semibold tracking-wider text-[#8A8FA3] uppercase">
                  Total Leads
                </div>
                <div className="mt-2 text-[38px] font-bold text-[#141C3A] leading-none">
                  {metrics.total}
                </div>
              </div>
              <div className="p-3 bg-slate-50 text-[#141C3A] rounded-xl border border-slate-100">
                <Users size={20} />
              </div>
            </div>
            <div className="rounded-xl border border-[#ECECEC] bg-white p-6 shadow-sm flex items-start justify-between">
              <div>
                <div className="text-[13px] font-semibold tracking-wider text-[#8A8FA3] uppercase">
                  New
                </div>
                <div className="mt-2 text-[38px] font-bold text-[#2563EB] leading-none">
                  {metrics.new}
                </div>
              </div>
              <div className="p-3 bg-blue-50 text-[#2563EB] rounded-xl border border-blue-100">
                <Mail size={20} />
              </div>
            </div>
            <div className="rounded-xl border border-[#ECECEC] bg-white p-6 shadow-sm flex items-start justify-between">
              <div>
                <div className="text-[13px] font-semibold tracking-wider text-[#8A8FA3] uppercase">
                  Contacted
                </div>
                <div className="mt-2 text-[38px] font-bold text-amber-500 leading-none">
                  {metrics.contacted}
                </div>
              </div>
              <div className="p-3 bg-amber-50 text-amber-500 rounded-xl border border-amber-100">
                <PhoneCall size={20} />
              </div>
            </div>
            <div className="rounded-xl border border-[#ECECEC] bg-white p-6 shadow-sm flex items-start justify-between">
              <div>
                <div className="text-[13px] font-semibold tracking-wider text-[#8A8FA3] uppercase">
                  Converted
                </div>
                <div className="mt-2 text-[38px] font-bold text-emerald-600 leading-none">
                  {metrics.converted}
                </div>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                <CheckCircle size={20} />
              </div>
            </div>
          </div>

          {/* DYNAMIC FILTER TOOLBAR */}
          <div className="mb-6 grid grid-cols-1 items-end gap-4 rounded-xl border border-[#ECECEC] bg-white p-5 shadow-sm sm:grid-cols-2 xl:grid-cols-12">
            <div className="xl:col-span-3">
              <label className="text-[12px] font-semibold uppercase tracking-wider text-[#6D7487]">
                From Date
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#ECECEC] px-3 py-2.5 text-[14px] text-[#141C3A] font-medium focus:outline-none focus:border-slate-400"
              />
            </div>
            <div className="xl:col-span-3">
              <label className="text-[12px] font-semibold uppercase tracking-wider text-[#6D7487]">
                To Date
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#ECECEC] px-3 py-2.5 text-[14px] text-[#141C3A] font-medium focus:outline-none focus:border-slate-400"
              />
            </div>
            <div className="xl:col-span-3">
              <label className="text-[12px] font-semibold uppercase tracking-wider text-[#6D7487]">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#ECECEC] bg-white px-3 py-2.5 text-[14px] text-[#141C3A] font-medium focus:outline-none focus:border-slate-400"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Converted">Converted</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="flex gap-3 sm:col-span-2 xl:col-span-3">
              <button
                onClick={getContacts}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#ECECEC] bg-white px-4 py-2.5 text-[14px] font-semibold text-[#141C3A] hover:bg-[#FAFAFA] transition shadow-sm"
              >
                <RefreshCw size={15} /> Refresh
              </button>
              <button
                onClick={exportToCSV}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#C27847] px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-[#a96537] transition shadow-sm"
              >
                <Download size={15} /> Download CSV
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-100 p-4 text-red-700 font-medium text-[14px]">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex h-[350px] items-center justify-center rounded-xl border border-dashed border-[#ECECEC] bg-white">
              <div className="flex flex-col items-center gap-2">
                <RefreshCw size={24} className="animate-spin text-slate-400" />
                <p className="text-[#8A8FA3] font-medium text-[14px]">
                  Loading dashboard enquiries...
                </p>
              </div>
            </div>
          ) : (
            <ContactTable
              contacts={filteredContacts}
              onStatusChange={handleUpdateStatus}
              onDelete={handleDeleteContact} // Wired safely directly into the portal component
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminContact;
