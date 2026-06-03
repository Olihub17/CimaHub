import React, { useState } from 'react';
import { initialProfiles, initialOpportunities, initialCourses, initialScripts, initialFeedPosts, initialProjects } from './data';
import { Profile, CastingOpportunity, Course, ScriptItem, FeedPost, ProjectCollaboration } from './types';

// Importing beautiful modular subcomponents
import NetworkFeed from './components/NetworkFeed';
import CastingMarket from './components/CastingMarket';
import AiCoachAndAnalyzer from './components/AiCoachAndAnalyzer';
import WorkspaceAndAcademy from './components/WorkspaceAndAcademy';
import ScriptMarketplace from './components/ScriptMarketplace';
import EventsLeaderboardAdmin from './components/EventsLeaderboardAdmin';
import UserProfileModal from './components/UserProfileModal';
import { useLanguage } from './LanguageContext';

// Beautiful Lucide Icons for dashboard pairing (styled like Instagram UI)
import {
  Sparkles,
  Search,
  Users,
  Compass,
  Film,
  MessageCircle,
  FileText,
  PlusSquare,
  User,
  Settings,
  Heart,
  Bookmark,
  Send,
  MoreHorizontal,
  Home,
  CheckCircle,
  TrendingUp,
  Image,
  Award,
  CreditCard,
  DollarSign,
  Briefcase,
  Calendar,
  Lock,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const { language, isAr, setLanguage, t } = useLanguage();
  // App States for mock databases (which standard clients can modify interactively)
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [opportunities, setOpportunities] = useState<CastingOpportunity[]>(initialOpportunities);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [scripts, setScripts] = useState<ScriptItem[]>(initialScripts);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(initialFeedPosts);
  const [projectsList, setProjectsList] = useState<ProjectCollaboration[]>(initialProjects);

  // Active persona context switcher
  const [activeProfileId, setActiveProfileId] = useState<string>('p2'); // Defaults to Nermin (Actor) for cool acting coach test
  const activeProfile = profiles.find(p => p.id === activeProfileId) || profiles[0];

  // Primary Instagram Navigation mapping:
  // 'feed' -> Home Feed
  // 'castings' -> Search Recruits (Search)
  // 'events-admin' -> Explore Arena (Compass)
  // 'workspace-academy' -> Academy reels / classes (Film)
  // 'ai-studio' -> DM Messages with AI Coach (MessageCircle)
  // 'script-market' -> Screenplay Marketplace (Shop)
  type ActivePanel = 'feed' | 'castings' | 'ai-studio' | 'workspace-academy' | 'script-market' | 'events-admin';
  const [activePanel, setActivePanel] = useState<ActivePanel>('feed');

  // Interactive popup variables
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  // Creative Modal Fields for Instagram New Post creation
  const [createPostText, setCreatePostText] = useState('');
  const [createPostImage, setCreatePostImage] = useState('');
  const [createPostTags, setCreatePostTags] = useState('');
  const [createPostCategory, setCreatePostCategory] = useState('General');

  // Interactive curated preset photos for filmmaking to help users publish high-quality IG media quickly
  const PRESET_STOCK_IMAGES = [
    { title: 'Desert Sci-Fi Set', url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80' },
    { title: 'Cyberpunk Camera Rig', url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80' },
    { title: 'Scenic Theatre Spotlight', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80' },
    { title: 'Modern Soundstage Staging', url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80' }
  ];

  // Helper function to upgrade status
  const handleUpgradeAccount = () => {
    const updated = profiles.map(p => {
      if (p.id === activeProfile.id) {
        return { ...p, isPremium: true };
      }
      return p;
    });
    setProfiles(updated);
    setShowSubscriptionModal(false);
    alert('Congratulations! You are now a CinemaHub Meta-Verified Premium member. An elegant golden star badge has been permanently attached to your profile.');
  };

  // Profile update callbacks
  const handleUpdateProfile = (updated: Profile) => {
    const updatedList = profiles.map(p => (p.id === updated.id ? updated : p));
    setProfiles(updatedList);
  };

  // Handle publishing of custom Instagram-formatted post
  const handlePublishInstagramPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createPostText.trim()) return;

    const tagsArray = createPostTags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newPost: FeedPost = {
      id: `post_${Date.now()}`,
      authorId: activeProfile.id,
      authorName: activeProfile.name,
      authorRole: activeProfile.crewSpecialty ? `${activeProfile.role} (${activeProfile.crewSpecialty})` : activeProfile.role,
      authorAvatar: activeProfile.avatar,
      content: createPostText,
      mediaUrl: createPostImage || PRESET_STOCK_IMAGES[0].url, // Use selected url or desert default
      mediaType: 'image',
      likes: [],
      comments: [
        {
          id: `comment_ai_${Date.now()}`,
          authorName: 'CinemaGram Assistant ✨',
          authorAvatar: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=80&q=80',
          content: 'Awesome! Welcome on the feed. Your post looks stellar in our CinemaGram film index!',
          timestamp: 'Just Now'
        }
      ],
      sharesCount: 0,
      timestamp: new Date().toISOString(),
      tags: tagsArray.length > 0 ? tagsArray : ['filmmaking', 'spotlight', 'cinema']
    };

    setFeedPosts([newPost, ...feedPosts]);
    
    // Clear and close
    setCreatePostText('');
    setCreatePostImage('');
    setCreatePostTags('');
    setShowCreatePostModal(false);
    setActivePanel('feed'); // Navigate back home so they see it
    alert('Cinematic post published successfully! It has been rendered at the top of your CinemaGram feed.');
  };

  const handleSuggestPostInput = (presetUrl: string) => {
    setCreatePostImage(presetUrl);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans antialiased overflow-x-hidden selection:bg-amber-500 selection:text-black flex flex-col lg:flex-row">
      
      {/* ========================================================= */}
      {/* DESKTOP SIDEBAR NAVIGATION (Instagram Style Left-Hand Sidebar) */}
      <aside className="hidden lg:flex flex-col justify-between w-64 xl:w-72 bg-black border-r border-[#262626] h-screen sticky top-0 py-8 px-6 text-xs z-30">
        <div className="space-y-8">
          
          {/* CinemaHub cursive/Instagram-styled logo header */}
          <div className="flex items-center gap-2 pl-3">
            <div className="p-1.5 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 shadow-md transform -rotate-6">
              <Film className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold tracking-wider text-base bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 bg-clip-text text-transparent uppercase font-mono">
                CinemaGram
              </span>
              <span className="text-[7px] block text-zinc-500 font-bold uppercase tracking-widest leading-none">{isAr ? 'منصة صناع السينما' : 'Film Hub Platform'}</span>
            </div>
          </div>

          {/* Premium Language Switcher */}
          <div className="mx-3 px-3 py-2 bg-[#121212] border border-[#262626] rounded-xl flex items-center justify-between">
            <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500">
              {isAr ? 'لغة التطبيق' : 'App Language'}
            </span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  !isAr ? 'bg-amber-500 text-black shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ar')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  isAr ? 'bg-amber-500 text-black shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                عربي
              </button>
            </div>
          </div>

          {/* Sidebar Menu items */}
          <nav className="space-y-2">
            {[
              { id: 'feed', label: t('home_feed'), icon: Home },
              { id: 'castings', label: t('search_castings'), icon: Search },
              { id: 'events-admin', label: t('explore_festivals'), icon: Compass },
              { id: 'workspace-academy', label: t('lessons_reels'), icon: Film },
              { id: 'ai-studio', label: t('direct_messages'), icon: MessageCircle, badge: '1' },
              { id: 'script-market', label: t('script_shop'), icon: FileText }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activePanel === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePanel(item.id as any)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all cursor-pointer group ${isActive ? 'bg-[#1c1c1e] text-amber-500 font-bold' : 'hover:bg-[#121212] text-zinc-400 hover:text-zinc-100'}`}
                >
                  <div className="flex items-center gap-4.5">
                    <Icon className={`w-5.8 h-5.8 stroke-[2.2] transition-transform group-hover:scale-105 ${isActive ? 'text-amber-500' : 'text-zinc-300'}`} />
                    <span className="text-[12.5px] font-medium tracking-wide uppercase leading-none">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-rose-600 text-white font-extrabold font-mono text-[9px] px-1.8 py-0.4 rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Instagram Style "Create Post" action button directly in Sidebar list */}
            <button
              onClick={() => setShowCreatePostModal(true)}
              className="w-full flex items-center gap-4.5 p-3.5 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-[#121212] cursor-pointer group transition-all"
            >
              <PlusSquare className="w-5.8 h-5.8 stroke-[2.2] text-amber-500 transition-transform group-hover:scale-105" />
              <span className="text-[12.5px] font-medium tracking-wide uppercase leading-none text-zinc-300 group-hover:text-amber-500">{t('create_post')}</span>
            </button>
          </nav>
        </div>

        {/* Lower section: Switch persona dropdown and Settings links */}
        <div className="space-y-4 pt-6 border-t border-[#262626]">
          {/* Settings Trigger */}
          <button
            onClick={() => setShowProfileModal(true)}
            className="w-full flex items-center gap-3 p-2 bg-[#121212] border border-[#262626] rounded-xl hover:bg-zinc-900 transition text-[11px] font-bold text-zinc-300"
          >
            <Settings className="w-4 h-4 text-amber-500" />
            <span>{t('settings_ledger')}</span>
          </button>

          {/* Interactive Persona context switcher at bottom of Sidebar */}
          <div className="bg-[#121212] p-3 rounded-xl border border-[#262626] space-y-2">
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block">{t('active_cast_persona')}</span>
            <div className="flex items-center gap-2">
              <img
                src={activeProfile.avatar}
                alt={activeProfile.name}
                className="w-8 h-8 rounded-full border border-amber-500/25 object-cover"
              />
              <div className="min-w-0 flex-1">
                <select
                  value={activeProfileId}
                  onChange={(e) => {
                    setActiveProfileId(e.target.value);
                    setActivePanel('feed'); // Reset view for clarity
                  }}
                  className="bg-transparent text-white font-extrabold border-none outline-none text-[11px] cursor-pointer focus:ring-0 focus:outline-none w-full truncate"
                >
                  {profiles.map(p => (
                    <option key={p.id} value={p.id} className="bg-black text-zinc-200 font-bold">
                      {p.name.split(' ')[0]} ({isAr && p.role === 'Actor' ? 'ممثل' : isAr && p.role === 'Director' ? 'مخرج' : isAr && p.role === 'Writer' ? 'كاتب' : isAr && p.role === 'Producer' ? 'منتج' : p.role})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Premium Account Badge Status */}
          {activeProfile.isPremium ? (
            <div className="bg-gradient-to-r from-[#d1ab55] to-amber-600 text-stone-950 font-extrabold text-[10px] p-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10">
              <Award className="w-4 h-4 animate-pulse stroke-[2.5]" />
              <span>{t('meta_verified_premium_status')}</span>
            </div>
          ) : (
            <button
              onClick={() => setShowSubscriptionModal(true)}
              className="w-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 hover:border-amber-500 text-amber-400 text-[10px] font-extrabold p-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-transform duration-200 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('upgrade_instagram_gold')}</span>
            </button>
          )}

          <div className="text-[9px] text-zinc-600 font-mono text-center">
            🌍 {isAr ? 'الرياض - نيوم - القاهرة' : 'Riyadh - Neom - Cairo'}<br />
            {t('instagram_framework_rights')}
          </div>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* MOBILE HEADER (Instagram Style Top Bar) */}
      <header className="lg:hidden sticky top-0 z-40 bg-black/95 backdrop-blur border-b border-[#262626] px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Film className="w-5 h-5 text-amber-500" />
          <span className="font-extrabold tracking-wider text-[15px] bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 bg-clip-text text-transparent uppercase font-mono">
            CinemaGram
          </span>
        </div>

        {/* Action icons on mobile header */}
        <div className="flex items-center gap-3">
          {/* Quick Arabic / English Language Toggle */}
          <button
            onClick={() => setLanguage(isAr ? 'en' : 'ar')}
            className="px-2 py-1 bg-[#121212] border border-[#262626] rounded-lg text-[10px] font-bold text-amber-500 hover:text-white cursor-pointer active:scale-95 transition-all"
            title={isAr ? 'English' : 'العربية'}
          >
            {isAr ? 'EN' : 'العربية'}
          </button>

          {/* Active persona select dropdown directly in mobile bar */}
          <div className="bg-[#121212] border border-[#262626] px-2 py-1 rounded-lg text-[10px]">
            <select
              value={activeProfileId}
              onChange={(e) => {
                setActiveProfileId(e.target.value);
                setActivePanel('feed');
              }}
              className="bg-transparent text-amber-500 font-extrabold border-none outline-none cursor-pointer"
            >
              {profiles.map(p => (
                <option key={p.id} value={p.id} className="bg-black text-zinc-200 font-bold">
                  {p.name.split(' ')[0]} ({isAr && p.role === 'Actor' ? 'ممثل' : isAr && p.role === 'Director' ? 'مخرج' : isAr && p.role === 'Writer' ? 'كاتب' : isAr && p.role === 'Producer' ? 'منتج' : p.role})
                </option>
              ))}
            </select>
          </div>

          {/* Settings Trigger Icon */}
          <button
            onClick={() => setShowProfileModal(true)}
            className="text-zinc-300 hover:text-white p-1"
          >
            <Settings className="w-4.8 h-4.8" />
          </button>

          {/* DM Messenger Icon Shortcut */}
          <button
            onClick={() => setActivePanel('ai-studio')}
            className={`p-1 relative ${activePanel === 'ai-studio' ? 'text-amber-500' : 'text-zinc-300'}`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-rose-600 border border-black text-white text-[7px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold font-mono">
              1
            </span>
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* FRAMEWORK CONTENT PANEL CONTAINER */}
      <main className="flex-1 overflow-y-auto min-h-0 bg-black pb-20 lg:pb-6">
        
        {/* Dynamic header label describing the Instagram page view */}
        <div className="max-w-4xl mx-auto px-4 md:px-6 pt-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1c1c1e] pb-3 mb-4">
            <div>
              <h2 className="text-zinc-100 font-extrabold text-sm uppercase tracking-widest flex items-center gap-1.5 font-mono">
                {activePanel === 'feed' && <span className="bg-gradient-to-r from-amber-400 to-rose-500 text-black text-[9px] px-2 py-0.5 rounded mr-1">{isAr ? 'منشورات' : 'Feed'}</span>}
                {activePanel === 'castings' && <span className="bg-cyan-500 text-black text-[9px] px-2 py-0.5 rounded mr-1">{isAr ? 'بحث' : 'Search'}</span>}
                {activePanel === 'ai-studio' && <span className="bg-purple-600 text-white text-[9px] px-2 py-0.5 rounded mr-1">{isAr ? 'محادثات' : 'DMs'}</span>}
                {activePanel === 'workspace-academy' && <span className="bg-rose-600 text-white text-[9px] px-2 py-0.5 rounded mr-1">{isAr ? 'أكاديمية' : 'Reels'}</span>}
                {activePanel === 'script-market' && <span className="bg-emerald-500 text-black text-[9px] px-2 py-0.5 rounded mr-1">{isAr ? 'سوق' : 'Shop'}</span>}
                {activePanel === 'events-admin' && <span className="bg-amber-500 text-black text-[9px] px-2 py-0.5 rounded mr-1">{isAr ? 'استكشاف' : 'Explore'}</span>}
                
                {activePanel === 'feed' && t('feed_title')}
                {activePanel === 'castings' && t('castings_title')}
                {activePanel === 'ai-studio' && t('ai_studio_title')}
                {activePanel === 'workspace-academy' && t('workspace_academy_title')}
                {activePanel === 'script-market' && t('script_market_title')}
                {activePanel === 'events-admin' && t('events_admin_title')}
              </h2>
              <p className="text-[10px] text-zinc-500 mt-1 font-light">
                {activePanel === 'feed' && t('feed_desc')}
                {activePanel === 'castings' && t('castings_desc')}
                {activePanel === 'ai-studio' && t('ai_studio_desc')}
                {activePanel === 'workspace-academy' && t('workspace_academy_desc')}
                {activePanel === 'script-market' && t('script_market_desc')}
                {activePanel === 'events-admin' && t('events_admin_desc')}
              </p>
            </div>

            {/* Quick Go Premium Switcher for rapid demo validation */}
            {!activeProfile.isPremium && (
              <button
                onClick={() => setShowSubscriptionModal(true)}
                className="mt-2 sm:mt-0 font-bold text-[9px] uppercase tracking-wide bg-amber-500 text-black px-2.5 py-1.5 rounded-lg hover:bg-amber-400 transition"
              >
                🔥 {t('get_verified_badge')}
              </button>
            )}
          </div>
        </div>

        {/* Primary Page Workspace Renderers */}
        <div className="max-w-5xl mx-auto px-4 md:px-6 animate-fadeIn pb-8">
          {activePanel === 'feed' && (
            <NetworkFeed
              posts={feedPosts}
              currentProfile={activeProfile}
              onUpdatePosts={setFeedPosts}
            />
          )}

          {activePanel === 'castings' && (
            <CastingMarket
              opportunities={opportunities}
              currentProfile={activeProfile}
              onUpdateOpportunities={setOpportunities}
              isLoadingAi={isLoadingAi}
              setIsLoadingAi={setIsLoadingAi}
            />
          )}

          {activePanel === 'ai-studio' && (
            <AiCoachAndAnalyzer
              isLoadingAi={isLoadingAi}
              setIsLoadingAi={setIsLoadingAi}
              userIsPremium={activeProfile.isPremium}
              onUpgradePrompt={() => setShowSubscriptionModal(true)}
            />
          )}

          {activePanel === 'workspace-academy' && (
            <WorkspaceAndAcademy
              courses={courses}
              projects={projectsList}
              currentProfile={activeProfile}
              onUpdateCourses={setCourses}
              onUpdateProjects={setProjectsList}
            />
          )}

          {activePanel === 'script-market' && (
            <ScriptMarketplace
              scripts={scripts}
              currentProfile={activeProfile}
              onUpdateScripts={setScripts}
            />
          )}

          {activePanel === 'events-admin' && (
            <EventsLeaderboardAdmin
              courses={courses}
              currentProfile={activeProfile}
              profiles={profiles}
              onUpdateCourses={setCourses}
              onUpdateProfiles={setProfiles}
              onMakePremium={() => {
                const updated = profiles.map(p => {
                  if (p.id === activeProfile.id) {
                    return { ...p, isPremium: true };
                  }
                  return p;
                });
                setProfiles(updated);
                alert('Success: Upgraded test account to premium status successfully! Gold verification badge attached.');
              }}
            />
          )}
        </div>
      </main>

      {/* ========================================================= */}
      {/* MOBILE BOTTOM NAVIGATION BAR (Sticky Instagram Mobile Bar) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-black border-t border-[#262626] py-2 px-3 flex justify-around items-center z-40 text-zinc-400">
        <button
          onClick={() => setActivePanel('feed')}
          className={`flex flex-col items-center p-1.5 hover:text-white ${activePanel === 'feed' ? 'text-amber-500' : ''}`}
        >
          <Home className="w-5.5 h-5.5" />
          <span className="text-[8px] tracking-wide mt-1 uppercase font-medium">{isAr ? t('home_feed') : 'Home'}</span>
        </button>

        <button
          onClick={() => setActivePanel('castings')}
          className={`flex flex-col items-center p-1.5 hover:text-white ${activePanel === 'castings' ? 'text-cyan-400' : ''}`}
        >
          <Search className="w-5.5 h-5.5" />
          <span className="text-[8px] tracking-wide mt-1 uppercase font-medium">{isAr ? t('search_castings') : 'Casting'}</span>
        </button>

        <button
          onClick={() => setShowCreatePostModal(true)}
          className="flex flex-col items-center p-1.5 text-amber-500"
        >
          <PlusSquare className="w-6.5 h-6.5 text-white bg-gradient-to-tr from-amber-500 to-rose-600 rounded-lg p-0.5 text-black" />
          <span className="text-[7px] tracking-wide mt-0.5 uppercase font-bold text-amber-500">{isAr ? 'نشر' : 'Create'}</span>
        </button>

        <button
          onClick={() => setActivePanel('workspace-academy')}
          className={`flex flex-col items-center p-1.5 hover:text-white ${activePanel === 'workspace-academy' ? 'text-rose-500' : ''}`}
        >
          <Film className="w-5.5 h-5.5" />
          <span className="text-[8px] tracking-wide mt-1 uppercase font-medium">{isAr ? 'الأكاديمية' : 'Academy'}</span>
        </button>

        <button
          onClick={() => setShowProfileModal(true)}
          className="flex flex-col items-center p-1.5 hover:text-white"
        >
          <img
            src={activeProfile.avatar}
            alt={activeProfile.name}
            className="w-5.5 h-5.5 rounded-full object-cover border border-zinc-700"
          />
          <span className="text-[8px] tracking-wide mt-1 uppercase font-medium">{isAr ? 'حسابك' : 'Profile'}</span>
        </button>
      </nav>

      {/* ========================================================= */}
      {/* 1. PORTFOLIO AND BIOGRAPHY EDIT MODAL */}
      {showProfileModal && (
        <UserProfileModal
          currentProfile={activeProfile}
          onUpdateProfile={handleUpdateProfile}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {/* ========================================================= */}
      {/* 2. INSTAGRAM-STYLE "CREATE NEW POST" MODAL */}
      {showCreatePostModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#121212] border border-[#2c2c3c] rounded-2xl max-w-lg w-full shadow-2xl relative overflow-hidden flex flex-col my-8 text-xs">
            
            {/* Modal Mini Header */}
            <div className="border-b border-[#262626] p-4 flex items-center justify-between">
              <span 
                onClick={() => setShowCreatePostModal(false)}
                className="text-zinc-400 hover:text-white font-semibold cursor-pointer text-sm"
              >
                {t('cancel')}
              </span>
              <h3 className="text-zinc-100 font-extrabold text-[13px] tracking-wider uppercase font-mono">{t('create_new_post_modal_title')}</h3>
              <button
                onClick={handlePublishInstagramPost}
                disabled={!createPostText.trim()}
                className={`font-extrabold text-sm ${createPostText.trim() ? 'text-sky-400 hover:text-sky-300' : 'text-zinc-600'} cursor-pointer`}
              >
                {t('share')}
              </button>
            </div>

            <form onSubmit={handlePublishInstagramPost} className="p-5 space-y-4">
              
              {/* Profile Context Line */}
              <div className="flex items-center gap-3 pb-2 border-b border-[#1c1c1e]">
                <img
                  src={activeProfile.avatar}
                  alt={activeProfile.name}
                  className="w-8 h-8 rounded-full object-cover border border-zinc-800"
                />
                <div>
                  <span className="font-extrabold text-[#fafafa] block">
                    {activeProfile.name.toLowerCase().replace(/\s+/g, '_')}_official
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    {isAr && activeProfile.role === 'Actor' ? 'ممثل' : isAr && activeProfile.role === 'Director' ? 'مخرج' : isAr && activeProfile.role === 'Writer' ? 'كاتب' : isAr && activeProfile.role === 'Producer' ? 'منتج' : activeProfile.role} • {isAr ? 'صناعة سينمائية' : 'Acting Specialist'}
                  </span>
                </div>
              </div>

              {/* Text Area */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold block mb-1">{t('write_caption')}</label>
                <textarea
                  rows={4}
                  required
                  placeholder={isAr ? "شارك المستجدات من موقع التصوير، أضف فكرة لمشروع سينمائي، أو فصّل تفاصيل أدائك الأخير..." : "Pitch a script, share behind-the-scenes set logs, or describe your latest audition techniques..."}
                  value={createPostText}
                  onChange={(e) => setCreatePostText(e.target.value)}
                  className="w-full bg-[#000] border border-[#262626] text-zinc-100 p-3 rounded-xl focus:outline-none focus:border-zinc-700 text-xs resize-none placeholder-zinc-600"
                />
              </div>

              {/* Image URL input */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold block">{t('post_media_url')}</label>
                <div className="flex gap-2">
                  <div className="bg-[#000] border border-[#262626] px-3.5 py-2.5 rounded-xl flex items-center justify-center">
                    <Image className="w-4 h-4 text-amber-500" />
                  </div>
                  <input
                    type="url"
                    placeholder={isAr ? "أضف رابط الصورة، أو اضغط على إحدى الصور الجاهزة أدناه للإرفاق الفوري" : "Provide image URL, or click a preset below to instantly attach"}
                    value={createPostImage}
                    onChange={(e) => setCreatePostImage(e.target.value)}
                    className="w-full bg-[#000] border border-[#262626] text-zinc-100 p-2.5 rounded-xl focus:outline-none focus:border-zinc-700"
                  />
                </div>
              </div>

              {/* Stock Presets selection */}
              <div className="space-y-1.5">
                <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">{t('quick_presets')}</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PRESET_STOCK_IMAGES.map((preset, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleSuggestPostInput(preset.url)}
                      className={`relative rounded-lg overflow-hidden border cursor-pointer aspect-video select-none group transition-all ${createPostImage === preset.url ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-[#262626] opacity-75 hover:opacity-100'}`}
                    >
                      <img src={preset.url} alt={preset.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-1 text-center">
                        <span className="text-[8px] text-white font-medium block truncate-2-lines">{isAr && preset.title === 'Desert Sci-Fi Set' ? 'موقع خيال علمي صحراوي' : isAr && preset.title === 'Cyberpunk Camera Rig' ? 'معدات كاميرات سيبربانك' : isAr && preset.title === 'Scenic Theatre Spotlight' ? 'مسرح مجهز بالكامل' : isAr && preset.title === 'Modern Soundstage Staging' ? 'استوديو تصوير حديث' : preset.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hashtags input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold block mb-1">{t('hashtags_split')}</label>
                  <input
                    type="text"
                    placeholder={isAr ? "مثال: تمثيل، سيناريو، الرياض، القاهرة" : "e.g. Acting, IndieFilm, Pitch, Riyadh"}
                    value={createPostTags}
                    onChange={(e) => setCreatePostTags(e.target.value)}
                    className="w-full bg-[#000] border border-[#262626] text-zinc-100 p-2.5 rounded-xl focus:outline-none focus:border-zinc-700"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold block mb-1">{t('category_index')}</label>
                  <select
                    value={createPostCategory}
                    onChange={(e) => setCreatePostCategory(e.target.value)}
                    className="w-full bg-[#000] border border-[#262626] text-zinc-200 p-2.5 rounded-xl focus:outline-none focus:border-zinc-700"
                  >
                    <option value="General">{t('behind_scenes_option')}</option>
                    <option value="Audition">{t('audition_clips_option')}</option>
                    <option value="Vfx">{t('vfx_cinematography_option')}</option>
                    <option value="Script">{t('screenplay_treatment_option')}</option>
                  </select>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-[#262626] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreatePostModal(false)}
                  className="bg-zinc-900 border border-[#262626] text-zinc-300 text-xs px-4 py-2 rounded-xl font-bold hover:bg-zinc-800 transition cursor-pointer"
                >
                  {t('discard')}
                </button>
                <button
                  type="submit"
                  disabled={!createPostText.trim()}
                  className="bg-amber-500 disabled:opacity-40 text-black hover:bg-amber-600 text-xs px-6 py-2 rounded-xl font-extrabold transition shadow-lg shadow-amber-500/10 cursor-pointer"
                >
                  {t('share_to_cinemagram')}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. PREMIUM STRIPE-MOCK SUBSCRIPTION METHODOLOGY MODAL */}
      {showSubscriptionModal && (
        <div id="premium-monetization-modal" className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#121212] border border-[#2b2c3c] rounded-2xl p-6 max-w-md w-full shadow-2xl relative text-xs">
            <span
              onClick={() => setShowSubscriptionModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl font-bold cursor-pointer"
            >
              &times;
            </span>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 rounded-full flex items-center justify-center mx-auto border border-amber-500/30">
                <Sparkles className="w-8 h-8 text-black animate-pulse stroke-[2.3]" />
              </div>

              <div>
                <h3 className="text-zinc-100 font-extrabold text-lg">{isAr ? 'عضوية وثق المذهب لسينما جرام' : 'CinemaGram Meta-Verification'}</h3>
                <p className="text-zinc-400 text-[11px] mt-1">{isAr ? 'احصل على نجمة ذهبية دقيقة لتوثيق ملفك وتفعيل ميزات التقييم بالكامل.' : 'Acquire a gold star checkmark badge and unlock complete cloud model indexes.'}</p>
              </div>

              {/* Bento cards describing tier benefits */}
              <div className="bg-[#000] border border-[#262626] rounded-xl p-4 space-y-2 text-left leading-relaxed">
                <p className="text-zinc-300">✓ <strong>{isAr ? 'مدرب تمثيل فوري بالذكاء الاصطناعي:' : 'Real-time AI Acting Coach:'}</strong> {isAr ? 'مدعوم بمحرك معايير جميناي الذكي.' : 'Runs standard Gemini analyses.'}</p>
                 <p className="text-zinc-300">✓ <strong>{isAr ? 'محلل المعالجة الأدبية للسيناريو:' : 'AI Script Treatment Analyzer:'}</strong> {isAr ? 'تقارير فورية حول جودة وبنية الحوارات.' : 'Structuring dialogues report indexes.'}</p>
                <p className="text-zinc-300">✓ <strong>{isAr ? 'أولوية الظهور للتوظيف وتجارب الأداء' : 'Priority Match for Casting Auditions'}</strong></p>
                <p className="text-zinc-300">✓ <strong>{isAr ? 'حماية غير محدودة لملكية الحقوق الادبية للنصوص' : 'Blockchain IP Screenplay Vaults protection'}</strong></p>
              </div>

              {/* Simulated Price Tag */}
              <div className="py-2">
                <strong className="text-3xl text-amber-500 font-extrabold">$29</strong>
                <span className="text-zinc-500 font-semibold font-mono">{isAr ? ' / شهريًا (وضع المحاكاة)' : '/ Month (Trial mode)'}</span>
              </div>

              {/* Credit card credentials mockup */}
              <div className="bg-[#000] border border-[#262626] rounded-xl p-3 text-left space-y-2.5">
                <div className="flex items-center gap-1.5 border-b border-[#262626] pb-2 text-[10px] text-zinc-400 uppercase font-mono font-bold">
                  <CreditCard className="w-4 h-4 text-emerald-500" />
                  <span>{isAr ? 'بوابة دفع سترايب الآمنة التجريبية متصلة' : 'Secure Mock Stripe Gateway Connected'}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-3">
                    <span className="text-[10px] text-zinc-500 block mb-0.5">{isAr ? 'رقم البطاقة' : 'Card Number'}</span>
                    <input type="text" disabled value="4242 •••• •••• 4242" className="w-full bg-[#121212] text-zinc-400 border border-[#262626] p-1.5 rounded outline-none font-mono text-center text-[10px]" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block mb-0.5">{isAr ? 'تاريخ الانتهاء' : 'Expiry'}</span>
                    <input type="text" disabled value="12/28" className="w-full bg-[#121212] text-zinc-400 border border-[#262626] p-1.5 rounded outline-none font-mono text-center text-[10px]" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block mb-0.5">CVC</span>
                    <input type="text" disabled value="***" className="w-full bg-[#121212] text-zinc-400 border border-[#262626] p-1.5 rounded outline-none font-mono text-center text-[10px]" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block mb-0.5">{isAr ? 'الرمز البريدي' : 'Zip'}</span>
                    <input type="text" disabled value="10001" className="w-full bg-[#121212] text-zinc-400 border border-[#262626] p-1.5 rounded outline-none font-mono text-center text-[10px]" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowSubscriptionModal(false)}
                  className="flex-1 bg-zinc-950 border border-[#262626] text-zinc-300 py-2.5 rounded-xl hover:bg-zinc-900 cursor-pointer font-bold"
                >
                  {t('close')}
                </button>
                <button
                  type="button"
                  onClick={handleUpgradeAccount}
                  className="flex-1 bg-amber-500 text-black font-extrabold py-2.5 rounded-xl hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/15 cursor-pointer"
                >
                  {t('verify_instantly')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
