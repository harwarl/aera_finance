import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { CornerBrackets } from "../shared/CornerBrackets";

export function ManifestoSection() {
  return (
    <section className="border-y border-border-muted bg-background-elevated/50 py-24 sm:py-32">
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <p className="mx-auto max-w-3xl text-3xl font-black leading-[1.15] tracking-tight sm:text-5xl">
            <span className="text-foreground">
              Your portfolio doesn&apos;t need you watching it. It needs
              boundaries you set once, and an agent that{" "}
            </span>
            <span className="text-accent">explains itself every time.</span>
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-12">
            <CornerBrackets>
              <Button href="/connect">Launch Agent</Button>
            </CornerBrackets>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
