import { createFileRoute } from "@tanstack/react-router";
import { Award, Globe2, Newspaper, Users } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageContainer } from "@/components/layout/PageContainer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NewsHub" },
      {
        name: "description",
        content:
          "NewsHub is an independent newsroom delivering trusted reporting on the stories that shape our world.",
      },
      { property: "og:title", content: "About NewsHub" },
      { property: "og:description", content: "Independent reporting, every day." },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { icon: Users, label: "Monthly readers", value: "12M+" },
  { icon: Newspaper, label: "Stories published", value: "85K" },
  { icon: Globe2, label: "Countries covered", value: "120" },
  { icon: Award, label: "Editorial awards", value: "23" },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageContainer className="space-y-14">
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold">
            About NewsHub
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Reporting that respects your time — and your intelligence.
          </h1>
          <p className="text-lg text-muted-foreground">
            We're an independent newsroom of journalists, editors, and engineers committed to clear,
            accurate reporting on the stories that matter most.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-card p-5 text-center shadow-card"
            >
              <s.icon className="mx-auto h-6 w-6 text-primary" />
              <div className="mt-3 text-2xl font-bold">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-10 md:grid-cols-2 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Our mission</h2>
            <p className="text-foreground/85">
              At NewsHub, we believe a well-informed public is the foundation of a healthy society.
              Every story we publish is held to a single standard: would we want this in front of
              our own families?
            </p>
            <p className="text-foreground/85">
              That means rigorous sourcing, transparent corrections, and reporting that takes the
              reader's intelligence as a given.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">What you'll find here</h2>
            <ul className="space-y-2 text-foreground/85 list-disc pl-5">
              <li>Breaking and trending news from around the world</li>
              <li>In-depth reporting on politics, business, and technology</li>
              <li>Coverage of sports, entertainment, and health</li>
              <li>Editorials, analysis, and reader perspectives</li>
            </ul>
          </div>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
}
