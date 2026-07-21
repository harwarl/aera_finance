"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { IndexNumber } from "@/components/ui/IndexNumber";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";
import { faqs } from "@/config/site";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="06"
            label="FAQ"
            meta="The Questions We Get Most"
          />
        </Reveal>

        <div className="flex flex-col sm:flex-row">
          <Reveal delay={80}>
            <h2 className="mt-10 max-w-xl text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Straight answers, before you connect a wallet.
            </h2>
          </Reveal>

          <div className="mt-10 flex flex-col divide-y divide-border-muted border-t border-border-muted">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <Reveal key={faq.question} delay={200 + i * 60}>
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-6 py-6 text-left"
                    >
                      <IndexNumber className="w-10 shrink-0 text-lg sm:text-xl">
                        {String(i + 1).padStart(2, "0")}
                      </IndexNumber>
                      <span className="flex-1 text-base font-medium text-foreground sm:text-lg">
                        {faq.question}
                      </span>
                      <Plus
                        className={cn(
                          "h-4 w-4 shrink-0 text-foreground-faint transition-transform duration-200",
                          isOpen && "rotate-45 text-accent",
                        )}
                      />
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
                        <p className="max-w-2xl pb-6 pl-16 text-sm leading-relaxed text-foreground-muted">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
