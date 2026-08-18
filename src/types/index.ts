export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  joinDate: string;
  targetLanguage: LanguageCode;
  nativeLanguage: LanguageCode;
  dailyGoal: number; // minutes per day
}

export type LanguageCode = 'en' | 'ja' | 'ko' | 'fr' | 'es' | 'de' | 'zh';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  learners: number;
  color: string;
}

export interface CourseLevel {
  id: string;
  name: string; // A1, A2, B1, B2, C1, C2
  title: string; // Beginner, Elementary, etc.
  description: string;
  units: CourseUnit[];
  totalLessons: number;
  completedLessons: number;
  unlocked: boolean;
}

export interface CourseUnit {
  id: string;
  title: string;
  icon: string;
  lessons: Lesson[];
  completed: number;
  total: number;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'vocabulary' | 'grammar' | 'speaking' | 'listening' | 'reading' | 'review';
  duration: number; // minutes
  completed: boolean;
  locked: boolean;
  xp: number;
}

export interface Word {
  id: string;
  word: string;
  translation: string;
  pronunciation: string;
  example: string;
  exampleTranslation: string;
  image?: string;
  partOfSpeech: string;
}

export interface GrammarQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export interface ListeningQuestion {
  id: string;
  audioUrl: string;
  text: string;
  translation: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface SpeakingPrompt {
  id: string;
  prompt: string;
  targetSentence: string;
  translation: string;
  phonetic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface LearningSession {
  date: string;
  minutes: number;
  xpEarned: number;
  wordsLearned: number;
  accuracy: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number; // 0-100
  goal: number;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    level: number;
  };
  content: string;
  language: LanguageCode;
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
  liked: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  level: number;
  isUser?: boolean;
}

export interface Recommendation {
  id: string;
  type: 'lesson' | 'practice' | 'review' | 'challenge' | 'speaking' | 'vocabulary' | 'grammar' | 'listening';
  title: string;
  description: string;
  reason: string;
  duration: number;
  xp: number;
  icon: string;
  color: string;
}
