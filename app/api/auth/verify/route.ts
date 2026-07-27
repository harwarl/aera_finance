import { NextResponse } from "next/server";

// Placeholder auth endpoint — the real backend doesn't exist yet.
// Accepts the signed message from the wallet and returns a mock session
// token so the connect flow has something real to call. Swap this for
// actual signature verification (e.g. viem's verifyMessage) and session
// issuance once the backend is live.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const address = body?.address as string | undefined;
  const message = body?.message as string | undefined;
  const signature = body?.signature as string | undefined;

  if (!address || !message || !signature) {
    return NextResponse.json(
      { success: false, error: "Missing address, message, or signature." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    address,
    token: "placeholder-session-token",
  });
}
