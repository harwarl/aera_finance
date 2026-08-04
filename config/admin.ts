import type { ProtocolFeeSummary, WaitlistEntry } from "@/types";

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
