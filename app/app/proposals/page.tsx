import type { Metadata } from "next";
import { Proposals } from "@/components/aera/app/Screens1";

export const metadata: Metadata = { title: "Proposals" };

export default function Page() {
  return <Proposals />;
}
