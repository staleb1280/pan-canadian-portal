import { PNP_STREAMS, PNPStreamRequirement } from "./pnp-config";

export interface ApplicantProfile {
  netWorthCAD: number;
  investmentFundsCAD: number;
  preferredSectors: string[];
  managementExperienceYears: number;
  languageLevelCLB: number;
}

export interface EligibilityResult {
  stream: PNPStreamRequirement;
  eligible: boolean;
  score: number;
  missingCriteria: string[];
}

export function evaluatePNPEligibility(profile: ApplicantProfile): EligibilityResult[] {
  return PNP_STREAMS.map((stream) => {
    const missing: string[] = [];
    let score = 0;

    if (profile.netWorthCAD < stream.minNetWorthCAD) {
      missing.push(`Net worth below minimum ($${stream.minNetWorthCAD.toLocaleString()} CAD)`);
    } else {
      score += 25;
    }

    if (profile.investmentFundsCAD < stream.minInvestmentCAD) {
      missing.push(`Investment capital below minimum ($${stream.minInvestmentCAD.toLocaleString()} CAD)`);
    } else {
      score += 35;
    }

    const matchesSector = profile.preferredSectors.some((sector) =>
      stream.prioritySectors.includes(sector)
    );
    if (matchesSector) score += 15;

    if (profile.managementExperienceYears >= 3) score += 15;
    if (profile.languageLevelCLB >= 4) score += 10;

    return {
      stream,
      eligible: missing.length === 0,
      score,
      missingCriteria: missing
    };
  });
}
