import type { Metadata } from "next";

import DiscountBannerSection from "@/components/landing/DiscountBannerSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import PartnerLogosSection from "@/components/landing/PartnerLogosSection";
import ProductHighlightSection from "@/components/landing/ProductHighlightSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";

export const metadata: Metadata = {
  title: "Testimonials | GutGuard",
  description: "Read customer stories and common questions about GutGuard SynBIOTIC+.",
};

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <main>
        <TestimonialsSection />
        <FAQSection />
        <ProductHighlightSection />
        <DiscountBannerSection />
        <div className="bg-[#06104E]">
          <PartnerLogosSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
