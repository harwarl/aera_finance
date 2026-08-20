// The ABI only encodes `enum VaultTypes.AccountStatus` as a bare uint8 —
// Solidity ABIs never carry enum member names. The Vault.sol source
// confirms two real member names in use (`Active`, `PausedByUser`, set by
// deposit()/selfResume() and selfPause() respectively) — those two are
// trustworthy. There may be additional members (e.g. an admin-only
// suspended state) that this source excerpt doesn't reveal, and the exact
// ordinal values are still unconfirmed since VaultTypes.sol itself hasn't
// been seen. Treat anything beyond Active/PausedByUser as unknown.
export enum VaultAccountStatus {
  Active = 0,
  PausedByUser = 1,
}

export const VAULT_ACCOUNT_STATUS_LABEL: Record<number, string> = {
  [VaultAccountStatus.Active]: "Active",
  [VaultAccountStatus.PausedByUser]: "Paused by User",
};

export type VaultRules = {
  maxTradeSizeBps: bigint;
  maxSlippageBps: bigint;
  maxTradesPerPeriod: bigint;
  periodDuration: bigint;
};
