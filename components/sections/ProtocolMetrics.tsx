// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Container } from "@/components/layout/Container";
// import { SectionHeader } from "@/components/layout/SectionHeader";
// import { Reveal } from "@/components/shared/Reveal";
// import { cn } from "@/lib/utils";

// // Text-forward by design, not another dashboard-card grid — one hero
// // number with a count-up, one flowing paragraph carrying the real facts
// // inline instead of as separate stat tiles. Everything numeric here is a
// // placeholder pending real data/verification:
// //   - "Reasoning steps logged" needs a precise definition (what counts as
// //     one step) before this ships as a real metric, not just a number.
// //   - Week/Month/All-time values are illustrative.
// //   - "4 independent signals" must match whatever the risk panel actually
// //     evaluates (DashboardAgentPanel's factor list) — keep these in sync
// //     if either changes.
// //   - Tooltip detail lines are placeholder copy pending final review.
// const TIMEFRAMES = [
//   { key: "week", label: "Week", value: 1247, period: "This Week" },
//   { key: "month", label: "Month", value: 5140, period: "This Month" },
//   { key: "all", label: "All Time", value: 38900, period: "All Time" },
// ] as const;

// type TimeframeKey = (typeof TIMEFRAMES)[number]["key"];

// type StatKey = "assets" | "signals" | "latency" | "custody";

// const STAT_DETAILS: Record<StatKey, string> = {
//   assets:
//     "Includes tokenized equities, ETFs, and approved crypto and yield positions.",
//   signals:
//     "Volatility, trend, drawdown, and macro regime, recomputed continuously.",
//   latency: "Median time from a detected drift to a proposed rebalance.",
//   custody: "Funds stay in a vault only your wallet can withdraw from.",
// };

// const COUNT_UP_MS = 700;

// function easeOutCubic(t: number) {
//   return 1 - Math.pow(1 - t, 3);
// }

// function reduceMotion() {
//   return (
//     typeof window !== "undefined" &&
//     window.matchMedia("(prefers-reduced-motion: reduce)").matches
//   );
// }

// function StatSpan({
//   statKey,
//   activeKey,
//   onActivate,
//   onDeactivate,
//   accent,
//   children,
// }: {
//   statKey: StatKey;
//   activeKey: StatKey | null;
//   onActivate: (key: StatKey) => void;
//   onDeactivate: (key: StatKey) => void;
//   accent?: boolean;
//   children: React.ReactNode;
// }) {
//   const isActive = activeKey === statKey;
//   return (
//     <span
//       tabIndex={0}
//       role="button"
//       aria-describedby={isActive ? `stat-detail-${statKey}` : undefined}
//       className={cn(
//         "cursor-help font-bold underline decoration-dotted decoration-1 underline-offset-4 outline-none",
//         accent ? "text-accent" : "text-foreground",
//       )}
//       onMouseEnter={() => onActivate(statKey)}
//       onMouseLeave={() => onDeactivate(statKey)}
//       onFocus={() => onActivate(statKey)}
//       onBlur={() => onDeactivate(statKey)}
//       onClick={() => (isActive ? onDeactivate(statKey) : onActivate(statKey))}
//     >
//       {children}
//     </span>
//   );
// }

// export function ProtocolMetrics() {
//   const [timeframe, setTimeframe] = useState<TimeframeKey>("all");
//   const [displayed, setDisplayed] = useState<number>(
//     () => TIMEFRAMES.find((t) => t.key === "all")!.value,
//   );
//   const [activeStat, setActiveStat] = useState<StatKey | null>(null);
//   const displayedRef = useRef(displayed);
//   const rafRef = useRef<number>(0);
//   const mounted = useRef(false);

//   const current = TIMEFRAMES.find((t) => t.key === timeframe)!;

//   useEffect(() => {
//     const target = current.value;

