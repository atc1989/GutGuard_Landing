'use client';

import { useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import DotPagination from "@/components/ui/DotPagination";
import IconButton from "@/components/ui/IconButton";
import Reveal from "@/components/ui/Reveal";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { landingData } from "@/data/landing";
import { getNextIndex, getPrevIndex } from "@/lib/carousel";

function getVisibleCount(width: number) {
  if (width >= 1280) {
    return 4;
  }

  if (width >= 768) {
    return 2;
  }

  return 1;
}

export default function TestimonialsSection() {
  const { testimonials } = landingData;
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const syncVisibleCount = () => {
      setVisibleCount(getVisibleCount(window.innerWidth));
    };

    syncVisibleCount();
    window.addEventListener("resize", syncVisibleCount);

    return () => window.removeEventListener("resize", syncVisibleCount);
  }, []);

  const pageCount = Math.max(1, testimonials.items.length - visibleCount + 1);
  const displayIndex = Math.min(activeIndex, pageCount - 1);

  return (
    <section
      className="section-space overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.98)_0%,rgba(246,250,255,0.95)_30%,rgba(208,230,255,0.88)_72%,rgba(184,220,255,0.94)_100%)]"
      id="testimonials"
    >
      <Container className="relative" size="xl">
        <div className="pointer-events-none absolute inset-x-[-10%] top-[-8rem] h-[26rem] bg-[radial-gradient(circle,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.44)_38%,transparent_72%)]" />
        <div className="pointer-events-none absolute bottom-[-8rem] left-[-8rem] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.38)_0%,rgba(255,255,255,0)_72%)] blur-2xl" />
        <Reveal>
          <div className="relative mx-auto max-w-[52rem] text-center">
            <p className="text-[0.9rem] font-medium uppercase tracking-[0.18em] text-slate-950">
              gutguard synbiotic+ changes lives
            </p>
            <h2 className="mt-5 text-[2.2rem] font-normal leading-[1.05] tracking-[-0.05em] text-slate-950 sm:text-[3rem] lg:text-[4rem]">
              <span className="block">Customer Stories about</span>
              <span className="mt-2 block text-[#1A26C8]">GutGuard SynBIOTC+</span>
            </h2>
          </div>
        </Reveal>
        <div className="relative mt-8 sm:mt-10">
          <div className="overflow-hidden px-8 sm:px-10 lg:px-8">
            <div
              className="flex items-stretch transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${displayIndex * (100 / testimonials.items.length)}%)` }}
            >
              {testimonials.items.map((testimonial, index) => (
                <Reveal
                  key={testimonial.name}
                  className="shrink-0 self-stretch px-2 md:basis-1/2 xl:basis-[27.5%]"
                  delay={index * 70}
                  variant="up"
                >
                  <div className="h-full min-h-full">
                    <TestimonialCard
                      author={testimonial.name}
                      avatar={testimonial.avatar}
                      className="flex h-[27.5rem] min-h-[27.5rem] flex-col overflow-hidden rounded-none border-0 bg-white px-7 py-7 shadow-none hover:translate-y-0 hover:shadow-none"
                      quote={testimonial.quote}
                      rating={testimonial.rating}
                      role={testimonial.role}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <IconButton
              aria-label="Previous testimonial"
              className="h-11 w-11 border-0 bg-white/50 text-sky-400 shadow-none hover:translate-y-0 hover:bg-white/70 hover:shadow-none"
              icon={
                <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 24 24" width="20">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                </svg>
              }
              onClick={() => setActiveIndex((current) => getPrevIndex(current, pageCount))}
            />
            <DotPagination activeIndex={displayIndex} count={pageCount} />
            <IconButton
              aria-label="Next testimonial"
              className="h-11 w-11 border-0 bg-white/50 text-sky-400 shadow-none hover:translate-y-0 hover:bg-white/70 hover:shadow-none"
              icon={
                <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 24 24" width="20">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                </svg>
              }
              onClick={() => setActiveIndex((current) => getNextIndex(current, pageCount))}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
