import { TexturedBand } from "@/components/shared/TexturedBand";

const events = [
  "REBALANCE EXECUTED",
  "YIELD ROUTED",
  "POSITION VERIFIED ON-CHAIN",
  "RISK CHECK PASSED",
  "TRADE SETTLED",
];

const track = [...events, ...events];

export function TickerBand() {
  return (
    <TexturedBand className="overflow-hidden">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap py-4 font-mono text-xs uppercase tracking-widest text-foreground-faint">
        {track.map((event, i) => (
          <span key={`${event}-${i}`} className="flex items-center gap-10">
            {event}
            <span className="text-accent">·</span>
          </span>
        ))}
      </div>
    </TexturedBand>
  );
}
