import { Geist } from "next/font/google";

// The one font for every Aera Finance page (BUILD.md §2.1). Geist is a
// variable font, so one file covers the 400/500/600 weights we use. Don't
// pass a `weight` array here: Turbopack's dev server fails to resolve the
// per-weight font files ("next/font/google queries have exactly one entry").
export const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});
