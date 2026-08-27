"use client";

import { useCallback, useMemo, useState } from "react";
import { useAccount } from "wagmi";

export type VaultRecord = {
  address: `0x${string}`;
  createdAt: string;
};

function storageKey(owner: string) {
  return `aera:vault:${owner.toLowerCase()}`;
}

// Aera has no vault factory deployed yet (see the whitepaper's Roadmap:
// Phase 0), so a user's vault address can't come from a real deployment.
// This derives a stable, deterministic placeholder address from the
// owner's wallet address — same owner always gets the same "vault" — so
// the one-vault-per-user UI has something real-looking to point at until
// on-chain vault creation exists. Not a real key or checksum.
function deriveVaultAddress(owner: string): `0x${string}` {
  const lower = owner.toLowerCase();
  let hash = 0;
  for (let i = 0; i < lower.length; i++) {
    hash = (hash * 31 + lower.charCodeAt(i)) | 0;
  }
  const hex = (hash >>> 0).toString(16).padStart(8, "0");
  return `0x${hex.repeat(5).slice(0, 40)}` as `0x${string}`;
}

function readStoredVault(owner: string): VaultRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(storageKey(owner));
    return raw ? (JSON.parse(raw) as VaultRecord) : null;
  } catch {
    return null;
  }
}

export function useVault() {
  const { address } = useAccount();

  // Tracks a vault created during this session so the UI updates the
  // instant `createVault` runs, without needing an effect to re-read
  // storage. Scoped to the owner it was created for, so switching wallets
  // can't leak a stale "just created" vault onto a different address.
  const [justCreated, setJustCreated] = useState<{
    owner: string;
    record: VaultRecord;
  } | null>(null);

  const storedVault = useMemo(
    () => (address ? readStoredVault(address) : null),
    [address]
  );

  const vault =
    address && justCreated?.owner === address ? justCreated.record : storedVault;

  const createVault = useCallback(() => {
    if (!address) return null;
    const record: VaultRecord = {
      address: deriveVaultAddress(address),
      createdAt: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(storageKey(address), JSON.stringify(record));
    } catch {
      // localStorage unavailable (private mode, etc.) — the in-memory
      // `justCreated` override still lets the rest of this session see it.
    }
    setJustCreated({ owner: address, record });
    return record;
  }, [address]);

  return { vault, createVault };
}
