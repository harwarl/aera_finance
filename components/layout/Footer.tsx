import { GitBranchPlus, Send, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/shared/Logo";
import { footerLinks, networkStatus, siteConfig } from "@/config/site";

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
              className="font-mono text-xs uppercase tracking-widest text-foreground-muted transition-colors hover:text-foreground"
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
    <footer className="border-t border-border-muted">
      <Container className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-[32ch] text-sm leading-relaxed text-foreground-muted">
            {siteConfig.tagline}
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
      </Container>

      <RulerDivider />

      <Container className="py-8">
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {networkStatus.map((network) => (
            <div
              key={network.name}
              className="flex items-center justify-between border border-border-muted px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-foreground-faint"
            >
              <span>{network.name}</span>
              <span className="flex items-center gap-2 text-accent">
                <span className="h-1.5 w-1.5 bg-accent" />
                {network.status}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-foreground-faint sm:flex-row sm:items-center">
          <span>© 2026 Aera Finance. All rights reserved.</span>
          <span>[ Non-Custodial · On-Chain · Audited ]</span>
        </div>
      </Container>
    </footer>
  );
}

import { RulerDivider } from "@/components/layout/RulerDivider";import { GithubIcon } from "../shared/GithubIcon";

