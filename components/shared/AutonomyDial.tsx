"use client";

import { useState } from "react";

// The interactive core of the old standalone "Control" section, pulled out
// so the same live dial can sit inside a Platform item card as well as (if
// ever needed again) a full-width section. One continuous dial rather than
// three named modes — there's no fixed "Advisor / Copilot / Autopilot" tier
// to pick, just a slider (0-100) that sets how much room the agent has,
// with every derived number below it recomputed live off the same value.
// React's onChange for a range input already fires on every drag tick (not
// just on release), so a plain controlled input gives the "live, not
// committed on release" feel without any extra event wiring.
//
// The drift-threshold formula (5.5% at 0 down to 0.5% at 100) and the
// de-risk cutover (75) are placeholders standing in for real policy-engine
// numbers — flagged here rather than presented as fact.
const DEFAULT_VALUE = 45;
const DRIFT_MAX = 5.5; // at slider = 0
const DRIFT_MIN = 0.5; // at slider = 100
const DERISK_THRESHOLD = 75;

function driftThreshold(value: number) {
  return DRIFT_MAX - (value / 100) * (DRIFT_MAX - DRIFT_MIN);
}

export function AutonomyDial() {
  const [value, setValue] = useState(DEFAULT_VALUE);

  const signOffPct = 100 - value;
  const autoPct = value;
  const drift = driftThreshold(value);
  const derisksImmediately = value >= DERISK_THRESHOLD;

  return (
    <div className="w-full rounded-2xl border border-border-muted bg-background-elevated/40 p-6 sm:p-8">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
        <span>Manual</span>
        <span>Autonomous</span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="autonomy-slider mt-4 w-full"
        style={{
          background: `linear-gradient(to right, var(--accent) ${value}%, var(--border-color) ${value}%)`,
        }}
        aria-label="Agent autonomy"
      />

      <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-background">
        <div className="flex h-full w-full">
          <div
            className="h-full bg-foreground-faint transition-[width] duration-150 ease-out"
            style={{ width: `${signOffPct}%` }}
          />
          <div
            className="h-full bg-accent transition-[width] duration-150 ease-out"
            style={{ width: `${autoPct}%` }}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-foreground-muted">
          Needs your sign-off:{" "}
          <span className="font-bold text-foreground transition-opacity duration-150">
            {signOffPct}%
          </span>
        </span>
        <span className="text-foreground-muted">
          Executes on its own:{" "}
          <span className="font-bold text-accent transition-opacity duration-150">
            {autoPct}%
          </span>
        </span>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border-muted bg-background-subtle p-5">
          <p className="text-sm leading-relaxed text-foreground-muted">
            Rebalances beyond{" "}
            <span className="font-bold text-accent transition-opacity duration-150">
              {drift.toFixed(1)}%
            </span>{" "}
            drift execute without waiting on you.
          </p>
        </div>
        <div className="rounded-xl border border-border-muted bg-background-subtle p-5">
          <p className="text-sm leading-relaxed text-foreground-muted">
            {derisksImmediately
              ? "De-risking executes immediately, still bounded by your risk floor."
              : "De-risking still waits for your approval at this setting."}
          </p>
        </div>
      </div>
    </div>
  );
}
