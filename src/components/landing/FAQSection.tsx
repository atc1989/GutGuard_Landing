import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import FAQItem from "@/components/ui/FAQItem";
import Reveal from "@/components/ui/Reveal";
import { landingData } from "@/data/landing";

function LockIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="34" viewBox="0 0 24 24" width="34">
      <path
        d="M7 10V7a5 5 0 0 1 10 0v3m-9 0h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path d="M12 14.5v2.8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="34" viewBox="0 0 24 24" width="34">
      <path
        d="M12 3l7 3.2V11c0 4.7-2.7 8.3-7 10-4.3-1.7-7-5.3-7-10V6.2L12 3Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path d="M9.2 12.2 11.2 14l3.8-4.2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

export default function FAQSection() {
  const { faq, productHighlight } = landingData;
  const leftColumn = faq.items.filter((_, index) => index % 2 === 0);
  const rightColumn = faq.items.filter((_, index) => index % 2 === 1);

  return (
    <section className="section-space bg-white" id="faq">
      <Container size="xl">
        <Reveal>
          <div className="mx-auto max-w-[56rem] text-center">
            <p className="text-[0.92rem] font-medium uppercase tracking-[0.18em] text-slate-950">
              {faq.eyebrow}
            </p>
            <h2 className="mt-5 text-[2.8rem] font-normal leading-[1.02] tracking-[-0.05em] text-black sm:text-[3.6rem] lg:text-[4.2rem]">
              Your GutGuard Inquiries
              <br />
              Answered Here
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            {leftColumn.map((item, index) => (
              <Reveal key={item.question} delay={index * 70} variant="up">
                <FAQItem {...item} defaultOpen={item.question === "How much is one bottle?"} />
              </Reveal>
            ))}
          </div>
          <div className="space-y-3">
            {rightColumn.map((item, index) => (
              <Reveal key={item.question} delay={index * 70} variant="up">
                <FAQItem {...item} defaultOpen={item.question === "Is GutGuard Safe?"} />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center">
          <Button
            className="min-w-[19rem] bg-[#F7C34A] px-10 py-4 text-[1.05rem] font-semibold text-black hover:bg-[#FFD063]"
            href={productHighlight.cta.href}
            size="lg"
            variant="yellow"
          >
            {productHighlight.cta.text}
          </Button>
          <div className="mt-8 flex items-center justify-center gap-8 text-[#0A1458]">
            <div className="flex items-center gap-3">
              <span>
                <LockIcon />
              </span>
              <p className="text-[0.78rem] font-semibold uppercase leading-[1.2] tracking-[0.22em] !text-[#0A1458]">
                Secure SSL
                <br />
                Encryption
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span>
                <ShieldIcon />
              </span>
              <p className="text-[0.78rem] font-semibold uppercase leading-[1.2] tracking-[0.22em] !text-[#0A1458]">
                Guaranteed Safe
                <br />
                Checkout
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
