// Firestore Persistent Memory & State Service
import { INITIAL_TARGET_COMPANIES } from './targetCompaniesData';

const STORAGE_KEY = 'nexuscore_firestore_db_v1';

export const firestoreService = {
  // Get all target companies from persistent state
  getCompanies: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error("Firestore sync error:", e);
    }
    // Initial sync
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TARGET_COMPANIES));
    return INITIAL_TARGET_COMPANIES;
  },

  // Save or update target company
  saveCompany: (company) => {
    const companies = firestoreService.getCompanies();
    const index = companies.findIndex(c => c.id === company.id);
    if (index >= 0) {
      companies[index] = company;
    } else {
      companies.unshift(company);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
    return company;
  },

  // Add session note to cross-session memory
  addSessionNote: (companyId, author, note) => {
    const companies = firestoreService.getCompanies();
    const company = companies.find(c => c.id === companyId);
    if (!company) return null;

    const newNote = {
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      author,
      note
    };

    company.sessionNotes = company.sessionNotes || [];
    company.sessionNotes.unshift(newNote);

    firestoreService.saveCompany(company);
    return newNote;
  },

  // Export full Firestore database dump for audit compliance
  exportDatabaseDump: () => {
    const companies = firestoreService.getCompanies();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(companies, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `NexusCore_Firestore_Audit_Export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }
};
