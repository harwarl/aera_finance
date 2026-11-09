import type { Metadata } from "next";
import { Overview } from "@/components/aera/app/Screens1";

export const metadata: Metadata = { title: "Overview" };

export default function Page() {
  return <Overview />;
}
