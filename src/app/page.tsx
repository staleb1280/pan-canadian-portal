"use client";
import Logo from "../Components/Branding/Logo";
import ScopeNotice from "../Components/Home/ScopeNotice";
import WhyCanada from "../Components/Home/WhyCanada";
import ProvincialShowcase from "../Components/Home/ProvincialShowcase";
import LocationShowcase from "../Components/Home/LocationShowcase";
import LawyerB2BPortal from "../Components/Home/LawyerB2BPortal";
import IntakeWizard from "../Components/Wizard/IntakeWizard";
import InvestorAgreement from "../Components/Legal/InvestorAgreement";

const MUNICIPAL_FRAMEWORK = [
  {
    num: "01",
    title: "Community Economic Impact",
    focus: "Solves local municipal need",
    content: "Details how the business fills an existing trade gap, service shortage, or regional commercial priority specified in the town's Official Community Plan (OCP).",
  },
  {
    num: "02",
    title: "Local Workforce Hiring Plan",
    focus: "Guarantees local employment",
    content: "Explicit commit to hiring local residents, offering competitive wages, employee benefits, and skills training programs.",
  },
  {
    num: "03",
    title: "Municipal Zoning & Bylaw Compliance",
    focus: "Smooth municipal integration",
    content: "Verifies that the proposed location complies with local commercial/industrial zoning laws, building codes, environmental regulations, and signage bylaws.",
  },
  {
    num: "04",
    title: "Local Supply Chain Priority",
    focus: "Direct economic ripple effect",
    content: "Commits to sourcing 70%+ of raw materials, professional services, and maintenance from local vendors in the municipality.",
  },
  {
    num: "05",
    title: "Active On-Site Owner Management",
    focus: "Proves non-passive investment",
    content: "Breakdown showing the investor will live in or near the municipality and manage daily operations 35+ hours/week.",
  },
  {
    num: "06",
    title: "Community Involvement & Sponsorship",
    focus: "Community integration",
    content: "Plan for local civic engagement, chamber of commerce membership, local charity sponsorships, and youth/sports partnerships.",
  },
];

export default function SinglePageHome() {
  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 relative overflow-hidden font-sans">
      {/* Sticky Header Navigation */}
      <header className="border-b border-slate-800/80 bg-[#070B14]/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#locations" className="hover:text-emerald-400 transition">Locations</a>
            <a href="#municipal-framework" className="hover:text-emerald-400 transition">EDO Framework</a>
            <a href="#lawyer-b2b" className="hover:text-emerald-400 transition">Lawyer B2B Hub</a>
            <a href="#wizard" className="hover:text-emerald-400 transition">Audit Wizard</a>
            <a href="#agreement" className="hover:text-emerald-400 transition">Agreement</a>
            <a href="#legal-section" className="hover:text-emerald-400 transition">Legal Policy</a>
          </nav>
          <a
            href="#wizard"
            className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg transition"
          >
            Start Eligibility Audit
          </a>
        </div>
      </header>

      <main className="relative z-10 space-y-16 pb-20">
        {/* Hero Section */}
        <section className="pt-20 pb-12 px-6 max-w-7xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-950/80 border border-blue-800/60 px-4 py-1.5 rounded-full text-xs font-bold text-blue-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            InvestNorth Canada Pan-Canadian Economic Portal
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Canadian Business Acquisition & Regional Expansion Advisory
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Connecting international investor capital with high-growth commercial targets, complete municipal endorsement packages, and certified business planning.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href="#wizard"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl transition shadow-xl text-xs"
            >
              Evaluate Investor Eligibility ↓
            </a>
            <a
              href="#lawyer-b2b"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3.5 rounded-xl transition text-xs shadow-lg"
            >
              Immigration Lawyer B2B Portal →
            </a>
          </div>
        </section>

        <ScopeNotice />
        <WhyCanada />
        <ProvincialShowcase />

        {/* 1. Location Showcase Section */}
        <div id="locations">
          <LocationShowcase />
        </div>

        {/* 2. Municipal Framework Section */}
        <section id="municipal-framework" className="py-12 px-6 max-w-7xl mx-auto">
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
                To guarantee town and Economic Development Officer (EDO) approval for Community Support Letters, every InvestNorth business plan incorporates our 6-part municipal compliance architecture.
              </p>
            </div>

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
          </div>
        </section>

        {/* 3. Lawyer B2B Portal Section */}
        <div id="lawyer-b2b">
          <LawyerB2BPortal />
        </div>

        {/* 4. Intake Wizard Section */}
        <div id="wizard">
          <IntakeWizard />
        </div>

        {/* 5. Investor Engagement Agreement Section */}
        <div id="agreement">
          <InvestorAgreement />
        </div>

        {/* 6. Embedded Legal Policy Section */}
        <section id="legal-section" className="py-12 px-6 max-w-7xl mx-auto">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Regulatory Compliance & Platform Policies
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                Terms of Service, Non-Legal Scope & Privacy Policy
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-xs text-slate-300">
              <div className="space-y-3 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
                  1. Non-Legal Advisory Scope
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  InvestNorth Canada operates exclusively as a business strategy, corporate consulting, acquisition matching, and economic research platform. InvestNorth Canada is <strong>not a law firm</strong> and is <strong>not an RCIC</strong>. Legal filings and visa applications are managed independently by licensed partner immigration attorneys.
                </p>
              </div>

              <div className="space-y-3 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
                  2. Privacy & Data Protection
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  We maintain strict confidentiality over client financial records and net worth calculations. Data submitted through intake forms is encrypted and shared only with assigned partner law firms or EDO officers upon formal authorization.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Navigation */}
      <footer className="border-t border-slate-800/80 bg-[#070B14] py-8 text-center text-xs text-slate-500 space-y-2">
        <div className="flex justify-center gap-6 text-slate-400 font-semibold mb-2">
          <a href="#legal-section" className="hover:text-emerald-400 transition">
            Terms of Service & Privacy Policy
          </a>
          <span>•</span>
          <a href="/admin" className="hover:text-emerald-400 transition">
            Executive Partner Access
          </a>
        </div>
        <p>© {new Date().getFullYear()} InvestNorth Canada Business Advisory & Intelligence. All rights reserved.</p>
      </footer>
    </div>
  );
}