//     if (reduceMotion()) {
//       const raf = requestAnimationFrame(() => {
//         setDisplayed(target);
//         displayedRef.current = target;
//       });
//       return () => cancelAnimationFrame(raf);
//     }

//     cancelAnimationFrame(rafRef.current);
//     // First mount counts up from 0; switching timeframes afterward
//     // animates from whatever's currently on screen, not from zero.
//     const from = mounted.current ? displayedRef.current : 0;
//     mounted.current = true;
//     const start = performance.now();

//     function frame(now: number) {
//       const t = Math.min((now - start) / COUNT_UP_MS, 1);
//       const eased = easeOutCubic(t);
//       const value = Math.round(from + (target - from) * eased);
//       displayedRef.current = value;
//       setDisplayed(value);
//       if (t < 1) rafRef.current = requestAnimationFrame(frame);
//     }
//     rafRef.current = requestAnimationFrame(frame);

//     return () => cancelAnimationFrame(rafRef.current);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [timeframe]);

//   function activate(key: StatKey) {
//     setActiveStat(key);
//   }
//   function deactivate(key: StatKey) {
//     setActiveStat((prev) => (prev === key ? null : prev));
//   }

//   return (
//     <section className="py-20 sm:py-28">
//       <Container>
//         <Reveal>
//           <SectionHeader label="At A Glance" meta="" />
//         </Reveal>
//         <div className="rounded-2xl border border-border-muted bg-background-elevated/40 p-6 sm:p-10">
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div></div>
//             <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent">
//               <span className="h-1.5 w-1.5 animate-ticker-blink rounded-full bg-accent" />
//               Live · Robinhood Chain
//             </span>
//           </div>

//           <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:divide-x sm:divide-border-muted">
//             <div className="sm:pr-10">
//               <div
//                 className="text-7xl font-medium leading-none tracking-tight text-accent"
//                 aria-live="off"
//               >
//                 {displayed.toLocaleString("en-US")}
//               </div>
//               <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
//                 Reasoning steps logged · {current.period}
//               </p>

//               <div className="mt-5 flex items-center gap-2">
//                 {TIMEFRAMES.map((tf) => (
//                   <button
//                     key={tf.key}
//                     type="button"
//                     onClick={() => setTimeframe(tf.key)}
//                     className={cn(
//                       "rounded-md border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors duration-150",
//                       tf.key === timeframe
//                         ? "border-accent/50 bg-accent/10 text-accent"
//                         : "border-border text-foreground-faint hover:text-foreground-muted",
//                     )}
//                   >
//                     {tf.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="sm:pl-10">
//               <p className="max-w-[52ch] text-[17px] leading-relaxed text-foreground-muted">
//                 Atlas watches{" "}
//                 <StatSpan
//                   statKey="assets"
//                   activeKey={activeStat}
//                   onActivate={activate}
//                   onDeactivate={deactivate}
//                 >
//                   40+ assets
//                 </StatSpan>{" "}
//                 across stocks, crypto, and yield, weighing{" "}
//                 <StatSpan
//                   statKey="signals"
//                   activeKey={activeStat}
//                   onActivate={activate}
//                   onDeactivate={deactivate}
//                 >
//                   4 independent signals
//                 </StatSpan>{" "}
//                 before every move, in under{" "}
//                 <StatSpan
//                   statKey="latency"
//                   activeKey={activeStat}
//                   onActivate={activate}
//                   onDeactivate={deactivate}
//                 >
//                   400ms
//                 </StatSpan>{" "}
//                 from drift to proposal. It has taken custody of deposits{" "}
//                 <StatSpan
//                   statKey="custody"
//                   activeKey={activeStat}
//                   onActivate={activate}
//                   onDeactivate={deactivate}
//                   accent
//                 >
//                   0% of the time
//                 </StatSpan>
//                 , and revocation is one transaction, always.
//               </p>

