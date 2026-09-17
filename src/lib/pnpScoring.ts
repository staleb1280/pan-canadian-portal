export interface EligibilityResult {
  isEligible: boolean;
  minNetWorth: number;
  minInvestment: number;
  reasons: string[];
  suggestedAlternatives: string[];
}

export const PROVINCIAL_THRESHOLDS: Record<string, { minNetWorth: number; minInvestment: number }> = {
  Ontario: { minNetWorth: 600000, minInvestment: 200000 },
  "British Columbia": { minNetWorth: 600000, minInvestment: 200000 },
  Saskatchewan: { minNetWorth: 500000, minInvestment: 200000 },
  Manitoba: { minNetWorth: 500000, minInvestment: 150000 },
  Alberta: { minNetWorth: 300000, minInvestment: 100000 },
};

export function calculateEligibility(province: string, netWorth: number, investment: number): EligibilityResult {
  const threshold = PROVINCIAL_THRESHOLDS[province] || { minNetWorth: 500000, minInvestment: 200000 };
  const reasons: string[] = [];

  if (netWorth < threshold.minNetWorth) {
    reasons.push(`Net worth below $${threshold.minNetWorth.toLocaleString()} CAD minimum`);
  }
  if (investment < threshold.minInvestment) {
    reasons.push(`Investment below $${threshold.minInvestment.toLocaleString()} CAD minimum`);
  }

  const isEligible = reasons.length === 0;
  const suggestedAlternatives: string[] = [];

  if (!isEligible) {
    Object.entries(PROVINCIAL_THRESHOLDS).forEach(([altProvince, altThreshold]) => {
      if (altProvince !== province) {
        if (netWorth >= altThreshold.minNetWorth && investment >= altThreshold.minInvestment) {
          suggestedAlternatives.push(altProvince);
        }
      }
    });
  }

  return {
    isEligible,
    minNetWorth: threshold.minNetWorth,
    minInvestment: threshold.minInvestment,
    reasons,
    suggestedAlternatives,
  };
}
