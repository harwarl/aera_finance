import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DesertField } from "@/components/shared/DesertField";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col lg:flex-row">
      <DesertField />
      <DashboardSidebar />
      <main className="relative z-10 min-w-0 flex-1">{children}</main>
    </div>
  );
}
