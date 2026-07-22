import { Footer } from "@/components/layout/Footer";
import { PageGrid } from "@/components/layout/PageGrid";

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <PageGrid />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
