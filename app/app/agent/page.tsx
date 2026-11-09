import type { Metadata } from "next";
import { Agent } from "@/components/aera/app/Screens2";

export const metadata: Metadata = { title: "Agent" };

export default function Page() {
  return <Agent />;
}
