"use client";

import { useState } from "react";
import { evaluatePNPEligibility } from "../../lib/pnpScoring";
import { NET_WORTH_OPTIONS, INVESTMENT_FUNDS_OPTIONS } from "../../lib/pnp-config";

// --- Dynamic Eligibility & Recommendation Logic ---
interface InvestorEligibilityResult {
  isEligible: boolean;
  recommendations: string[];
  unlockedOptions: string[];
}

function evaluateInvestorEligibility(
  capitalAmount: number,
  targetRegion: string
): InvestorEligibilityResult {
  // Check if chosen region contains major metropolitan hubs
  const isMetro = ["Calgary", "Edmonton", "Vancouver", "Toronto"].some((city) =>
    targetRegion.toLowerCase().includes(city.toLowerCase())
  );

  const recommendations: string[] = [];
  const unlockedOptions: string[] = [];

  if (isMetro && capitalAmount < 350000) {
    recommendations.push(
      `Top-up capital commitment to $350,000+ CAD to meet commercial lease and operational scale requirements in ${targetRegion}.`
    );
    recommendations.push(
      `Pivot destination to a Regional Corridor (e.g., Taber, Lethbridge, or Regional ON/BC) where $${capitalAmount.toLocaleString()} CAD fully satisfies PNP & Rural Renewal criteria.`
    );
    recommendations.push(
      `Leverage C11 Significant Benefit stream utilizing InvestNorth's 70%+ local supply chain integration model.`
    );
  } else {
    unlockedOptions.push(
      `Full eligibility for major metropolitan business acquisition and establishment.`
    );
    unlockedOptions.push(
      `High priority ranking for Provincial Nominee Program (PNP) draws.`
    );
  }

  if (capitalAmount >= 500000) {
    unlockedOptions.push(
      `Eligible for multi-location corporate expansion and turn-key commercial site acquisition.`
    );
  }

  return {
    isEligible: !isMetro || capitalAmount >= 350000,
    recommendations,
    unlockedOptions,
  };
}

// Price Helper
function getServicePrice(service: string): string {
  if (service.includes("2,500") || service.includes("Site Match")) return "$2,500 CAD";
  if (service.includes("5,500") || service.includes("Turnkey")) return "$5,500 CAD";
  return "$3,200 CAD";
}

