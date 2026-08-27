import type {
  FaqItem,
  IntegrationItem,
  NavLink,
  SecurityBadge,
  StatItem,
  StepItem,
} from "@/types";

export const siteConfig = {
  name: "Atlas",
  tagline: "Execution. Explained. On-chain.",
  description:
    "Aera is an AI agent that manages a portfolio of tokenized real stocks and on-chain yield, built on Robinhood Chain — rebalancing, executing trades, and explaining every decision in plain language.",
};

export const navLinks: NavLink[] = [
  { label: "Product", href: "#solution" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
  { label: "Whitepaper", href: "/whitepaper" },
  { label: "Waitlist", href: "/waitlist" },
  { label: "Roadmap", href: "/roadmap" },
];

export const integrations: IntegrationItem[] = [
  { name: "Robinhood Chain" },
  { name: "1inch" },
  { name: "0x" },
  { name: "Morpho" },
];

export const stats: StatItem[] = [
  { value: "24/7", label: "Portfolio monitoring, no downtime" },
  { value: "<400ms", label: "Median decision latency" },
  { value: "0", label: "Manual trades required" },
  { value: "100%", label: "Decisions explained in plain language" },
];

export const steps: StepItem[] = [
  {
    index: "01",
    title: "Analyze",
    description:
      "Aera reads your vault's holdings, Stock Token prices, and available yield rates, continuously and in real time.",
  },
  {
    index: "02",
    title: "Decide",
    description:
      "The agent scores rebalancing and yield-routing opportunities against your target allocation and builds a proposal.",
  },
  {
    index: "03",
    title: "Execute",
    description:
      "Proposals that clear your on-chain limits route through Robinhood Chain liquidity automatically. No manual signing.",
  },
  {
    index: "04",
    title: "Explain",
    description:
      "Every action is logged with a plain-language rationale you can read, question, and revoke access over at any time.",
  },
];

export const securityBadges: SecurityBadge[] = [
  {
    title: "Restricted manager role",
    description:
      "The agent can only call a narrow rebalance function on your vault. it cannot access funds broadly.",
  },
  {
    title: "Non-custodial vault",
    description:
      "Funds sit in a smart contract only you can withdraw from. It is never held by Aera the company.",
  },
  {
    title: "Hard on-chain constraints",
    description:
      "Spending limits, an approved asset list, and rate limits are enforced in the contract, not a policy document.",
  },
  {
    title: "MPC / multisig signing",
    description:
      "The agent's signing key is secured through multi-party infrastructure, not a single hot wallet.",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "Does Aera ever take custody of my funds?",
    answer:
      "No. Your funds stay in a smart contract vault that only you can withdraw from. Aera's agent holds a narrow manager role that can only call a constrained rebalance function within limits you've set.",
  },
  {
    question: "Which assets does Aera support?",
    answer:
      "Aera manages Stock Tokens, tokenized real stocks and ETFs issued on Robinhood Chain, alongside a small number of approved on-chain yield positions, such as Morpho-based stablecoin markets.",
  },
  {
    question: "How does Aera decide when to rebalance?",
    answer:
      "Aera continuously compares your live allocation against your target. When drift, or a meaningful shift in yield and risk conditions, crosses a threshold you've set, it proposes a rebalance, checks it against your on-chain limits, and logs the reasoning.",
  },
  {
    question: "Can I override or pause the agent?",
    answer:
      "Yes. You can revoke the agent's access to your vault, or tighten its limits, at any time — no approval process, no waiting period. Nothing executes outside the boundaries you've set.",
  },
  {
    question: "What does Aera cost?",
    answer:
      "Aera charges a management fee based on assets under management, the same model traditional robo-advisors use. There's no performance fee; gas and normal trade execution costs are separate from the fee itself.",
  },
  {
    question: "Is Aera live today?",
    answer:
      "Not yet. Aera is currently in Phase 0 (Validation). See the Roadmap for the full phased path to a founder-run trial and, eventually, public launch.",
  },
];

export const footerLinks = {
  product: [
    { label: "Rebalancing", href: "#how-it-works" },
    { label: "Yield Routing", href: "#solution" },
    { label: "Decision Log", href: "#solution" },
    { label: "Security", href: "#security" },
    { label: "Whitepaper", href: "/whitepaper" },
    { label: "Roadmap", href: "/roadmap" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Risk Disclosures", href: "#" },
  ],
};

export const networkStatus = [
  { name: "Robinhood Chain", status: "Operational" },
  { name: "1inch", status: "Operational" },
  { name: "0x", status: "Operational" },
];