//               <div className="relative mt-4 min-h-5">
//                 {(Object.keys(STAT_DETAILS) as StatKey[]).map((key) => (
//                   <p
//                     key={key}
//                     id={`stat-detail-${key}`}
//                     className={cn(
//                       "absolute inset-x-0 top-0 text-xs text-foreground-faint transition-opacity duration-250",
//                       activeStat === key
//                         ? "opacity-100"
//                         : "pointer-events-none opacity-0",
//                     )}
//                   >
//                     {STAT_DETAILS[key]}
//                   </p>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <p className="mt-10 border-t border-border-muted pt-6 text-xs leading-relaxed text-foreground-faint">
//             These numbers come from the same engine the rest of the platform
//             runs on.
//           </p>
//         </div>
//       </Container>
//     </section>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

// Text-forward by design, not another dashboard-card grid — one hero
// number with a count-up, one flowing paragraph carrying the real facts
// inline instead of as separate stat tiles. Everything numeric here is a
// placeholder pending real data/verification:
//   - "Reasoning steps logged" needs a precise definition (what counts as
//     one step) before this ships as a real metric, not just a number.
//   - Week/Month/All-time values are illustrative.
//   - "4 independent signals" must match whatever the risk panel actually
//     evaluates (DashboardAgentPanel's factor list) — keep these in sync
//     if either changes.
//   - Tooltip detail lines are placeholder copy pending final review.
//
// Scoped explicitly to the vault product (see section label + closing
// line) now that Atlas is a platform with 7 other products — these stats
// (asset count, custody %, etc.) are vault-specific and shouldn't read as
// platform-wide claims.
const TIMEFRAMES = [
  { key: "week", label: "Week", value: 1247, period: "This Week" },
  { key: "month", label: "Month", value: 5140, period: "This Month" },
  { key: "all", label: "All Time", value: 38900, period: "All Time" },
] as const;

type TimeframeKey = (typeof TIMEFRAMES)[number]["key"];

type StatKey = "assets" | "signals" | "latency" | "custody";

const STAT_DETAILS: Record<StatKey, string> = {
  assets:
    "Includes tokenized equities, ETFs, and approved crypto and yield positions.",
  signals:
    "Volatility, trend, drawdown, and macro regime, recomputed continuously.",
  latency: "Median time from a detected drift to a proposed rebalance.",
  custody: "Funds stay in a vault only your wallet can withdraw from.",
};

const COUNT_UP_MS = 700;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function reduceMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function StatSpan({
  statKey,
  activeKey,
  onActivate,
  onDeactivate,
  accent,
  children,
}: {
  statKey: StatKey;
  activeKey: StatKey | null;
  onActivate: (key: StatKey) => void;
  onDeactivate: (key: StatKey) => void;
  accent?: boolean;
  children: React.ReactNode;
}) {
  const isActive = activeKey === statKey;
  return (
    <span
      tabIndex={0}
      role="button"
      aria-describedby={isActive ? `stat-detail-${statKey}` : undefined}
      className={cn(
        "cursor-help font-bold underline decoration-dotted decoration-1 underline-offset-4 outline-none",
        accent ? "text-accent" : "text-foreground",
      )}
      onMouseEnter={() => onActivate(statKey)}
      onMouseLeave={() => onDeactivate(statKey)}
      onFocus={() => onActivate(statKey)}
      onBlur={() => onDeactivate(statKey)}
      onClick={() => (isActive ? onDeactivate(statKey) : onActivate(statKey))}
    >
      {children}
    </span>
  );
}

