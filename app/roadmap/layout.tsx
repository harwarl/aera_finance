import { Navbar } from "@/components/layout/Navbar";
import { PageGrid } from "@/components/layout/PageGrid";

export default function RoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <PageGrid />
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
