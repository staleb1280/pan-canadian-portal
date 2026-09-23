import Link from "next/link";

export default function PitchPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            InvestNorth Canada
          </span>
          <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
            Legal Partner Portal
          </span>
        </div>
        <Link
          href="/"
          className="text-sm text-slate-400 hover:text-white transition"
        >
          View Live Intake Wizard →
        </Link>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Automate PNP Entrepreneur Intake & <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Pre-Qualify High-Net-Worth Applicants
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            InvestNorth provides Canadian immigration law firms with a white-labeled, 
            instant eligibility engine for PNP Business & Entrepreneur streams—saving 10+ hours per intake file.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
            >
              Test Live Client Wizard
            </Link>
          </div>
        </section>

        {/* Value Proposition Grid */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-xl space-y-3">
            <div className="text-blue-400 font-bold text-lg">01. Automated Scoring</div>
            <h3 className="font-semibold text-white">2026 PNP Compliance</h3>
            <p className="text-sm text-slate-400">
              Evaluates net worth, liquid capital, and sector priority across Alberta, BC, and Ontario entrepreneur streams in under 60 seconds.
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-xl space-y-3">
            <div className="text-emerald-400 font-bold text-lg">02. Lead Pre-Qualification</div>
            <h3 className="font-semibold text-white">Filter Unqualified Applicants</h3>
            <p className="text-sm text-slate-400">
              Ensure your firm only spends billable hours on high-probability cases with validated financial capacity.
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-xl space-y-3">
            <div className="text-purple-400 font-bold text-lg">03. Secure Architecture</div>
            <h3 className="font-semibold text-white">Enterprise Data Safety</h3>
            <p className="text-sm text-slate-400">
              Built on Supabase Row-Level Security (RLS) to ensure applicant financial records remain isolated and confidential.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}