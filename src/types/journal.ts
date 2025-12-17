export type MoodCategory = 'positive' | 'neutral' | 'negative';

export interface Mood {
  id: string;
  name: string;
  emoji: string;
  category: MoodCategory;
}

export interface Tag {
  id: string;
  name: string;
  isCustom: boolean;
}

export interface JournalEntry {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  title: string;
  content: string;
  primaryMood: Mood;
  secondaryMoods: Mood[];
  tags: Tag[];
  wordCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  missedDays: string[];
  totalEntries: number;
}

export interface MoodDistribution {
  positive: number;
  neutral: number;
  negative: number;
}

export interface Analytics {
  moodDistribution: MoodDistribution;
  mostFrequentMood: Mood | null;
  streakData: StreakData;
  tagUsage: { tag: string; count: number }[];
  averageWordCount: number;
}
