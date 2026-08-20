import type { Metadata } from "next";
import { AdminWaitlist } from "@/components/sections/AdminWaitlist";

export const metadata: Metadata = {
  title: "Admin · Waitlist — Aera Finance",
};

export default function AdminWaitlistPage() {
  return <AdminWaitlist />;
}
