import React, { useState, useEffect } from 'react';
import { FeedPost, Profile } from '../types';
import { initialProfiles } from '../data';
import { useLanguage } from '../LanguageContext';
import { 
  Sparkles, 
  MessageCircle, 
  Heart, 
  Bookmark, 
  Send, 
  Plus, 
  MoreHorizontal, 
  Check, 
  Compass, 
  Smile, 
  Volume2, 
  VolumeX, 
  X, 
  ArrowLeft, 
  ArrowRight,
  Tv,
  Film,
  Award
} from 'lucide-react';

interface NetworkFeedProps {
  posts: FeedPost[];
  currentProfile: Profile;
  onUpdatePosts: (updated: FeedPost[]) => void;
}

// Custom curated story slide data mapping profiles
const STORY_SLIDES = [
  {
    id: 'story_p1',
    profileId: 'p1',
    name: 'Youssef Chahine',
    role: 'Director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    storyMedia: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=120',
    caption: '🎥 Day 12 of Desert Scouting: Capturing the vast dunes of Neom. The cinematic scale here is breathtaking! #HistoricalEpic #Auteur',
    location: 'Neom, Saudi Arabia'
  },
  {
    id: 'story_p2',
    profileId: 'p2',
    name: 'Nermin Al-Saeed',
    role: 'Actor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    storyMedia: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=120',
    caption: '🎭 Monologue prep this morning. Running dramatic beats with our new AI Acting Coach. Spot-on critiques! #StellaAdler',
    location: 'Jeddah Opera House'
  },
  {
    id: 'story_p3',
    profileId: 'p3',
    name: 'Tariq Mansour',
    role: 'Writer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    storyMedia: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=120',
    caption: '✍🏼 Script Treatment finalized for "The Sands of Time". Standard Arabic dialogues are turning out so poetic! #Screenwriter',
    location: 'Riyadh Creative Districts'
  },
  {
    id: 'story_p4',
    profileId: 'p4',
    name: 'Kareem Fahdan',
    role: 'Cinematographer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    storyMedia: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=120',
    caption: '🎥 Lens test session with anamorphic primes. Pure flare beauty and vintage contrast roll-off. #DoP #ArriAlexa',
    location: 'Neom Media Hub'
  },
  {
    id: 'story_p6',
    profileId: 'p6',
    name: 'Hassan Al-Soudani',
    role: 'Producer',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    storyMedia: 'https://images.unsplash.com/photo-1542204172-e7052809a1a4?auto=format&fit=crop&w=800&q=120',
    caption: '💼 Met up with regional film investors. Big budgets approved for Saudi independent initiatives. Film is thriving! 🇸🇦🚀',
    location: 'Dubai Film Market'
  }
];

