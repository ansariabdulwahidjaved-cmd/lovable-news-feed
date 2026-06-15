import { Bookmark, BookmarkCheck } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  articleId: string;
  variant?: "icon" | "full";
  className?: string;
}

export function BookmarkButton({ articleId, variant = "icon", className }: BookmarkButtonProps) {
  const { has, toggle } = useBookmarks();
  const active = has(articleId);

  if (variant === "full") {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle(articleId);
        }}
        className={cn(
          "inline-flex items-center gap-2 rounded-md border border-border px-3 h-9 text-sm font-medium transition-colors",
          active
            ? "bg-primary text-primary-foreground border-primary"
            : "hover:bg-secondary",
          className,
        )}
      >
        {active ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        {active ? "Bookmarked" : "Bookmark"}
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(articleId);
      }}
      aria-label={active ? "Remove bookmark" : "Add bookmark"}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md bg-background/90 backdrop-blur transition-colors hover:bg-background",
        active ? "text-primary" : "text-foreground/70",
        className,
      )}
    >
      {active ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
    </button>
  );
}
