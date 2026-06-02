"use client";

import Image from "next/image";
import Link from "next/link";

import CartSheet from "@/components/cart/CartSheet";
import { useCart } from "@/components/cart/CartProvider";
import Container from "@/components/ui/Container";
import { landingData } from "@/data/landing";

function ChevronDownIcon() {
  return (
    <svg aria-hidden="true" fill="currentColor" height="10" viewBox="0 0 448 512" width="10">
      <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg fill="none" height="20" viewBox="0 0 22 22" width="20" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.9987 5.98047C9.59445 5.98047 8.46875 7.11319 8.46875 8.51047C8.46875 9.85925 9.52238 10.959 10.8574 11.0289C10.9494 11.0214 11.0474 11.0207 11.1427 11.0287C12.472 10.9577 13.52 9.86225 13.5287 8.50835C13.5276 7.11353 12.3938 5.98047 10.9987 5.98047ZM6.96875 8.51047C6.96875 6.28775 8.76305 4.48047 10.9987 4.48047C13.223 4.48047 15.0287 6.28626 15.0287 8.51047V8.51471H15.0287C15.0165 10.6831 13.3109 12.4562 11.1443 12.53C11.1013 12.5315 11.0583 12.5293 11.0157 12.5234C11.0155 12.5233 11.0153 12.5233 11.0151 12.5233C11.0125 12.5231 11.0082 12.523 11.0025 12.523C10.9902 12.523 10.9789 12.5238 10.9718 12.5247C10.9325 12.5296 10.8928 12.5314 10.8532 12.53C8.69036 12.4563 6.96875 10.6859 6.96875 8.51047Z" fill="currentColor" />
      <path d="M6.44856 16.424C5.67837 16.9428 5.24786 17.5364 5.0801 18.1006C6.68629 19.4456 8.74545 20.2505 11.0017 20.2505C13.258 20.2505 15.3172 19.4456 16.9233 18.1006C16.7555 17.5361 16.3247 16.9422 15.5538 16.4233C14.3436 15.6138 12.698 15.1855 11.0092 15.1855C9.32119 15.1855 7.66982 15.6135 6.44856 16.424ZM11.0092 13.6855C12.9251 13.6855 14.8791 14.167 16.3888 15.1772L16.3904 15.1783C17.5931 15.9876 18.3582 17.086 18.4875 18.3012C18.5127 18.5381 18.4239 18.7728 18.2482 18.9337C16.3355 20.6852 13.7966 21.7505 11.0017 21.7505C8.20683 21.7505 5.66796 20.6852 3.75521 18.9337C3.57955 18.7728 3.49074 18.5381 3.51593 18.3012C3.64521 17.086 4.41035 15.9876 5.61302 15.1783L5.61674 15.1758L5.61675 15.1758C7.13531 14.1671 9.09312 13.6855 11.0092 13.6855Z" fill="currentColor" />
      <path d="M10.9961 1.75195C5.88746 1.75195 1.74609 5.89332 1.74609 11.002C1.74609 16.1106 5.88746 20.252 10.9961 20.252C16.1047 20.252 20.2461 16.1106 20.2461 11.002C20.2461 5.89332 16.1047 1.75195 10.9961 1.75195ZM0.246094 11.002C0.246094 5.06489 5.05903 0.251953 10.9961 0.251953C16.9332 0.251953 21.7461 5.06489 21.7461 11.002C21.7461 16.939 16.9332 21.752 10.9961 21.752C5.05903 21.752 0.246094 16.939 0.246094 11.002Z" fill="currentColor" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg fill="none" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 21L16.65 16.65M18 10.5A7.5 7.5 0 1 1 3 10.5a7.5 7.5 0 0 1 15 0Z" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg fill="none" height="20" viewBox="0 0 19 21.49" width="20" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.25,5.25c0-2.19-1.88-3.95-4.12-3.73h0c-1.82,.17-3.38,2.02-3.38,3.92v.97c0,.41-.34,.75-.75,.75s-.75-.34-.75-.75v-.97C4.25,2.85,6.31,.28,8.99,.03c3.13-.3,5.76,2.16,5.76,5.23v1.38c0,.41-.34,.75-.75,.75s-.75-.34-.75-.75v-1.38Z" fill="currentColor" />
      <path d="M.87,7.56c.89-1.05,2.4-1.57,4.63-1.57h8c2.22,0,3.74,.51,4.63,1.57,.88,1.04,.96,2.42,.82,3.7h0s-.75,6-.75,6c-.11,1.03-.37,2.15-1.29,2.99-.91,.83-2.32,1.25-4.41,1.25H6.5c-2.09,0-3.5-.41-4.41-1.25-.92-.84-1.17-1.96-1.29-2.99L.06,11.25c-.14-1.28-.06-2.65,.82-3.7Zm.67,3.53l.75,6.01c.1,.93,.31,1.59,.81,2.05,.51,.46,1.46,.85,3.4,.85h6c1.93,0,2.89-.39,3.4-.85,.5-.46,.71-1.11,.81-2.05h0s.75-6.01,.75-6.01c.13-1.16,0-2-.48-2.56-.46-.55-1.43-1.03-3.48-1.03H5.5c-2.05,0-3.01,.48-3.48,1.03-.47,.56-.6,1.4-.48,2.56Z" fill="currentColor" />
      <path d="M12,10.74c0-.55,.45-1,1-1h0c.55,0,1,.45,1,1s-.45,1-1,1h0c-.55,0-1-.45-1-1Z" fill="currentColor" />
      <path d="M5,10.74c0-.55,.45-1,1-1h0c.55,0,1,.45,1,1s-.45,1-1,1h0c-.55,0-1-.45-1-1Z" fill="currentColor" />
    </svg>
  );
}

const iconBtnClass = "flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-slate-900";

export default function Navbar() {
  const { navigation } = landingData;
  const { cartCount, setCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <Container
        className="grid min-h-[72px] grid-cols-[1fr_auto_1fr] items-center gap-4"
        size="wide"
      >
        {/* Left: Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button
                  className="flex items-center gap-1.5 text-[0.88rem] font-medium text-slate-700 transition hover:text-slate-950"
                  type="button"
                >
                  {item.label}
                  <span className="mt-0.5 transition-transform duration-200 group-hover:rotate-180">
                    <ChevronDownIcon />
                  </span>
                </button>
                <div className="invisible absolute left-0 top-full z-50 mt-2 min-w-[160px] rounded-xl border border-slate-100 bg-white py-1.5 opacity-0 shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      className="block px-4 py-2 text-[0.85rem] text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      href={child.href}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                className="text-[0.88rem] font-medium text-slate-700 transition hover:text-slate-950"
                href={item.href}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Center: Logo */}
        <Link className="justify-self-center" href="/">
          <Image
            alt="GutGuard logo"
            className="h-auto w-[140px] object-contain sm:w-[160px]"
            height={56}
            priority
            src="/images/gutguard-logo.png"
            width={168}
          />
        </Link>

        {/* Right: Icons */}
        <div className="flex items-center justify-end gap-1">
          <Link aria-label="Account" className={iconBtnClass} href="/my-account/">
            <AccountIcon />
          </Link>
          <button aria-label="Search" className={iconBtnClass} type="button">
            <SearchIcon />
          </button>
          <div className="relative">
            <button aria-label="Cart" className={iconBtnClass} onClick={() => setCartOpen(true)} type="button">
              <CartIcon />
            </button>
            <span className="pointer-events-none absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#07145A] text-[0.55rem] font-bold leading-none text-white">
              {cartCount}
            </span>
          </div>
        </div>
      </Container>
      <CartSheet />
    </header>
  );
}
