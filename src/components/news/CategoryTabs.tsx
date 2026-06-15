import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  categories: readonly string[];
  active: string;
  onChange: (cat: string) => void;
}

export function CategoryTabs({ categories, active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-border">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={cn(
            "px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors",
            active === c
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
