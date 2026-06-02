"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { storeProducts, type StoreProduct } from "@/data/products";

export interface CartItem extends StoreProduct {
  quantity: number;
}

interface CartContextValue {
  addItem: (productSlug: string, quantity?: number) => void;
  cartCount: number;
  cartOpen: boolean;
  clearCart: () => void;
  items: CartItem[];
  removeItem: (productSlug: string) => void;
  setCartOpen: (open: boolean) => void;
  subtotal: number;
  updateQuantity: (productSlug: string, quantity: number) => void;
}

const STORAGE_KEY = "gutguard-cart";
const CartContext = createContext<CartContextValue | null>(null);

function readStoredItems() {
  if (typeof window === "undefined") return [];

  try {
    const storedItems = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as Array<{ slug: string; quantity: number }>;
    return storedItems.flatMap(({ slug, quantity }) => {
      const product = storeProducts[slug];
      return product && Number.isInteger(quantity) && quantity > 0 ? [{ ...product, quantity }] : [];
    });
  } catch {
    return [];
  }
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedItems = readStoredItems();
    queueMicrotask(() => {
      setItems(storedItems);
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.map(({ slug, quantity }) => ({ slug, quantity }))));
  }, [hydrated, items]);

  function addItem(productSlug: string, quantity = 1) {
    const product = storeProducts[productSlug];
    if (!product || quantity < 1) return;

    setItems((current) => {
      const existing = current.find((item) => item.slug === productSlug);
      if (!existing) return [...current, { ...product, quantity }];
      return current.map((item) => item.slug === productSlug ? { ...item, quantity: Math.min(99, item.quantity + quantity) } : item);
    });
    setCartOpen(true);
  }

  function removeItem(productSlug: string) {
    setItems((current) => current.filter((item) => item.slug !== productSlug));
  }

  function clearCart() {
    setItems([]);
  }

  function updateQuantity(productSlug: string, quantity: number) {
    if (quantity < 1) return removeItem(productSlug);
    setItems((current) => current.map((item) => item.slug === productSlug ? { ...item, quantity: Math.min(99, quantity) } : item));
  }

  const value = {
    addItem,
    cartCount: items.reduce((total, item) => total + item.quantity, 0),
    cartOpen,
    clearCart,
    items,
    removeItem,
    setCartOpen,
    subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0),
    updateQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used within CartProvider.");
  return cart;
}
