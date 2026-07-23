import type { DocPage } from "@/types";

export const whitepaperMeta = {
  title: "AERA Finance",
  tagline: "An Autonomous AI Portfolio Agent for Tokenized Real-World Assets",
  version: "v1.0",
  updated: "July 2026",
  readingTime: "14 min read",
};

export const docPages: DocPage[] = [
  {
    slug: "introduction",
    group: "Overview",
    title: "Introduction",
    blocks: [
      {
        type: "paragraph",
        text: "AERA Finance is an autonomous AI agent that manages a portfolio of tokenized real-world securities (\"Stock Tokens\") and on-chain yield, built on Robinhood Chain. AERA continuously monitors market conditions, rebalances a user's portfolio within boundaries the user explicitly sets, executes trades directly, and explains every decision in plain language. Funds remain in a non-custodial, user-controlled smart contract at all times, with hard on-chain limits constraining what the agent can ever do.",
      },
      {
        type: "paragraph",
        text: "Real-world assets (RWA) are increasingly represented on-chain, moving from an experimental DeFi niche to a mainstream financial infrastructure category. Tokenized private credit, treasuries, and real estate already represent billions of dollars in on-chain value. In 2026, Robinhood extended this trend directly into public equities by launching Robinhood Chain, an Ethereum-based network purpose-built for real-world assets, and issuing Stock Tokens — tokenized debt securities that track real underlying stocks and ETFs, available as standard ERC-20 tokens with no special integration required.",
      },
      {
        type: "paragraph",
        text: "This is a meaningful shift: for the first time, mainstream retail brokerage assets are natively programmable. They can be held, transferred, and composed into new financial products the same way any other on-chain asset can. But composability alone does not solve the oldest problem in investing — deciding what to hold, when to change it, and why. AERA Finance exists to solve that problem for this new asset class specifically.",
      },
    ],
  },
  {
    slug: "portfolio-gap",
    group: "Overview",
    title: "The Portfolio Management Gap",
    blocks: [
      {
        type: "paragraph",
        text: "Managing a portfolio of Stock Tokens and on-chain yield today requires the same judgment a professional portfolio manager would apply: monitoring drift from a target allocation, weighing equity exposure against yield-bearing alternatives, and reacting to changing market conditions. This is true whether the assets are held in a traditional brokerage account or on-chain — the difference is that on-chain assets are:",
      },
      {
        type: "list",
        items: [
          "Continuously priced and liquid, meaning the cost of inaction (or slow reaction) is arguably higher than in a brokerage account rebalanced quarterly.",
          "Composable with on-chain yield sources, creating a genuinely new allocation decision (equity exposure vs. yield) that didn't exist in the same form before.",
          "Currently unmanaged by any existing product. Traditional robo-advisors do not support tokenized securities or DeFi yield; existing DeFi vaults are not built to reason about equity-specific risk.",
        ],
      },
      {
        type: "paragraph",
        text: "The result is a real and growing gap: a new, genuinely useful asset class with no automated, trustworthy management layer built for it. AERA closes this gap with an AI agent that manages a user's Stock Token and yield portfolio autonomously, subject to rules the user defines upfront. The core design principle is that autonomy and safety are not in tension — they are both enforced structurally, not by trust alone.",
      },
    ],
  },
  {
    slug: "vault-model",
    group: "Architecture",
    title: "The Vault Model",
    blocks: [
      {
        type: "paragraph",
        text: "AERA does not take custody of user funds. Deposits are held in a smart contract vault with a restricted \"manager\" role assigned to the agent's execution key. The manager role may only call a constrained rebalance function, bound by whitelisted assets, maximum trade size, slippage limits, and trade-frequency caps enforced at the contract level.",
      },
      {
        type: "paragraph",
        text: "The user retains exclusive rights to deposit, withdraw, adjust their own rule parameters, and revoke the agent's permission entirely. Nothing the agent does can move funds outside the vault to any destination other than the trades its manager role is scoped to execute.",
      },
    ],
  },
  {
    slug: "how-rebalancing-works",
    group: "Architecture",
    title: "How a Rebalance Works",
    intro:
      "AERA closes the portfolio management gap with an AI agent that manages a user's Stock Token and yield portfolio autonomously, subject to rules the user defines upfront.",
    subsections: [
      {
        id: "how-it-works",
        title: "The loop",
        blocks: [
          {
            type: "list",
            items: [
              "Deposit — the user funds a transparent, non-custodial smart contract vault. Funds can be withdrawn at any time.",
              "Set the rules — the user defines risk tolerance, sector or asset limits, and maximum position sizes. These are enforced on-chain, not merely as a suggestion to the agent.",
              "Continuous monitoring — the agent evaluates portfolio drift, price volatility, and available yield rates on an ongoing basis, not on a fixed schedule.",
              "Autonomous, explained action — when a rebalance is warranted, the agent executes the trade directly and publishes a plain-language explanation of what changed and why, alongside the underlying data that drove the decision.",
              "On-chain safety limits — hard-coded constraints bound what the agent can ever do, regardless of its own reasoning. The user may revoke the agent's permission or withdraw funds at any time.",
            ],
          },
        ],
      },
      {
        id: "reasoning-layer",
        title: "Reasoning layer",
        blocks: [
          {
            type: "paragraph",
            text: "The agent's reasoning is driven by a large language model with function-calling access to live portfolio state, market data, and yield rates. Every proposed action is logged immutably along with the specific data inputs that produced it, creating a full audit trail independent of any single decision. The agent may only act within the boundaries the user has already agreed to — its role is to execute a pre-consented strategy well, not to invent new strategy outside the user's stated preferences.",
          },
        ],
      },
      {
        id: "execution-layer",
        title: "Execution layer",
        blocks: [
          {
            type: "paragraph",
            text: "Trade execution is routed through established on-chain liquidity infrastructure (such as 1inch and 0x) already live on Robinhood Chain, rather than building new trading infrastructure from scratch. Execution proceeds only if on-chain constraint checks pass; a circuit breaker halts execution and requires manual review if a proposed action deviates significantly from historical patterns in size, frequency, or asset selection.",
          },
        ],
      },
    ],
  },
  {
    slug: "constraints-trust-model",
    group: "Architecture",
    title: "Constraints & the Trust Model",
    intro:
      "AERA's agent is autonomous, but autonomy is not the same as unlimited authority. Every action the agent can take is bounded by rules enforced in the smart contract itself — not by the agent's judgment, not by a policy document, and not by our word. This page explains exactly what those boundaries are, where they live, and how you can verify them yourself.",
    subsections: [
      {
        id: "core-principle",
        title: "The core principle",
        blocks: [
          {
            type: "paragraph",
            text: "Most \"AI manages your money\" products ask you to trust the model. AERA is built so that you don't have to — because the model isn't what stops it from doing something you didn't authorize. The contract is.",
          },
          {
            type: "paragraph",
            text: "Concretely: the agent holds a restricted **manager role** on your vault. That role can only call one function — `rebalance()` — and that function is hard-gated by constraints written directly into the contract. If a proposed action falls outside those constraints, the transaction simply fails. It doesn't matter how the agent reasoned its way there.",
          },
        ],
      },
      {
        id: "on-chain-enforcement",
        title: "What's actually enforced on-chain",
        blocks: [
          {
            type: "table",
            headers: ["Constraint", "What it does"],
            rows: [
              [
                "**Asset whitelist**",
                "The agent can only hold and trade assets you've explicitly allowed — a fixed list of Stock Tokens and approved yield positions. It cannot acquire anything outside that list, ever.",
              ],
              [
                "**Max trade size**",
                "Each rebalance is capped as a percentage of total vault value. The agent cannot move your entire position in a single action, regardless of how confident its reasoning is.",
              ],
              [
                "**Max slippage**",
                "Trades that would execute at worse than your allowed slippage tolerance are blocked before execution, not flagged after the fact.",
              ],
              [
                "**Trade frequency limit**",
                "The agent can only act a bounded number of times per period. This prevents a malfunctioning or compromised agent from repeatedly draining value through excessive trading.",
              ],
              [
                "**User-set risk parameters**",
                "Your sector limits, position size preferences, and risk tolerance are stored on-chain and checked against every proposed action.",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "None of these are suggestions to the agent — they are checks the contract performs independently, before any trade is allowed to execute.",
          },
        ],
      },
      {
        id: "always-available",
        title: "What you can always do, no matter what",
        blocks: [
          {
            type: "list",
            items: [
              "**Withdraw your funds**, at any time, without needing anyone's approval.",
              "**Revoke the agent's permission** entirely, instantly turning the vault back into a plain, unmanaged holding.",
              "**Adjust your own rules** — tighten limits, change sector allowances, or lower risk tolerance whenever you want.",
            ],
          },
          {
            type: "paragraph",
            text: "These are user-only functions. The agent has no ability to block, delay, or override them.",
          },
        ],
      },
      {
        id: "circuit-breaker",
        title: "The circuit breaker",
        blocks: [
          {
            type: "paragraph",
            text: "Constraints catch anything that violates a hard rule. But some problems don't look like a rule violation — they look unusual. If the agent proposes an action that's technically within your limits but significantly out of pattern compared to its own history (an unusually large trade, an unusual frequency, a rarely-used asset), the system halts and flags it for manual review instead of executing automatically. This exists specifically to catch the failure modes that a fixed rule wouldn't — a corrupted data feed, an edge case in the model's reasoning, or unexpected market conditions.",
          },
        ],
      },
      {
        id: "decision-transparency",
        title: "Full decision transparency",
        blocks: [
          {
            type: "paragraph",
            text: "Every proposal the agent makes — whether it executes, gets blocked by a constraint, or gets paused by the circuit breaker — is logged immutably, along with:",
          },
          {
            type: "list",
            items: [
              "The exact market and portfolio data the agent used to make the decision",
              "The plain-language reasoning behind it",
              "The outcome: executed, blocked, or held for review",
            ],
          },
          {
            type: "paragraph",
            text: "This log is yours to inspect at any time. Nothing the agent does happens silently, and nothing is reconstructed after the fact — the log is written at the moment of the decision, not edited afterward.",
          },
        ],
      },
      {
        id: "signing-security",
        title: "Signing security",
        blocks: [
          {
            type: "paragraph",
            text: "The agent's manager-role key is not a single hot wallet with unilateral authority. It's secured through multi-party signing infrastructure, meaning no single compromised key can move funds beyond what the contract already allows. Even in a worst-case key compromise, the blast radius is limited to the same constraints — whitelisted assets, max trade size, slippage limits — that apply to every legitimate action.",
          },
        ],
      },
      {
        id: "what-this-does-not-claim",
        title: "What this model does not claim",
        blocks: [
          {
            type: "paragraph",
            text: "We want to be direct about the limits of this model, not just its strengths:",
          },
          {
            type: "list",
            items: [
              "**It does not guarantee returns.** Constraints govern *how* the agent can act, not whether its judgment about *when* to act will be profitable. Rebalancing well is still subject to market risk.",
              "**It does not eliminate smart contract risk.** Like any on-chain system, the vault contract itself is subject to audit findings and the general risks of smart contract security, even with no bugs found. We publish audit results and encourage you to review them independently.",
              "**It does not replace your own judgment about whether AERA is right for you.** The constraints protect you from the agent exceeding what you authorized — they don't substitute for deciding what you should authorize in the first place.",
            ],
          },
        ],
      },
    ],
    closing:
      "In short: you are not trusting an AI with your money. You are authorizing a specific, bounded, on-chain-enforced set of actions — and you can inspect, tighten, or revoke that authorization at any time. The agent's intelligence determines the quality of its decisions within those bounds. The contract determines the bounds themselves.",
  },
  {
    slug: "use-cases",
    group: "Product",
    title: "Use Cases",
    intro:
      "AERA's capabilities are deliberately narrow — it maintains an allocation and routes yield within limits you set. What that supports in practice:",
    blocks: [
      {
        type: "list",
        items: [
          "Maintain a target equity allocation across Stock Tokens without manually tracking drift or timing trades yourself.",
          "Route idle, unallocated capital into on-chain yield within the risk bounds you set, rather than leaving it uninvested between decisions.",
          "Hold a long-term position while still reacting to real-time market moves, without needing to watch prices or execute trades yourself.",
        ],
      },
    ],
  },
  {
    slug: "supported-stock-tokens",
    group: "Assets & Fees",
    title: "Supported Stock Tokens",
    blocks: [
      {
        type: "paragraph",
        text: "AERA manages Stock Tokens issued on Robinhood Chain — tokenized securities that track real underlying public stocks and ETFs, available as standard ERC-20 tokens. Because AERA's manager role is bound by an on-chain asset whitelist (see The Vault Model), it can only ever act on assets explicitly approved for it — it cannot trade an asset that hasn't been added to that list.",
      },
    ],
    note: "AERA is currently in Phase 0 (Validation). A specific list of supported Stock Tokens will be published as the asset whitelist is finalized ahead of Phase 3.",
  },
  {
    slug: "fee-structure",
    group: "Assets & Fees",
    title: "Fee Structure",
    blocks: [
      {
        type: "paragraph",
        text: "AERA's revenue model is a management fee assessed on assets under management, consistent with the established model used by traditional robo-advisors and asset managers, applied here to a new on-chain asset class rather than a novel or speculative mechanic.",
      },
    ],
  },
  {
    slug: "security-honesty-roadmap",
    group: "Protocol",
    title: "Security, Honesty & Roadmap",
    intro:
      "An autonomous agent is only as trustworthy as its willingness to state what it doesn't yet guarantee. This page is that statement.",
    subsections: [
      {
        id: "regulatory",
        title: "Regulatory considerations",
        blocks: [
          {
            type: "paragraph",
            text: "AERA is designed around a specific regulatory posture: the user defines the strategy's boundaries, and the agent executes mechanically within them, rather than exercising independent discretionary authority. This framing is intended to differentiate AERA from discretionary investment-advisory activity, which typically carries registration requirements in most jurisdictions. AERA's availability will also match the jurisdictional restrictions already in place for the underlying Stock Tokens, since the agent cannot be more permissive than the assets it manages.",
          },
        ],
      },
      {
        id: "risks",
        title: "Risks",
        blocks: [
          {
            type: "list",
            items: [
              "Regulatory reclassification as discretionary investment advice — mitigated by legal review and the mechanical-execution framing, reassessed at each phase.",
              "Underperforming rebalancing logic — mitigated by a mandatory backtesting gate before any live capital is deployed.",
              "Signing key compromise — mitigated by MPC/multisig signing and on-chain spending limits that bound the impact of any single compromised key.",
              "Data feed failure or staleness — mitigated by monitoring, alerting, and a circuit breaker on anomalous proposals.",
              "Thin underlying liquidity for certain Stock Tokens — mitigated by on-chain slippage limits that block poorly-priced trades rather than executing them.",
            ],
          },
        ],
      },
      {
        id: "roadmap",
        title: "Roadmap",
        blocks: [],
      },
    ],
    roadmapPhases: [
      {
        label: "Phase 0 — Validation",
        description:
          "Manual, offline validation of the core rebalancing thesis before any code is written.",
      },
      {
        label: "Phase 1 — Backtesting",
        description:
          "The rebalancing logic is built and tested against historical Stock Token price behavior, with no live funds involved, to confirm it outperforms a static buy-and-hold baseline on a risk-adjusted basis.",
      },
      {
        label: "Phase 2 — Founder-run production trial",
        description:
          "The full system — vault, agent, execution, monitoring — runs live and autonomously using only the founder's own funds, to prove the architecture holds up under real market conditions before any outside capital is involved.",
      },
      {
        label: "Phase 3 — Closed beta",
        description:
          "Following legal and compliance review, a small number of real users are onboarded to validate trust, usability, and the plain-language explanation model with real feedback.",
      },
      {
        label: "Phase 4 — Public launch",
        description:
          "General availability, continued monitoring and security hardening, and expansion of supported assets and features.",
      },
    ],
    note: "Phase 2 runs entirely on the founder's own funds — no outside capital is at risk before Phase 3.",
    callout: {
      variant: "warning",
      title: "Not yet legally confirmed",
      text: "This regulatory posture is a design intent, not a legal conclusion — it will be confirmed with securities counsel before any beta involves outside user funds.",
    },
    closing:
      "Robinhood Chain has made real securities natively programmable for the first time. AERA Finance is built to be the management layer that this new asset class has been missing — autonomous where it can add value, constrained by code where safety demands it, and transparent enough that every action is explainable and auditable. Continuous rather than quarterly, explained rather than opaque, and safe by construction rather than by trust alone.",
  },
  {
    slug: "faq-glossary",
    group: "Protocol",
    title: "FAQ & Glossary",
    faqs: [
      {
        question: "Does AERA take custody of my funds?",
        answer:
          "No. AERA is non-custodial — deposits sit in a smart contract vault, and AERA's execution key can only call a constrained rebalance function bound by on-chain limits you control.",
      },
      {
        question: "Can I stop the agent at any time?",
        answer:
          "Yes. You can withdraw funds or revoke the agent's permission at any time, without needing platform approval.",
      },
      {
        question: "What happens if the agent's signing key is compromised?",
        answer:
          "The execution key is held via MPC or multisig signing, and on-chain spending limits bound what any single compromised key could ever move.",
      },
      {
        question: "Is AERA live today?",
        answer:
          "Not yet. AERA is currently in Phase 0 (Validation). See Security, Honesty & Roadmap for the full phased path to production.",
      },
    ],
    glossary: [
      {
        term: "Stock Token",
        definition:
          "A tokenized security issued on Robinhood Chain that tracks a real underlying public stock or ETF, available as a standard ERC-20 token.",
      },
      {
        term: "Vault",
        definition:
          "The non-custodial smart contract that holds a user's deposited funds and enforces the limits AERA's execution key can act within.",
      },
      {
        term: "MPC",
        definition:
          "Multi-party computation — a signing method that splits control of a key across multiple parties so no single party can use it alone.",
      },
      {
        term: "Circuit breaker",
        definition:
          "An automatic execution halt triggered when a proposed action deviates significantly from historical patterns, requiring manual review before it can proceed.",
      },
      {
        term: "Slippage limit",
        definition:
          "An on-chain constraint that blocks a trade from executing if its price would move beyond an allowed threshold.",
      },
    ],
  },
];

export function getDocPage(slug: string) {
  return docPages.find((page) => page.slug === slug);
}

export function getAdjacentDocPages(slug: string) {
  const index = docPages.findIndex((page) => page.slug === slug);
  return {
    previous: index > 0 ? docPages[index - 1] : undefined,
    next: index < docPages.length - 1 ? docPages[index + 1] : undefined,
    index,
  };
}
