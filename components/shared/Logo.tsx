import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-sans text-lg font-black tracking-tight text-foreground",
        className,
      )}
    >
      <Image src="/aera.png" alt="aera" width={30} height={30} />
      ATLAS
    </span>
  );
}
