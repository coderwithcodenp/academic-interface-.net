import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { format, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample entries for demonstration
const entriesMap: Record<string, { mood: string; emoji: string }> = {
  '2025-12-16': { mood: 'positive', emoji: '😊' },
  '2025-12-15': { mood: 'neutral', emoji: '💭' },
  '2025-12-14': { mood: 'positive', emoji: '💪' },
  '2025-12-13': { mood: 'negative', emoji: '😰' },
  '2025-12-12': { mood: 'positive', emoji: '🤩' },
  '2025-12-11': { mood: 'neutral', emoji: '😐' },
  '2025-12-10': { mood: 'positive', emoji: '😌' },
};

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const selectedEntry = selectedDate
    ? entriesMap[format(selectedDate, 'yyyy-MM-dd')]
    : null;

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground">
          Calendar
        </h1>
        <p className="text-muted-foreground mt-2">
          Navigate through your journal entries by date
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="journal-card p-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="pointer-events-auto w-full"
              classNames={{
                months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                month: 'space-y-4 w-full',
                caption: 'flex justify-center pt-1 relative items-center',
                caption_label: 'text-lg font-serif font-semibold',
                nav: 'space-x-1 flex items-center',
                nav_button: cn(
                  'h-9 w-9 bg-transparent p-0 opacity-70 hover:opacity-100 inline-flex items-center justify-center rounded-lg border border-input hover:bg-accent hover:text-accent-foreground'
                ),
                nav_button_previous: 'absolute left-1',
                nav_button_next: 'absolute right-1',
                table: 'w-full border-collapse space-y-1',
                head_row: 'flex w-full',
                head_cell:
                  'text-muted-foreground rounded-md w-full font-medium text-xs uppercase',
                row: 'flex w-full mt-2',
                cell: cn(
                  'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 w-full',
                  '[&:has([aria-selected])]:bg-accent [&:has([aria-selected])]:rounded-lg'
                ),
                day: cn(
                  'h-12 w-full p-0 font-normal flex flex-col items-center justify-center rounded-lg transition-colors',
                  'hover:bg-accent hover:text-accent-foreground',
                  'focus:bg-accent focus:text-accent-foreground focus:outline-none'
                ),
                day_selected:
                  'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                day_today: 'bg-secondary text-secondary-foreground font-semibold',
                day_outside: 'text-muted-foreground opacity-50',
                day_disabled: 'text-muted-foreground opacity-50',
                day_hidden: 'invisible',
              }}
              components={{
                IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                IconRight: () => <ChevronRight className="h-4 w-4" />,
                DayContent: ({ date }) => {
                  const dateStr = format(date, 'yyyy-MM-dd');
                  const entry = entriesMap[dateStr];
                  return (
                    <div className="flex flex-col items-center">
                      <span>{date.getDate()}</span>
                      {entry && (
                        <span className="text-xs mt-0.5">{entry.emoji}</span>
                      )}
                    </div>
                  );
                },
              }}
            />

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-sm font-medium mb-3">Mood Legend</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-mood-positive" />
                  <span className="text-sm text-muted-foreground">Positive</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-mood-neutral" />
                  <span className="text-sm text-muted-foreground">Neutral</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-mood-negative" />
                  <span className="text-sm text-muted-foreground">Negative</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Day Preview */}
        <div className="lg:col-span-1">
          <div className="journal-card sticky top-6">
            <h2 className="text-lg font-serif font-semibold mb-4">
              {selectedDate
                ? format(selectedDate, 'MMMM d, yyyy')
                : 'Select a date'}
            </h2>

            {selectedEntry ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                  <span className="text-2xl">{selectedEntry.emoji}</span>
                  <div>
                    <p className="text-sm text-muted-foreground">Mood</p>
                    <p className="font-medium capitalize">{selectedEntry.mood}</p>
                  </div>
                </div>
                <Button className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Entry
                </Button>
              </div>
            ) : selectedDate && isSameDay(selectedDate, new Date()) ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No entry for today yet</p>
                <Button asChild>
                  <a href="/entry">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Create Entry
                  </a>
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No entry for this date</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
