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
    name: "GutGuard SynBiotic+ Blister Pack Triple Biotic (Pre + Pro + Post) 80 Billion CFU Probiotics for Women & Men | Supplement for Digestion, Energy, Cellular Support, Gut Health for Bloating Relief, Detox & Immunity",
    price: 1299,
    image: {
      src: "/images/products/blister-pack-1.jpeg",
      alt: "GutGuard SynBiotic+ Blister Pack Triple Biotic",
    },
  },
  "gutguard-synbiotic-start-protocol": {
    slug: "gutguard-synbiotic-start-protocol",
    name: "GutGuard SynBiotic+ Start Protocol Triple Biotic (Pre + Pro + Post) 80 Billion CFU Probiotics for Women & Men | Supplement for Digestion, Energy, Cellular Support, Gut Health for Bloating Relief, Detox & Immunity",
    price: 4999,
    image: {
      src: "/images/products/start-protocol-1.jpeg",
      alt: "GutGuard SynBiotic+ Start Protocol Triple Biotic",
    },
  },
  "gutguard-synbiotic-grow-protocol": {
    slug: "gutguard-synbiotic-grow-protocol",
    name: "GutGuard SynBiotic+ Grow Protocol Triple Biotic (Pre + Pro + Post) 80 Billion CFU Probiotics for Women & Men | Supplement for Digestion, Energy, Cellular Support, Gut Health for Bloating Relief, Detox & Immunity",
    price: 13999,
    image: {
      src: "/images/products/grow-protocol-1.jpeg",
      alt: "GutGuard SynBiotic+ Grow Protocol Triple Biotic",
    },
  },
  "gutguard-synbiotic-peak-protocol": {
    slug: "gutguard-synbiotic-peak-protocol",
    name: "GutGuard SynBiotic+ Peak Protocol Triple Biotic (Pre + Pro + Post) 80 Billion CFU Probiotics for Women & Men | Supplement for Digestion, Energy, Cellular Support, Gut Health for Bloating Relief, Detox & Immunity",
    price: 39999,
    image: {
      src: "/images/products/peak-protocol-1.jpeg",
      alt: "GutGuard SynBiotic+ Peak Protocol Triple Biotic",
    },
  },
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-PH", { currency: "PHP", style: "currency" }).format(value);
