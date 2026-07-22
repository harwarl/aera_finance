import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { ScrambleText } from "@/components/shared/ScrambleText";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { Callout } from "@/components/shared/Callout";
import { DocsShellNav } from "@/components/sections/DocsShellNav";
import { WhitepaperOnThisPage } from "@/components/sections/WhitepaperOnThisPage";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { whitepaperMeta, whitepaperSections } from "@/config/site";

export const metadata: Metadata = {
  title: "Whitepaper — Aera Finance",
  description:
    "How Aera's autonomous portfolio agent analyzes, decides, executes, and explains every on-chain trade.",
};

function SectionHeading({
  index,
  id,
  label,
}: {
  index: string;
  id: string;
  label: string;
}) {
  return (
    <div className="scroll-mt-20" id={id}>
      <h2 className="flex items-baseline gap-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
        <span className="font-mono text-sm font-normal text-accent">
          {index}
        </span>
        {label}
      </h2>
      <div className="mt-3 border-b border-border-muted" />
    </div>
  );
}

export default function WhitepaperPage() {
  return (
    <div className="mx-auto flex max-w-[1600px]">
      <aside className="hidden shrink-0 border-r border-border-muted p-6 lg:sticky lg:top-16 lg:block lg:h-[calc(100dvh-4rem)] lg:w-70 lg:overflow-y-auto">
        <DocsShellNav />
      </aside>

      <main className="min-w-0 flex-1 px-6 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-6 flex flex-wrap items-center justify-between gap-2 font-mono text-xs uppercase tracking-widest">
            <span className="text-foreground-muted">
              <span className="text-accent">Documents</span> ·{" "}
              <ScrambleText value="Whitepaper" />
            </span>
            <span className="text-foreground-faint">
              <ScrambleText
                value={`${whitepaperMeta.version} · ${whitepaperMeta.updated} · ${whitepaperMeta.readingTime}`}
              />
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-4xl font-black leading-[0.95] tracking-tighter text-foreground sm:text-5xl">
              How Aera reasons, executes, and{" "}
              <span className="text-accent">explains</span>.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-[60ch] text-sm leading-relaxed text-foreground-muted sm:text-base">
              The technical and risk overview of Aera&apos;s autonomous
              portfolio agent — how it decides, what it&apos;s bounded by,
              and what happens to your assets while it runs.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge>Non-Custodial</Badge>
              <Badge>Audited</Badge>
              <Badge>Open-Source Policy Engine</Badge>
            </div>
          </Reveal>

          <div className="mb-2 mt-10 -mx-6 overflow-x-auto px-6 lg:hidden">
            <div className="flex w-max gap-2">
              {whitepaperSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="whitespace-nowrap border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {section.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            {whitepaperSections.map((section, i) => (
              <Reveal key={section.id} delay={i * 40}>
                <div className="py-10 first:pt-8">
                  <SectionHeading
                    index={section.index}
                    id={section.id}
                    label={section.label}
                  />
                  <div className="mt-5 flex flex-col gap-4">
                    {section.paragraphs.map((paragraph, pi) => (
                      <p
                        key={pi}
                        className="text-sm leading-relaxed text-foreground-muted sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {section.callout ? (
                    <Callout
                      variant={section.callout.variant}
                      title={section.callout.title}
                      className="mt-5"
                    >
                      {section.callout.text}
                    </Callout>
                  ) : null}

                  {i < whitepaperSections.length - 1 ? (
                    <a
                      href={`#${whitepaperSections[i + 1].id}`}
                      className="group mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground-faint transition-colors hover:text-accent"
                    >
                      Next — {whitepaperSections[i + 1].label}
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  ) : null}
                </div>
                {i < whitepaperSections.length - 1 ? (
                  <div className="border-t border-border-muted" />
                ) : null}
              </Reveal>
            ))}
          </div>

          <div className="mt-4 border-t border-border-muted pt-10">
            <Reveal>
              <p className="text-xl font-black leading-[1.15] tracking-tight text-foreground sm:text-2xl">
                Read the mechanics. Then let{" "}
                <span className="text-accent">Aera run the loop</span>.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-6 flex flex-wrap gap-8">
                <CornerBrackets>
                  <Button href="/#solution">Launch Agent</Button>
                </CornerBrackets>
                <Button href="/" variant="secondary">
                  Back to Home
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </main>

      <aside className="hidden shrink-0 border-l border-border-muted p-6 xl:sticky xl:top-16 xl:block xl:h-[calc(100dvh-4rem)] xl:w-65 xl:overflow-y-auto">
        <WhitepaperOnThisPage />
      </aside>
    </div>
  );
}
