import Image from "next/image";

import Container from "@/components/ui/Container";
import IconButton from "@/components/ui/IconButton";
import { landingData } from "@/data/landing";

const navIcons = [
  {
    label: "Search",
    icon: (
      <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
        <path d="M21 21L16.65 16.65M18 10.5A7.5 7.5 0 1 1 3 10.5a7.5 7.5 0 0 1 15 0Z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    label: "Account",
    icon: (
      <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 8a7 7 0 0 0-14 0" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    label: "Cart",
    icon: (
      <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
        <path d="M4 6h16l-1.5 8.5H7L5 3H2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        <circle cx="9" cy="19" fill="currentColor" r="1.25" />
        <circle cx="17" cy="19" fill="currentColor" r="1.25" />
      </svg>
    ),
  },
] as const;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-[color:rgba(245,247,251,0.82)] backdrop-blur-xl">
      <Container
        className="grid min-h-[82px] max-w-[1600px] grid-cols-[1fr_auto] items-center gap-6 md:grid-cols-[1fr_auto_1fr]"
        size="xl"
      >
        <nav className="hidden items-center justify-start gap-8 lg:flex">
          {landingData.navigation.map((item) => (
            <a
              key={item.href}
              className="text-sm font-medium tracking-[0.02em] text-slate-600 transition hover:text-[var(--color-primary)]"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="justify-self-start md:justify-self-center"
          href="#top"
        >
          <Image
            alt="GutGuard logo"
            className="h-auto w-[148px] object-contain sm:w-[168px]"
            height={56}
            priority
            src="/images/gutguard-logo.png"
            width={168}
          />
        </a>
        <div className="flex items-center justify-end gap-2">
          {navIcons.map((item) => (
            <IconButton key={item.label} aria-label={item.label} className={item.label !== "Cart" ? "hidden sm:inline-flex" : ""} icon={item.icon} />
          ))}
        </div>
      </Container>
    </header>
  );
}
