"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { roadmapMonths } from "@/config/roadmap";
import type { RoadmapMonth, RoadmapStatus } from "@/types";

const STEP_MS = 70;
const SEG_MS = 260;
const NODE_MS = 220;
const POP_EASE = "cubic-bezier(0.34, 1.56, 0.64, 1)";

function isLit(status: RoadmapStatus) {
  return status !== "upcoming";
}

function nodeClasses(status: RoadmapStatus) {
  return isLit(status) ? "border-accent bg-accent" : "border-border bg-background";
}

function segmentClasses(fromStatus: RoadmapStatus) {
  return fromStatus === "done" ? "bg-accent" : "bg-border";
}

function DateLabel({ month }: { month: RoadmapMonth }) {
  return (
    <span
      className={cn(
        "font-mono text-xs uppercase tracking-widest",
        isLit(month.status) ? "text-accent" : "text-foreground-faint",
        month.title && "text-sm"
      )}
    >
      {month.month} <span className="opacity-70">{month.year}</span>
    </span>
  );
}

function MilestoneCopy({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-[22ch]">
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-foreground-muted">
        {description}
      </p>
    </div>
  );
}

function GlowBeam({ lit }: { lit: boolean }) {
  return (
    <span
      className={cn(
        "block h-4 w-px",
        lit ? "bg-accent shadow-[0_0_8px_var(--accent)]" : "bg-border-muted"
      )}
    />
  );
}

