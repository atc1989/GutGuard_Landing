import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { shopData } from "@/data/shop";

export const metadata: Metadata = {
  title: "Shop | GutGuard",
  description: "Buy GutGuard SynBIOTIC+ — advanced gut health supplement with prebiotics, probiotics, and postbiotics.",
};

export default function ShopPage() {
  const { title, subtitle, products } = shopData;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:px-10 lg:px-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[0.85rem] text-slate-500">
            <Link className="hover:text-slate-800" href="/">Home</Link>
            <span>/</span>
            <span className="text-slate-800">{title}</span>
          </nav>

          {/* Header */}
          <h1 className="text-[2.6rem] font-normal tracking-[-0.03em] text-slate-950 sm:text-[3.2rem]">
            {title}
          </h1>
          <p className="mt-2 text-[0.9rem] text-slate-500">{subtitle}</p>

          {/* Product grid */}
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <li key={product.name}>
                <div className="group flex flex-col">
                  {/* Image */}
                  <Link href={product.href}>
                    <div className="flex items-center justify-center overflow-hidden bg-[#E8E9EB] transition duration-300 group-hover:brightness-95">
                      <Image
                        alt={product.image.alt}
                        className="h-auto w-full max-w-[220px] object-contain transition duration-300 group-hover:scale-105"
                        height={product.image.height}
                        src={product.image.src}
                        width={product.image.width}
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="mt-4 space-y-1.5 px-1">
                    <h2 className="text-[1rem] font-medium leading-snug text-slate-900">
                      <Link className="hover:text-[#0305C6]" href={product.href}>
                        {product.name}
                      </Link>
                    </h2>
                    <p className="text-[1rem] font-semibold text-slate-800">{product.price}</p>
                  </div>

                  {/* CTA */}
                  <div className="mt-4 px-1">
                    <Link
                      className="inline-flex w-full items-center justify-center rounded-lg bg-[#0305C6] px-5 py-3 text-[0.92rem] font-semibold !text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#0204A8] hover:shadow-[0_8px_24px_rgba(3,5,198,0.22)]"
                      href={product.href}
                    >
                      {product.cta}
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
