import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { landingData } from "@/data/landing";

function GlobeIcon({ color }: { color: string }) {
  return (
    <span
      className="inline-flex h-[4rem] w-[4rem] items-center justify-center rounded-full"
      style={{ backgroundColor: color }}
    >
      {/* Increased height/width from 34 to 44 to fill more of the 4rem span */}
      <svg aria-hidden="true" fill="none" height="44" viewBox="0 0 24 24" width="44">
        {/* 1. Base White Circle - Now spanning almost the entire 24x24 viewbox */}
        <circle cx="12" cy="12" r="11" fill="white" fillOpacity="0.98" />
        
        {/* 2. Landmass - Adjusted to scale with the larger circle */}
        <path
          d="M18.5 8.5c-.7-1.1-2-1.6-3.3-1.6s-2.4.5-3 1.3c-.4.7-.3 1.6-.7 2.3-.4.7-1.3.7-2 1.1-.7.4-1.1 1.1-1.3 2-.3.9.3 2 .9 2.7s1.7.8 2.7.5c.9-.3 1.6-1.1 2.4-1.6.8-.5 2-.5 2.7-.1.7.4 1.5.3 2-.3s.5-1.6.3-2.3-.7-1.3-1.3-1.3zM7 15c-1.3 0-2.7.7-3.3 2s-.3 2.9.7 3.7c.9.8 2.4.7 3.3-.3s1.1-2.4.7-3.5c-.4-1.1-1.1-1.9-1.4-1.9z"
          fill={color}
          fillOpacity="0.85"
        />

        {/* 3. Grid Lines - Expanded to edge of the r=11 circle */}
        <g stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.4">
          {/* Vertical Meridians */}
          <path d="M12 1v22" />
          <path d="M12 1c4 0 7 5 7 11s-3 11-7 11" />
          <path d="M12 1C8 1 5 6 5 12s3 11 7 11" />
          
          {/* Horizontal Parallels */}
          <path d="M1 12h22" />
          <path d="M3 7h18" />
          <path d="M3 17h18" />
        </g>
      </svg>
    </span>
  );
}

export default function PartnerWithUsSection() {
  const { partnerWithUs } = landingData;

  return (
    <section className="section-space overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.98)_0%,rgba(246,250,255,0.95)_30%,rgba(208,230,255,0.88)_72%,rgba(184,220,255,0.94)_100%)]">
      <Container className="relative" size="xl">
        <div className="pointer-events-none absolute right-[-8rem] top-[-10rem] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(54,210,255,0.22)_0%,rgba(54,210,255,0.04)_46%,transparent_72%)] blur-2xl" />
        <Reveal>
          <div className="max-w-[58rem]">
            <p className="text-[0.92rem] font-medium uppercase tracking-[0.18em] text-slate-950">
              {partnerWithUs.eyebrow}
            </p>
            <h2 className="mt-5 text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.05em] text-slate-950 sm:text-[3.5rem]">
              <span className="text-[#1A26C8]">{partnerWithUs.title}</span>
              <br />
              <span className="text-[0.82em]">{partnerWithUs.subtitle}</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-7 lg:grid-cols-3">
          {partnerWithUs.cards.map((card, index) => (
            <Reveal key={card.title} className="h-full" delay={index * 90} variant={index === 1 ? "scale" : "up"}>
              <article className="flex h-full min-h-[26.5rem] flex-col overflow-hidden bg-white shadow-[0_22px_60px_rgba(7,27,84,0.08)]">
                <div className="flex flex-1 flex-col px-10 py-10">
                  <GlobeIcon color={card.accent} />
                  <div className="mt-15 pt-0">
                    <h3 className="text-[1.05rem] font-normal leading-[1.2] tracking-[-0.03em] text-black sm:text-[1.15rem]">
                      {card.title}
                    </h3>
                    <p className="max-w-[18rem] text-[0.98rem] leading-8 !text-[#7B869B]">{card.body}</p>
                  </div>
                </div>
                <div className="px-10 py-6 text-white" style={{ backgroundColor: card.accent }}>
                  <p className="text-[0.98rem] font-medium !text-white">{card.buttonText}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
