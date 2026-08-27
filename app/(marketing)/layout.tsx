import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageGrid } from "@/components/layout/PageGrid";
import { ScrollProgressBar } from "@/components/shared/ScrollProgressBar";
import { StarfieldBackdrop } from "@/components/shared/StarfieldBackdrop";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="marketing-scope relative flex min-h-dvh flex-col">
      <StarfieldBackdrop />
      <ScrollProgressBar />
      {/* <PageGrid /> */}
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
