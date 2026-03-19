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
        <HeroSection />
        <ResearchSection />
        <PartnerLogosSection />
        <BenefitsSection />
        <TestimonialsSection />
        <InfoCardsSection />
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
