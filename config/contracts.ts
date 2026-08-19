// Contract wiring — no vault has been deployed yet, so these default to
// the zero address. Set the real values via env vars once a vault exists;
// until then, every contract call in the UI will revert/fail loudly at
// the zero address, which is the honest behavior (nothing here silently
// pretends to work against a contract that isn't there).
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as const;

export const VAULT_ADDRESS = (process.env.NEXT_PUBLIC_VAULT_ADDRESS ??
  ZERO_ADDRESS) as `0x${string}`;

// The address the connect flow's "grant access" step approves as the
// vault's manager — i.e. the Aera agent itself.
export const AGENT_ADDRESS = (process.env.NEXT_PUBLIC_AGENT_ADDRESS ??
  ZERO_ADDRESS) as `0x${string}`;

export type ApprovedAsset = {
  symbol: string;
  name: string;
  address: `0x${string}`;
  decimals: number;
  isNative: boolean;
};

// The only assets Deposit/Withdraw are allowed to touch — this mirrors the
// vault's own asset whitelist (see "Supported Assets" on the Security
// page). ETH deposits/withdraws use the contract's NATIVE sentinel,
// address(0); USDT is a placeholder address until the real deployed
// token is known.
export const APPROVED_ASSETS: ApprovedAsset[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    address: ZERO_ADDRESS,
    decimals: 18,
    isNative: true,
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    address: (process.env.NEXT_PUBLIC_USDT_ADDRESS ?? ZERO_ADDRESS) as `0x${string}`,
    decimals: 6,
    isNative: false,
  },
];
