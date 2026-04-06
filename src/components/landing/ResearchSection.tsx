import Image from "next/image";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { landingData } from "@/data/landing";

export default function ResearchSection() {
  const { research } = landingData;

  return (
    <section
      className="section-space relative overflow-hidden bg-transparent text-white"
      id="research"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[40rem] lg:block">
        <Image
          alt=""
          className="absolute left-[-20rem] top-1/2 h-auto w-[50rem] -translate-y-1/2 opacity-90"
          height={900}
          priority={false}
          src="/images/pro-1-1.png"
          width={900}
        />
      </div>
      <Container size="xl">
        <div className="relative z-10 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <Reveal className="lg:self-center" variant="left">
            <div className="max-w-[46rem]">
              <p className="text-[0.82rem] font-medium uppercase tracking-[0.2em]" style={{ color: "#ffffff" }}>
                {research.eyebrow}
              </p>
              <h2 className="my-6 max-w-[18ch] text-[2rem] font-normal leading-[1.03] tracking-[-0.045em] text-white sm:max-w-none sm:text-[2.55rem] lg:text-[3.35rem]">
                <span className="block whitespace-nowrap">After years of Innovation</span>
                <span className="block whitespace-nowrap">and Rigorous Research,</span>
                <span className="block">
                  <span className="whitespace-nowrap">
                    <span className="text-[#41B8FF]">GutGuard SynBIOTIC+</span> is
                  </span>
                </span>
                <span className="block">Finally here!</span>
              </h2>
              <p className="mt-7 max-w-[39rem] text-[0.95rem] leading-[1.85] sm:text-[1rem]" style={{ color: "#ffffff" }}>
                {research.paragraph}
              </p>
              <div className="mt-9">
                <Button
                  className="min-w-[168px] bg-[#FFC857] px-7 py-3 text-[0.98rem] text-slate-950 hover:bg-[#FFD479] hover:shadow-[0_18px_40px_rgba(255,200,87,0.28)]"
                  href={research.learnMoreCta.href}
                  size="lg"
                  variant="yellow"
                >
                  {research.learnMoreCta.label}
                </Button>
              </div>
            </div>
          </Reveal>
          <div className="grid gap-7 sm:auto-rows-fr sm:grid-cols-2">
            {research.featureCards.map((item, index) => (
              <Reveal className="h-full" key={item.title} delay={index * 90} variant={index % 2 === 0 ? "up" : "scale"}>
                <article className="flex h-full flex-col bg-[#656AFF] px-8 py-8 text-white shadow-[0_22px_60px_rgba(7,27,84,0.22)]">
                  <div className="mb-10">
                    <svg
                      aria-hidden="true"
                      className="h-12 w-12" // Increased size significantly to make it "big"
                      fill="white" // Solid white fill to match the reference image
                      viewBox="0 0 512 512" // Crucial: Updated viewBox to match the coordinate system of the new path
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M224,192a16,16,0,1,0,16,16A16,16,0,0,0,224,192ZM466.5,83.68l-192-80A57.4,57.4,0,0,0,256.05,0a57.4,57.4,0,0,0-18.46,3.67l-192,80A47.93,47.93,0,0,0,16,128C16,326.5,130.5,463.72,237.5,508.32a48.09,48.09,0,0,0,36.91,0C360.09,472.61,496,349.3,496,128A48,48,0,0,0,466.5,83.68ZM384,256H371.88c-28.51,0-42.79,34.47-22.63,54.63l8.58,8.57a16,16,0,1,1-22.63,22.63l-8.57-8.58C306.47,313.09,272,327.37,272,355.88V368a16,16,0,0,1-32,0V355.88c0-28.51-34.47-42.79-54.63-22.63l-8.57,8.58a16,16,0,0,1-22.63-22.63l8.58-8.57c20.16-20.16,5.88-54.63-22.63-54.63H128a16,16,0,0,1,0-32h12.12c28.51,0,42.79-34.47,22.63-54.63l-8.58-8.57a16,16,0,0,1,22.63-22.63l8.57,8.58c20.16,20.16,54.63,5.88,54.63-22.63V112a16,16,0,0,1,32,0v12.12c0,28.51,34.47,42.79,54.63,22.63l8.57-8.58a16,16,0,0,1,22.63,22.63l-8.58,8.57C329.09,189.53,343.37,224,371.88,224H384a16,16,0,0,1,0,32Zm-96,0a16,16,0,1,0,16,16A16,16,0,0,0,288,256Z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h3 className="max-w-[11ch] text-[1.35rem] font-normal leading-[1.06] tracking-[-0.04em] text-white sm:text-[1.55rem]">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-[17ch] text-[1rem] leading-7" style={{ color: "#ffffff" }}>
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
