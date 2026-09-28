"use client";
import { useState } from "react";

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

export default function LawyerB2BPortal() {
  const [formData, setFormData] = useState({
    lawyerName: "",
    firmName: "",
    lawyerEmail: "",
    lawyerPhone: "",
    clientName: "",
    targetProvince: "Alberta",
    serviceRequested: "Full EDO Business Plan Package",
  });

  const [submittedOrder, setSubmittedOrder] = useState<B2BOrder | null>(null);

  const SERVICE_PRICING: Record<string, string> = {
    "Full EDO Business Plan Package": "$3,200 CAD (Wholesale B2B Rate)",
    "Commercial Target Sourcing & Site Matching": "$2,500 CAD (Wholesale B2B Rate)",
    "Turnkey Expansion Bundle (Plan + Site + EDO Letter Brief)": "$5,500 CAD (Wholesale B2B Rate)",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const order: B2BOrder = {
      ...formData,
      wholesaleFee: SERVICE_PRICING[formData.serviceRequested] || "$3,200 CAD",
    };

    setSubmittedOrder(order);

    // Store B2B Order in Local Storage
    const existingOrders = JSON.parse(localStorage.getItem("investnorth_b2b_orders") || "[]");
    localStorage.setItem("investnorth_b2b_orders", JSON.stringify([order, ...existingOrders]));
  };

  return (
    <section id="lawyer-b2b" className="py-16 px-6 max-w-7xl mx-auto">
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/60 border border-blue-800/60 px-4 py-1.5 rounded-full inline-block">
            Immigration Law Firm & RCIC Wholesale Portal
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Outsource Business Plans & Site Sourcing For Your Clients
          </h2>
          <p className="text-slate-400 text-sm">
            Are you an immigration lawyer or RCIC with an investor client? Register below to submit client details. InvestNorth handles the municipal business plan, commercial site matching, and EDO support package under a white-label or partner model.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-2">
            <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
              B2B Service 01
            </span>
            <h3 className="text-base font-bold text-white">Commercial Site Matching</h3>
            <p className="text-xs text-slate-400">Target business acquisition search, site inspection, and preliminary feasibility audit.</p>
            <div className="text-lg font-bold text-blue-400 font-mono pt-2">$2,500 CAD</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-2">
            <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
              B2B Service 02
            </span>
            <h3 className="text-base font-bold text-white">Full EDO Business Plan</h3>
            <p className="text-xs text-slate-400">35-page municipal-grade business plan structured specifically for PNP / C11 / SUV requirements.</p>
            <div className="text-lg font-bold text-blue-400 font-mono pt-2">$3,200 CAD</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-2">
            <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
              B2B Service 03
            </span>
            <h3 className="text-base font-bold text-white">Turnkey Expansion Bundle</h3>
            <p className="text-xs text-slate-400">Complete package: Site search, 35-page business plan, financial model, and EDO pitch letter.</p>
            <div className="text-lg font-bold text-emerald-400 font-mono pt-2">$5,500 CAD</div>
          </div>
        </div>

        {/* Form or Confirmation */}
        {!submittedOrder ? (
          <form onSubmit={handleSubmit} className="bg-slate-950 border border-slate-800 p-8 rounded-2xl space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
              Lawyer / RCIC Client File Submission Form
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Lawyer / RCIC Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Sterling, Barrister"
                  value={formData.lawyerName}
                  onChange={(e) => setFormData({ ...formData, lawyerName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Law Firm / Practice Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sterling Immigration Legal Group"
                  value={formData.firmName}
                  onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Lawyer Email</label>
                <input
                  type="email"
                  required
                  placeholder="dsterling@sterlinglaw.ca"
                  value={formData.lawyerEmail}
                  onChange={(e) => setFormData({ ...formData, lawyerEmail: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Lawyer Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="+1 (403) 555-0188"
                  value={formData.lawyerPhone}
                  onChange={(e) => setFormData({ ...formData, lawyerPhone: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Investor Client Full Name or File ID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Client File #INV-8820 (or Client Name)"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Target Province / Region</label>
                <select
                  value={formData.targetProvince}
                  onChange={(e) => setFormData({ ...formData, targetProvince: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Alberta">Alberta (Taber, Lethbridge, Calgary Region)</option>
                  <option value="British Columbia">British Columbia (Vernon, Okanagan, Kelowna Region)</option>
                  <option value="Saskatchewan">Saskatchewan (Regina, Saskatoon Rural)</option>
                  <option value="Manitoba">Manitoba (Winnipeg, Brandon)</option>
                  <option value="Ontario">Ontario (Regional & Rural Pilot)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Deliverable Service Requested</label>
              <select
                value={formData.serviceRequested}
                onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Full EDO Business Plan Package">Full EDO Business Plan Package ($3,200 CAD)</option>
                <option value="Commercial Target Sourcing & Site Matching">Commercial Target Sourcing & Site Matching ($2,500 CAD)</option>
                <option value="Turnkey Expansion Bundle (Plan + Site + EDO Letter Brief)">Turnkey Expansion Bundle ($5,500 CAD)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition shadow-lg text-xs cursor-pointer"
            >
              Submit Client File & Receive B2B Invoice / Scope Brief →
            </button>
          </form>
        ) : (
          <div className="bg-emerald-950/40 border border-emerald-500/50 p-8 rounded-2xl text-center space-y-4">
            <div className="text-emerald-400 font-bold text-lg">✓ B2B Client File Submitted Successfully</div>
            <p className="text-xs text-slate-300">
              Thank you, <strong className="text-white">{submittedOrder.lawyerName}</strong> (<span className="text-emerald-400">{submittedOrder.firmName}</span>).
            </p>
            <p className="text-xs text-slate-400">
              Client File: <span className="text-white font-mono">{submittedOrder.clientName}</span> | Service: <span className="text-white font-mono">{submittedOrder.serviceRequested}</span>
            </p>
            <div className="text-sm font-bold text-blue-400 font-mono">
              B2B Fee Quote: {submittedOrder.wholesaleFee}
            </div>
            <p className="text-[11px] text-slate-400 pt-2">
              Our business advisory team will review the parameters and send the formal engagement agreement & invoice to <strong className="text-white">{submittedOrder.lawyerEmail}</strong> within 24 hours.
            </p>
            <button
              onClick={() => setSubmittedOrder(null)}
              className="mt-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-6 py-2.5 rounded-xl transition cursor-pointer"
            >
              + Submit Another Client File
            </button>
          </div>
        )}
      </div>
    </section>
  );
}