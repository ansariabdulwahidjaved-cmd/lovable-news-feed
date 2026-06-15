import { Link } from "@tanstack/react-router";
import { Clock, Eye } from "lucide-react";
import type { Article } from "@/api/types";
import { Badge } from "@/components/common/Badge";
import { BookmarkButton } from "./BookmarkButton";

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function HeroNewsCard({ article }: { article: Article }) {
  return (
    <Link
      to="/article/$slug"
      params={{ slug: article.slug }}
      className="group relative block overflow-hidden rounded-xl bg-card shadow-card hover:shadow-card-hover transition-shadow"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute right-3 top-3">
          <BookmarkButton articleId={article.id} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="category">{article.category}</Badge>
            {article.isTrending && <Badge variant="breaking">Trending</Badge>}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold leading-tight group-hover:underline">
            {article.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm text-white/85 max-w-3xl">
            {article.summary}
          </p>
          <div className="mt-3 flex items-center gap-4 text-xs text-white/80">
            <span>{article.author}</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {article.readTime} min
            </span>
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3 w-3" /> {article.views.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
