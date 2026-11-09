import type { Metadata } from "next";
import { NotFoundPage } from "@/components/aera/NotFound";
import { geist } from "@/lib/aeraFont";
import "./aera-tokens.css";
import "./aera-pages.css";

export const metadata: Metadata = {
  title: "Aera Finance · page not found",
};

// reference/Aera-404.dc.html (BUILD.md §6)
export default function NotFound() {
  return (
    <div className={`aera ${geist.variable}`}>
      <NotFoundPage />
    </div>
  );
}