export function RoadmapTimeline() {
  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const [mobileStarted, setMobileStarted] = useState(false);
  const [desktopStarted, setDesktopStarted] = useState(false);

  useEffect(() => {
    const el = mobileRef.current;
    if (!el) return;

    let observer: IntersectionObserver | undefined;

    const timeout = setTimeout(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setMobileStarted(true);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setMobileStarted(true);
            observer?.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
    }, 0);

    return () => {
      clearTimeout(timeout);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = desktopRef.current;
    if (!el) return;

    let observer: IntersectionObserver | undefined;

    const timeout = setTimeout(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDesktopStarted(true);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setDesktopStarted(true);
            observer?.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
    }, 0);

    return () => {
      clearTimeout(timeout);
      observer?.disconnect();
    };
  }, []);

  return (
    <>
      {/* Mobile / tablet: vertical timeline */}
      <div ref={mobileRef} className="flex flex-col lg:hidden">
        {roadmapMonths.map((month, i) => (
          <div key={month.id} className="flex gap-5">
            <div className="flex w-3 flex-col items-center">
              <span
                className={cn(
                  "shrink-0 rotate-45 border transition-transform",
                  month.title ? "h-3 w-3" : "h-1.5 w-1.5",
                  nodeClasses(month.status),
                  mobileStarted ? "scale-100" : "scale-0"
                )}
                style={{
                  transitionDuration: `${NODE_MS}ms`,
                  transitionTimingFunction: POP_EASE,
                  transitionDelay: `${i * STEP_MS}ms`,
                }}
              />
              {i < roadmapMonths.length - 1 ? (
                <span
                  className={cn(
                    "mt-1 w-px flex-1 origin-top transition-transform ease-out",
                    segmentClasses(month.status),
                    mobileStarted ? "scale-y-100" : "scale-y-0"
                  )}
                  style={{
                    transitionDuration: `${SEG_MS}ms`,
                    transitionDelay: `${i * STEP_MS + NODE_MS * 0.5}ms`,
                  }}
                />
              ) : null}
            </div>
            <div
              className={cn(
                "transition-all ease-out",
                month.title ? "pb-10" : "pb-4",
                mobileStarted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-1.5 opacity-0"
              )}
              style={{
                transitionDuration: "420ms",
                transitionDelay: `${i * STEP_MS + NODE_MS * 0.4}ms`,
              }}
            >
              <DateLabel month={month} />
              {month.title && month.description ? (
                <div className="mt-2">
                  <MilestoneCopy title={month.title} description={month.description} />
                </div>
              ) : null}
              {month.status === "current" ? (
                <span className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent">
                  <span className="h-1.5 w-1.5 animate-ticker-blink bg-accent" />
                  In Progress
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: horizontal timeline */}
      <div ref={desktopRef} className="hidden overflow-x-auto pb-4 lg:block">
        <div className="flex w-max items-stretch px-2">
          {roadmapMonths.map((month, i) => {
            const above = i % 2 === 0;
            const lit = isLit(month.status);
            const copyDelay = `${i * STEP_MS + NODE_MS * 0.5}ms`;
            const copyState = desktopStarted
              ? "translate-y-0 opacity-100"
              : cn(above ? "translate-y-1.5" : "-translate-y-1.5", "opacity-0");

            return (
              <div key={month.id} className="flex h-full w-48 shrink-0 flex-col">
                <div className="flex h-44 flex-col items-center justify-end gap-1 text-center">
                  {above ? (
                    <div
                      className={cn("flex flex-col items-center transition-all ease-out", copyState)}
                      style={{ transitionDuration: "420ms", transitionDelay: copyDelay }}
                    >
                      {month.title && month.description ? (
                        <div className="mb-2">
                          <MilestoneCopy title={month.title} description={month.description} />
                        </div>
                      ) : null}
                      <DateLabel month={month} />
                      <GlowBeam lit={lit} />
                    </div>
                  ) : null}
                </div>

                <div className="flex h-3 items-center">
                  {i > 0 ? (
                    <span
                      className={cn(
                        "h-px flex-1 origin-left transition-transform ease-out",
                        segmentClasses(roadmapMonths[i - 1].status),
                        desktopStarted ? "scale-x-100" : "scale-x-0"
                      )}
                      style={{
                        transitionDuration: `${SEG_MS}ms`,
                        transitionDelay: `${i * STEP_MS}ms`,
                      }}
                    />
                  ) : (
                    <span className="flex-1" />
                  )}
                  <span className="relative flex shrink-0 items-center justify-center">
                    <span
                      className={cn(
                        "relative rotate-45 border transition-transform",
                        month.title ? "h-3 w-3" : "h-1.5 w-1.5",
                        nodeClasses(month.status),
                        desktopStarted ? "scale-100" : "scale-0"
                      )}
                      style={{
                        transitionDuration: `${NODE_MS}ms`,
                        transitionTimingFunction: POP_EASE,
                        transitionDelay: `${i * STEP_MS + SEG_MS * 0.6}ms`,
                      }}
                    />
                    {month.status === "current" ? (
                      <ArrowRight
                        className={cn(
                          "absolute left-full ml-1.5 h-4 w-4 text-accent transition-all ease-out",
                          desktopStarted
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-1 opacity-0"
                        )}
                        style={{
                          transitionDuration: "380ms",
                          transitionDelay: `${i * STEP_MS + SEG_MS * 0.6 + NODE_MS * 0.6}ms`,
                        }}
                      />
                    ) : null}
                  </span>
                  {i < roadmapMonths.length - 1 ? (
                    <span
                      className={cn(
                        "h-px flex-1 origin-left transition-transform ease-out",
                        segmentClasses(month.status),
                        desktopStarted ? "scale-x-100" : "scale-x-0"
                      )}
                      style={{
                        transitionDuration: `${SEG_MS}ms`,
                        transitionDelay: `${i * STEP_MS + SEG_MS * 0.6 + NODE_MS}ms`,
                      }}
                    />
                  ) : (
                    <span className="flex-1" />
                  )}
                </div>

                <div className="flex h-44 flex-col items-center justify-start gap-1 text-center">
                  {!above ? (
                    <div
                      className={cn("flex flex-col items-center transition-all ease-out", copyState)}
                      style={{ transitionDuration: "420ms", transitionDelay: copyDelay }}
                    >
                      <GlowBeam lit={lit} />
                      <DateLabel month={month} />
                      {month.title && month.description ? (
                        <div className="mt-2">
                          <MilestoneCopy title={month.title} description={month.description} />
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}

          {/* Decorative continuation: the line bends off past the last known milestone. */}
          <div className="flex h-full w-24 shrink-0 flex-col">
            <div className="h-44" />
            <div className="flex h-3 items-center">
              <span
                className={cn(
                  "h-px w-10 origin-left bg-border transition-transform ease-out",
                  desktopStarted ? "scale-x-100" : "scale-x-0"
                )}
                style={{
                  transitionDuration: `${SEG_MS}ms`,
                  transitionDelay: `${roadmapMonths.length * STEP_MS}ms`,
                }}
              />
              <span
                className={cn(
                  "h-px w-8 origin-left rotate-45 bg-border transition-transform ease-out",
                  desktopStarted ? "scale-x-100" : "scale-x-0"
                )}
                style={{
                  transitionDuration: `${SEG_MS}ms`,
                  transitionDelay: `${roadmapMonths.length * STEP_MS + SEG_MS * 0.7}ms`,
                }}
              />
            </div>
            <div className="flex h-44 flex-col items-end pr-[calc(50%-2px)]">
              <span
                className={cn(
                  "h-16 w-px origin-top bg-border transition-transform ease-out",
                  desktopStarted ? "scale-y-100" : "scale-y-0"
                )}
                style={{
                  transitionDuration: `${SEG_MS}ms`,
                  transitionDelay: `${roadmapMonths.length * STEP_MS + SEG_MS * 1.4}ms`,
                }}
              />
              <span
                className={cn(
                  "-ml-[3.5px] h-2 w-2 shrink-0 rounded-full border border-border bg-background transition-transform",
                  desktopStarted ? "scale-100" : "scale-0"
                )}
                style={{
                  transitionDuration: `${NODE_MS}ms`,
                  transitionTimingFunction: POP_EASE,
                  transitionDelay: `${roadmapMonths.length * STEP_MS + SEG_MS * 2.4}ms`,
                }}
              />
            </div>
          </div>

          {/* Travels with your scroll: a live signal riding the line. */}
          <div className="sticky left-1/2 top-0 z-10 h-full w-0">
            <div className="flex h-44 items-end justify-center" />
            <div className="flex h-3 items-center justify-center">
              <span className="relative -translate-x-1/2">
                <span
                  className={cn(
                    "absolute inset-0 -m-1.5 rounded-full bg-accent/50",
                    desktopStarted ? "animate-ping" : "opacity-0"
                  )}
                />
                <span className="relative block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
