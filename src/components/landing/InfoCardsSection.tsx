import Image from "next/image";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { landingData } from "@/data/landing";

function ShieldVirusIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 512 512">
      <path d="M224 192a16 16 0 1 0 16 16 16 16 0 0 0-16-16Zm242.5-108.32-192-80A57.4 57.4 0 0 0 256.05 0a57.4 57.4 0 0 0-18.46 3.67l-192 80A47.93 47.93 0 0 0 16 128c0 198.5 114.5 335.72 221.5 380.32a48.09 48.09 0 0 0 36.91 0C360.09 472.61 496 349.3 496 128a48 48 0 0 0-29.5-44.32ZM384 256h-12.12c-28.51 0-42.79 34.47-22.63 54.63l8.58 8.57a16 16 0 1 1-22.63 22.63l-8.57-8.58C306.47 313.09 272 327.37 272 355.88V368a16 16 0 0 1-32 0v-12.12c0-28.51-34.47-42.79-54.63-22.63l-8.57 8.58a16 16 0 0 1-22.63-22.63l8.58-8.57c20.16-20.16 5.88-54.63-22.63-54.63H128a16 16 0 0 1 0-32h12.12c28.51 0 42.79-34.47 22.63-54.63l-8.58-8.57a16 16 0 0 1 22.63-22.63l8.57 8.58c20.16 20.16 54.63 5.88 54.63-22.63V112a16 16 0 0 1 32 0v12.12c0 28.51 34.47 42.79 54.63 22.63l8.57-8.58a16 16 0 0 1 22.63 22.63l-8.58 8.57C329.09 189.53 343.37 224 371.88 224H384a16 16 0 0 1 0 32Zm-96 0a16 16 0 1 0 16 16 16 16 0 0 0-16-16Z" />
    </svg>
  );
}

export default function InfoCardsSection() {
  const { infoCards } = landingData;
  const [firstCard, secondCard, thirdCard] = infoCards.cards;

  return (
    <section className="section-space overflow-hidden bg-white">
      <Container className="relative" size="xl">
        <div className="pointer-events-none absolute right-[-10rem] top-[-8rem] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(60,208,255,0.18)_0%,rgba(60,208,255,0.04)_42%,transparent_72%)] blur-2xl" />
        <div className="grid gap-7 lg:grid-cols-3">
          <Reveal className="h-full" variant="up">
            <article className="flex min-h-[29rem] flex-col justify-between bg-[linear-gradient(135deg,#6268F7_0%,#646CF6_42%,#5B60E8_100%)] px-8 py-10 text-white shadow-[0_28px_70px_rgba(59,76,255,0.2)]">
              <ShieldVirusIcon className="h-12 w-12 text-white" />
              <div className="max-w-[17rem]">
                <h3 className="text-[2rem] font-normal leading-[1.15] tracking-[-0.04em] text-white">
                  {firstCard.title}
                </h3>
                <p
                  className="mt-6 text-[1.02rem] leading-8 !text-white"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  {firstCard.body}
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal className="h-full" delay={90} variant="scale">
            <article className="flex min-h-[29rem] flex-col bg-white px-8 py-10 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
              <p className="max-w-[18rem] text-[1.06rem] leading-[1.7] !text-black" style={{ color: "#000000" }}>
                {secondCard.quote}
              </p>
              <div className="mt-6">
                <p className="text-[1.3rem] font-normal tracking-[-0.03em] !text-black" style={{ color: "#000000" }}>
                  {secondCard.author}
                </p>
                <p className="mt-2 text-[1rem] italic !text-black" style={{ color: "#000000" }}>
                  {secondCard.role}
                </p>
              </div>
              <div className="mt-auto pt-8">
                <div className="h-[6.5rem] w-[6.5rem] overflow-hidden rounded-full shadow-[0_20px_40px_rgba(15,23,42,0.12)]">
                  <Image
                    alt={secondCard.author}
                    className="h-full w-full object-cover"
                    height={104}
                    src="/images/testimonials/Ryan-150x150.png"
                    width={104}
                  />
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal className="h-full" delay={180} variant="up">
            <article className="relative flex min-h-[29rem] flex-col justify-between overflow-hidden bg-[#07145A] px-8 py-10 text-white shadow-[0_28px_80px_rgba(7,20,90,0.26)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_24%,rgba(0,191,255,0.24),transparent_24%),radial-gradient(circle_at_68%_72%,rgba(255,125,62,0.22),transparent_16%),linear-gradient(180deg,rgba(10,20,112,0.2),rgba(4,10,52,0.1))]" />
              <div className="absolute inset-y-0 right-[-1.5rem] w-[68%] bg-[radial-gradient(ellipse_at_top,rgba(33,164,255,0.25),transparent_46%),radial-gradient(ellipse_at_50%_68%,rgba(255,124,67,0.26),transparent_16%),linear-gradient(180deg,rgba(15,87,205,0.08)_0%,rgba(0,0,0,0)_100%)] opacity-90" />
              <div className="absolute right-[1.5rem] top-[3rem] h-[22rem] w-[10rem] rounded-[999px] border border-cyan-400/18 bg-[linear-gradient(180deg,rgba(21,167,255,0.05)_0%,rgba(21,167,255,0.18)_42%,rgba(3,25,84,0.1)_100%)] blur-[1px]" />
              <div className="absolute right-[3.1rem] top-[1.8rem] h-[25rem] w-[12rem] rounded-[48%] border border-cyan-300/10 bg-[radial-gradient(circle_at_50%_22%,rgba(38,191,255,0.14),transparent_28%),radial-gradient(circle_at_52%_72%,rgba(255,118,62,0.16),transparent_18%)]" />
              <div className="absolute bottom-[2.3rem] right-[4.2rem] h-[7rem] w-[6rem] rounded-[48%] border border-orange-300/14 bg-[radial-gradient(circle,rgba(255,144,74,0.4)_0%,rgba(255,144,74,0.08)_48%,transparent_76%)] blur-[1px]" />
              <div className="relative">
                <ShieldVirusIcon className="h-12 w-12 text-white" />
              </div>
              <div className="relative max-w-[18rem]">
                <h3 className="text-[2rem] font-normal leading-[1.15] tracking-[-0.04em] text-white">
                  {thirdCard.title}
                </h3>
                <p
                  className="mt-6 text-[1.02rem] leading-8 !text-white"
                  style={{ color: "rgba(255,255,255,0.92)" }}
                >
                  {thirdCard.body}
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
