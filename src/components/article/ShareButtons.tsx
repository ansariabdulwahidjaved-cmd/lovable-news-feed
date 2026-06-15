import { Facebook, Link2, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copy = () => {
    if (typeof navigator === "undefined") return;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const btn =
    "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-secondary hover:text-primary transition-colors";

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-1">Share:</span>
      <a className={btn} href="#" aria-label={`Share ${title} on Twitter`}>
        <Twitter className="h-4 w-4" />
      </a>
      <a className={btn} href="#" aria-label="Share on Facebook">
        <Facebook className="h-4 w-4" />
      </a>
      <a className={btn} href="#" aria-label="Share on LinkedIn">
        <Linkedin className="h-4 w-4" />
      </a>
      <button onClick={copy} className={btn} aria-label="Copy link">
        <Link2 className="h-4 w-4" />
      </button>
      {copied && <span className="text-xs text-primary">Link copied!</span>}
    </div>
  );
}
