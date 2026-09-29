"use client";
import { useState, useEffect } from "react";
import Logo from "../../Components/Branding/Logo";

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
  signedAgreement: boolean;
  referredLawyer?: string;
}

interface B2BOrder {
  lawyerName: string;
  firmName: string;
  lawyerEmail: string;
  lawyerPhone: string;
  clientName: string;
  targetProvince: string;
  serviceRequested: string;
  wholesaleFee: string;
}

interface PartnerLawyer {
  id: string;
  name: string;
  firm: string;
  email: string;
  phone: string;
  specialty: string;
}

export default function ProtectedAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [b2bOrders, setB2bOrders] = useState<B2BOrder[]>([]);
  const [lawyers, setLawyers] = useState<PartnerLawyer[]>([
    {
      id: "law-1",
      name: "Marcus Vance, Barrister & Solicitor",
      firm: "Vance Canadian Immigration Law",
      email: "mvance@vancelaw.ca",
      phone: "+1 (403) 555-0192",
      specialty: "Alberta & BC Provincial Nominee Streams",
    },
    {
      id: "law-2",
      name: "Elena Rostova, RCIC-IRB",
      firm: "Northern Horizon Legal Advisory",
      email: "elena@nhlegal.ca",
      phone: "+1 (604) 555-0144",
      specialty: "Regional Entrepreneur & Rural Pilot Streams",
    },
  ]);

  const [newLawyer, setNewLawyer] = useState({
    name: "",
    firm: "",
    email: "",
    phone: "",
    specialty: "",
  });

  // Default Passcode: InvestNorth2026! (or set via environment variable)
  const ADMIN_PASSCODE = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "InvestNorth2026!";

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("investnorth_admin_authed");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
    }

    const savedLeads = JSON.parse(localStorage.getItem("investnorth_leads") || "[]");
    const savedOrders = JSON.parse(localStorage.getItem("investnorth_b2b_orders") || "[]");
    setLeads(savedLeads);
    setB2bOrders(savedOrders);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      setAuthError(false);
      sessionStorage.setItem("investnorth_admin_authed", "true");
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("investnorth_admin_authed");
  };

  const handleAddLawyer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLawyer.name || !newLawyer.email) return;
    const lawyerEntry: PartnerLawyer = { id: "lawyer-" + Date.now(), ...newLawyer };
    setLawyers([...lawyers, lawyerEntry]);
    setNewLawyer({ name: "", firm: "", email: "", phone: "", specialty: "" });
  };

  const handleAssignLawyer = (leadId: string, lawyerName: string) => {
    const updated = leads.map((lead) => {
      if (lead.id === leadId) {
        return {
          ...lead,
          referredLawyer: lawyerName,
          status: `Referred to ${lawyerName.split(",")[0]}`,
        };
      }
      return lead;
    });
    setLeads(updated);
    localStorage.setItem("investnorth_leads", JSON.stringify(updated));
  };

  // PASSWORD LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070B14] flex items-center justify-center p-6 text-slate-100">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-white">Executive Admin Security Gate</h1>
            <p className="text-xs text-slate-400">Restricted Portal. Authorized personnel only.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Admin Passcode"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 text-center tracking-widest"
            />
            {authError && (
              <p className="text-xs text-rose-400 font-semibold">
                Invalid passcode. Access denied.
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition text-xs cursor-pointer"
            >
              Authenticate & Unlock Portal
            </button>
          </form>
          <p className="text-[10px] text-slate-600">InvestNorth Canada Internal Operating System</p>
        </div>
      </div>
    );
  }

  // PROTECTED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 p-6 space-y-8 font-sans">
      {/* Header */}
      <header className="max-w-7xl mx-auto flex justify-between items-center border-b border-slate-800 pb-4">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 px-3 py-1 rounded-full">
            ● Authorized Admin Portal
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
        >
          🔒 Lock & Exit Portal
        </button>
      </header>

      <main className="max-w-7xl mx-auto space-y-10">
        {/* Section 1: Investor Leads Table */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center justify-between">
            <span>Direct Investor Intake Leads</span>
            <span className="text-xs text-slate-400 font-normal">Total: {leads.length}</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3">Applicant Name</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Liquid Capital</th>
                  <th className="p-3">Agreement</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Assign Law Firm Partner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-slate-500 font-mono">
                      No investor leads logged yet.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-950/50 transition">
                      <td className="p-3 font-bold text-white">{lead.fullName || "N/A"}</td>
                      <td className="p-3 text-slate-400">{lead.email}</td>
                      <td className="p-3 text-emerald-400 font-mono">
                        ${lead.investmentFundsCAD ? lead.investmentFundsCAD.toLocaleString() : "0"} CAD
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${lead.signedAgreement ? "bg-emerald-950 text-emerald-400" : "bg-slate-800 text-slate-400"}`}>
                          {lead.signedAgreement ? "Signed" : "Pending"}
                        </span>
                      </td>
                      <td className="p-3 text-slate-300">{lead.status}</td>
                      <td className="p-3">
                        <select
                          value={lead.referredLawyer || ""}
                          onChange={(e) => handleAssignLawyer(lead.id, e.target.value)}
                          className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
                        >
                          <option value="">Select Immigration Legal Partner...</option>
                          {lawyers.map((law) => (
                            <option key={law.id} value={law.name}>
                              {law.name} ({law.firm})
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Lawyer B2B Client Submissions */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center justify-between">
            <span>Immigration Law Firm & RCIC Orders</span>
            <span className="text-xs text-slate-400 font-normal">Total Orders: {b2bOrders.length}</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3">Lawyer / Firm</th>
                  <th className="p-3">Lawyer Contact</th>
                  <th className="p-3">Client File ID</th>
                  <th className="p-3">Target Province</th>
                  <th className="p-3">Service Requested</th>
                  <th className="p-3">Wholesale Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {b2bOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-slate-500 font-mono">
                      No lawyer client orders submitted yet.
                    </td>
                  </tr>
                ) : (
                  b2bOrders.map((order, idx) => (
                    <tr key={idx} className="hover:bg-slate-950/50 transition">
                      <td className="p-3 font-bold text-white">
                        {order.lawyerName} <div className="text-[10px] text-slate-400 font-normal">{order.firmName}</div>
                      </td>
                      <td className="p-3 text-slate-400">{order.lawyerEmail} <br /> {order.lawyerPhone}</td>
                      <td className="p-3 text-emerald-400 font-mono">{order.clientName}</td>
                      <td className="p-3 text-slate-300">{order.targetProvince}</td>
                      <td className="p-3 text-white">{order.serviceRequested}</td>
                      <td className="p-3 font-mono font-bold text-emerald-400">{order.wholesaleFee}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Registered Legal Partners Management */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
          <h2 className="text-lg font-bold text-white">Partner Law Firms Directory</h2>
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                {lawyers.map((law) => (
                  <div key={law.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-1 text-xs">
                    <div className="font-bold text-white">{law.name}</div>
                    <div className="text-emerald-400 text-[11px]">{law.firm}</div>
                    <div className="text-slate-400 text-[10px]">📧 {law.email}</div>
                    <div className="text-slate-400 text-[10px]">🎯 {law.specialty}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white">+ Register New Partner Law Firm</h3>
              <form onSubmit={handleAddLawyer} className="space-y-2 text-xs">
                <input
                  type="text"
                  placeholder="Lawyer Name & Title"
                  value={newLawyer.name}
                  onChange={(e) => setNewLawyer({ ...newLawyer, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  placeholder="Law Firm Name"
                  value={newLawyer.firm}
                  onChange={(e) => setNewLawyer({ ...newLawyer, firm: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="email"
                  placeholder="Partner Email Address"
                  value={newLawyer.email}
                  onChange={(e) => setNewLawyer({ ...newLawyer, email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 rounded-lg transition"
                >
                  Save Partner Legal Firm
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}