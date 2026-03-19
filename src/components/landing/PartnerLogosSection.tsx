import Image from "next/image";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { landingData } from "@/data/landing";

export default function PartnerLogosSection() {
  const { partners } = landingData;

  return (
    <section className="pb-6 pt-2 sm:pb-10" id="partners">
      <Container size="xl">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            {partners.eyebrow}
          </p>
        </Reveal>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 rounded-[32px] border border-white/60 bg-white/65 px-6 py-5 shadow-[0_18px_48px_rgba(7,27,84,0.06)] backdrop-blur sm:gap-x-10 sm:px-8">
          {partners.logos.map((partner, index) => (
            <Reveal key={partner.label} delay={index * 70} variant="up">
              <div className="flex min-w-[138px] items-center justify-center">
                <Image
                  alt={partner.altText}
                  className="h-10 w-auto opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                  height={40}
                  src={partner.imagePath}
                  width={124}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
