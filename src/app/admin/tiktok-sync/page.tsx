import type { Metadata } from "next";

import TikTokSyncPanel from "@/components/admin/TikTokSyncPanel";

export const metadata: Metadata = {
  title: "TikTok Shop Sync | GutGuard Admin",
  description: "TikTok Shop synchronization flow for products, orders, logistics, and inventory.",
};

export default function AdminTikTokSyncPage() {
  return <TikTokSyncPanel />;
}
