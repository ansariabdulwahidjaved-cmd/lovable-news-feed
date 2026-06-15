import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageContainer } from "@/components/layout/PageContainer";
import { SearchBar } from "@/components/common/SearchBar";
import { ArticleGrid } from "@/components/news/ArticleGrid";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Button } from "@/components/common/Button";
import { useSearch } from "@/hooks/useSearch";
import { z } from "zod";

const searchSchema = z.object({ q: z.string().optional().default("") });

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Search — NewsHub" },
      { name: "description", content: "Search NewsHub articles by keyword, topic, or tag." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const { data, loading } = useSearch(q);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageContainer className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold">Search</h1>
          <div className="max-w-xl">
            <SearchBar />
          </div>
          {q && (
            <p className="text-sm text-muted-foreground">
              Showing results for <span className="font-semibold text-foreground">"{q}"</span>
            </p>
          )}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : !q ? (
          <EmptyState
            title="Start searching"
            description="Type a keyword above to find articles, authors, or topics."
          />
        ) : data.length === 0 ? (
          <EmptyState
            title="No results found"
            description={`We couldn't find anything matching "${q}". Try a different keyword.`}
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
