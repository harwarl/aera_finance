import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { Callout } from "@/components/shared/Callout";
import { Note } from "@/components/shared/Note";
import { DocsShellNav } from "@/components/sections/DocsShellNav";
import { DocsOnThisPage } from "@/components/sections/DocsOnThisPage";
import {
  docPages,
  getAdjacentDocPages,
  getDocPage,
  whitepaperMeta,
} from "@/config/whitepaper";
import type { WhitepaperBlock } from "@/types";

export function generateStaticParams() {
  return docPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getDocPage(slug);
  if (!page) return {};

  const firstBlock = page.blocks?.[0];
  const description =
    page.intro ??
    (firstBlock?.type === "paragraph"
      ? firstBlock.text
      : whitepaperMeta.tagline);

  return {
    title: `${page.title} — Atlas Docs`,
    description,
  };
}

const INLINE_PATTERN = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
const LINK_PATTERN = /^\[([^\]]+)\]\(([^)]+)\)$/;

function renderInline(text: string): React.ReactNode[] {
  return text.split(INLINE_PATTERN).map((segment, i) => {
    if (!segment) return null;

    const linkMatch = segment.match(LINK_PATTERN);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      return (
        <Link
          key={i}
          href={href}
          className="text-accent underline underline-offset-2 hover:no-underline"
        >
          {label}
        </Link>
      );
    }
    if (segment.startsWith("**") && segment.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {segment.slice(2, -2)}
        </strong>
      );
    }
    if (segment.startsWith("`") && segment.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-background-elevated px-1.5 py-0.5 font-mono text-[0.85em] text-accent"
        >
          {segment.slice(1, -1)}
        </code>
      );
    }
    if (segment.startsWith("*") && segment.endsWith("*")) {
      return <em key={i}>{segment.slice(1, -1)}</em>;
    }
    return segment;
  });
}

