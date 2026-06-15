import { Link } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import type { Article } from "@/api/types";

export function TrendingNewsList({ articles }: { articles: Article[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
        <TrendingUp className="h-5 w-5 text-primary" />
        Trending Now
      </h3>
      <ol className="space-y-4">
        {articles.slice(0, 6).map((a, i) => (
          <li key={a.id} className="flex gap-3">
            <span className="text-2xl font-black text-primary/30 tabular-nums w-8 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Link
              to="/article/$slug"
              params={{ slug: a.slug }}
              className="group min-w-0 flex-1"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-primary">
                {a.category}
              </p>
              <h4 className="mt-0.5 text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {a.title}
              </h4>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
