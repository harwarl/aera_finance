import type { Metadata } from "next";
import { AdminWaitlist } from "@/components/sections/AdminWaitlist";

export const metadata: Metadata = {
  title: "Admin · Waitlist — Atlas",
};

export default function AdminWaitlistPage() {
  return <AdminWaitlist />;
}
