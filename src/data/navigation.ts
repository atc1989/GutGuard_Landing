export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  {
    label: "Science",
    href: "#",
    children: [
      { label: "Reference", href: "/reference" },
      { label: "Approach", href: "/approach" },
    ],
  },
  {
    label: "PCLM",
    href: "#",
    children: [
      { label: "PCLM Home", href: "https://gutguard-pclm.vercel.app/home" },
      { label: "Doctor", href: "https://gutguard-pclm.vercel.app/doctor" },
      { label: "Patient", href: "https://gutguard-pclm.vercel.app/patient" },
    ],
  },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];
