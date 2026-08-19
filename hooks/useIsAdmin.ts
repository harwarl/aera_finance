"use client";

import { useAccount } from "wagmi";
import { isAdminAddress } from "@/config/roles";
import { useVaultIsAdmin } from "@/hooks/useVaultContract";

// Prefers the real on-chain `isAdmin(address)` check once a vault is
// deployed; falls back to the local config allowlist while
// VAULT_ADDRESS is still the zero address (or the read hasn't resolved
// yet), so /admin still works before there's a real contract to ask.
export function useIsAdmin() {
  const { address } = useAccount();
  const { data: onChainIsAdmin, isSuccess } = useVaultIsAdmin(address);

  if (isSuccess) return Boolean(onChainIsAdmin);
  return isAdminAddress(address);
}
