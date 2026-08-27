"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";
import { faqs } from "@/config/site";

// A deliberate break from the site's usual left-aligned index+meta header
// row — centered eyebrow, centered headline, then a stack of independent
// pill-shaped accordion cards rather than one divided list. Scoped to this
// section only; the rest of the site keeps the standard SectionHeader rhythm.

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <p className="text-center font-mono text-xs uppercase tracking-widest text-foreground-faint">
            FAQ
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mx-auto mt-4 max-w-2xl text-center text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            Before you ask
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={faq.question} delay={120 + i * 60}>
                <div
                  className={cn(
                    "rounded-[28px] border bg-background-elevated/60 transition-colors duration-300",
                    isOpen ? "border-accent/40" : "border-border-muted",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-6 px-6 py-5 text-left sm:px-8"
                  >
                    <span className="flex-1 text-base font-bold text-foreground sm:text-lg">
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
                        isOpen
                          ? "border-accent/40 text-accent"
                          : "border-border text-foreground-faint",
                      )}
                    >
                      {isOpen ? (
                        <X className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="mx-6 border-t border-border-muted sm:mx-8" />
                      <p className="px-6 pb-6 pt-5 text-sm leading-relaxed text-foreground-muted sm:px-8">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
