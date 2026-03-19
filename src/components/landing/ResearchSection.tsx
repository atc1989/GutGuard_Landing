import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import FeatureCard from "@/components/ui/FeatureCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { landingData } from "@/data/landing";

export default function ResearchSection() {
  const { research } = landingData;

  return (
    <section className="section-space" id="research">
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Reveal className="lg:pt-4" variant="left">
            <div className="max-w-lg">
              <SectionHeading
                align="left"
                className="[&_h2]:text-[2.5rem] [&_p]:max-w-none"
                description={research.paragraph}
                eyebrow="Research"
                title={research.heading}
              />
              <p className="mt-8 text-sm font-medium uppercase tracking-[0.16em] text-[var(--color-accent)]">
                Four research pillars
              </p>
              <div className="mt-6">
                <Button href={research.learnMoreCta.href} size="lg">
                  {research.learnMoreCta.label}
                </Button>
              </div>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {research.featureCards.map((item, index) => (
              <Reveal key={item.title} delay={index * 90} variant={index % 2 === 0 ? "up" : "scale"}>
                <FeatureCard
                  description={item.description}
                  icon={<span className="font-serif text-3xl">0{index + 1}</span>}
                  title={item.title}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
