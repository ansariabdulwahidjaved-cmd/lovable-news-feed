import { Link } from "@tanstack/react-router";
import type { Article } from "@/api/types";
import { formatDate } from "./HeroNewsCard";

export function SmallNewsCard({ article }: { article: Article }) {
  return (
    <Link
      to="/article/$slug"
      params={{ slug: article.slug }}
      className="group flex gap-3"
    >
      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-muted">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">
          {article.category}
        </p>
        <h4 className="mt-1 text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h4>
        <p className="mt-1 text-xs text-muted-foreground">{formatDate(article.publishedAt)}</p>
      </div>
    </Link>
  );
}
