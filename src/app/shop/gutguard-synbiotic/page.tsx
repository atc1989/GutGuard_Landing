'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import BuyNowButton from "@/components/shop/BuyNowButton";

const galleryImages = [
  {
    src: "https://gutguard.ph/wp-content/uploads/2025/06/synbiotic-bottle-600x717.png",
    thumb: "https://gutguard.ph/wp-content/uploads/2025/06/synbiotic-bottle-300x300.png",
    alt: "GutGuard SynBiotic+",
    width: 600,
    height: 717,
  },
  {
    src: "https://gutguard.ph/wp-content/uploads/2025/06/img-3.png",
    thumb: "https://gutguard.ph/wp-content/uploads/2025/06/img-3-300x300.png",
    alt: "GutGuard SynBiotic+ - Image 2",
    width: 597,
    height: 593,
  },
  {
    src: "https://gutguard.ph/wp-content/uploads/2025/06/synbiotic-1-1-600x696.png",
    thumb: "https://gutguard.ph/wp-content/uploads/2025/06/synbiotic-1-1-300x300.png",
    alt: "GutGuard SynBiotic+ - Image 3",
    width: 600,
    height: 696,
  },
  {
    src: "https://gutguard.ph/wp-content/uploads/2025/06/gut2b.png",
    thumb: "https://gutguard.ph/wp-content/uploads/2025/06/gut2b-300x300.png",
    alt: "GutGuard SynBiotic+ - Image 4",
    width: 600,
    height: 600,
  },
];

type TabId = "description" | "additional" | "reviews";

const tabs: { id: TabId; label: string }[] = [
  { id: "description", label: "Description" },
  { id: "additional", label: "Additional information" },
  { id: "reviews", label: "Reviews (0)" },
];

