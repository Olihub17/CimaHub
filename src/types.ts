/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// User Roles
export type UserRole = 
  | 'Actor' 
  | 'Director' 
  | 'Writer' 
  | 'Producer' 
  | 'Crew' 
  | 'Company';

// Sub-roles for Crew members
export type CrewSpecialty = 
  | 'Cinematographer' 
  | 'Editor' 
  | 'Sound Engineer' 
  | 'Makeup Artist' 
  | 'Costume Designer' 
  | 'Production Manager'
  | 'Casting Director';

// User Profile
export interface Profile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  crewSpecialty?: CrewSpecialty;
  avatar: string;
  coverImage: string;
  bio: string;
  bioAr?: string; // Arabic biography
  skills: string[];
  experienceYears: number;
  education: string[];
  certifications: string[];
  languages: string[];
  portfolioUrls: { title: string; url: string }[];
  videos: { title: string; url: string }[];
  awards: string[];
  socialLinks: { platform: string; url: string }[];
  reputationScore: number; // 1-5 scale
  reviewsCount: number;
  isPremium: boolean;
  isVerified: boolean;
  connections: string[]; // List of profile IDs
  following: string[];   // List of profile IDs
  reviews?: { id: string; reviewerName: string; rating: number; comment: string }[];
}

// Portfolio review item
export interface ProfileReview {
  id: string;
  fromProfileId: string;
  fromName: string;
  fromRole: string;
  rating: number;
  comment: string;
  date: string;
  categoryScores?: {
    professionalism: number;
    communication: number;
    reliability: number;
    quality: number;
    collaboration: number;
  };
}

// Social Feed Post
export interface FeedPost {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  content: string;
  mediaUrl?: string; // Optional image or video link
  mediaType?: 'image' | 'video';
  likes: string[]; // list of profile IDs who liked
  comments: {
    id: string;
    authorName: string;
    authorAvatar: string;
    content: string;
    timestamp: string;
  }[];
  sharesCount: number;
  timestamp: string;
  tags?: string[];
  isPinned?: boolean;
}

// Casting / Job Opportunity
export interface CastingOpportunity {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  roleType: UserRole; // Actor, Crew, Writer, etc.
  crewSpecialty?: CrewSpecialty;
  projectType: 'Feature Film' | 'TV Series' | 'Commercial' | 'Documentary' | 'Short Film' | 'Theater';
  location: string;
  paymentType: 'Paid' | 'Unpaid' | 'Profit Share' | 'Expenses Only';
  salary?: string;
  description: string;
  requirements: string[];
  deadline: string;
  matchScore?: number; // AI match score on client-side
  matchOverview?: string; // AI Match breakdown
  applicants: {
    profileId: string;
    name: string;
    role: UserRole;
    avatar: string;
    appliedDate: string;
    status: 'Pending' | 'Shortlisted' | 'Offered' | 'Declined';
    aiMatchScore?: number;
    aiMatchFeedback?: string;
  }[];
  dateCreated: string;
}

// Lesson & Quiz for Learning Academy
export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  content: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Course {
  id: string;
  title: string;
  category: 'Acting' | 'Directing' | 'Screenwriting' | 'Cinematography' | 'Editing' | 'Sound Design' | 'Production';
  instructor: string;
  instructorTitle: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  studentsCount: number;
  lessons: Lesson[];
  quizzes: QuizQuestion[];
  isEnrolled?: boolean;
  progressPercentage?: number; // 0 to 100
  lessonsCompleted: string[]; // array of complete lessonIds
  certificateEarned?: boolean;
  coverImage: string;
  description: string;
}

// Project Collaboration workspace
export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string; // profileId
  status: 'To Do' | 'In Progress' | 'Review' | 'Done';
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface ProjectWorkflow {
  id: string;
  phase: 'Pre-Production' | 'Production' | 'Post-Production' | 'Distribution';
  status: 'Pending' | 'Active' | 'Completed';
  startDate: string;
  endDate: string;
}

export interface ProjectFile {
  name: string;
  size: string;
  uploadedBy: string;
  date: string;
  url: string;
}

export interface ProjectCollaboration {
  id: string;
  name: string;
  type: string;
  description: string;
  status: 'In Development' | 'Pre-Production' | 'Production' | 'Post-Production' | 'Released';
  coverImage: string;
  ownerId: string;
  team: {
    profileId: string;
    name: string;
    role: string;
    avatar: string;
  }[];
  tasks: ProjectTask[];
  workflows: ProjectWorkflow[];
  files: ProjectFile[];
  messages: {
    senderId: string;
    senderName: string;
    senderAvatar: string;
    content: string;
    timestamp: string;
  }[];
}

// Script Marketplace
export interface ScriptItem {
  id: string;
  title: string;
  logline: string;
  genre: string;
  pageCount: number;
  priceExclusive: number;
  priceLicense: number;
  authorId: string;
  authorName: string;
  isCopyrightProtected: boolean;
  protectHash: string; // simulated hash for blockchain/copyright log
  previewText: string;
  fullContent?: string;
  isLicensed?: boolean;
}

// Events and Festivals
export interface EventFestival {
  id: string;
  name: string;
  type: 'Festival' | 'Workshop' | 'Audition' | 'Conference' | 'Training';
  date: string;
  location: string;
  description: string;
  coverImage: string;
  organizer: string;
  isRegistered?: boolean;
  attendeesCount: number;
  ticketPrice?: string;
}

// Competitions
export type CompetitionCategory = 'Best Actor' | 'Best Screenplay' | 'Best Short Film' | 'Best Director' | 'Best Cinematographer';

export interface CompetitionSubmission {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  title: string;
  contentUrl: string; // video, script text, or video file link
  description: string;
  votes: number;
  voters: string[]; // list of profileIds who voted
  dateSubmitted: string;
}

export interface Competition {
  id: string;
  title: string;
  category: CompetitionCategory;
  description: string;
  deadline: string;
  prizePool: string;
  coverImage: string;
  submissions: CompetitionSubmission[];
  leaderboard: {
    rank: number;
    profileId: string;
    name: string;
    score: number;
    avatar: string;
    role: string;
  }[];
}
