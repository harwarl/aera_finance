"use client";

import { useAccount } from "wagmi";
import { isAdminAddress } from "@/config/roles";

export function useIsAdmin() {
  const { address } = useAccount();
  return isAdminAddress(address);
}
