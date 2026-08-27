import type { Metadata } from "next";
import { AdminErrors } from "@/components/sections/AdminErrors";

export const metadata: Metadata = {
  title: "Admin · Errors — Atlas",
};

export default function AdminErrorsPage() {
  return <AdminErrors />;
}
