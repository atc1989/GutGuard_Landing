import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { landingData } from "@/data/landing";

export default function ResearchSection() {
  const { research } = landingData;

  return (
    <section
      className="section-space relative overflow-hidden bg-[linear-gradient(180deg,#071B54_0%,#0A2163_46%,#16358C_100%)] text-white"
      id="research"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_74%,rgba(64,196,255,0.18),transparent_18%),radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_26%)]" />
      <Container size="xl">
        <div className="relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
          <Reveal className="lg:pt-14" variant="left">
            <div className="max-w-[42rem]">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-white">
                {research.eyebrow}
              </p>
              <h2 className="mt-6 max-w-[12ch] text-[2.7rem] font-normal leading-[0.98] tracking-[-0.05em] text-white sm:text-[3.4rem] lg:text-[4.35rem]">
                After years of Innovation and Rigorous Research,{" "}
                <span className="text-[#41B8FF]">GutGuard SynBIOTIC+</span> is Finally here!
              </h2>
              <p className="mt-8 max-w-[44rem] text-[1.05rem] leading-8 text-white/92 sm:text-[1.12rem]">
                {research.paragraph}
              </p>
              <div className="mt-10">
                <Button
                  className="bg-[#FFC857] px-8 text-slate-950 hover:bg-[#FFD479] hover:shadow-[0_18px_40px_rgba(255,200,87,0.28)]"
                  href={research.learnMoreCta.href}
                  size="lg"
                  variant="yellow"
                >
                  {research.learnMoreCta.label}
                </Button>
              </div>
            </div>
          </Reveal>
          <div className="grid gap-7 sm:grid-cols-2">
            {research.featureCards.map((item, index) => (
              <Reveal key={item.title} delay={index * 90} variant={index % 2 === 0 ? "up" : "scale"}>
                <article className="flex min-h-[244px] flex-col bg-[#656AFF] px-8 py-8 text-white shadow-[0_22px_60px_rgba(7,27,84,0.22)] sm:min-h-[268px] lg:min-h-[286px]">
                  <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#656AFF]">
                    <svg
                      aria-hidden="true"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 3 5 6v4c0 5.25 2.98 8.87 7 10 4.02-1.13 7-4.75 7-10V6l-7-3Z"
                        fill="currentColor"
                        opacity="0.18"
                      />
                      <path
                        d="M12 3 5 6v4c0 5.25 2.98 8.87 7 10 4.02-1.13 7-4.75 7-10V6l-7-3Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M12 8.2v7.6M8.7 10.1l6.6 3.8M15.3 10.1l-6.6 3.8M9.1 7.8l5.8 8.4M14.9 7.8l-5.8 8.4"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="1.6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="max-w-[11ch] text-[1.35rem] font-normal leading-[1.06] tracking-[-0.04em] text-white sm:text-[1.55rem]">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-[17ch] text-[1rem] leading-7 text-white/95">
                      <span className="whitespace-nowrap text-[#BFE7FF]">GutGuard SynBIOTIC+</span>{" "}
                      {item.description.replace("GutGuard SynBIOTIC+ ", "")}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