export default function GutGuardSynbioticPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabId>("description");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:px-10 lg:px-12">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-[0.85rem] text-slate-500">
            <Link className="hover:text-slate-800" href="/">Home</Link>
            <span>/</span>
            <Link className="hover:text-slate-800" href="/shop">SynBIOTIC+</Link>
            <span>/</span>
            <span className="text-slate-800">GutGuard SynBiotic+</span>
          </nav>

          {/* Product */}
          <div className="grid gap-12 lg:grid-cols-2">

            {/* Gallery */}
            <div>
              <div className="overflow-hidden bg-[#E8E9EB]">
                <Image
                  alt={galleryImages[activeImage].alt}
                  className="h-auto w-full object-contain"
                  height={galleryImages[activeImage].height}
                  priority
                  src={galleryImages[activeImage].src}
                  width={galleryImages[activeImage].width}
                />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    className={`overflow-hidden rounded-[8px] border-2 transition duration-150 ${
                      activeImage === i
                        ? "border-[#07145A]"
                        : "border-transparent hover:border-slate-300"
                    }`}
                    onClick={() => setActiveImage(i)}
                    type="button"
                  >
                    <Image
                      alt={img.alt}
                      className="h-auto w-full object-cover"
                      height={300}
                      src={img.thumb}
                      width={300}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="flex flex-col">
              <h1 className="text-[2.2rem] font-normal leading-tight tracking-[-0.03em] text-slate-950">
                GutGuard SynBiotic+
              </h1>
              <p className="mt-3 text-[1.7rem] font-bold tracking-[-0.02em] text-[#07145A]">
                ₱3,800.00
              </p>

              <div className="mt-5 space-y-4 text-[0.97rem] leading-8 text-slate-600">
                <p>
                  GutGuard is the first Triple-Action Gut health Formula (Pre-Pro-Post Biotics)
                  in the Philippines backed by doctors &amp; 15 years of scientific research.
                  Trusted for gut health, immunity, and anti-aging. GutGuard SynBIOTIC+ nourishes
                  this inner ecosystem with 80 billion beneficial microbes a day, restoring balance
                  where it all begins—your gut.
                </p>
                <p>
                  Trusted for gut health, immunity, and anti-aging. A cutting-edge{" "}
                  <strong>triple-biotic</strong> formula combining prebiotics, probiotics, and
                  postbiotics to gently reset your gut, bolster immunity, and sharpen mental
                  clarity.
                </p>
              </div>

              {/* Quantity + CTA */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center overflow-hidden rounded-lg border border-slate-300">
                  <button
                    className="flex h-11 w-10 items-center justify-center text-xl text-slate-600 hover:bg-slate-50"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    type="button"
                  >
                    −
                  </button>
                  <span className="flex h-11 w-12 items-center justify-center border-x border-slate-300 text-[0.97rem] font-medium text-slate-900">
                    {quantity}
                  </span>
                  <button
                    className="flex h-11 w-10 items-center justify-center text-xl text-slate-600 hover:bg-slate-50"
                    onClick={() => setQuantity(quantity + 1)}
                    type="button"
                  >
                    +
                  </button>
                </div>
                <BuyNowButton productSlug="gutguard-synbiotic" quantity={quantity} />
              </div>

              {/* Meta */}
              <div className="mt-8 space-y-2 border-t border-slate-100 pt-6 text-[0.88rem]">
                <p className="text-slate-500">
                  <span className="font-medium text-slate-700">SKU: </span>1
                </p>
                <p className="text-slate-500">
                  <span className="font-medium text-slate-700">Categories: </span>
                  <span className="text-[#1A26C8]">Retail</span>,{" "}
                  <span className="text-[#1A26C8]">SynBIOTIC+</span>
                </p>
                <p className="text-slate-500">
                  <span className="font-medium text-slate-700">Product ID: </span>5560
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <div className="flex gap-0 border-b border-slate-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-5 py-3 text-[0.9rem] font-medium transition duration-150 ${
                    activeTab === tab.id
                      ? "border-b-2 border-[#07145A] text-[#07145A]"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="py-8 text-[0.97rem] leading-8 text-slate-600">
              {activeTab === "description" && (
                <div className="space-y-4">
                  <h2 className="text-[1.15rem] font-semibold text-slate-900">Description</h2>
                  <p>
                    GutGuard is the first Triple-Action Gut health Formula (Pre-Pro-Post Biotics)
                    in the Philippines backed by doctors &amp; 15 years of scientific research.
                    Trusted for gut health, immunity, and anti-aging. GutGuard SynBIOTIC+
                    nourishes this inner ecosystem with 80 billion beneficial microbes a day,
                    restoring balance where it all begins—your gut.
                  </p>
                  <p>Trusted for gut health, immunity, and anti-aging.</p>
                </div>
              )}
              {activeTab === "additional" && (
                <div className="space-y-4">
                  <h2 className="text-[1.15rem] font-semibold text-slate-900">
                    Additional information
                  </h2>
                  <table className="border-collapse text-sm">
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <th className="py-2 pr-16 text-left font-medium text-slate-700">Weight</th>
                        <td className="py-2 text-slate-600">1 kg</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="space-y-4">
                  <h2 className="text-[1.15rem] font-semibold text-slate-900">Reviews</h2>
                  <p className="text-slate-400">There are no reviews yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Related products */}
          <div className="mt-4 border-t border-slate-100 pt-12">
            <h2 className="text-[1.6rem] font-normal tracking-[-0.02em] text-slate-900">
              Related products
            </h2>
            <ul className="mt-8 grid w-fit grid-cols-1 gap-6 sm:grid-cols-2">
              <li>
                <div className="group flex w-[220px] flex-col">
                  <Link href="/shop/gutguard-synbiotic-blister-pack">
                    <div className="flex items-center justify-center overflow-hidden bg-[#E8E9EB] transition duration-300 group-hover:brightness-95">
                      <Image
                        alt="GutGuard SynBiotic+ Blister Pack"
                        className="h-auto w-full max-w-[160px] object-contain transition duration-300 group-hover:scale-105"
                        height={300}
                        src="https://gutguard.ph/wp-content/uploads/2025/06/synbiotic-blister-300x300.png"
                        width={300}
                      />
                    </div>
                  </Link>
                  <div className="mt-3 space-y-1 px-1">
                    <h3 className="text-[0.95rem] font-medium leading-snug text-slate-900">
                      <Link className="hover:text-[#1A26C8]" href="/shop/gutguard-synbiotic-blister-pack">
                        GutGuard SynBiotic+ Blister Pack
                      </Link>
                    </h3>
                    <p className="text-[0.95rem] font-semibold text-slate-800">₱1,299.00</p>
                  </div>
                  <div className="mt-3 px-1">
                    <Link
                      className="inline-flex w-full items-center justify-center rounded-lg bg-[#0305C6] px-4 py-2.5 text-[0.88rem] font-semibold !text-white transition hover:-translate-y-0.5 hover:bg-[#0204A8]"
                      href="/shop/gutguard-synbiotic-blister-pack"
                    >
                      Buy now
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
