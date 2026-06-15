import { Clock, Eye } from "lucide-react";
import type { Article } from "@/api/types";
import { Badge } from "@/components/common/Badge";
import { BookmarkButton } from "@/components/news/BookmarkButton";
import { formatDate } from "@/components/news/HeroNewsCard";

export function ArticleHeader({ article }: { article: Article }) {
  return (
    <header className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="category">{article.category}</Badge>
        {article.isTrending && <Badge variant="breaking">Trending</Badge>}
      </div>
      <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
        {article.title}
      </h1>
      <p className="text-lg text-muted-foreground max-w-3xl">{article.summary}</p>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{article.author}</span>
        <span>{formatDate(article.publishedAt)}</span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-4 w-4" /> {article.readTime} min read
        </span>
        <span className="inline-flex items-center gap-1">
          <Eye className="h-4 w-4" /> {article.views.toLocaleString()} views
        </span>
        <BookmarkButton articleId={article.id} variant="full" className="ml-auto" />
      </div>
    </header>
  );
}