export default function NetworkFeed({ posts, currentProfile, onUpdatePosts }: NetworkFeedProps) {
  const { isAr, t } = useLanguage();
  // Comments and general interactivity states
  const [activeStoryIdx, setActiveStoryIdx] = useState<number | null>(null);
  const [storyProgress, setStoryProgress] = useState<number>(0);
  const [storyMuted, setStoryMuted] = useState(false);
  const [storyReactText, setStoryReactText] = useState('');
  
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});
  const [likedPosts, setLikedPosts] = useState<{ [postId: string]: boolean }>({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState<{ [postId: string]: boolean }>({});
  const [doubleClickedPost, setDoubleClickedPost] = useState<string | null>(null);
  
  // Followed suggestions states
  const [followedStatus, setFollowedStatus] = useState<{ [profileId: string]: boolean }>({
    p1: true,
    p2: true,
    p3: false,
    p4: true,
    p5: false,
    p6: false
  });

  // Handle auto-progressing of Instagram Stories
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeStoryIdx !== null) {
      setStoryProgress(0);
      interval = setInterval(() => {
        setStoryProgress((prev) => {
          if (prev >= 100) {
            // Move to next story, or close if at the end
            if (activeStoryIdx < STORY_SLIDES.length - 1) {
              setActiveStoryIdx(activeStoryIdx + 1);
              return 0;
            } else {
              setActiveStoryIdx(null);
              return 0;
            }
          }
          return prev + 1.25; // Speed multiplier for story countdown (approx 4-5 seconds)
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [activeStoryIdx]);

  // Double Click like gesture
  const handlePhotoDoubleClick = (postId: string) => {
    setDoubleClickedPost(postId);
    setTimeout(() => setDoubleClickedPost(null), 850);

    const post = posts.find(p => p.id === postId);
    if (post && !post.likes.includes(currentProfile.id)) {
      handleToggleLike(postId);
    }
  };

  const handleToggleLike = (postId: string) => {
    const updated = posts.map(post => {
      if (post.id === postId) {
        const alreadyLiked = post.likes.includes(currentProfile.id);
        const newLikes = alreadyLiked
          ? post.likes.filter(id => id !== currentProfile.id)
          : [...post.likes, currentProfile.id];
        return { ...post, likes: newLikes };
      }
      return post;
    });
    onUpdatePosts(updated);
  };

  const handleToggleBookmark = (postId: string) => {
    setBookmarkedPosts(prev => {
      const active = !prev[postId];
      if (active) {
        // Show lightweight premium cinematic save confirmation to mimic real save behavior
        alert('Cinematic post saved safely to your CinemaGram bookmark collection!');
      }
      return { ...prev, [postId]: active };
    });
  };

  const handlePostCommentSubmit = (postId: string, text: string) => {
    if (!text.trim()) return;

    const updated = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: `c_${Date.now()}`,
              authorName: currentProfile.name,
              authorAvatar: currentProfile.avatar,
              content: text,
              timestamp: 'Just now'
            }
          ]
        };
      }
      return post;
    });

    onUpdatePosts(updated);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const insertEmoji = (postId: string, emoji: string) => {
    const currentText = commentInputs[postId] || '';
    setCommentInputs(prev => ({ ...prev, [postId]: currentText + emoji }));
  };

  const handleSendMessageToStoryAuthor = (authorName: string) => {
    if (!storyReactText.trim()) return;
    alert(`Your direct message has been sent to ${authorName}: "${storyReactText}"`);
    setStoryReactText('');
    setActiveStoryIdx(null);
  };

  const handleQuickFollow = (profileId: string) => {
    setFollowedStatus(prev => ({ ...prev, [profileId]: !prev[profileId] }));
  };

  const formatUsername = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '_') + '_official';
  };

  return (
    <div className="flex justify-center gap-8 max-w-5xl mx-auto py-2">
      
      {/* LEFT COLUMN: Stories + Feed */}
      <div className="w-full md:max-w-[470px] space-y-4">
        
        {/* INSTAGRAM STORIES ROW */}
        <div className="bg-[#121212] border border-[#262626] rounded-xl py-4.5 px-4 flex items-center gap-4 overflow-x-auto scrollbar-none shadow-sm">
          {/* Active user "Your Story" circle */}
          <div className="flex flex-col items-center shrink-0 cursor-pointer relative group">
            <div className="relative p-[2px] rounded-full bg-zinc-800">
              <img
                src={currentProfile.avatar}
                alt={currentProfile.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-black"
                id="active-user-story-avatar"
              />
              <div className="absolute bottom-1 right-1 bg-sky-500 rounded-full border border-black p-0.5 text-white">
                <Plus className="w-3 h-3 stroke-[3]" />
              </div>
            </div>
            <span className="text-[10px] text-zinc-400 mt-1 truncate max-w-[64px] font-medium group-hover:text-zinc-200">
              Your Story
            </span>
          </div>

          {/* List of profiles curated stories */}
          {STORY_SLIDES.map((slide, idx) => (
            <div 
              key={slide.id} 
              onClick={() => setActiveStoryIdx(idx)}
              className="flex flex-col items-center shrink-0 cursor-pointer group"
            >
              <div className="p-[2.5px] rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-pink-600 animate-spin-slow">
                <div className="p-[1.5px] bg-black rounded-full">
                  <img
                    src={slide.avatar}
                    alt={slide.name}
                    className="w-13 h-13 rounded-full object-cover"
                  />
                </div>
              </div>
              <span className="text-[10px] text-zinc-400 font-medium mt-1.5 truncate max-w-[62px] text-center group-hover:text-zinc-200">
                {slide.name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>

        {/* FEED POSTS (Instagram Format) */}
        <div className="space-y-4">
          {posts.map(post => {
            const hasLiked = post.likes.includes(currentProfile.id);
            const isBookmarked = bookmarkedPosts[post.id] || false;
            const postUsername = formatUsername(post.authorName);
            const currentCommentText = commentInputs[post.id] || '';

            return (
              <article 
                key={post.id} 
                className="bg-black border border-[#262626] rounded-xl overflow-hidden shadow-lg"
              >
                {/* Post Header */}
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-[1.5px] rounded-full bg-gradient-to-tr from-amber-500 to-[#d97706] p-[0.5px]">
                      <img
                        src={post.authorAvatar}
                        alt={post.authorName}
                        className="w-8 h-8 rounded-full object-cover border border-black"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-[12px] font-bold text-[#fafafa] hover:underline cursor-pointer">
                          {postUsername}
                        </span>
                        {/* Golden/Verified badge depending on role & style */}
                        {(post.authorRole.includes('Director') || post.authorRole.includes('Company')) ? (
                          <span className="w-3.5 h-3.5 bg-sky-500 text-black rounded-full flex items-center justify-center text-[8px] font-extrabold" title="Verified Creator">
                            ✓
                          </span>
                        ) : (
                          <span className="w-3.5 h-3.5 bg-amber-500 text-[#000] rounded-full flex items-center justify-center text-[7px] font-extrabold" title="Verified Actor/Talent">
                            ★
                          </span>
                        )}
                        <span className="text-zinc-500 text-[10px]">&bull;</span>
                        <span className="text-zinc-500 text-[10px] font-medium">{post.authorRole}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500 block leading-tight font-light">{post.tags?.[1] || 'Riyadh, KSA'}</span>
                    </div>
                  </div>

                  <button className="text-zinc-400 hover:text-white p-1">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Post Media (with Double click gesture) */}
                <div 
                  className="relative bg-[#0d0d0f] select-none cursor-pointer overflow-hidden flex justify-center items-center aspect-square md:max-h-[470px] border-y border-[#1a1a1a]"
                  onDoubleClick={() => handlePhotoDoubleClick(post.id)}
                >
                  <img
                    src={post.mediaUrl || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80"}
                    alt="Cinema Post Content"
                    className="w-full h-full object-cover"
                  />

                  {/* DOUBLE CLICK POP HEART ANIMATION EFFECT */}
                  {doubleClickedPost === post.id && (
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center animate-ping">
                      <Heart className="w-24 h-24 text-rose-500 fill-rose-500 filter drop-shadow-xl opacity-90 scale-125 transition-transform" />
                    </div>
                  )}

                  {post.isPinned && (
                    <span className="absolute top-3 left-3 bg-rose-600/90 backdrop-blur-md text-[#fff] text-[8px] font-mono font-extrabold uppercase tracking-widest px-2.5 py-1 rounded shadow-lg">
                      Pinned Hub News
                    </span>
                  )}
                </div>

                {/* Quick Action Icon Row */}
                <div className="p-3 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleToggleLike(post.id)}
                      className="transition-transform duration-100 active:scale-125 hover:opacity-85"
                    >
                      <Heart className={`w-6 h-6 ${hasLiked ? 'fill-rose-600 text-rose-600' : 'text-[#fafafa]'}`} />
                    </button>
                    <button className="hover:opacity-85 text-[#fafafa]">
                      <MessageCircle className="w-6 h-6" />
                    </button>
                    <button className="hover:opacity-85 text-[#fafafa]">
                      <Send className="w-6 h-6" />
                    </button>
                  </div>

                  <button 
                    onClick={() => handleToggleBookmark(post.id)}
                    className="hover:opacity-85"
                  >
                    <Bookmark className={`w-6 h-6 ${isBookmarked ? 'fill-amber-500 text-amber-500' : 'text-[#fafafa]'}`} />
                  </button>
                </div>

                {/* Likes counter indicator */}
                <div className="px-3 pb-1">
                  <span className="text-[12px] font-bold text-[#fafafa]">
                    {post.likes.length > 0 ? (
                      `Liked by ${post.likes.includes(currentProfile.id) ? 'you' : formatUsername(post.likes[0])} and ${post.likes.length + 15} others`
                    ) : (
                      '18 likes'
                    )}
                  </span>
                </div>

                {/* Caption Description details */}
                <div className="px-3 pb-2 space-y-1">
                  <p className="text-[12px] text-zinc-200 leading-relaxed font-light">
                    <span className="font-extrabold text-[#fafafa] mr-1.5 hover:underline cursor-pointer">{postUsername}</span>
                    {post.content}
                  </p>
                  
                  {/* Styled Instagram Hashtags */}
                  {post.tags && (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag, idx) => (
                        <span key={idx} className="text-[11px] text-[#4ea4f9] font-medium hover:underline cursor-pointer">
                          #{tag.toLowerCase()}{' '}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Comments area */}
                <div id={`comments-feed-${post.id}`} className="px-3 pb-3 space-y-1.5 border-t border-[#121212] pt-2">
                  {post.comments.length > 0 && (
                    <button 
                      className="text-zinc-500 text-[11px] hover:text-zinc-400 font-medium cursor-pointer"
                    >
                      {isAr ? `عرض جميع التعليقات (${post.comments.length})` : `View all ${post.comments.length} comments`}
                    </button>
                  )}

                  <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1 scrollbar-thin">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="text-[11px] leading-tight flex items-start gap-1">
                        <span className="font-bold text-zinc-200 shrink-0">{comment.authorName.split(' ')[0].toLowerCase()}:</span>
                        <span className="text-zinc-400">{comment.content}</span>
                      </div>
                    ))}
                  </div>

                  {/* Relative Post Age Indicator */}
                  <div className="text-[9px] text-zinc-500 uppercase tracking-wide font-mono pt-1">
                    {new Date(post.timestamp).toLocaleDateString(isAr ? 'ar-EG' : 'en-US')}
                  </div>
                </div>

                {/* Inline comment additions with emojis shortcuts */}
                <div className="border-t border-[#262626] p-3 flex items-center justify-between bg-zinc-950/40">
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => insertEmoji(post.id, '🎬')} 
                      className="text-sm hover:scale-125 transition-transform"
                    >🎬</button>
                    <button 
                      onClick={() => insertEmoji(post.id, '🔥')} 
                      className="text-sm hover:scale-125 transition-transform"
                    >🔥</button>
                    <button 
                      onClick={() => insertEmoji(post.id, '🎭')} 
                      className="text-sm hover:scale-125 transition-transform"
                    >🎭</button>
                    <button 
                      onClick={() => insertEmoji(post.id, '🍿')} 
                      className="text-sm hover:scale-125 transition-transform"
                    >🍿</button>
                  </div>

                  <div className="flex-1 px-3">
                    <input
                      type="text"
                      placeholder={t('add_comment')}
                      value={currentCommentText}
                      onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handlePostCommentSubmit(post.id, currentCommentText);
                      }}
                      className="w-full bg-transparent text-[11px] text-zinc-200 placeholder-zinc-500 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={() => handlePostCommentSubmit(post.id, currentCommentText)}
                    disabled={!currentCommentText.trim()}
                    className={`text-[11px] font-bold ${currentCommentText.trim() ? 'text-sky-400 hover:text-sky-300' : 'text-zinc-600'} cursor-pointer`}
                  >
                    {t('post')}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: Instagram suggestions and sponsorship specs */}
      <div className="hidden lg:block w-[320px] shrink-0 space-y-6 self-start sticky top-5">
        
        {/* Active persona overview header */}
        <div className="flex items-center justify-between p-1">
          <div className="flex items-center gap-3">
            <img
              src={currentProfile.avatar}
              alt={currentProfile.name}
              className="w-11 h-11 rounded-full object-cover border border-[#262626]"
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="text-[12px] font-bold text-zinc-100 hover:underline cursor-pointer">
                  {formatUsername(currentProfile.name)}
                </span>
                {currentProfile.isPremium && (
                  <span className="w-3.5 h-3.5 bg-amber-500 text-[#000] rounded-full flex items-center justify-center text-[8px] font-extrabold">
                    ★
                  </span>
                )}
              </div>
              <p className="text-[10px] text-zinc-500">{currentProfile.name}</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            {currentProfile.role}
          </span>
        </div>

        {/* Suggestions directory */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-extrabold text-[11px] uppercase tracking-wider">{t('suggested_creators')}</span>
            <span className="text-zinc-300 font-bold hover:text-white cursor-pointer text-[10px]">{t('see_all')}</span>
          </div>

          <div className="space-y-3 bg-[#121212] border border-[#262626] rounded-xl p-4.5">
            {initialProfiles
              .filter(p => p.id !== currentProfile.id)
              .slice(0, 4)
              .map(p => {
                const isFollowing = followedStatus[p.id];
                return (
                  <div key={p.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-9 h-9 rounded-full object-cover border border-[#262626]"
                      />
                      <div>
                        <span className="text-[11px] font-bold text-zinc-200 block hover:underline cursor-pointer">
                          {formatUsername(p.name)}
                        </span>
                        <span className="text-[9px] text-zinc-500 block leading-tight">
                          {isAr && p.role === 'Actor' ? 'ممثل' : isAr && p.role === 'Director' ? 'مخرج' : isAr && p.role === 'Writer' ? 'كاتب' : isAr && p.role === 'Producer' ? 'منتج' : p.role} • {isAr && p.crewSpecialty === 'VFX & Stunts' ? 'خدع بصرية ومجازفات' : isAr && p.crewSpecialty === 'Dialogues & Screenplay' ? 'حوارات وسيناريو' : p.crewSpecialty || p.skills[0]}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleQuickFollow(p.id)}
                      className={`text-[10px] font-bold ${isFollowing ? 'text-zinc-600' : 'text-sky-400'} hover:opacity-85 cursor-pointer`}
                    >
                      {isFollowing ? (isAr ? 'متصل' : 'Connected') : (isAr ? 'اتصال' : 'Connect')}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Sponsored active cinema highlight or project billboard */}
        <div className="bg-[#121212]/70 border border-[#262626] rounded-xl p-4 space-y-2.5">
          <div className="flex items-center gap-1 border-b border-[#262626] pb-2">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{t('sponsored_hot_audition')}</span>
          </div>
          <div>
            <span className="bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-[8px] px-1.5 py-0.2 rounded uppercase tracking-wide">
              {isAr ? 'مبادرة نيوم لأفلام الخيال العلمي' : 'Neom SciFi Initiative'}
            </span>
            <h4 className="text-[11px] font-bold text-zinc-100 mt-1">{isAr ? 'ممثلة رئيسية لفيلم "ملحمة الصحراء"' : 'Lead Actress for Desert Odyssey'}</h4>
            <p className="text-[10px] text-zinc-400 font-light leading-snug mt-0.5">{isAr ? 'الميزانية ٢٥,٠٠٠ ريال. نبحث عن ممثلة تجيد اللهجة الفصحى والتمثيل البدني الصعب.' : 'Budget $12,500. Seeks actresses fluent in standard Dialect Arabic for physical stage performances.'}</p>
          </div>
          <button 
            className="w-full bg-[#262626] hover:bg-[#323232] text-zinc-100 text-[10px] font-bold py-1.5 rounded transition cursor-pointer"
            onClick={() => alert(isAr ? 'جاري تحويلك لمنصة تجارب الأداء! يرجى استخدام مبوبة "البحث عن تجارب الأداء" للتقديم الفوري.' : 'Redirecting to Cinema recruitment module! Use the Castings search tab to apply.')}
          >
            {t('sponsor_audition_detail')}
          </button>
        </div>

        {/* Static guidelines info */}
        <div className="text-[9px] text-zinc-600 font-mono leading-relaxed px-1">
          {t('about_text')}
          <p className="mt-2 text-zinc-700">{t('instagram_framework_rights')}</p>
        </div>

      </div>

      {/* INSTAGRAM STORIES SLIDESHOW OVERLAY PLAYER MODAL */}
      {activeStoryIdx !== null && (
        <div className="fixed inset-0 bg-neutral-950/95 backdrop-blur-md flex items-center justify-center z-50 p-2 md:p-6 animate-fadeIn">
          {/* Close button inside story */}
          <button 
            onClick={() => setActiveStoryIdx(null)}
            className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-zinc-900/60 p-2.5 rounded-full z-50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Navigation Arrow */}
          {activeStoryIdx > 0 && (
            <button 
              onClick={() => setActiveStoryIdx(activeStoryIdx - 1)}
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white bg-zinc-900/60 p-3 rounded-full hover:scale-105 transition-all z-20"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Navigation Arrow */}
          {activeStoryIdx < STORY_SLIDES.length - 1 && (
            <button 
              onClick={() => setActiveStoryIdx(activeStoryIdx + 1)}
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white bg-zinc-900/60 p-3 rounded-full hover:scale-105 transition-all z-20"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          {/* Main vertical story slide container */}
          <div className="relative max-w-[370px] w-full aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 flex flex-col justify-between">
            
            {/* Story Head Banner (Progress Bars & User details) */}
            <div className="absolute top-0 inset-x-0 p-3 bg-gradient-to-b from-black/80 to-transparent z-10 space-y-2.5">
              
              {/* Automated Progress Bar indicators */}
              <div className="flex gap-1">
                {STORY_SLIDES.map((_, i) => {
                  let width = '0%';
                  if (i < activeStoryIdx) width = '100%';
                  else if (i === activeStoryIdx) width = `${storyProgress}%`;
                  
                  return (
                    <div key={i} className="flex-1 h-0.8 bg-zinc-700/60 rounded">
                      <div 
                        className="h-full bg-amber-500 rounded transition-all duration-75"
                        style={{ width }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Story Author Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={STORY_SLIDES[activeStoryIdx].avatar}
                    alt={STORY_SLIDES[activeStoryIdx].name}
                    className="w-8.5 h-8.5 rounded-full object-cover border border-amber-500"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-white uppercase">{STORY_SLIDES[activeStoryIdx].name}</span>
                      <span className="bg-amber-500 text-black text-[7px] font-extrabold px-1 rounded">
                        {STORY_SLIDES[activeStoryIdx].role}
                      </span>
                    </div>
                    <span className="text-[9px] text-[#dedede] font-light font-mono block leading-none">{STORY_SLIDES[activeStoryIdx].location}</span>
                  </div>
                </div>

                {/* Micro interactivity toggle like volume */}
                <button 
                  onClick={() => setStoryMuted(!storyMuted)}
                  className="text-white hover:text-zinc-200"
                >
                  {storyMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-amber-500" />}
                </button>
              </div>
            </div>

            {/* Simulated cinematic image or clip container */}
            <div className="absolute inset-0 z-0">
              <img
                src={STORY_SLIDES[activeStoryIdx].storyMedia}
                alt="Story content frame"
                className="w-full h-full object-cover brightness-[0.8]"
              />
            </div>

            {/* Bottom story panel (Caption text + reaction messenger) */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/95 to-transparent z-10 space-y-3">
              <p className="text-[11px] text-white leading-relaxed font-light whitespace-pre-line drop-shadow-md bg-black/30 p-2 rounded border border-white/5 backdrop-blur-[2px]">
                {STORY_SLIDES[activeStoryIdx].caption}
              </p>

              {/* Stories direct messaging reply bar */}
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder={`Reply to ${STORY_SLIDES[activeStoryIdx].name.split(' ')[0]}...`}
                  value={storyReactText}
                  onChange={(e) => setStoryReactText(e.target.value)}
                  className="flex-1 bg-white/10 text-white rounded-full px-4 py-2 border border-white/20 text-[11px] placeholder-zinc-300 focus:outline-none focus:ring-1 focus:ring-amber-500 backdrop-blur"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessageToStoryAuthor(STORY_SLIDES[activeStoryIdx].name);
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleSendMessageToStoryAuthor(STORY_SLIDES[activeStoryIdx].name)}
                  disabled={!storyReactText.trim()}
                  className={`px-3 py-2 rounded-full font-bold text-[10px] uppercase truncate ${storyReactText.trim() ? 'bg-amber-500 text-[#000]' : 'bg-white/10 text-zinc-500'} transition-all`}
                >
                  Send
                </button>
              </div>

              {/* Direct Quick Reaction Emojis Row */}
              <div className="flex justify-around items-center pt-1.5 border-t border-white/10 text-rose-500">
                {['🎬', '🔥', '✨', '🎥', '👏', '🎨'].map(e => (
                  <button 
                    key={e}
                    onClick={() => {
                      alert(`Sent dynamic reaction ${e} to ${STORY_SLIDES[activeStoryIdx].name}!`);
                      setActiveStoryIdx(null);
                    }}
                    className="text-lg hover:scale-125 transition-transform"
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
