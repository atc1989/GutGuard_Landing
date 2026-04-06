import Image from "next/image";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { landingData } from "@/data/landing";

export default function PartnerLogosSection() {
  const { partners } = landingData;

  return (
    <section className="relative pb-12 pt-6 sm:pb-16 sm:pt-8" id="partners">
      <Container size="xl">
        <div className="py-8 sm:py-10">
          <div className="grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 md:gap-x-10 lg:flex lg:flex-nowrap lg:items-center lg:justify-center lg:gap-8">
            {partners.logos.map((partner, index) => (
              <Reveal key={partner.label} delay={index * 70} variant="up">
                <div className={`group flex h-[118px] items-center justify-center lg:h-[138px] lg:shrink-0 ${partner.wrapperClassName ?? ""}`}>
                  <Image
                    alt={partner.altText}
                    className={`${partner.className} brightness-0 invert opacity-42 saturate-0 transition duration-300 ease-out group-hover:opacity-100`}
                    height={partner.height}
                    src={partner.imagePath}
                    width={partner.width}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
