import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, PackageCheck, RefreshCw } from "lucide-react";

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
import { adminProducts } from "@/data/admin-products";
import { formatCurrency } from "@/data/products";

export const metadata: Metadata = {
  title: "Product Management | GutGuard Admin",
  description: "Admin product inventory table with visible TikTok Product ID mappings.",
};

export default function AdminProductsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">Product management</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Seller Center-style product records synced through TikTok Shop API.
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
            href="/inventory-movement"
          >
            Inventory movement
            <ExternalLink className="size-4" />
          </Link>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PackageCheck className="size-5 text-[#1010C9]" />
            Administrator inventory/product management
          </CardTitle>
          <CardDescription>
            Product IDs start with 17 and are placed beside Seller SKU for quick product matching.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Seller SKU</TableHead>
                <TableHead>TikTok Product ID</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Retail Price</TableHead>
                <TableHead>Last Synced</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminProducts.map((product) => (
                <TableRow key={product.slug}>
                  <TableCell className="min-w-[260px]">
                    <p className="font-medium text-slate-950">{product.name}</p>
                    <p className="mt-1 text-xs text-slate-500">Source: {product.source}</p>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs text-slate-700">{product.sellerSku}</span>
                  </TableCell>
                  <TableCell>
                    <span className="rounded-md bg-[#1010C9]/8 px-2 py-1 font-mono text-xs font-semibold text-[#1010C9]">
                      {product.tiktokProductId}
                    </span>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-slate-950">{product.performance}</p>
                    <p className="mt-1 text-xs text-slate-500">Views: {product.views}</p>
                    <p className="text-xs text-slate-500">Sales: {formatCurrency(product.sales)}</p>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-50 text-emerald-700" variant="secondary">
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-slate-950">{product.stock}</TableCell>
                  <TableCell>{formatCurrency(product.retailPrice)}</TableCell>
                  <TableCell className="text-slate-600">{product.lastSyncedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
