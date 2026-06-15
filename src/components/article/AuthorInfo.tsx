import type { Article } from "@/api/types";

export function AuthorInfo({ article }: { article: Article }) {
  const initials = article.author
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="my-8 flex items-center gap-4 rounded-xl border border-border bg-muted/30 p-5">
      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
        {initials}
      </div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Written by</p>
        <p className="font-semibold">{article.author}</p>
        <p className="text-sm text-muted-foreground">
          Senior {article.category} correspondent at NewsHub.
        </p>
      </div>
    </div>
  );
}
