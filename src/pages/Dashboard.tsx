import { StatCard } from '@/components/dashboard/StatCard';
import { MoodChart } from '@/components/dashboard/MoodChart';
import { RecentEntries } from '@/components/dashboard/RecentEntries';
import { Flame, BookOpen, TrendingUp, Calendar } from 'lucide-react';
import { JournalEntry } from '@/types/journal';
import { format } from 'date-fns';

// Sample data for demonstration
const sampleEntries: JournalEntry[] = [
  {
    id: '1',
    date: '2025-12-16',
    title: 'A productive Monday',
    content: 'Today was incredibly productive. I managed to complete all my coursework assignments and even had time for some reading. The weather was perfect for a short walk during lunch break. I feel grateful for the progress I made today.',
    primaryMood: { id: 'happy', name: 'Happy', emoji: '😊', category: 'positive' },
    secondaryMoods: [{ id: 'grateful', name: 'Grateful', emoji: '🙏', category: 'positive' }],
    tags: [
      { id: 'studies', name: 'Studies', isCustom: false },
      { id: 'personal-growth', name: 'Personal Growth', isCustom: false },
    ],
    wordCount: 156,
    createdAt: '2025-12-16T09:30:00Z',
    updatedAt: '2025-12-16T18:45:00Z',
  },
  {
    id: '2',
    date: '2025-12-15',
    title: 'Sunday reflections',
    content: 'Spent most of the day reflecting on the past week. Had a wonderful video call with family. Feeling nostalgic about the upcoming holidays and all the memories we have made together over the years.',
    primaryMood: { id: 'nostalgic', name: 'Nostalgic', emoji: '💭', category: 'neutral' },
    secondaryMoods: [{ id: 'calm', name: 'Calm', emoji: '😐', category: 'neutral' }],
    tags: [
      { id: 'family', name: 'Family', isCustom: false },
      { id: 'self-care', name: 'Self-care', isCustom: false },
    ],
    wordCount: 98,
    createdAt: '2025-12-15T20:00:00Z',
    updatedAt: '2025-12-15T20:00:00Z',
  },
  {
    id: '3',
    date: '2025-12-14',
    title: 'Challenging but rewarding',
    content: 'Faced some challenges with my project today. Had to debug for hours, but finally figured it out. The sense of accomplishment when the code finally worked was amazing. Learning to embrace challenges as opportunities.',
    primaryMood: { id: 'confident', name: 'Confident', emoji: '💪', category: 'positive' },
    secondaryMoods: [],
    tags: [
      { id: 'work', name: 'Work', isCustom: false },
      { id: 'studies', name: 'Studies', isCustom: false },
    ],
    wordCount: 124,
    createdAt: '2025-12-14T22:15:00Z',
    updatedAt: '2025-12-14T22:15:00Z',
  },
];

const moodDistribution = {
  positive: 65,
  neutral: 25,
  negative: 10,
};

export default function Dashboard() {
  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground">
          Welcome back
        </h1>
        <p className="text-muted-foreground mt-2">
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Current Streak"
          value="7"
          subtitle="days"
          icon={Flame}
          trend={{ value: 40, positive: true }}
        />
        <StatCard
          title="Total Entries"
          value="23"
          subtitle="journal entries"
          icon={BookOpen}
        />
        <StatCard
          title="Longest Streak"
          value="14"
          subtitle="days"
          icon={TrendingUp}
        />
        <StatCard
          title="This Month"
          value="12"
          subtitle="entries in December"
          icon={Calendar}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mood Distribution */}
        <div className="journal-card lg:col-span-1">
          <h2 className="text-lg font-serif font-semibold mb-4">Mood Distribution</h2>
          <MoodChart data={moodDistribution} />
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Most Frequent</span>
              <span className="font-medium flex items-center gap-1.5">
                <span>😊</span> Happy
              </span>
            </div>
          </div>
        </div>

        {/* Recent Entries */}
        <div className="journal-card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-serif font-semibold">Recent Entries</h2>
            <a href="/entries" className="text-sm text-accent hover:underline">
              View all
            </a>
          </div>
          <RecentEntries entries={sampleEntries} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 journal-card bg-primary/5 border-primary/20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-serif font-semibold text-lg">
              Ready to write today's entry?
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              Capture your thoughts, track your mood, and reflect on your day.
            </p>
          </div>
          <a
            href="/entry"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md h-11 px-8 transition-all duration-200"
          >
            <BookOpen className="h-4 w-4" />
            New Entry
          </a>
        </div>
      </div>
    </div>
  );
}
