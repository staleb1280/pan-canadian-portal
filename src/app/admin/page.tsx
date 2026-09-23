"use client";
import { useEffect, useState } from "react";

interface Lead {
  id: string;
  fullName: string;
  email: string;
  netWorthCAD: number;
  investmentFundsCAD: number;
  managementExperienceYears: number;
  languageLevelCLB: number;
  date: string;
  status: string;
  signedAgreement?: boolean;
}

export default function AdminPortal() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeTab, setActiveTab] = useState<"leads" | "agreements">("leads");

  useEffect(() => {
    // Fetch leads saved from local submissions
    const storedLeads = localStorage.getItem("investnorth_leads");
    if (storedLeads) {
      try {
        setLeads(JSON.parse(storedLeads));
      } catch (e) {
        console.error("Failed to parse stored leads", e);
      }
    } else {
      // Default sample leads for demonstration
      setLeads([
        {
          id: "lead-101",
          fullName: "Alexander Vance",
          email: "vance@globalcapital.com",
          netWorthCAD: 850000,
          investmentFundsCAD: 350000,
          managementExperienceYears: 5,
          languageLevelCLB: 7,
          date: new Date().toLocaleDateString(),
          status: "Agreement Signed",
          signedAgreement: true,
        },
      ]);
    }
  }, []);

  const clearLeads = () => {
    if (confirm("Are you sure you want to clear the submission log?")) {
      localStorage.removeItem("investnorth_leads");
      setLeads([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Internal Operations & Case Management
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-1">
              InvestNorth Executive Admin Portal
            </h1>
          </div>
          <div className="flex gap-3">
            <a
              href="/"
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-2.5 rounded-xl transition"
            >
              ← Back to Main Site
            </a>
            <button
              onClick={clearLeads}
              className="bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 text-xs font-bold px-4 py-2.5 rounded-xl transition"
            >
              Clear Demo Submissions
            </button>
          </div>
        </div>

        {/* Analytics Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
            <div className="text-xs font-bold text-slate-400 uppercase">Total Audit Submissions</div>
            <div className="text-2xl font-black text-white mt-2">{leads.length}</div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
            <div className="text-xs font-bold text-slate-400 uppercase">Signed Retainer Agreements</div>
            <div className="text-2xl font-black text-emerald-400 mt-2">
              {leads.filter((l) => l.signedAgreement).length}
            </div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
            <div className="text-xs font-bold text-slate-400 uppercase">Avg Liquid Capital</div>
            <div className="text-2xl font-black text-blue-400 mt-2">
              $
              {leads.length > 0
                ? Math.round(
                    leads.reduce((acc, curr) => acc + curr.investmentFundsCAD, 0) / leads.length
                  ).toLocaleString()
                : 0}{" "}
              CAD
            </div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
            <div className="text-xs font-bold text-slate-400 uppercase">Legal Partner Status</div>
            <div className="text-2xl font-black text-amber-400 mt-2">Ready for Referral</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("leads")}
            className={`text-sm font-bold pb-2 transition ${
              activeTab === "leads"
                ? "text-emerald-400 border-b-2 border-emerald-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Investor Submissions ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab("agreements")}
            className={`text-sm font-bold pb-2 transition ${
              activeTab === "agreements"
                ? "text-emerald-400 border-b-2 border-emerald-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Executed Agreements ({leads.filter((l) => l.signedAgreement).length})
          </button>
        </div>

        {/* Leads Table */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Investor Name</th>
                  <th className="p-4">Email Address</th>
                  <th className="p-4">Net Worth (CAD)</th>
                  <th className="p-4">Liquid Investment</th>
                  <th className="p-4">Mgmt Exp / CLB</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-500">
                      No investor leads received yet. Submit the form on the main page to test!
                    </td>
                  </tr>
                ) : (
                  leads
                    .filter((l) => (activeTab === "agreements" ? l.signedAgreement : true))
                    .map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-800/40 transition">
                        <td className="p-4 font-bold text-white">{lead.fullName}</td>
                        <td className="p-4 text-slate-300 font-mono">{lead.email}</td>
                        <td className="p-4 text-emerald-400 font-semibold">
                          ${lead.netWorthCAD?.toLocaleString()} CAD
                        </td>
                        <td className="p-4 text-blue-400 font-semibold">
                          ${lead.investmentFundsCAD?.toLocaleString()} CAD
                        </td>
                        <td className="p-4 text-slate-400">
                          {lead.managementExperienceYears} Yrs / CLB {lead.languageLevelCLB}
                        </td>
                        <td className="p-4 text-slate-500">{lead.date}</td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              lead.signedAgreement
                                ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                                : "bg-blue-950 text-blue-300 border border-blue-800"
                            }`}
                          >
                            {lead.signedAgreement ? "Agreement Signed" : "Audit Completed"}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() =>
                              alert(
                                `Referral Package generated for ${lead.fullName}. Ready for legal partner transmission.`
                              )
                            }
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-[11px] transition"
                          >
                            Refer to Law Firm →
                          </button>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}