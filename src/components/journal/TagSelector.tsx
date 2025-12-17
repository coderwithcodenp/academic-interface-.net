import { useState } from 'react';
import { Tag } from '@/types/journal';
import { PREBUILT_TAGS } from '@/data/tags';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

interface TagSelectorProps {
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
}

export function TagSelector({ selectedTags, onTagsChange }: TagSelectorProps) {
  const [customTagInput, setCustomTagInput] = useState('');

  const handleTagToggle = (tag: Tag) => {
    const isSelected = selectedTags.some((t) => t.id === tag.id);
    if (isSelected) {
      onTagsChange(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleAddCustomTag = () => {
    if (customTagInput.trim()) {
      const newTag: Tag = {
        id: `custom-${Date.now()}`,
        name: customTagInput.trim(),
        isCustom: true,
      };
      onTagsChange([...selectedTags, newTag]);
      setCustomTagInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomTag();
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground">
        Tags <span className="text-xs font-normal">(optional)</span>
      </h3>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm"
            >
              {tag.name}
              <button
                onClick={() => handleTagToggle(tag)}
                className="hover:bg-primary-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Custom Tag Input */}
      <div className="flex gap-2">
        <Input
          value={customTagInput}
          onChange={(e) => setCustomTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add custom tag..."
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleAddCustomTag}
          disabled={!customTagInput.trim()}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Prebuilt Tags */}
      <div className="flex flex-wrap gap-2">
        {PREBUILT_TAGS.filter(
          (tag) => !selectedTags.some((t) => t.id === tag.id)
        ).map((tag) => (
          <button
            key={tag.id}
            onClick={() => handleTagToggle(tag)}
            className={cn(
              'px-3 py-1 rounded-full border text-sm transition-all duration-150',
              'border-border bg-secondary hover:border-primary/50 hover:bg-primary/5'
            )}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
}
