import { Suspense } from "react";
import { ConnectPage } from "@/components/aera/Connect";

// design.md §8 · Layout C (full-bleed vault ring). Reads ?next= for the
// return path, so it needs a Suspense boundary for static rendering.
export default function Connect() {
  return (
    <Suspense>
      <ConnectPage />
    </Suspense>
  );
}
