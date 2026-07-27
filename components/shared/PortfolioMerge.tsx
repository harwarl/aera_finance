"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Card = {
  id: string;
  label: string;
  x: number;
  y: number;
  rotate: number;
  variant?: "vertical" | "horizontal";
};

const CARDS: Card[] = [
  { id: "stocks", label: "AAPLx", x: 16, y: 18, rotate: -10 },
  { id: "eth", label: "ETH", x: 50, y: 6, rotate: 3, variant: "horizontal" },
  { id: "equities", label: "TSLAx", x: 84, y: 18, rotate: 9 },
  { id: "btc", label: "BTC", x: 92, y: 50, rotate: -4, variant: "horizontal" },
  { id: "usdc", label: "USDC", x: 84, y: 82, rotate: -7, variant: "horizontal" },
  { id: "cash", label: "Cash", x: 50, y: 94, rotate: 5 },
  { id: "yield", label: "Yield", x: 16, y: 82, rotate: -5 },
  { id: "usdt", label: "USDT", x: 8, y: 50, rotate: 6, variant: "horizontal" },
];

const STEP_MS = 110;
const CARD_MS = 420;

export function PortfolioMerge() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let observer: IntersectionObserver | undefined;

    const timeout = setTimeout(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setStarted(true);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setStarted(true);
            observer?.disconnect();
          }
        },
        { threshold: 0.3 },
      );
      observer.observe(el);
    }, 0);

    return () => {
      clearTimeout(timeout);
      observer?.disconnect();
    };
  }, []);

  const flowStart = CARD_MS + CARDS.length * STEP_MS + 200;

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-md">
      {/* <CornerBrackets className="absolute inset-0"> */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-accent/10 blur-3xl" />

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {CARDS.map((card, i) => (
          <g key={card.id}>
            <line
              x1={card.x}
              y1={card.y}
              x2={50}
              y2={50}
              pathLength={1}
              className="stroke-accent/30"
              strokeWidth="0.4"
              style={{
                strokeDasharray: 1,
                strokeDashoffset: started ? 0 : 1,
                transition: "stroke-dashoffset 500ms ease-out",
                transitionDelay: `${CARD_MS + i * STEP_MS}ms`,
              }}
            />
            {started ? (
              <line
                x1={card.x}
                y1={card.y}
                x2={50}
                y2={50}
                pathLength={1}
                className="stroke-accent animate-line-flow"
                strokeWidth="0.8"
                strokeLinecap="round"
                style={{
                  strokeDasharray: "0.16 0.84",
                  animationDelay: `${flowStart + i * 160}ms`,
                }}
              />
            ) : null}
          </g>
        ))}
      </svg>

      {CARDS.map((card, i) => (
        <div
          key={card.id}
          className="absolute transition-all ease-out"
          style={{
            left: `${card.x}%`,
            top: `${card.y}%`,
            transform: started
              ? "translate(-50%, -50%) scale(1)"
              : "translate(-50%, -50%) scale(1.3)",
            opacity: started ? 1 : 0,
            transitionDuration: `${CARD_MS}ms`,
            transitionDelay: `${i * STEP_MS}ms`,
          }}
        >
          <div style={{ transform: `rotate(${card.rotate}deg)` }}>
            {card.variant === "horizontal" ? (
              <div
                className={cn(
                  "flex h-10 w-28 items-center justify-between border border-border-muted bg-background-elevated/60 px-3",
                  started && "animate-card-float",
                )}
                style={{ animationDelay: `${i * 260}ms` }}
              >
                <span className="font-mono text-[9px] uppercase tracking-widest text-foreground-faint">
                  {card.label}
                </span>
                <span className="h-4 w-1 bg-border" />
              </div>
            ) : (
              <div
                className={cn(
                  "flex h-16 w-24 flex-col justify-between border border-border-muted bg-background-elevated/60 p-2",
                  started && "animate-card-float",
                )}
                style={{ animationDelay: `${i * 260}ms` }}
              >
                <span className="font-mono text-[9px] uppercase tracking-widest text-foreground-faint">
                  {card.label}
                </span>
                <span className="h-1 w-6 bg-border" />
              </div>
            )}
          </div>
        </div>
      ))}

      <div
        className="absolute left-1/2 top-1/2 flex h-16 w-16 items-center justify-center transition-all ease-out"
        style={{
          opacity: started ? 1 : 0,
          transform: started
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -50%) scale(0.5)",
          transitionDuration: "420ms",
          transitionDelay: `${flowStart}ms`,
        }}
      >
        <div className="absolute inset-0 -m-3 animate-pulse rounded-full bg-accent/25 blur-xl" />
        <Image
          src="/aera.png"
          alt="Aera"
          width={56}
          height={56}
          className="relative drop-shadow-[0_0_18px_rgba(45,212,191,0.45)]"
        />
      </div>
      {/* </CornerBrackets> */}
    </div>
  );
}
