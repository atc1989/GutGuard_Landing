import Image from "next/image";

import Button from "@/components/ui/LegacyButton";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { landingData } from "@/data/landing";

export default function BenefitsSection() {
  const { benefits } = landingData;

  return (
    <section className="section-space bg-white" id="benefits">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-18" size="xl">
        <Reveal className="w-full" variant="left">
          <div>
            <p className="text-[0.9rem] font-medium uppercase tracking-[0.18em]" style={{ color: "#020617" }}>
              {benefits.eyebrow}
            </p>
            <h2 className="mt-6 text-[1.75rem] font-normal leading-[1.1] tracking-[-0.04em] text-slate-950 sm:text-[2.45rem] lg:text-[3.2rem]">
              <span className="block">
                The only <span className="text-[#1A26C8]">Pre, Pro, and Post-biotic</span>
              </span>
              <span className="block"><span className="text-[#1A26C8]">Formula</span> in the Market</span>
            </h2>
            <p className="mt-8 text-[1.08rem] leading-[1.75]" style={{ color: "#020617" }}>
              This is not just another supplement, it&apos;s a scientific breakthrough <strong>designed to RESET your Health:</strong>{" "}
              The only Triple-Biotics formula for better gut health, stronger immunity, and a longer, healthier life.
            </p>
            <div className="mt-10 space-y-5">
              {benefits.benefitBulletItems.map((benefit) => (
                <div key={benefit} className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center bg-[#1A26C8] text-sm font-bold text-white">
                    ✓
                  </span>
                  <p className="text-[1rem] leading-8" style={{ color: "#020617" }}>
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <Button
                className="min-w-[240px] bg-[#FFC857] px-8 py-4 text-[1.02rem] font-semibold text-slate-950 hover:bg-[#FFD479] hover:shadow-[0_18px_40px_rgba(255,200,87,0.28)]"
                href={benefits.ctaHref}
                size="lg"
                variant="yellow"
              >
                {benefits.ctaLabel}
              </Button>
            </div>
          </div>
        </Reveal>
        <Reveal className="flex justify-center lg:justify-end" delay={120} variant="right">
          <div className="relative flex w-full justify-center lg:justify-end">
            <div className="absolute inset-x-8 top-10 h-[80%] rounded-[36px] bg-[radial-gradient(circle,rgba(26,38,200,0.1)_0%,rgba(26,38,200,0.02)_72%,transparent_100%)] blur-3xl" />
            <div className="relative w-full max-w-[476px]">
              <Image
                alt={benefits.productImage.alt}
                className="mx-auto h-auto w-full object-cover"
                height={920}
                src={benefits.productImage.src}
                width={720}
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
