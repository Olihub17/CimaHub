import { Profile, CastingOpportunity, Course, ScriptItem, FeedPost, ProjectCollaboration, EventFestival, Competition } from './types';

// Mock Profiles (Actors, Directors, Writers, Producers, Crew, Companies)
export const initialProfiles: Profile[] = [
  {
    id: 'p1',
    name: 'Youssef Chahine Bey',
    email: 'youssef@cinemahub.com',
    role: 'Director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    bio: 'Award-winning independent director with a passion for human-centric narratives, modern realism, and cross-cultural storytelling in the Middle East and internationally.',
    bioAr: 'مخرج مستقل حائز على جوائز عالمية، شغوف بالقصص الإنسانية الواقعية والتبادل الثقافي السينمائي في الشرق الأوسط والعالم.',
    skills: ['Auteur Directing', 'Script Doctoring', 'Visual Storytelling', 'Casting Direction', 'Indie Filmmaking'],
    experienceYears: 12,
    education: ['BFA in Filmmaking - Cairo Higher Institute of Cinema', 'MFA in Directing - USC School of Cinematic Arts'],
    certifications: ['Cannes Directors Guild Honors', 'Arab Film Institute Masterclass Cert'],
    languages: ['Arabic', 'English', 'French'],
    portfolioUrls: [
      { title: 'The Last Horizon (Teaser)', url: 'https://vimeo.com/example/last-horizon' },
      { title: 'Whispers of Cairo (Short Film)', url: 'https://youtube.com/example/whispers-cairo' }
    ],
    videos: [
      { title: 'Directing Reel 2026', url: 'https://www.w3schools.com/html/mov_bbb.mp4' }
    ],
    awards: ['Best Director - El Gouna Film Festival 2024', 'Special Jury Prize - Carthage Film Festival 2023'],
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/youssef-chahine' },
      { platform: 'Vimeo', url: 'https://vimeo.com/chahinedirector' }
    ],
    reputationScore: 4.9,
    reviewsCount: 18,
    isPremium: true,
    isVerified: true,
    connections: ['p2', 'p3', 'p4', 'p5'],
    following: ['p2', 'p3', 'p6']
  },
  {
    id: 'p2',
    name: 'Nermin Al-Saeed',
    email: 'nermin@cinemahub.com',
    role: 'Actor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1512070673790-ee72b7f5c8b0?auto=format&fit=crop&w=800&q=80',
    bio: 'Bilingual screen actress specializing in intense dramatic performances, classical Arabic theater, and voiceover artistry. Passionate about bringing authentic female perspectives to regional TV & cinema.',
    bioAr: 'ممثلة سينمائية ومسرحية ثنائية اللغة متخصصة في الأداء الدرامي المكثف، والمسرح الكلاسيكي، والتعليق الصوتي. شغوفة بتقديم قصص ملهمة في السينما والتلفزيون.',
    skills: ['Method Acting', 'Classical Arabic Dialogue', 'Voice Acting', 'Stunt Basics', 'Improvisation'],
    experienceYears: 6,
    education: ['BA in Theater & Creative Writing - American University in Cairo', 'Physical Theater Summer Intensive - Royal Academy of Dramatic Art (RADA)'],
    certifications: ['Advanced Screen Acting - Stella Adler Studio'],
    languages: ['Arabic (Modern Standard & Egyptian)', 'English (Fluent)'],
    portfolioUrls: [
      { title: 'Showreel 2025', url: 'https://vimeo.com/example/nermin-reel' },
      { title: 'Stunt & Combat Highlights', url: 'https://youtube.com/example/stunt-nermin' }
    ],
    videos: [
      { title: 'Monologue - Shakespeare in Arabic', url: 'https://www.w3schools.com/html/movie.mp4' }
    ],
    awards: ['Best Rising Actress - Cairo International Film Festival 2024'],
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/nermin_saeed_actress' },
      { platform: 'Twitter', url: 'https://twitter.com/nermin_saeed_act' }
    ],
    reputationScore: 4.8,
    reviewsCount: 14,
    isPremium: true,
    isVerified: true,
    connections: ['p1', 'p3'],
    following: ['p1', 'p4']
  },
  {
    id: 'p3',
    name: 'Tariq Mansour',
    email: 'tariq@cinemahub.com',
    role: 'Writer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    bio: 'Screenwriter and historical novelist. Focused on screenplays that unearth lesser-known historical events in the MENA region, and adapting rich literature into high-concept episodic streaming series.',
    bioAr: 'كاتب سيناريو وروائي تاريخي. يركز على كتابة أعمال تستكشف المحطات التاريخية الفارقة في الشرق الأوسط وتحويل الروائع الأدبية إلى مسلسلات درامية.',
    skills: ['Screenwriting', 'Story Structure', 'Character Development', 'Arabic Dialogue', 'Historical Research'],
    experienceYears: 8,
    education: ['BA in Modern History - Damascus University', 'Screenplay Workshop - Red Sea Film Foundation'],
    certifications: ['Guild of Writers Arab League Certificate'],
    languages: ['Arabic (Syrian, Gulf, Egyptian)', 'English'],
    portfolioUrls: [
      { title: 'The Sands of Time (Treatment)', url: 'https://drive.google.com/example/sands-time-script' }
    ],
    videos: [
      { title: 'Writer Room Panel Talk', url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4' }
    ],
    awards: ['Best Screenplay nominee - Red Sea Film Festival 2024'],
    socialLinks: [
      { platform: 'Twitter', url: 'https://twitter.com/tariq_writes' }
    ],
    reputationScore: 4.7,
    reviewsCount: 9,
    isPremium: false,
    isVerified: false,
    connections: ['p1', 'p4'],
    following: ['p1', 'p5']
  },
  {
    id: 'p4',
    name: 'Kareem Fahdan',
    email: 'kareem@cinemahub.com',
    role: 'Crew',
    crewSpecialty: 'Cinematographer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    bio: 'Director of Photography (DoP) with over 7 years of experience shooting feature films, documentaries, and cinematic commercial campaigns using modern large-format digital cameras and classic anamorphic glass.',
    bioAr: 'مدير تصوير سينمائي خبرة لأكثر من ٧ سنوات في تصوير الأفلام الروائية والوثائقية والحملات الإعلانية باستخدام أحدث الكاميرات الرقمية والعدسات الأنامورفيك الكلاسيكية.',
    skills: ['Camera Operation', 'Cinematic Lighting', 'Color Grading', 'Anamorphic Framing', 'Steadicam'],
    experienceYears: 7,
    education: ['BFA in Cinema Studies - Vancouver Film School'],
    certifications: ['Active Society of Cinematographers (ASC) Associate', 'Arri Alexa Specialist Cert'],
    languages: ['Arabic', 'English'],
    portfolioUrls: [
      { title: 'Cinematography Showreel 2025', url: 'https://vimeo.com/example/kareem-cinematography' }
    ],
    videos: [
      { title: 'Lighting Breakdown Reel', url: 'https://www.w3schools.com/html/mov_bbb.mp4' }
    ],
    awards: ['Golden Lens for Cinematography - Dubai Film Gala 2023'],
    socialLinks: [{ platform: 'Instagram', url: 'https://instagram.com/kareem_dop' }],
    reputationScore: 4.9,
    reviewsCount: 22,
    isPremium: false,
    isVerified: true,
    connections: ['p1', 'p3', 'p5'],
    following: ['p1']
  },
  {
    id: 'p5',
    name: 'Amara International Stars',
    email: 'contact@amaraproductions.com',
    role: 'Company',
    avatar: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
    bio: 'Amara International Stars is a leading film and television production studio headquartered in Riyadh and Cairo. We produce prestige dramatic series and high-concept films for major global cinema release and top tier streaming giants.',
    bioAr: 'شركة عمارة لإنتاج وتوزيع الأفلام هي شركة رائدة في إنتاج وتوزيع الأعمال السينمائية والتلفزيونية الراقية في الرياض والقاهرة. نوفر فرص عمل ومشاريع بأعلى كفاءة للموهوبين.',
    skills: ['Film Investment', 'Global Co-production', 'Localization', 'Casting Agencies', 'VFX Studios Partner'],
    experienceYears: 15,
    education: [],
    certifications: ['Arab Association of Producers Honor Seal'],
    languages: ['Arabic', 'English'],
    portfolioUrls: [
      { title: 'Company Portfolio', url: 'https://amaraproductions.com' },
      { title: 'VFX & Sound Facilities tour', url: 'https://youtube.com/example/amara-tour' }
    ],
    videos: [],
    awards: ['Studio House of the Year - MENA Media Awards 2024'],
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/company/amara-stars' }
    ],
    reputationScore: 5.0,
    reviewsCount: 35,
    isPremium: true,
    isVerified: true,
    connections: ['p1', 'p2', 'p4'],
    following: []
  },
  {
    id: 'p6',
    name: 'Hassan Al-Soudani',
    email: 'hassan@cinemahub.com',
    role: 'Producer',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1542204172-e7052809a1a4?auto=format&fit=crop&w=800&q=80',
    bio: 'Independent producer operating out of Dubai. Focused on backing low-to-mid budget feature films with powerful narratives that have strong festival potential and commercial viability.',
    bioAr: 'منتج مستقل يعمل من دبي. يركز على دعم الأفلام ذات الميزانية المتوسطة والقصص القوية التي تسافر للمهرجانات العالمية مع الحفاظ على قدرتها التجارية.',
    skills: ['Budgeting', 'Film Financing', 'Pitching', 'Distribution Strategy', 'Co-production Line'],
    experienceYears: 10,
    education: ['MBA - London Film School & ESCP'],
    certifications: ['IAF Producers Guild'],
    languages: ['Arabic', 'English'],
    portfolioUrls: [],
    videos: [],
    awards: ['Best Arab Independent Producer 2023'],
    socialLinks: [],
    reputationScore: 4.6,
    reviewsCount: 7,
    isPremium: false,
    isVerified: true,
    connections: ['p1'],
    following: ['p1']
  }
];

