export interface PNPStreamRequirement {
    id: string;
    name: string;
    province: string;
    minNetWorthCAD: number;
    minInvestmentCAD: number;
    minOwnershipPercent: number;
    prioritySectors: string[];
  }
  
  export const PNP_STREAMS: PNPStreamRequirement[] = [
    {
      id: "aaip-rural",
      name: "Rural Entrepreneur Stream",
      province: "Alberta (AAIP)",
      minNetWorthCAD: 300000,
      minInvestmentCAD: 100000,
      minOwnershipPercent: 51,
      prioritySectors: ["Agri-Tech", "Tourism & Hospitality", "Logistics", "Local Services"]
    },
    {
      id: "bcpnp-regional",
      name: "Regional Pilot Stream",
      province: "British Columbia (BC PNP)",
      minNetWorthCAD: 300000,
      minInvestmentCAD: 100000,
      minOwnershipPercent: 51,
      prioritySectors: ["Clean Energy", "Agri-Tech", "Manufacturing", "Tourism"]
    },
    {
      id: "oinp-outside-gta",
      name: "Entrepreneur Stream (Outside GTA)",
      province: "Ontario (OINP)",
      minNetWorthCAD: 400000,
      minInvestmentCAD: 200000,
      minOwnershipPercent: 33.3,
      prioritySectors: ["ICT / Digital Tech", "Manufacturing", "Life Sciences", "Logistics"]
    },
    {
      id: "oinp-gta",
      name: "Entrepreneur Stream (GTA)",
      province: "Ontario (OINP)",
      minNetWorthCAD: 800000,
      minInvestmentCAD: 600000,
      minOwnershipPercent: 33.3,
      prioritySectors: ["Financial Tech", "AI & Software", "Biotech", "Advanced Manufacturing"]
    },
    {
      id: "aaip-farm",
      name: "Farm Stream",
      province: "Alberta (AAIP)",
      minNetWorthCAD: 500000,
      minInvestmentCAD: 500000,
      minOwnershipPercent: 100,
      prioritySectors: ["Primary Agriculture", "Agri-Food Processing", "Livestock Management"]
    }
  ];
  
  export const NET_WORTH_OPTIONS = [
    { label: "Under $300,000 CAD", value: 250000 },
    { label: "$300,000 – $499,999 CAD", value: 300000 },
    { label: "$500,000 – $799,999 CAD", value: 500000 },
    { label: "$800,000 – $1,499,999 CAD", value: 800000 },
    { label: "$1,500,000+ CAD", value: 1500000 }
  ];
  
  export const INVESTMENT_FUNDS_OPTIONS = [
    { label: "Under $100,000 CAD", value: 75000 },
    { label: "$100,000 – $199,999 CAD", value: 100000 },
    { label: "$200,000 – $499,999 CAD", value: 200000 },
    { label: "$500,000 – $799,999 CAD", value: 500000 },
    { label: "$800,000+ CAD", value: 800000 }
  ];
  