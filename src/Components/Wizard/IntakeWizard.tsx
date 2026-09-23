"use client";
import { useState } from "react";
import { evaluatePNPEligibility, EligibilityResult } from "../../lib/pnpScoring";
import { NET_WORTH_OPTIONS, INVESTMENT_FUNDS_OPTIONS } from "../../lib/pnp-config";

export default function IntakeWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    netWorthCAD: 300000,
    investmentFundsCAD: 100000,
    preferredSectors: ["Agri-Tech"],
    managementExperienceYears: 3,
    languageLevelCLB: 5,
  });

  const [results, setResults] = useState<EligibilityResult[] | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const evaluation = evaluatePNPEligibility(formData);
    setResults(evaluation);
    setStep(3);

    // Save lead submission to LocalStorage for Admin Portal display
    const newLead = {
      id: "lead-" + Date.now(),
      ...formData,
      date: new Date().toLocaleDateString(),
      status: "Audit Completed",
      signedAgreement: false,
    };

    const existing = JSON.parse(localStorage.getItem("investnorth_leads") || "[]");
    localStorage.setItem("investnorth_leads", JSON.stringify([newLead, ...existing]));
  };

  return (
    <section id="wizard" className="py-16 px-6 max-w-4xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
          <div>
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
              Step {step} of 3
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              {step === 1 && "Investor Qualification Audit"}
              {step === 2 && "Financial & Operational Profile"}
              {step === 3 && "Eligibility Analysis & Pathways"}
            </h3>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alexander Vance"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="vance@globalcapital.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!formData.fullName || !formData.email}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition cursor-pointer"
            >
              Continue to Financial Assessment →
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                  Total Personal Net Worth (CAD)
                </label>
                <select
                  value={formData.netWorthCAD}
                  onChange={(e) => setFormData({ ...formData, netWorthCAD: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                >
                  {NET_WORTH_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                  Liquid Investment Capital (CAD)
                </label>
                <select
                  value={formData.investmentFundsCAD}
                  onChange={(e) => setFormData({ ...formData, investmentFundsCAD: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                >
                  {INVESTMENT_FUNDS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                  Management Experience
                </label>
                <select
                  value={formData.managementExperienceYears}
                  onChange={(e) => setFormData({ ...formData, managementExperienceYears: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value={1}>1-2 Years (Owner/Senior Mgr)</option>
                  <option value={3}>3-5 Years (Owner/Senior Mgr)</option>
                  <option value={5}>5+ Years (Owner/Senior Mgr)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                  Language Proficiency (CLB)
                </label>
                <select
                  value={formData.languageLevelCLB}
                  onChange={(e) => setFormData({ ...formData, languageLevelCLB: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value={4}>CLB 4 (Basic Requirement)</option>
                  <option value={5}>CLB 5 (Intermediate)</option>
                  <option value={7}>CLB 7+ (Fluent / Advanced)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3.5 rounded-xl transition cursor-pointer"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="w-2/3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold py-3.5 rounded-xl transition shadow-lg cursor-pointer"
              >
                Generate Custom Pathway Report →
              </button>
            </div>
          </form>
        )}

        {step === 3 && results && (
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Your Provincial Compatibility Results</h4>
            <div className="space-y-4">
              {results.map((res, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-2xl border ${
                    res.eligible
                      ? "bg-emerald-950/20 border-emerald-500/50"
                      : "bg-slate-950 border-slate-800"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-slate-400">{res.stream.province}</span>
                      <h5 className="text-lg font-bold text-white">{res.stream.name}</h5>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        res.eligible ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {res.eligible ? "Eligible Target" : "Capital Deficit"}
                    </span>
                  </div>
                  {res.missingCriteria.length > 0 && (
                    <p className="text-xs text-rose-400 mt-2">
                      Notice: {res.missingCriteria.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-800 text-center space-y-4">
              <p className="text-sm text-slate-300">
                To proceed with business matching, bespoke opportunity reporting, and complete business plan preparation, sign the Advisory Agreement below.
              </p>
              <a
                href="#agreement"
                className="inline-block bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl transition shadow-xl"
              >
                Proceed to Business Advisory Agreement & Retainer ↓
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}