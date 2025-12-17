import { useState } from 'react';
import { Mood, MoodCategory } from '@/types/journal';
import { getMoodsByCategory } from '@/data/moods';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MoodSelectorProps {
  selectedPrimary: Mood | null;
  selectedSecondary: Mood[];
  onPrimaryChange: (mood: Mood) => void;
  onSecondaryChange: (moods: Mood[]) => void;
}

export function MoodSelector({
  selectedPrimary,
  selectedSecondary,
  onPrimaryChange,
  onSecondaryChange,
}: MoodSelectorProps) {
  const [activeTab, setActiveTab] = useState<MoodCategory>('positive');

  const handleSecondaryToggle = (mood: Mood) => {
    if (mood.id === selectedPrimary?.id) return;
    
    const isSelected = selectedSecondary.some((m) => m.id === mood.id);
    if (isSelected) {
      onSecondaryChange(selectedSecondary.filter((m) => m.id !== mood.id));
    } else if (selectedSecondary.length < 2) {
      onSecondaryChange([...selectedSecondary, mood]);
    }
  };

  const categories: { key: MoodCategory; label: string; emoji: string }[] = [
    { key: 'positive', label: 'Positive', emoji: '😊' },
    { key: 'neutral', label: 'Neutral', emoji: '😐' },
    { key: 'negative', label: 'Negative', emoji: '😔' },
  ];

  return (
    <div className="space-y-6">
      {/* Primary Mood */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Primary Mood <span className="text-destructive">*</span>
        </h3>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as MoodCategory)}>
          <TabsList className="w-full">
            {categories.map((cat) => (
              <TabsTrigger key={cat.key} value={cat.key} className="flex-1">
                <span className="mr-1.5">{cat.emoji}</span>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((cat) => (
            <TabsContent key={cat.key} value={cat.key} className="mt-3">
              <div className="grid grid-cols-5 gap-2">
                {getMoodsByCategory(cat.key).map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => onPrimaryChange(mood)}
                    className={cn(
                      'flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-150',
                      selectedPrimary?.id === mood.id
                        ? 'border-primary bg-primary/5'
                        : 'border-transparent bg-secondary hover:border-border'
                    )}
                  >
                    <span className="text-2xl">{mood.emoji}</span>
                    <span className="text-xs mt-1.5 text-muted-foreground">{mood.name}</span>
                  </button>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Secondary Moods */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Secondary Moods <span className="text-xs font-normal">(optional, up to 2)</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {selectedPrimary && getMoodsByCategory(selectedPrimary.category)
            .filter((m) => m.id !== selectedPrimary.id)
            .map((mood) => {
              const isSelected = selectedSecondary.some((m) => m.id === mood.id);
              const isDisabled = !isSelected && selectedSecondary.length >= 2;
              return (
                <button
                  key={mood.id}
                  onClick={() => handleSecondaryToggle(mood)}
                  disabled={isDisabled}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-150',
                    isSelected
                      ? 'border-primary bg-primary/10 text-primary'
                      : isDisabled
                      ? 'border-border bg-muted text-muted-foreground opacity-50 cursor-not-allowed'
                      : 'border-border bg-secondary hover:border-primary/50'
                  )}
                >
                  <span>{mood.emoji}</span>
                  <span className="text-sm">{mood.name}</span>
                </button>
              );
            })}
          {!selectedPrimary && (
            <p className="text-sm text-muted-foreground italic">
              Select a primary mood first
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
