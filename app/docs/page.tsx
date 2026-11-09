import { DocsShell } from "@/components/aera/docs/DocsShell";
import { DocsHome } from "@/components/aera/docs/Pages";
import { TOCS } from "@/components/aera/docs/data";

// reference/Aera-Docs.dc.html · Docs home (BUILD.md §7)
export default function DocsHomePage() {
  return (
    <DocsShell active="home" toc={TOCS.home}>
      <DocsHome />
    </DocsShell>
  );
}
