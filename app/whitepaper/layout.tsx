import { DocsTopbar } from "@/components/layout/DocsTopbar";

export default function WhitepaperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <DocsTopbar />
      {children}
    </div>
  );
}
