import { useState, type FormEvent } from "react";
import { submitComment } from "@/api/newsApi";
import { Button } from "@/components/common/Button";

interface CommentSectionProps {
  articleId: string;
}

interface LocalComment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<LocalComment[]>([
    {
      id: "c1",
      author: "Alex Rivera",
      content: "Great reporting — this gave me a much clearer picture of the situation.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "c2",
      author: "Maya Chen",
      content: "Would love to see a follow-up on the financing details next week.",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;
    setSubmitting(true);
    try {
      await submitComment(articleId, { author, content });
      setComments((prev) => [
        {
          id: Math.random().toString(36).slice(2),
          author,
          content,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
      setContent("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-12 space-y-6">
      <h2 className="text-xl font-bold border-l-4 border-primary pl-3">
        Comments ({comments.length})
      </h2>
      <form onSubmit={onSubmit} className="space-y-3 rounded-xl border border-border bg-card p-5">
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-md border border-input bg-background px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts…"
          rows={3}
          className="w-full rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Posting…" : "Post comment"}
          </Button>
        </div>
      </form>
      <ul className="space-y-4">
        {comments.map((c) => (
          <li key={c.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">{c.author}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(c.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="mt-2 text-sm text-foreground/90">{c.content}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
