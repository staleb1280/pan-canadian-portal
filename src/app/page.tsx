import Logo from "../Components/Branding/Logo";
import WhyCanada from "../Components/Home/WhyCanada";
import ProvincialShowcase from "../Components/Home/ProvincialShowcase";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 relative overflow-hidden font-sans">
      {/* Background Accent Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-600/15 via-emerald-500/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-[800px] right-0 w-[600px] h-[600px] bg-emerald-600/10 blur-[150px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="border-b border-slate-800/80 bg-[#070B14]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <Link
              href="/pitch"
              className="text-xs font-semibold text-slate-400 hover:text-white transition hidden md:block"
            >
              Law Firm Portal
            </Link>
            <a
              href="#wizard"
              className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg transition"
            >
              Start Eligibility Audit
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="pt-20 pb-12 px-6 text-center max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/60 border border-emerald-800/60 px-4 py-1.5 rounded-full inline-block">
            InvestNorth Canada
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Accelerating Foreign Capital into{" "}
            <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Canadian Enterprise
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            The premier pre-qualification engine matching global investors and business buyers with official Canadian Provincial Nominee Pathways.
          </p>
        </section>

        {/* Why Invest in Canada Section */}
        <WhyCanada />

        {/* Dynamic Provincial Presentation Engine */}
        <ProvincialShowcase />
      </main>
    </div>
  );
}