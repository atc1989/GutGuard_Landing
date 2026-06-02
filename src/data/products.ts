export interface StoreProduct {
  slug: string;
  name: string;
  price: number;
  image: {
    src: string;
    alt: string;
  };
}

export const storeProducts: Record<string, StoreProduct> = {
  "gutguard-synbiotic": {
    slug: "gutguard-synbiotic",
    name: "GutGuard SynBiotic+",
    price: 3800,
    image: {
      src: "https://gutguard.ph/wp-content/uploads/2025/06/synbiotic-bottle-300x300.png",
      alt: "GutGuard SynBiotic+",
    },
  },
  "gutguard-synbiotic-blister-pack": {
    slug: "gutguard-synbiotic-blister-pack",
    name: "GutGuard SynBiotic+ Blister Pack",
    price: 1299,
    image: {
      src: "https://gutguard.ph/wp-content/uploads/2025/06/synbiotic-blister-300x300.png",
      alt: "GutGuard SynBiotic+ Blister Pack",
    },
  },
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-PH", { currency: "PHP", style: "currency" }).format(value);
