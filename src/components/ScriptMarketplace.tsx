import React, { useState } from 'react';
import { ScriptItem, Profile } from '../types';
import { Sparkles, FileText, Lock, ShieldCheck, HelpCircle, DollarSign, Plus, CheckCircle, RefreshCw } from 'lucide-react';

interface ScriptMarketplaceProps {
  scripts: ScriptItem[];
  currentProfile: Profile;
  onUpdateScripts: (updated: ScriptItem[]) => void;
}

export default function ScriptMarketplace({
  scripts,
  currentProfile,
  onUpdateScripts
}: ScriptMarketplaceProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newGenre, setNewGenre] = useState('');
  const [newLogline, setNewLogline] = useState('');
  const [newPageCount, setNewPageCount] = useState(100);
  const [newPriceEx, setNewPriceEx] = useState(15000);
  const [newPriceLic, setNewPriceLic] = useState(1000);
  const [newContent, setNewContent] = useState('');

  // Selected script detail viewing
  const [selectedScriptId, setSelectedScriptId] = useState<string | null>('s1');
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationFeedback, setVerificationFeedback] = useState<string | null>(null);

  const handleCreateScript = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newLogline.trim()) return;

    const pseudoHash = `SHA-256://CINEMAHUB-BLOCKCHAIN-${Math.random().toString(16).toUpperCase().substring(2, 16)}`;

    const newScript: ScriptItem = {
      id: `script_${Date.now()}`,
      title: newTitle,
      genre: newGenre || 'Drama',
      logline: newLogline,
      pageCount: Number(newPageCount) || 95,
      priceExclusive: Number(newPriceEx) || 12000,
      priceLicense: Number(newPriceLic) || 800,
      authorId: currentProfile.id,
      authorName: currentProfile.name,
      isCopyrightProtected: true,
      protectHash: pseudoHash,
      previewText: newContent.split('\n').slice(0, 5).join('\n') || 'EXT. EXPERIMENTAL SCENE - NIGHT...',
      fullContent: newContent || 'Full dramatic dialog script blocks...'
    };

    onUpdateScripts([newScript, ...scripts]);
    setShowAddModal(false);
    setNewTitle('');
    setNewGenre('');
    setNewLogline('');
    setNewContent('');
    alert(`Success! "${newTitle}" published. Secure intellectual protection hash activated instantly.`);
  };

  const handleVerifySecures = (script: ScriptItem) => {
    setVerificationLoading(true);
    setVerificationFeedback(null);
    setTimeout(() => {
      setVerificationLoading(false);
      setVerificationFeedback(
        `Verified! Safe IP certificate matches CinemaHub cryptographed ledger. File authenticity timestamp logged for "${script.title}" corresponding to author "${script.authorName}" under ledger token: ${script.protectHash}`
      );
    }, 1200);
  };

  const handlePurchaseOptions = (script: ScriptItem, format: 'Exclusive' | 'License') => {
    const price = format === 'Exclusive' ? script.priceExclusive : script.priceLicense;
    const confirmBuy = window.confirm(
      `Confirm transaction simulation? Acquire ${format} rights of "${script.title}" by ${script.authorName} for $${price.toLocaleString()}. This secures standard contract signatures.`
    );
    if (confirmBuy) {
      alert(
        `Contract Signed! Simulated licensing invoice generated successfully under serial token block. Exclusive access code provided: CH_SECURE_AUTH_${Math.floor(100000 + Math.random() * 900000)}`
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and control bar */}
      <div className="bg-[#12131a] border border-[#232430] rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-gray-100 font-bold text-sm">Prestige Arab & World Creative Script Marketplace</h2>
          <p className="text-xs text-gray-500">Acquire film rights, option epic story outlines, or license premium dialogue treatments.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-[#0a0a0f] text-xs font-bold px-4 py-2.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/10"
        >
          <Plus className="w-4 h-4" />
          Publish Script to Trade
        </button>
      </div>

      {/* Main Grid: Listings Left, Details & Copyright block Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scripts lists column */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Available Screenscripts ({scripts.length})
          </h3>

          <div className="space-y-4">
            {scripts.map(script => {
              const isSelected = selectedScriptId === script.id;
              return (
                <div
                  key={script.id}
                  onClick={() => {
                    setSelectedScriptId(script.id);
                    setVerificationFeedback(null);
                  }}
                  className={`bg-[#12131a] border rounded-xl p-5 cursor-pointer hover:border-amber-500/35 transition-all ${isSelected ? 'border-amber-500 bg-[#161724]' : 'border-[#232430]'}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded uppercase font-mono">
                        {script.genre}
                      </span>
                      <h4 className="text-gray-100 font-bold text-sm mt-2">{script.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Written by: <strong className="text-amber-500">{script.authorName}</strong></p>
                    </div>

                    <div className="flex bg-[#0c0d12] border border-[#232430] p-1 text-[10px] rounded space-x-1 font-mono text-gray-400">
                      <span>📄 {script.pageCount} pages</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 mt-2 line-clamp-2 italic leading-relaxed">
                    "{script.logline}"
                  </p>

                  <div className="flex justify-between items-center text-[11px] text-gray-300 pt-3 mt-4 border-t border-[#1e1f2b]">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Encrypted Blockchain Copyright Seal
                    </span>

                    <span className="font-mono text-amber-500 font-bold">
                      Lic: ${script.priceLicense.toLocaleString()} / Excl: ${script.priceExclusive.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Script script content preview & purchase block - Right */}
        <div className="lg:col-span-6">
          {selectedScriptId ? (() => {
            const script = scripts.find(s => s.id === selectedScriptId);
            if (!script) return null;

            return (
              <div className="bg-[#12131a] border border-[#232430] rounded-xl p-5 space-y-6 sticky top-4 shadow-2xl">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-xs bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded font-mono">
                      {script.genre} Treatment
                    </span>
                    <span className="text-xs text-gray-500">{script.pageCount} Pages formatted</span>
                  </div>
                  <h3 className="text-gray-100 font-extrabold text-base mt-2">{script.title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Author of Record: <strong>{script.authorName}</strong></p>
                </div>

                {/* Logline Box */}
                <div className="bg-[#0b0c10] border border-[#232430] p-3 rounded-lg text-xs">
                  <p className="text-amber-500 uppercase font-bold text-[10px] tracking-wider mb-1">Central Story Premise:</p>
                  <p className="text-gray-200 leading-normal italic">"{script.logline}"</p>
                </div>

                {/* Secure script Preview text */}
                <div className="space-y-2">
                  <p className="text-gray-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    <FileText className="w-4 h-4 text-amber-500" />
                    Secure Screenplay Preview
                  </p>
                  <pre className="bg-[#050608] border border-[#20212d] text-[#b4b7c5] text-[10px] p-4 rounded-lg font-mono overflow-x-auto whitespace-pre-wrap max-h-48 leading-relaxed shadow-inner">
                    {script.previewText}
                  </pre>
                  <p className="text-[10px] text-gray-500 text-center italic">Formatting adheres strictly to the International Screenwriting Guild standards.</p>
                </div>

                {/* IP Protection seals and verification validation tool */}
                <div className="bg-[#0c0d12] border border-[#232430] p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      IP Blockchain Certificate: Registered
                    </span>
                    <span className="text-[9px] font-mono text-gray-600">{script.protectHash.substring(0, 22)}...</span>
                  </div>

                  <p className="text-[11px] text-gray-400 leading-normal">
                    This document enjoys absolute automatic trademark preservation via CinemaHub's regional decentralization ledger registry. Any option or piracy conflict is cross-referenced instantly.
                  </p>

                  <button
                    onClick={() => handleVerifySecures(script)}
                    className="w-full bg-[#1b1c2b] hover:bg-amber-500/10 text-amber-500 hover:text-amber-400 font-bold text-[11px] py-2 rounded-lg border border-amber-500/20 transition cursor-pointer flex justify-center items-center gap-1.5"
                  >
                    {verificationLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
                        Scanning Ledger Nodes...
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        Verify Intellectual Security Chain Integrity
                      </>
                    )}
                  </button>

                  {verificationFeedback && (
                    <div className="bg-emerald-500/5 border border-emerald-500/15 p-2 rounded text-[10px] text-emerald-400 font-semibold leading-relaxed animate-fadeIn">
                      {verificationFeedback}
                    </div>
                  )}
                </div>

                {/* Price lists and buying buttons */}
                <div className="pt-2 border-t border-[#1e1f2b] space-y-3">
                  <h4 className="text-gray-200 text-xs font-bold uppercase tracking-wider">Purchase and Option Deals</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#0b0c10] border border-[#232430] p-3 rounded-lg text-center space-y-1">
                      <span className="text-[10px] text-gray-500 uppercase block font-semibold">Standard Direct Option</span>
                      <strong className="text-sm font-extrabold text-amber-500 block">${script.priceLicense.toLocaleString()}</strong>
                      <span className="text-[9px] text-gray-600 block line-clamp-1">Option rights (1 Year)</span>
                      <button
                        onClick={() => handlePurchaseOptions(script, 'License')}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[10px] py-1.5 rounded mt-2 cursor-pointer transition"
                      >
                        Option Story Rights
                      </button>
                    </div>

                    <div className="bg-[#0b0c10] border border-[#232430] p-3 rounded-lg text-center space-y-1">
                      <span className="text-[10px] text-gray-500 uppercase block font-semibold">Exclusive Buyout IP</span>
                      <strong className="text-sm font-extrabold text-[#bf9951] block">${script.priceExclusive.toLocaleString()}</strong>
                      <span className="text-[9px] text-gray-600 block line-clamp-1">Full IP Transfer & Credits</span>
                      <button
                        onClick={() => handlePurchaseOptions(script, 'Exclusive')}
                        className="w-full bg-[#bf9951] hover:bg-amber-600 text-slate-950 font-bold text-[10px] py-1.5 rounded mt-2 cursor-pointer transition"
                      >
                        Buy Exclusive Rights
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })() : (
            <div className="bg-[#12131a] text-center p-12 text-gray-500 rounded-xl">
              <p>Select any script from the trade ledger to analyze characters, pricing, security hashes and sample content.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Script Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#000]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-[#12131a] border border-[#2c2d3c] rounded-xl p-6 max-w-lg w-full shadow-2xl relative">
            <span
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 text-xl font-bold cursor-pointer"
            >
              &times;
            </span>

            <h3 className="text-gray-100 text-base font-bold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-500" />
              Publish Screenscript Material
            </h3>

            <form onSubmit={handleCreateScript} className="space-y-4">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">Screenscript Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dawn of Al-Masa"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 text-xs rounded p-2.5 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">Genre</label>
                  <input
                    type="text"
                    placeholder="e.g. Political Drama"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 text-xs rounded p-2.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">Page Count</label>
                  <input
                    type="number"
                    value={newPageCount}
                    onChange={(e) => setNewPageCount(Number(e.target.value))}
                    className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 text-xs rounded p-2.5 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">Licensing fee (S)</label>
                  <input
                    type="number"
                    value={newPriceLic}
                    onChange={(e) => setNewPriceLic(Number(e.target.value))}
                    className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 text-xs rounded p-2.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">Exclusive Buyout ($)</label>
                  <input
                    type="number"
                    value={newPriceEx}
                    onChange={(e) => setNewPriceEx(Number(e.target.value))}
                    className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 text-xs rounded p-2.5 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">Teaser Logline</label>
                <input
                  type="text"
                  required
                  placeholder="Summarize the core premise, characters stakes, and setting focus."
                  value={newLogline}
                  onChange={(e) => setNewLogline(e.target.value)}
                  className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 text-xs rounded p-2.5 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">Dialogue Segment Preview</label>
                <textarea
                  rows={4}
                  placeholder={`INT. CASTLE - MOONLIGHT\n\nDialogue blocks and standard parenthetical descriptions...`}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 text-xs rounded p-2.5 focus:outline-none font-mono"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-[#232430] text-gray-300 text-xs px-4 py-2 rounded font-semibold hover:bg-gray-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 text-slate-950 hover:bg-amber-600 text-xs px-5 py-2 rounded font-bold transition shadow-lg shadow-amber-500/15"
                >
                  Publish screenscript draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
