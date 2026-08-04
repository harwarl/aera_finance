import type { WaitlistStatus } from "@/types";

export const WAITLIST_STATUS_LABEL: Record<WaitlistStatus, string> = {
  invited: "Invited",
  not_invited: "Not Invited",
};

export const WAITLIST_STATUS_DOT_CLASS: Record<WaitlistStatus, string> = {
  invited: "bg-accent",
  not_invited: "bg-foreground-faint",
};

export const WAITLIST_STATUS_TEXT_CLASS: Record<WaitlistStatus, string> = {
  invited: "text-accent",
  not_invited: "text-foreground-faint",
};
