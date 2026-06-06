"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { adminProducts, adminSummary, adminSyncLogs, adminTikTokOrders } from "@/data/admin-products";

const syncSteps = [
  "Connected TikTok Shop account gutguard.ph",
  "Fetched 4 products from TikTok Seller Center",
  "Pulled 3 TikTok orders into GutGuard dashboard",
  "Imported logistics statuses for synced orders",
  "Reconciled TikTok inventory with GutGuard admin stock",
];

export default function TikTokSyncPanel() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasSynced, setHasSynced] = useState(true);
  const [syncTime, setSyncTime] = useState(adminSummary.lastOrderSync);

  function runSync() {
    setIsSyncing(true);
    setHasSynced(false);

    window.setTimeout(() => {
      setIsSyncing(false);
      setHasSynced(true);
      setSyncTime(new Intl.DateTimeFormat("en-PH", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date()));
    }, 1100);
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">TikTok Shop sync</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Connect, run sync, then show products, orders, logistics, and inventory updates from TikTok Shop.
          </p>
        </div>
        <Button className="h-9 w-fit bg-[#1010C9] px-3 text-white hover:bg-[#0D0DA8]" disabled={isSyncing} onClick={runSync}>
          {isSyncing ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
          {isSyncing ? "Syncing..." : "Run Sync"}
        </Button>
      </div>

      <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <Card className="border-[#1010C9]/20 shadow-sm">
          <CardHeader>
            <CardTitle>Connect TikTok Shop</CardTitle>
            <CardDescription>Connection state shown before the synchronization run.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
              <span className="text-slate-600">Connected account</span>
              <span className="font-semibold text-slate-950">{adminSummary.connectedAccount}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
              <span className="text-slate-600">Status</span>
              <Badge className="bg-emerald-50 text-emerald-700" variant="secondary">Connected</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
              <span className="text-slate-600">API mode</span>
              <span className="font-semibold text-slate-950">{adminSummary.apiMode}</span>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs font-medium uppercase text-slate-500">Last completed sync</p>
              <p className="mt-1 font-semibold text-slate-950">{syncTime}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Synchronization results</CardTitle>
            <CardDescription>Visible checkpoints for product, order, logistics, and inventory sync.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {syncSteps.map((step, index) => (
              <div
                className={`flex items-start gap-3 rounded-lg border p-4 transition ${
                  hasSynced ? "border-emerald-100 bg-emerald-50/60" : "border-slate-200 bg-white"
                }`}
                key={step}
              >
                {hasSynced ? (
                  <CheckCircle2 className="mt-0.5 size-4 text-emerald-600" />
                ) : (
                  <span className="mt-0.5 flex size-4 items-center justify-center rounded-full bg-slate-200 text-[10px] text-slate-600">
                    {index + 1}
                  </span>
                )}
                <p className="text-sm leading-6 text-slate-700">{step}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Product Sync</CardTitle>
            <CardDescription>TikTok products pulled into GutGuard.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-slate-950">{adminProducts.length}</p>
            <p className="mt-2 text-sm text-slate-600">All product IDs start with 17.</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Order Sync</CardTitle>
            <CardDescription>TikTok orders imported for fulfillment.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-slate-950">{adminTikTokOrders.length}</p>
            <p className="mt-2 text-sm text-slate-600">Order IDs start with 57 or 58.</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Inventory Control</CardTitle>
            <CardDescription>Stock mirrors TikTok Seller Center.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-slate-950">78</p>
            <p className="mt-2 text-sm text-slate-600">Total synced stock units.</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Synced TikTok products</CardTitle>
            <CardDescription>Product IDs imported from Seller Center formatting.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {adminProducts.map((product) => (
              <div className="rounded-lg border border-slate-200 bg-white p-4" key={product.slug}>
                <p className="font-medium text-slate-950">{product.name}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge className="font-mono text-[#1010C9]" variant="outline">{product.tiktokProductId}</Badge>
                  <Badge className="bg-slate-100 text-slate-700" variant="secondary">{product.sellerSku}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Synced TikTok orders</CardTitle>
            <CardDescription>Order IDs imported through TikTok Shop sync.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {adminTikTokOrders.map((order) => (
              <div className="rounded-lg border border-slate-200 bg-white p-4" key={order.tiktokOrderId}>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <Badge className="w-fit bg-emerald-50 font-mono text-emerald-700" variant="secondary">
                    {order.tiktokOrderId}
                  </Badge>
                  <span className="text-sm text-slate-600">{order.logisticsStatus}</span>
                </div>
                <p className="mt-2 text-sm font-medium text-slate-950">{order.productName}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Sync log</CardTitle>
          <CardDescription>Product, order, logistics, and inventory activity from TikTok Shop.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {adminSyncLogs.map((log) => (
            <div className="rounded-lg border border-slate-200 bg-white p-4" key={log.id}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-medium text-slate-950">{log.event}</p>
                <Badge className="w-fit bg-emerald-50 text-emerald-700" variant="secondary">{log.status}</Badge>
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
