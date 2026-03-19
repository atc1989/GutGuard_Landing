import Image from "next/image";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { landingData } from "@/data/landing";

const benefitIcons = ["◎", "◌", "△", "✦"];

export default function BenefitsSection() {
  const { benefits } = landingData;

  return (
    <section className="section-space" id="benefits">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16" size="xl">
        <Reveal className="max-w-xl" variant="left">
          <div>
            <SectionHeading
              align="left"
              className="[&_h2]:text-[2.6rem] [&_p]:max-w-none"
              description={benefits.description}
              eyebrow="Benefits"
              title={benefits.title}
            />
            <div className="mt-8 space-y-5">
              {benefits.benefitBulletItems.map((benefit, index) => (
                <div
                  key={benefit}
                  className="premium-card flex items-start gap-4 rounded-[24px] px-5 py-5"
                >
                  <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(79,99,255,0.14),rgba(79,99,255,0.04))] text-lg text-[var(--brand)]">
                    {benefitIcons[index]}
                  </span>
                  <p className="text-[0.98rem] leading-8 text-slate-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal className="flex justify-center lg:justify-end" delay={120} variant="right">
          <div className="relative w-full max-w-[540px]">
            <div className="absolute inset-x-10 top-10 h-[72%] rounded-[42px] bg-[linear-gradient(180deg,rgba(79,99,255,0.18),rgba(79,99,255,0.03))] blur-3xl" />
            <div className="relative overflow-hidden rounded-[42px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,255,255,0.64))] px-8 pt-10 pb-8 shadow-[0_28px_84px_rgba(7,27,84,0.1)] backdrop-blur">
              <div className="mb-8 flex items-center justify-between rounded-full border border-[var(--line)] bg-white/72 px-5 py-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                    Daily support
                  </p>
                  <p className="mt-1 text-sm text-slate-600">Designed for calmer digestion and routine consistency.</p>
                </div>
                <span className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                  GutGuard
                </span>
              </div>
              <Image
                alt={benefits.productImage.alt}
                className="floating-bottle mx-auto h-auto w-full max-w-[300px] drop-shadow-[0_28px_48px_rgba(7,27,84,0.18)] sm:max-w-[340px]"
                height={520}
                src={benefits.productImage.src}
                width={340}
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
