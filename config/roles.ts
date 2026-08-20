// Placeholder admin allowlist — there is no backend/session system yet, so
// this is a client-side check of the connected wallet address only. It's
// good enough to gate the /admin UI for this stage, but it is NOT a real
// security boundary (see the disclaimer on the admin page itself). Replace
// with a server-verified role once accounts/auth are real.
export const ADMIN_ADDRESSES: string[] = [
  "0x9F2a7c1B4e8D5a3F60c2B7d9E4a1F8c3D5b6A902",
  "0x925b098f9e5f2349926E1de19205b927237fbc46",
];

export function isAdminAddress(address: string | undefined) {
  if (!address) return false;
  return ADMIN_ADDRESSES.some(
    (admin) => admin.toLowerCase() === address.toLowerCase()
  );
}
