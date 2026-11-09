import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Waitlist sign-up (BUILD.md §5): POST { email, handle } → { position, code }.
 * TODO: persist sign-ups and compute the real position. There is no
 * datastore yet, so this returns the design's sample position.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { email?: unknown; handle?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const handle = typeof body?.handle === "string" ? body.handle.trim().replace(/^@/, "") : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email so we can reach you." }, { status: 400 });
  }
  const code = (handle || email.split("@")[0]).toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 12) || "you";
  return NextResponse.json({ position: 1284, code });
}
