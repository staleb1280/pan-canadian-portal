"use client";

import { useState } from "react";

// --- PROVINCIAL CORRIDOR RANKING DATA ---
export interface LocationCorridor {
  id: string;
  name: string;
  rankBadge: string;
  minCapitalCAD: number;
  edoSupportLevel: "Very High" | "High" | "Moderate";
  recommendedStream: string;
  description: string;
}

export const PROVINCE_CORRIDORS: Record<string, LocationCorridor[]> = {
  Alberta: [
    {
      id: "ab-1",
      name: "Taber / Lethbridge / Coaldale Corridor",
      rankBadge: "⭐ #1 Best Opportunity (Top EDO & Rural Renewal Match)",
      minCapitalCAD: 150000,
      edoSupportLevel: "Very High",
      recommendedStream: "Alberta Rural Renewal Stream & PNP Entrepreneur",
      description: "Highest PNP points boost, 100% EDO endorsement, low lease overhead, strong agri-food & commercial demand.",
    },
    {
      id: "ab-2",
      name: "Brooks / Newell Region",
      rankBadge: "🏅 #2 Recommended (Rural Renewal Stream)",
      minCapitalCAD: 150000,
      edoSupportLevel: "Very High",
      recommendedStream: "Alberta Rural Renewal Stream",
      description: "Fast-track community nomination, active local labour recruitment support.",
    },
    {
      id: "ab-3",
      name: "Red Deer & Central Alberta Corridor",
      rankBadge: "🔹 #3 Secondary Regional Hub",
      minCapitalCAD: 250000,
      edoSupportLevel: "High",
      recommendedStream: "Alberta Advantage Entrepreneur Stream",
      description: "Strategic logistics hub between Edmonton and Calgary with strong commercial growth.",
    },
    {
      id: "ab-4",
      name: "Calgary Metropolitan Area",
      rankBadge: "🏢 #4 Primary Metro (Higher Capital Baseline)",
      minCapitalCAD: 350000,
      edoSupportLevel: "Moderate",
      recommendedStream: "C11 Significant Benefit / Direct Acquisition",
      description: "High commercial visibility; requires $350k+ capital commitment due to lease costs and market density.",
    },
    {
      id: "ab-5",
      name: "Edmonton Metropolitan Region",
      rankBadge: "🏢 #5 Metro Industrial & Commercial Core",
      minCapitalCAD: 350000,
      edoSupportLevel: "Moderate",
      recommendedStream: "C11 Significant Benefit / Expansion",
      description: "Ideal for manufacturing, transport, and commercial service ventures.",
    },
  ],
  "British Columbia": [
    {
      id: "bc-1",
      name: "Vernon / North Okanagan Corridor",
      rankBadge: "⭐ #1 Best Opportunity (BC PNP Regional Pilot)",
      minCapitalCAD: 100000,
      edoSupportLevel: "Very High",
      recommendedStream: "BC PNP Entrepreneur Immigration - Regional Stream",
      description: "Unlocks lowest capital threshold in BC ($100k) with direct community referral.",
    },
    {
      id: "bc-2",
      name: "Kamloops & Thompson-Nicola Region",
      rankBadge: "🏅 #2 High Priority Regional Hub",
      minCapitalCAD: 150000,
      edoSupportLevel: "High",
      recommendedStream: "BC PNP Regional Stream",
      description: "Strong forestry, tourism, and retail trade opportunities.",
    },
    {
      id: "bc-3",
      name: "Kelowna & Central Okanagan",
      rankBadge: "🔹 #3 Commercial Tech & Tourism Hub",
      minCapitalCAD: 300000,
      edoSupportLevel: "High",
      recommendedStream: "Standard BC PNP Entrepreneur",
      description: "High-growth market; requires higher capital allocation.",
    },
    {
      id: "bc-4",
      name: "Metro Vancouver & Lower Mainland",
      rankBadge: "🏢 #4 Major Metro (Tier 4 / Highly Competitive)",
      minCapitalCAD: 500000,
      edoSupportLevel: "Moderate",
      recommendedStream: "C11 Significant Benefit / Corporate Expansion",
      description: "Saturated market; requires $500k+ CAD and specialized business model to pass IRCC audit.",
    },
  ],
  Saskatchewan: [
    {
      id: "sk-1",
      name: "Moose Jaw & Regional Corridors",
      rankBadge: "⭐ #1 Best Opportunity (SINP Regional Entrepreneur)",
      minCapitalCAD: 200000,
      edoSupportLevel: "Very High",
      recommendedStream: "SINP Entrepreneur Category (Regional)",
      description: "Lower score threshold for EOI selection; fast municipal onboarding.",
    },
    {
      id: "sk-2",
      name: "Saskatoon Regional Corridor",
      rankBadge: "🏅 #2 Commercial Distribution Hub",
      minCapitalCAD: 250000,
      edoSupportLevel: "High",
      recommendedStream: "SINP Entrepreneur Category",
      description: "Strong tech, agriculture, and retail sector demand.",
    },
    {
      id: "sk-3",
      name: "Regina Metropolitan Area",
      rankBadge: "🏢 #3 Provincial Capital Core",
      minCapitalCAD: 300000,
      edoSupportLevel: "Moderate",
      recommendedStream: "SINP Entrepreneur Category",
      description: "Government and commercial service centre.",
    },
  ],
  Manitoba: [
    {
      id: "mb-1",
      name: "Brandon & Westman Region",
      rankBadge: "⭐ #1 Best Opportunity (MPNP Regional Priority)",
      minCapitalCAD: 150000,
      edoSupportLevel: "Very High",
      recommendedStream: "MPNP Business Investor Stream (Regional)",
      description: "Requires only $150k investment outside Winnipeg; maximum PNP points.",
    },
    {
      id: "mb-2",
      name: "Winnipeg Metropolitan Area",
      rankBadge: "🏢 #2 Primary Metro Core",
      minCapitalCAD: 250000,
      edoSupportLevel: "Moderate",
      recommendedStream: "MPNP Entrepreneur Pathway",
      description: "Requires $250k investment minimum within Winnipeg city limits.",
    },
  ],
  Ontario: [
    {
      id: "on-1",
      name: "Chatham-Kent & Southwestern Ontario",
      rankBadge: "⭐ #1 Best Opportunity (OINP Regional Focus)",
      minCapitalCAD: 200000,
      edoSupportLevel: "Very High",
      recommendedStream: "OINP Entrepreneur Stream (Outside GTA)",
      description: "Unlocks $200k investment baseline vs $600k in GTA; high manufacturing & agri-tech demand.",
    },
    {
      id: "on-2",
      name: "Kingston & Eastern Ontario Corridor",
      rankBadge: "🏅 #2 High Priority Regional City",
      minCapitalCAD: 250000,
      edoSupportLevel: "High",
      recommendedStream: "OINP Regional Stream",
      description: "Strong healthcare, education, and service business demand.",
    },
    {
      id: "on-3",
      name: "Greater Toronto Area (GTA) & Ottawa",
      rankBadge: "🏢 #3 Tier 4 Metro (Maximum Competition & Capital)",
      minCapitalCAD: 600000,
      edoSupportLevel: "Moderate",
      recommendedStream: "C11 Corporate / OINP GTA ($600k Min)",
      description: "Highest capital requirement in Canada ($600k+ CAD unencumbered investment).",
    },
  ],
};

