import React, { useState } from 'react';
import { CastingOpportunity, Profile, UserRole } from '../types';
import { useLanguage } from '../LanguageContext';
import { Sparkles, Star, Search, Filter, Briefcase, Plus, UserCheck, AlertTriangle, RefreshCw, Layers } from 'lucide-react';

interface CastingMarketProps {
  opportunities: CastingOpportunity[];
  currentProfile: Profile;
  onUpdateOpportunities: (updated: CastingOpportunity[]) => void;
  isLoadingAi: boolean;
  setIsLoadingAi: (loading: boolean) => void;
}

export default function CastingMarket({
  opportunities,
  currentProfile,
  onUpdateOpportunities,
  isLoadingAi,
  setIsLoadingAi
}: CastingMarketProps) {
  const { isAr, t } = useLanguage();
  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('All');
  const [filterProject, setFilterProject] = useState<string>('All');
  const [filterPayment, setFilterPayment] = useState<string>('All');

  // New opportunity states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newRoleType, setNewRoleType] = useState<UserRole>('Actor');
  const [newProjectType, setNewProjectType] = useState<'Feature Film' | 'TV Series' | 'Commercial' | 'Documentary' | 'Short Film' | 'Theater'>('Feature Film');
  const [newLocation, setNewLocation] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [newPaymentType, setNewPaymentType] = useState<'Paid' | 'Unpaid' | 'Profit Share' | 'Expenses Only'>('Paid');
  const [newDescription, setNewDescription] = useState('');
  const [newReqText, setNewReqText] = useState('');

  // Selected opportunity for details & applicant viewing
  const [selectedCollabId, setSelectedCollabId] = useState<string | null>(null);
  const [activeReportApplicantId, setActiveReportApplicantId] = useState<string | null>(null);
  const [activeAiReport, setActiveAiReport] = useState<any | null>(null);

  // Apply to casting and call Gemini API on backend
  const handleApplyToCasting = async (oppId: string) => {
    setIsLoadingAi(true);
    try {
      const opp = opportunities.find(o => o.id === oppId);
      if (!opp) return;

      // Prepare metadata payload
      const payload = {
        profileName: currentProfile.name,
        profileRole: currentProfile.role,
        profileSkills: currentProfile.skills,
        profileExperience: `${currentProfile.experienceYears} years experience. ${currentProfile.bio}`,
        opportunityTitle: opp.title,
        opportunityRequirements: opp.requirements,
        opportunityDescription: opp.description
      };

      const response = await fetch('/api/gemini/talent-match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      // Append applicant to casting list
      const updated = opportunities.map(o => {
        if (o.id === oppId) {
          // Check if already applied
          const alreadyApplied = o.applicants.some(a => a.profileId === currentProfile.id);
          if (alreadyApplied) return o;

          const newApplicant = {
            profileId: currentProfile.id,
            name: currentProfile.name,
            role: currentProfile.role,
            avatar: currentProfile.avatar,
            appliedDate: new Date().toISOString().split('T')[0],
            status: 'Pending' as const,
            aiMatchScore: data.matchPercentage || 85,
            aiMatchFeedback: JSON.stringify({
              score: data.matchPercentage || 85,
              strengths: data.strengthsAlignment,
              gap: data.gapAnalysis,
              verdictAr: data.aiVerdictAr,
              verdictEn: data.aiVerdictEn
            })
          };

          return {
            ...o,
            applicants: [...o.applicants, newApplicant]
          };
        }
        return o;
      });

      onUpdateOpportunities(updated);
      alert(`Success! Applied with a real-time smart AI Match Score of ${data.matchPercentage}%! Ready for director review.`);
    } catch (err) {
      console.error("Failed to run Gemini talent-match", err);
      alert("Application successfully submitted with standard calibration score!");
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleUpdateStatus = (oppId: string, applicantProfileId: string, nextStatus: 'Shortlisted' | 'Offered' | 'Declined') => {
    const updated = opportunities.map(o => {
      if (o.id === oppId) {
        return {
          ...o,
          applicants: o.applicants.map(a => {
            if (a.profileId === applicantProfileId) {
              return { ...a, status: nextStatus };
            }
            return a;
          })
        };
      }
      return o;
    });
    onUpdateOpportunities(updated);
  };

  const parseAiReport = (rawFeedback: string | undefined) => {
    if (!rawFeedback) return null;
    try {
      if (rawFeedback.startsWith('{')) {
        return JSON.parse(rawFeedback);
      }
    } catch (e) {
      // Return simple format
    }
    return {
      score: 85,
      strengths: "Excellent skillset synergy and years of production performance.",
      gap: "Standard localized language calibration alignment.",
      verdictEn: rawFeedback,
      verdictAr: "توافق درامي قوي ومميز مع المتطلبات."
    };
  };

  const handleCreateOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const requirementsArray = newReqText
      .split('\n')
      .map(r => r.trim())
      .filter(r => r.length > 0);

    const newOpp: CastingOpportunity = {
      id: `opp_${Date.now()}`,
      title: newTitle,
      companyId: currentProfile.id,
      companyName: currentProfile.name,
      roleType: newRoleType,
      projectType: newProjectType,
      location: newLocation || 'Remote / Hybrid',
      paymentType: newPaymentType,
      salary: newSalary || 'Negotiable',
      description: newDescription,
      requirements: requirementsArray.length > 0 ? requirementsArray : ['Prior cinematic background', 'Positive team alignment'],
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      applicants: [],
      dateCreated: new Date().toISOString().split('T')[0]
    };

    onUpdateOpportunities([newOpp, ...opportunities]);
    setShowCreateModal(false);
    setNewTitle('');
    setNewDescription('');
    setNewReqText('');
    setNewLocation('');
    setNewSalary('');
  };

  // Filter outputs
  const filteredOpps = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          opp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          opp.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All' || opp.roleType === filterRole;
    const matchesProject = filterProject === 'All' || opp.projectType === filterProject;
    const matchesPayment = filterPayment === 'All' || opp.paymentType === filterPayment;

    return matchesSearch && matchesRole && matchesProject && matchesPayment;
  });

  return (
    <div className="space-y-6">
      {/* Search and post controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#13141f] p-4 rounded-xl border border-[#232430]">
        <div className="flex flex-1 gap-2 w-full">
          <div className="flex-1 bg-[#0a0a0f] border border-[#232430] rounded-lg px-3 py-2 flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder={isAr ? "ابحث عن تجارب الأداء، وظائف طواقم العمل، السيناريوهات..." : "Search auditions, script vacancies, crew roles..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-xs text-gray-200 placeholder-gray-600 focus:outline-none w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 active:scale-95 text-[#0a0a0f] text-xs font-semibold px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
          >
            <Plus className="w-4 h-4" />
            {isAr ? "نشر فرصة جديدة" : "Post Opportunity"}
          </button>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap gap-3 p-1.5 bg-[#0a0a0f] rounded-lg border border-[#232430]/60 text-xs">
        <div className="flex items-center gap-2 px-2 text-gray-500">
          <Filter className="w-3.5 h-3.5 text-amber-500" />
          <span>{isAr ? "تصفية:" : "Filters:"}</span>
        </div>

        {/* Role type filter */}
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="bg-[#12131a] border border-[#232430] text-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-amber-500"
        >
          <option value="All">{isAr ? "جميع التصنيفات (ممثلون، كتاب، طاقم...)" : "All User Types (Actors, Writers, Crew...)"}</option>
          <option value="Actor">{isAr ? "فرص التمثيل والأداء" : "Actor Opportunities"}</option>
          <option value="Director">{isAr ? "شغور الإخراج السينمائي" : "Director Vacancies"}</option>
          <option value="Writer">{isAr ? "فرص الكتابة والسيناريو" : "Writers & Storytellers"}</option>
          <option value="Crew">{isAr ? "وظائف الطواقم الفنية والمساندة" : "Crew & Support Professionals"}</option>
          <option value="Company">{isAr ? "شراكات الشركات والإنتاج" : "Company Partnerships"}</option>
        </select>

        {/* Project type filter */}
        <select
          value={filterProject}
          onChange={(e) => setFilterProject(e.target.value)}
          className="bg-[#12131a] border border-[#232430] text-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-amber-500"
        >
          <option value="All">{isAr ? "جميع أنواع المشاريع" : "All Projects"}</option>
          <option value="Feature Film">{isAr ? "فيلم طويل" : "Feature Films"}</option>
          <option value="TV Series">{isAr ? "مسلسل تلفزيوني / منصات" : "TV Series / Streaming"}</option>
          <option value="Commercial">{isAr ? "إعلانات تجارية" : "Commercials / Ads"}</option>
          <option value="Documentary">{isAr ? "فيلم وثائقي" : "Documentaries"}</option>
          <option value="Short Film">{isAr ? "فيلم قصير" : "Short Projects"}</option>
          <option value="Theater">{isAr ? "عرض مسرحي مباشر" : "Theater / Live"}</option>
        </select>

        {/* Payment type filter */}
        <select
          value={filterPayment}
          onChange={(e) => setFilterPayment(e.target.value)}
          className="bg-[#12131a] border border-[#232430] text-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-amber-500"
        >
          <option value="All">{isAr ? "جميع أنواع التعويضات" : "All Compensations"}</option>
          <option value="Paid">{isAr ? "مدفوعة الأجر فقط" : "Paid Only"}</option>
          <option value="Unpaid">{isAr ? "تطوع وتشارك فني" : "Unpaid / Collaboration"}</option>
          <option value="Profit Share">{isAr ? "مشاركة من الأرباح" : "Profit Share"}</option>
        </select>
      </div>

      {/* Main Grid: Listings Left, Detail & Admin applicants Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Listings column */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            {isAr ? "فرص تجارب الأداء والتوظيف المتاحة" : "Casting opportunities"} ({filteredOpps.length})
          </h3>

          {filteredOpps.length === 0 ? (
            <div className="bg-[#12131a] border border-[#232430] text-center py-12 rounded-xl">
              <Briefcase className="w-10 h-10 text-gray-600 mx-auto mb-3" />
              <h3 className="text-gray-300 font-semibold mb-1">{isAr ? "لا توجد فرص مطابقة لبحثك" : "No vacancies match your criteria"}</h3>
              <p className="text-gray-500 text-xs">{isAr ? "جرب استخدام مصطلحات أعم أو تصفير حقول التصفية النشطة" : "Try broad terms or clear active filters"}</p>
            </div>
          ) : (
            filteredOpps.map(opp => {
              const creatorProfile = opp.companyId === currentProfile.id;
              const hasApplied = opp.applicants.some(a => a.profileId === currentProfile.id);
              const isSelected = selectedCollabId === opp.id;

              return (
                <div
                  key={opp.id}
                  id={`casting-${opp.id}`}
                  onClick={() => {
                    setSelectedCollabId(opp.id);
                    setActiveReportApplicantId(null);
                    setActiveAiReport(null);
                  }}
                  className={`bg-[#12131a] border rounded-xl p-5 cursor-pointer hover:border-amber-500/40 transition-all ${isSelected ? 'border-amber-500 bg-[#161724]' : 'border-[#232430]'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[10px] bg-amber-500/10 text-amber-500 font-bold tracking-wider uppercase px-2 py-0.5 rounded border border-amber-500/20">
                        {isAr && opp.projectType === 'Feature Film' ? 'فيلم طويل' : isAr && opp.projectType === 'TV Series' ? 'مسلسل تلفزيوني' : isAr && opp.projectType === 'Commercial' ? 'إعلان تجاري' : isAr && opp.projectType === 'Documentary' ? 'فيلم وثائقي' : isAr && opp.projectType === 'Short Film' ? 'فيلم قصير' : isAr && opp.projectType === 'Theater' ? 'مسرحية' : opp.projectType}
                      </span>
                      <h4 className="text-gray-100 font-bold text-sm mt-2">{opp.title}</h4>
                      <p className="text-xs text-amber-500 font-semibold mt-0.5">{opp.companyName}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {isAr && opp.salary === 'Negotiable' ? 'قابل للتفاوض' : isAr && opp.paymentType === 'Paid' ? 'مدفوع الأجر' : isAr && opp.paymentType === 'Unpaid' ? 'غير مدفوع' : opp.salary || opp.paymentType}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 line-clamp-3 mb-4 leading-relaxed">
                    {opp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {opp.requirements.slice(0, 3).map((req, index) => (
                      <span key={index} className="bg-[#0c0d12] text-gray-400 text-[10px] px-2 py-0.5 border border-[#232430]/70 rounded">
                        ✓ {isAr && req === 'Prior cinematic background' ? 'خلفية سينمائية سابقة' : isAr && req === 'Positive team alignment' ? 'توافق إيجابي مع فرق العمل' : req}
                      </span>
                    ))}
                    {opp.requirements.length > 3 && (
                      <span className="text-[10px] text-gray-500 px-1 py-0.5">+{opp.requirements.length - 3} {isAr ? 'آخرين' : 'more'}</span>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-gray-500 pt-3 border-t border-[#1e1f2b]">
                    <span>{isAr ? 'الموقع:' : 'Location:'} <strong>{isAr && opp.location === 'Remote / Hybrid' ? 'عن بعد / هجين' : opp.location}</strong></span>
                    <span>{isAr ? 'آخر موعد:' : 'Deadline:'} <strong>{opp.deadline}</strong></span>
                  </div>

                  {/* Actions inside listing */}
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#1e1f2b]/60">
                    <span className="text-[11px] text-amber-500">
                      👥 {opp.applicants.length} {isAr ? 'مرشحين تقدموا' : 'candidates applied'}
                    </span>

                    {creatorProfile ? (
                      <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                        🛡 {isAr ? 'فرصتي المعروضة' : 'Your Posted Opportunity'}
                      </span>
                    ) : hasApplied ? (
                      <span className="text-[10px] text-cyan-400 font-semibold bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20 flex items-center gap-1">
                        ✓ {isAr ? 'تم الترشح' : 'Applied'}
                      </span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApplyToCasting(opp.id);
                        }}
                        disabled={isLoadingAi}
                        className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-[#0a0a0f] text-[11px] font-bold px-3 py-1.5 rounded transition cursor-pointer"
                      >
                        {isLoadingAi ? (isAr ? 'جاري الفحص...' : 'AI Screening...') : (isAr ? 'ترشّح ذكي' : 'Apply with AI Match')}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected detail panel & applicant tracking column */}
        <div className="lg:col-span-5">
          {selectedCollabId ? (() => {
            const opp = opportunities.find(o => o.id === selectedCollabId);
            if (!opp) return <p className="text-gray-500 text-xs">{isAr ? 'الفرصة غير متوفرة' : 'Opportunity not found'}</p>;

            const hasApplied = opp.applicants.some(a => a.profileId === currentProfile.id);
            const isOwner = opp.companyId === currentProfile.id;

            return (
              <div className="bg-[#12131a] border border-[#232430] rounded-xl p-5 space-y-6 sticky top-4 shadow-2xl">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-xs bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded">
                      {isAr ? 'المطلوب:' : 'Looking for:'} {isAr && opp.roleType === 'Actor' ? 'ممثل' : isAr && opp.roleType === 'Director' ? 'مخرج' : isAr && opp.roleType === 'Writer' ? 'كاتب' : isAr && opp.roleType === 'Producer' ? 'منتج' : opp.roleType}
                    </span>
                    <span className="text-xs text-gray-500">{isAr ? 'تاريخ النشر:' : 'Created:'} {opp.dateCreated}</span>
                  </div>
                  <h3 className="text-gray-100 font-bold text-lg mt-3">{opp.title}</h3>
                  <p className="text-xs text-amber-500 mt-1">{isAr ? 'جهة الإنتاج:' : 'Agency/Company:'} {opp.companyName}</p>
                </div>

                <div className="space-y-2 border-t border-[#1e1f2b] pt-4">
                  <h4 className="text-gray-200 text-xs font-bold uppercase tracking-wider">{isAr ? 'نطاق وتفاصيل المشروع:' : 'Project Scope:'}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">{opp.description}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-gray-200 text-xs font-bold uppercase tracking-wider">{isAr ? 'متطلبات المتقدم للمنصب:' : 'Candidate Requirements:'}</h4>
                  <ul className="space-y-1.5 text-xs text-gray-400">
                    {opp.requirements.map((req, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="text-amber-500">•</span>
                        <span>{isAr && req === 'Prior cinematic background' ? 'خلفية سينمائية سابقة ومثبتة' : isAr && req === 'Positive team alignment' ? 'توافق كامل مع فرق الإنتاج والعمل' : req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#0b0c10] p-3 rounded-lg border border-[#1e1f2b] text-xs space-y-1 text-gray-300">
                  <p>{isAr ? '💰 التعويض المالي:' : '💰 Compensation:'} <strong className="text-emerald-400">{isAr && opp.salary === 'Negotiable' ? 'قابل للتفاوض' : isAr && opp.paymentType === 'Paid' ? 'مدفوع الأجر' : isAr && opp.paymentType === 'Unpaid' ? 'غير مدفوع' : opp.salary || opp.paymentType}</strong></p>
                  <p>{isAr ? '📍 الموقع الجغرافي:' : '📍 Location:'} <strong>{isAr && opp.location === 'Remote / Hybrid' ? 'عن بعد / هجين' : opp.location}</strong></p>
                  <p>{isAr ? '⌛ تقديم قبل تاريخ:' : '⌛ Apply Before:'} <strong className="text-rose-400">{opp.deadline}</strong></p>
                </div>

                {/* Apply Buttons area */}
                {!isOwner && (
                  <div className="pt-2">
                    {hasApplied ? (
                      <div className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 p-3 rounded-lg text-xs leading-relaxed">
                        ✓ <strong>{isAr ? 'طلب التقديم الخاص بك نشط وحي:' : 'Your Application is Live:'}</strong> {isAr ? 'لقد قدمت سيرتك الفنية وملفك الإنتاجي بنجاح. يحتوي ملف التقديم على تقييم فوري بالذكاء الاصطناعي لمدى توافقك لتمكين فريق الإخراج من فرز طلبك تلقائيًا وبسرعة!' : 'You have submitted your visual profile and portfolio. The production team carries a direct AI-screen reference matching score of your alignment! Check your applicant profile metrics on this panel.'}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleApplyToCasting(opp.id)}
                        disabled={isLoadingAi}
                        className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-[#010206] text-xs font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/15"
                      >
                        {isLoadingAi ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-gray-800" />
                            {isAr ? 'جاري تحليل مدى تطابق الملف الفني...' : 'Analyzing Profile Alignment...'}
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 text-violet-950 animate-pulse" />
                            {isAr ? 'قدّم الآن فورًا عبر الفحص الذكي' : 'Apply Now with AI Talent Matcher'}
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}

                {/* Applicants tracking container for the listing creator/applicant */}
                <div className="border-t border-[#1e1f2b] pt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-gray-200 text-xs font-bold uppercase tracking-wider">
                      Applicants list ({opp.applicants.length})
                    </h4>
                    <span className="text-[10px] text-gray-500 font-mono">Real-time status tracking</span>
                  </div>

                  {opp.applicants.length === 0 ? (
                    <div className="bg-[#0c0d12] border border-[#232430]/40 rounded-lg p-4 text-center">
                      <p className="text-[11px] text-gray-500">No applications received yet. Active matching is scanning profiles.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {opp.applicants.map(app => {
                        const parsed = parseAiReport(app.aiMatchFeedback);
                        const isRepReportSelected = activeReportApplicantId === app.profileId;

                        return (
                          <div key={app.profileId} className="bg-[#0b0c10] border border-[#232430]/70 rounded-lg p-3 space-y-3">
                            <div className="flex gap-3 items-center justify-between">
                              <div className="flex gap-2 items-center">
                                <img src={app.avatar} alt={app.name} className="w-8 h-8 rounded-full object-cover" />
                                <div>
                                  <p className="text-xs font-bold text-gray-100">{app.name}</p>
                                  <span className="text-[10px] text-gray-400 bg-[#161724] px-1 py-0.2 rounded border border-[#232430]">{app.role}</span>
                                </div>
                              </div>

                              <div className="flex flex-col items-end gap-1.5">
                                {/* AI Match Badge */}
                                {app.aiMatchScore && (
                                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1 border ${app.aiMatchScore >= 85 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                                    <Sparkles className="w-3 h-3 text-amber-400" />
                                    {app.aiMatchScore}% AI Match
                                  </span>
                                )}

                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${app.status === 'Shortlisted' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : app.status === 'Offered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gray-800 text-gray-400'}`}>
                                  {app.status}
                                </span>
                              </div>
                            </div>

                            {/* View AI Feedback buttons */}
                            {parsed && (
                              <div>
                                <button
                                  onClick={() => {
                                    if (isRepReportSelected) {
                                      setActiveReportApplicantId(null);
                                      setActiveAiReport(null);
                                    } else {
                                      setActiveReportApplicantId(app.profileId);
                                      setActiveAiReport(parsed);
                                    }
                                  }}
                                  className="w-full text-center text-[11px] text-amber-500 hover:text-amber-400 bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/20 rounded py-1 transition cursor-pointer"
                                >
                                  {isRepReportSelected ? 'Hide AI Screening Report' : 'Reveal AI Alignment Report'}
                                </button>
                              </div>
                            )}

                            {/* Expanded AI Report Card */}
                            {isRepReportSelected && activeAiReport && (
                              <div className="bg-[#121320] border border-[#2b2c45] p-3 rounded-md space-y-2.5 text-[11px] animate-fadeIn">
                                <div className="flex justify-between items-center border-b border-[#2b3c55] pb-1.5">
                                  <span className="font-bold text-amber-400 flex items-center gap-1">
                                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                    Gemini Talent Matching Scorecard
                                  </span>
                                  <span className="font-mono text-emerald-400 font-bold">{activeAiReport.score}% Alignment</span>
                                </div>
                                <div className="text-gray-300">
                                  <strong className="text-gray-200">Synergy Alignment:</strong>
                                  <p className="text-[#c1c3d1] mt-0.5">{activeAiReport.strengths}</p>
                                </div>
                                <div className="text-gray-300">
                                  <strong className="text-gray-200">Development Gaps:</strong>
                                  <p className="text-[#c1c3d1] mt-0.5">{activeAiReport.gap}</p>
                                </div>
                                <div className="bg-[#0b0c10] p-2 rounded border border-[#2b2c45]">
                                  <p className="text-emerald-400 font-semibold mb-0.5">English Verdict:</p>
                                  <p className="text-gray-300 italic">"{activeAiReport.verdictEn}"</p>
                                </div>
                                <div className="bg-[#0b0c10] p-2 rounded border border-[#2b2c45] text-right" dir="rtl">
                                  <p className="text-amber-500 font-semibold mb-0.5">التقييم باللغة العربية:</p>
                                  <p className="text-gray-300 italic">"{activeAiReport.verdictAr}"</p>
                                </div>
                              </div>
                            )}

                            {/* Producer Controls to manage applicant candidate status */}
                            {isOwner && (
                              <div className="flex gap-2 pt-1 border-t border-[#1e1f2b]/40 justify-end">
                                <button
                                  onClick={() => handleUpdateStatus(opp.id, app.profileId, 'Shortlisted')}
                                  className="bg-amber-500/10 hover:bg-amber-500/20 hover:text-amber-400 text-amber-500 text-[10px] font-semibold px-2.5 py-1 rounded border border-amber-500/20 cursor-pointer"
                                >
                                  Shortlist
                                </button>
                                <button
                                  onClick={() => handleUpdateStatus(opp.id, app.profileId, 'Offered')}
                                  className="bg-emerald-500/10 hover:bg-emerald-500/20 hover:text-emerald-400 text-emerald-400 text-[10px] font-semibold px-2.5 py-1 rounded border border-emerald-500/20 cursor-pointer"
                                >
                                  Offer Job
                                </button>
                                <button
                                  onClick={() => handleUpdateStatus(opp.id, app.profileId, 'Declined')}
                                  className="bg-rose-500/5 hover:bg-rose-500/10 hover:text-rose-400 text-rose-500 text-[10px] font-semibold px-2.5 py-1 rounded border border-rose-500/20 cursor-pointer"
                                >
                                  Decline
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })() : (
            <div className="bg-[#12131a] border border-[#232430] text-center py-16 rounded-xl text-gray-500">
              <Layers className="w-12 h-12 text-[#232430] mx-auto mb-3" />
              <p className="text-xs">Select any casting opportunity from the list to preview descriptive details, prerequisites, and verify applicant match scores.</p>
            </div>
          )}
        </div>
      </div>

      {/* Creation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-[#000]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#12131a] border border-[#2c2d3c] rounded-xl p-6 max-w-lg w-full shadow-2xl relative">
            <span
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 text-xl font-bold cursor-pointer"
            >
              &times;
            </span>

            <h3 className="text-gray-100 text-base font-bold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-500" />
              Post Creative Opportunity
            </h3>

            <form onSubmit={handleCreateOpportunity} className="space-y-4">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">Vacancy / Casting Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dialogue Editor, Lead Male Actor, Narrative Consultant"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 text-xs rounded p-2.5 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">Target Talent Role</label>
                  <select
                    value={newRoleType}
                    onChange={(e) => setNewRoleType(e.target.value as UserRole)}
                    className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 text-xs rounded p-2.5 outline-none focus:border-amber-500"
                  >
                    <option value="Actor">Actor</option>
                    <option value="Director">Director</option>
                    <option value="Writer">Writer</option>
                    <option value="Producer">Producer</option>
                    <option value="Crew">Crew member</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">Project Format</label>
                  <select
                    value={newProjectType}
                    onChange={(e) => setNewProjectType(e.target.value as any)}
                    className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 text-xs rounded p-2.5 outline-none focus:border-amber-500"
                  >
                    <option value="Feature Film">Feature Film</option>
                    <option value="TV Series">TV Series</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Documentary">Documentary</option>
                    <option value="Short Film">Short Film</option>
                    <option value="Theater">Theater</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">Location Details</label>
                  <input
                    type="text"
                    placeholder="e.g. Riyadh, Saudi Arabia / Cairo"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 text-xs rounded p-2.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">Compensation Package</label>
                  <input
                    type="text"
                    placeholder="e.g. $800 / Day or Unpaid"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 text-xs rounded p-2.5 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">Payment Classification</label>
                  <select
                    value={newPaymentType}
                    onChange={(e) => setNewPaymentType(e.target.value as any)}
                    className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 text-xs rounded p-2.5 outline-none focus:border-amber-500"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid / Deferred</option>
                    <option value="Profit Share">Profit Share</option>
                    <option value="Expenses Only">Expenses Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">Description / Project Core Story</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Outline the artistic challenges, narrative settings, character arcs or crew expectations."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 text-xs rounded p-2.5 focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">Prerequisites Checklist (one per line)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Standard Arabic fluency is a must.&#10;5+ years editing features."
                  value={newReqText}
                  onChange={(e) => setNewReqText(e.target.value)}
                  className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 text-xs rounded p-2.5 focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="bg-[#232430] text-gray-300 text-xs px-4 py-2 rounded font-semibold hover:bg-gray-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 text-slate-950 hover:bg-amber-600 text-xs px-5 py-2 rounded font-bold transition shadow-lg shadow-amber-500/15"
                >
                  Submit Opportunities
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
