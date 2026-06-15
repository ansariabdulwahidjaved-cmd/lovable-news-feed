import { Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { submitNewsletter } from "@/api/newsApi";
import { Button } from "@/components/common/Button";

export function NewsletterSubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    await submitNewsletter(email);
    setStatus("done");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3000);
  }

  return (
    <section className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-12 text-center">
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary-foreground/15">
          <Mail className="h-6 w-6" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">The morning briefing in your inbox</h2>
        <p className="text-primary-foreground/85">
          Smart, concise reporting on the day's biggest stories — delivered before your first
          coffee.
        </p>
        <form onSubmit={onSubmit} className="mx-auto mt-2 flex max-w-md flex-col gap-2 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-md border border-primary-foreground/30 bg-primary-foreground/10 px-4 h-11 text-sm placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
          />
          <Button
            type="submit"
            variant="secondary"
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            disabled={status === "sending"}
          >
            {status === "sending" ? "…" : status === "done" ? "Subscribed!" : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  );
}
