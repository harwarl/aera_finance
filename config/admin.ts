import type { ProtocolFeeSummary, SystemErrorItem, SystemErrorSource, WaitlistEntry } from "@/types";

// Everything in this file is placeholder data for building out the admin
// UI — there is no live waitlist store, email provider, or treasury
// contract yet (see the whitepaper's Roadmap: Phase 0). Replace with real
// reads once those systems exist.

const NAMED_ENTRIES: WaitlistEntry[] = [
  { id: "wl-1", name: "Jordan Ashby", email: "jordan.ashby@gmail.com", joinedAt: "2026-07-27T10:12:00Z", status: "invited" },
  { id: "wl-2", name: "Priya Nair", email: "priya.nair@outlook.com", joinedAt: "2026-07-26T22:04:00Z", status: "invited" },
  { id: "wl-3", name: "Marcus Webb", email: "marcus.webb@proton.me", joinedAt: "2026-07-26T15:47:00Z", status: "not_invited" },
  { id: "wl-4", name: "Sofia Delgado", email: "sofia.delgado@icloud.com", joinedAt: "2026-07-25T09:31:00Z", status: "invited" },
  { id: "wl-5", name: "Tomás Reyes", email: "tomas.reyes@gmail.com", joinedAt: "2026-07-24T19:58:00Z", status: "not_invited" },
  { id: "wl-6", name: "Emeka Obi", email: "emeka.obi@yahoo.com", joinedAt: "2026-07-23T13:22:00Z", status: "invited" },
  { id: "wl-7", name: "Hana Kobayashi", email: "hana.kobayashi@gmail.com", joinedAt: "2026-07-22T08:05:00Z", status: "not_invited" },
  { id: "wl-8", name: "Liam Foster", email: "liam.foster@outlook.com", joinedAt: "2026-07-21T17:40:00Z", status: "not_invited" },
  { id: "wl-9", name: "Aisha Rahman", email: "aisha.rahman@gmail.com", joinedAt: "2026-07-20T11:15:00Z", status: "invited" },
  { id: "wl-10", name: "Diego Morales", email: "diego.morales@icloud.com", joinedAt: "2026-07-19T16:29:00Z", status: "not_invited" },
  { id: "wl-11", name: "Grace Lindqvist", email: "grace.lindqvist@outlook.com", joinedAt: "2026-07-18T07:52:00Z", status: "not_invited" },
  { id: "wl-12", name: "Noah Bergström", email: "noah.bergstrom@gmail.com", joinedAt: "2026-07-17T20:03:00Z", status: "not_invited" },
  { id: "wl-13", name: "Fatima Al-Sayed", email: "fatima.alsayed@proton.me", joinedAt: "2026-07-16T14:47:00Z", status: "not_invited" },
  { id: "wl-14", name: "Ethan Park", email: "ethan.park@yahoo.com", joinedAt: "2026-07-15T09:18:00Z", status: "not_invited" },
];

// Additional signups beyond the named batch above, generated to give the
// admin waitlist table enough rows to exercise pagination realistically.
const FILLER_FIRST_NAMES = [
  "Ava", "Mason", "Isla", "Leo", "Zara", "Omar", "Nina", "Kai", "Ruth",
  "Theo", "Ines", "Felix", "Mira", "Jonas", "Aya", "Rex", "Talia", "Boris",
  "Nadia", "Enzo",
];
const FILLER_LAST_NAMES = [
  "Chen", "Okafor", "Larsson", "Petrova", "Haddad", "Kowalski", "Duarte",
  "Ivanov", "Silva", "Novak", "Haas", "Osei", "Lindgren", "Costa", "Fischer",
];
const FILLER_DOMAINS = ["gmail.com", "outlook.com", "icloud.com", "proton.me", "yahoo.com"];
const FILLER_BASE_TIME = new Date("2026-07-15T09:18:00Z").getTime();
const FILLER_COUNT = 49;

