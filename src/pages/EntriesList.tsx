import { useState } from 'react';
import { format } from 'date-fns';
import { JournalEntry } from '@/types/journal';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample entries for demonstration
const allEntries: JournalEntry[] = [
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
  {
    id: '4',
    date: '2025-12-13',
    title: 'Stressful deadlines',
    content: 'Multiple deadlines approaching. Feeling the pressure but trying to stay focused. Made a priority list and tackled tasks one by one. Need to remember to take breaks and not burn out.',
    primaryMood: { id: 'stressed', name: 'Stressed', emoji: '😰', category: 'negative' },
    secondaryMoods: [{ id: 'anxious', name: 'Anxious', emoji: '😟', category: 'negative' }],
    tags: [
      { id: 'work', name: 'Work', isCustom: false },
      { id: 'health', name: 'Health', isCustom: false },
    ],
    wordCount: 87,
    createdAt: '2025-12-13T23:00:00Z',
    updatedAt: '2025-12-13T23:00:00Z',
  },
  {
    id: '5',
    date: '2025-12-12',
    title: 'Exciting news!',
    content: 'Received great feedback on my project proposal today! The professor was impressed with my approach and offered helpful suggestions for improvement. Feeling motivated to continue working hard.',
    primaryMood: { id: 'excited', name: 'Excited', emoji: '🤩', category: 'positive' },
    secondaryMoods: [{ id: 'confident', name: 'Confident', emoji: '💪', category: 'positive' }],
    tags: [
      { id: 'studies', name: 'Studies', isCustom: false },
      { id: 'career', name: 'Career', isCustom: false },
    ],
    wordCount: 112,
    createdAt: '2025-12-12T17:30:00Z',
    updatedAt: '2025-12-12T17:30:00Z',
  },
];

const ITEMS_PER_PAGE = 5;

export default function EntriesList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [moodFilter, setMoodFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter entries
  const filteredEntries = allEntries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMood =
      moodFilter === 'all' || entry.primaryMood.category === moodFilter;
    return matchesSearch && matchesMood;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEntries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEntries = filteredEntries.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground">
          Journal Entries
        </h1>
        <p className="text-muted-foreground mt-2">
          Browse and search through all your journal entries
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search entries..."
            className="pl-10"
          />
        </div>
        <Select
          value={moodFilter}
          onValueChange={(value) => {
            setMoodFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by mood" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Moods</SelectItem>
            <SelectItem value="positive">😊 Positive</SelectItem>
            <SelectItem value="neutral">😐 Neutral</SelectItem>
            <SelectItem value="negative">😔 Negative</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground mb-4">
        Showing {paginatedEntries.length} of {filteredEntries.length} entries
      </p>

      {/* Entries List */}
      <div className="space-y-4">
        {paginatedEntries.map((entry, index) => (
          <article
            key={entry.id}
            className={cn(
              'journal-card cursor-pointer hover:border-primary/30 transition-all duration-200',
              'animate-slide-up'
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start gap-4">
              {/* Mood Indicator */}
              <div
                className={cn(
                  'shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-2xl',
                  entry.primaryMood.category === 'positive' && 'bg-mood-positive/15',
                  entry.primaryMood.category === 'neutral' && 'bg-mood-neutral/15',
                  entry.primaryMood.category === 'negative' && 'bg-mood-negative/15'
                )}
              >
                {entry.primaryMood.emoji}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif font-semibold text-lg">{entry.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(entry.date), 'EEEE, MMMM d, yyyy')}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium">{entry.wordCount} words</p>
                  </div>
                </div>

                <p className="mt-3 text-muted-foreground line-clamp-2">
                  {entry.content}
                </p>

                {/* Tags & Secondary Moods */}
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  {entry.secondaryMoods.map((mood) => (
                    <span
                      key={mood.id}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-secondary"
                    >
                      {mood.emoji} {mood.name}
                    </span>
                  ))}
                  {entry.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Empty State */}
      {paginatedEntries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No entries found</p>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-8 h-8"
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
