import type { Article } from "@/api/types";

export function ArticleContent({ article }: { article: Article }) {
  return (
    <article
      className="prose prose-slate max-w-none [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-3 [&>p]:text-base [&>p]:leading-relaxed [&>p]:text-foreground/90 [&>p]:mb-4"
      dangerouslySetInnerHTML={{ __html: article.content }}
    />
  );
}
