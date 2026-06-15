import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import type { Article } from "@/api/types";
import { Badge } from "@/components/common/Badge";
import { BookmarkButton } from "./BookmarkButton";
import { formatDate } from "./HeroNewsCard";

export function NewsCard({ article }: { article: Article }) {
  return (
    <Link
      to="/article/$slug"
      params={{ slug: article.slug }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-2 top-2">
          <BookmarkButton articleId={article.id} />
        </div>
        <div className="absolute left-3 top-3">
          <Badge variant="category">{article.category}</Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{article.summary}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>{article.author}</span>
          <span className="inline-flex items-center gap-3">
            <span>{formatDate(article.publishedAt)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {article.readTime}m
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
