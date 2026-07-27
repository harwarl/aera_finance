import { PageGrid } from "@/components/layout/PageGrid";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <PageGrid />
      <main className="flex-1">{children}</main>
    </div>
  );
}
