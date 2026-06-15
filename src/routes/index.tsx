import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageContainer } from "@/components/layout/PageContainer";
import { BreakingNewsTicker } from "@/components/news/BreakingNewsTicker";
import { HeroNewsCard } from "@/components/news/HeroNewsCard";
import { LatestNewsSection } from "@/components/news/LatestNewsSection";
import { TrendingNewsList } from "@/components/news/TrendingNewsList";
import { FeaturedSection } from "@/components/news/FeaturedSection";
import { CategoryTabs } from "@/components/news/CategoryTabs";
import { ArticleGrid } from "@/components/news/ArticleGrid";
import { NewsletterSubscribeForm } from "@/components/forms/NewsletterSubscribeForm";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useAllNews, useLatestNews, useTrendingNews } from "@/hooks/useNews";
import { breakingHeadlines, CATEGORIES } from "@/data/mockNews";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NewsHub — Latest news from around the world" },
      {
        name: "description",
        content:
          "NewsHub delivers breaking news, trending stories, and in-depth reporting on world, politics, business, technology, sports, entertainment, and health.",
      },
      { property: "og:title", content: "NewsHub — Latest news" },
      { property: "og:description", content: "Breaking and trending stories — every day." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { data: latest, loading: latestLoading } = useLatestNews();
  const { data: trending } = useTrendingNews();
  const { data: all } = useAllNews();
  const [tab, setTab] = useState<string>(CATEGORIES[0]);

  const hero = latest[0];
  const featured = useMemo(() => all.filter((a) => a.isFeatured), [all]);
  const tabbed = useMemo(
    () => all.filter((a) => a.category.toLowerCase() === tab.toLowerCase()),
    [all, tab],
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BreakingNewsTicker headlines={breakingHeadlines} />
      <PageContainer className="space-y-12">
        {latestLoading || !hero ? (
          <LoadingSpinner />
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <HeroNewsCard article={hero} />
            </div>
            <div>
              <TrendingNewsList articles={trending} />
            </div>
          </div>
        )}

        <LatestNewsSection articles={latest.slice(1)} />

        <section className="space-y-5">
          <h2 className="text-2xl font-bold border-l-4 border-primary pl-3">
            Browse by Category
          </h2>
          <CategoryTabs categories={CATEGORIES} active={tab} onChange={setTab} />
          {tabbed.length > 0 ? (
            <ArticleGrid articles={tabbed} />
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No stories in {tab} yet.
            </p>
          )}
        </section>

        <FeaturedSection articles={featured} />

        <NewsletterSubscribeForm />
      </PageContainer>
      <Footer />
    </div>
  );
}
