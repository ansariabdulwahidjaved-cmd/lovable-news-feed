import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageContainer } from "@/components/layout/PageContainer";
import { ArticleGrid } from "@/components/news/ArticleGrid";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/common/Button";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useAllNews } from "@/hooks/useNews";

export const Route = createFileRoute("/bookmarks")({
  head: () => ({
    meta: [
      { title: "Bookmarks — NewsHub" },
      { name: "description", content: "Your saved articles on NewsHub." },
    ],
  }),
  component: BookmarksPage,
});

function BookmarksPage() {
  const { ids } = useBookmarks();
  const { data: all } = useAllNews();
  const articles = all.filter((a) => ids.includes(a.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageContainer className="space-y-8">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold">
            Your library
          </p>
          <h1 className="text-3xl md:text-4xl font-bold">Bookmarks</h1>
          <p className="text-muted-foreground">
            Articles you've saved to read later, stored locally on this device.
          </p>
        </div>

        {articles.length === 0 ? (
          <EmptyState
            icon={<Bookmark className="h-10 w-10" />}
            title="No bookmarks yet"
            description="Tap the bookmark icon on any article to save it for later."
            action={
              <Link to="/">
                <Button>Browse stories</Button>
              </Link>
            }
          />
        ) : (
          <ArticleGrid articles={articles} />
        )}
      </PageContainer>
      <Footer />
    </div>
  );
}
