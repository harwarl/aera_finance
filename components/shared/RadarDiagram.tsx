import { CornerBrackets } from "@/components/shared/CornerBrackets";

const contacts = [
  { label: "REBALANCE", top: "18%", left: "68%" },
  { label: "YIELD ROUTE", top: "62%", left: "78%" },
  { label: "TRADE", top: "74%", left: "22%" },
];

export function RadarDiagram() {
  return (
    <CornerBrackets className="mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-0 rounded-full bg-accent/10 blur-3xl" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-full w-full rounded-full border border-border">
          <div className="absolute inset-[12.5%] rounded-full border border-border" />
          <div className="absolute inset-[25%] rounded-full border border-border" />
          <div className="absolute inset-[37.5%] rounded-full border border-border" />

          <div className="absolute inset-0 origin-center animate-radar-sweep">
            <div className="h-1/2 w-1/2 origin-bottom-right bg-[conic-gradient(from_0deg,rgba(45,212,191,0.35),transparent_35%)]" />
          </div>

          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />

          {contacts.map((contact) => (
            <div
              key={contact.label}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
              style={{ top: contact.top, left: contact.left }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-300" />
              <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-widest text-foreground-faint">
                {contact.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </CornerBrackets>
  );
}
