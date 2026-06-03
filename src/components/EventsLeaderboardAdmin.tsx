import React, { useState } from 'react';
import { Course, Profile } from '../types';
import { Calendar, ShieldAlert, Plus, Vote, Trophy, Users, CheckSquare, Trash2, Edit, Award, UserCheck, Star, Clock } from 'lucide-react';

interface EventsLeaderboardAdminProps {
  courses: Course[];
  currentProfile: Profile;
  profiles: Profile[];
  onUpdateCourses: (updated: Course[]) => void;
  onUpdateProfiles: (updated: Profile[]) => void;
  onMakePremium: () => void;
}

export default function EventsLeaderboardAdmin({
  courses,
  currentProfile,
  profiles,
  onUpdateCourses,
  onUpdateProfiles,
  onMakePremium
}: EventsLeaderboardAdminProps) {
  // Navigation
  const [activePane, setActivePane] = useState<'events' | 'competitions' | 'admin'>('events');

  // 1. EVENTS STATES
  const [registeredEvents, setRegisteredEvents] = useState<string[]>(['ev1']);
  const eventsData = [
    {
      id: 'ev1',
      title: 'Red Sea International Film Festival (Riyadh)',
      date: 'Dec 05 - Dec 14, 2026',
      location: 'Riyadh Ritz-Carlton Congress Center',
      type: 'Festival & Film Market',
      organizer: 'Red Sea Foundation',
      description: 'The definitive cinema event in the Middle East, screening 120+ features, red carpets, script labs and pitching forums.',
      capacity: 'Full Credentials Pass',
      registrations: 1450
    },
    {
      id: 'ev2',
      title: 'Cairo International Cinema Industry Seminar',
      date: 'Oct 20 - Oct 25, 2026',
      location: 'Egyptian Opera House, Cairo',
      type: 'Syllabus & Masterclass Summit',
      organizer: 'CIFF Committee',
      description: 'Dedicated seminars on Dolby Atmos soundtracks, IMAX projection standards, and Arabic screenwriters funding workshops.',
      capacity: 'Standard RSVP Required',
      registrations: 420
    }
  ];

  const handleRegisterEvent = (eventId: string) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
    } else {
      setRegisteredEvents([...registeredEvents, eventId]);
    }
  };

  // 2. COMPETITION STATES
  const [competitionVotes, setCompetitionVotes] = useState<Record<string, number>>({
    'sub1': 142,
    'sub2': 98,
    'sub3': 118
  });
  const [hasVotedArray, setHasVotedArray] = useState<string[]>([]);
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [submissionTitle, setSubmissionTitle] = useState('');
  const [userSubmissions, setUserSubmissions] = useState<any[]>([
    { id: 'sub1', creator: 'Ahmed Al-Akeel', title: 'The Sand Whispers (5min Short)', role: 'Director', votes: 142 },
    { id: 'sub2', creator: 'Mariam Gamil', title: 'Cries of Alexandria (10min Drama)', role: 'Writer', votes: 98 },
    { id: 'sub3', creator: 'Tariq Mansoor', title: 'Oasis of Neom SciFi Treatment', role: 'Concept Artist', votes: 118 }
  ]);

  const handleCastVote = (subId: string) => {
    if (hasVotedArray.includes(subId)) {
      alert("You have already cast your professional ballot for this submission!");
      return;
    }
    setCompetitionVotes({ ...competitionVotes, [subId]: competitionVotes[subId] + 1 });
    setHasVotedArray([...hasVotedArray, subId]);
  };

  const handleRegisterFilmClip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionTitle.trim() || !submissionUrl.trim()) return;

    const newSub = {
      id: `sub_${Date.now()}`,
      creator: currentProfile.name,
      title: `${submissionTitle} (Submitted File)`,
      role: currentProfile.role,
      votes: 1
    };

    setUserSubmissions([...userSubmissions, newSub]);
    setCompetitionVotes({ ...competitionVotes, [newSub.id]: 1 });
    setSubmissionTitle('');
    setSubmissionUrl('');
    alert('Success! Your cinema clip is entry-listed on the leaderboard. Share with collaborators to earn votes!');
  };

  // 3. ADMIN STATES
  const [adminCourseTitle, setAdminCourseTitle] = useState('');
  const [adminCourseInstructor, setAdminCourseInstructor] = useState('');
  const [adminCourseCategory, setAdminCourseCategory] = useState('Directology');
  const [adminCourseLevel, setAdminCourseLevel] = useState<'Beginner' | 'Intermediate' | 'Expert'>('Intermediate');
  const [adminCourseDesc, setAdminCourseDesc] = useState('');

  const [moderationPosts, setModerationPosts] = useState([
    { id: 'm1', author: 'Spam User', role: 'None', text: 'Earn $10k per day working from home click this link fake opportunity...', flagReason: 'Spam / Malicious external link advertisement' },
    { id: 'm2', author: 'Arrogant Director', role: 'Director', text: 'This actor portfolio looks absolutely ridiculous you should find another job.', flagReason: 'Hostility / Professional Code violations' }
  ]);

  const handleAddCourseAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminCourseTitle.trim() || !adminCourseInstructor.trim()) return;

    const newCourse: Course = {
      id: `c_${Date.now()}`,
      title: adminCourseTitle,
      instructor: adminCourseInstructor,
      instructorTitle: 'CinemaHub Certified Expert',
      description: adminCourseDesc || 'Advanced structural curriculum classes.',
      category: 'Directing', // valid fallback category matching interface
      level: 'Intermediate',
      duration: '4h 15m',
      rating: 4.9,
      studentsCount: 1,
      coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      lessons: [
        { id: 'l1', title: 'Core Masterclass Session 1', duration: '45m', content: 'Video overview of production scopes and staging structures.' }
      ],
      quizzes: [],
      isEnrolled: false,
      progressPercentage: 0,
      lessonsCompleted: []
    };

    onUpdateCourses([newCourse, ...courses]);
    setAdminCourseTitle('');
    setAdminCourseInstructor('');
    setAdminCourseDesc('');
    alert('Dynamic course provisioned into Academy menu listings!');
  };

  const handleUpdateTestProfileRole = (profileId: string, nextRole: any) => {
    const updated = profiles.map(p => {
      if (p.id === profileId) {
        return { ...p, role: nextRole };
      }
      return p;
    });
    onUpdateProfiles(updated);
    alert(`Verified role updated to ${nextRole}`);
  };

  return (
    <div className="space-y-6">
      {/* Tab select Header bar */}
      <div className="flex border-b border-[#232430] bg-[#12131a] p-1 rounded-lg">
        <button
          onClick={() => setActivePane('events')}
          className={`flex-1 text-center py-2 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer ${activePane === 'events' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-gray-400 hover:text-gray-200'}`}
        >
          <Calendar className="w-4 h-4" />
          Events & Film Festivals
        </button>
        <button
          onClick={() => setActivePane('competitions')}
          className={`flex-1 text-center py-2 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer ${activePane === 'competitions' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-gray-400 hover:text-gray-200'}`}
        >
          <Trophy className="w-4 h-4" />
          Interactive Competitions
        </button>
        <button
          onClick={() => setActivePane('admin')}
          className={`flex-1 text-center py-2 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer ${activePane === 'admin' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-gray-400 hover:text-gray-200'}`}
        >
          <ShieldAlert className="w-4 h-4" />
          CinemaHub Admin Control Panel
        </button>
      </div>

      {activePane === 'events' ? (
        /* ==================== EVENTS PANE ==================== */
        <div className="space-y-6">
          <div className="bg-[#12131a] border border-[#232430] p-4 rounded-xl">
            <h3 className="text-gray-100 font-bold text-sm">Industrial Events, Panels & Auditions Calendars</h3>
            <p className="text-xs text-gray-500 mt-0.5">Participate in cinema conferences, coordinate and showcase your active portfolio directly with talent scouts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eventsData.map(event => {
              const isRegistered = registeredEvents.includes(event.id);
              return (
                <div key={event.id} className="bg-[#12131a] border border-[#232430] p-5 rounded-xl shadow-lg relative flex flex-col justify-between">
                  {isRegistered && (
                    <span className="absolute top-2 right-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded">
                      ✓ Registered attendee
                    </span>
                  )}

                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded tracking-wide uppercase font-mono">{event.type}</span>
                      <h4 className="text-gray-100 font-bold text-sm mt-2">{event.title}</h4>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-500" />
                        {event.date}
                      </p>
                    </div>

                    <p className="text-xs text-gray-400 border-t border-[#1e1f2b] pt-3 leading-relaxed">{event.description}</p>

                    <div className="bg-[#0b0c10] p-2.5 rounded text-xs space-y-1 text-gray-300 font-mono">
                      <p>📍 Venue: <strong>{event.location}</strong></p>
                      <p>🎫 Credentials: <strong>{event.capacity}</strong></p>
                      <p>👥 Active Bookings: <strong>{event.registrations + (isRegistered ? 1 : 0)} seats filled</strong></p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1e1f2b] flex justify-end">
                    <button
                      onClick={() => handleRegisterEvent(event.id)}
                      className={`text-xs font-semibold px-4 py-2 rounded-lg transition-transform cursor-pointer ${isRegistered ? 'bg-rose-500/15 text-rose-400 hover:bg-rose-500/25' : 'bg-amber-500 text-slate-950 font-bold hover:bg-amber-600'}`}
                    >
                      {isRegistered ? 'Cancel RSVP Ticket' : 'Claim RSVP Ticket Pass'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : activePane === 'competitions' ? (
        /* ==================== COMPETITIONS LEADERBOARD PANE ==================== */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form and submission left */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#12131a] border border-[#232430] p-5 rounded-xl space-y-4">
              <h3 className="text-gray-100 font-bold text-sm flex items-center gap-1.5">
                <Trophy className="w-5 h-5 text-amber-500 animate-pulse" />
                Saudi Short Film Cup Season 5 Cup Entry
              </h3>

              <p className="text-xs text-gray-400 leading-normal">
                Submit an unedited 5-minute storyboard clip, or an acoustic audio acting monologue file to earn ratings by accredited casting guild directors!
              </p>

              <form onSubmit={handleRegisterFilmClip} className="space-y-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 block font-semibold mb-1">Film / Project Submission Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Echoes of the Sands Narrative"
                    value={submissionTitle}
                    onChange={(e) => setSubmissionTitle(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 text-xs rounded p-2.5 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 block font-semibold mb-1">Portfolio Link (YouTube, Vimeo, Cloud Drive)</label>
                  <input
                    type="url"
                    required
                    placeholder="https://vimeo.com/your-cinemahub-shortfilm"
                    value={submissionUrl}
                    onChange={(e) => setSubmissionUrl(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 text-xs rounded p-2.5 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 font-bold text-xs py-2.5 rounded-lg text-slate-950 transition cursor-pointer"
                >
                  Submit Clip Entry Ballot
                </button>
              </form>
            </div>
          </div>

          {/* Real-time board right */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
              <Vote className="w-4 h-4 text-amber-400" />
              Dynamic Competitions Leaderboard Rankings
            </h3>

            <div className="bg-[#12131a] border border-[#232430] rounded-xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#0b0c10] text-gray-500 font-semibold uppercase tracking-wider border-b border-[#232430]">
                    <th className="px-4 py-3 text-center">Rank</th>
                    <th className="px-4 py-3">Participant & Submission</th>
                    <th className="px-4 py-3 text-center">Voter tallies</th>
                    <th className="px-4 py-3 text-right">Cast Ballot</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1d1f2b]">
                  {userSubmissions
                    .map(sub => ({ ...sub, votes: competitionVotes[sub.id] || sub.votes }))
                    .sort((a, b) => b.votes - a.votes)
                    .map((sub, index) => {
                      const hasVoted = hasVotedArray.includes(sub.id);
                      return (
                        <tr key={sub.id} className="hover:bg-[#161724]">
                          <td className="px-4 py-4 text-center font-bold">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                          </td>
                          <td className="px-4 py-4">
                            <strong className="text-gray-100 block">{sub.title}</strong>
                            <span className="text-gray-500 text-[11px] block mt-0.5">By {sub.creator} ({sub.role})</span>
                          </td>
                          <td className="px-4 py-4 text-center font-mono font-bold text-amber-500">
                            {sub.votes} Votes
                          </td>
                          <td className="px-4 py-4 text-right">
                            <button
                              onClick={() => handleCastVote(sub.id)}
                              disabled={hasVoted}
                              className={`px-3 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${hasVoted ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500 hover:bg-amber-600 text-slate-950'}`}
                            >
                              {hasVoted ? 'Ballot Cast' : 'Upvote'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* ==================== ADMINISTRATIVE WORKSPACE PANE ==================== */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            {/* Dynamic class provision builders */}
            <div className="bg-[#12131a] border border-[#232430] p-5 rounded-xl space-y-4">
              <h3 className="text-gray-100 font-bold text-sm">Deploy Academy Masterclass</h3>

              <form onSubmit={handleAddCourseAdmin} className="space-y-4 text-xs">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-500 block mb-1">Class Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Masterclass in Riyadh Arriadh Settings"
                    value={adminCourseTitle}
                    onChange={(e) => setAdminCourseTitle(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-200 rounded p-2 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-gray-500 block mb-1">Primary Instructor</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Christopher Nolan"
                      value={adminCourseInstructor}
                      onChange={(e) => setAdminCourseInstructor(e.target.value)}
                      className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-200 rounded p-2 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-gray-500 block mb-1">Specialty Division</label>
                    <select
                      value={adminCourseCategory}
                      onChange={(e) => setAdminCourseCategory(e.target.value)}
                      className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-300 rounded p-2 outline-none"
                    >
                      <option value="Directology">Directology & Framing</option>
                      <option value="Acting Mastery">Acting Masterclass</option>
                      <option value="Dialogue Writing">Dialogue Writing</option>
                      <option value="Cinematography">Cinematography</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-500 block mb-1">Syllabus Overview Synopsis</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly state curriculum guidelines..."
                    value={adminCourseDesc}
                    onChange={(e) => setAdminCourseDesc(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-200 rounded p-2 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 text-slate-950 font-bold py-2 rounded transition hover:bg-amber-600 cursor-pointer"
                >
                  Publish class to database tree
                </button>
              </form>
            </div>

            {/* Test accounts control widget */}
            <div className="bg-[#12131a] border border-[#232430] p-5 rounded-xl space-y-4">
              <h3 className="text-gray-100 font-bold text-xs uppercase tracking-widest text-[#bf9951]">Verified Role Switchboard</h3>
              <p className="text-[11px] text-gray-400">Control active user personas parameters instantly for evaluation simulations.</p>

              <div className="space-y-3">
                {profiles.map(p => (
                  <div key={p.id} className="bg-[#0b0c10] p-3 rounded border border-[#232430] flex justify-between items-center text-xs">
                    <div>
                      <strong className="text-gray-200 block">{p.name}</strong>
                      <span className="text-gray-500 text-[10px]">Active role: {p.role}</span>
                    </div>

                    <select
                      value={p.role}
                      onChange={(e) => handleUpdateTestProfileRole(p.id, e.target.value)}
                      className="bg-[#12131a] border border-[#1d1f2b] text-[11px] text-amber-500 rounded p-1 outline-none font-bold"
                    >
                      <option value="Actor">Actor</option>
                      <option value="Director">Director</option>
                      <option value="Writer">Writer</option>
                      <option value="Crew">Crew member</option>
                      <option value="Company">Company / Agency</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social flags moderation dashboard- Right */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Community Moderation Queue & Flag logs
            </h3>

            {moderationPosts.length === 0 ? (
              <div className="bg-[#12131a] p-8 text-center text-gray-500 rounded-xl">
                <CheckSquare className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs">Congratulations! All flagged reports are resolved.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {moderationPosts.map(flag => (
                  <div key={flag.id} className="bg-[#12131a] border border-rose-500/20 p-4 rounded-xl space-y-3">
                    <div className="flex justify-between items-center bg-[#0b0c10] p-2 rounded">
                      <span className="text-[10px] text-rose-400 font-bold font-mono">⚠️ Issue: {flag.flagReason}</span>
                      <span className="text-gray-400 text-[10px]">Reporter ID: sys_bot_45</span>
                    </div>

                    <div className="text-xs pl-2 border-l border-gray-700">
                      <strong className="text-gray-200 block mb-1">Author: {flag.author} ({flag.role})</strong>
                      <p className="text-gray-400 italic">"{flag.text}"</p>
                    </div>

                    <div className="flex justify-end gap-2 text-xs pt-1 border-t border-[#1e1f2b]">
                      <button
                        onClick={() => {
                          setModerationPosts(moderationPosts.filter(m => m.id !== flag.id));
                          alert('Report dismissed! Content marked safe.');
                        }}
                        className="bg-gray-800 text-gray-300 text-[10px] font-semibold px-3 py-1 rounded cursor-pointer"
                      >
                        Dismiss Flag
                      </button>
                      <button
                        onClick={() => {
                          setModerationPosts(moderationPosts.filter(m => m.id !== flag.id));
                          alert('Account Warned successfully! Offending text expunged.');
                        }}
                        className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-semibold px-3 py-1 rounded cursor-pointer"
                      >
                        Delete Post & Warn User
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
