import React, { useState } from 'react';
import { Profile } from '../types';
import { Sparkles, Edit, Star, ShieldCheck, User, Hammer, FileText, CheckCircle } from 'lucide-react';

interface UserProfileModalProps {
  currentProfile: Profile;
  onUpdateProfile: (updated: Profile) => void;
  onClose: () => void;
}

export default function UserProfileModal({
  currentProfile,
  onUpdateProfile,
  onClose
}: UserProfileModalProps) {
  const [name, setName] = useState(currentProfile.name);
  const [bio, setBio] = useState(currentProfile.bio);
  const [experienceYears, setExperienceYears] = useState(currentProfile.experienceYears);
  const [crewSpecialty, setCrewSpecialty] = useState(currentProfile.crewSpecialty || '');
  const [skillsText, setSkillsText] = useState(currentProfile.skills.join(', '));
  const [avatar, setAvatar] = useState(currentProfile.avatar);
  const [languageAr, setLanguageAr] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const skillsArray = skillsText
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const updated: Profile = {
      ...currentProfile,
      name,
      bio,
      experienceYears: Number(experienceYears) || 0,
      crewSpecialty: crewSpecialty ? crewSpecialty : undefined,
      skills: skillsArray,
      avatar
    };

    onUpdateProfile(updated);
    alert('Professional portfolio credentials updated successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-[#12131a] border border-[#2c2d3c] rounded-xl p-6 max-w-xl w-full shadow-2xl relative my-8 text-xs animate-fadeIn">
        <span
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 text-xl font-bold cursor-pointer"
        >
          &times;
        </span>

        <h3 className="text-gray-100 text-base font-bold mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-amber-500" />
          Edit Professional Portfolio & Reputation Logs
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">Full Legal Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 p-2.5 rounded focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">Avatar Image Url</label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 p-2.5 rounded focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">Industry Experience Years</label>
              <input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 p-2.5 rounded focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">Crew Specialty Sub-division</label>
              <input
                type="text"
                placeholder="e.g. Dialect Coach, CGI Lighting, Steadicam Op"
                value={crewSpecialty}
                onChange={(e) => setCrewSpecialty(e.target.value)}
                className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 p-2.5 rounded focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">Skill Hashtags (split by comma)</label>
            <input
              type="text"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              className="w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 p-2.5 rounded focus:outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Bilingual Professional Biography</label>
              <button
                type="button"
                onClick={() => setLanguageAr(!languageAr)}
                className="text-amber-500 hover:text-amber-400 text-[10px] font-bold"
              >
                {languageAr ? 'Preview En layout' : 'Preview Ar layout'}
              </button>
            </div>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={`w-full bg-[#0a0a0f] border border-[#232430] text-gray-100 p-2.5 rounded focus:outline-none font-sans leading-relaxed ${languageAr ? 'text-right font-sans' : 'text-left'}`}
              placeholder="Describe your film school accolades, acting techniques, software sets, or script rights."
            ></textarea>
          </div>

          {/* Social peer-reviewed reviews */}
          <div className="pt-2 border-t border-[#1e1f2b] space-y-2">
            <h4 className="text-gray-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-500" />
              Verified Industry Reviews ({currentProfile.reviews?.length || 0})
            </h4>

            {currentProfile.reviews && currentProfile.reviews.length > 0 ? (
              <div className="space-y-2 max-h-36 overflow-y-auto">
                {currentProfile.reviews.map(rev => (
                  <div key={rev.id} className="bg-[#0b0c10] border border-[#20212f]/80 p-2 rounded text-[11px]">
                    <div className="flex justify-between items-center mb-1">
                      <strong className="text-amber-500 font-bold">{rev.reviewerName}</strong>
                      <div className="flex text-amber-400 text-[10px]">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic text-[11px]">No peer reviews registered under this account ledger yet.</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-[#1e1f2b]">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#232430] text-gray-300 text-xs px-4 py-2 rounded font-semibold hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-amber-500 text-slate-950 hover:bg-amber-600 text-xs px-5 py-2 rounded font-bold transition shadow-lg shadow-amber-500/15"
            >
              Update Credentials Ledger
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
