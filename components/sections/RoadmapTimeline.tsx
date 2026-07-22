import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";
import { roadmapMilestones } from "@/config/roadmap";
import type { RoadmapStatus } from "@/types";

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
  return (
    <>
      {/* Mobile / tablet: vertical timeline */}
      <div className="flex flex-col lg:hidden">
        {roadmapMilestones.map((milestone, i) => (
          <Reveal key={milestone.id} delay={i * 60}>
            <div className="flex gap-5">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "h-3 w-3 shrink-0 rotate-45 border",
                    nodeClasses(milestone.status)
                  )}
                />
                {i < roadmapMilestones.length - 1 ? (
                  <span
                    className={cn(
                      "mt-1 w-px flex-1",
                      segmentClasses(milestone.status)
                    )}
                  />
                ) : null}
              </div>
              <div className="pb-10">
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
          </Reveal>
        ))}
      </div>

      {/* Desktop: horizontal timeline */}
      <div className="hidden overflow-x-auto pb-4 lg:block">
        <div className="flex w-max items-stretch px-2">
          {roadmapMilestones.map((milestone, i) => {
            const above = i % 2 === 0;
            return (
              <Reveal key={milestone.id} delay={i * 60} className="w-56 shrink-0">
                <div className="flex h-full flex-col">
                  <div className="flex h-32 flex-col items-center justify-end gap-2 text-center">
                    {above ? (
                      <>
                        <MilestoneCopy
                          title={milestone.title}
                          description={milestone.description}
                        />
                        <DateLabel
                          quarter={milestone.quarter}
                          status={milestone.status}
                        />
                      </>
                    ) : null}
                  </div>

                  <div className="flex items-center">
                    {i > 0 ? (
                      <span
                        className={cn(
                          "h-px flex-1",
                          segmentClasses(roadmapMilestones[i - 1].status)
                        )}
                      />
                    ) : (
                      <span className="flex-1" />
                    )}
                    <span className="relative flex shrink-0 items-center justify-center">
                      <span
                        className={cn(
                          "h-3 w-3 rotate-45 border",
                          nodeClasses(milestone.status)
                        )}
                      />
                      {milestone.status === "current" ? (
                        <ArrowRight className="absolute left-full ml-1.5 h-4 w-4 text-accent" />
                      ) : null}
                    </span>
                    {i < roadmapMilestones.length - 1 ? (
                      <span
                        className={cn(
                          "h-px flex-1",
                          segmentClasses(milestone.status)
                        )}
                      />
                    ) : (
                      <span className="flex-1" />
                    )}
                  </div>

                  <div className="flex h-32 flex-col items-center justify-start gap-2 text-center">
                    {!above ? (
                      <>
                        <DateLabel
                          quarter={milestone.quarter}
                          status={milestone.status}
                        />
                        <MilestoneCopy
                          title={milestone.title}
                          description={milestone.description}
                        />
                      </>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </>
  );
}
