import Container from "@/components/ui/Container";
import InfoCard from "@/components/ui/InfoCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { landingData } from "@/data/landing";

export default function InfoCardsSection() {
  const { infoCards } = landingData;

  return (
    <section className="section-space">
      <Container size="xl">
        <Reveal>
          <SectionHeading
            className="[&_h2]:text-[2.55rem]"
            description={infoCards.description}
            eyebrow="Why it works"
            title={infoCards.title}
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {infoCards.cards.map((card, index) => (
            <Reveal key={card.title} delay={index * 90} variant={index === 1 ? "scale" : "up"}>
              <InfoCard
                description={card.body}
                icon={<span className="font-serif text-2xl">{card.icon}</span>}
                title={card.title}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
