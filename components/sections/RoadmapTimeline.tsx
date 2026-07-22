"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { roadmapMilestones } from "@/config/roadmap";
import type { RoadmapStatus } from "@/types";

const STEP_MS = 160;
const SEG_MS = 420;
const NODE_MS = 340;
const POP_EASE = "cubic-bezier(0.34, 1.56, 0.64, 1)";

function nodeClasses(status: RoadmapStatus) {
  if (status === "upcoming") {
    return "border-border bg-background";
  }
  return "border-accent bg-accent";
}

function segmentClasses(fromStatus: RoadmapStatus) {
  return fromStatus === "done" ? "bg-accent" : "bg-border";
}

function DateLabel({
  quarter,
  status,
}: {
  quarter: string;
  status: RoadmapStatus;
}) {
  return (
    <span
      className={cn(
        "font-mono text-xs uppercase tracking-widest",
        status === "upcoming" ? "text-foreground-faint" : "text-accent"
      )}
    >
      {quarter}
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
        {roadmapMilestones.map((milestone, i) => (
          <div key={milestone.id} className="flex gap-5">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "h-3 w-3 shrink-0 rotate-45 border transition-transform",
                  nodeClasses(milestone.status),
                  mobileStarted ? "scale-100" : "scale-0"
                )}
                style={{
                  transitionDuration: `${NODE_MS}ms`,
                  transitionTimingFunction: POP_EASE,
                  transitionDelay: `${i * STEP_MS}ms`,
                }}
              />
              {i < roadmapMilestones.length - 1 ? (
                <span
                  className={cn(
                    "mt-1 w-px flex-1 origin-top transition-transform ease-out",
                    segmentClasses(milestone.status),
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
                "pb-10 transition-all ease-out",
                mobileStarted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-1.5 opacity-0"
              )}
              style={{
                transitionDuration: "420ms",
                transitionDelay: `${i * STEP_MS + NODE_MS * 0.4}ms`,
              }}
            >
              <DateLabel quarter={milestone.quarter} status={milestone.status} />
              <div className="mt-2">
                <MilestoneCopy
                  title={milestone.title}
                  description={milestone.description}
                />
              </div>
              {milestone.status === "current" ? (
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
          {roadmapMilestones.map((milestone, i) => {
            const above = i % 2 === 0;
            const copyDelay = `${i * STEP_MS + NODE_MS * 0.5}ms`;
            const copyState = desktopStarted
              ? "translate-y-0 opacity-100"
              : cn(above ? "translate-y-1.5" : "-translate-y-1.5", "opacity-0");

            return (
              <div key={milestone.id} className="flex h-full w-56 shrink-0 flex-col">
                <div className="flex h-32 flex-col items-center justify-end gap-2 text-center">
                  {above ? (
                    <div
                      className={cn("transition-all ease-out", copyState)}
                      style={{ transitionDuration: "420ms", transitionDelay: copyDelay }}
                    >
                      <MilestoneCopy
                        title={milestone.title}
                        description={milestone.description}
                      />
                      <div className="mt-2">
                        <DateLabel
                          quarter={milestone.quarter}
                          status={milestone.status}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="flex items-center">
                  {i > 0 ? (
                    <span
                      className={cn(
                        "h-px flex-1 origin-left transition-transform ease-out",
                        segmentClasses(roadmapMilestones[i - 1].status),
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
                    {milestone.status === "current" ? (
                      <span
                        className={cn(
                          "absolute h-4 w-4 rounded-full bg-accent/50",
                          desktopStarted ? "animate-ping" : "opacity-0"
                        )}
                      />
                    ) : null}
                    <span
                      className={cn(
                        "relative h-3 w-3 rotate-45 border transition-transform",
                        nodeClasses(milestone.status),
                        desktopStarted ? "scale-100" : "scale-0"
                      )}
                      style={{
                        transitionDuration: `${NODE_MS}ms`,
                        transitionTimingFunction: POP_EASE,
                        transitionDelay: `${i * STEP_MS + SEG_MS * 0.6}ms`,
                      }}
                    />
                    {milestone.status === "current" ? (
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
                  {i < roadmapMilestones.length - 1 ? (
                    <span
                      className={cn(
                        "h-px flex-1 origin-left transition-transform ease-out",
                        segmentClasses(milestone.status),
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

                <div className="flex h-32 flex-col items-center justify-start gap-2 text-center">
                  {!above ? (
                    <div
                      className={cn("transition-all ease-out", copyState)}
                      style={{ transitionDuration: "420ms", transitionDelay: copyDelay }}
                    >
                      <DateLabel
                        quarter={milestone.quarter}
                        status={milestone.status}
                      />
                      <div className="mt-2">
                        <MilestoneCopy
                          title={milestone.title}
                          description={milestone.description}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
