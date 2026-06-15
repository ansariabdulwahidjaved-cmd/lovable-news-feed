import type { Article } from "@/api/types";
import { SmallNewsCard } from "./SmallNewsCard";

export function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <div className="space-y-5 divide-y divide-border [&>*:not(:first-child)]:pt-5">
      {articles.map((a) => (
        <SmallNewsCard key={a.id} article={a} />
      ))}
    </div>
  );
}