// Mock Casting & Job Opportunities
export const initialOpportunities: CastingOpportunity[] = [
  {
    id: 'o1',
    title: 'Lead Female Actor - Historical Drama Feature "Sands of Red Sea"',
    companyId: 'p5',
    companyName: 'Amara International Stars',
    roleType: 'Actor',
    projectType: 'Feature Film',
    location: 'Neom, Saudi Arabia & Cairo, Egypt',
    paymentType: 'Paid',
    salary: '$8,000 / Week + Royalties',
    description: 'We are seeking a commanding bilingual actress to play Layla, a strong-willed diplomat in early 20th-century Hejaz. The character transitions from a strategic state advisor into an active desert revolutionary. Requires strong classical Arabic dialogue delivery and outstanding physical presence.',
    requirements: [
      'Must speak standard classical Arabic (Fusha) beautifully with authentic accentuation.',
      'Age range: 25 - 38 years old.',
      'Previous feature film credits or rigorous dramatic theater background.',
      'Willingness to travel for 3 months of dynamic desert shoot sequences.'
    ],
    deadline: '2026-07-20',
    applicants: [
      {
        profileId: 'p2',
        name: 'Nermin Al-Saeed',
        role: 'Actor',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        appliedDate: '2026-06-01',
        status: 'Shortlisted',
        aiMatchScore: 94,
        aiMatchFeedback: 'Nermin has incredible alignment. Her method acting background, classical Arabic focus, and the right age range make her a perfect match for Layla. She already has a highly rated record on local history themes.'
      }
    ],
    dateCreated: '2026-05-15'
  },
  {
    id: 'o2',
    title: 'Cinematographer (DoP) - Sci-Fi Thriller Trailer "Neon Mirage"',
    companyId: 'p1',
    companyName: 'Youssef Chahine Bey Film Works',
    roleType: 'Crew',
    crewSpecialty: 'Cinematographer',
    projectType: 'Short Film',
    location: 'Dubai Digital Studios & Al-Ula Desert',
    paymentType: 'Paid',
    salary: '$1,200 / Day',
    description: 'Looking for a Director of Photography (DoP) to shoot a high-end sci-fi teaser. Tone is moody cyberpunk meets historical architecture. Must have deep experience blending neon lighting layouts with daylight desert landscapes.',
    requirements: [
      'Expert knowledge of Arri Alexa Mini LF or RED V-Raptor cameras.',
      'Stellar portfolio showcasing neon/cyberpunk aesthetics or creative anamorphic lens control.',
      'Own camera kit is a plus but not mandatory.',
      'Demonstrated collaborative attitude with complex CGI guidelines.'
    ],
    deadline: '2026-06-30',
    applicants: [],
    dateCreated: '2026-05-28'
  },
  {
    id: 'o3',
    title: 'Screenwriter for 8-Episode Streaming Drama Series "The Syndicate"',
    companyId: 'p5',
    companyName: 'Amara International Stars',
    roleType: 'Writer',
    projectType: 'TV Series',
    location: 'Remote (Joint Writers Room in Cairo office)',
    paymentType: 'Paid',
    salary: '$30,000 Flat Script Commission + Credits',
    description: 'Amara is assembling a room of screenwriters to construct a contemporary espionage thriller set across Mediterranean ports. We need writers with exceptional dialogue skills who can draft tightly wound multi-perspective suspense plotlines.',
    requirements: [
      'Prior script formatting samples indicating master-level tension control.',
      'Comfortable co-writing in an interactive, collaborative digital workspace room.',
      'Understand regional political textures, dialects, and modern slang nuances.',
      'Able to deliver under strict production timelines.'
    ],
    deadline: '2026-07-15',
    applicants: [
      {
        profileId: 'p3',
        name: 'Tariq Mansour',
        role: 'Writer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        appliedDate: '2026-06-02',
        status: 'Pending',
        aiMatchScore: 88,
        aiMatchFeedback: 'Tariq has beautiful suspense scripting capability and historical understanding. This regional syndicate narrative fits his writing voice beautifully.'
      }
    ],
    dateCreated: '2026-05-20'
  }
];

