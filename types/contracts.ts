// The ABI only encodes `enum VaultTypes.AccountStatus` as a bare uint8 —
// Solidity ABIs never carry enum member names. These ordinals are a
// best-effort guess based on naming conventions elsewhere in the contract
// (selfPause, revokeAgentAccess, setAccountStatus) and have NOT been
// confirmed against the actual VaultTypes.sol source. Verify before
// trusting this for anything beyond a rough display label.
export enum VaultAccountStatus {
  Active = 0,
  Paused = 1,
  Revoked = 2,
  UnderReview = 3,
}

export const VAULT_ACCOUNT_STATUS_LABEL: Record<number, string> = {
  [VaultAccountStatus.Active]: "Active",
  [VaultAccountStatus.Paused]: "Paused",
  [VaultAccountStatus.Revoked]: "Revoked",
  [VaultAccountStatus.UnderReview]: "Under Review",
};

export type VaultRules = {
  maxTradeSizeBps: bigint;
  maxSlippageBps: bigint;
  maxTradesPerPeriod: bigint;
  periodDuration: bigint;
};
