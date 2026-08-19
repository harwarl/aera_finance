"use client";

import { useWaitForTransactionReceipt, useWriteContract, useReadContract } from "wagmi";
import { VAULT_ADDRESS } from "@/config/contracts";
import { vaultAbi } from "@/lib/contracts/vaultAbi";
import type { VaultRules } from "@/types/contracts";

const vaultContract = { address: VAULT_ADDRESS, abi: vaultAbi } as const;

type Address = `0x${string}`;

// ---------------------------------------------------------------------------
// Reads
// ---------------------------------------------------------------------------

export function useVaultBasisPoints() {
  return useReadContract({ ...vaultContract, functionName: "BASIS_POINTS" });
}

export function useVaultMaxFeeRateBps() {
  return useReadContract({ ...vaultContract, functionName: "MAX_FEE_RATE_BPS" });
}

export function useVaultMaxHeldAssets() {
  return useReadContract({ ...vaultContract, functionName: "MAX_HELD_ASSETS" });
}

export function useVaultNativeAddress() {
  return useReadContract({ ...vaultContract, functionName: "NATIVE" });
}

export function useVaultSwapTarget() {
  return useReadContract({ ...vaultContract, functionName: "swapTarget" });
}

export function useVaultOwner() {
  return useReadContract({ ...vaultContract, functionName: "owner" });
}

export function useVaultFeeRateBps() {
  return useReadContract({ ...vaultContract, functionName: "feeRateBps" });
}

export function useVaultIsAdmin(address?: Address) {
  return useReadContract({
    ...vaultContract,
    functionName: "isAdmin",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });
}

export function useVaultIsKeeper(address?: Address) {
  return useReadContract({
    ...vaultContract,
    functionName: "isKeeper",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });
}

export function useVaultApprovedAgent(accountOwner?: Address) {
  return useReadContract({
    ...vaultContract,
    functionName: "approvedAgents",
    args: accountOwner ? [accountOwner] : undefined,
    query: { enabled: Boolean(accountOwner) },
  });
}

export function useVaultAccountStatus(accountOwner?: Address) {
  return useReadContract({
    ...vaultContract,
    functionName: "getAccountStatus",
    args: accountOwner ? [accountOwner] : undefined,
    query: { enabled: Boolean(accountOwner) },
  });
}

export function useVaultAccountPortfolio(accountOwner?: Address) {
  return useReadContract({
    ...vaultContract,
    functionName: "getAccountPortfolio",
    args: accountOwner ? [accountOwner] : undefined,
    query: { enabled: Boolean(accountOwner) },
  });
}

export function useVaultHeldAssets(accountOwner?: Address) {
  return useReadContract({
    ...vaultContract,
    functionName: "getHeldAssets",
    args: accountOwner ? [accountOwner] : undefined,
    query: { enabled: Boolean(accountOwner) },
  });
}

export function useVaultRules(accountOwner?: Address) {
  return useReadContract({
    ...vaultContract,
    functionName: "getRules",
    args: accountOwner ? [accountOwner] : undefined,
    query: { enabled: Boolean(accountOwner) },
  });
}

export function useVaultBalance(accountOwner?: Address, asset?: Address) {
  return useReadContract({
    ...vaultContract,
    functionName: "getBalance",
    args: accountOwner && asset ? [accountOwner, asset] : undefined,
    query: { enabled: Boolean(accountOwner && asset) },
  });
}

export function useVaultFeesOwedToAdmin(asset?: Address) {
  return useReadContract({
    ...vaultContract,
    functionName: "feesOwedToAdmin",
    args: asset ? [asset] : undefined,
    query: { enabled: Boolean(asset) },
  });
}

export function useVaultFeesOwedToAdminBatch(assets: Address[]) {
  return useReadContract({
    ...vaultContract,
    functionName: "getFeesOwedToAdmin",
    args: [assets],
    query: { enabled: assets.length > 0 },
  });
}

export function useVaultTotalFeesCollected(asset?: Address) {
  return useReadContract({
    ...vaultContract,
    functionName: "totalFeesCollected",
    args: asset ? [asset] : undefined,
    query: { enabled: Boolean(asset) },
  });
}

// ---------------------------------------------------------------------------
// Writes
// ---------------------------------------------------------------------------
// One shared hook backs every mutation so callers get a consistent
// pending/confirming/confirmed/error shape instead of 16 near-identical
// useWriteContract wrappers. Each write function below just builds the
// {address, abi, functionName, args} config `writeContractAsync` expects —
// call it as `writeContractAsync(vaultWrite.deposit(asset, amount))`.
export function useVaultWrite() {
  const {
    writeContractAsync,
    data: hash,
    isPending,
    error,
    reset,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data: receipt,
  } = useWaitForTransactionReceipt({ hash });

  return { writeContractAsync, hash, isPending, isConfirming, isConfirmed, receipt, error, reset };
}

export const vaultWrite = {
  deposit: (asset: Address, amount: bigint, value?: bigint) =>
    ({
      ...vaultContract,
      functionName: "deposit",
      args: [asset, amount],
      value: value ?? BigInt(0),
    }) as const,
  withdraw: (asset: Address, amount: bigint) =>
    ({ ...vaultContract, functionName: "withdraw", args: [asset, amount] }) as const,
  withdrawAll: (asset: Address) =>
    ({ ...vaultContract, functionName: "withdrawAll", args: [asset] }) as const,
  approveAgent: (agent: Address) =>
    ({ ...vaultContract, functionName: "approveAgent", args: [agent] }) as const,
  revokeAgentAccess: () =>
    ({ ...vaultContract, functionName: "revokeAgentAccess", args: [] }) as const,
  selfPause: () =>
    ({ ...vaultContract, functionName: "selfPause", args: [] }) as const,
  updateRules: (rules: VaultRules) =>
    ({ ...vaultContract, functionName: "updateRules", args: [rules] }) as const,
  chargeFee: (account: Address) =>
    ({ ...vaultContract, functionName: "chargeFee", args: [account] }) as const,
  withdrawFees: (asset: Address, amount: bigint) =>
    ({ ...vaultContract, functionName: "withdrawFees", args: [asset, amount] }) as const,
  setFeeRate: (newFeeRateBps: bigint) =>
    ({ ...vaultContract, functionName: "setFeeRate", args: [newFeeRateBps] }) as const,
  setAdmin: (admin: Address, status: boolean) =>
    ({ ...vaultContract, functionName: "setAdmin", args: [admin, status] }) as const,
  setKeeper: (keeper: Address, status: boolean) =>
    ({ ...vaultContract, functionName: "setKeeper", args: [keeper, status] }) as const,
  setSwapTarget: (target: Address) =>
    ({ ...vaultContract, functionName: "setSwapTarget", args: [target] }) as const,
  setAccountStatus: (account: Address, newStatus: number) =>
    ({ ...vaultContract, functionName: "setAccountStatus", args: [account, newStatus] }) as const,
  transferOwnership: (newOwner: Address) =>
    ({ ...vaultContract, functionName: "transferOwnership", args: [newOwner] }) as const,
  renounceOwnership: () =>
    ({ ...vaultContract, functionName: "renounceOwnership", args: [] }) as const,
};
