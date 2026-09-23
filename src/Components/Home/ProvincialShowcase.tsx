"use client";
import { useState } from "react";

interface ProvinceData {
  id: string;
  name: string;
  tagline: string;
  minCapital: string;
  keyIndustries: string[];
  economicHighlights: string[];
  agency: string;
  resourcesLink: string;
}

const PROVINCIAL_PRESENTATIONS: Record<string, ProvinceData> = {
  ab: {
    id: "ab",
    name: "Alberta",
    tagline: "Canada's Low-Tax Economic Engine",
    minCapital: "$100,000 CAD",
    keyIndustries: ["Agri-Tech", "Clean Energy & Hydrogen", "Logistics", "Tourism"],
    economicHighlights: [
      "No Provincial Sales Tax (PST) and lowest corporate tax rate in Canada (8%).",
      "PrairiesCan agency backing with rapid population growth and high consumer demand.",
      "Rural Renewal and Entrepreneur streams offer lower capital requirements."
    ],
    agency: "PrairiesCan",
    resourcesLink: "https://www.alberta.ca/starting-business"
  },
  bc: {
    id: "bc",
    name: "British Columbia",
    tagline: "Pacific Rim Tech & Resource Gateway",
    minCapital: "$100,000 CAD (Regional Pilot)",
    keyIndustries: ["Clean Tech", "Agri-Food", "Forestry Tech", "International Logistics"],
    economicHighlights: [
      "Direct trade infrastructure accessing Asian-Pacific markets via Port of Vancouver.",
      "PacifiCan funding programs targeting green technology and regional development.",
      "Regional Pilot Stream incentivizes business buy-outs in vibrant coastal communities."
    ],
    agency: "PacifiCan",
    resourcesLink: "https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/starting-a-business"
  },
  on: {
    id: "on",
    name: "Ontario",
    tagline: "Canada's Industrial & Financial Heartland",
    minCapital: "$200,000 CAD (Outside GTA)",
    keyIndustries: ["Software & AI", "Advanced Manufacturing", "Fintech", "Bio-Health"],
    economicHighlights: [
      "Largest regional economy in Canada generating 38% of national GDP.",
      "FedDev Ontario innovation grants and extensive supplier networks across 440+ municipalities.",
      "High concentration of top-tier universities and qualified technical talent."
    ],
    agency: "FedDev Ontario",
    resourcesLink: "https://www.ontario.ca/page/business/start"
  },
  sk_mb: {
    id: "sk_mb",
    name: "Saskatchewan & Manitoba",
    tagline: "Global Breadbasket & Heavy Industry Core",
    minCapital: "$150,000 CAD",
    keyIndustries: ["Primary Agriculture", "Food Processing", "Mining & Minerals", "Transportation"],
    economicHighlights: [
      "Abundant land resources and dominant global positions in potash, pulse crops, and grain.",
      "Lowest commercial operating costs and commercial real estate prices in Western Canada.",
      "Dedicated Farm & Business Investor streams targeting operational acquisitions."
    ],
    agency: "PrairiesCan",
    resourcesLink: "https://www.saskatchewan.ca/Business/Entrepreneurs-Start-or-Exit-a-Business"
  }
};

export default function ProvincialShowcase() {
  const [selectedProvince, setSelectedProvince] = useState<string>("ab");
  const activeData = PROVINCIAL_PRESENTATIONS[selectedProvince];

  return (
    <section className="py-20 bg-slate-900/40 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/50 border border-blue-800/50 px-4 py-1.5 rounded-full inline-block">
            Provincial Opportunity Analysis
          </h2>
          <h3 className="text-3xl font-extrabold text-white">
            Select an Investment Destination
          </h3>
          <p className="text-slate-400 text-sm">
            Review province-specific economic advantages, priority sectors, and government growth incentives.
          </p>
        </div>

        {/* Region Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Object.values(PROVINCIAL_PRESENTATIONS).map((prov) => (
            <button
              key={prov.id}
              onClick={() => setSelectedProvince(prov.id)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition ${
                selectedProvince === prov.id
                  ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg shadow-emerald-950/50"
                  : "bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {prov.name}
            </button>
          ))}
        </div>

        {/* Presentation Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden grid lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="text-emerald-400 font-bold text-sm tracking-wide uppercase">
                {activeData.agency} Regional Priority Zone
              </span>
              <h4 className="text-3xl md:text-4xl font-extrabold text-white mt-1">
                Investing in {activeData.name}
              </h4>
              <p className="text-slate-400 text-lg mt-2 font-medium">
                {activeData.tagline}
              </p>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Economic & Strategic Advantages
              </h5>
              <ul className="space-y-2">
                {activeData.economicHighlights.map((point, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-300 gap-3">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              {activeData.keyIndustries.map((ind, idx) => (
                <span
                  key={idx}
                  className="bg-slate-800 text-slate-300 text-xs px-3 py-1 rounded-md border border-slate-700"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl space-y-6 text-center">
            <div>
              <span className="text-slate-500 text-xs uppercase font-semibold">
                Min. Capital Threshold
              </span>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                {activeData.minCapital}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <a
                href={activeData.resourcesLink}
                target="_blank"
                rel="noreferrer"
                className="block w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition border border-slate-700"
              >
                Official {activeData.name} Guide ↗
              </a>
              <p className="text-[11px] text-slate-500 leading-tight">
                Integrates data from ISED Business Support, BizPaL, and StatCan regional indicators.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}