function Blocks({ blocks }: { blocks: WhitepaperBlock[] }) {
  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, i) => {
        if (block.type === "list") {
          return (
            <ul key={i} className="flex flex-col gap-3">
              {block.items.map((item, ii) => (
                <li
                  key={ii}
                  className="flex gap-3 text-sm leading-relaxed text-foreground-muted sm:text-base"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "table") {
          return (
            <div key={i} className="overflow-x-auto border border-border-muted">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-border-muted bg-background-elevated/50">
                    {block.headers.map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-foreground-faint"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, ri) => (
                    <tr
                      key={ri}
                      className={ri > 0 ? "border-t border-border-muted" : ""}
                    >
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className="px-4 py-3 text-sm leading-relaxed text-foreground-muted sm:text-base"
                        >
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return (
          <p
            key={i}
            className="text-sm leading-relaxed text-foreground-muted sm:text-base"
          >
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}

function SubHeading({ id, title }: { id: string; title: string }) {
  return (
    <h3
      id={id}
      data-toc-heading
      className="scroll-mt-20 text-lg font-bold text-foreground"
    >
      {title}
    </h3>
  );
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getDocPage(slug);
  if (!page) notFound();

  const { previous, next, index } = getAdjacentDocPages(slug);
  const eyebrowIndex = String(index + 1).padStart(2, "0");

  const jumpItems: { id: string; label: string }[] = [
    ...(page.subsections?.map((sub) => ({ id: sub.id, label: sub.title })) ??
      []),
    ...(page.faqs ? [{ id: "faq", label: "FAQ" }] : []),
    ...(page.glossary ? [{ id: "glossary", label: "Glossary" }] : []),
  ];

  return (
    <div className="mx-auto flex max-w-[1600px]">
      <aside className="hidden shrink-0 border-r border-border-muted p-6 lg:sticky lg:top-16 lg:block lg:h-[calc(100dvh-4rem)] lg:w-70 lg:overflow-y-auto">
        <DocsShellNav />
      </aside>

      <main className="min-w-0 flex-1 px-6 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-6 font-mono text-xs uppercase tracking-widest text-foreground-faint">
            <span className="text-accent">{page.group}</span> · {eyebrowIndex}
          </Reveal>

          <Reveal delay={60}>
            <h1 className="text-4xl font-black leading-[0.95] tracking-tighter text-foreground sm:text-5xl">
              {page.title}
            </h1>
          </Reveal>

          {page.intro ? (
            <Reveal delay={120}>
              <p className="mt-6 max-w-[60ch] text-sm leading-relaxed text-foreground-muted sm:text-base">
                {renderInline(page.intro)}
              </p>
            </Reveal>
          ) : null}

          {jumpItems.length > 0 ? (
            <div className="mb-2 mt-10 -mx-6 overflow-x-auto px-6 lg:hidden">
              <div className="flex w-max gap-2">
                {jumpItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="whitespace-nowrap border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          <Reveal delay={180}>
            <div className="mt-8 flex flex-col gap-10">
              {page.blocks ? <Blocks blocks={page.blocks} /> : null}

              {page.subsections
                ? page.subsections.map((sub) => (
                    <div key={sub.id}>
                      <SubHeading id={sub.id} title={sub.title} />
                      <div className="mt-4">
                        <Blocks blocks={sub.blocks} />
                      </div>
                    </div>
                  ))
                : null}

              {page.roadmapPhases ? (
                <div className="divide-y divide-border-muted border border-border-muted">
                  {page.roadmapPhases.map((phase) => (
                    <div
                      key={phase.label}
                      className="flex flex-col gap-1 p-4 sm:flex-row sm:gap-6"
                    >
                      <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-foreground-faint sm:w-56">
                        {phase.label}
                      </span>
                      <p className="text-sm leading-relaxed text-foreground-muted sm:text-base">
                        {phase.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              {page.callout ? (
                <Callout
                  variant={page.callout.variant}
                  title={page.callout.title}
                >
                  {page.callout.text}
                </Callout>
              ) : null}

              {page.note ? <Note>{page.note}</Note> : null}

              {page.faqs ? (
                <div>
                  <SubHeading id="faq" title="FAQ" />
                  <div className="mt-4 flex flex-col gap-6">
                    {page.faqs.map((faq) => (
                      <div key={faq.question}>
                        <h4 className="text-sm font-bold text-foreground">
                          {faq.question}
                        </h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {page.glossary ? (
                <div>
                  <SubHeading id="glossary" title="Glossary" />
                  <div className="mt-4 divide-y divide-border-muted border border-border-muted">
                    {page.glossary.map((entry) => (
                      <div
                        key={entry.term}
                        className="flex flex-col gap-1 p-4 sm:flex-row sm:gap-6"
                      >
                        <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-foreground-faint sm:w-40">
                          {entry.term}
                        </span>
                        <p className="text-sm leading-relaxed text-foreground-muted">
                          {entry.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {page.closing ? (
                <p className="border-t border-border-muted pt-8 text-sm leading-relaxed text-foreground-muted sm:text-base">
                  {renderInline(page.closing)}
                </p>
              ) : null}
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 border-t border-border-muted pt-10 sm:grid-cols-2">
            {previous ? (
              <Link
                href={`/whitepaper/${previous.slug}`}
                className="group border border-border-muted p-4 transition-colors hover:border-accent"
              >
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground-faint transition-colors group-hover:text-accent">
                  <ArrowLeft className="h-3 w-3" />
                  Previous
                </span>
                <span className="mt-2 block text-sm font-bold text-foreground">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/whitepaper/${next.slug}`}
                className="group border border-border-muted p-4 text-right transition-colors hover:border-accent"
              >
                <span className="flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground-faint transition-colors group-hover:text-accent">
                  Next
                  <ArrowRight className="h-3 w-3" />
                </span>
                <span className="mt-2 block text-sm font-bold text-foreground">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </div>

          <div className="mt-8 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
            Last updated {whitepaperMeta.updated} · {whitepaperMeta.version}
          </div>
        </div>
      </main>

      <aside className="hidden shrink-0 border-l border-border-muted p-6 xl:sticky xl:top-16 xl:block xl:h-[calc(100dvh-4rem)] xl:w-65 xl:overflow-y-auto">
        <DocsOnThisPage key={slug} />
      </aside>
    </div>
  );
}
