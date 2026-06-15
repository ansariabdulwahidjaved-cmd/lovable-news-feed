import { useState, type FormEvent } from "react";
import { submitContactForm } from "@/api/newsApi";
import { Button } from "@/components/common/Button";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const update = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    await submitContactForm(form);
    setStatus("done");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 3000);
  }

  const input =
    "w-full rounded-md border border-input bg-background px-3 h-11 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Name</label>
          <input className={input} required value={form.name} onChange={update("name")} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Email</label>
          <input
            type="email"
            className={input}
            required
            value={form.email}
            onChange={update("email")}
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-1.5 block">Subject</label>
        <input className={input} required value={form.subject} onChange={update("subject")} />
      </div>
      <div>
        <label className="text-sm font-medium mb-1.5 block">Message</label>
        <textarea
          rows={5}
          required
          value={form.message}
          onChange={update("message")}
          className="w-full rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
        />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
        {status === "done" && (
          <span className="text-sm text-primary">Thanks — we'll be in touch shortly.</span>
        )}
      </div>
    </form>
  );
}
