import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { landingData } from "@/data/landing";

export default function DiscountBannerSection() {
  const { discountBanner } = landingData;

  return (
    <section className="pb-8 pt-2 sm:pb-12" id="discount-banner">
      <Container size="xl">
        <Reveal variant="up">
          <div className="relative overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#071B54_0%,#2B369D_62%,#4F63FF_120%)] px-8 py-10 text-white shadow-[0_28px_90px_rgba(7,27,84,0.16)] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(244,180,0,0.18),transparent_22%)]" />
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-100/80">
                  Limited launch offer
                </p>
                <h2 className="mt-4 max-w-2xl font-serif text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-[2.8rem]">
                  {discountBanner.title}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-8 text-blue-100/78 sm:text-lg">
                  {discountBanner.description}
                </p>
              </div>
              <div className="flex w-full justify-start lg:w-auto lg:justify-end">
                <Button
                  className="shadow-[0_18px_40px_rgba(244,180,0,0.28)]"
                  href={discountBanner.cta.href}
                  size="lg"
                  variant="yellow"
                >
                  {discountBanner.cta.label}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
