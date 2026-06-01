import React from "react";
import Image from "next/image";
import BenefitsSection from "@/components/landing/BenefitsSection";
import DiscountBannerSection from "@/components/landing/DiscountBannerSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";
import FooterCTASection from "@/components/landing/FooterCTASection";
import HeroSection from "@/components/landing/HeroSection";
import InfoCardsSection from "@/components/landing/InfoCardsSection";
import Navbar from "@/components/landing/Navbar";
import PartnerLogosSection from "@/components/landing/PartnerLogosSection";
import PartnerWithUsSection from "@/components/landing/PartnerWithUsSection";
import ProductHighlightSection from "@/components/landing/ProductHighlightSection";
import ResearchSection from "@/components/landing/ResearchSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <div className="relative overflow-hidden bg-[linear-gradient(180deg,#071B54_0%,#0A2163_46%,#16358C_100%)] text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.12),transparent_18%),radial-gradient(circle_at_18%_72%,rgba(64,196,255,0.14),transparent_18%),radial-gradient(circle_at_50%_58%,rgba(79,99,255,0.16),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(79,99,255,0.2),transparent_30%)]" />
          <HeroSection />
          <ResearchSection />
          <PartnerLogosSection />
        </div>
        <BenefitsSection />
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
            <Image
              alt=""
              className="absolute right-[-8rem] top-0 h-auto w-[34rem] opacity-95"
              height={900}
              src="/images/pro-1-1.png"
              width={900}
            />
          </div>  
          <TestimonialsSection />
          <InfoCardsSection />
        </div>
        <ProductHighlightSection />
        <DiscountBannerSection />
        <PartnerWithUsSection />
        <FAQSection />
        <FooterCTASection />
      </main>
      <Footer />
    </>
  );
}
