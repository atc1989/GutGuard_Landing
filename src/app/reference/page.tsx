import type { Metadata } from "next";

import DiscountBannerSection from "@/components/landing/DiscountBannerSection";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ScienceReferenceContent from "@/components/science/ScienceReferenceContent";
import StrainAccordion from "@/components/science/StrainAccordion";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Formulation & Strains | GutGuard",
  description: "Explore the Lactobacillus strains in GutGuard SynBIOTIC+.",
};

export default function ReferencePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-[#06104E] py-16 text-white sm:py-20">
          <Container size="lg">
            <div className="text-center">
              <h1 className="text-[2.5rem] font-semibold tracking-[-0.065em] text-[#31B4FF] sm:text-[3.25rem]">
                Formulation/Strains
              </h1>
              <p className="mt-1 text-[1.15rem] font-medium !text-white sm:text-[1.35rem]">
                17 Lactobacillus Strains
              </p>
            </div>
            <StrainAccordion />
          </Container>
        </section>
        <ScienceReferenceContent />
        <div className="[&>section]:bg-white [&>section]:pt-0">
          <DiscountBannerSection />
        </div>
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