// Price Helper
function getServicePrice(service: string): string {
  if (service.includes("2,500") || service.includes("Site Match")) return "$2,500 CAD";
  if (service.includes("5,500") || service.includes("Turnkey")) return "$5,500 CAD";
  return "$3,200 CAD";
}

export default function IntakeWizard() {
  const [selectedProvince, setSelectedProvince] = useState<string>("Alberta");
  
  // Default to the #1 ranked location in Alberta
  const [selectedCorridorId, setSelectedCorridorId] = useState<string>("ab-1");

  const [formData, setFormData] = useState({
    lawyerName: "",
    lawFirm: "",
    lawyerEmail: "",
    lawyerPhone: "",
    clientFileId: "",
    capitalAmount: 200000,
    serviceRequested: "Full EDO Business Plan Package ($3,200 CAD)",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get corridors for current province
  const currentCorridors = PROVINCE_CORRIDORS[selectedProvince] || [];

  // Get active selected corridor details
  const activeCorridor =
    currentCorridors.find((c) => c.id === selectedCorridorId) || currentCorridors[0];

  // Handle Province Change & auto-select top #1 location
  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    const newCorridors = PROVINCE_CORRIDORS[province] || [];
    if (newCorridors.length > 0) {
      setSelectedCorridorId(newCorridors[0].id); // Auto select #1 option at top
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setSelectedProvince("Alberta");
    setSelectedCorridorId("ab-1");
    setFormData({
      lawyerName: "",
      lawFirm: "",
      lawyerEmail: "",
      lawyerPhone: "",
      clientFileId: "",
      capitalAmount: 200000,
      serviceRequested: "Full EDO Business Plan Package ($3,200 CAD)",
    });
  };

  const isCapitalSufficient = formData.capitalAmount >= (activeCorridor?.minCapitalCAD || 200000);

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 bg-[#0B132B] text-slate-100 rounded-2xl border border-slate-800 shadow-2xl">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-1">
              Lawyer / RCIC Client File Submission Form
            </h2>
            <p className="text-sm text-slate-400">
              Select target province & ranked corridor to evaluate client eligibility and lock wholesale B2B pricing.
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

            {/* INVESTOR CLIENT FILE ID */}
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

            {/* INVESTOR CAPITAL BASELINE */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                INVESTOR LIQUID CAPITAL (CAD)
              </label>
              <select
                value={formData.capitalAmount}
                onChange={(e) => setFormData({ ...formData, capitalAmount: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-[#111C38] border border-slate-700/60 rounded-xl text-white focus:outline-none focus:border-blue-500 transition"
              >
                <option value={150000}>$150,000 CAD (Regional Tier)</option>
                <option value={200000}>$200,000 CAD (Standard Regional Baseline)</option>
                <option value={350000}>$350,000 CAD (Primary Metro Threshold)</option>
                <option value={500000}>$500,000+ CAD (Multi-Site / GTA Baseline)</option>
              </select>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2-STEP DEPENDENT DROPDOWNS: PROVINCE -> RANKED CORRIDOR  */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-[#070D1E] rounded-xl border border-slate-800">
            {/* STEP 1: SELECT PROVINCE */}
            <div>
              <label className="block text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
                1. SELECT TARGET PROVINCE
              </label>
              <select
                value={selectedProvince}
                onChange={(e) => handleProvinceChange(e.target.value)}
                className="w-full px-4 py-3 bg-[#111C38] border border-blue-500/40 rounded-xl text-white font-semibold focus:outline-none focus:border-blue-400 transition"
              >
                {Object.keys(PROVINCE_CORRIDORS).map((prov) => (
                  <option key={prov} value={prov}>
                    {prov}
                  </option>
                ))}
              </select>
            </div>

            {/* STEP 2: RANKED MUNICIPAL CORRIDOR (GRADUAL RANKING DROP DOWN) */}
            <div>
              <label className="block text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
                2. MUNICIPAL DESTINATION (RANKED BEST TO LOWEST)
              </label>
              <select
                value={selectedCorridorId}
                onChange={(e) => setSelectedCorridorId(e.target.value)}
                className="w-full px-4 py-3 bg-[#111C38] border border-blue-500/40 rounded-xl text-white font-semibold focus:outline-none focus:border-blue-400 transition"
              >
                {currentCorridors.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.rankBadge} - {c.name}
                  </option>
                ))}
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

          {/* DYNAMIC ADVISORY & RECOMMENDATION PANEL */}
          {activeCorridor && (
            <div
              className={`p-5 rounded-xl border transition ${
                isCapitalSufficient
                  ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-200"
                  : "bg-amber-950/20 border-amber-500/40 text-amber-200"
              }`}
            >
              <div className="flex items-center justify-between font-semibold text-base mb-2">
                <span className="flex items-center gap-2">
                  {isCapitalSufficient ? "✅ Destination & Capital Baseline Aligned" : "⚠️️ Capital Gap / Remediation Required"}
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300">
                  EDO Support: {activeCorridor.edoSupportLevel}
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-2">
                <strong className="text-white">Selected Destination:</strong> {activeCorridor.name} |{" "}
                <strong className="text-white">Min Threshold:</strong> ${activeCorridor.minCapitalCAD.toLocaleString()} CAD
              </p>

              <p className="text-xs text-slate-400 mb-3">{activeCorridor.description}</p>

              {!isCapitalSufficient ? (
                <div className="space-y-1.5 pt-2 border-t border-amber-500/20 text-xs">
                  <p className="font-semibold text-amber-300">💡 Actionable Remediation Options:</p>
                  <ul className="list-disc pl-4 space-y-1 text-amber-100">
                    <li>
                      Top-up capital from current ${formData.capitalAmount.toLocaleString()} CAD to{" "}
                      <strong>${activeCorridor.minCapitalCAD.toLocaleString()} CAD</strong> to meet local lease baseline.
                    </li>
                    <li>
                      Or switch to the <strong>#1 Ranked Regional Option</strong> ({currentCorridors[0]?.name}) which fully accepts ${formData.capitalAmount.toLocaleString()} CAD.
                    </li>
                    <li>
                      Apply under InvestNorth’s Option B ($3,200) with a binding 70%+ local supply chain agreement.
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="pt-2 border-t border-emerald-500/20 text-xs text-emerald-100">
                  <strong>Path Alignment:</strong> Ideal for <em>{activeCorridor.recommendedStream}</em>. Unlocks maximum EDO backing and quick scope brief dispatch.
                </div>
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
            Client File: <span className="font-mono text-white font-semibold">{formData.clientFileId}</span> | Destination:{" "}
            <span className="font-semibold text-white">{activeCorridor.name}</span>
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