// Mock Learning Academy courses
export const initialCourses: Course[] = [
  {
    id: 'c1',
    title: 'The Art of Cinematic Directing & Visual Continuity',
    category: 'Directing',
    instructor: 'Youssef Chahine Bey',
    instructorTitle: 'International Auteur & Cannes Laureate',
    duration: '8 Hours (12 Lessons)',
    level: 'Advanced',
    rating: 4.9,
    studentsCount: 1240,
    coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
    description: 'Deconstruct master shots, handle complex actor interactions, build structural subtext, and establish visual rhythm on set. Learn how to map your direct-vision from conceptual page layouts into powerful, enduring cinematic beats.',
    isEnrolled: true,
    progressPercentage: 40,
    lessonsCompleted: ['l1', 'l2'],
    lessons: [
      { id: 'l1', title: 'Welcome: Finding Your Artistic Vision on Canvas', duration: '20 min', content: 'Discover the foundations of cinema, visual voice, finding your aesthetic identity, and defining what stories truly matter.' },
      { id: 'l2', title: 'Script Breakdown: Mapping Camera Angles & Emotion', duration: '35 min', content: 'In this lesson, we take a standard raw scene script page. We translate dialogues into specific beats, deciding focus points, dolly moves, and lens compression types.' },
      { id: 'l3', title: 'Blocking Actors: Psychological Spatial Relationships', duration: '45 min', content: 'How actor placement relative to the lens defines power, isolation, romance, or underlying structural mistrust without speaking a word.' },
      { id: 'l4', title: 'Working with the DoP: Translating Ideas into Lens Choice', duration: '30 min', content: 'Establish camera languages. We explore anamorphic vs spherical, depth of field decisions, and using focal lengths to emphasize high drama.' }
    ],
    quizzes: [
      {
        id: 'q1',
        question: 'Which camera lens focal length will exaggerate facial distance and compress foreground/background depth making character actions feel suffocating?',
        options: ['18mm Ultra Wide Angle Lens', '50mm Normal Human Eye Lens', '135mm Telephoto Portrait Lens', '24mm Wide Prime Lens'],
        correctAnswerIndex: 2,
        explanation: 'A telephoto lens (such as 135mm) compresses spatial depth drastically. Objects in the background seem much larger and closer to the foreground character, projecting a sense of suffocation or paranoia.'
      },
      {
        id: 'q2',
        question: 'In cinematic terminology, what is "blocking" an actor?',
        options: [
          'Stopping them from saying lines that violate copyrights.',
          'Determining their precise physical movements and spatial positions in relation to the camera and scenery.',
          'Shining a bright light in their eyes so they cannot see their partner.',
          'Editing their scenes completely out of the final cinematic cut.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Blocking is the collaborative process where the director and actors define physical positions and pathways on set to capture emotional subtext and secure clean camera angles.'
      }
    ]
  },
  {
    id: 'c2',
    title: 'Screenwriting Masterclass: Structure, Dialogue & Pacing',
    category: 'Screenwriting',
    instructor: 'Tariq Mansour',
    instructorTitle: 'Veteran Historical Novelist & Guild Writer',
    duration: '10 Hours (15 Lessons)',
    level: 'Intermediate',
    rating: 4.8,
    studentsCount: 890,
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
    description: 'Master the Three-Act Structure, build complex multi-layered hero arcs, eliminate on-the-nose expository dialogues, and formulate emotional high stakes that hook cinematic buyers.',
    isEnrolled: false,
    progressPercentage: 0,
    lessonsCompleted: [],
    lessons: [
      { id: 'l11', title: 'The Hook: Crafting the Inciting Incident Superbly', duration: '25 min', content: 'Understanding standard page markers. The first 10 pages must formulate the status quo and trigger the inciting disruption to capture the reading producer.' },
      { id: 'l22', title: 'Character Psychology: Crafting the Fatal Flaw', duration: '40 min', content: 'A memorable writer builds a character on a solid internally-driven wound. We map how their primary psychological shield causes outer dramatic conflict.' }
    ],
    quizzes: [
      {
        id: 'q11',
        question: 'At which page range does the inciting incident typically occur in a standard 110-page feature film script screenplay?',
        options: ['Pages 1 to 5', 'Pages 10 to 15', 'Pages 45 to 50', 'Pages 80 to 90'],
        correctAnswerIndex: 1,
        explanation: 'The inciting incident traditionally disrupts the status quo around page 10 to 15, pulling the protagonist into the main dramatic conflict of Act I.'
      }
    ]
  },
  {
    id: 'c3',
    title: 'The Method Actor: Emotional Substitution & Sincerity',
    category: 'Acting',
    instructor: 'Nermin Al-Saeed',
    instructorTitle: 'Award-winning Screen Actress',
    duration: '6 Hours (10 Lessons)',
    level: 'Beginner',
    rating: 4.7,
    studentsCount: 620,
    coverImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    description: 'Learn physiological emotional recall, vocal projection exercises, cold reading techniques, and how to stay grounded under intense on-set camera pressures.',
    isEnrolled: false,
    progressPercentage: 0,
    lessonsCompleted: [],
    lessons: [
      { id: 'l31', title: 'Authentic Reaction: The Art of Listening in Scene Work', duration: '30 min', content: 'Real acting is reacting. We focus on listening, breaking pre-conceived delivery rhythms, and being genuinely impacted by your partner.' }
    ],
    quizzes: [
      {
        id: 'q31',
        question: 'What is the primary goal of the "Emotional Recall" memory sensory technique?',
        options: [
          'To memorize all screenplay dialogue text perfectly without reading.',
          'To summon a real, lived sensory experience from your private past to color current scene emotions with genuine physiological authenticity.',
          'To cry on cue by using artificial menthol eye crystals.',
          'To tell your scene partner exactly how to act their own parts.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Emotional recall asks the actor to utilize private memories to elicit genuine, organic physical reactions corresponding to the script demands.'
      }
    ]
  }
];

// Mock Script Marketplace
export const initialScripts: ScriptItem[] = [
  {
    id: 's1',
    title: 'The Echo of Neom',
    logline: 'An environmental scientist discovers a mysterious subterranean acoustic frequency in the dunes of Arabian desert, unlocking historical signals that could rewrite regional maritime history.',
    genre: 'Science Fiction / Mystery',
    pageCount: 114,
    priceExclusive: 25000,
    priceLicense: 1200,
    authorId: 'p3',
    authorName: 'Tariq Mansour',
    isCopyrightProtected: true,
    protectHash: 'SHA-256://CINEMAHUB-BLOCKCHAIN-77AF922D30B9FFC',
    previewText: `EXT. DESERT DUNES - DAWN\n\nA sea of crimson sand as far as the telescope can trace. Wind moans across the steep ridges.\n\nFADIL (40s), gaunt, sun-baked face, kneels next to a high-frequency receiver. He places his hand on the warm sand.\n\nFADIL\nIt is not the wind, Amira. It is breathing, beat for beat.\n\nAMIRA (on intercom)\nYou are experiencing desert fatigue, Fadil. Pack the gear and return of camp before the dust rolls.\n\nFadil presses headphones closer. The audio fluctuates in repeating mechanical patterns.`,
    fullContent: `(FULL SCRIPT EXCLUSIVE ACCESS)\nEXT. DESERT DUNES - DAWN\n\nFADIL (40s), gaunt, sun-baked face, kneels next to a high-frequency receiver. He places his hand on the warm sand.\n\nFADIL\nIt is not the wind, Amira. It is breathing, beat for beat.\n\nWe hear a distinct harmonic rhythm, pulsating deep within the sandstone rock sheets. Fadil checks the spectral analyzer. Sub-bass signatures match ancient rhythmic navigation signals from lost Phoenician traders.`
  },
  {
    id: 's2',
    title: 'Cries of Carthage',
    logline: 'A fast-paced psychological political thriller detailing the private conflicts of Carthage diplomats on the eve of the historic final siege.',
    genre: 'Historical / Political',
    pageCount: 102,
    priceExclusive: 45000,
    priceLicense: 3200,
    authorId: 'p3',
    authorName: 'Tariq Mansour',
    isCopyrightProtected: true,
    protectHash: 'SHA-256://CINEMAHUB-BLOCKCHAIN-C250889EE99818',
    previewText: `INT. SENATE CHAMBER - NIGHT\n\nTorches cast dancing shadows on white marble. Senators argue in harsh whispers.\n\nHAMILCAR (60s) stands before the podium, robes bloodied from battle fields.\n\nHAMILCAR\nYou sit in silks debating currency weights, while Roman hulls anchor in our harbor.\n\nSENATOR HASDRUBAL\nCommerce, Hamilcar, is the only shield that endures.\n\nHamilcar drawing his dagger, slamming the steel tip directly into the wooden senator table.`,
    fullContent: `(FULL SCRIPT PRO ACCESS)\nHAMILCAR\nThere is no gold in the treasury that can negotiate with a general who has sworn to see this sand salted. We fight today, or we die in chains next week.`
  }
];

// Mock Film Industry Social Feed
export const initialFeedPosts: FeedPost[] = [
  {
    id: 'post1',
    authorId: 'p1',
    authorName: 'Youssef Chahine Bey',
    authorRole: 'Director',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    content: 'Just returned from a location scouting expedition in Neom for my upcoming historical epic. The interplay of ancient geology with futuristic sustainability plans creates an inspiring backdrop for visual storytelling. Looking forward to assembling a brilliant crew on CinemaHub!',
    mediaUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likes: ['p2', 'p4', 'p6'],
    comments: [
      {
        id: 'c_p1_1',
        authorName: 'Kareem Fahdan',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
        content: 'Unbelievable scales out there, Youssef! The shadows on that rock-sand border around sunset are a Dop dream. Let me know if you want to run camera tests there.',
        timestamp: '2 hours ago'
      },
      {
        id: 'c_p1_2',
        authorName: 'Nermin Al-Saeed',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        content: 'This feels incredibly grand. Can’t wait to review the casting sheets for the lead roles!',
        timestamp: '1 hour ago'
      }
    ],
    sharesCount: 15,
    timestamp: '2026-06-03T09:12:00Z',
    tags: ['Cinema', 'Neom', 'Scouting', 'Filmmaking']
  },
  {
    id: 'post2',
    authorId: 'p2',
    authorName: 'Nermin Al-Saeed',
    authorRole: 'Actor',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    content: 'Brushing up my standard classical Arabic dialogues this morning for an upcoming audition. I uploaded the rehearsal monologue to CinemaHub’s state-of-the-art AI Acting Coach and received excellent critiques on facial micro-tensions. Highly recommend all rising actors here to make use of it!',
    likes: ['p1', 'p3'],
    comments: [
      {
        id: 'c_p2_1',
        authorName: 'Tariq Mansour',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        content: 'The language alignment is crucial! Excellent work keeping standard Dialect alive Nermin.',
        timestamp: '4 hours ago'
      }
    ],
    sharesCount: 4,
    timestamp: '2026-06-02T15:30:00Z',
    tags: ['ActingLife', 'MethodActing', 'AICoach', 'ArabicTheatre']
  }
];

// Mock Collaboration Workspaces
export const initialProjects: ProjectCollaboration[] = [
  {
    id: 'proj1',
    name: 'Sands of Red Sea (Feature Drama)',
    type: 'Feature Film',
    description: 'A prestigious epic following the lives and secret maneuvers of state advisors and desert revolutionaries on the coast of the Red Sea in the early 1900s.',
    status: 'Pre-Production',
    coverImage: 'https://images.unsplash.com/photo-1512070673790-ee72b7f5c8b0?auto=format&fit=crop&w=400&q=80',
    ownerId: 'p1',
    team: [
      { profileId: 'p1', name: 'Youssef Chahine Bey', role: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
      { profileId: 'p2', name: 'Nermin Al-Saeed', role: 'Lead Actress (Layla)', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
      { profileId: 'p5', name: 'Amara Stars', role: 'Main Production Partner', avatar: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=150&q=80' },
      { profileId: 'p4', name: 'Kareem Fahdan', role: 'Director of Photography', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80' }
    ],
    tasks: [
      { id: 't1', title: 'Complete Draft of Act II Script revision', description: 'Tariq to refine dialogues for the desert treaty negotiation sequence.', assignedTo: 'p3', status: 'In Progress', dueDate: '2026-06-15', priority: 'High' },
      { id: 't2', title: 'Lock Neom desert shoot locations', description: 'Finalize lodging arrangement and local logistics coordination contracts.', assignedTo: 'p1', status: 'To Do', dueDate: '2026-06-25', priority: 'Medium' },
      { id: 't3', title: 'Approve Wardrobe and Historic Accessories', description: 'Authenticate clothes designs from the historical advisors.', assignedTo: 'p2', status: 'Done', dueDate: '2026-05-30', priority: 'Low' }
    ],
    workflows: [
      { id: 'w1', phase: 'Pre-Production', status: 'Active', startDate: '2026-05-01', endDate: '2026-08-31' },
      { id: 'w2', phase: 'Production', status: 'Pending', startDate: '2026-09-01', endDate: '2026-11-30' },
      { id: 'w3', phase: 'Post-Production', status: 'Pending', startDate: '2026-12-01', endDate: '2027-02-28' }
    ],
    files: [
      { name: 'Sands_Red_Sea_Treatment_v2.pdf', size: '2.4 MB', uploadedBy: 'Youssef Chahine Bey', date: '2026-05-20', url: '#' },
      { name: 'Neom_Aesthetic_Moodboard.pdf', size: '14.8 MB', uploadedBy: 'Kareem Fahdan', date: '2026-05-25', url: '#' }
    ],
    messages: [
      { senderId: 'p1', senderName: 'Youssef Chahine Bey', senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', content: 'Welcome to the formal board crew! Let’s keep this workspace active. Tariq is working hard on scripture adjustments.', timestamp: 'Yesterday at 3:15 PM' },
      { senderId: 'p2', senderName: 'Nermin Al-Saeed', senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', content: 'Thrilled to be aboard. Already looking over the physical training routines recommended by historical script. Let’s create magic!', timestamp: 'Yesterday at 4:02 PM' }
    ]
  }
];

// Mock Events and Festivals
export const initialEvents: EventFestival[] = [
  {
    id: 'e1',
    name: 'El Gouna Film Festival 2026',
    type: 'Festival',
    date: '2026-10-24 to 2026-11-01',
    location: 'El Gouna, Egypt',
    description: 'One of the leading cinema festivals in the Middle East, aimed at connecting filmmakers, local screenplays, and international producers to nurture regional artistic talent.',
    coverImage: 'https://images.unsplash.com/photo-1512070673790-ee72b7f5c8b0?auto=format&fit=crop&w=600&q=80',
    organizer: 'El Gouna Tourism & Media Board',
    isRegistered: true,
    attendeesCount: 450,
    ticketPrice: '$150 Basic Pass / $500 Industry VIP'
  },
  {
    id: 'e2',
    name: 'Screenwriting Workshop: Suspense Mechanics',
    type: 'Workshop',
    date: '2026-07-05',
    location: 'Rich Digital Hub, Dubai & Online Zoom',
    description: 'An exhaustive masterclass on writing tension, creating cliffhangers, and designing character dialogue subtext to pitch successfully to global platforms.',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
    organizer: 'CinemaHub Education Academy',
    isRegistered: false,
    attendeesCount: 89,
    ticketPrice: 'Free (Premium Account) / $35 (Free Tier)'
  }
];

// Mock Competitions
export const initialCompetitions: Competition[] = [
  {
    id: 'comp1',
    title: 'June Screenwriting Challenge: Post-Apocalyptic Arabia',
    category: 'Best Screenplay',
    description: 'Draft a gripping 5-page dramatic dialogue scene set in an abandoned architectural marvel under extreme desert reclamation. Focus on emotional dialogue and raw survival struggles.',
    deadline: '2026-06-25',
    prizePool: '$3,500 + Publishing to Producers Syndicate',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
    submissions: [
      {
        id: 'sub1_1',
        authorId: 'p3',
        authorName: 'Tariq Mansour',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        title: 'Thirst on Dune 4',
        contentUrl: 'The water condensers are humming in static. Amal looks at the rust.',
        description: 'A sci-fi short focusing on an elder sister trading her voice synthesizer for fresh hydration.',
        votes: 34,
        voters: ['p2', 'p1'],
        dateSubmitted: '2026-06-01'
      }
    ],
    leaderboard: [
      { rank: 1, profileId: 'p3', name: 'Tariq Mansour', score: 94, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', role: 'Writer' },
      { rank: 2, profileId: 'p4', name: 'Kareem Fahdan', score: 88, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80', role: 'Cinematographer' }
    ]
  },
  {
    id: 'comp2',
    title: 'Monologue Performance Championship: Shakespeare Arabic Translation',
    category: 'Best Actor',
    description: 'Record yourself reciting a classical dramatic monologue adapted beautifully to classical Standard Arabic. AI evaluates emotional delivery and structural vocal timber.',
    deadline: '2026-06-28',
    prizePool: '$5,000 + Masterclass with Youssef Chahine Bey',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    submissions: [
      {
        id: 'sub2_1',
        authorId: 'p2',
        authorName: 'Nermin Al-Saeed',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        title: 'Lady Macbeth - Act V Scene I in Fusha',
        contentUrl: 'https://www.w3schools.com/html/movie.mp4',
        description: 'Reciting Lady Macbeth’s famous sleepwalking guilt scene translated into elegant high Arabic poetry.',
        votes: 82,
        voters: ['p1', 'p3', 'p4'],
        dateSubmitted: '2026-06-02'
      }
    ],
    leaderboard: [
      { rank: 1, profileId: 'p2', name: 'Nermin Al-Saeed', score: 98, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', role: 'Actor' }
    ]
  }
];

// Load and Save Local Database to maintain state
export function getSavedData<T>(key: string, defaultValue: T): T {
  try {
    const saved = localStorage.getItem(`cinemahub_${key}`);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

export function saveLocalData(key: string, data: any): void {
  try {
    localStorage.setItem(`cinemahub_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error(`Failed to write local storage key cinemahub_${key}:`, e);
  }
}

// Current Logged in User ID key
export const CURRENT_USER_ID_KEY = 'current_user_id';
export const DEFAULT_CURRENT_USER_ID = 'p1'; // Default: Youssef Chahine
