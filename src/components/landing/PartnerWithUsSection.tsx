import PartnerCard from "@/components/ui/PartnerCard";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { landingData } from "@/data/landing";

export default function PartnerWithUsSection() {
  const { partnerWithUs } = landingData;

  return (
    <section className="section-space">
      <Container size="xl">
        <Reveal>
          <SectionHeading
            className="[&_h2]:text-[2.55rem]"
            description={partnerWithUs.description}
            eyebrow="Partner with us"
            title={partnerWithUs.title}
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {partnerWithUs.cards.map((card, index) => (
            <Reveal key={card.title} delay={index * 90} variant={index === 1 ? "scale" : "up"}>
              <PartnerCard
                cta={card.buttonText}
                description={card.body}
                icon={<span>{card.icon}</span>}
                name={card.title}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
