"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { calculateEligibility } from "@/lib/pnpScoring";

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    province: "Ontario",
    netWorth: "",
    investmentAmount: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const evalResult = calculateEligibility(
    formData.province,
    parseFloat(formData.netWorth) || 0,
    parseFloat(formData.investmentAmount) || 0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      // 1. Save record to Supabase
      const { error: dbError } = await supabase.from("pnp_inquiries").insert([
        {
          name: formData.name,
          email: formData.email,
          province: formData.province,
          net_worth: parseFloat(formData.netWorth),
          investment_amount: parseFloat(formData.investmentAmount),
        },
      ]);

      if (dbError) throw dbError;

      // 2. Trigger notification email
      const { error: fnError } = await supabase.functions.invoke("notify-admin", {
        body: formData,
      });

      if (fnError) console.warn("Email notice:", fnError.message);

      setStatus("success");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "Failed to submit inquiry.");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", province: "Ontario", netWorth: "", investmentAmount: "" });
    setStep(1);
    setStatus("idle");
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md border border-slate-200">
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">PNP Investor Screening</h1>
            <p className="text-slate-500 text-xs mt-0.5">Pan-Canadian Entrepreneur Eligibility</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
            Step {step} of 3
          </span>
        </div>

        {status === "success" ? (
          <div className="space-y-4 text-center py-6">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl">
              ✓
            </div>
            <h2 className="text-lg font-bold text-slate-900">Screening Submitted!</h2>
            <p className="text-sm text-slate-600">
              Your profile has been saved. Our immigration advisors will review your submission and contact you shortly.
            </p>
            <button
              onClick={resetForm}
              className="mt-4 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 transition"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {status === "error" && (
              <div className="mb-4 p-3 bg-rose-50 text-rose-800 rounded-lg text-xs border border-rose-200">
                ✕ {errorMessage}
              </div>
            )}

            {/* STEP 1: Applicant Information */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  1. Contact Information
                </h2>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-900 text-sm outline-none"
                    placeholder="e.g. Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-900 text-sm outline-none"
                    placeholder="jane@example.com"
                  />
                </div>
                <button
                  type="button"
                  disabled={!formData.name || !formData.email}
                  onClick={() => setStep(2)}
                  className="w-full mt-2 bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-4 rounded-md transition duration-150 text-sm disabled:opacity-50"
                >
                  Continue to Financial Profile →
                </button>
              </div>
            )}

            {/* STEP 2: Financial Metrics */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  2. Financial Profile
                </h2>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Province</label>
                  <select
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-900 text-sm outline-none bg-white"
                  >
                    <option value="Ontario">Ontario (OINP)</option>
                    <option value="British Columbia">British Columbia (BC PNP)</option>
                    <option value="Alberta">Alberta (AAIP)</option>
                    <option value="Saskatchewan">Saskatchewan (SINP)</option>
                    <option value="Manitoba">Manitoba (MPNP)</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated Net Worth ($ CAD)</label>
                    <input
                      type="number"
                      required
                      value={formData.netWorth}
                      onChange={(e) => setFormData({ ...formData, netWorth: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-900 text-sm outline-none"
                      placeholder="600000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Intended Investment ($ CAD)</label>
                    <input
                      type="number"
                      required
                      value={formData.investmentAmount}
                      onChange={(e) => setFormData({ ...formData, investmentAmount: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-900 text-sm outline-none"
                      placeholder="200000"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 border border-slate-300 text-slate-700 font-medium py-2.5 px-4 rounded-md text-sm hover:bg-slate-50"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    disabled={!formData.netWorth || !formData.investmentAmount}
                    onClick={() => setStep(3)}
                    className="w-2/3 bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-4 rounded-md transition duration-150 text-sm disabled:opacity-50"
                  >
                    Review Eligibility →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Live Preview & Submission */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  3. Eligibility Summary
                </h2>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Applicant:</span>
                    <span className="font-semibold text-slate-900">{formData.name} ({formData.email})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target Program:</span>
                    <span className="font-semibold text-slate-900">{formData.province}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Net Worth / Investment:</span>
                    <span className="font-semibold text-slate-900">
                      ${Number(formData.netWorth).toLocaleString()} / ${Number(formData.investmentAmount).toLocaleString()} CAD
                    </span>
                  </div>
                </div>

                {/* Instant Eligibility Feedback */}
                <div className="p-4 rounded-lg border text-sm">
                  {evalResult.isEligible ? (
                    <div className="text-emerald-800 bg-emerald-50 p-3 rounded-md border border-emerald-200">
                      <p className="font-bold">✓ Pre-Qualified for {formData.province}</p>
                      <p className="text-xs mt-1 text-emerald-700">
                        Your financial profile meets or exceeds the minimum threshold for this program.
                      </p>
                    </div>
                  ) : (
                    <div className="text-rose-800 bg-rose-50 p-3 rounded-md border border-rose-200 space-y-2">
                      <p className="font-bold">✕ Below Minimums for {formData.province}</p>
                      {evalResult.suggestedAlternatives.length > 0 && (
                        <div className="text-xs pt-1 border-t border-rose-200/60 text-slate-700">
                          <span className="font-semibold text-blue-800">Alternative Options Available: </span>
                          Your capital qualifies for {evalResult.suggestedAlternatives.join(", ")}.
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/3 border border-slate-300 text-slate-700 font-medium py-2.5 px-4 rounded-md text-sm hover:bg-slate-50"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition duration-150 text-sm disabled:opacity-50"
                  >
                    {status === "loading" ? "Submitting..." : "Submit Inquiry"}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </main>
  );
}
