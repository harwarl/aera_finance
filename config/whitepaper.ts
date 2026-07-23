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
    intro:
      "AERA Finance is an AI agent that manages a portfolio of tokenized real stocks and on-chain yield, built on Robinhood Chain. In plain terms: you give it some money, tell it how you want that money handled, and it takes care of the ongoing work of managing it — buying, selling, and shifting between stocks and yield — so you don't have to watch the market yourself.",
    subsections: [
      {
        id: "why-this-needs-explaining",
        title: "Why this needs explaining at all",
        blocks: [
          {
            type: "paragraph",
            text: "If you've used a normal brokerage app, this might sound like nothing new. The part that's actually new is *where* your assets live. Robinhood recently launched its own blockchain and started issuing real stocks as tokens that exist on that blockchain — meaning a share of a stock (or something economically equivalent to it) can now be held in a crypto wallet, the same way you'd hold any other token, instead of being locked inside a brokerage account you can only access through one app.",
          },
          {
            type: "paragraph",
            text: "That's a big deal, but it also creates a new question nobody has fully answered yet: if your stocks now live on-chain, who manages them day to day? A brokerage app doesn't manage your allocation for you — you do, or a human advisor does. AERA is built to be the automated version of that job, specifically for this new kind of on-chain stock ownership.",
          },
        ],
      },
      {
        id: "what-you-get",
        title: "What you actually get",
        blocks: [
          {
            type: "list",
            items: [
              "A portfolio of Stock Tokens and yield-generating positions that stays aligned with rules you set, without you having to check in constantly.",
              "Every action taken on your behalf comes with a plain-English explanation — not just a transaction hash, an actual sentence explaining what happened and why.",
              "Full control at all times: you can see everything, change your rules, or pull your money out whenever you want.",
            ],
          },
        ],
      },
      {
        id: "what-this-documentation-covers",
        title: "What this documentation covers",
        blocks: [
          {
            type: "list",
            items: [
              "[The Portfolio Management Gap](/whitepaper/portfolio-gap) — why this problem exists and why nothing currently solves it.",
              "[The Vault Model](/whitepaper/vault-model) — where your money actually sits, and why AERA never touches it directly.",
              "[How a Rebalance Works](/whitepaper/how-rebalancing-works) — the exact step-by-step of what happens when the agent decides to act.",
              "[Constraints & the Trust Model](/whitepaper/constraints-trust-model) — the actual limits placed on the agent, and how they're enforced.",
              "[Use Cases](/whitepaper/use-cases) — concrete examples of who this is for and what it looks like in practice.",
              "[Supported Stock Tokens](/whitepaper/supported-stock-tokens) and [Fee Structure](/whitepaper/fee-structure) — the practical details.",
              "[Security, Honesty & Roadmap](/whitepaper/security-honesty-roadmap) — including what we haven't finished yet. We think this matters more than most documentation admits.",
              "[FAQ & Glossary](/whitepaper/faq-glossary) — quick answers and definitions if you just want the short version of something.",
            ],
          },
          {
            type: "paragraph",
            text: "If you're new to any of this — tokenized stocks, on-chain vaults, or how an \"AI agent\" can safely execute real trades — keep reading in order. Nothing here assumes you're already a crypto expert.",
          },
        ],
      },
    ],
  },
  {
    slug: "portfolio-gap",
    group: "Overview",
    title: "The Portfolio Management Gap",
    subsections: [
      {
        id: "what-actually-changed",
        title: "Start with what actually changed",
        blocks: [
          {
            type: "paragraph",
            text: "For most of financial history, if you owned a share of Apple stock, that ownership was recorded somewhere you couldn't directly touch — a brokerage's internal ledger, ultimately tracing back to a central depository. You could trade it through an app, but you couldn't, say, send it directly to a friend's wallet, or use it as collateral in a lending protocol, the way you could with a cryptocurrency.",
          },
          {
            type: "paragraph",
            text: "Robinhood Chain changes that. It's a blockchain built specifically so that real securities — starting with US stocks and ETFs — can exist as tokens: standard, ordinary on-chain tokens (technically ERC-20s, the same token format used for most cryptocurrencies) that represent economic exposure to the real underlying stock. These are called Stock Tokens. They can sit in a normal crypto wallet, move between wallets, and be combined with other on-chain products — including, notably, on-chain lending markets that pay yield on stablecoins.",
          },
          {
            type: "paragraph",
            text: "This is genuinely new. It's not \"Robinhood added crypto trading\" — it's \"real stocks became composable, programmable assets for the first time.\"",
          },
        ],
      },
      {
        id: "why-a-gap",
        title: "Why that creates a gap, not just an opportunity",
        blocks: [
          {
            type: "paragraph",
            text: "New capability doesn't automatically come with new tools to use it well. Consider what \"managing a portfolio\" actually involves:",
          },
          {
            type: "list",
            items: [
              "Deciding how much to hold in stocks versus safer, yield-generating positions",
              "Noticing when one holding has grown to dominate the portfolio (say, one stock doubled in value and now makes up 60% of your money when you only wanted 20%)",
              "Reacting when conditions change — interest rates shift, volatility spikes, a sector gets riskier",
            ],
          },
          {
            type: "paragraph",
            text: "A human financial advisor does this kind of thing for wealthy clients. A robo-advisor (like the automated investing features inside many brokerage apps) does a simplified version of it for regular people — but only for assets held the traditional way, inside a regulated brokerage account.",
          },
          {
            type: "paragraph",
            text: "Neither of those exists yet for Stock Tokens specifically. Here's why each obvious candidate falls short:",
          },
          {
            type: "list",
            items: [
              "**Traditional robo-advisors** are built around brokerage infrastructure. They have no way to see or manage a token sitting in your own crypto wallet — it's simply outside their world.",
              "**Existing crypto/DeFi tools** know how to manage crypto-native strategies (like moving stablecoins between different lending pools to chase yield), but they don't understand equities. They can't reason about \"this portfolio is too concentrated in tech stocks\" because they were never built to think about stocks at all.",
              "**Doing it yourself** is always an option, but it requires you to actively track prices, volatility, and yield rates on an ongoing basis — which is exactly the kind of task most people don't have the time, information, or training to do consistently well.",
            ],
          },
        ],
      },
      {
        id: "the-result",
        title: "The result",
        blocks: [
          {
            type: "paragraph",
            text: "A real asset class — tokenized real stocks — exists today, is liquid, and is growing, but has no dedicated, automated management layer built for it. That's the gap. AERA is built specifically to fill it, rather than repurposing a tool meant for something else.",
          },
        ],
      },
    ],
  },
  {
    slug: "vault-model",
    group: "Architecture",
    title: "The Vault Model",
    subsections: [
      {
        id: "most-important-decision",
        title: "The single most important design decision in AERA",
        blocks: [
          {
            type: "paragraph",
            text: "Before explaining how the agent thinks or trades, it's worth explaining something more basic: where does your money actually go, and who can touch it?",
          },
          {
            type: "paragraph",
            text: "**AERA never takes custody of your funds.** This is worth dwelling on, because it's the foundation everything else is built on top of.",
          },
        ],
      },
      {
        id: "what-custody-means",
        title: "What \"custody\" means, and why it matters",
        blocks: [
          {
            type: "paragraph",
            text: "\"Custody\" is just a word for \"who actually holds and controls the asset.\" When you put money in a traditional brokerage account, the brokerage has custody — your account shows a balance, but the actual assets are held and controlled by the company. If that company mismanages funds, goes bankrupt, or acts in bad faith, you're exposed to that risk, because you never actually held the asset yourself.",
          },
          {
            type: "paragraph",
            text: "AERA is built the opposite way. When you deposit funds to use AERA, they go into a **vault** — a smart contract, which is really just a small program living on the blockchain, whose rules are fixed and visible to anyone. This vault is created for you, and functionally, it's yours: you can see everything in it, you can withdraw from it, and no one — including AERA the company — can move funds out of it except in the specific ways the contract allows.",
          },
        ],
      },
      {
        id: "what-agent-can-do",
        title: "What the agent is actually allowed to do",
        blocks: [
          {
            type: "paragraph",
            text: "AERA's AI agent is given something called a **manager role** on your vault. This sounds like a big grant of power, but it's actually very narrow by design. The manager role allows the agent to call exactly one function: a rebalance function. It cannot withdraw your funds to some other address. It cannot send your money anywhere except into the specific, pre-approved trades that function allows — and even those trades are boxed in by rules described in detail on the [Constraints & the Trust Model](/whitepaper/constraints-trust-model) page (hard limits on trade size, which assets are allowed, and more).",
          },
          {
            type: "paragraph",
            text: "A useful way to think about it: imagine giving someone a key that only opens one specific cabinet in your house, and that cabinet only lets them swap one approved item for another approved item, in limited quantities, on a limited schedule. That's closer to what the manager role actually is than \"AERA controls your money.\"",
          },
        ],
      },
      {
        id: "what-you-can-always-do",
        title: "What you can always do — no exceptions",
        blocks: [
          {
            type: "list",
            items: [
              "**Deposit and withdraw** your funds, at any time, without asking anyone's permission.",
              "**See everything.** Since the vault lives on a public blockchain, your holdings and full transaction history are visible and verifiable by you directly — not just something AERA tells you about.",
              "**Change your own rules** — for example, tightening your risk limits or changing which sectors you're comfortable holding.",
              "**Revoke the agent's access completely.** One action turns your vault back into a plain holding that nothing but you can touch — instantly, without a waiting period or an approval process.",
            ],
          },
        ],
      },
      {
        id: "why-built-this-way",
        title: "Why we built it this way instead of the easier way",
        blocks: [
          {
            type: "paragraph",
            text: "It would genuinely be easier, from an engineering standpoint, to build AERA as a normal company that takes your deposit and manages it internally, the way a traditional fund does. We didn't do that, on purpose. The tradeoff of the vault model is that it's more complex to build — but the benefit is that your worst-case exposure is fundamentally limited. If AERA the company ceased to exist tomorrow, your funds would still be sitting in a vault only you can withdraw from. That's not true of most financial products, and we think it should be true of this one.",
          },
        ],
      },
    ],
  },
  {
    slug: "how-rebalancing-works",
    group: "Architecture",
    title: "How a Rebalance Works",
    intro:
      "This page walks through, in order, exactly what happens from the moment the agent notices something to the moment (if it happens) that a trade executes. Nothing here is simplified to the point of hiding a step — if you want to understand exactly what AERA does on your behalf, this is the page that answers it in full.",
    subsections: [
      {
        id: "step-1",
        title: "Step 1: Continuous monitoring, not scheduled check-ins",
        blocks: [
          {
            type: "paragraph",
            text: "Unlike a human advisor who might review your account once a quarter, AERA's agent is always watching. Specifically, it continuously tracks:",
          },
          {
            type: "list",
            items: [
              "**Your current holdings**, compared against the target allocation you set (for example: \"I want roughly 60% in a mix of tech and healthcare stocks, and 40% in stable yield\").",
              "**Live prices and volatility** for every Stock Token you hold, so it knows not just what things are worth right now, but how much they've been swinging.",
              "**Available yield rates** on approved on-chain lending positions (for example, through Morpho), so it knows what the \"safe\" side of your portfolio is currently earning.",
            ],
          },
        ],
      },
      {
        id: "step-2",
        title: "Step 2: Recognizing that something's changed enough to matter",
        blocks: [
          {
            type: "paragraph",
            text: "A rebalance isn't triggered just because a price moved slightly — that would mean constant, costly trading for no real benefit. Instead, the agent is looking for two kinds of triggers:",
          },
          {
            type: "list",
            items: [
              "**Drift**: your actual holdings have moved meaningfully away from your target. A simple example: if one stock in your portfolio doubles in price while everything else stays flat, it now makes up a much bigger share of your total portfolio than you originally wanted — increasing your risk in a way you didn't explicitly choose.",
              "**Opportunity or risk shift**: something about market conditions has changed enough that your own stated rules call for a different mix — for instance, if yield rates rise significantly, your rules might call for shifting a bit more toward yield and a bit less toward equity, simply because that's what you told the agent to optimize for.",
            ],
          },
        ],
      },
      {
        id: "step-3",
        title: "Step 3: Building a proposal, not just executing blindly",
        blocks: [
          {
            type: "paragraph",
            text: "Before anything happens, the agent puts together a specific proposal: exactly which asset it wants to trade, how much, and — just as important — a plain-language explanation of the reasoning. This isn't an afterthought bolted on for marketing purposes; the explanation is generated directly from the same data that triggered the decision, and it's saved permanently alongside the proposal, whether or not the trade ends up happening.",
          },
          {
            type: "paragraph",
            text: "**Example of what this might look like in practice:**",
          },
          {
            type: "paragraph",
            text: "*\"Your tech holdings grew from 30% to 47% of your portfolio after a recent price increase, above your 35% limit. Proposing to sell approximately 12% of tech holdings and move the proceeds into your approved yield position, bringing tech exposure back in line with your target.\"*",
          },
        ],
      },
      {
        id: "step-4",
        title: "Step 4: Checking the proposal against hard, on-chain rules",
        blocks: [
          {
            type: "paragraph",
            text: "Before the agent can act on its own proposal, the vault contract itself checks it against the rules you set — completely independent of whatever the agent \"believes\" is a good idea. This includes things like: is the asset it wants to trade into on your approved list? Is the trade size within the maximum you allowed? Would the trade's expected price impact (slippage) stay within your tolerance? Has the agent already made its allowed number of trades for this period?",
          },
          {
            type: "paragraph",
            text: "If the proposal fails any of these checks, it simply does not execute. There's no override, no exception, no \"trust me\" — a failed check is a hard stop.",
          },
        ],
      },
      {
        id: "step-5",
        title: "Step 5: A second check for anything merely unusual",
        blocks: [
          {
            type: "paragraph",
            text: "Some problems don't look like a rule violation on paper, but still look wrong. Imagine the agent proposes something technically inside all your limits, but wildly different from anything it's done before — an unusually large trade, an unusual number of trades in a short period, or a rarely-used asset suddenly showing up. A separate system (we call this the circuit breaker) checks for exactly this kind of pattern. If something looks like an outlier, execution pauses and the proposal is held for manual human review, rather than proceeding automatically just because it technically passed the hard rules.",
          },
        ],
      },
      {
        id: "step-6",
        title: "Step 6: Execution",
        blocks: [
          {
            type: "paragraph",
            text: "If a proposal clears both checks, the trade actually executes on-chain. Rather than building custom trading infrastructure from scratch, AERA routes trades through established, already-live liquidity providers on Robinhood Chain (such as 1inch and 0x), which helps ensure you get a fair, competitive price given how much liquidity is actually available at that moment.",
          },
        ],
      },
      {
        id: "step-7",
        title: "Step 7: Recording everything, always",
        blocks: [
          {
            type: "paragraph",
            text: "Whatever happens — the trade executes, gets blocked by a rule, or gets paused for review — it's written permanently into an immutable log: the market data that triggered it, the reasoning behind it, and the outcome. This log is available to you at any time through your dashboard. Nothing about this process happens somewhere you can't later go back and check.",
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
      "Rather than describing this abstractly, here are concrete pictures of who ends up using AERA and what their experience actually looks like.",
    subsections: [
      {
        id: "hands-off-holder",
        title: "The hands-off holder",
        blocks: [
          {
            type: "paragraph",
            text: "**Who they are:** someone who believes in owning tokenized stocks long-term but doesn't want the ongoing job of watching allocation drift or manually rebalancing.",
          },
          {
            type: "paragraph",
            text: "**What using AERA looks like for them:** they deposit funds once, set a target allocation and risk tolerance (say, \"I'm comfortable with moderate volatility, no more than 40% in any single sector\"), and then largely leave it alone. Every so often, they get a notification: a rebalance happened, with a plain-English explanation of why. They can check their dashboard whenever curiosity strikes, but they don't need to.",
          },
        ],
      },
      {
        id: "yield-conscious-investor",
        title: "The yield-conscious investor",
        blocks: [
          {
            type: "paragraph",
            text: "**Who they are:** someone who doesn't want capital sitting idle, and wants a sensible, ongoing balance between equity exposure and on-chain yield, without manually shifting funds back and forth themselves.",
          },
          {
            type: "paragraph",
            text: "**What using AERA looks like for them:** they set rules that let the agent shift the equity/yield balance as relative conditions change — for example, allowing more weight toward yield when rates rise meaningfully, and back toward equity when they fall. They're less focused on picking specific stocks and more focused on overall capital efficiency.",
          },
        ],
      },
      {
        id: "risk-boundary-setter",
        title: "The risk-boundary setter",
        blocks: [
          {
            type: "paragraph",
            text: "**Who they are:** someone with strong, specific opinions about what they will and won't hold — a hard cap on exposure to any one sector, or a firm rule against certain volatile assets — but who doesn't want to enforce that boundary manually, trade by trade, forever.",
          },
          {
            type: "paragraph",
            text: "**What using AERA looks like for them:** they spend real time upfront setting precise rules (maximum single-position size, disallowed sectors, volatility ceilings), and then trust that those rules are mechanically enforced by the contract, not just \"kept in mind\" by a human or a model that might drift from them over time.",
          },
        ],
      },
      {
        id: "transparency-first-investor",
        title: "The transparency-first investor",
        blocks: [
          {
            type: "paragraph",
            text: "**Who they are:** someone genuinely open to automated portfolio management, but only if every action can be independently understood and verified — not a black box they're expected to simply trust.",
          },
          {
            type: "paragraph",
            text: "**What using AERA looks like for them:** they regularly review the decision log, cross-checking the stated reasoning against the actual market data at the time. For this kind of user, the explanation attached to every action isn't a nice bonus — it's the entire reason they're comfortable using an autonomous system at all.",
          },
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
        text: "AERA works with a deliberately limited, curated list of Stock Tokens issued on Robinhood Chain, along with a small number of approved on-chain yield positions (such as Morpho-based stablecoin yield markets).",
      },
    ],
    subsections: [
      {
        id: "why-a-limited-list",
        title: "Why a limited list, on purpose",
        blocks: [
          {
            type: "paragraph",
            text: "It might seem like more supported assets would automatically be better, but AERA treats this list as a safety boundary, not just a feature waiting to be expanded. An asset is only added once we've confirmed there's enough real on-chain trading liquidity to support execution within AERA's slippage and trade-size constraints. An asset that technically exists but trades thinly isn't a good fit for an automated system executing trades on your behalf — thin liquidity means worse prices and higher risk of something going wrong during execution.",
          },
        ],
      },
    ],
    note: "The specific list of currently supported tickers and yield products will be published here once finalized and confirmed live on Robinhood Chain. We'll update this page as coverage expands — and we'll note it here explicitly rather than silently widening the list.",
  },
  {
    slug: "fee-structure",
    group: "Assets & Fees",
    title: "Fee Structure",
    subsections: [
      {
        id: "how-aera-makes-money",
        title: "How AERA makes money",
        blocks: [
          {
            type: "paragraph",
            text: "AERA charges a **management fee**, calculated as a small percentage of the total assets it's managing for you (often called AUM — assets under management). This is the same basic model used by traditional robo-advisors and human financial advisors; we're applying an established, well-understood approach to a new kind of asset, rather than inventing an unfamiliar pricing mechanism.",
          },
        ],
      },
      {
        id: "what-the-fee-covers",
        title: "What the fee does and doesn't cover",
        blocks: [
          {
            type: "list",
            items: [
              "**Covered by the management fee:** the ongoing work of monitoring your portfolio, generating and executing rebalances, and the infrastructure that keeps the whole system safe (monitoring, signing security, circuit-breaker review).",
              "**Not covered by the management fee:** on-chain gas costs (the small transaction fees every blockchain charges to process an action) and normal trade execution costs like slippage within the tolerance you set. These are a routine part of any on-chain trade, not something specific to AERA, and they occur separately from the management fee itself.",
              "**No performance fee, currently.** AERA does not take a cut of your gains — only a fee based on how much you have under management, regardless of how your portfolio performs.",
            ],
          },
        ],
      },
    ],
    note: "The exact fee percentage will be published here before public launch, once finalized.",
  },
  {
    slug: "security-honesty-roadmap",
    group: "Protocol",
    title: "Security, Honesty & Roadmap",
    subsections: [
      {
        id: "security-posture",
        title: "Security posture — what's actually in place",
        blocks: [
          {
            type: "list",
            items: [
              "The vault uses a restricted manager-role permission model: the agent can only call a narrow rebalance function, not access funds broadly.",
              "Hard-coded spending limits, an approved asset list, and rate limits are enforced directly in the smart contract — not just described in a policy document.",
              "An emergency pause function exists, allowing the system (or you, for your own vault) to halt activity immediately if something seems wrong.",
              "The agent's signing key — the credential it uses to actually authorize trades — is secured using multi-party signing infrastructure (sometimes called MPC or a multisig setup), rather than a single, individually-compromisable hot wallet.",
              "Continuous, automated monitoring watches for things like stale or failing market data, unusual trading patterns, or attempted violations of the on-chain constraints — with automatic pausing if something looks wrong.",
            ],
          },
        ],
      },
      {
        id: "honesty",
        title: "Honesty — what we haven't finished yet",
        blocks: [
          {
            type: "paragraph",
            text: "We think it matters more to tell you what's *not* done than to only describe what is. Specifically, as of this writing:",
          },
          {
            type: "list",
            items: [
              "**We have not yet completed an independent smart contract audit.** This is a hard requirement before any beta involving funds beyond the founder's own, and we will publish the full results here once it's done — including any issues found, not just a summary.",
              "**Our regulatory framing hasn't been independently confirmed yet.** AERA is deliberately designed so that you set the rules and the agent executes mechanically within them, specifically to avoid being classified as discretionary investment advice — but this is a legal question, and we're getting it reviewed by securities counsel rather than assuming our own reasoning is sufficient.",
              "**Backtesting is still in progress.** We're validating the rebalancing approach against real historical Stock Token price behavior before it's trusted with any capital beyond the founder's own.",
              "**AERA does not, and will not, guarantee returns.** The constraints described throughout this documentation govern what actions the agent is allowed to take — they say nothing about whether the market will move in your favor. Investing always carries the risk of loss.",
            ],
          },
        ],
      },
      {
        id: "roadmap",
        title: "Roadmap — where we are and where we're going",
        blocks: [],
      },
    ],
    roadmapPhases: [
      {
        label: "Phase 0 — Validation",
        description:
          "Proving the core rebalancing idea manually, with no code and no live funds involved yet.",
      },
      {
        label: "Phase 1 — Backtesting",
        description:
          "Building and testing the rebalancing logic against historical market data, with no live funds.",
      },
      {
        label: "Phase 2 — Founder-run live trial",
        description:
          "Running the complete system — vault, agent, execution, monitoring — live and autonomously, using only the founder's own funds, to prove it holds up under real conditions.",
      },
      {
        label: "Phase 3 — Closed beta",
        description:
          "After legal and compliance review is complete, a small number of real users are onboarded.",
      },
      {
        label: "Phase 4 — Public launch",
        description:
          "General availability, with continued security hardening and compliance work as an ongoing process, not a one-time milestone.",
      },
    ],
    note: "Phase 2 runs entirely on the founder's own funds — no outside capital is at risk before Phase 3.",
    closing:
      "We'll keep this page updated as each phase completes — including being upfront if something doesn't go according to plan.",
  },
  {
    slug: "faq-glossary",
    group: "Protocol",
    title: "FAQ & Glossary",
    faqs: [
      {
        question: "What is AERA Finance, in one sentence?",
        answer:
          "An AI agent that manages a portfolio of tokenized real stocks and on-chain yield on your behalf, automatically rebalancing within limits you set, and explaining every action in plain language.",
      },
      {
        question: "Does AERA ever hold or control my funds directly?",
        answer:
          "No. Your funds stay in a smart contract vault that only you can withdraw from. AERA's agent has a narrow, specific permission to execute rebalances within rules you've already agreed to — it cannot take custody, exceed your limits, or move funds anywhere outside the approved process.",
      },
      {
        question: "Could the agent do something I didn't authorize?",
        answer:
          "No — not because we're asking you to trust its judgment, but because every proposed action is checked against hard, on-chain rules (an approved asset list, a maximum trade size, a slippage limit, and a trade-frequency cap) before it's allowed to execute. If a proposed action fails any of these checks, it simply doesn't happen, regardless of the agent's own reasoning.",
      },
      {
        question:
          "What happens if the agent tries something unusual, even if it's technically allowed?",
        answer:
          "A separate safety system (the circuit breaker) checks whether a proposed action is a significant outlier compared to the agent's own past behavior — in size, frequency, or the specific asset involved. If so, the system pauses and holds the action for manual human review instead of letting it execute automatically.",
      },
      {
        question: "Can I get my money out whenever I want?",
        answer:
          "Yes, always. You can withdraw your funds, or revoke the agent's access to your vault entirely, at any time — no approval process, no waiting period.",
      },
      {
        question: "Is using AERA the same as getting investment advice? Is it regulated?",
        answer:
          "AERA is built so that you define your own rules and boundaries, and the agent simply executes within them mechanically, rather than making independent, discretionary judgments about your money. This structure is intended to sit outside typical investment-advisory regulation, but we're having this confirmed by securities counsel rather than assuming it ourselves — and we'll update this answer once that review is complete.",
      },
      {
        question: "What exactly is a \"Stock Token\"?",
        answer:
          "A token, issued by Robinhood on Robinhood Chain, that represents economic exposure to a real underlying stock or ETF. It behaves like a normal crypto token (it can sit in a wallet, be transferred, and be used in on-chain products) but its value is tied to a real security, not a purely crypto-native asset.",
      },
      {
        question: "Does AERA guarantee I'll make money, or at least not lose money?",
        answer:
          "No, and be wary of anything that claims otherwise. AERA's rules and constraints control *how* the agent is allowed to act — not whether the underlying market moves in your favor. Like any investment, there is a real risk of loss.",
      },
    ],
    glossary: [
      {
        term: "Vault",
        definition:
          "The smart contract holding your deposited funds. You retain full control and full withdrawal rights at all times; it is not held or controlled by AERA the company.",
      },
      {
        term: "Manager role",
        definition:
          "The narrow, specific permission granted to AERA's agent on your vault, allowing it to call a constrained rebalancing function — and nothing more.",
      },
      {
        term: "Rebalance",
        definition:
          "An action that adjusts your portfolio's mix of holdings to better match the target allocation and rules you set, in response to price movement or changing market conditions.",
      },
      {
        term: "Stock Token",
        definition:
          "A token issued on Robinhood Chain representing economic exposure to a real underlying stock or ETF.",
      },
      {
        term: "Circuit breaker",
        definition:
          "A safety mechanism that pauses execution and requires manual review when a proposed action is a significant outlier compared to past behavior, even if it technically passes the standard hard constraints.",
      },
      {
        term: "Constraint",
        definition:
          "A hard rule, enforced directly by the smart contract (not merely suggested to the agent), that limits what the manager role is able to do — for example, a maximum trade size or an approved asset list.",
      },
      {
        term: "AUM (Assets Under Management)",
        definition:
          "The total value of the funds AERA is actively managing on your behalf; used as the basis for calculating AERA's management fee.",
      },
      {
        term: "Slippage",
        definition:
          "The difference between the expected price of a trade and the actual price it executes at, typically caused by limited available liquidity at the moment of the trade. AERA enforces a maximum slippage tolerance you set, blocking trades that would exceed it.",
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
