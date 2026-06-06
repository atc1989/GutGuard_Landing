import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  Boxes,
  ClipboardList,
  RefreshCw,
  LayoutDashboard,
  PackageSearch,
  Settings,
  ShoppingBag,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Admin Dashboard | GutGuard",
  description: "GutGuard administrator product and inventory dashboard.",
};

const adminNav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: PackageSearch },
  { label: "Orders", href: "/admin/orders", icon: ClipboardList },
  { label: "TikTok Sync", href: "/admin/tiktok-sync", icon: RefreshCw },
  { label: "Inventory", href: "/inventory-movement", icon: Boxes },
  { label: "Settings", href: "/admin", icon: Settings },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[#F5F7FB] text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[264px_1fr]">
        <aside className="border-b border-slate-200 bg-white px-5 py-5 lg:border-b-0 lg:border-r">
          <Link className="flex items-center gap-3" href="/admin">
            <span className="flex size-10 items-center justify-center rounded-lg bg-[#1010C9] text-white">
              <ShoppingBag className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-slate-950">GutGuard Admin</span>
              <span className="block text-xs text-slate-500">Operations dashboard</span>
            </span>
          </Link>

          <nav className="mt-6 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {adminNav.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  className="flex min-w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                  href={item.href}
                  key={item.label}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 hidden rounded-lg border border-[#1010C9]/15 bg-[#1010C9]/5 p-4 lg:block">
            <div className="flex items-center gap-2">
              <BarChart3 className="size-4 text-[#1010C9]" />
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1010C9]">TikTok sync</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              TikTok Shop data is visible for product sync, order sync, logistics, and inventory control.
            </p>
            <Badge className="mt-3 bg-emerald-50 text-emerald-700" variant="secondary">
              Connected: gutguard.ph
            </Badge>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1010C9]">Administrator</p>
                <h1 className="mt-1 text-2xl font-semibold text-slate-950">Store operations</h1>
              </div>
              <Badge className="w-fit border-[#1010C9]/20 text-[#1010C9]" variant="outline">
                TikTok Shop API
              </Badge>
            </div>
          </header>
          <div className="px-5 py-6 sm:px-8">{children}</div>
        </section>
      </div>
    </main>
  );
}
