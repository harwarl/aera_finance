import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsShell } from "@/components/aera/docs/DocsShell";
import { DocsGuard, DocsStub, DocsVault } from "@/components/aera/docs/Pages";
import { TITLES, TOCS, allSlugs, idFromSlug } from "@/components/aera/docs/data";

export const dynamicParams = false;
export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const id = idFromSlug((await params).slug);
  return { title: id ? TITLES[id][1] : "Docs" };
}

export default async function DocsArticle({ params }: { params: Promise<{ slug: string }> }) {
  const id = idFromSlug((await params).slug);
  if (!id) notFound();
  const kind = id === "vault" || id === "guard" ? id : "stub";
  return (
    <DocsShell active={id} toc={TOCS[kind]}>
      {id === "vault" ? <DocsVault /> : id === "guard" ? <DocsGuard /> : <DocsStub id={id} />}
    </DocsShell>
  );
}
