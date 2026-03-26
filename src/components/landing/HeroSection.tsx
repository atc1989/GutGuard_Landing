import Image from "next/image";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { landingData } from "@/data/landing";
import { epilogue } from "@/lib/fonts";

export default function HeroSection() {
  const { hero } = landingData;

  return (
    <section
      className="relative overflow-hidden bg-[linear-gradient(180deg,#071B54_0%,#0A2163_46%,#16358C_100%)] py-14 text-white sm:py-[4.25rem] lg:py-20"
      id="top"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(255,255,255,0.14),transparent_26%),radial-gradient(circle_at_50%_100%,rgba(79,99,255,0.26),transparent_36%),radial-gradient(circle_at_15%_25%,rgba(255,255,255,0.08),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(7,27,84,0)_0%,rgba(4,14,42,0.22)_100%)]" />
      <Container className="relative" size="xl">
        <div className="relative mx-auto flex min-h-[640px] max-w-[1200px] flex-col items-center text-center sm:min-h-[700px] lg:min-h-[780px]">
          <div className="relative z-20 flex w-full max-w-[960px] flex-col items-center pt-3 sm:pt-5 lg:pt-8">
            <Reveal variant="up">
              <h1 className={`${epilogue.className} max-w-4xl text-center text-[2.15rem] font-normal leading-[0.92] tracking-[-0.05em] text-white sm:text-[2.8rem] lg:text-[55px] lg:whitespace-nowrap`}>
                <span>Your Gut, Your Guard, </span>
                <span className="text-[var(--brand)]">Your Life.</span>
              </h1>
            </Reveal>
            <Reveal className="mt-2" delay={150} variant="up">
              <p className={`${epilogue.className} max-w-[42rem] text-center text-[16px] font-normal leading-6 text-white`}>
                Behind every capsule of GutGuard <strong className="font-bold">SynBIOTIC+</strong> is science you can trust
              </p>
            </Reveal>
            <Reveal className="mt-3" delay={150} variant="up">
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <Button className="min-w-[168px] px-5 py-3 text-sm shadow-[0_18px_40px_rgba(244,180,0,0.3)]" href={hero.primaryCta.href} size="md" variant="yellow">
                  {hero.primaryCta.label}
                </Button>
                <Button className="min-w-[168px] border-white/30 bg-white/4 px-5 py-3 text-sm" href={hero.secondaryCta.href} size="md" variant="outline-light">
                  {hero.secondaryCta.label}
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="relative flex w-full flex-1 items-center justify-center">
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-screen -translate-x-1/2 -translate-y-1/2 overflow-hidden">
              <div className="hero-marquee-track flex w-max whitespace-nowrap">
                <span className="mr-16 bg-[linear-gradient(180deg,#2563EB_0%,#FFFFFF_100%)] bg-clip-text text-[160px] font-semibold leading-none text-transparent sm:text-[190px] lg:text-[220px]">
                  {hero.decorativeText}
                </span>
                <span className="mr-16 bg-[linear-gradient(180deg,#2563EB_0%,#FFFFFF_100%)] bg-clip-text text-[160px] font-semibold leading-none text-transparent sm:text-[190px] lg:text-[220px]">
                  {hero.decorativeText}
                </span>
                <span className="mr-16 bg-[linear-gradient(180deg,#2563EB_0%,#FFFFFF_100%)] bg-clip-text text-[160px] font-semibold leading-none text-transparent sm:text-[190px] lg:text-[220px]">
                  {hero.decorativeText}
                </span>
              </div>
            </div>
            <div className="pointer-events-none absolute left-1/2 top-[60%] z-10 h-36 w-36 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(79,99,255,0.3)_0%,rgba(79,99,255,0.08)_44%,rgba(79,99,255,0)_74%)] blur-3xl sm:h-48 sm:w-48 lg:h-56 lg:w-56" />
            <div className="pointer-events-none absolute left-1/2 top-[71%] z-10 h-12 w-[200px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(2,10,33,0.52)_0%,rgba(2,10,33,0.07)_58%,rgba(2,10,33,0)_80%)] blur-xl sm:w-[250px] lg:w-[310px]" />
            <Reveal className="relative z-20 mt-5 sm:mt-7 lg:mt-8 lg:-translate-y-2" delay={300} variant="scale">
              <Image
                alt={hero.heroImages.bottle.alt}
                className="floating-bottle relative z-10 h-auto w-[216px] drop-shadow-[0_24px_42px_rgba(1,8,27,0.44)] sm:w-[248px] lg:w-[274px]"
                height={648}
                priority
                src={hero.heroImages.bottle.src}
                width={384}
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
