'use client';

import { useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import DotPagination from "@/components/ui/DotPagination";
import IconButton from "@/components/ui/IconButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { landingData } from "@/data/landing";
import { getNextIndex, getPrevIndex } from "@/lib/carousel";

export default function TestimonialsSection() {
  const { testimonials } = landingData;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => getNextIndex(current, testimonials.items.length));
    }, 4200);

    return () => window.clearInterval(interval);
  }, [testimonials.items.length]);

  return (
    <section
      className="section-space overflow-hidden bg-[linear-gradient(180deg,rgba(79,99,255,0.08),rgba(79,99,255,0.03)_52%,transparent)]"
      id="testimonials"
    >
      <Container size="xl">
        <Reveal>
          <SectionHeading
            className="[&_h2]:text-[2.7rem]"
            description={testimonials.description}
            eyebrow="Testimonials"
            title={testimonials.title}
          />
        </Reveal>
        <div className="mt-12 sm:mt-14">
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.items.map((testimonial, index) => {
              const isActive = index === activeIndex;

              return (
                <Reveal key={testimonial.name} delay={index * 90} variant="up">
                  <div
                    className={[
                      "h-full transition-all duration-500",
                      isActive ? "lg:-translate-y-2 lg:scale-[1.01]" : "lg:translate-y-0 lg:scale-100",
                    ].join(" ")}
                  >
                    <TestimonialCard
                      author={testimonial.name}
                      avatar={testimonial.avatar}
                      quote={testimonial.quote}
                      rating={testimonial.rating}
                      role={testimonial.role}
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4">
            <IconButton
              aria-label="Previous testimonial"
              className="h-9 w-9 sm:h-10 sm:w-10"
              icon={
                <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                </svg>
              }
              onClick={() => setActiveIndex((current) => getPrevIndex(current, testimonials.items.length))}
            />
            <DotPagination activeIndex={activeIndex} count={testimonials.items.length} />
            <IconButton
              aria-label="Next testimonial"
              className="h-9 w-9 sm:h-10 sm:w-10"
              icon={
                <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                </svg>
              }
              onClick={() => setActiveIndex((current) => getNextIndex(current, testimonials.items.length))}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
