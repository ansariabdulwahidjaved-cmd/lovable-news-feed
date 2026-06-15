import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageContainer } from "@/components/layout/PageContainer";
import { ContactForm } from "@/components/forms/ContactForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — NewsHub" },
      { name: "description", content: "Get in touch with the NewsHub newsroom." },
      { property: "og:title", content: "Contact NewsHub" },
      { property: "og:description", content: "Tips, questions, feedback — we'd love to hear from you." },
    ],
  }),
  component: ContactPage,
});

const channels = [
  { icon: Mail, label: "Email", value: "newsroom@newshub.example" },
  { icon: Phone, label: "Phone", value: "+1 (555) 010-0199" },
  { icon: MapPin, label: "Office", value: "200 Press Lane, NY 10001" },
];

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageContainer>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-primary font-semibold">
                Get in touch
              </p>
              <h1 className="mt-1 text-3xl md:text-4xl font-bold">We'd love to hear from you</h1>
              <p className="mt-3 text-muted-foreground">
                Story tips, corrections, partnership ideas — drop us a line and the right team will
                get back to you.
              </p>
            </div>
            <ul className="space-y-3">
              {channels.map((c) => (
                <li
                  key={c.label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-card"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-md bg-accent text-accent-foreground">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {c.label}
                    </p>
                    <p className="text-sm font-medium">{c.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-card">
            <ContactForm />
          </div>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
}
