import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { landingData } from "@/data/landing";

export default function TestimonialsSection() {
  const { testimonials } = landingData;

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
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {testimonials.items.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 70} variant="up">
              <TestimonialCard
                author={testimonial.name}
                avatar={testimonial.avatar}
                quote={testimonial.quote}
                rating={testimonial.rating}
                role={testimonial.role}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
