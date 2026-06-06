import Link from "next/link";
import { ArrowRight, Boxes, CheckCircle2, Link2, PackageSearch, RefreshCw, ShoppingCart, Truck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { adminProducts, adminSummary, adminSyncLogs, adminTikTokOrders } from "@/data/admin-products";
import { formatCurrency } from "@/data/products";

const summaryCards = [
  {
    label: "Synced products",
    value: adminSummary.activeProducts,
    detail: "TikTok Product IDs start with 17",
    icon: PackageSearch,
  },
  {
    label: "Synced orders",
    value: adminSummary.syncedOrders,
    detail: "Order IDs start with 57 or 58",
    icon: CheckCircle2,
  },
  {
    label: "Inventory sync",
    value: 78,
    detail: "TikTok stock units mirrored",
    icon: Boxes,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">Dashboard</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            An integration dashboard showing TikTok Shop connection, product sync, order sync, logistics, and inventory control.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            className="inline-flex h-9 w-fit items-center gap-2 rounded-lg bg-[#1010C9] px-3 text-sm font-medium text-white transition hover:bg-[#0D0DA8]"
            href="/admin/tiktok-sync"
          >
            Run sync
            <RefreshCw className="size-4" />
          </Link>
          <Link
            className="inline-flex h-9 w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            href="/admin/products"
          >
            Open products
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-[#1010C9]/20 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="size-5 text-[#1010C9]" />
              Connect TikTok Shop
            </CardTitle>
            <CardDescription>Connection state for the TikTok Shop integration.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 p-3">
              <p className="text-xs font-medium uppercase text-slate-500">Connected account</p>
              <p className="mt-1 font-semibold text-slate-950">{adminSummary.connectedAccount}</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <p className="text-xs font-medium uppercase text-slate-500">Status</p>
              <p className="mt-1 font-semibold text-emerald-700">Connected</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <p className="text-xs font-medium uppercase text-slate-500">API mode</p>
              <p className="mt-1 font-semibold text-slate-950">{adminSummary.apiMode}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Last sync</CardTitle>
            <CardDescription>Product, order, logistics, and inventory sync activity.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-700">
            <p>Product sync: <span className="font-medium text-slate-950">{adminSummary.lastProductSync}</span></p>
            <p>Order sync: <span className="font-medium text-slate-950">{adminSummary.lastOrderSync}</span></p>
            <p>Inventory: <span className="font-medium text-slate-950">{adminSummary.inventoryPushedPulled}</span></p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((item) => {
          const Icon = item.icon;

          return (
            <Card className="shadow-sm" key={item.label}>
              <CardHeader>
                <CardTitle>{item.label}</CardTitle>
                <CardDescription>{item.detail}</CardDescription>
                <CardAction>
                  <Icon className="size-5 text-[#1010C9]" />
                </CardAction>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold text-slate-950">{item.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Product connection status</CardTitle>
            <CardDescription>Seller Center products synced into GutGuard admin.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {adminProducts.map((product) => (
              <div
                className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
                key={product.slug}
              >
                <div>
                  <p className="font-medium text-slate-950">{product.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{product.sellerSku}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-emerald-50 text-emerald-700" variant="secondary">
                    {product.tiktokProductId}
                  </Badge>
                  <span className="text-sm font-medium text-slate-700">{formatCurrency(product.retailPrice)}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Latest TikTok order</CardTitle>
            <CardDescription>18-digit TikTok order ID imported through TikTok Shop sync.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Badge className="bg-emerald-50 font-mono text-emerald-700" variant="secondary">
              {adminTikTokOrders[0].tiktokOrderId}
            </Badge>
            <p className="text-sm font-medium text-slate-950">{adminTikTokOrders[0].productName}</p>
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Truck className="size-4 text-[#1010C9]" />
              {adminTikTokOrders[0].logisticsStatus}
            </div>
            <Link
              className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href="/admin/orders"
            >
              View synced orders
              <ShoppingCart className="size-4" />
            </Link>
          </CardContent>
        </Card>
      </section>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Sync log</CardTitle>
          <CardDescription>Traceable integration flow for the recorded walkthrough.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {adminSyncLogs.map((log) => (
            <div className="rounded-lg border border-slate-200 bg-white p-4" key={log.id}>
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-slate-950">{log.event}</p>
                <Badge className="bg-emerald-50 text-emerald-700" variant="secondary">{log.status}</Badge>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{log.detail}</p>
              <p className="mt-2 text-xs text-slate-500">{log.syncedAt}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
