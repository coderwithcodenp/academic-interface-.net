import { Mood } from '@/types/journal';

export const MOODS: Mood[] = [
  // Positive
  { id: 'happy', name: 'Happy', emoji: '😊', category: 'positive' },
  { id: 'excited', name: 'Excited', emoji: '🤩', category: 'positive' },
  { id: 'relaxed', name: 'Relaxed', emoji: '😌', category: 'positive' },
  { id: 'grateful', name: 'Grateful', emoji: '🙏', category: 'positive' },
  { id: 'confident', name: 'Confident', emoji: '💪', category: 'positive' },
  
  // Neutral
  { id: 'calm', name: 'Calm', emoji: '😐', category: 'neutral' },
  { id: 'thoughtful', name: 'Thoughtful', emoji: '🤔', category: 'neutral' },
  { id: 'curious', name: 'Curious', emoji: '🧐', category: 'neutral' },
  { id: 'nostalgic', name: 'Nostalgic', emoji: '💭', category: 'neutral' },
  { id: 'bored', name: 'Bored', emoji: '😑', category: 'neutral' },
  
  // Negative
  { id: 'sad', name: 'Sad', emoji: '😢', category: 'negative' },
  { id: 'angry', name: 'Angry', emoji: '😠', category: 'negative' },
  { id: 'stressed', name: 'Stressed', emoji: '😰', category: 'negative' },
  { id: 'lonely', name: 'Lonely', emoji: '😔', category: 'negative' },
  { id: 'anxious', name: 'Anxious', emoji: '😟', category: 'negative' },
];

export const getMoodsByCategory = (category: 'positive' | 'neutral' | 'negative') => {
  return MOODS.filter(mood => mood.category === category);
};
