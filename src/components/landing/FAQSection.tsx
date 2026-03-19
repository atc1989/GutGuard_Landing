import Container from "@/components/ui/Container";
import FAQItem from "@/components/ui/FAQItem";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { landingData } from "@/data/landing";

export default function FAQSection() {
  const { faq } = landingData;

  return (
    <section className="section-space" id="faq">
      <Container size="md">
        <Reveal>
          <SectionHeading
            className="[&_h2]:text-[2.5rem]"
            description={faq.description}
            eyebrow="FAQ"
            title={faq.title}
          />
        </Reveal>
        <div className="mt-12 space-y-5">
          {faq.items.map((item, index) => (
            <Reveal key={item.question} delay={index * 70} variant="up">
              <FAQItem {...item} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
