// Docs navigation tree, from reference/Aera-Docs.dc.html renderVals().

export type DocId =
  | "home" | "vault" | "deposit" | "targets"
  | "vaults" | "drift" | "yield" | "guard" | "autonomy"
  | "agent" | "proposals" | "mcp"
  | "contract" | "params" | "audits" | "addresses";

export const TREE: [string, [DocId, string][]][] = [
  ["Getting started", [["home", "Introduction"], ["vault", "Create your vault"], ["deposit", "Deposit and withdraw"], ["targets", "Set targets"]]],
  ["Core concepts", [["vaults", "Vaults"], ["drift", "Drift bands"], ["yield", "Idle yield"], ["guard", "Guardrails"], ["autonomy", "Autonomy levels"]]],
  ["Agent & MCP", [["agent", "Talking to the agent"], ["proposals", "Proposals and signing"], ["mcp", "MCP endpoint"]]],
  ["Contracts & security", [["contract", "Vault contract"], ["params", "Rule parameters"], ["audits", "Audits"], ["addresses", "Addresses"]]],
];

const SLUGS: Record<DocId, string> = {
  home: "", vault: "create-your-vault", deposit: "deposit-and-withdraw", targets: "set-targets",
  vaults: "vaults", drift: "drift-bands", yield: "idle-yield", guard: "guardrails", autonomy: "autonomy-levels",
  agent: "talking-to-the-agent", proposals: "proposals-and-signing", mcp: "mcp-endpoint",
  contract: "vault-contract", params: "rule-parameters", audits: "audits", addresses: "addresses",
};

export const href = (id: DocId) => (SLUGS[id] ? `/docs/${SLUGS[id]}` : "/docs");
export const idFromSlug = (slug: string) =>
  (Object.keys(SLUGS) as DocId[]).find((id) => SLUGS[id] === slug && id !== "home");
export const allSlugs = () => (Object.values(SLUGS).filter(Boolean));

export const TITLES = Object.fromEntries(
  TREE.flatMap(([group, items]) => items.map(([id, t]) => [id, [group, t]])),
) as Record<DocId, [string, string]>;

export const TOCS: Record<"home" | "vault" | "guard" | "stub", string[]> = {
  home: ["Start here", "Sections", "Quick start"],
  vault: ["Before you start", "Create the vault", "Deposit", "Next steps"],
  guard: ["How checks work", "Rule parameters", "Changing rules"],
  stub: ["Overview"],
};

export const anchor = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Search index: every page, plus the written sections of the designed pages. */
export type SearchEntry = { kind: "page" | "section"; title: string; context: string; to: string };
export const SEARCH_INDEX: SearchEntry[] = [
  ...TREE.flatMap(([group, items]) =>
    items.map(([id, t]) => ({ kind: "page" as const, title: t, context: group, to: href(id) })),
  ),
  ...(["vault", "guard"] as const).flatMap((id) =>
    TOCS[id].map((s) => ({ kind: "section" as const, title: s, context: `${TITLES[id][1]} › ${s}`, to: `${href(id)}#${anchor(s)}` })),
  ),
  ...["maxTradeBps", "allowlist", "maxSlippageBps", "cooldown", "withdraw"].map((p) => ({
    kind: "section" as const, title: p, context: "Guardrails › Rule parameters", to: `${href("guard")}#rule-parameters`,
  })),
];
