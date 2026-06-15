import type { Article } from "@/api/types";
import { NewsCard } from "./NewsCard";

export function FeaturedSection({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold border-l-4 border-primary pl-3">
        Featured Stories
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, 3).map((a) => (
          <NewsCard key={a.id} article={a} />
        ))}
      </div>
    </section>
  );
}
