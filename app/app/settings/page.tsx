import type { Metadata } from "next";
import { Settings } from "@/components/aera/app/Screens2";

export const metadata: Metadata = { title: "Settings" };

export default function Page() {
  return <Settings />;
}
