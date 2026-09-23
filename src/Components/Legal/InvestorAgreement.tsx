"use client";
import { useState } from "react";

export default function InvestorAgreement() {
  const [accepted, setAccepted] = useState(false);
  const [signature, setSignature] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Replace this placeholder link with your real Stripe Payment Link or verification portal
  const STRIPE_GATEWAY_URL = "https://buy.stripe.com/your-live-link-here";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accepted && signature) {
      setSubmitted(true);
    }
  };

  const handleProceedToPayment = () => {
    if (STRIPE_GATEWAY_URL.includes("your-live-link-here")) {
      // Fallback if URL is not set yet
      window.open("https://stripe.com", "_blank");
    } else {
      window.location.href = STRIPE_GATEWAY_URL;
    }
  };

  return (
    <section id="agreement" className="py-16 px-6 max-w-4xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Corporate Engagement & Compliance
          </span>
          <h3 className="text-3xl font-extrabold text-white mt-1">
            Business Advisory & Analysis Engagement Agreement
          </h3>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl h-60 overflow-y-scroll text-xs text-slate-400 space-y-4 leading-relaxed font-mono">
          <p className="text-white font-bold">1. SCOPE OF SERVICES & NON-LEGAL ADVISORY DISCLAIMER</p>
          <p>
            InvestNorth Canada provides corporate consulting, economic research, business acquisition matching, and business plan development services. InvestNorth Canada is NOT a law firm, nor a Regulated Canadian Immigration Consultant (RCIC). No attorney-client privilege is formed. All legal representation and official PNP submission filings are performed independently by licensed Canadian immigration legal professionals upon client referral.
          </p>

          <p className="text-white font-bold">2. ADVISORY FEE STRUCTURE & RETAINER</p>
          <p>
            The Client agrees to compensate InvestNorth Canada for business intelligence, target acquisition evaluation (using Murphy/Sunbelt database feeds), and full provincial business plan formulation:
            <br />• Capital under $300,000 CAD: $3,500 CAD Advisory Retainer
            <br />• Capital $300,000 - $799,999 CAD: $7,500 CAD Advisory Retainer
            <br />• Capital $800,000+ CAD: $15,000 CAD Advisory Retainer
            <br />50% retainer due upon signing; 50% due upon delivery of final Business Plan.
          </p>

          <p className="text-white font-bold">3. BANK VERIFICATION & FUNDS VALIDATION</p>
          <p>
            Client agrees to submit banking confirmation or liquid asset verification via encrypted portal prior to finalizing business target acquisition proposals.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="accept"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="h-5 w-5 rounded border-slate-800 bg-slate-950 text-emerald-500 focus:ring-emerald-500"
              />
              <label htmlFor="accept" className="text-sm text-slate-300">
                I acknowledge that InvestNorth Canada provides business advisory services and I agree to the advisory fee structure and terms.
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                Digital Signature (Type Full Legal Name)
              </label>
              <input
                type="text"
                placeholder="Alexander Vance"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-serif text-lg"
              />
            </div>

            <button
              type="submit"
              disabled={!accepted || !signature}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold py-4 rounded-xl transition shadow-xl cursor-pointer"
            >
              Sign Engagement Agreement & Connect Banking Verification →
            </button>
          </form>
        ) : (
          <div className="bg-emerald-950/40 border border-emerald-500/50 p-6 rounded-2xl text-center space-y-4">
            <div className="text-emerald-400 font-bold text-lg">✓ Agreement Signed & Executed</div>
            <p className="text-sm text-slate-300">
              Thank you, <span className="text-white font-bold">{signature}</span>. Your signed agreement has been logged.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleProceedToPayment}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-md hover:shadow-blue-500/20 cursor-pointer"
              >
                Proceed to Bank Verification (Stripe Portal) →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}