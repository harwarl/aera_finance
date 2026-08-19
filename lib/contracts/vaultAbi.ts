// ABI for the Aera vault contract. Copied directly from the compiled
// artifact — do not hand-edit. `rebalance` is included for completeness
// (it's part of the real contract surface) but the app deliberately never
// calls it from the client: rebalancing is the agent/backend's job, driven
// by the keeper role, not something the UI triggers.
export const vaultAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    name: "BASIS_POINTS",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MAX_FEE_RATE_BPS",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MAX_HELD_ASSETS",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "NATIVE",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approveAgent",
    inputs: [{ name: "agent", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "approvedAgents",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "chargeFee",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deposit",
    inputs: [
      { name: "asset", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "feeRateBps",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "feesOwedToAdmin",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAccountPortfolio",
    inputs: [
      { name: "accountOwner", type: "address", internalType: "address" },
    ],
    outputs: [
      { name: "assets", type: "address[]", internalType: "address[]" },
      { name: "balances", type: "uint256[]", internalType: "uint256[]" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAccountStatus",
    inputs: [
      { name: "accountOwner", type: "address", internalType: "address" },
    ],
    outputs: [
      {
        name: "",
        type: "uint8",
        internalType: "enum VaultTypes.AccountStatus",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getBalance",
    inputs: [
      { name: "accountOwner", type: "address", internalType: "address" },
      { name: "asset", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getFeesOwedToAdmin",
    inputs: [{ name: "assets", type: "address[]", internalType: "address[]" }],
    outputs: [
      { name: "amounts", type: "uint256[]", internalType: "uint256[]" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getHeldAssets",
    inputs: [
      { name: "accountOwner", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRules",
    inputs: [
      { name: "accountOwner", type: "address", internalType: "address" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct VaultTypes.Rules",
        components: [
          { name: "maxTradeSizeBps", type: "uint256", internalType: "uint256" },
          { name: "maxSlippageBps", type: "uint256", internalType: "uint256" },
          {
            name: "maxTradesPerPeriod",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "periodDuration", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isAdmin",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isKeeper",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "rebalance",
    inputs: [
      { name: "accountAddress", type: "address", internalType: "address" },
      { name: "fromAsset", type: "address", internalType: "address" },
      { name: "toAsset", type: "address", internalType: "address" },
      { name: "amountIn", type: "uint256", internalType: "uint256" },
      { name: "minAmountOut", type: "uint256", internalType: "uint256" },
      { name: "swapData", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "revokeAgentAccess",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "selfPause",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setAccountStatus",
    inputs: [
      { name: "account", type: "address", internalType: "address" },
      {
        name: "newStatus",
        type: "uint8",
        internalType: "enum VaultTypes.AccountStatus",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setAdmin",
    inputs: [
      { name: "admin", type: "address", internalType: "address" },
      { name: "status", type: "bool", internalType: "bool" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setFeeRate",
    inputs: [
      { name: "newFeeRateBps", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setKeeper",
    inputs: [
      { name: "keeper", type: "address", internalType: "address" },
      { name: "status", type: "bool", internalType: "bool" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setSwapTarget",
    inputs: [{ name: "target", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "swapTarget",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalFeesCollected",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateRules",
    inputs: [
      {
        name: "newRules",
        type: "tuple",
        internalType: "struct VaultTypes.Rules",
        components: [
          { name: "maxTradeSizeBps", type: "uint256", internalType: "uint256" },
          { name: "maxSlippageBps", type: "uint256", internalType: "uint256" },
          {
            name: "maxTradesPerPeriod",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "periodDuration", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [
      { name: "asset", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawAll",
    inputs: [{ name: "asset", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawFees",
    inputs: [
      { name: "asset", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;
