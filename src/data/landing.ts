import { benefitsData } from "./benefits";
import { faqItems, faqSectionData } from "./faq";
import { footerBrand, footerCtaData, footerLegal, footerLinks } from "./footer";
import { heroData } from "./hero";
import { infoCardsData } from "./info-cards";
import { navItems } from "./navigation";
import { partnerWithUsData } from "./partner-with-us";
import { partnersSectionData } from "./partners";
import { productHighlightData } from "./product-highlight";
import { researchData } from "./research";
import { shopData } from "./shop";
import { testimonialsData } from "./testimonials";

export const landingData = {
  navigation: navItems,
  hero: heroData,
  research: researchData,
  shop: shopData,
  partners: partnersSectionData,
  benefits: benefitsData,
  testimonials: testimonialsData,
  infoCards: infoCardsData,
  productHighlight: productHighlightData,
  discountBanner: {
    title: "Want a Discount?",
    description:
      "Get your bottle for only P4,500 when you join our community\nChoose your membership package:",
    cta: {
      label: "Become a Member",
      href: "/shop",
    },
  },
  partnerWithUs: partnerWithUsData,
  faq: {
    ...faqSectionData,
    items: faqItems,
  },
  footer: {
    brand: footerBrand,
    cta: footerCtaData,
    links: footerLinks,
    legal: footerLegal,
  },
} as const;

export type LandingData = typeof landingData;
