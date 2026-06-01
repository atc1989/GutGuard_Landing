import type { Metadata } from "next";

import DiscountBannerSection from "@/components/landing/DiscountBannerSection";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import ProductHighlightSection from "@/components/landing/ProductHighlightSection";
import AdvisoryBoardsSection from "@/components/science/AdvisoryBoardsSection";
import TechnologySection from "@/components/science/TechnologySection";

export const metadata: Metadata = {
  title: "Our Approach | GutGuard",
  description: "Explore the technology and advisory boards behind GutGuard SynBIOTIC+.",
};

export default function ApproachPage() {
  return (
    <>
      <Navbar />
      <main>
        <TechnologySection />
        <AdvisoryBoardsSection />
        <ProductHighlightSection />
        <DiscountBannerSection />
      </main>
      <Footer />
    </>
  );
}
