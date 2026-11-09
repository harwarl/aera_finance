import type { Metadata } from "next";
import { Activity } from "@/components/aera/app/Screens2";

export const metadata: Metadata = { title: "Activity" };

export default function Page() {
  return <Activity />;
}