export function ProtocolMetrics() {
  const [timeframe, setTimeframe] = useState<TimeframeKey>("all");
  const [displayed, setDisplayed] = useState<number>(
    () => TIMEFRAMES.find((t) => t.key === "all")!.value,
  );
  const [activeStat, setActiveStat] = useState<StatKey | null>(null);
  const displayedRef = useRef(displayed);
  const rafRef = useRef<number>(0);
  const mounted = useRef(false);

  const current = TIMEFRAMES.find((t) => t.key === timeframe)!;

  useEffect(() => {
    const target = current.value;

    if (reduceMotion()) {
      const raf = requestAnimationFrame(() => {
        setDisplayed(target);
        displayedRef.current = target;
      });
      return () => cancelAnimationFrame(raf);
    }

    cancelAnimationFrame(rafRef.current);
    // First mount counts up from 0; switching timeframes afterward
    // animates from whatever's currently on screen, not from zero.
    const from = mounted.current ? displayedRef.current : 0;
    mounted.current = true;
    const start = performance.now();

    function frame(now: number) {
      const t = Math.min((now - start) / COUNT_UP_MS, 1);
      const eased = easeOutCubic(t);
      const value = Math.round(from + (target - from) * eased);
      displayedRef.current = value;
      setDisplayed(value);
      if (t < 1) rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeframe]);

  function activate(key: StatKey) {
    setActiveStat(key);
  }
  function deactivate(key: StatKey) {
    setActiveStat((prev) => (prev === key ? null : prev));
  }

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader label="The Vault, At A Glance" meta="" />
        </Reveal>
        <div className="rounded-2xl border border-border-muted bg-background-elevated/40 p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div></div>
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 animate-ticker-blink rounded-full bg-accent" />
              Live · Robinhood Chain
            </span>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:divide-x sm:divide-border-muted">
            <div className="sm:pr-10">
              <div
                className="text-7xl font-medium leading-none tracking-tight text-accent"
                aria-live="off"
              >
                {displayed.toLocaleString("en-US")}
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                Reasoning steps logged · {current.period}
              </p>

              <div className="mt-5 flex items-center gap-2">
                {TIMEFRAMES.map((tf) => (
                  <button
                    key={tf.key}
                    type="button"
                    onClick={() => setTimeframe(tf.key)}
                    className={cn(
                      "rounded-md border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors duration-150",
                      tf.key === timeframe
                        ? "border-accent/50 bg-accent/10 text-accent"
                        : "border-border text-foreground-faint hover:text-foreground-muted",
                    )}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:pl-10">
              <p className="max-w-[52ch] text-[17px] leading-relaxed text-foreground-muted">
                The vault watches{" "}
                <StatSpan
                  statKey="assets"
                  activeKey={activeStat}
                  onActivate={activate}
                  onDeactivate={deactivate}
                >
                  40+ assets
                </StatSpan>{" "}
                across stocks, crypto, and yield, weighing{" "}
                <StatSpan
                  statKey="signals"
                  activeKey={activeStat}
                  onActivate={activate}
                  onDeactivate={deactivate}
                >
                  4 independent signals
                </StatSpan>{" "}
                before every move, in under{" "}
                <StatSpan
                  statKey="latency"
                  activeKey={activeStat}
                  onActivate={activate}
                  onDeactivate={deactivate}
                >
                  400ms
                </StatSpan>{" "}
                from drift to proposal. It has taken custody of deposits{" "}
                <StatSpan
                  statKey="custody"
                  activeKey={activeStat}
                  onActivate={activate}
                  onDeactivate={deactivate}
                  accent
                >
                  0% of the time
                </StatSpan>
                , and revocation is one transaction, always.
              </p>

              <div className="relative mt-4 min-h-5">
                {(Object.keys(STAT_DETAILS) as StatKey[]).map((key) => (
                  <p
                    key={key}
                    id={`stat-detail-${key}`}
                    className={cn(
                      "absolute inset-x-0 top-0 text-xs text-foreground-faint transition-opacity duration-250",
                      activeStat === key
                        ? "opacity-100"
                        : "pointer-events-none opacity-0",
                    )}
                  >
                    {STAT_DETAILS[key]}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-10 border-t border-border-muted pt-6 text-xs leading-relaxed text-foreground-faint">
            This is one product on the platform. Seven more run on the same
            engine.
          </p>
        </div>
      </Container>
    </section>
  );
}