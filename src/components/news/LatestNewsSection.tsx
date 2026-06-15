import type { Article } from "@/api/types";
import { ArticleGrid } from "./ArticleGrid";

export function LatestNewsSection({ articles }: { articles: Article[] }) {
  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold border-l-4 border-primary pl-3">Latest News</h2>
      </div>
      <ArticleGrid articles={articles.slice(0, 6)} />
    </section>
  );
}
