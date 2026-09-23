"use client";
import { useState } from "react";

interface LocationData {
  id: string;
  cityName: string;
  province: string;
  businessTitle: string;
  videoUrl: string;
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
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with your property/location drone tour video URL
    googleMapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d80290.49132149!2d-112.18568!3d49.78442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x536d7a421683bbd7%3A0x5037b28c7231c50!2sTaber%2C%20AB!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca",
    keyHighlights: [
      "High-yield agricultural hub with direct highway connectivity",
      "Low municipal tax rates and expedited commercial zoning",
      "Immediate demand for local food processing & cold storage",
    ],
    municipalIncentive: "100% Municipal Tax Rebate in Year 1 for commercial buyers creating 3+ local jobs.",
  },
  {
    id: "loc-2",
    cityName: "Vernon",
    province: "British Columbia",
    businessTitle: "Established Hospitality & Ecotourism Property",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    googleMapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82800.00000000!2d-119.272!3d50.267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537ee80000000000%3A0x0!2sVernon%2C%20BC!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca",
    keyHighlights: [
      "Rapidly growing year-round tourism destination",
      "Turnkey operation with existing management staff willing to remain",
      "Official regional priority sector for Okanagan development",
    ],
    municipalIncentive: "Priority processing for local building permits and heritage expansion grants.",
  },
];

export default function LocationShowcase() {
  const [selectedLoc, setSelectedLoc] = useState<LocationData>(SAMPLE_LOCATIONS[0]);
  const [activeTab, setActiveTab] = useState<"video" | "map">("video");

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-4 py-1.5 rounded-full inline-block">
            Virtual Site Inspection
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Explore Recommended Canadian Locations
          </h2>
          <p className="text-slate-400 text-sm">
            Experience 3D geographical mapping, aerial drone location video walkthroughs, and municipal incentives before visiting in person.
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

        {/* Media Viewer Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Video & Map Embed Container */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 max-w-xs">
              <button
                onClick={() => setActiveTab("video")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeTab === "video" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                🎥 Video Walkthrough
              </button>
              <button
                onClick={() => setActiveTab("map")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeTab === "map" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                🗺️ Google Earth / Map
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden aspect-video shadow-inner relative">
              {activeTab === "video" ? (
                <iframe
                  src={selectedLoc.videoUrl}
                  title={`${selectedLoc.cityName} Video Tour`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <iframe
                  src={selectedLoc.googleMapEmbedUrl}
                  title={`${selectedLoc.cityName} Map View`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>
          </div>

          {/* Right Column: Location & Municipal Intelligence */}
          <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                Target Business & Location
              </span>
              <h3 className="text-xl font-bold text-white mt-1">{selectedLoc.businessTitle}</h3>
              <p className="text-xs text-slate-400 mt-1">
                Municipality: <strong className="text-slate-200">{selectedLoc.cityName}, {selectedLoc.province}</strong>
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-300">Location Highlights</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                {selectedLoc.keyHighlights.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-xl space-y-1">
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