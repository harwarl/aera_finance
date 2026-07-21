"use client";

import { useEffect, useRef, useState } from "react";

const DIGIT = /[0-9]/;
const LOWER = /[a-z]/;
const UPPER = /[A-Z]/;

function randomChar(char: string) {
  if (DIGIT.test(char)) return Math.floor(Math.random() * 10).toString();
  if (LOWER.test(char))
    return String.fromCharCode(97 + Math.floor(Math.random() * 26));
  if (UPPER.test(char))
    return String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return char;
}

function isScrambleable(char: string) {
  return DIGIT.test(char) || LOWER.test(char) || UPPER.test(char);
}

function scramble(value: string) {
  return value
    .split("")
    .map((char) => (isScrambleable(char) ? randomChar(char) : char))
    .join("");
}

export function ScrambleText({
  value,
  startDelay = 0,
  duration = 1200,
  tick = 45,
  className,
}: {
  value: string;
  startDelay?: number;
  duration?: number;
  tick?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Server and first client render both show the real value, so there is
  // nothing to hydrate-mismatch on; scrambling only starts post-mount.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let interval: ReturnType<typeof setInterval> | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        timeout = setTimeout(() => {
          const chars = value.split("");
          const scramblePositions = chars
            .map((char, i) => (isScrambleable(char) ? i : -1))
            .filter((i) => i !== -1);
          const start = performance.now();

          setDisplay(scramble(value));

          interval = setInterval(() => {
            const progress = Math.min(
              (performance.now() - start) / duration,
              1,
            );
            const lockedCount = Math.floor(progress * scramblePositions.length);

            setDisplay(
              chars
                .map((char, i) => {
                  if (!isScrambleable(char)) return char;
                  const order = scramblePositions.indexOf(i);
                  return order < lockedCount ? char : randomChar(char);
                })
                .join(""),
            );

            if (progress >= 1) {
              setDisplay(value);
              if (interval) clearInterval(interval);
            }
          }, tick);
        }, startDelay);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, [value, startDelay, duration, tick]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
