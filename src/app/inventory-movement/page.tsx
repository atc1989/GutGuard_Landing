import type { Metadata } from "next";

import InventoryMovementClient from "@/components/inventory/InventoryMovementClient";

export const metadata: Metadata = {
  title: "Inventory Movement | GutGuard",
  description: "Track bottle and blister inventory movement by date range.",
};

export default function InventoryMovementPage() {
  return <InventoryMovementClient />;
}
