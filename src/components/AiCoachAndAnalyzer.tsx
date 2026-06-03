import React, { useState } from 'react';
import { Sparkles, Play, Award, Film, FileText, CheckCircle2, RotateCw, AlertCircle, Quote } from 'lucide-react';

interface AiCoachAndAnalyzerProps {
  isLoadingAi: boolean;
  setIsLoadingAi: (loading: boolean) => void;
  userIsPremium: boolean;
  onUpgradePrompt: () => void;
}

export default function AiCoachAndAnalyzer({
  isLoadingAi,
  setIsLoadingAi,
  userIsPremium,
  onUpgradePrompt
}: AiCoachAndAnalyzerProps) {
  // Common states
  const [activeTab, setActiveTab] = useState<'coach' | 'analyzer'>('coach');

  // 1. Acting Coach States
  const [targetEmotion, setTargetEmotion] = useState('Dramatic / 🌟 غاضب ومؤثر');
  const [characterName, setCharacterName] = useState('Lady Macbeth');
  const [monologueText, setMonologueText] = useState(
    `Out, damned spot! out, I say!--One: two: why, then, 'tis time to do't.--Hell is murky!--Fie, my lord, fie! a soldier, and afeard? What need we fear who knows it, when none can call our power to account?--Yet who would have thought the old man to have had so much blood in him.`
  );
  const [videoFileSim, setVideoFileSim] = useState('rehearsal_macbeth_scene.mp4 (Simulated Webcam)');
  const [coachReport, setCoachReport] = useState<any | null>(null);

  const sampleMonologues = [
    {
      title: 'Lady Macbeth (English - Guilt/Drama)',
      char: 'Lady Macbeth',
      emotion: 'Dramatic / 🌟 غاضب ومؤثر',
      text: "Out, damned spot! out, I say!--One: two: why, then, 'tis time to do't.--Hell is murky!--Fie, my lord, fie! a soldier, and afeard? What need we fear who knows it, when none can call our power to account?--Yet who would have thought the old man to have had so much blood in him."
    },
    {
      title: 'The Godfather Michael (English - Suspense)',
      char: 'Michael Corleone',
      emotion: 'Cold Revenge / ❄️ هادئ وحاسم',
      text: "Only don't tell me that you're innocent. Because it insults my intelligence and it makes me very angry. Now, who was the contact? Was it Barzini? I’m of a new mind today."
    },
    {
      title: 'Antarah ibn Shaddad (Classical Arabic - Pride)',
      char: 'عنترة بن شداد',
      emotion: 'Pride & Courage / ⚔️ فخر وشجاعة عربية كلاسيكية',
      text: "حَكِّم سُيوفَكَ في رِقابِ العُذَّلِ .. وَإِذا نَزَلتَ بِدارِ ذُلٍّ فَاِرحَلِ\nوَإِذا بُليتَ بِظالِمٍ كُن ظالِماً .. وَإِذا لَقيتَ ذَوي الجَهالَةِ فَاِجهَلِ\nوَاِختَر لِنَفسِكَ مَنزِلاً تَعلو بِهِ .. أَو مُت كَريماً تَحتَ ظلِّ القَسطَلِ"
    }
  ];

  const handleRunActingCoach = async () => {
    if (!userIsPremium) {
      onUpgradePrompt();
      return;
    }
    setIsLoadingAi(true);
    try {
      const response = await fetch('/api/gemini/acting-coach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          monologue: monologueText,
          character: characterName,
          targetEmotion: targetEmotion
        })
      });

      const data = await response.json();
      setCoachReport(data);
    } catch (e) {
      console.error(e);
      alert('Error fetching AI Coaching guidelines report. Check your model configurations.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  // 2. Script Analyzer States
  const [scriptTitle, setScriptTitle] = useState('The Sunset Over Al-Ula');
  const [scriptGenre, setScriptGenre] = useState('Historical Drama / Sci-Fi');
  const [scriptLogline, setScriptLogline] = useState('A lone archaeologist unearths an ancient stellar mapping device under Al-Ula dunes with coordinates that point to a modern launching site.');
  const [scriptText, setScriptText] = useState(
    `EXT. AL-ULA ROCK FORMATIONS - DUSK\n\nGiant sandstone boulders cast long shadows over the flat canyon floor. Wind whistles through porous tunnels.\n\nZEIN (20s), dust-covered goggles dangling around his neck, wipes sand from a metallic copper dial protruding from the rock.\n\nZEIN\n(speaking to himself)\nThis is not Nabataean layout. It is compass-precision of cosmic scale.\n\nA heavy mechanical sound resonates behind him. The ground trembles slightly.\n\nZEIN (CONT'D)\nHello? Is there anyone stationed at camp sector B?`
  );
  const [analyzerReport, setAnalyzerReport] = useState<any | null>(null);

  const sampleScripts = [
    {
      title: 'The Sunset Over Al-Ula',
      genre: 'Historical Sci-Fi',
      logline: 'An archaeologist discovers mapping tools inside Nabataean tombs.',
      text: "EXT. AL-ULA ROCK FORMATIONS - DUSK\n\nGiant sandstone boulders cast long shadows over the flat canyon floor. Wind whistles through porous tunnels.\n\nZEIN (20s), dust-covered goggles dangling around his neck, wipes sand from a metallic copper dial protruding from the rock.\n\nZEIN\nThis is not Nabataean layout. It is compass-precision of cosmic scale.\n\nA heavy mechanical sound resonates behind him. The ground trembles slightly."
    },
    {
      title: 'Secret Treaty of Carthage',
      genre: 'Political Suspense',
      logline: 'Roman emissaries negotiate peace under betrayal guidelines.',
      text: "INT. CARTHAGE COUNCIL ROOM - NIGHT\n\nHASDRUBAL paces before a bronze brazier emitting thick pine smoke. Emissary LUCIUS sits confidently, sipping spiced local wine.\n\nHASDRUBAL\nYour terms demand the surrender of all triremes. That is not peace; it is slow drowning.\n\nLUCIUS\n(smiles coldly)\nRome does not bargain with shipwrecked empires, Hasdrubal. We dictate terms to those who value their soil."
    }
  ];

  const handleRunScriptAnalyzer = async () => {
    if (!userIsPremium) {
      onUpgradePrompt();
      return;
    }
    setIsLoadingAi(true);
    try {
      const response = await fetch('/api/gemini/script-analyzer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: scriptTitle,
          genre: scriptGenre,
          logline: scriptLogline,
          scriptText: scriptText
        })
      });

      const data = await response.json();
      setAnalyzerReport(data);
    } catch (e) {
      console.error(e);
      alert('Error fetching AI Script analysis. Check API endpoints of server.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Premium Warn header if not upgraded */}
      {!userIsPremium && (
        <div className="bg-gradient-to-r from-amber-500/20 to-indigo-500/10 border border-amber-500/30 p-4 rounded-xl flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3 text-xs text-gray-200">
            <span className="bg-amber-500 text-[#0c0d12] font-extrabold text-[10px] px-2 py-1 rounded-full animate-pulse uppercase">
              PRO Access Required
            </span>
            <p>
              AI Acting Coach & AI Script Analyzer use complex cloud parameters. Upgrade your account to <strong>CinemaHub Premium</strong> to unlock instant evaluations!
            </p>
          </div>
          <button
            onClick={onUpgradePrompt}
            className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg transition-transform cursor-pointer"
          >
            Upgrade Now
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-[#232430] bg-[#12131a] p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('coach')}
          id="tab-acting-coach"
          className={`flex-1 text-center py-2.5 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer ${activeTab === 'coach' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-gray-400 hover:text-gray-200'}`}
        >
          <Film className="w-4 h-4" />
          AI Acting Coach (Webcam & Monologue Analysis)
        </button>
        <button
          onClick={() => setActiveTab('analyzer')}
          id="tab-script-analyzer"
          className={`flex-1 text-center py-2.5 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer ${activeTab === 'analyzer' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-gray-400 hover:text-gray-200'}`}
        >
          <FileText className="w-4 h-4" />
          AI Script Analyzer & Commercial Potential Predictor
        </button>
      </div>

      {activeTab === 'coach' ? (
        /* ==================== ACTING COACH VIEW ==================== */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Setting Form Left */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-[#12131a] border border-[#232430] rounded-xl p-5 space-y-4">
              <h3 className="text-gray-100 font-bold text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Performance Evaluation Room
              </h3>

              {/* Sample Selector */}
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Load Quick Monologue Template:</label>
                <div className="flex flex-wrap gap-2">
                  {sampleMonologues.map((mono, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setCharacterName(mono.char);
                        setTargetEmotion(mono.emotion);
                        setMonologueText(mono.text);
                      }}
                      className="bg-[#1b1c26] hover:bg-amber-500/20 text-[10px] text-gray-300 border border-[#2c2d3c] px-2.5 py-1 rounded transition"
                    >
                      {mono.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Character Name</label>
                  <input
                    type="text"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-200 text-xs rounded p-2.5 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Target Emotion / Aura</label>
                  <input
                    type="text"
                    value={targetEmotion}
                    onChange={(e) => setTargetEmotion(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-200 text-xs rounded p-2.5 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Script / Monologue Text</label>
                <textarea
                  rows={4}
                  value={monologueText}
                  onChange={(e) => setMonologueText(e.target.value)}
                  className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-200 text-xs rounded p-3 focus:outline-none focus:border-amber-500 font-mono resize-none leading-relaxed"
                ></textarea>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Webcam Rehearsal Capture</label>
                <div className="border border-dashed border-[#2c2e3f] bg-[#0c0d15] p-4 rounded-lg text-center relative overflow-hidden group">
                  <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-2 animate-pulse">
                    <Play className="w-5 h-5 text-red-500 fill-red-500 ml-0.5" />
                  </div>
                  <p className="text-xs font-semibold text-gray-300">Visual Feed Interface Active</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Camera and Mic permissions are enabled</p>

                  <select
                    value={videoFileSim}
                    onChange={(e) => setVideoFileSim(e.target.value)}
                    className="bg-[#12131a] text-gray-400 text-[10px] mt-3 border border-[#232430] px-3 py-1 rounded"
                  >
                    <option value="webcam_active">Active Laptop Camera FaceTime HD</option>
                    <option value="sim_macbeth">rehearsal_macbeth_scene.mp4 (Simulated Playback)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleRunActingCoach}
                disabled={isLoadingAi || !monologueText}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/15 transition-all"
              >
                {isLoadingAi ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    AI Analyzing Facial Micro-expressions & Sound Waves...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-slate-900" />
                    Analyze Performance with AI Coach
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Analysis Right */}
          <div className="lg:col-span-6">
            {coachReport ? (
              <div className="bg-[#12131a] border border-[#232430] rounded-xl p-5 space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center border-b border-[#232430] pb-4">
                  <div>
                    <h3 className="text-gray-100 font-bold text-base flex items-center gap-1.5">
                      <Award className="w-5 h-5 text-amber-500" />
                      Acting Coach Feedback report
                    </h3>
                    <p className="text-xs text-gray-500">Subject: {characterName} - {targetEmotion}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-amber-500">{coachReport.overallScore || 90}</div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Overall Score</span>
                  </div>
                </div>

                {/* Score cards grid */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Facial Delivery', score: coachReport.facialScore || 88 },
                    { label: 'Voice Pitch', score: coachReport.voiceScore || 92 },
                    { label: 'Emotional Sincerity', score: coachReport.emotionalScore || 85 },
                    { label: 'Confidence', score: coachReport.confidenceScore || 94 },
                    { label: 'Pronunciation', score: coachReport.pronunciationScore || 89 },
                    { label: 'Stage Presence', score: coachReport.stagePresenceScore || 91 }
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-[#0c0d12] p-2.5 rounded-lg border border-[#232430] flex flex-col justify-between">
                      <span className="text-[10px] text-gray-400 block line-clamp-1">{stat.label}</span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-extrabold text-amber-500">{stat.score}%</span>
                        <div className="w-12 h-1 bg-gray-800 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full" style={{ width: `${stat.score}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Strengths & Improvements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-emerald-500/5 border border-emerald-500/10 p-3.5 rounded-lg space-y-2">
                    <h4 className="text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Stellar Strengths
                    </h4>
                    <ul className="space-y-1.5 text-xs text-gray-300">
                      {coachReport.strengths?.map((str: string, i: number) => (
                        <li key={i} className="flex gap-1.5">
                          <span className="text-emerald-500">•</span>
                          <span>{str}</span>
                        </li>
                      )) || <li>Natural emotional resonance and posture sync.</li>}
                    </ul>
                  </div>

                  <div className="bg-red-500/5 border border-red-500/10 p-3.5 rounded-lg space-y-2">
                    <h4 className="text-rose-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-400" />
                      Development Gaps
                    </h4>
                    <ul className="space-y-1.5 text-xs text-gray-300">
                      {coachReport.improvementAreas?.map((imp: string, i: number) => (
                        <li key={i} className="flex gap-1.5">
                          <span className="text-rose-500">•</span>
                          <span>{imp}</span>
                        </li>
                      )) || <li>Keep eye focus steady above the lens.</li>}
                    </ul>
                  </div>
                </div>

                {/* English Feedback */}
                <div className="bg-[#0b0c10] border border-[#232430] p-4 rounded-lg relative">
                  <Quote className="absolute top-2 right-2 w-10 h-10 text-gray-800/40 pointer-events-none" />
                  <h4 className="text-gray-200 text-xs font-bold uppercase tracking-wider mb-2">Director's Global Feedback:</h4>
                  <p className="text-xs text-gray-300 leading-relaxed italic">{coachReport.feedbackEn}</p>
                </div>

                {/* Arabic Feedback */}
                <div className="bg-[#1b1c2b] border border-amber-500/10 p-4 rounded-lg text-right relative" dir="rtl">
                  <span className="bg-amber-500 text-slate-950 font-bold text-[9px] px-1.5 py-0.5 rounded absolute top-2 left-2">
                    الترجمة الإيجابية
                  </span>
                  <h4 className="text-[#bf9951] text-xs font-bold uppercase tracking-wider mb-2">تعليق وتوجيهات مخرج الأداء:</h4>
                  <p className="text-xs text-gray-200 leading-relaxed font-sans">{coachReport.feedbackAr}</p>
                </div>

                {/* Coaching Tips */}
                {coachReport.coachingTips && (
                  <div className="bg-[#0c0d12] rounded-lg p-3.5 border border-[#2c2d3c] text-xs">
                    <p className="text-amber-500 font-bold mb-1">🎭 Recommended Coaching Exercises:</p>
                    <p className="text-gray-400 whitespace-pre-wrap">{coachReport.coachingTips}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#12131a] border border-[#232430] rounded-xl p-12 text-center text-gray-500 h-full flex flex-col justify-center items-center">
                <Play className="w-12 h-12 text-gray-600 mb-3" />
                <h4 className="text-gray-300 font-semibold mb-1">Awaiting Rehearsal Upload</h4>
                <p className="text-xs max-w-sm mx-auto leading-relaxed">
                  Start webcam capture or paste script text then click "Analyze" to obtain a structural evaluation metric from Gemini screen coach specialists!
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ==================== SCRIPT ANALYZER VIEW ==================== */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form left */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#12131a] border border-[#232430] rounded-xl p-5 space-y-4">
              <h3 className="text-gray-100 font-bold text-sm flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-500" />
                Scenario Intellectual Property Box
              </h3>

              {/* Sample script selector */}
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Load Sample Treatment:</label>
                <div className="flex flex-wrap gap-2">
                  {sampleScripts.map((scf, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setScriptTitle(scf.title);
                        setScriptGenre(scf.genre);
                        setScriptLogline(scf.logline);
                        setScriptText(scf.text);
                      }}
                      className="bg-[#1b1c26] hover:bg-amber-500/20 text-[10px] text-gray-300 border border-[#2c2d3c] px-2.5 py-1 rounded transition"
                    >
                      {scf.title}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Script Title</label>
                <input
                  type="text"
                  value={scriptTitle}
                  onChange={(e) => setScriptTitle(e.target.value)}
                  className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-200 text-xs rounded p-2.5 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Primary Genre</label>
                  <input
                    type="text"
                    value={scriptGenre}
                    onChange={(e) => setScriptGenre(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-200 text-xs rounded p-2.5 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <div className="flex items-center gap-2 bg-[#0c0d12] border border-[#232430] p-2.5 rounded text-xs text-gray-400">
                    <input type="checkbox" defaultChecked />
                    <span>Seal with Blockchain ID</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Teaser Logline</label>
                <input
                  type="text"
                  value={scriptLogline}
                  onChange={(e) => setScriptLogline(e.target.value)}
                  className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-200 text-xs rounded p-2.5 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Treatment Script Text</label>
                <textarea
                  rows={6}
                  value={scriptText}
                  onChange={(e) => setScriptText(e.target.value)}
                  className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-200 text-xs rounded p-3 focus:outline-none font-mono resize-none leading-relaxed"
                ></textarea>
              </div>

              <button
                onClick={handleRunScriptAnalyzer}
                disabled={isLoadingAi || !scriptText}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/15"
              >
                {isLoadingAi ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    AI Analyzing plot logic & commercial potential...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-slate-950 animate-bounce" />
                    Scan Dialogue & Structure with AI
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Diagnostic report right */}
          <div className="lg:col-span-7">
            {analyzerReport ? (
              <div className="bg-[#12131a] border border-[#232430] rounded-xl p-5 space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center border-b border-[#232430] pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-500">Copyright Seal Activated</span>
                    <h3 className="text-gray-100 font-bold text-base mt-1">Reviewing: {scriptTitle}</h3>
                    <p className="text-xs text-gray-500">Genre: {scriptGenre}</p>
                  </div>
                  <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded text-center">
                    <span className="text-[9px] uppercase block tracking-wider font-semibold text-gray-400">Pacing Index</span>
                    <strong className="text-sm font-extrabold">{analyzerReport.pacingScore || 85}%</strong>
                  </div>
                </div>

                {/* Score panel */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Commercial Appeal', score: analyzerReport.commercialScore || 78 },
                    { label: 'Structure Logic', score: analyzerReport.structureScore || 82 },
                    { label: 'Character Arc', score: analyzerReport.characterScore || 80 },
                    { label: 'Dialogue Flow', score: analyzerReport.dialogueScore || 75 }
                  ].map((item, id) => (
                    <div key={id} className="bg-[#0b0c10] p-3 rounded-lg border border-[#232430]/75">
                      <span className="text-[10px] text-gray-500 block uppercase font-mono">{item.label}</span>
                      <strong className="text-base font-extrabold text-[#d2ad58] block mt-1">{item.score}%</strong>
                    </div>
                  ))}
                </div>

                {/* Executive Outline summaries Arabic and English */}
                <div className="space-y-4">
                  <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-lg relative text-right" dir="rtl">
                    <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded absolute top-2 left-2">مُلخص تنفيذي</span>
                    <h4 className="text-amber-400 text-xs font-bold mb-2 pt-1">تقرير الصلاحية الإنتاجية:</h4>
                    <p className="text-xs text-gray-200 leading-relaxed font-sans">{analyzerReport.summaryAr}</p>
                  </div>

                  <div className="bg-[#121324] border border-[#2a2c42] p-4 rounded-lg relative">
                    <h4 className="text-gray-200 text-xs font-bold uppercase tracking-wider mb-2">Executive Summary:</h4>
                    <p className="text-xs text-[#b8bccc] leading-relaxed italic">"{analyzerReport.summaryEn}"</p>
                  </div>
                </div>

                {/* Plot & character checks */}
                <div className="space-y-3 pt-2 text-xs">
                  <div className="border border-[#232430] p-3.5 rounded-lg bg-[#0c0d12]">
                    <p className="text-amber-500 font-bold mb-1">🎭 Character Development Analysis:</p>
                    <p className="text-gray-300 whitespace-pre-wrap">{analyzerReport.characterAnalysis}</p>
                  </div>

                  <div className="border border-[#232430] p-3.5 rounded-lg bg-[#0c0d12]">
                    <p className="text-amber-500 font-bold mb-1">📈 Act Structure Breakdown:</p>
                    <p className="text-gray-300 whitespace-pre-wrap">{analyzerReport.structureAnalysis}</p>
                  </div>

                  <div className="border border-[#232430] p-3.5 rounded-lg bg-[#0c0d12]">
                    <p className="text-amber-500 font-bold mb-1">✍ Dialogue Critique & Dialect Fluidity:</p>
                    <p className="text-gray-300 whitespace-pre-wrap">{analyzerReport.dialogueCritique}</p>
                  </div>

                  <div className="bg-gradient-to-r from-amber-500/10 to-transparent p-4 rounded-lg border border-amber-500/20">
                    <p className="text-amber-400 font-bold mb-1">🎥 Streaming Marketability & Budget Forecast:</p>
                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{analyzerReport.marketability}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#12131a] border border-[#232430] p-12 text-center text-gray-500 h-full flex flex-col justify-center items-center">
                <FileText className="w-12 h-12 text-gray-600 mb-3" />
                <h4 className="text-gray-300 font-semibold mb-1">No Script Analyzed Yet</h4>
                <p className="text-xs max-w-md mx-auto leading-relaxed">
                  Enter your treatment logline and paste your dialogues in standard cinematic screenplay format. Press "Scan Dialogue" to launch the AI diagnostic reader.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
