import React from 'react';
import { Palette, Globe, ChevronDown } from 'lucide-react';
import { THEMES, themeService } from '../services/themeService';
import { LANGUAGES } from '../services/i18nService';

export default function ThemeLanguageSelector({ currentTheme, onSelectTheme, currentLang, onSelectLang }) {
  return (
    <div className="flex items-center gap-2 font-mono text-xs">
      
      {/* Language Selector Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300">
          <Globe className="h-3.5 w-3.5 text-cyan-400" />
          <span>{LANGUAGES.find(l => l.code === currentLang)?.flag || '🇺🇸'}</span>
          <ChevronDown className="h-3 w-3 text-slate-400" />
        </button>

        <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-[#0B132B] border border-white/15 shadow-2xl p-1.5 hidden group-hover:block z-50">
          <div className="text-[10px] text-slate-400 px-2.5 py-1 font-semibold uppercase">Language i18n</div>
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => onSelectLang(lang.code)}
              className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition-all ${
                lang.code === currentLang ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <span>{lang.label}</span>
              <span>{lang.flag}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Theme Engine Selector Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300">
          <Palette className="h-3.5 w-3.5 text-cyan-400" />
          <span className="hidden sm:inline">{currentTheme.name}</span>
          <ChevronDown className="h-3 w-3 text-slate-400" />
        </button>

        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0B132B] border border-white/15 shadow-2xl p-1.5 hidden group-hover:block z-50">
          <div className="text-[10px] text-slate-400 px-2.5 py-1 font-semibold uppercase">Theme Engine</div>
          {THEMES.map(theme => (
            <button
              key={theme.id}
              onClick={() => onSelectTheme(theme.id)}
              className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                theme.id === currentTheme.id ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <div>
                <div className="font-semibold">{theme.name}</div>
                <div className="text-[9px] text-slate-400">{theme.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
