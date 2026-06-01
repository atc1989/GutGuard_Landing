export const shopData = {
  eyebrow: "OUR PRODUCTS",
  title: "Shop",
  subtitle: "Showing all 2 results",
  products: [
    {
      name: "GutGuard SynBiotic+",
      price: "₱3,800.00",
      image: {
        src: "https://gutguard.ph/wp-content/uploads/2025/06/synbiotic-bottle-410x490.png",
        alt: "GutGuard SynBiotic+",
        width: 410,
        height: 490,
      },
      href: "/shop/gutguard-synbiotic",
      cta: "Buy Now",
    },
    {
      name: "GutGuard SynBiotic+ Blister Pack",
      price: "₱1,299.00",
      image: {
        src: "https://gutguard.ph/wp-content/uploads/2025/06/synbiotic-blister-410x490.png",
        alt: "GutGuard SynBiotic+ Blister Pack",
        width: 410,
        height: 490,
      },
      href: "/shop/gutguard-synbiotic-blister-pack",
      cta: "Buy Now",
    },
  ],
} as const;
