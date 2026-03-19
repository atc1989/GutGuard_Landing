import Image from "next/image";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { landingData } from "@/data/landing";

export default function FooterCTASection() {
  const { cta } = landingData.footer;
  const { bottleImage } = landingData.productHighlight;

  return (
    <section className="section-space pb-14" id="footer-cta">
      <Container size="xl">
        <Reveal variant="up">
          <div className="relative overflow-hidden rounded-[38px] border border-white/70 bg-[linear-gradient(135deg,#071B54_0%,#182C7D_58%,#4F63FF_130%)] px-8 py-10 text-white shadow-[0_30px_90px_rgba(7,27,84,0.16)] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(244,180,0,0.14),transparent_24%)]" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_320px] lg:gap-12">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-100/80">
                  Final step
                </p>
                <h2 className="mt-4 font-serif text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-[2.9rem]">
                  {cta.title}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-8 text-blue-100/78 sm:text-lg">
                  {cta.description}
                </p>
                <div className="mt-8">
                  <Button
                    className="shadow-[0_18px_40px_rgba(244,180,0,0.28)]"
                    href={cta.cta.href}
                    size="lg"
                    variant="yellow"
                  >
                    {cta.cta.label}
                  </Button>
                </div>
              </div>
              <div className="relative flex justify-center lg:justify-end">
                <div className="absolute inset-x-8 top-12 bottom-8 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.02)_72%)] blur-3xl" />
                <Image
                  alt={bottleImage.alt}
                  className="floating-bottle relative z-10 h-auto w-full max-w-[220px] drop-shadow-[0_28px_52px_rgba(3,9,30,0.34)] sm:max-w-[250px]"
                  height={420}
                  src={bottleImage.src}
                  width={250}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
