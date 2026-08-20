import type { Metadata } from "next";
import { AdminTreasury } from "@/components/sections/AdminTreasury";
import { AdminProtocolControls } from "@/components/sections/AdminProtocolControls";
import { AdminAssetWhitelist } from "@/components/sections/AdminAssetWhitelist";
import { AdminAccountOverride } from "@/components/sections/AdminAccountOverride";
import { AdminSwapTarget } from "@/components/sections/AdminSwapTarget";
import { AdminRoles } from "@/components/sections/AdminRoles";

export const metadata: Metadata = {
  title: "Admin · Protocol — Aera Finance",
};

export default function AdminProtocolPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <AdminTreasury />
        <AdminProtocolControls />
      </div>
      <AdminAssetWhitelist />
      <AdminAccountOverride />
      <AdminSwapTarget />
      <AdminRoles />
    </div>
  );
}
