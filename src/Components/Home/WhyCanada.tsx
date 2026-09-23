import React from "react";

export default function WhyCanada() {
  const benefits = [
    {
      title: "Direct Gateway to PR & Citizenship",
      description:
        "Provincial Nominee Entrepreneur Programs offer an accelerated pathway to Canadian Permanent Residency for business owners, investors, and their immediate families.",
      badge: "Immigration Pathway",
      stat: "10 Provinces",
    },
    {
      title: "G7 Economic Stability & CUSMA Access",
      description:
        "Ranked #1 in the G7 for business environment. Capitalize on duty-free market access to over 1.5 billion consumers across North America and Europe via CUSMA and CETA.",
      badge: "Global Trade",
      stat: "1.5B Market",
    },
    {
      title: "Federal & Regional Business Backing",
      description:
        "Leverage government growth incentives, including Business Development Bank of Canada (BDC) co-financing, ISED innovation programs, and BizPaL licensing streamlined support.",
      badge: "Funding & Grants",
      stat: "$0 Fee Advice",
    },
    {
      title: "Unmatched Quality of Life & Security",
      description:
        "World-class healthcare, top-tier universal education, political stability, and strong property rights safeguard your capital and family legacy.",
      badge: "Lifestyle & Asset Protection",
      stat: "Top 3 Globally",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/50 border border-emerald-800/50 px-4 py-1.5 rounded-full inline-block">
            Strategic Investment Destination
          </h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Why Expand or Acquire a Business in Canada?
          </h3>
          <p className="text-slate-400 text-lg">
            Position your capital in one of the world's most stable economies while securing your family's future through provincial entrepreneur pathways.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl relative group hover:border-emerald-500/50 transition duration-300 backdrop-blur-md"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-semibold px-3 py-1 rounded-md bg-slate-800 text-emerald-400 border border-slate-700">
                  {b.badge}
                </span>
                <span className="text-2xl font-black text-slate-700 group-hover:text-emerald-400/30 transition">
                  {b.stat}
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{b.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
