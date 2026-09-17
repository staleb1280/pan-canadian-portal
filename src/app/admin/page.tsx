"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { calculateEligibility } from "@/lib/pnpScoring";

interface Inquiry {
  id: string;
  created_at: string;
  name: string;
  email: string;
  province: string;
  net_worth: number;
  investment_amount: number;
  status: string;
  document_url?: string;
}

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("pnp_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching inquiries:", error);
    else setInquiries(data || []);
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("pnp_inquiries")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
    }
  };

  const exportToCSV = () => {
    const headers = ["Date,Name,Email,Province,Net Worth (CAD),Investment (CAD),Status\n"];
    const rows = filteredInquiries.map(
      (item) =>
        `"${new Date(item.created_at).toLocaleDateString()}","${item.name}","${item.email}","${item.province}",${item.net_worth},${item.investment_amount},"${item.status}"`
    );
    const blob = new Blob([headers.concat(rows.join("\n")).join("")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pnp_inquiries_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <main className="min-h-screen bg-slate-100 p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">PNP Admin Portal</h1>
            <p className="text-slate-500 text-sm">Review candidate financial profiles and export applicant data.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-emerald-700 text-white text-sm font-medium rounded-md hover:bg-emerald-800 transition"
            >
              Export CSV
            </button>
            <button
              onClick={fetchInquiries}
              className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 transition"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-md text-sm outline-none bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-semibold">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Applicant</th>
                <th className="p-4">Target Province</th>
                <th className="p-4">Net Worth</th>
                <th className="p-4">Investment</th>
                <th className="p-4">PNP Evaluation & Recommendations</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">Loading records...</td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">No matching records found.</td>
                </tr>
              ) : (
                filteredInquiries.map((item) => {
                  const evalResult = calculateEligibility(
                    item.province,
                    item.net_worth,
                    item.investment_amount
                  );

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-4 text-xs text-slate-500">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-900">{item.name}</div>
                        <div className="text-xs text-slate-500">{item.email}</div>
                      </td>
                      <td className="p-4 font-medium">{item.province}</td>
                      <td className="p-4">${item.net_worth?.toLocaleString()}</td>
                      <td className="p-4">${item.investment_amount?.toLocaleString()}</td>
                      <td className="p-4">
                        {evalResult.isEligible ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                            ✓ Eligible
                          </span>
                        ) : (
                          <div className="space-y-1.5">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
                              ✕ Ineligible ({item.province})
                            </span>
                            {evalResult.suggestedAlternatives.length > 0 && (
                              <div className="text-xs text-slate-600">
                                <span className="font-semibold text-blue-700">Recommended: </span>
                                {evalResult.suggestedAlternatives.join(", ")}
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <select
                          value={item.status || "pending"}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          className="px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-300 bg-white text-slate-800 outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="under_review">Under Review</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
