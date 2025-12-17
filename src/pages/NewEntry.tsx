import { useState } from 'react';
import { format } from 'date-fns';
import { Mood, Tag } from '@/types/journal';
import { MoodSelector } from '@/components/journal/MoodSelector';
import { TagSelector } from '@/components/journal/TagSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function NewEntry() {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [primaryMood, setPrimaryMood] = useState<Mood | null>(null);
  const [secondaryMoods, setSecondaryMoods] = useState<Mood[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const today = new Date();

  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: 'Title required',
        description: 'Please enter a title for your journal entry.',
        variant: 'destructive',
      });
      return;
    }

    if (!primaryMood) {
      toast({
        title: 'Mood required',
        description: 'Please select a primary mood for your entry.',
        variant: 'destructive',
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: 'Content required',
        description: 'Please write something in your journal entry.',
        variant: 'destructive',
      });
      return;
    }

    // Save entry (would connect to database in production)
    toast({
      title: 'Entry saved',
      description: 'Your journal entry has been saved successfully.',
    });
  };

  const handleClear = () => {
    setTitle('');
    setContent('');
    setPrimaryMood(null);
    setSecondaryMoods([]);
    setSelectedTags([]);
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 text-muted-foreground mb-2">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">{format(today, 'EEEE, MMMM d, yyyy')}</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground">
          Today's Entry
        </h1>
      </header>

      {/* Entry Form */}
      <div className="space-y-8">
        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-muted-foreground">
            Title <span className="text-destructive">*</span>
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your entry a title..."
            className="text-lg font-serif"
          />
        </div>

        {/* Mood Selection */}
        <div className="journal-card">
          <h2 className="text-lg font-serif font-semibold mb-4">How are you feeling?</h2>
          <MoodSelector
            selectedPrimary={primaryMood}
            selectedSecondary={secondaryMoods}
            onPrimaryChange={setPrimaryMood}
            onSecondaryChange={setSecondaryMoods}
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="content" className="text-sm font-medium text-muted-foreground">
              Journal Entry <span className="text-destructive">*</span>
            </label>
            <span className="text-sm text-muted-foreground">{wordCount} words</span>
          </div>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write about your day, thoughts, experiences..."
            className="min-h-[300px] resize-none font-sans leading-relaxed"
          />
          <p className="text-xs text-muted-foreground">
            Tip: You can use Markdown formatting like **bold**, *italic*, and - lists
          </p>
        </div>

        {/* Tags */}
        <div className="journal-card">
          <TagSelector
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button variant="outline" onClick={handleClear}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Entry
          </Button>
        </div>
      </div>
    </div>
  );
}
