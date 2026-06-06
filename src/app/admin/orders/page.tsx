import type { Metadata } from "next";
import Link from "next/link";
import { RefreshCw, Truck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { adminTikTokOrders } from "@/data/admin-products";
import { formatCurrency } from "@/data/products";

export const metadata: Metadata = {
  title: "TikTok Orders | GutGuard Admin",
  description: "TikTok Shop order sync table with logistics and fulfillment status.",
};

export default function AdminOrdersPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">TikTok orders</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            TikTok Shop orders synced into GutGuard with 18-digit order IDs, product mapping, payment status, and logistics status.
          </p>
        </div>
        <Link
          className="inline-flex h-9 w-fit items-center gap-2 rounded-lg bg-[#1010C9] px-3 text-sm font-medium text-white transition hover:bg-[#0D0DA8]"
          href="/admin/tiktok-sync"
        >
          Run sync
          <RefreshCw className="size-4" />
        </Link>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="size-5 text-[#1010C9]" />
            Order Sync and Logistics
          </CardTitle>
          <CardDescription>
            TikTok Order IDs are 18 digits and start with 57 or 58 for platform-format matching.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>TikTok Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>TikTok Product ID</TableHead>
                <TableHead>Seller SKU</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Logistics</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Synced At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminTikTokOrders.map((order) => (
                <TableRow key={order.tiktokOrderId}>
                  <TableCell>
                    <span className="rounded-md bg-[#1010C9]/8 px-2 py-1 font-mono text-xs font-semibold text-[#1010C9]">
                      {order.tiktokOrderId}
                    </span>
                    <p className="mt-1 text-xs text-slate-500">{order.source}</p>
                  </TableCell>
                  <TableCell className="font-medium text-slate-950">{order.customer}</TableCell>
                  <TableCell className="min-w-[260px] text-slate-700">{order.productName}</TableCell>
                  <TableCell className="font-mono text-xs text-slate-700">{order.tiktokProductId}</TableCell>
                  <TableCell className="font-mono text-xs text-slate-700">{order.sellerSku}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-50 text-emerald-700" variant="secondary">
                      {order.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.logisticsStatus}</TableCell>
                  <TableCell>{formatCurrency(order.total)}</TableCell>
                  <TableCell className="text-slate-600">{order.syncedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
