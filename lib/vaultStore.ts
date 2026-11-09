"use client";

import { useSyncExternalStore } from "react";

/**
 * Which wallets own a vault. There is no vault factory contract yet, so the
 * demo "Create vault" step on /connect records the vault in localStorage,
 * keyed by owner address.
 *
 * TODO: replace with a read from the vault factory (e.g. `vaultOf(owner)`)
 * once it ships. Everything else (gate, connect skip rule) goes through
 * useVault()/saveVault(), so this is the only file that needs to change.
 */

export type VaultRecord = { vault: string; createdAt: number; sample: true };

const KEY = (owner: string) => `aera:vault:${owner.toLowerCase()}`;
const EVENT = "aera:vault-change";

function read(owner?: string): string | null {
  if (!owner) return null;
  try {
    return localStorage.getItem(KEY(owner));
  } catch {
    return null;
  }
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

/** The vault record for `owner`, or null. `undefined` until on the client. */
export function useVault(owner?: string): VaultRecord | null | undefined {
  const raw = useSyncExternalStore(subscribe, () => read(owner), () => undefined);
  if (raw === undefined) return undefined;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as VaultRecord;
  } catch {
    return null;
  }
}

/** Sample vault address from the design, until the factory returns a real one. */
export const SAMPLE_VAULT = "0x7a…c3";

export function saveVault(owner: string) {
  const rec: VaultRecord = { vault: SAMPLE_VAULT, createdAt: Date.now(), sample: true };
  try {
    localStorage.setItem(KEY(owner), JSON.stringify(rec));
  } catch {
    /* storage blocked: the gate will send the user back to /connect */
  }
  window.dispatchEvent(new Event(EVENT));
}

export const shortAddr = (a?: string, tail = 4) => (a ? `${a.slice(0, 4)}…${a.slice(-tail)}` : "");