export default function IntakeWizard() {
  const [formData, setFormData] = useState({
    lawyerName: "",
    lawFirm: "",
    lawyerEmail: "",
    lawyerPhone: "",
    clientFileId: "",
    targetRegion: "Alberta (Taber, Lethbridge, Calgary Region)",
    serviceRequested: "Full EDO Business Plan Package ($3,200 CAD)",
    capitalAmount: 200000,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate quick form submission processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      lawyerName: "",
      lawFirm: "",
      lawyerEmail: "",
      lawyerPhone: "",
      clientFileId: "",
      targetRegion: "Alberta (Taber, Lethbridge, Calgary Region)",
      serviceRequested: "Full EDO Business Plan Package ($3,200 CAD)",
      capitalAmount: 200000,
    });
  };

  const eligibility = evaluateInvestorEligibility(
    formData.capitalAmount,
    formData.targetRegion
  );

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 bg-[#0B132B] text-slate-100 rounded-2xl border border-slate-800 shadow-2xl">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-1">
              Lawyer / RCIC Client File Submission Form
            </h2>
            <p className="text-sm text-slate-400">
              Submit confidential client parameters to receive a wholesale B2B quote and scope brief within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LAWYER / RCIC NAME */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                LAWYER / RCIC NAME
              </label>
              <input
                type="text"
                required
                placeholder="e.g. David Sterling, Barrister"
                value={formData.lawyerName}
                onChange={(e) => setFormData({ ...formData, lawyerName: e.target.value })}
                className="w-full px-4 py-3 bg-[#111C38] border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* LAW FIRM / PRACTICE NAME */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                LAW FIRM / PRACTICE NAME
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sterling Immigration Legal Group"
                value={formData.lawFirm}
                onChange={(e) => setFormData({ ...formData, lawFirm: e.target.value })}
                className="w-full px-4 py-3 bg-[#111C38] border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* LAWYER EMAIL */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                LAWYER EMAIL
              </label>
              <input
                type="email"
                required
                placeholder="dsterling@sterlinglaw.ca"
                value={formData.lawyerEmail}
                onChange={(e) => setFormData({ ...formData, lawyerEmail: e.target.value })}
                className="w-full px-4 py-3 bg-[#111C38] border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* LAWYER PHONE NUMBER */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                LAWYER PHONE NUMBER
              </label>
              <input
                type="text"
                placeholder="+1 (403) 555-0188"
                value={formData.lawyerPhone}
                onChange={(e) => setFormData({ ...formData, lawyerPhone: e.target.value })}
                className="w-full px-4 py-3 bg-[#111C38] border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* INVESTOR CLIENT FULL NAME OR FILE ID */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                INVESTOR CLIENT FULL NAME OR FILE ID
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Client File #INV-8820 (or Client Name)"
                value={formData.clientFileId}
                onChange={(e) => setFormData({ ...formData, clientFileId: e.target.value })}
                className="w-full px-4 py-3 bg-[#111C38] border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* TARGET PROVINCE / REGION */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                TARGET PROVINCE / REGION
              </label>
              <select
                value={formData.targetRegion}
                onChange={(e) => setFormData({ ...formData, targetRegion: e.target.value })}
                className="w-full px-4 py-3 bg-[#111C38] border border-slate-700/60 rounded-xl text-white focus:outline-none focus:border-blue-500 transition"
              >
                <option value="Alberta (Taber, Lethbridge, Calgary Region)">
                  Alberta (Taber, Lethbridge, Calgary Region)
                </option>
                <option value="British Columbia (Okanagan, Vernon, Vancouver)">
                  British Columbia (Okanagan, Vernon, Vancouver)
                </option>
                <option value="Saskatchewan (Regina, Regional Corridors)">
                  Saskatchewan (Regina, Regional Corridors)
                </option>
                <option value="Manitoba (Winnipeg, Brandon Region)">
                  Manitoba (Winnipeg, Brandon Region)
                </option>
                <option value="Ontario (Regional Ontario Corridors)">
                  Ontario (Regional Ontario Corridors)
                </option>
              </select>
            </div>
          </div>

          {/* DELIVERABLE SERVICE REQUESTED */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              DELIVERABLE SERVICE REQUESTED
            </label>
            <select
              value={formData.serviceRequested}
              onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
              className="w-full px-4 py-3 bg-[#111C38] border border-slate-700/60 rounded-xl text-white focus:outline-none focus:border-blue-500 transition"
            >
              <option value="Full EDO Business Plan Package ($3,200 CAD)">
                Full EDO Business Plan Package ($3,200 CAD)
              </option>
              <option value="Site Match & Feasibility Audit ($2,500 CAD)">
                Site Match & Feasibility Audit ($2,500 CAD)
              </option>
              <option value="Turnkey Expansion Bundle ($5,500 CAD)">
                Turnkey Expansion Bundle ($5,500 CAD)
              </option>
            </select>
          </div>

          {/* DYNAMIC ADVISORY & RECOMMENDATION CARD */}
          {formData.targetRegion && (
            <div
              className={`p-5 rounded-xl border transition ${
                eligibility.isEligible
                  ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-200"
                  : "bg-amber-950/20 border-amber-500/40 text-amber-200"
              }`}
            >
              <div className="flex items-center gap-2 font-semibold text-base mb-2">
                {eligibility.isEligible
                  ? "✅ Destination & Capital Baseline Aligned"
                  : "⚠️ Regional Eligibility Gap Identified"}
              </div>

              {!eligibility.isEligible ? (
                <div>
                  <p className="text-xs text-amber-300 mb-3">
                    Your selected region ({formData.targetRegion}) typically requires a higher capital baseline or strategic modifications. Recommended solutions:
                  </p>
                  <ul className="space-y-1.5 text-xs list-disc pl-4 text-amber-100">
                    {eligibility.recommendations.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <ul className="space-y-1 text-xs list-disc pl-4 text-emerald-100">
                  {eligibility.unlockedOptions.map((opt, idx) => (
                    <li key={idx}>{opt}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm rounded-xl transition shadow-lg shadow-blue-600/20"
          >
            {isSubmitting
              ? "Processing Submission..."
              : "Submit Client File & Receive B2B Invoice / Scope Brief →"}
          </button>
        </form>
      ) : (
        /* SUCCESS CONFIRMATION SCREEN */
        <div className="p-8 my-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 text-center space-y-4">
          <h3 className="text-2xl font-bold text-emerald-400 flex items-center justify-center gap-2">
            ✓ B2B Client File Submitted Successfully
          </h3>

          <p className="text-sm text-slate-300">
            Thank you, <span className="font-semibold text-emerald-300">{formData.lawyerName}</span> (
            <span className="text-emerald-300">{formData.lawFirm}</span>).
          </p>

          <p className="text-xs text-slate-400">
            Client File: <span className="font-mono text-white font-semibold">{formData.clientFileId}</span> | Service:{" "}
            <span className="font-semibold text-white">{formData.serviceRequested}</span>
          </p>

          <div className="py-2 px-4 bg-emerald-900/40 border border-emerald-500/30 rounded-lg inline-block text-emerald-300 font-mono font-bold text-sm">
            B2B Fee Quote: {getServicePrice(formData.serviceRequested)} (Wholesale B2B Rate)
          </div>

          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            Our business advisory team will review the parameters and send the formal engagement agreement & invoice to{" "}
            <span className="text-white font-semibold">{formData.lawyerEmail}</span> within 24 hours.
          </p>

          <div className="pt-4">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition"
            >
              + Submit Another Client File
            </button>
          </div>
        </div>
      )}
    </div>
  );
}