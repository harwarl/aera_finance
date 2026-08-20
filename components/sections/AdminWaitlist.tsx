"use client";

import { useState } from "react";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { Modal } from "@/components/shared/Modal";
import { Pagination } from "@/components/shared/Pagination";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { waitlistEntries } from "@/config/admin";
import { formatRelativeTime } from "@/lib/decisions";
import {
  WAITLIST_STATUS_DOT_CLASS,
  WAITLIST_STATUS_LABEL,
  WAITLIST_STATUS_TEXT_CLASS,
} from "@/lib/waitlist";
import type { WaitlistStatus } from "@/types";

const PAGE_SIZE = 10;

type Filter = "all" | WaitlistStatus;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "not_invited", label: "Not Invited" },
  { value: "invited", label: "Invited" },
];

export function AdminWaitlist() {
  const [modalOpen, setModalOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<Filter>("all");

  const notInvited = waitlistEntries.filter(
    (entry) => entry.status === "not_invited"
  );

  const counts: Record<Filter, number> = {
    all: waitlistEntries.length,
    invited: waitlistEntries.length - notInvited.length,
    not_invited: notInvited.length,
  };

  const filtered =
    filter === "all"
      ? waitlistEntries
      : waitlistEntries.filter((entry) => entry.status === filter);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function changeFilter(next: Filter) {
    setFilter(next);
    setPage(1);
  }

  function closeModal() {
    setModalOpen(false);
    setSubject("");
    setMessage("");
    setSent(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <CornerBrackets>
      <div className="border border-border-muted bg-background-elevated/50 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
            Waitlist · {waitlistEntries.length} Signups
          </span>
          <Button
            size="sm"
            onClick={() => setModalOpen(true)}
            disabled={notInvited.length === 0}
          >
            Email Not Invited · {notInvited.length}
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {FILTERS.map((item) => {
            const active = filter === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => changeFilter(item.value)}
                className={cn(
                  "border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors",
                  active
                    ? "border-accent text-accent"
                    : "border-border-muted text-foreground-faint hover:text-foreground-muted"
                )}
              >
                {item.label} · {counts[item.value]}
              </button>
            );
          })}
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border-muted">
                <th className="py-2 pr-4 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  Name
                </th>
                <th className="py-2 pr-4 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  Email
                </th>
                <th className="py-2 pr-4 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  Status
                </th>
                <th className="py-2 text-right font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((entry) => (
                <tr key={entry.id} className="border-b border-border-muted last:border-0">
                  <td className="py-3 pr-4 text-sm font-bold text-foreground">
                    {entry.name}
                  </td>
                  <td className="py-3 pr-4 font-mono text-xs text-foreground-muted">
                    {entry.email}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={cn(
                        "flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest",
                        WAITLIST_STATUS_TEXT_CLASS[entry.status]
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          WAITLIST_STATUS_DOT_CLASS[entry.status]
                        )}
                      />
                      {WAITLIST_STATUS_LABEL[entry.status]}
                    </span>
                  </td>
                  <td className="py-3 text-right font-mono text-xs text-foreground-faint">
                    {formatRelativeTime(entry.joinedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {paginated.length === 0 ? (
            <p className="py-8 text-center font-mono text-xs uppercase tracking-widest text-foreground-faint">
              No signups for this filter
            </p>
          ) : null}
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <Modal open={modalOpen} onClose={closeModal} title="Email Not Invited">
        {sent ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm leading-relaxed text-foreground-muted">
              This would be queued to send to all {notInvited.length}{" "}
              not-yet-invited addresses once an email provider is connected —
              nothing was actually sent.
            </p>
            <Button
              type="button"
              variant="secondary"
              onClick={closeModal}
              className="w-full"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                Subject
              </label>
              <input
                required
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Aera Finance is opening up access"
                className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground-faint focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="You're getting early access to..."
                className="mt-2 w-full resize-none border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground-faint focus:border-accent focus:outline-none"
              />
            </div>
            <p className="text-xs leading-relaxed text-foreground-faint">
              This sends only to the {notInvited.length} addresses not yet
              invited — invited signups are skipped. There is no undo once
              dispatched.
            </p>
            <Button type="submit" className="w-full">
              Authorize Send
            </Button>
          </form>
        )}
      </Modal>
    </CornerBrackets>
  );
}
