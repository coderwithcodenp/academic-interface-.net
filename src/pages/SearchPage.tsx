import { useState } from 'react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Search, Calendar as CalendarIcon, X } from 'lucide-react';

// Sample search results
const sampleResults = [
  {
    id: '1',
    date: '2025-12-16',
    title: 'A productive Monday',
    excerpt: '...managed to complete all my coursework assignments and even had time for some reading...',
    mood: '😊',
  },
  {
    id: '3',
    date: '2025-12-14',
    title: 'Challenging but rewarding',
    excerpt: '...Faced some challenges with my project today. Had to debug for hours...',
    mood: '💪',
  },
  {
    id: '5',
    date: '2025-12-12',
    title: 'Exciting news!',
    excerpt: '...Received great feedback on my project proposal today...',
    mood: '🤩',
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (query.trim()) {
      setHasSearched(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setQuery('');
    setDateFrom(undefined);
    setDateTo(undefined);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground">
          Search
        </h1>
        <p className="text-muted-foreground mt-2">
          Find entries by content, title, or date range
        </p>
      </header>

      {/* Search Form */}
      <div className="journal-card mb-8">
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search entries by title or content..."
              className="pl-11 h-12 text-base"
            />
          </div>

          {/* Date Range */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                From Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !dateFrom && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, 'PPP') : 'Select start date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                To Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !dateTo && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, 'PPP') : 'Select end date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" onClick={clearFilters} size="sm">
              <X className="h-4 w-4 mr-1" />
              Clear filters
            </Button>
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      {hasSearched && (
        <div className="space-y-4 animate-fade-in">
          <p className="text-sm text-muted-foreground">
            Found {sampleResults.length} results for "{query}"
          </p>

          {sampleResults.map((result, index) => (
            <article
              key={result.id}
              className="journal-card cursor-pointer hover:border-primary/30 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{result.mood}</span>
                <div className="flex-1">
                  <h3 className="font-serif font-semibold">{result.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(result.date), 'MMMM d, yyyy')}
                  </p>
                  <p className="mt-2 text-muted-foreground">{result.excerpt}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Initial State */}
      {!hasSearched && (
        <div className="text-center py-16">
          <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">
            Enter a search term to find your journal entries
          </p>
        </div>
      )}
    </div>
  );
}
