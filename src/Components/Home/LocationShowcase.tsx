"use client";
import { useState } from "react";

interface LocationData {
  id: string;
  cityName: string;
  province: string;
  businessTitle: string;
  targetSector: string;
  estimatedInvestment: string;
  googleMapEmbedUrl: string;
  keyHighlights: string[];
  municipalIncentive: string;
}

const SAMPLE_LOCATIONS: LocationData[] = [
  {
    id: "loc-1",
    cityName: "Taber",
    province: "Alberta",
    businessTitle: "Commercial Agri-Tech & Processing Facility",
    targetSector: "Agri-Food & Logistics",
    estimatedInvestment: "$350,000 - $500,000 CAD",
    googleMapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d80290.49132149!2d-112.18568!3d49.78442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x536d7a421683bbd7%3A0x5037b28c7231c50!2sTaber%2C%20AB!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca",
    keyHighlights: [
      "High-yield agricultural hub with direct highway connectivity",
      "Low municipal commercial tax rates and expedited zoning approval",
      "Immediate demand for local food processing & cold storage infrastructure",
    ],
    municipalIncentive:
      "100% Municipal Tax Rebate in Year 1 for commercial buyers creating 3+ local full-time jobs.",
  },
  {
    id: "loc-2",
    cityName: "Vernon",
    province: "British Columbia",
    businessTitle: "Established Hospitality & Ecotourism Property",
    targetSector: "Tourism & Commercial Real Estate",
    estimatedInvestment: "$800,000+ CAD",
    googleMapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82800.00000000!2d-119.272!3d50.267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537ee80000000000%3A0x0!2sVernon%2C%20BC!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca",
    keyHighlights: [
      "Rapidly growing year-round tourism and commercial hub in Okanagan Valley",
      "Turnkey operation with experienced key operational staff retained",
      "Designated regional priority sector under provincial immigration pathways",
    ],
    municipalIncentive:
      "Priority processing for commercial building permits and local heritage expansion grants.",
  },
];

export default function LocationShowcase() {
  const [selectedLoc, setSelectedLoc] = useState<LocationData>(SAMPLE_LOCATIONS[0]);

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-4 py-1.5 rounded-full inline-block">
            Geographic & Site Inspection Portal
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Explore Recommended Canadian Business Sites
          </h2>
          <p className="text-slate-400 text-sm">
            Interactive map boundaries, regional market demographics, and municipal incentives tailored for investor evaluation.
          </p>
        </div>

        {/* Location Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {SAMPLE_LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setSelectedLoc(loc)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedLoc.id === loc.id
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                  : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              📍 {loc.cityName}, {loc.province}
            </button>
          ))}
        </div>

        {/* Main Grid: Google Map + Location Details */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Google Map */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl min-h-[380px] relative flex flex-col">
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300">
                🗺️ Location Boundary: {selectedLoc.cityName}, {selectedLoc.province}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Live Google Earth View</span>
            </div>
            <iframe
              src={selectedLoc.googleMapEmbedUrl}
              title={`${selectedLoc.cityName} Location Map`}
              className="w-full flex-grow border-0 min-h-[320px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Right Column: Municipal Intelligence & Metrics */}
          <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-md inline-block">
                  {selectedLoc.targetSector}
                </span>
                <h3 className="text-xl font-bold text-white mt-2">{selectedLoc.businessTitle}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Est. Capital Deployment:{" "}
                  <strong className="text-blue-400">{selectedLoc.estimatedInvestment}</strong>
                </p>
              </div>

              <div className="space-y-2 border-t border-slate-800/80 pt-4">
                <h4 className="text-xs font-bold uppercase text-slate-300">Site Highlights</h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  {selectedLoc.keyHighlights.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-xl space-y-1 mt-4">
              <span className="text-[10px] font-bold uppercase text-emerald-400">
                Municipal Economic Development Endorsement
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedLoc.municipalIncentive}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}