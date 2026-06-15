import { Zap } from "lucide-react";

export function BreakingNewsTicker({ headlines }: { headlines: string[] }) {
  const doubled = [...headlines, ...headlines];
  return (
    <div className="border-y border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl flex items-stretch overflow-hidden">
        <div className="flex items-center gap-2 bg-breaking px-4 py-2 text-breaking-foreground font-bold text-xs uppercase tracking-wider shrink-0">
          <Zap className="h-4 w-4" />
          Breaking
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="flex gap-12 whitespace-nowrap py-2 animate-marquee">
            {doubled.map((h, i) => (
              <span key={i} className="text-sm">
                <span className="text-primary mr-2">•</span>
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
