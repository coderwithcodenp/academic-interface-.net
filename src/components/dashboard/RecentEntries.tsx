import { JournalEntry } from '@/types/journal';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface RecentEntriesProps {
  entries: JournalEntry[];
}

export function RecentEntries({ entries }: RecentEntriesProps) {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">No entries yet</p>
        <p className="text-sm text-muted-foreground mt-1">Start journaling to see your entries here</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {entries.map((entry, index) => (
        <div
          key={entry.id}
          className={cn(
            'p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors cursor-pointer',
            'animate-slide-up'
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-lg">{entry.primaryMood.emoji}</span>
                <h4 className="font-medium truncate">{entry.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {entry.content.replace(/[#*_~`]/g, '').substring(0, 120)}...
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-medium">
                {format(new Date(entry.date), 'MMM d')}
              </p>
              <p className="text-xs text-muted-foreground">
                {entry.wordCount} words
              </p>
            </div>
          </div>
          {entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {entry.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground"
                >
                  {tag.name}
                </span>
              ))}
              {entry.tags.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{entry.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
