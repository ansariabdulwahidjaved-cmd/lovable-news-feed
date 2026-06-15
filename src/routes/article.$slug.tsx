import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageContainer } from "@/components/layout/PageContainer";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ArticleContent } from "@/components/article/ArticleContent";
import { AuthorInfo } from "@/components/article/AuthorInfo";
import { ShareButtons } from "@/components/article/ShareButtons";
import { CommentSection } from "@/components/article/CommentSection";
import { RelatedArticles } from "@/components/news/RelatedArticles";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { useArticleBySlug, useAllNews } from "@/hooks/useNews";

export const Route = createFileRoute("/article/$slug")({
  component: ArticleDetailPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageContainer>
        <div className="py-20 text-center">
          <h1 className="text-3xl font-bold">Article not found</h1>
          <p className="mt-2 text-muted-foreground">
            The article you're looking for doesn't exist.
          </p>
          <Link to="/" className="mt-6 inline-block">
            <Button>Back to home</Button>
          </Link>
        </div>
      </PageContainer>
      <Footer />
    </div>
  ),
});

function ArticleDetailPage() {
  const { slug } = Route.useParams();
  const { data: article, loading } = useArticleBySlug(slug);
  const { data: all } = useAllNews();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <PageContainer><LoadingSpinner /></PageContainer>
        <Footer />
      </div>
    );
  }

  if (!article) {
    throw notFound();
  }

  const related = all
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageContainer>
        <div className="mx-auto max-w-3xl">
          <ArticleHeader article={article} />
          <figure className="my-8 overflow-hidden rounded-xl">
            <img
              src={article.image}
              alt={article.title}
              className="w-full object-cover"
            />
          </figure>
          <ArticleContent article={article} />

          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((t) => (
              <Badge key={t} variant="outline"># {t}</Badge>
            ))}
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <ShareButtons title={article.title} />
          </div>

          <AuthorInfo article={article} />
          <CommentSection articleId={article.id} />
        </div>

        <RelatedArticles articles={related} />
      </PageContainer>
      <Footer />
    </div>
  );
}
