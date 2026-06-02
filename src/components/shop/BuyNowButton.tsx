"use client";

import { useCart } from "@/components/cart/CartProvider";

interface BuyNowButtonProps {
  productSlug: string;
  quantity: number;
}

export default function BuyNowButton({ productSlug, quantity }: BuyNowButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0305C6] px-8 text-[0.97rem] font-semibold !text-white transition duration-200 hover:bg-[#0204A8]"
      onClick={() => addItem(productSlug, quantity)}
      type="button"
    >
      Add to cart
    </button>
  );
}
