// Media Generation Service (Generates Visual Executive Badges, Route Diagrams, and Audit Cards)

export const mediaGeneratorService = {
  // Generates a visual summary badge data object with dynamic color themes & status
  generateExecutiveCard: (target) => {
    const isSafe = target.financials.altmanZScore > 2.99;
    const isResilient = target.supplyChainResilienceScore >= 70;

    return {
      title: `Executive Risk Badge :: ${target.ticker}`,
      generatedAt: new Date().toLocaleTimeString(),
      badgeId: `NX-BADGE-${target.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      statusText: isSafe && isResilient ? "PRISTINE OPERATIONAL HEALTH" : isSafe ? "FINANCIALLY SOUND / SUPPLY CHAIN RISK" : "HIGH LEVERAGE / VULNERABLE",
      badgeColor: isSafe && isResilient ? "#06D6A0" : isSafe ? "#FFD166" : "#FF5A5F",
      metricsSummary: [
        { label: "Altman Z-Score", val: target.financials.altmanZScore, safe: isSafe },
        { label: "DCF Val Share", val: target.financials.dcfValuationPerShare, safe: true },
        { label: "SC Resilience", val: `${target.supplyChainResilienceScore}/100`, safe: isResilient },
        { label: "Penalty Exposure", val: target.supplyChain.penaltyRiskExposure, safe: false }
      ]
    };
  },

  // Generates SVG Route Contingency Visual Map data
  generateRouteContingencyMap: (target) => {
    return {
      mapTitle: `Maritime & Freight Contingency Corridors for ${target.name}`,
      activeRoutesCount: target.supplyChain.activeRoutes.length,
      primaryCorridor: target.supplyChain.activeRoutes[0] || { name: "Primary Corridor", transitDays: 20 },
      contingencyCorridor: target.supplyChain.activeRoutes[2] || target.supplyChain.activeRoutes[1] || { name: "Air Express Backup", transitDays: 4 },
      mitigationDeltaDays: 14,
      costPremiumPercent: "+34%"
    };
  }
};
