"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { useCart } from "@/components/cart/CartProvider";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/data/products";

export default function CartPage() {
  const { items, removeItem, subtotal, updateQuantity } = useCart();

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-12 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] !text-[#4F63FF]">Shopping cart</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">Your cart</h1>

          {items.length === 0 ? (
            <Card className="mt-8 shadow-sm">
              <CardContent className="flex flex-col items-center px-6 py-16 text-center">
                <ShoppingBag className="size-10 text-slate-300" />
                <h2 className="mt-4 text-lg font-semibold text-slate-950">Your cart is empty</h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">Add a GutGuard product and it will appear here.</p>
                <Button className="mt-5 !text-white hover:!text-white" nativeButton={false} render={<Link href="/shop" />}>Continue shopping</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
              <Card className="shadow-sm">
                <CardHeader><CardTitle>Products</CardTitle></CardHeader>
                <CardContent>
                  <ul className="divide-y divide-slate-200">
                    {items.map((item) => (
                      <li className="grid gap-4 py-5 sm:grid-cols-[96px_1fr_auto] sm:items-center" key={item.slug}>
                        <Image alt={item.image.alt} className="size-24 bg-[#E8E9EB] object-contain" height={96} src={item.image.src} width={96} />
                        <div>
                          <Link className="font-medium text-slate-950 hover:text-[#1010C9]" href={`/shop/${item.slug}`}>{item.name}</Link>
                          <p className="mt-2 text-sm text-slate-500">{formatCurrency(item.price)} each</p>
                          <div className="mt-4 flex items-center gap-3">
                            <div className="flex items-center overflow-hidden rounded-lg border border-slate-200">
                              <Button aria-label={`Decrease ${item.name} quantity`} className="rounded-none" onClick={() => updateQuantity(item.slug, item.quantity - 1)} size="icon" variant="ghost"><Minus /></Button>
                              <span className="flex h-8 min-w-10 items-center justify-center border-x border-slate-200 px-2 text-sm font-medium text-slate-950">{item.quantity}</span>
                              <Button aria-label={`Increase ${item.name} quantity`} className="rounded-none" onClick={() => updateQuantity(item.slug, item.quantity + 1)} size="icon" variant="ghost"><Plus /></Button>
                            </div>
                            <Button onClick={() => removeItem(item.slug)} variant="ghost"><Trash2 />Remove</Button>
                          </div>
                        </div>
                        <p className="font-semibold text-slate-950 sm:self-start sm:pt-1">{formatCurrency(item.price * item.quantity)}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="h-fit shadow-sm">
                <CardHeader><CardTitle>Cart totals</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-slate-600"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between text-base font-semibold text-slate-950"><span>Total</span><span>{formatCurrency(subtotal)}</span></div>
                  <Button className="mt-5 h-11 w-full !text-white hover:!text-white" nativeButton={false} render={<Link href="/checkout" />}>Proceed to checkout</Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
