import Logo from "../Components/Branding/Logo";
import ScopeNotice from "../Components/Home/ScopeNotice";
import WhyCanada from "../Components/Home/WhyCanada";
import ProvincialShowcase from "../Components/Home/ProvincialShowcase";
import LocationShowcase from "../Components/Home/LocationShowcase";
import IntakeWizard from "../Components/Wizard/IntakeWizard";
import InvestorAgreement from "../Components/Legal/InvestorAgreement";

const MUNICIPAL_FRAMEWORK = [
  {
    num: "01",
    title: "Community Economic Impact",
    focus: "Solves a local municipal need",
    content:
      "Details how the business fills an existing trade gap, service shortage, or regional commercial priority specified in the town's Official Community Plan (OCP).",
  },
  {
    num: "02",
    title: "Local Workforce Hiring Plan",
    focus: "Guarantees local employment",
    content:
      "Explicit commit to hiring local residents, offering competitive wages, employee benefits, and skills training programs.",
  },
  {
    num: "03",
    title: "Municipal Zoning & Bylaw Compliance",
    focus: "Smooth municipal integration",
    content:
      "Verifies that the proposed location complies with local commercial/industrial zoning laws, building codes, environmental regulations, and signage bylaws.",
  },
  {
    num: "04",
    title: "Local Supply Chain Priority",
    focus: "Direct economic ripple effect",
    content:
      "Commits to sourcing 70%+ of raw materials, professional services (accounting, marketing, trades), and maintenance from local vendors in the municipality.",
  },
  {
    num: "05",
    title: "Active On-Site Owner Management",
    focus: "Proves non-passive investment",
    content:
      "Breakdown showing the investor will live in or near the municipality and manage daily operations 35+ hours/week.",
  },
  {
    num: "06",
    title: "Community Involvement & Sponsorship",
    focus: "Community integration",
    content:
      "Plan for local civic engagement, chamber of commerce membership, local charity sponsorships, and youth/sports partnerships.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 relative overflow-hidden font-sans">
      {/* Navigation Header */}
      <header className="border-b border-slate-800/80 bg-[#070B14]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <a
              href="/admin"
              className="text-slate-400 hover:text-white text-xs font-semibold transition"
            >
              Law Firm Portal
            </a>
            <a
              href="#wizard"
              className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg transition"
            >
              Start Eligibility Audit
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-12 pb-20">
        {/* Hero Section */}
        <section className="pt-20 pb-12 px-6 max-w-7xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-950/80 border border-blue-800/60 px-4 py-1.5 rounded-full text-xs font-bold text-blue-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            InvestNorth Canada Corporate Intelligence Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Canadian Business Acquisition & Regional Expansion Advisory
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Connecting international investor capital with high-growth commercial targets, complete municipal endorsement packages, and certified Canadian business planning.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href="#wizard"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl transition shadow-xl"
            >
              Evaluate Investor Eligibility ↓
            </a>
            <a
              href="#municipal-framework"
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold px-8 py-3.5 rounded-xl transition"
            >
              Municipal Business Plan Standards →
            </a>
          </div>
        </section>

        {/* Regulatory Scope Notice */}
        <ScopeNotice />

        {/* Why Invest in Canada */}
        <WhyCanada />

        {/* Provincial Streams Overview */}
        <ProvincialShowcase />

        {/* Virtual Location & Video Tour Showcase */}
        <LocationShowcase />

        {/* Municipal Approval & Support Letter Presentation Framework */}
        <section id="municipal-framework" className="py-16 px-6 max-w-7xl mx-auto">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-4 py-1.5 rounded-full inline-block">
                Municipal & EDO Guarantee Framework
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Municipal Endorsement & Business Plan Standards
              </h2>
              <p className="text-slate-400 text-sm">
                To guarantee town, city, and Economic Development Officer (EDO) approval for Community Support Letters, every InvestNorth business plan incorporates our 6-part municipal compliance architecture.
              </p>
            </div>

            {/* 6-Part Framework Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MUNICIPAL_FRAMEWORK.map((item) => (
                <div
                  key={item.num}
                  className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 space-y-3 relative hover:border-emerald-500/40 transition group"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-slate-700 group-hover:text-emerald-400 transition">
                      {item.num}
                    </span>
                    <span className="text-[10px] font-bold uppercase bg-slate-900 border border-slate-800 text-emerald-400 px-2.5 py-1 rounded-md">
                      {item.focus}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>

            {/* Municipal Pitch & Support Letter Template Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    Official Presentation Document Template
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    Municipal EDO & Town Council Endorsement Letter
                  </h3>
                </div>
                <span className="text-xs bg-blue-950 text-blue-300 border border-blue-800 px-3 py-1 rounded-lg font-semibold">
                  Town Approval Pitch Ready
                </span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-xl font-mono text-xs text-slate-300 space-y-3 leading-relaxed">
                <p className="text-slate-500">
                  // OFFICIAL MEMORANDUM TO MUNICIPAL ECONOMIC DEVELOPMENT COMMITTEE
                </p>
                <p>
                  <strong className="text-white">RE: Community Support Letter Request & Commercial Investment Brief</strong>
                </p>
                <p>
                  InvestNorth Canada respectfully presents this commercial expansion proposal on behalf of our client, <span className="text-emerald-400">[Investor Full Name]</span>, for the establishment/acquisition of <span className="text-emerald-400">[Business Venture Name]</span> within the Municipality of <span className="text-emerald-400">[City/Town Name]</span>.
                </p>
                <p>
                  This venture guarantees:
                  <br />• Creation of <strong className="text-white">[X] permanent full-time jobs</strong> for local residents.
                  <br />• Capital investment of <strong className="text-white">$[X] CAD</strong> into physical infrastructure and municipal commercial real estate.
                  <br />• Direct local supply chain sourcing priority exceeding <strong className="text-white">70%</strong>.
                  <br />• Active 35+ hours/week executive management by the resident owner.
                </p>
                <p className="text-slate-400 italic">
                  Complete 35-page municipal business plan, site architectural blueprints, and financial proof of funds attached for town council approval.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Qualification Wizard */}
        <IntakeWizard />

        {/* Legal Agreement Section */}
        <InvestorAgreement />
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-slate-800/80 bg-[#070B14] py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} InvestNorth Canada Business Advisory & Intelligence. All rights reserved.</p>
      </footer>
    </div>
  );
}