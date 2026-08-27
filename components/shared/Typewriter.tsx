"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 250;
const DELETE_MS = 100;
const HOLD_MS = 1800;
const RESTART_MS = 500;

export function Typewriter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? value
      : "",
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;

    function typeStep(i: number) {
      if (cancelled) return;
      setDisplay(value.slice(0, i));
      if (i < value.length) {
        timeout = setTimeout(() => typeStep(i + 1), TYPE_MS);
      } else {
        timeout = setTimeout(() => deleteStep(i), HOLD_MS);
      }
    }

    function deleteStep(i: number) {
      if (cancelled) return;
      setDisplay(value.slice(0, i));
      if (i > 0) {
        timeout = setTimeout(() => deleteStep(i - 1), DELETE_MS);
      } else {
        timeout = setTimeout(() => typeStep(1), RESTART_MS);
      }
    }

    timeout = setTimeout(() => typeStep(1), RESTART_MS);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [value]);

  return (
    <span className={className}>
      <span aria-hidden="true">
        {display}
        <span className="animate-caret-blink ml-1 inline-block h-[0.85em] w-[0.08em] translate-y-[0.1em] bg-current align-middle" />
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
