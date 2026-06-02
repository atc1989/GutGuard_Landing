"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";

import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatCurrency } from "@/data/products";

export default function CartSheet() {
  const { cartOpen, items, removeItem, setCartOpen, subtotal } = useCart();

  return (
    <Sheet onOpenChange={setCartOpen} open={cartOpen}>
      <SheetContent className="w-full gap-0 sm:max-w-md">
        <SheetHeader className="border-b border-slate-200 px-5 py-5">
          <SheetTitle className="flex items-center gap-2 text-lg text-slate-950">Cart <span className="flex size-5 items-center justify-center rounded-full bg-[#07145A] text-[0.65rem] font-semibold text-white">{items.length}</span></SheetTitle>
          <SheetDescription className="sr-only">Review items currently in your cart.</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center pb-20 text-center">
              <ShoppingBag className="size-9 text-slate-300" />
              <p className="mt-4 font-medium text-slate-950">Your cart is empty</p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">Add a GutGuard product to see it here.</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-200">
              {items.map((item) => (
                <li className="flex gap-4 py-4" key={item.slug}>
                  <Image alt={item.image.alt} className="size-20 bg-[#E8E9EB] object-contain" height={80} src={item.image.src} width={80} />
                  <div className="min-w-0 flex-1">
                    <Link className="font-medium text-slate-950 hover:text-[#1010C9]" href={`/shop/${item.slug}`} onClick={() => setCartOpen(false)}>{item.name}</Link>
                    <p className="mt-2 text-sm text-slate-500">{item.quantity} x {formatCurrency(item.price)}</p>
                  </div>
                  <Button aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.slug)} size="icon-sm" variant="ghost"><Trash2 /></Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && <SheetFooter className="border-t border-slate-200 px-5 py-5">
          <div className="mb-2 flex items-center justify-between text-base"><span className="font-medium text-slate-950">Subtotal</span><span className="font-semibold text-slate-950">{formatCurrency(subtotal)}</span></div>
          <Button className="h-11 !text-white hover:!text-white" nativeButton={false} render={<Link href="/cart" onClick={() => setCartOpen(false)} />}>View cart</Button>
          <Button className="h-11" nativeButton={false} render={<Link href="/checkout" onClick={() => setCartOpen(false)} />} variant="secondary">Checkout</Button>
        </SheetFooter>}
      </SheetContent>
    </Sheet>
  );
}
