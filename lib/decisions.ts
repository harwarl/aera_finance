import type { DecisionStatus } from "@/types";

export const STATUS_LABEL: Record<DecisionStatus, string> = {
  executed: "Executed",
  blocked: "Blocked",
  review: "Held for Review",
};

export const STATUS_DOT_CLASS: Record<DecisionStatus, string> = {
  executed: "bg-accent",
  blocked: "bg-danger",
  review: "bg-foreground-faint",
};

export const STATUS_TEXT_CLASS: Record<DecisionStatus, string> = {
  executed: "text-accent",
  blocked: "text-danger",
  review: "text-foreground-faint",
};

export function formatRelativeTime(isoTimestamp: string, now = Date.now()) {
  const diffMs = now - new Date(isoTimestamp).getTime();
  const diffMinutes = Math.round(diffMs / 60_000);

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
}
