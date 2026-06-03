import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextProps {
  language: Language;
  isAr: boolean;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const dictionary: Record<Language, Record<string, string>> = {
  en: {
    // Navigation & Primary Pathways
    home_feed: "Home Feed",
    search_castings: "Search Castings",
    explore_festivals: "Explore Festivals",
    lessons_reels: "Lessons & Reels",
    direct_messages: "Direct Messages",
    script_shop: "Script Shop",
    create_post: "Create Post",
    all_pathways: "Primary Pathways",

    // Persona & Premium Toolbar
    active_persona: "Active Persona:",
    go_premium: "Go Premium",
    verified_premium: "Meta-Verified Premium",
    settings_ledger: "Profile Settings & Ledger",
    active_cast_persona: "Active Cast Persona:",
    upgrade_instagram_gold: "Upgrade Instagram Gold",
    get_verified_badge: "Get Verified Star Badge",
    meta_verified_premium_status: "Verified Premium Status Active",

    // Common Buttons & Placeholders
    post: "Post",
    share: "Share",
    cancel: "Cancel",
    discard: "Discard",
    close: "Close",
    verify_instantly: "Verify Instantly",
    suggested_creators: "Suggested Creators",
    see_all: "See All",
    your_story: "Your Story",
    add_comment: "Add a comment...",
    write_caption: "What's the filming update? Write caption...",
    post_media_url: "Post Media URL",
    quick_presets: "Quick Presets (Cinema Stills list):",
    hashtags_split: "Hashtags (split with comma)",
    category_index: "Filmmaking Category Index",
    share_to_cinemagram: "Share to CinemaGram",
    sponsored_hot_audition: "Sponsored Hot Audition",
    sponsor_audition_detail: "Sponsor Audition Detail",
    about_text: "About • Help • Press • API • Jobs • Privacy • Terms • Locations • Language AR/EN Supported",
    instagram_framework_rights: "© 2026 CINEMAHUB INSTAGRAM FRAMEWORK INC.",
    create_new_post_modal_title: "Create New Post",
    behind_scenes_option: "Behind the Scenes 🎬",
    audition_clips_option: "Audition clips 🎭",
    vfx_cinematography_option: "VFX & Cinematography 🎥",
    screenplay_treatment_option: "Screenplay treatments ✍🏼",

    // View Header Descriptions
    feed_title: "Cinematic Stories Feed",
    feed_desc: "Follow directors, actors, and producers. Double-tap to like cinematic posts.",
    castings_title: "Casting Auditions Board",
    castings_desc: "Apply for lead acting roles and crew vacancies with automated AI matching scores.",
    ai_studio_title: "AI Cast Coach Interactivity",
    ai_studio_desc: "Instantly converse with our AI Dialect Coach and Screenplay treatment analyzer.",
    workspace_academy_title: "Reels Masterclass Lessons",
    workspace_academy_desc: "Track lesson progress, take quiz assessments, and control collaboration team spaces.",
    script_market_title: "Screenplay Trade Market",
    script_market_desc: "Protect, index, and license screenplays under simulated blockchain hashes.",
    events_admin_title: "Festivals Arena & Contest Votes",
    events_admin_desc: "Cast votes on film festival submission indices, view event logs, and rank leaderboard actors.",

    // AI Lab Coach Views
    analyzer_tab_name: "AI Diagnostic Labs",
    acting_voice_coach: "AI Acting & Voice Pitch Coach",
    script_treatment: "AI Script Treatment Analyzer",
    ask_coach: "Ask Acting Coach",
    analyze_script: "Analyze Script Treatment",
    ai_feedback_report: "Generated AI Assessment Report",
    coach_placeholder: "Type a dramatic lines transcript, or paste a Monologue to receive Stella Adler or Stanislavski feedback...",
    run_acting_assessment: "Run Acting Coach Review (Gemini API)",
    pitch_analysis_log: "Pitch & Delivery Insights Log",
    voice_pitch_label: "Voice Accent Pitch Range",
    emotional_score_label: "Emotional Resonance Score",
    recommendation_label: "Coaches Delivery Recommendation",
    or_text: "OR",
    upload_sample_audio: "Upload Vocal Monologue Audio File",
    analyze_script_treatment_btn: "Analyze Script with Gemini API",
    scenarios_analyzer: "Creative Scenarios Settings Analyzer",
    tempo_score_label: "Pacing & Dialogues Tempo Index",
    dramatic_coherence: "Dramatic Coherence",
    structural_beats_index: "Structural Beats Progress Index",
    dialogue_integrity: "Dialogue Integrity Check",

    // Casting Market
    search_placeholder: "Search opportunities...",
    all_roles: "All Roles",
    all_projects: "All Project Types",
    all_payments: "All Payments",
    apply_now: "Apply & Run AI Matching",
    match_score_label: "AI Alignment Match Score",
    applicants_tag: "Applicants Profiles Ledger",
    salary_label: "Salary / Compensation:",
    payment_type_label: "Payment Type:",
    deadline_label: "Apply Deadline:",
    requirements_label: "Eligibility Requirements:",
    ai_matching_status: "AI Recruitment Appraisal Diagnostic",
    verdict_label: "Recruiter AI Verdict:",
    strengths_label: "Candidate Key Alignments:",
    gaps_label: "Audition Development Feedback Spaces:",
    post_casting_vacancy_btn: "Post Casting Vacancy",
    project_type: "Project Type",
    location: "Location",
    deadline: "Deadline",
    salary: "Salary / Day",
    payment_type: "Payment Model",
    company_name_label: "Casting Company Name",
    new_opportunity_requirements_placeholder: "List audition rules, gender, accent required (e.g. Arabic, Dialect, Egyptian... split by comma)",

    // Academy & Workspaces
    lessons_title: "Academy Masterclass Lessons",
    take_assessment_quiz: "Take Lesson Assessment Quiz",
    question_label: "Question",
    submit_quiz_answers: "Submit Quiz Answers",
    quiz_results: "Assessment Results",
    passed_quiz_congrats: "Congratulations! You passed this course block quiz assessment.",
    workspace_projects_title: "Active Studio Workspaces & Team Boards",
    project_status_label: "Status",
    assigned_crew: "Assigned Crew Team",
    project_files_vault: "Secure Project Files Vault (Non-persistent storage)",
    upload_new_production_file: "Upload Production File",
    messages_board: "Active Workspace Messages Board",
    type_internal_scouting_message: "Type internal message...",
    send_message_button: "Send to Team",
    phase_label: "Phase",

    // Script Market
    screenplay_marketplace_title: "Screenplay Intellectual Property Marketplace",
    list_screenplay_btn: "List Screenplay For Trade",
    by_author_label: "By Screenwriter",
    genre_label: "Genre:",
    page_count: "Page Count:",
    exclusive_buyout: "Exclusive IP Buyout:",
    non_exclusive_commercial: "Non-exclusive Commercial License:",
    copyright_protected_hash: "Blockchain Copyright IP Reference Hex:",
    read_preview_script_beats: "Read Preview Script Beats",
    acquire_ex_buyout: "Acquire Exclusive Buyout Bundle",
    acquire_comm_license: "Acquire Commercial License",
    sell_price_ex_label: "Exclusive Buyout Price ($)",
    sell_price_lic_label: "Commercial Licensing Fee ($)",
    preview_placeholder_script_beats: "Paste first 3 pages / preview beats of your screenplay here...",

    // Festivals & Admin
    festivals_registrations: "Cinema Arena & Film Festival Registrations",
    active_submission_arena: "Active Submissions Arena & Public Leaderboard Votes",
    vote_submission_btn: "Cast Public Vote & Endorse",
    leaderboard_title: "CinemaHub Popularity Leaderboard",
    admin_tools_title: "Admin Console Simulator",
    registered_badge: "Registered",
    ticket_price_label: "Ticket Price:",
    organic_votes_label: "Popular Endorsement Votes:",
    instructor_label: "Instructor:",
    duration_label: "Duration:"
  },
  ar: {
    // Navigation & Primary Pathways
    home_feed: "الرئيسية",
    search_castings: "البحث عن تجارب الأداء",
    explore_festivals: "استكشاف المهرجانات",
    lessons_reels: "الدروس والمقاطع",
    direct_messages: "الرسائل والمستشار الذكي",
    script_shop: "سوق النصوص السينمائية",
    create_post: "إنشاء منشور",
    all_pathways: "المسالك والمسارات الرئيسية",

    // Persona & Premium Toolbar
    active_persona: "الشخصية النشطة:",
    go_premium: "حساب ذهبي",
    verified_premium: "حساب ذهبي موثق",
    settings_ledger: "إعدادات الملف وبطاقة المحتوى",
    active_cast_persona: "شخصية الممثل النشطة:",
    upgrade_instagram_gold: "الترقية للتوثيق الذهبي",
    get_verified_badge: "الحصول على شارت التوثيق الذهبية",
    meta_verified_premium_status: "حالة التوثيق الذهبي الموثقة نشطة حاليًا",

    // Common Buttons & Placeholders
    post: "نشر",
    share: "مشاركة",
    cancel: "إلغاء",
    discard: "تجاهل",
    close: "إغلاق",
    verify_instantly: "تفعيل التوثيق فوريًا",
    suggested_creators: "صناع محتوى مقترحون",
    see_all: "عرض الكل",
    your_story: "قصتك",
    add_comment: "إضافة تعليق...",
    write_caption: "ما هي آخر تحديثات التصوير؟ اكتب تعليقًا...",
    post_media_url: "رابط الصورة أو المشهد",
    quick_presets: "الصور الافتراضية الجاهزة (لقطات سينمائية):",
    hashtags_split: "الوسوم (مفصولة بفاصلة)",
    category_index: "تصنيف المنشور السينمائي",
    share_to_cinemagram: "مشاركة عبر سينما جرام",
    sponsored_hot_audition: "تجارب أداء عاجلة ممولة",
    sponsor_audition_detail: "تفاصيل تجارب الأداء الممولة",
    about_text: "حول المنصة • المساعدة • الصحافة • المطورين • الوظائف • الخصوصية • الشروط • المواقع • اللغة العربية والإنجليزية مدعومة",
    instagram_framework_rights: "جميع الحقوق محفوظة © ٢٠٢٦ سينما جرام إينك.",
    create_new_post_modal_title: "إنشاء منشور سينمائي جديد",
    behind_scenes_option: "كواليس التصوير 🎬",
    audition_clips_option: "مقاطع تجارب الأداء 🎭",
    vfx_cinematography_option: "المؤثرات والتصوير السينمائي 🎥",
    screenplay_treatment_option: "مسودات ومعالجات السيناريو ✍🏼",

    // View Header Descriptions
    feed_title: "منشورات القصص السينمائية واليوميات",
    feed_desc: "تابع المخرجين والممثلين والمنتجين المحليين والعالميين. اضغط مرتين للإعجاب بالمنشور.",
    castings_title: "منصة تجارب الأداء والفرص السينمائية",
    castings_desc: "تقدم للحصول على الأدوار الرئيسية الشاغرة بمطابقة ذكية وتحليل فوري من الذكاء الاصطناعي.",
    ai_studio_title: "مستشار ومدرب التمثيل الذكي",
    ai_studio_desc: "تحدث بشكل تفاعلي ومباشر مع مدرب التمثيل باللهجات ومحلل جودة النصوص عبر جميناي.",
    workspace_academy_title: "أكاديمية السينما ودروس الفيديو",
    workspace_academy_desc: "تابع تقدمك في الدروس، قم بحل الاختبارات التقييمية، وتحكم بفرق تصوير كواليس الاستوديو.",
    script_market_title: "سوق تراخيص وحقوق السيناريو",
    script_market_desc: "سجل النص، قم بحماية حقوق الملكية الفكرية الكود التشفيري، ورخص مسوداتك للمستثمرين.",
    events_admin_title: "مهرجانات السينما وحلبة تصويت الجمهور",
    events_admin_desc: "صوّت في مسابقات الأفلام للأعضاء، تابع جدول شعبية صناع المحتوى ولوحة التحكم التجريبية.",

    // AI Lab Coach Views
    analyzer_tab_name: "مختبرات الذكاء الاصطناعي لتطوير المواهب",
    acting_voice_coach: "مدرب التمثيل الصوتي والدرامي الذكي",
    script_treatment: "محلل ومعالج جودة نصوص السيناريو",
    ask_coach: "التحدث مع مدرب التمثيل وتطوير الشخصيات",
    analyze_script: "تحليل ومعالجة تماسك السيناريو والأحداث",
    ai_feedback_report: "تقرير تقييم الذكاء الاصطناعي المولد",
    coach_placeholder: "اكتب مقتطفًا من نص درامي أو الصق مونولوجًا لتلقي تعقيب فني احترافي بأساليب ستانيسلافسكي...",
    run_acting_assessment: "بدء التقييم الفني للأداء (Gemini API)",
    pitch_analysis_log: "سجل رؤى جودة الصوت والنبرة الدرامية",
    voice_pitch_label: "مدى التغيرات والنبرة الصوتية",
    emotional_score_label: "مؤشر التفاعل والتعاطف العاطفي",
    recommendation_label: "توصية مدربي التمثيل الفنية",
    or_text: "أو",
    upload_sample_audio: "رفع ملف المونولوج الصوتي الخاص بك",
    analyze_script_treatment_btn: "تحليل السيناريو فنيًا عبر Gemini API",
    scenarios_analyzer: "محدد معالجة جودة السيناريو الفني والروائي",
    tempo_score_label: "مؤشر وتيرة الحوار وتتابع الأحداث",
    dramatic_coherence: "التماسك الدرامي والقصصي",
    structural_beats_index: "مؤشر نقاط التحول والانعطافات",
    dialogue_integrity: "فحص سلامة وجمالية الحوار",

    // Casting Market
    search_placeholder: "ابحث في الشواغر المتاحة حاليًا...",
    all_roles: "كل الأدوار",
    all_projects: "كل أنواع المشاريع",
    all_payments: "كل طرق الدفع والتعويضات",
    apply_now: "تقديم مع تشغيل تحليل المطابقة الذكية",
    match_score_label: "نسبة التوافق والمطابقة بالذكاء الاصطناعي",
    applicants_tag: "لوحة المتقدمين والملفات السينمائية",
    salary_label: "الراتب / التعويض اليومي:",
    payment_type_label: "بنية وطريقة الدفع:",
    deadline_label: "الموعد النهائي للتقديم:",
    requirements_label: "شروط ومتطلبات الأداء اللازمة:",
    ai_matching_status: "تقييم التوافق المولد بواسطة الذكاء الاصطناعي",
    verdict_label: "القرار الفني والتوصية لجميناي:",
    strengths_label: "أبرز نقاط التوافق لدى المرشح:",
    gaps_label: "نقاط التطوير والتدريب الموصى بها:",
    post_casting_vacancy_btn: "إضافة شاغر تجربة أداء جديدة",
    project_type: "تصنيف المشروع",
    location: "الموقع الجغرافي",
    deadline: "الموعد النهائي",
    salary: "الأجر / يوميًا",
    payment_type: "نموذج التعاقد الدفع",
    company_name_label: "اسم الشركة أو الجهة الطالبة",
    new_opportunity_requirements_placeholder: "اكتب شروط تجربة الأداء، السن، اللهجة والصوت المطلوب (مثال: نبرة حادة، لكنة شامية، متحدث فصيح.. افصل بفاصلة)",

    // Academy & Workspaces
    lessons_title: "محاضرات الأكاديمية والسينما",
    take_assessment_quiz: "خوض الاختبار التقييمي للدرس الفني",
    question_label: "السؤال في الاختبار",
    submit_quiz_answers: "تسجيل وحفظ إجابات الاختبار التقييمي",
    quiz_results: "نتائج اختبار تقييم الأكاديمية",
    passed_quiz_congrats: "رائع ومبروك! لقد اجتزت اختبار تقييم هذا الدرس بنجاح تام وحصلت على الشهادة.",
    workspace_projects_title: "مساحة إنتاج استوديو كواليس العمل النشطة لوحة مشاريع الفريق",
    project_status_label: "حالة المشروع",
    assigned_crew: "أعضاء فريق العمل الموزعين والمراقبين",
    project_files_vault: "خزانة ملفات كواليس الإنتاج الآمنة (تجريبية)",
    upload_new_production_file: "رفع ملف كواليس أو مستند إنتاجي",
    messages_board: "لوحة رسائل ومحادثات كواليس الإنتاج للفريق",
    type_internal_scouting_message: "اكتب رسالة فنية أو إشعارًا للفريق داخل الكواليس...",
    send_message_button: "إرسال للفريق في الموقع",
    phase_label: "مرحلة الإنتاج",

    // Script Market
    screenplay_marketplace_title: "سوق نصوص السيناريو وقنوات تراخيص الملكية الفكرية",
    list_screenplay_btn: "طرح نص للبيع أو الترخيص في السوق السينمائي",
    by_author_label: "بأقلام كاتب السيناريو",
    genre_label: "التصنيف الأدبي والروائي للنص:",
    page_count: "إجمالي الصفحات:",
    exclusive_buyout: "شراء حصري للملكية الفكرية الكلية للأفلام:",
    non_exclusive_commercial: "الترخيص التجاري غير الحصري للإنتاج المقيد:",
    copyright_protected_hash: "مستند تسجيل الملكية الفكرية برمز تشفير تجريبي:",
    read_preview_script_beats: "قراءة مقتطف ومعاينة السيناريو الموثق",
    acquire_ex_buyout: "شراء مسار الاستحواذ الكلي على النص والمشاهد الروائية",
    acquire_comm_license: "شراء ترخيص التشغيل والإنتاج غير الحصري للمشاهد",
    sell_price_ex_label: "سعر البيع والاستحواذ الكلي للملكية الفكرية ($)",
    sell_price_lic_label: "أجر ورسوم الترخيص التجاري المحدود ($)",
    preview_placeholder_script_beats: "قم بلصق أول ثلاثة صفحات لمعاينة النص وسلسلة الأحداث التمهيدية هنا...",

    // Festivals & Admin
    festivals_registrations: "مستندات حجز المهرجانات السينمائية ومسابقات كواليس",
    active_submission_arena: "حلبة مشاركات صناع الأفلام واليوميات واليوميات المصورة",
    vote_submission_btn: "التصويت العام ودعم صناع الفيلم",
    leaderboard_title: "جدول ترتيب وتصنيف شعبية وتفاعل صناع السينما",
    admin_tools_title: "لوحة التحكم التجريبية للإدارة والمحاكاة التقنية للتوثيقات",
    registered_badge: "تم حجز التذكرة بنجاح",
    ticket_price_label: "سعر حجز بطاقة الدخول:",
    organic_votes_label: "تفاعل وتصويت الجمهور الإيجابي المستلم:",
    instructor_label: "الأستاذ المحاضر المعتمد للفيلم:",
    duration_label: "الفترة الزمنية:"
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('cinemagram_lang') as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('cinemagram_lang', lang);
  };

  const t = (key: string): string => {
    const translation = dictionary[language][key];
    if (translation) return translation;
    // Fallback: search key with lowercase or return key as-is
    const fallback = dictionary[language][key.toLowerCase()];
    return fallback || key;
  };

  const isAr = language === 'ar';

  useEffect(() => {
    // Injects direction classes globally to look incredibly polished and professional
    const root = document.documentElement;
    if (isAr) {
      root.dir = 'rtl';
      root.lang = 'ar';
    } else {
      root.dir = 'ltr';
      root.lang = 'en';
    }
  }, [language, isAr]);

  return (
    <LanguageContext.Provider value={{ language, isAr, setLanguage, t }}>
      <div dir={isAr ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
