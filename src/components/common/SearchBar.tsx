import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    navigate({ to: "/search", search: { q: query } });
  };

  return (
    <form onSubmit={onSubmit} className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search news…"
        className={`w-full rounded-md border border-input bg-background pl-9 pr-3 ${compact ? "h-9 text-sm" : "h-10 text-sm"} placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30`}
      />
    </form>
  );
}
