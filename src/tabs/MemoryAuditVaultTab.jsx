import React, { useState } from 'react';
import { FileSearch, MessageSquare, Plus, Download, Database, ShieldCheck, UserCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { firestoreService } from '../services/firestoreService';
import confetti from 'canvas-confetti';

export default function MemoryAuditVaultTab({ target, onTargetUpdate }) {
  const [newNoteText, setNewNoteText] = useState('');
  const [authorName, setAuthorName] = useState('Senior Solutions Architect');

  const notes = target.sessionNotes || [];

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    firestoreService.addSessionNote(target.id, authorName, newNoteText);
    setNewNoteText('');

    // Trigger celebration confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });

    if (onTargetUpdate) onTargetUpdate();
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <FileSearch className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl text-white">Firestore Persistent Memory & Audit Vault</h2>
              <p className="text-xs text-slate-400 font-mono">Pillar 3 Cross-Session Context Engine & Audit Trail Log</p>
            </div>
          </div>

          <button
            onClick={() => firestoreService.exportDatabaseDump()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold hover:bg-cyan-500/20 transition-all self-start sm:self-auto"
          >
            <Download className="h-4 w-4" /> Export Database Dump (.json)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Add Session Note Form */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <MessageSquare className="h-4 w-4 text-cyan-400" />
            <h3 className="font-heading font-bold text-slate-100 text-sm">Add Cross-Session Audit Note</h3>
          </div>

          <form onSubmit={handleAddNote} className="space-y-3 font-mono text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Author Title</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#0A0F1D] border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Audit Observation / Risk Note</label>
              <textarea
                rows="4"
                required
                placeholder="e.g. Verified tier-1 SLA penalty clause against SEC 10-K reserve disclosures. Risk confirmed..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#0A0F1D] border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white text-xs hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" /> Save Note to Firestore Store
            </button>
          </form>
        </div>

        {/* Audit Notes Timeline */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 font-mono text-xs">
            <span className="font-heading font-bold text-slate-100 text-sm flex items-center gap-2">
              <Database className="h-4 w-4 text-cyan-400" /> Historical Session Audit Logs ({notes.length})
            </span>
            <span className="text-slate-400">Target: {target.ticker}</span>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {notes.map((n, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#0A0F1D] border border-white/10 space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                    <UserCheck className="h-3.5 w-3.5" /> {n.author}
                  </span>
                  <span className="text-slate-500">{n.timestamp}</span>
                </div>
                <p className="text-slate-300 font-sans leading-relaxed text-xs">
                  {n.note}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
