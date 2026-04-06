import Image from "next/image";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { landingData } from "@/data/landing";

function CheckIcon() {
  return (
    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center bg-[#1A26C8] text-sm font-bold text-white">
      ✓
    </span>
  );
}

function LockIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="34" viewBox="0 0 24 24" width="34">
      <path
        d="M7 10V7a5 5 0 0 1 10 0v3m-9 0h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path d="M12 14.5v2.8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="34" viewBox="0 0 24 24" width="34">
      <path
        d="M12 3l7 3.2V11c0 4.7-2.7 8.3-7 10-4.3-1.7-7-5.3-7-10V6.2L12 3Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path d="M9.2 12.2 11.2 14l3.8-4.2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

export default function ProductHighlightSection() {
  const { productHighlight } = landingData;

  return (
    <section
      className="overflow-hidden bg-[linear-gradient(180deg,#07145A_0%,#0A1458_100%)] px-0 pt-[var(--space-section)] pb-8 text-white sm:pt-[6.25rem] sm:pb-10"
      id="product"
    >
      <Container className="relative" size="xl">
        <Reveal>
          <div className="text-center">
            <h2 className="text-[2.6rem] font-semibold leading-none tracking-[-0.05em] text-[#37B4FF] sm:text-[3.4rem] lg:text-[4.1rem]">
              {productHighlight.title}
            </h2>
            <p className="mt-2 text-[1.9rem] font-medium tracking-[-0.03em] !text-white sm:text-[2.3rem]" style={{ color: "#ffffff" }}>
              {productHighlight.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="relative mt-8 grid items-center gap-10 lg:grid-cols-[1fr_0.9fr_1fr] lg:gap-12">
          <Reveal variant="left">
            <div className="space-y-7 lg:pr-4">
              {productHighlight.leftBenefits.map((feature) => (
                <div key={feature} className="flex items-start gap-4">
                  <CheckIcon />
                  <p className="max-w-[21rem] text-[1.05rem] leading-[1.28] !text-white sm:text-[1.16rem]">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="flex justify-center" delay={100} variant="scale">
            <div className="relative mx-auto flex w-full max-w-[27rem] flex-col items-center">
              <div className="pointer-events-none absolute inset-x-[-1rem] top-[4rem] h-[70%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_72%)] blur-3xl" />
              <Image
                alt={productHighlight.bottleImage.alt}
                className="relative z-10 h-auto w-full max-w-[21rem] drop-shadow-[0_38px_70px_rgba(0,0,0,0.42)] sm:max-w-[24rem]"
                height={920}
                src={productHighlight.bottleImage.src}
                width={720}
              />
              <div className="relative z-10 mt-10">
                <Button
                  className="min-w-[19rem] bg-[#F7C34A] px-10 py-4 text-[1.05rem] font-semibold text-black hover:bg-[#FFD063]"
                  href={productHighlight.cta.href}
                  size="lg"
                  variant="yellow"
                >
                  {productHighlight.cta.text}
                </Button>
              </div>
              <div className="relative z-10 mt-8 flex items-center justify-center gap-8 text-white">
                <div className="flex items-center gap-3">
                  <span className="text-white">
                    <LockIcon />
                  </span>
                  <p
                    className="text-[0.78rem] font-semibold uppercase leading-[1.2] tracking-[0.22em] !text-white"
                    style={{ color: "#ffffff" }}
                  >
                    Secure SSL
                    <br />
                    Encryption
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white">
                    <ShieldIcon />
                  </span>
                  <p
                    className="text-[0.78rem] font-semibold uppercase leading-[1.2] tracking-[0.22em] !text-white"
                    style={{ color: "#ffffff" }}
                  >
                    Guaranteed Safe
                    <br />
                    Checkout
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal variant="right">
            <div className="space-y-7 lg:pl-4">
              {productHighlight.rightBenefits.map((feature) => (
                <div key={feature} className="flex items-start gap-4">
                  <CheckIcon />
                  <p className="max-w-[21rem] text-[1.05rem] leading-[1.28] !text-white sm:text-[1.16rem]">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
