"use client";

import { useState } from "react";
import { DashboardCard } from "@/components/shared/DashboardCard";
import { SegmentedToggle } from "@/components/shared/SegmentedToggle";
import { Button } from "@/components/ui/Button";
import { portfolioRules } from "@/config/dashboard";
import type {
  NotificationEvent,
  RebalanceSensitivity,
  RiskTolerance,
  SectorPreference,
  SectorStance,
} from "@/types";

const RISK_OPTIONS: { value: RiskTolerance; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const SENSITIVITY_OPTIONS: { value: RebalanceSensitivity; label: string }[] = [
  { value: "conservative", label: "Conservative" },
  { value: "balanced", label: "Balanced" },
  { value: "responsive", label: "Responsive" },
];

const STANCE_OPTIONS: { value: SectorStance; label: string }[] = [
  { value: "avoid", label: "Avoid" },
  { value: "neutral", label: "Neutral" },
  { value: "favor", label: "Favor" },
];

const NOTIFICATION_OPTIONS: {
  value: NotificationEvent;
  label: string;
  description: string;
}[] = [
  {
    value: "every_rebalance",
    label: "Every Rebalance",
    description: "Get notified any time the agent executes a trade.",
  },
  {
    value: "held_for_review",
    label: "Held for Review",
    description: "Only notify when something needs your attention.",
  },
  {
    value: "weekly_summary",
    label: "Weekly Summary",
    description: "A single digest of activity, sent once a week.",
  },
];

export function RulesEditor() {
  const [riskTolerance, setRiskTolerance] = useState<RiskTolerance>(
    portfolioRules.riskTolerance
  );
  const [targetCryptoPct, setTargetCryptoPct] = useState(
    portfolioRules.targetCryptoAllocationPct
  );
  const [sectorPreferences, setSectorPreferences] = useState<
    SectorPreference[]
  >(portfolioRules.sectorPreferences);
  const [rebalanceSensitivity, setRebalanceSensitivity] =
    useState<RebalanceSensitivity>(portfolioRules.rebalanceSensitivity);
  const [notifications, setNotifications] = useState(
    portfolioRules.notifications
  );
  const [saved, setSaved] = useState(false);

  function updateStance(sector: string, stance: SectorStance) {
    setSectorPreferences((prev) =>
      prev.map((pref) => (pref.sector === sector ? { ...pref, stance } : pref))
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
  }

  if (saved) {
    return (
      <DashboardCard className="flex flex-col items-center gap-4 text-center">
        <p className="max-w-[42ch] text-sm leading-relaxed text-foreground-muted">
          Your updated rules would be submitted to the vault contract here
          once it&apos;s live — this is a placeholder, nothing has changed
          yet.
        </p>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setSaved(false)}
        >
          Continue Editing
        </Button>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
            Risk Tolerance
          </label>
          <div className="mt-2 max-w-sm">
            <SegmentedToggle
              options={RISK_OPTIONS}
              value={riskTolerance}
              onChange={setRiskTolerance}
            />
          </div>
        </div>

        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
            Target Allocation
          </label>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={targetCryptoPct}
            onChange={(e) => setTargetCryptoPct(Number(e.target.value))}
            className="mt-4 w-full max-w-md accent-accent"
          />
          <div className="mt-2 flex max-w-md justify-between font-mono text-xs text-foreground-muted">
            <span>Crypto Exposure · {targetCryptoPct}%</span>
            <span>Yield · {100 - targetCryptoPct}%</span>
          </div>
        </div>

        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
            Sector Preferences
          </label>
          <div className="mt-3 flex flex-col gap-2">
            {sectorPreferences.map((pref) => (
              <div
                key={pref.sector}
                className="flex flex-col gap-2 rounded-xl border border-border-muted bg-background/40 p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-sm font-bold text-foreground">
                  {pref.sector}
                </span>
                <SegmentedToggle
                  options={STANCE_OPTIONS}
                  value={pref.stance}
                  onChange={(stance) => updateStance(pref.sector, stance)}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
            Rebalance Sensitivity
          </label>
          <p className="mt-1.5 text-xs leading-relaxed text-foreground-faint">
            How much drift from your target allocation triggers a rebalance.
          </p>
          <div className="mt-2 max-w-md">
            <SegmentedToggle
              options={SENSITIVITY_OPTIONS}
              value={rebalanceSensitivity}
              onChange={setRebalanceSensitivity}
            />
          </div>
        </div>

        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
            Notification Preferences
          </label>
          <div className="mt-3 flex flex-col gap-2">
            {NOTIFICATION_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-border-muted bg-background/40 p-3"
              >
                <input
                  type="checkbox"
                  checked={notifications[option.value]}
                  onChange={(e) =>
                    setNotifications((prev) => ({
                      ...prev,
                      [option.value]: e.target.checked,
                    }))
                  }
                  className="mt-0.5 h-4 w-4 accent-accent"
                />
                <span>
                  <span className="block text-sm font-bold text-foreground">
                    {option.label}
                  </span>
                  <span className="block text-xs text-foreground-faint">
                    {option.description}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <p className="text-xs leading-relaxed text-foreground-faint">
          These are your preferences — the agent operates inside them, and
          you can change them any time. They&apos;re separate from the
          system&apos;s hard constraints below, which nobody can edit.
        </p>

        <Button type="submit" className="w-full sm:w-auto">
          Save Changes
        </Button>
      </form>
    </DashboardCard>
  );
}
