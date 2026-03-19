import Image from "next/image";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { landingData } from "@/data/landing";

export default function ProductHighlightSection() {
  const { productHighlight } = landingData;

  return (
    <section className="section-space" id="product">
      <Container size="xl">
        <Reveal>
          <SectionHeading
            className="mb-12 [&_h2]:text-[2.7rem]"
            description={productHighlight.description}
            eyebrow="Product highlight"
            title={productHighlight.title}
          />
        </Reveal>
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_0.8fr_0.9fr] lg:gap-10">
          <Reveal variant="left">
            <div className="space-y-4">
              {productHighlight.leftBenefits.map((feature, index) => (
                <div
                  key={feature}
                  className="premium-card flex items-center gap-4 rounded-[24px] px-5 py-5"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(79,99,255,0.14),rgba(79,99,255,0.04))] text-sm font-semibold text-[var(--brand)]">
                    0{index + 1}
                  </span>
                  <p className="text-[0.98rem] leading-8 text-slate-700">{feature}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="flex justify-center" delay={100} variant="scale">
            <div className="relative mx-auto flex w-full max-w-[400px] justify-center">
              <div className="absolute inset-x-2 top-8 bottom-12 rounded-[42px] bg-[radial-gradient(circle,rgba(79,99,255,0.18)_0%,rgba(79,99,255,0.03)_70%)] blur-3xl" />
              <div className="relative overflow-hidden rounded-[42px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0.66))] px-8 pt-10 pb-8 shadow-[0_30px_90px_rgba(7,27,84,0.12)] backdrop-blur">
                <Image
                  alt={productHighlight.bottleImage.alt}
                  className="floating-bottle mx-auto h-auto w-full max-w-[280px] drop-shadow-[0_28px_52px_rgba(7,27,84,0.18)] sm:max-w-[310px]"
                  height={520}
                  src={productHighlight.bottleImage.src}
                  width={310}
                />
                <div className="mt-8 flex justify-center">
                  <Button href={productHighlight.cta.href} size="lg" variant="yellow">
                    {productHighlight.cta.text}
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal variant="right">
            <div className="space-y-4">
              {productHighlight.rightBenefits.map((feature) => (
                <div
                  key={feature}
                  className="premium-card flex items-center gap-4 rounded-[24px] px-5 py-5"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(244,180,0,0.18),rgba(244,180,0,0.05))] text-lg text-[var(--accent)]">
                    ✓
                  </span>
                  <p className="text-[0.98rem] leading-8 text-slate-700">{feature}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