const FILLER_ENTRIES: WaitlistEntry[] = Array.from(
  { length: FILLER_COUNT },
  (_, i) => {
    const first = FILLER_FIRST_NAMES[i % FILLER_FIRST_NAMES.length];
    const last = FILLER_LAST_NAMES[(i * 3) % FILLER_LAST_NAMES.length];
    const domain = FILLER_DOMAINS[i % FILLER_DOMAINS.length];
    return {
      id: `wl-${NAMED_ENTRIES.length + 1 + i}`,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@${domain}`,
      joinedAt: new Date(
        FILLER_BASE_TIME - (i + 1) * 20 * 60 * 60 * 1000
      ).toISOString(),
      status: i % 4 === 0 ? "invited" : "not_invited",
    };
  }
);

export const waitlistEntries: WaitlistEntry[] = [
  ...NAMED_ENTRIES,
  ...FILLER_ENTRIES,
];

export const protocolFees: ProtocolFeeSummary = {
  totalAum: 4_812_940.55,
  accruedFees: 9_684.22,
  withdrawnToDate: 32_150.0,
  treasuryAddress: "0x9F2a7c1B4e8D5a3F60c2B7d9E4a1F8c3D5b6A902",
};

// Placeholder error log — mirrors the shape of the not-yet-live error-log
// API (paginated items + total). There is no live error pipeline yet; swap
// this for the real endpoint once it exists.
const NAMED_ERRORS: SystemErrorItem[] = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    account: "0x1F3a9C2e7B4d6F805A2c1E9b3D7f4a6C8e0B2d15",
    kind: "balance_mismatch",
    message: "On-chain balance diverged from internal ledger by 0.4%.",
    detail:
      "Reconciliation job flagged a discrepancy between the vault's reported USDT balance and the last known ledger snapshot after a rebalance settled. Auto-resolved on next sync; no funds affected.",
    occurred_at: "2026-08-19T09:12:41.000Z",
    source: "Reconciliation",
  },
  {
    id: "9c3e2d1a-4b6f-4a8e-9c2d-1a4b6f4a8e9c",
    account: "0x7A4d1F8c3E6b9D2a5F0c7E4b1D8a3F6c9E2b5D71",
    kind: "slippage_exceeded",
    message: "Proposed rebalance exceeded the account's max slippage limit.",
    detail:
      "The agent's proposed BTC→USDT swap would have cleared at 0.71% slippage against a 0.5% limit. Trade was blocked before execution — no funds moved.",
    occurred_at: "2026-08-19T02:47:15.000Z",
    source: "Rebalance",
  },
  {
    id: "5e8b1c4d-2f7a-49e3-8b1c-4d2f7a49e38b",
    account: "",
    kind: "provider_timeout",
    message: "Primary RPC provider timed out after 12s.",
    detail:
      "Failed over to the secondary RPC endpoint automatically. No account-level impact — this only affects read latency, not fund safety.",
    occurred_at: "2026-08-18T22:03:58.000Z",
    source: "RPC",
  },
  {
    id: "b2d6f9a3-1c8e-47d5-b2d6-f9a31c8e47d5",
    account: "0x3C9b6E2a8D1f4C7e0A3b9D6f2C8e1A4b7D0f3C96",
    kind: "allowance_insufficient",
    message: "Deposit reverted — token allowance below requested amount.",
    detail:
      "The connected wallet approved less USDT than the deposit call requested. The user needs to re-approve before retrying; nothing was deducted.",
    occurred_at: "2026-08-18T18:34:02.000Z",
    source: "Deposit",
  },
  {
    id: "e1a4c7f0-9d3b-46a8-e1a4-c7f09d3b46a8",
    account: "0x8E2b5D8a1F4c7E0b3D6a9F2c5E8b1D4a7F0c3E86",
    kind: "cooldown_active",
    message: "Withdrawal blocked — account still inside the post-deposit cooldown.",
    detail:
      "This account deposited less than the configured cooldown window ago. Withdrawal will succeed automatically once the cooldown clears.",
    occurred_at: "2026-08-18T11:20:47.000Z",
    source: "Withdrawal",
  },
  {
    id: "d4f7b0c3-6e9a-42d5-d4f7-b0c36e9a42d5",
    account: "0x4B7e0A3d6C9f2B5e8A1d4C7f0B3e6A9d2C5f8B41",
    kind: "signature_timeout",
    message: "Agent's proposed trade expired waiting for keeper confirmation.",
    detail:
      "Proposal window closed after 90s with no keeper signature. Re-queued for the next rebalance cycle — no trade occurred.",
    occurred_at: "2026-08-17T20:58:33.000Z",
    source: "Agent",
  },
  {
    id: "a6c9f2e5-3b8d-40a7-a6c9-f2e53b8d40a7",
    account: "0x9D2c5F8b1E4a7D0c3F6b9E2a5D8c1F4b7E0a3D69",
    kind: "insufficient_liquidity",
    message: "Rebalance skipped — insufficient DEX liquidity at target size.",
    detail:
      "Available liquidity for the proposed ETH→USDT leg would have moved price beyond acceptable bounds. Trade deferred to the next window.",
    occurred_at: "2026-08-17T13:41:09.000Z",
    source: "Rebalance",
  },
  {
    id: "f0b3e6a9-2c5f-48b1-f0b3-e6a92c5f48b1",
    account: "0x2E5b8D1a4F7c0E3b6D9a2F5c8E1b4D7a0F3c6E92",
    kind: "unsupported_asset",
    message: "Deposit reverted — asset not on the approved whitelist.",
    detail:
      "A deposit call targeted an asset address outside the vault's whitelist. Contract-level guard rejected it before any transfer occurred.",
    occurred_at: "2026-08-16T15:07:52.000Z",
    source: "Deposit",
  },
];

const FILLER_ERROR_SOURCES: SystemErrorSource[] = [
  "Reconciliation",
  "Agent",
  "Rebalance",
  "Deposit",
  "Withdrawal",
  "RPC",
];
const FILLER_ERROR_KINDS: Record<SystemErrorSource, string[]> = {
  Reconciliation: ["balance_mismatch", "stale_snapshot"],
  Agent: ["proposal_rejected", "signature_timeout"],
  Rebalance: ["slippage_exceeded", "insufficient_liquidity"],
  Deposit: ["allowance_insufficient", "unsupported_asset"],
  Withdrawal: ["balance_insufficient", "cooldown_active"],
  RPC: ["provider_timeout", "rate_limited"],
};
const FILLER_ERROR_BASE_TIME = new Date("2026-08-16T15:07:52.000Z").getTime();
const FILLER_ERROR_COUNT = 18;

// Deterministic 40-hex-char address, just for a plausible-looking mock
// account — not a real key or checksum.
function fillerAddress(seed: number) {
  const hex = ((seed * 2654435761) % 0xffffffffff).toString(16).padStart(10, "0");
  return `0x${hex.repeat(4).slice(0, 40)}`;
}

const FILLER_ERRORS: SystemErrorItem[] = Array.from(
  { length: FILLER_ERROR_COUNT },
  (_, i) => {
    const source = FILLER_ERROR_SOURCES[i % FILLER_ERROR_SOURCES.length];
    const kinds = FILLER_ERROR_KINDS[source];
    const kind = kinds[i % kinds.length];
    const isSystemLevel = source === "RPC" && i % 2 === 0;
    return {
      id: `9c3e2d1a-4b6f-4a8e-9c2d-${(100000 + i).toString().padStart(6, "0")}a8e9`,
      account: isSystemLevel ? "" : fillerAddress(i + 1),
      kind,
      message: `${kind.replace(/_/g, " ")} — flagged during routine ${source.toLowerCase()} processing.`,
      detail: `Auto-generated placeholder entry for ${source} error #${i + 1}, kind "${kind}". Replace with real error-log data once the pipeline is live.`,
      occurred_at: new Date(
        FILLER_ERROR_BASE_TIME - (i + 1) * 9 * 60 * 60 * 1000
      ).toISOString(),
      source,
    };
  }
);

export const systemErrors: SystemErrorItem[] = [...NAMED_ERRORS, ...FILLER_ERRORS];
