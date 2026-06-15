import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageContainer } from "@/components/layout/PageContainer";
import { ArticleGrid } from "@/components/news/ArticleGrid";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Button } from "@/components/common/Button";
import { useCategoryNews } from "@/hooks/useNews";

export const Route = createFileRoute("/category/$category")({
  head: ({ params }) => {
    const name = params.category.charAt(0).toUpperCase() + params.category.slice(1);
    return {
      meta: [
        { title: `${name} News — NewsHub` },
        { name: "description", content: `Latest ${name} stories and reporting on NewsHub.` },
        { property: "og:title", content: `${name} News — NewsHub` },
        { property: "og:description", content: `Latest ${name} stories on NewsHub.` },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const { data, loading } = useCategoryNews(category);
  const title = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageContainer className="space-y-8">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold">Category</p>
          <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
          <p className="text-muted-foreground">
            The latest in {title.toLowerCase()} — handpicked by NewsHub editors.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : data.length === 0 ? (
          <EmptyState
            title="No articles yet"
            description={`We don't have any ${title} stories at the moment. Check back soon.`}
            action={
              <Link to="/">
                <Button>Back to home</Button>
              </Link>
            }
          />
        ) : (
          <ArticleGrid articles={data} />
        )}
      </PageContainer>
      <Footer />
    </div>
  );
}
