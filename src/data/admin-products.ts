export interface AdminProduct {
  slug: string;
  name: string;
  sellerSku: string;
  tiktokProductId: string;
  performance: string;
  views: number;
  sales: number;
  stock: number;
  retailPrice: number;
  status: "Live" | "Draft" | "Deactivated";
  lastSyncedAt: string;
  source: "TikTok Shop";
}

export interface AdminTikTokOrder {
  tiktokOrderId: string;
  customer: string;
  productName: string;
  tiktokProductId: string;
  sellerSku: string;
  quantity: number;
  orderStatus: "Paid" | "Ready to Ship" | "Completed";
  logisticsStatus: "Awaiting shipment" | "Packed" | "Delivered";
  total: number;
  syncedAt: string;
  source: "TikTok Shop";
}

export interface AdminSyncLog {
  id: string;
  event: string;
  detail: string;
  status: "Success" | "Queued";
  syncedAt: string;
}

export const adminProducts: AdminProduct[] = [
  {
    slug: "gutguard-synbiotic-start-protocol",
    name: "GutGuard SynBiotic+ Start Protocol Triple Biot...",
    sellerSku: "SYNBIOTIC+ START PROTOCOL",
    tiktokProductId: "1735690226633574112",
    performance: "1 item sold",
    views: 225,
    sales: 4999,
    stock: 20,
    retailPrice: 4999,
    status: "Live",
    lastSyncedAt: "05/21/2026 2:38 PM",
    source: "TikTok Shop",
  },
  {
    slug: "gutguard-synbiotic-peak-protocol",
    name: "GutGuard SynBiotic+ Peak Protocol Triple Biot...",
    sellerSku: "SYNBIOTIC+ PEAK PROTOCOL",
    tiktokProductId: "1735691058658576096",
    performance: "0 items sold",
    views: 141,
    sales: 0,
    stock: 20,
    retailPrice: 39999,
    status: "Live",
    lastSyncedAt: "05/21/2026 2:38 PM",
    source: "TikTok Shop",
  },
  {
    slug: "gutguard-synbiotic-grow-protocol",
    name: "GutGuard SynBiotic+ Grow Protocol Triple...",
    sellerSku: "SYNBIOTIC+ GROW PROTOCOL",
    tiktokProductId: "1735690692352444128",
    performance: "0 items sold",
    views: 137,
    sales: 0,
    stock: 20,
    retailPrice: 13999,
    status: "Live",
    lastSyncedAt: "05/21/2026 2:37 PM",
    source: "TikTok Shop",
  },
  {
    slug: "gutguard-synbiotic-blister-pack",
    name: "GutGuard SynBiotic+ Blister Pack Triple Biotic...",
    sellerSku: "SYNBIOTIC+BLISTER",
    tiktokProductId: "1737328486628607712",
    performance: "7 items sold",
    views: 2190,
    sales: 9093,
    stock: 18,
    retailPrice: 1299,
    status: "Live",
    lastSyncedAt: "05/21/2026 2:32 PM",
    source: "TikTok Shop",
  },
];

export const adminTikTokOrders: AdminTikTokOrder[] = [
  {
    tiktokOrderId: "578492013645782901",
    customer: "Maria Santos",
    productName: adminProducts[3].name,
    tiktokProductId: adminProducts[3].tiktokProductId,
    sellerSku: adminProducts[3].sellerSku,
    quantity: 2,
    orderStatus: "Ready to Ship",
    logisticsStatus: "Packed",
    total: 2598,
    syncedAt: "06/06/2026 10:24 AM",
    source: "TikTok Shop",
  },
  {
    tiktokOrderId: "584920136457829012",
    customer: "Juan Dela Cruz",
    productName: adminProducts[0].name,
    tiktokProductId: adminProducts[0].tiktokProductId,
    sellerSku: adminProducts[0].sellerSku,
    quantity: 1,
    orderStatus: "Paid",
    logisticsStatus: "Awaiting shipment",
    total: 4999,
    syncedAt: "06/06/2026 10:22 AM",
    source: "TikTok Shop",
  },
  {
    tiktokOrderId: "572018459263740815",
    customer: "Andrea Reyes",
    productName: adminProducts[2].name,
    tiktokProductId: adminProducts[2].tiktokProductId,
    sellerSku: adminProducts[2].sellerSku,
    quantity: 1,
    orderStatus: "Completed",
    logisticsStatus: "Delivered",
    total: 13999,
    syncedAt: "06/06/2026 10:19 AM",
    source: "TikTok Shop",
  },
];

export const adminSyncLogs: AdminSyncLog[] = [
  {
    id: "sync-001",
    event: "Order Sync",
    detail: "Pulled TikTok order 578492013645782901 into GutGuard dashboard.",
    status: "Success",
    syncedAt: "06/06/2026 10:24 AM",
  },
  {
    id: "sync-002",
    event: "Inventory Control",
    detail: "Updated TikTok stock for SYNBIOTIC+BLISTER from 20 to 18 after synced orders.",
    status: "Success",
    syncedAt: "06/06/2026 10:23 AM",
  },
  {
    id: "sync-003",
    event: "Product Sync",
    detail: "Synced 4 TikTok Shop products to the GutGuard product management table.",
    status: "Success",
    syncedAt: "06/06/2026 10:21 AM",
  },
  {
    id: "sync-004",
    event: "Logistics",
    detail: "Imported logistics statuses for 3 TikTok orders.",
    status: "Success",
    syncedAt: "06/06/2026 10:20 AM",
  },
];

export const adminSummary = {
  connectedAccount: "gutguard.ph",
  apiMode: "TikTok Shop API",
  syncedProducts: adminProducts.length,
  activeProducts: adminProducts.filter((product) => product.status === "Live").length,
  syncedOrders: adminTikTokOrders.length,
  lastProductSync: "06/06/2026 10:21 AM",
  lastOrderSync: "06/06/2026 10:24 AM",
  inventoryPushedPulled: "4 products / 78 stock units",
  syncStatus: "TikTok Shop connected",
};
