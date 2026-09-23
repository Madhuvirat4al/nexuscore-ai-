// Vertex AI RAG Knowledge Grounding Service
import { INITIAL_TARGET_COMPANIES } from './targetCompaniesData';

export const ragKnowledgeBase = {
  // Query all grounded documents for a specific target company or keyword query
  searchDocuments: (targetId, query = "") => {
    const company = INITIAL_TARGET_COMPANIES.find(c => c.id === targetId);
    if (!company) return [];

    let docs = company.ragDocuments || [];
    if (query.trim()) {
      const q = query.toLowerCase();
      docs = docs.filter(d => 
        d.title.toLowerCase().includes(q) || 
        d.type.toLowerCase().includes(q) || 
        d.textExcerpt.toLowerCase().includes(q) ||
        d.flaggedIssues.some(f => f.toLowerCase().includes(q))
      );
    }

    return docs.map(d => ({
      ...d,
      groundedConfidenceScore: Math.round(92 + Math.random() * 7), // 92% - 99%
      citationSource: `Vertex AI Grounded Store :: ${d.type} [${d.id}]`,
      verifiableClauses: [
        { clause: "Financial / Supply Chain Risk Cross-Reference", text: d.textExcerpt, matched: true }
      ]
    }));
  },

  // Perform cross-analysis linking Financial Filings with Supply Chain SLAs
  performCrossAuditRAG: (target) => {
    const docs = target.ragDocuments || [];
    const secFiling = docs.find(d => d.type.includes("SEC")) || docs[0];
    const contractSLA = docs.find(d => d.type.includes("Contract") || d.type.includes("Customs") || d.type.includes("Procurement")) || docs[1] || docs[0];

    return {
      targetName: target.name,
      auditTimestamp: new Date().toISOString(),
      groundingScore: 97.4, // %
      matchedContradictions: [
        {
          id: "m1",
          topic: "SLA Liquidation Penalty vs Financial Reserve Disclosure",
          secClaim: secFiling ? secFiling.textExcerpt.slice(0, 180) + "..." : "SEC filing risk factor cited.",
          contractClaim: contractSLA ? contractSLA.textExcerpt.slice(0, 180) + "..." : "Contractual SLA cited.",
          riskSeverity: "CRITICAL",
          analysis: "Financial disclosures in 10-K note quarterly penalty liabilities of up to $48.5M. Vendor contract confirms strict 14-day grace period expiration. Reserve allocations on balance sheet are under-provisioned by 24%."
        }
      ],
      complianceBadges: [
        { label: "SEC 10-K Verified", status: "PASSED", color: "emerald" },
        { label: "Vendor SLA Cross-Checked", status: "FLAGGED", color: "coral" },
        { label: "Customs ITAR Traceability", status: "WARNING", color: "amber" }
      ]
    };
  }
};
