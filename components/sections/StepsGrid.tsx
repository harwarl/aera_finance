"use client";

import { useEffect, useState } from "react";
import { IndexNumber } from "@/components/ui/IndexNumber";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";
import { steps } from "@/config/site";
import { CornerBrackets } from "../shared/CornerBrackets";

const CYCLE_MS = 2600;

export function StepsGrid() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      setActive((i) => (i + 1) % steps.length);
    }, CYCLE_MS);

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div>
      <div className="mt-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
        <span className="h-1.5 w-1.5 animate-ticker-blink bg-accent" />
        Running <span className="text-accent">
          {steps[active].index}
        </span> · {steps[active].title}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => {
          const isActive = i === active;
          return (
            <Reveal key={step.index} delay={200 + i * 100}>
              <CornerBrackets className="h-full">
                <div
                  onMouseEnter={() => {
                    setPaused(true);
                    setActive(i);
                  }}
                  onMouseLeave={() => setPaused(false)}
                  className={cn(
                    "flex h-full flex-col gap-4 bg-background-elevated/50 px-6 py-8 transition-colors duration-300",
                    isActive && "bg-background-elevated/30",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <IndexNumber
                      className={cn(
                        "transition-colors duration-300",
                        isActive && "text-accent",
                      )}
                    >
                      {step.index}
                    </IndexNumber>
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full bg-border transition-colors duration-300",
                        isActive && "animate-ticker-blink bg-accent",
                      )}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="max-w-[30ch] text-sm leading-relaxed text-foreground-muted">
                    {step.description}
                  </p>
                </div>
              </CornerBrackets>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
