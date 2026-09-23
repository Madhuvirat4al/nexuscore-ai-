// Dynamic Theme Engine Service

export const THEMES = [
  { id: 'bloomberg', name: 'Bloomberg Midnight', desc: 'Deep obsidian & slate navy (#0A0F1D)', bg: '#0A0F1D', card: '#1C2541', accent: '#48CAE4', text: '#F1F5F9' },
  { id: 'stripe', name: 'Stripe Clean Light', desc: 'Crisp executive SaaS white & slate (#F8FAFC)', bg: '#F8FAFC', card: '#FFFFFF', accent: '#6366F1', text: '#0F172A' },
  { id: 'cyberpunk', name: 'Cyberpunk Neon', desc: 'Obsidian with Electric Cyan & Neon Coral (#090D16)', bg: '#090D16', card: '#131B2E', accent: '#00F5D4', text: '#FFFFFF' },
  { id: 'financialNavy', name: 'Financial Navy', desc: 'Classic Wall Street Navy & Royal Blue (#060B18)', bg: '#060B18', card: '#0D1B36', accent: '#38BDF8', text: '#E2E8F0' },
];

export const themeService = {
  applyTheme: (themeId) => {
    const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
    document.documentElement.setAttribute('data-theme', theme.id);
    
    // Set custom CSS variables on root
    document.documentElement.style.setProperty('--bg-dark', theme.bg);
    document.documentElement.style.setProperty('--slate-card', theme.card);
    document.documentElement.style.setProperty('--accent-cyan', theme.accent);
    
    if (theme.id === 'stripe') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }

    localStorage.setItem('nexuscore_theme_v1', theme.id);
    return theme;
  },

  getCurrentTheme: () => {
    const saved = localStorage.getItem('nexuscore_theme_v1') || 'bloomberg';
    return THEMES.find(t => t.id === saved) || THEMES[0];
  }
};
