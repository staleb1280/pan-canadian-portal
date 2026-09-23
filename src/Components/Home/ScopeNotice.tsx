import React from "react";

export default function ScopeNotice() {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 md:p-10 backdrop-blur-md relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/60 border border-blue-800/60 px-4 py-1.5 rounded-full inline-block">
            Regulatory Compliance & Transparency
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Our Professional Scope of Services
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            InvestNorth Canada operates strictly as a <strong className="text-slate-200">Business Advisory & Corporate Intelligence Firm</strong>. We specialize in economic viability, commercial acquisition matching, and strategic business planning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-950/70 border border-emerald-500/30 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                100% Legal & Independent
              </span>
              <span className="text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded-md">
                InvestNorth Scope
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Business Intelligence & Corporate Strategy
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span><strong>Market & Feasibility Analysis:</strong> In-depth regional economic evaluation across Canadian provinces.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span><strong>Business Acquisition Research:</strong> Sourcing existing business buy-out targets (via Sunbelt & Murphy networks).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span><strong>Provincial Business Plans:</strong> Comprehensive 5-year financial modeling & operational pitch decks.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span><strong>Due Diligence Support:</strong> Operational analysis to safeguard foreign capital investments.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                IRPA Sec. 91 Compliant
              </span>
              <span className="text-xs font-semibold bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md">
                Licensed Legal Partners
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Immigration Legal Filings & Representation
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <span className="text-blue-400 font-bold mt-0.5">•</span>
                <span><strong>Official PNP Submissions:</strong> Filing formal provincial nomination applications with government portals.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-blue-400 font-bold mt-0.5">•</span>
                <span><strong>Legal Counsel & Representation:</strong> Direct communication with IRCC and provincial immigration officers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-blue-400 font-bold mt-0.5">•</span>
                <span><strong>Work Permit & PR Filings:</strong> Handled independently by accredited Canadian immigration lawyers & RCICs.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center pt-6 border-t border-slate-800">
          <p className="text-[11px] text-slate-500 max-w-2xl mx-auto leading-normal">
            <strong>Notice:</strong> InvestNorth Canada does not provide legal representation or official immigration advice. All legal services are rendered independently through qualified, licensed Canadian immigration law practitioners upon client referral.
          </p>
        </div>
      </div>
    </section>
  );
}