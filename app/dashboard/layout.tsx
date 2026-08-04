import { PageGrid } from "@/components/layout/PageGrid";
import { DashboardTopbar } from "@/components/layout/DashboardTopbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <PageGrid />
      <DashboardTopbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
