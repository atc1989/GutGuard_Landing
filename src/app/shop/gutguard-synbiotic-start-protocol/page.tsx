'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import BuyNowButton from "@/components/shop/BuyNowButton";

const galleryImages = [
  {
    src: "/images/products/start-protocol-1.jpeg",
    thumb: "/images/products/start-protocol-1.jpeg",
    alt: "GutGuard SynBiotic+ Start Protocol Triple Biotic",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/start-protocol-2.jpeg",
    thumb: "/images/products/start-protocol-2.jpeg",
    alt: "GutGuard SynBiotic+ Start Protocol Triple Biotic - Image 2",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/start-protocol-3.jpeg",
    thumb: "/images/products/start-protocol-3.jpeg",
    alt: "GutGuard SynBiotic+ Start Protocol Triple Biotic - Image 3",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/start-protocol-4.jpeg",
    thumb: "/images/products/start-protocol-4.jpeg",
    alt: "GutGuard SynBiotic+ Start Protocol Triple Biotic - Image 4",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/start-protocol-5.jpeg",
    thumb: "/images/products/start-protocol-5.jpeg",
    alt: "GutGuard SynBiotic+ Start Protocol Triple Biotic - Image 5",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/start-protocol-6.jpeg",
    thumb: "/images/products/start-protocol-6.jpeg",
    alt: "GutGuard SynBiotic+ Start Protocol Triple Biotic - Image 6",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/start-protocol-7.jpeg",
    thumb: "/images/products/start-protocol-7.jpeg",
    alt: "GutGuard SynBiotic+ Start Protocol Triple Biotic - Image 7",
    width: 1200,
    height: 1200,
  },
];

type TabId = "description" | "additional" | "reviews";

const tabs: { id: TabId; label: string }[] = [
  { id: "description", label: "Description" },
  { id: "additional", label: "Additional information" },
  { id: "reviews", label: "Reviews (0)" },
];

const productTitle =
  "GutGuard SynBiotic+ Start Protocol Triple Biotic (Pre + Pro + Post) 80 Billion CFU Probiotics for Women & Men | Supplement for Digestion, Energy, Cellular Support, Gut Health for Bloating Relief, Detox & Immunity";

const descriptionPoints = [
  "GutGuard SynBiotic+ Blister Pack",
  "Triple-Action Gut Health Formula",
  "Pre-Pro-Post Biotics: GutGuard is the first formula in the Philippines backed by doctors and 15 years of scientific research.",
  "Nourishes Inner Ecosystem: Contains 80 billion beneficial microbes daily, restoring balance in your gut.",
  "Trusted for Gut Health, Immunity, and Anti-Aging: A cutting-edge triple-biotic formula combining prebiotics, probiotics, and postbiotics.",
  "Gentle Reset: Resets your gut, bolsters immunity, and sharpens mental clarity.",
  "Scientific Breakthrough: The only Pre, Pro, and Post-biotic formula in the market.",
  "Anti-Aging: Contains Urolithin-A & L-Tryptophan.",
  "Gut-Brain Axis Support: Supports the gut-brain axis.",
  "Scientific and Medical Research: Backed by 15 years of scientific and medical research.",
  "Developed with Leading Organizations: Developed with 7 leading organizations.",
  "ISO-Certified Facility: Produced in a P1 Billion ISO-certified facility.",
  "Experience Better Gut Health, Stronger Immunity, and a Longer, Healthier Life",
  "GutGuard SynBiotic+ Blister Pack is your trusted solution for gut health, immunity, and anti-aging.",
];

export default function GutGuardStartProtocolPage() {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabId>("description");
  const [activeImage, setActiveImage] = useState(0);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:px-10 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-[0.85rem] text-slate-500">
            <Link className="hover:text-slate-800" href="/">Home</Link>
            <span>/</span>
            <Link className="hover:text-slate-800" href="/shop">SynBIOTIC+</Link>
            <span>/</span>
            <span className="text-slate-800">{productTitle}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-2">
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
                {galleryImages.map((img, index) => (
                  <button
                    key={img.alt}
                    className={`overflow-hidden rounded-[8px] border-2 transition duration-150 ${activeImage === index ? "border-[#07145A]" : "border-transparent hover:border-slate-300"}`}
                    onClick={() => setActiveImage(index)}
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

            <div className="flex flex-col">
              <h1 className="text-[2.2rem] font-normal leading-tight tracking-[-0.03em] text-slate-950">
                {productTitle}
              </h1>
              <p className="mt-3 text-[1.7rem] font-bold tracking-[-0.02em] text-[#07145A]">
                P4,999.00
              </p>

              <div className="mt-5 space-y-4 text-[0.97rem] leading-8 text-slate-600">
                {descriptionPoints.map((point, index) => (
                  <p key={point}>
                    {index < 2 ? <strong>{point}</strong> : point}
                  </p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center overflow-hidden rounded-lg border border-slate-300">
                  <button className="flex h-11 w-10 items-center justify-center text-xl text-slate-600 hover:bg-slate-50" onClick={() => setQuantity(Math.max(1, quantity - 1))} type="button">-</button>
                  <span className="flex h-11 w-12 items-center justify-center border-x border-slate-300 text-[0.97rem] font-medium text-slate-900">{quantity}</span>
                  <button className="flex h-11 w-10 items-center justify-center text-xl text-slate-600 hover:bg-slate-50" onClick={() => setQuantity(quantity + 1)} type="button">+</button>
                </div>
                <BuyNowButton productSlug="gutguard-synbiotic-start-protocol" quantity={quantity} />
              </div>

              <div className="mt-8 space-y-2 border-t border-slate-100 pt-6 text-[0.88rem]">
                <p className="text-slate-500"><span className="font-medium text-slate-700">SKU: </span>1-2</p>
                <p className="text-slate-500"><span className="font-medium text-slate-700">Categories: </span><span className="text-[#1A26C8]">Retail</span>, <span className="text-[#1A26C8]">SynBIOTIC+</span></p>
                <p className="text-slate-500"><span className="font-medium text-slate-700">Product ID: </span>1735690226633574112</p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div className="flex gap-0 border-b border-slate-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-5 py-3 text-[0.9rem] font-medium transition duration-150 ${activeTab === tab.id ? "border-b-2 border-[#07145A] text-[#07145A]" : "text-slate-500 hover:text-slate-800"}`}
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
                  {descriptionPoints.map((point, index) => (
                    <p key={point}>
                      {index < 2 ? <strong>{point}</strong> : point}
                    </p>
                  ))}
                </div>
              )}
              {activeTab === "additional" && (
                <div className="space-y-4">
                  <h2 className="text-[1.15rem] font-semibold text-slate-900">Additional information</h2>
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
        </div>
      </main>
      <Footer />
    </>
  );
}
