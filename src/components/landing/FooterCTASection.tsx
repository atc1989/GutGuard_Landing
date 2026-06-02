import Image from "next/image";

import Button from "@/components/ui/LegacyButton";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { landingData } from "@/data/landing";

const ctaHighlights = [
  "80 Billion CFU",
  "17 Multi-Strain Bacteria",
  "Pre + Pro + Post Biotics",
];

const ctaTrustPoints = [
  "Secure checkout",
  "FDA registered",
  "Daily-use formula",
];

export default function FooterCTASection() {
  const { cta } = landingData.footer;
  const { bottleImage } = landingData.productHighlight;

  return (
    <section className="section-space pb-14" id="footer-cta">
      <Container size="xl">
        <Reveal variant="up">
          <div className="relative overflow-hidden rounded-[38px] border border-white/70 bg-[linear-gradient(135deg,#071B54_0%,#182C7D_58%,#4F63FF_130%)] px-8 py-10 text-white shadow-[0_30px_90px_rgba(7,27,84,0.16)] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_24%),radial-gradient(circle_at_72%_54%,rgba(255,255,255,0.1),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(244,180,0,0.16),transparent_26%)]" />
            <div className="pointer-events-none absolute inset-y-0 right-[18%] w-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))] blur-2xl" />
            <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
              <div className="flex max-w-[35rem] flex-col gap-12 pt-4 [&_p]:text-white [&_span]:text-white">
                <div className="space-y-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] !text-white">
                    Final step
                  </p>
                  <h2 className="max-w-[31rem] font-serif text-[2.25rem] font-semibold leading-[1.24] tracking-[-0.04em] !text-white sm:text-[2.7rem]">
                    {cta.title}
                  </h2>
                  <p className="max-w-[30rem] my-6 text-base leading-[1.95] !text-white sm:text-lg">
                    {cta.description}
                  </p>
                </div>
                <div className="flex max-w-[32rem] flex-wrap gap-4">
                  {ctaHighlights.map((item) => (
                    <div
                      key={item}
                      className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.12em] !text-white backdrop-blur-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div>
                  <Button
                    className="shadow-[0_18px_40px_rgba(244,180,0,0.28)]"
                    href={cta.cta.href}
                    size="lg"
                    variant="yellow"
                  >
                    {cta.cta.label}
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm !text-white">
                  {ctaTrustPoints.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#F4B400]" />
                      <span className="!text-white">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative my-8 flex justify-center lg:my-10 lg:justify-end">
                <div className="absolute inset-x-0 top-12 bottom-8 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.04)_58%,rgba(255,255,255,0)_74%)] blur-3xl" />
                <div className="absolute bottom-5 left-1/2 h-8 w-[14rem] -translate-x-1/2 rounded-full bg-black/35 blur-2xl" />
                <div className="absolute -left-4 top-4 z-20 rounded-[22px] border border-white/18 bg-white/10 px-4 py-3 text-left shadow-[0_20px_50px_rgba(4,14,51,0.22)] backdrop-blur-md lg:-left-10">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] !text-white">
                    Triple-action
                  </p>
                  <p className="mt-1 text-sm font-semibold !text-white">
                    Pre + Pro + Postbiotic
                  </p>
                </div>
                <div className="absolute -bottom-2 -right-2 z-20 rounded-[22px] border border-[#F4B400]/30 bg-[#F4B400]/14 px-4 py-3 text-left shadow-[0_20px_50px_rgba(4,14,51,0.22)] backdrop-blur-md lg:-right-8">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] !text-white">
                    Daily support
                  </p>
                  <p className="mt-1 text-sm font-semibold !text-white">
                    Science-backed formula
                  </p>
                </div>
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
