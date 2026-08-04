import type { HoldingType } from "@/types";

export const TYPE_LABEL: Record<HoldingType, string> = {
  stock: "Stock Token",
  crypto: "Crypto",
  yield: "Yield",
};

export function formatCurrency(value: number) {
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
