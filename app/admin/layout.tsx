import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminGate } from "@/components/sections/AdminGate";
import { Container } from "@/components/layout/Container";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <AdminSidebar />
      <main className="min-w-0 flex-1">
        <section className="py-10 sm:py-14">
          <Container>
            <AdminGate>
              <div className="flex flex-col gap-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-danger">
                    Restricted
                  </span>
                  <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-foreground-muted">
                    Access here is gated by checking your connected wallet
                    against an admin allowlist defined in the app — there&apos;s
                    no server-verified session yet, so treat this as a
                    UI-level gate, not real security. Every action still
                    calls the real vault contract; there is no undo once a
                    transaction confirms.
                  </p>
                </div>
                {children}
              </div>
            </AdminGate>
          </Container>
        </section>
      </main>
    </div>
  );
}
