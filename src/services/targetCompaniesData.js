// Target Enterprise Dataset for NexusCore AI
export const INITIAL_TARGET_COMPANIES = [
  {
    id: "target-apex-semi",
    ticker: "APEX",
    name: "Apex Semiconductor Corp",
    sector: "Technology & Microelectronics",
    marketCap: "$42.8 Billion",
    rating: "BBB+ / Stable",
    financialViabilityScore: 84, // 0 - 100
    supplyChainResilienceScore: 58, // 0 - 100
    overallRiskCategory: "Moderate Operational Risk",
    
    // Financial Metrics
    financials: {
      revenue: "$12.4B",
      ebitda: "$3.8B",
      freeCashFlow: "$2.1B",
      workingCapital: "$1.85B",
      totalAssets: "$18.2B",
      retainedEarnings: "$6.4B",
      ebit: "$3.1B",
      marketCapVal: "$42.8B",
      totalLiabilities: "$7.2B",
      altmanZScore: 3.42, // > 3.0 Safe zone
      dcfValuationPerShare: "$148.50",
      currentStockPrice: "$122.10",
      debtToEquityRatio: "0.86",
      quickRatio: "1.45",
      financialAnomalyFlag: false
    },

    // Supply Chain Risk Metrics
    supplyChain: {
      singleSourceVendorDependency: "68% (Taiwan Wafer Fab Co)",
      leadTimeVarianceDays: "+28 Days (Asia Pacific Shipping Lane)",
      reorderPointUnits: "450,000 Units",
      penaltyRiskExposure: "$48.5 Million / Quarter",
      activeRoutes: [
        { id: "R1", name: "Hsinchu -> Long Beach Port", delayRisk: "High", transitDays: 22, bottleneck: "Port Congestion & Geopolitical Strait" },
        { id: "R2", name: "Tainan -> Rotterdam Gateway", delayRisk: "Medium", transitDays: 34, bottleneck: "Red Sea Maritime rerouting" },
        { id: "R3", name: "Secondary Air Freight (Singapore -> LAX)", delayRisk: "Low", transitDays: 4, bottleneck: "Capacity Premium +340%" }
      ],
      topSuppliers: [
        { name: "Taiwan Wafer Fab Co", tier: "Tier 1", criticality: "Critical", country: "Taiwan", slaCompliance: 91.2 },
        { name: "Tokyo Silicon Substrates", tier: "Tier 1", criticality: "High", country: "Japan", slaCompliance: 96.8 },
        { name: "Eindhoven Lithography NV", tier: "Tier 2", criticality: "Critical", country: "Netherlands", slaCompliance: 99.1 },
        { name: "Schenker Global Air Freight", tier: "Tier 1 Freight", criticality: "Medium", country: "Germany", slaCompliance: 88.4 }
      ]
    },

    // Grounded RAG SEC & SLA Citations
    ragDocuments: [
      {
        id: "doc-apex-10k-2025",
        title: "SEC Form 10-K Annual Report (Item 1A Risk Factors)",
        type: "SEC Filing",
        fileSize: "4.2 MB",
        date: "2025-02-15",
        textExcerpt: "Item 1A. Risk Factors: We depend on a single third-party foundry in Hsinchu, Taiwan for over 68% of our advanced 3nm logic wafer manufacturing. Any interruption in power grid operations, geopolitical friction, or maritime disruption in the Taiwan Strait would immediately impair our ability to deliver orders, leading to contractual default penalties under enterprise customer SLAs of up to $48.5M quarterly.",
        flaggedIssues: ["Single-Source Vendor Reliance", "SLA Liquidation Penalty Clause", "Taiwan Strait Maritime Exposure"]
      },
      {
        id: "doc-apex-sla-009",
        title: "Master Services SLA Agreement — Global Tech OEM Corp",
        type: "Procurement Contract",
        fileSize: "1.8 MB",
        date: "2024-11-01",
        textExcerpt: "Section 14.3 (Liquidated Damages for Lead-Time Delay): Should Seller fail to fulfill quarterly chip allocations within 14 calendar days of agreed schedule, Buyer retains the right to assess a 1.5% penalty per week of order value, capped at 12.5% total order value ($48.5M limit per FY quarter).",
        flaggedIssues: ["Strict Delivery Penalty Thresholds", "14-day grace period expired"]
      }
    ],

    // Audit Log Notes
    sessionNotes: [
      { timestamp: "2026-09-20 14:32", author: "Principal Analyst", note: "Ran Python DCF model: Intrinsic valuation is $148.50 vs current $122.10. Undervalued, but supply chain single-point-of-failure caps upside." },
      { timestamp: "2026-09-21 09:15", author: "Supply Chain Risk Lead", note: "Air freight secondary contingency route verified. Increases unit transport cost by 32% but mitigates $48.5M SLA penalty exposure." }
    ]
  },

  {
    id: "target-titan-logistics",
    ticker: "TTN",
    name: "Titan Global Logistics Enterprise",
    sector: "Freight & Maritime Logistics",
    marketCap: "$18.6 Billion",
    rating: "A- / Stable",
    financialViabilityScore: 72,
    supplyChainResilienceScore: 89,
    overallRiskCategory: "Low Operational / Medium Financial Risk",

    financials: {
      revenue: "$28.1B",
      ebitda: "$2.9B",
      freeCashFlow: "$1.1B",
      workingCapital: "$0.92B",
      totalAssets: "$14.5B",
      retainedEarnings: "$3.2B",
      ebit: "$1.95B",
      marketCapVal: "$18.6B",
      totalLiabilities: "$8.9B",
      altmanZScore: 2.15, // Grey zone (1.81 - 2.99)
      dcfValuationPerShare: "$64.00",
      currentStockPrice: "$58.40",
      debtToEquityRatio: "1.58",
      quickRatio: "1.02",
      financialAnomalyFlag: true
    },

    supplyChain: {
      singleSourceVendorDependency: "18% (Multi-carrier redundancy)",
      leadTimeVarianceDays: "+5 Days (Global Network)",
      reorderPointUnits: "1,200,000 TEU",
      penaltyRiskExposure: "$12.1 Million / Quarter",
      activeRoutes: [
        { id: "R10", name: "Shanghai -> Hamburg Express", delayRisk: "Low", transitDays: 28, bottleneck: "Ems River Water Levels" },
        { id: "R11", name: "Panama Canal Trans-shipment", delayRisk: "Medium", transitDays: 18, bottleneck: "Freshwater Lock Restrictions" },
        { id: "R12", name: "US Rail Intermodal Corridor", delayRisk: "Low", transitDays: 6, bottleneck: "Labor Bargaining Schedule" }
      ],
      topSuppliers: [
        { name: "Maersk Line Direct", tier: "Tier 1 Ocean", criticality: "High", country: "Denmark", slaCompliance: 94.5 },
        { name: "Union Pacific Rail Freight", tier: "Tier 1 Rail", criticality: "High", country: "USA", slaCompliance: 97.2 },
        { name: "DP World Terminal Operations", tier: "Port Terminal", criticality: "Medium", country: "UAE", slaCompliance: 92.0 }
      ]
    },

    ragDocuments: [
      {
        id: "doc-titan-10q-2025",
        title: "SEC Form 10-Q Quarterly Report (Debt Obligations & Leases)",
        type: "SEC Filing",
        fileSize: "3.1 MB",
        date: "2025-05-10",
        textExcerpt: "Note 8. Long-Term Debt and Vessel Operating Leases: Company holds $8.9B in total liabilities, with $2.4B maturing within 18 months. Variable interest rate exposure accounts for 34% of credit facilities. Altman Z-score calculation reflects leverage ratio expansion during fleet electrification modernization.",
        flaggedIssues: ["Near-Term Refinancing Wall", "Variable Rate Exposure (34%)"]
      }
    ],

    sessionNotes: [
      { timestamp: "2026-09-19 11:20", author: "Credit Risk Officer", note: "Debt/Equity at 1.58 due to vessel lease capitalization. Cash generation is stable, but interest rate hikes reduce interest coverage margin." }
    ]
  },

  {
    id: "target-aerovanguard",
    ticker: "AVND",
    name: "AeroVanguard Defence Systems",
    sector: "Aerospace & National Security",
    marketCap: "$64.2 Billion",
    rating: "AA- / Prime",
    financialViabilityScore: 92,
    supplyChainResilienceScore: 64,
    overallRiskCategory: "High Customs & Material Compliance Risk",

    financials: {
      revenue: "$34.8B",
      ebitda: "$7.2B",
      freeCashFlow: "$4.5B",
      workingCapital: "$3.4B",
      totalAssets: "$42.0B",
      retainedEarnings: "$18.5B",
      ebit: "$5.8B",
      marketCapVal: "$64.2B",
      totalLiabilities: "$14.1B",
      altmanZScore: 4.18, // Very safe
      dcfValuationPerShare: "$310.00",
      currentStockPrice: "$285.50",
      debtToEquityRatio: "0.51",
      quickRatio: "1.92",
      financialAnomalyFlag: false
    },

    supplyChain: {
      singleSourceVendorDependency: "42% (Specialty Titanium & Rare Earths)",
      leadTimeVarianceDays: "+42 Days (Customs Clearance & Defense Audits)",
      reorderPointUnits: "85,000 Precision Castings",
      penaltyRiskExposure: "$85.0 Million / Contract",
      activeRoutes: [
        { id: "R20", name: "Kwinana (Australia) -> Savannah Port", delayRisk: "High", transitDays: 45, bottleneck: "Defense Strategic Export Clearance" },
        { id: "R21", name: "Gothenburg -> Charleston Air Logistics", delayRisk: "Low", transitDays: 3, bottleneck: "ITAR Specialized Handling" }
      ],
      topSuppliers: [
        { name: "AeroTitanium Australia Pty", tier: "Tier 1 Metals", criticality: "Critical", country: "Australia", slaCompliance: 86.0 },
        { name: "Safran Engine Component Systems", tier: "Tier 1 Aero", criticality: "Critical", country: "France", slaCompliance: 95.8 }
      ]
    },

    ragDocuments: [
      {
        id: "doc-avnd-customs-2025",
        title: "US Department of Commerce ITAR & Customs Audit Report",
        type: "Customs Regulation",
        fileSize: "5.6 MB",
        date: "2025-01-28",
        textExcerpt: "Audit Finding C-402: AeroVanguard titanium ingot shipments originating from Perth processing facilities encountered 42-day average customs holds under enhanced Rare Earth Element traceability guidelines. Supplier ITAR compliance verification documentation was delayed in Q4.",
        flaggedIssues: ["42-Day Rare Earth Customs Hold", "ITAR Compliance Documentation Lag"]
      }
    ],

    sessionNotes: [
      { timestamp: "2026-09-22 16:05", author: "Defense Analyst", note: "Financial balance sheet is pristine (Altman Z = 4.18). Material supply bottleneck in Titanium casting is sole vulnerability." }
    ]
  }
];
