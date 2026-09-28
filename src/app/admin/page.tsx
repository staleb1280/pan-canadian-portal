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

interface PartnerLawyer {
  id: string;
  name: string;
  firm: string;
  email: string;
  phone: string;
  specialty: string;
}

export default function AdminPortal() {
  const [leads, setLeads] = useState<Lead[]>([]);
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

  useEffect(() => {
    const savedLeads = JSON.parse(localStorage.getItem("investnorth_leads") || "[]");
    setLeads(savedLeads);
  }, []);

  const handleAddLawyer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLawyer.name || !newLawyer.email) return;

    const lawyerEntry: PartnerLawyer = {
      id: "lawyer-" + Date.now(),
      ...newLawyer,
    };

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

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 font-sans pb-20">
      <header className="border-b border-slate-800/80 bg-[#070B14]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-3 py-1 rounded-full font-bold">
              ● Live Admin Portal
            </span>
            <a href="/" className="text-slate-400 hover:text-white text-xs transition">
              View Main Site
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-10 space-y-10">
        <div>
          <h1 className="text-3xl font-black text-white">Investor Leads & Immigration Partner Portal</h1>
          <p className="text-slate-400 text-sm mt-1">
            Track investor audits, signed agreements, retainer payments, and partner law firm referrals.
          </p>
        </div>

        {/* Lead Table */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Investor Lead Submissions</h2>
            <span className="text-xs text-slate-400 font-mono">Total Leads: {leads.length}</span>
          </div>

          {leads.length === 0 ? (
            <div className="p-8 text-center text-slate-500 border border-dashed border-slate-800 rounded-2xl text-xs">
              No leads logged yet. Submit an audit from the Intake Wizard to populate this table.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-mono border-b border-slate-800">
                  <tr>
                    <th className="p-3">Applicant Name</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Liquid Capital</th>
                    <th className="p-3">Agreement</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Assign Lawyer Partner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-950/50 transition">
                      <td className="p-3 font-bold text-white">{lead.fullName || "N/A"}</td>
                      <td className="p-3 text-slate-400">{lead.email}</td>
                      <td className="p-3 text-emerald-400 font-mono">
                        ${lead.investmentFundsCAD ? lead.investmentFundsCAD.toLocaleString() : "0"} CAD
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                            lead.signedAgreement
                              ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {lead.signedAgreement ? "Signed" : "Pending"}
                        </span>
                      </td>
                      <td className="p-3 text-slate-300">{lead.status}</td>
                      <td className="p-3">
                        <select
                          value={lead.referredLawyer || ""}
                          onChange={(e) => handleAssignLawyer(lead.id, e.target.value)}
                          className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-slate-300 text-xs focus:outline-none focus:border-emerald-500"
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
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Partner Lawyers Section */}
        <section className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white">Partner Immigration Lawyers & RCICs</h2>
            <div className="space-y-4">
              {lawyers.map((law) => (
                <div key={law.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-bold text-white">{law.name}</h3>
                      <p className="text-xs text-emerald-400">{law.firm}</p>
                    </div>
                    <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-800 px-2 py-1 rounded-md font-mono">
                      Verified Partner
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 space-y-1 pt-2 border-t border-slate-800/60">
                    <p>📧 Email: <span className="text-slate-200">{law.email}</span></p>
                    <p>📞 Phone: <span className="text-slate-200">{law.phone}</span></p>
                    <p>🎯 Focus: <span className="text-slate-200">{law.specialty}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white">Add New Legal Partner</h2>
            <form onSubmit={handleAddLawyer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Lawyer / RCIC Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Jenkins, Barrister"
                  value={newLawyer.name}
                  onChange={(e) => setNewLawyer({ ...newLawyer, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Firm Name</label>
                <input
                  type="text"
                  placeholder="e.g. Jenkins Immigration Law PC"
                  value={newLawyer.firm}
                  onChange={(e) => setNewLawyer({ ...newLawyer, firm: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="sjenkins@jenkinslaw.ca"
                  value={newLawyer.email}
                  onChange={(e) => setNewLawyer({ ...newLawyer, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+1 (403) 555-0100"
                  value={newLawyer.phone}
                  onChange={(e) => setNewLawyer({ ...newLawyer, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Specialty Stream</label>
                <input
                  type="text"
                  placeholder="e.g. BC Regional / Ontario PNP"
                  value={newLawyer.specialty}
                  onChange={(e) => setNewLawyer({ ...newLawyer, specialty: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition text-xs shadow-lg cursor-pointer"
              >
                + Register Legal Partner
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}