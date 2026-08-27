import { Send, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/shared/Logo";
import { GithubIcon } from "@/components/shared/GithubIcon";
import { footerLinks, networkStatus, siteConfig } from "@/config/site";

// A single rounded card carrying the whole footer (branding + link columns
// + status line), with a soft accent glow bleeding out from behind its
// bottom edge — reusing the reference's "elevated card over a glowing
// backdrop" shape, but with Atlas's own real nav links and network status
// instead of the reference's own (Unabyss-specific compare pages, skill
// docs, compliance badges — none of which exist here, so none are faked).

const socials = [
  { icon: X, label: "X" },
  { icon: GithubIcon, label: "GitHub" },
  { icon: Send, label: "Telegram" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
        {title}
      </span>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border-muted bg-background-elevated/60 px-6 py-10 sm:px-10 sm:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-accent/10 blur-3xl"
          />

          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div className="flex flex-col gap-4">
              <Logo />
              <p className="max-w-[34ch] text-sm leading-relaxed text-foreground-muted">
                The agent that manages tokenized stocks and on-chain yield.
                Your policy sets the limits. It explains every move in plain
                language.
              </p>
              <div className="mt-2 flex items-center gap-4">
                {socials.map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex h-8 w-8 items-center justify-center border border-border text-foreground-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <FooterColumn title="Product" links={footerLinks.product} />
            <FooterColumn title="Company" links={footerLinks.company} />
            <FooterColumn title="Legal" links={footerLinks.legal} />
          </div>

          <div className="relative mt-12 border-t border-border-muted pt-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
              {networkStatus.map((network) => (
                <span key={network.name} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {network.name} · <span className="text-accent">{network.status}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground-faint sm:flex-row">
          <span>© 2026 {siteConfig.name}. All rights reserved.</span>
          <span>[ Non-Custodial · On-Chain · Phase 0 ]</span>
        </div>
      </Container>
    </footer>
  );
}
