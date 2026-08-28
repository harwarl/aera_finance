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
    "Atlas is an AI agent that manages a portfolio of tokenized real stocks and on-chain yield, built on Robinhood Chain — rebalancing, executing trades, and explaining every decision in plain language.",
};

export const navLinks: NavLink[] = [
  { label: "Product", href: "#solution" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Security", href: "#security" },
  { label: "Platform", href: "#platform" },
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
      "Atlas reads your vault's holdings, Stock Token prices, and available yield rates, continuously and in real time.",
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
      "Funds sit in a smart contract only you can withdraw from. It is never held by Atlas the company.",
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
    question: "What is Atlas?",
    answer:
      "Atlas is a platform for AI-managed on-chain portfolios: a vault product, the infrastructure behind it, a live market signal feed, and a marketplace for shared strategies. The vault is the first piece live today; the rest is built on the same engine.",
  },
  {
    question: "Does Atlas ever take custody of my funds?",
    answer:
      "No. Funds stay in a smart contract vault that only you can withdraw from. The agent managing your vault holds a narrow manager role that can only call a constrained rebalance function within limits you've set. This holds regardless of which Atlas product you're using.",
  },
  {
    question: "Which assets does the Atlas vault support?",
    answer:
      "The Atlas vault manages Stock Tokens, tokenized real stocks and ETFs issued on Robinhood Chain, alongside a small number of approved on-chain yield positions, such as Morpho-based stablecoin markets.",
  },
  {
    question: "How does the vault decide when to rebalance?",
    answer:
      "It continuously compares your live allocation against your target. When drift, or a meaningful shift in yield and risk conditions, crosses a threshold you've set, it proposes a rebalance, checks it against your on-chain limits, and logs the reasoning.",
  },
  {
    question: "Can I override or pause the agent?",
    answer:
      "Yes. You can revoke the agent's access to your vault, or tighten its limits, at any time. No approval process, no waiting period. Nothing executes outside the boundaries you've set.",
  },
  {
    question: "Can I build on Atlas instead of just using the vault?",
    answer:
      "That's the direction the platform is built for. The vault factory and decision engine are designed to be licensed so other teams can launch their own AI-managed vault product on the same rails, the market signal feed is designed to be queried by other agents and researchers, and the strategy layer is designed to let anyone publish and share an allocation approach. See the Roadmap for how each is sequenced.",
  },
  {
    question: "What does the vault cost?",
    answer:
      "The vault charges a management fee based on assets under management, the same model traditional robo-advisors use. There's no performance fee; gas and normal trade execution costs are separate from the fee itself.",
  },
  {
    question: "Is Atlas live today?",
    answer:
      "The vault is currently in Phase 0 (Validation), not yet live. The rest of the platform, infrastructure, signal feed, and strategy marketplace, ships in later phases. See the Roadmap for the full sequence.",
  },
];

export const footerLinks = {
  product: [
    { label: "Rebalancing", href: "#how-it-works" },
    { label: "Yield Routing", href: "#solution" },
    { label: "Decision Log", href: "#solution" },
    { label: "Security", href: "#security" },
    { label: "Platform (All Products)", href: "#platform" },
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
