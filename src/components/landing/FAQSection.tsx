'use client';

import Button from "@/components/ui/LegacyButton";
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

const answerClass = "text-[0.98rem] leading-7 text-[#7B869B]";
const listClass = `space-y-1.5 pl-1 ${answerClass}`;
const linkClass = "font-medium text-[#0A1458] underline underline-offset-2";

const richFaqItems = [
  {
    question: "What is GutGuard SynBiotic+?",
    defaultOpen: false,
    answer: (
      <p className={answerClass}>
        GutGuard SynBIOTIC+ is an advanced gut health supplement formulated with prebiotics,
        probiotics, and postbiotics—including scientifically recognized ingredients like
        Urolithin-A and L-Tryptophan. It supports your immune system, digestion, energy, and
        overall vitality.
      </p>
    ),
  },
  {
    question: "Who can Take GutGuard SynBIOTIC+?",
    defaultOpen: false,
    answer: (
      <div className={`space-y-3 ${answerClass}`}>
        <p>Recommended for adults who:</p>
        <ul className={listClass}>
          <li>• Experience gut discomfort, stress, or fatigue</li>
          <li>• Want to boost immunity naturally</li>
          <li>• Are proactive about anti-aging and long-term health</li>
        </ul>
        <p>
          Pregnant or nursing women and those with serious medical conditions should consult a
          doctor first.
        </p>
      </div>
    ),
  },
  {
    question: "How much is one bottle?",
    defaultOpen: true,
    answer: (
      <div className={`space-y-2 ${answerClass}`}>
        <p>Retail price: ₱3,800 per bottle (30-day supply)</p>
        <p>Members enjoy a discounted price of ₱4,500 and access to exclusive bonuses.</p>
      </div>
    ),
  },
  {
    question: "Is GutGuard Safe?",
    defaultOpen: false,
    answer: (
      <p className={answerClass}>
        Yes. GutGuard is manufactured in a GMP-certified facility using clinically-supported
        ingredients. It is non-GMO, allergen-free, and made with your safety in mind.
      </p>
    ),
  },
  {
    question: "How can I become a member?",
    defaultOpen: false,
    answer: (
      <div className={`space-y-3 ${answerClass}`}>
        <p>Become a member by purchasing a package:</p>
        <ul className={listClass}>
          <li>• Silver – ₱4,500 (1 bottle + 1 blister)</li>
          <li>• Gold – ₱13,500 (3 bottles + 3 blisters with bigger bonuses)</li>
          <li>• Platinum – ₱45,000 (10 bottles + 10 blisters with highest rewards &amp; support)</li>
        </ul>
        <a className={linkClass} href="/packages">
          Become a Member →
        </a>
      </div>
    ),
  },
  {
    question: "Can I resell GutGuard and become a partner?",
    defaultOpen: false,
    answer: (
      <div className={`space-y-3 ${answerClass}`}>
        <p>Join as:</p>
        <ul className={listClass}>
          <li>
            • <span className="font-medium text-[#7B869B]">Stockist</span> – Buy in bulk and
            resell locally
          </li>
          <li>
            • <span className="font-medium text-[#7B869B]">Center</span> – Build a team and lead
            a community
          </li>
        </ul>
        <p>Get access to systems, support, and commissions through our Partner Program.</p>
        <a className={linkClass} href="/contact">
          Become a Partner →
        </a>
      </div>
    ),
  },
  {
    question: "What are the benefits of becoming a member?",
    defaultOpen: false,
    answer: (
      <ul className={listClass}>
        <li>• Discounted bottle price</li>
        <li>• Access to referral rewards</li>
        <li>• Eligibility for Stockist / Center partnership</li>
        <li>• Priority support</li>
        <li>• Early product access</li>
      </ul>
    ),
  },
  {
    question: "Where is GutGuard Made?",
    defaultOpen: false,
    answer: (
      <p className={answerClass}>
        GutGuard is proudly formulated and distributed in the Philippines, in partnership with
        expert formulators and scientists.
      </p>
    ),
  },
  {
    question: "How do I take GutGuard?",
    defaultOpen: false,
    answer: (
      <p className={answerClass}>
        Take 1 capsule per day, preferably with meals or as recommended by your healthcare
        provider.
      </p>
    ),
  },
  {
    question: "Where can I buy GutGuard?",
    defaultOpen: false,
    answer: (
      <div className={`space-y-3 ${answerClass}`}>
        <ul className={listClass}>
          <li>• Buy through the website</li>
          <li>• Buy through official representatives</li>
          <li>• Become a member for discounts and benefits</li>
        </ul>
        <div>
          <a
            className="inline-block rounded-full bg-[#F7C34A] px-5 py-2 text-[0.85rem] font-semibold text-black"
            href="/shop"
          >
            Shop Now
          </a>
        </div>
        <p>
          <a className={linkClass} href="/contact">
            Contact Us
          </a>{" "}
          or call our customer support hotline at{" "}
          <a className={linkClass} href="tel:09260538831">
            0926 053 8831
          </a>
        </p>
      </div>
    ),
  },
];

export default function FAQSection() {
  const { faq, productHighlight } = landingData;
  const leftColumn = richFaqItems.filter((_, index) => index % 2 === 0);
  const rightColumn = richFaqItems.filter((_, index) => index % 2 === 1);

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
                <FAQItem answer={item.answer} defaultOpen={item.defaultOpen} question={item.question} />
              </Reveal>
            ))}
          </div>
          <div className="space-y-3">
            {rightColumn.map((item, index) => (
              <Reveal key={item.question} delay={index * 70} variant="up">
                <FAQItem answer={item.answer} defaultOpen={item.defaultOpen} question={item.question} />
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
