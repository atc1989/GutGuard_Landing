import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { landingData } from "@/data/landing";

export default function DiscountBannerSection() {
  const { discountBanner } = landingData;
  const [lineOne, lineTwo = ""] = discountBanner.description.split("\n");

  return (
    <section
      className="overflow-hidden bg-white pb-14 pt-6 sm:pb-20"
      id="discount-banner"
    >
      <Container size="xl">
        <Reveal variant="up">
          <div className="relative mx-auto max-w-[80rem] overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#6268F7_0%,#646CF6_42%,#5B60E8_100%)] px-8 py-14 text-center text-white shadow-[0_28px_90px_rgba(7,20,90,0.22)] sm:px-10 sm:py-16 lg:px-16 lg:py-18">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_86%_18%,rgba(255,255,255,0.1),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
            <div className="relative mx-auto max-w-[54rem]">
              <h2 className="text-[2.5rem] font-normal leading-[1.05] tracking-[-0.05em] text-white sm:text-[3rem] lg:text-[3.5rem]">
                {discountBanner.title}
              </h2>
              <p
                className="mt-3 text-[2.35rem] font-semibold leading-[1.06] tracking-[-0.05em] !text-white sm:text-[3rem] lg:text-[3.65rem]"
                style={{ color: "#ffffff" }}
              >
                Save P300 by Becoming a Member!
              </p>
              <p className="mt-6 text-[1.05rem] leading-8 !text-white/92 sm:text-[1.15rem]">
                {lineOne}
                <br />
                {lineTwo}
              </p>
              <div className="mt-8 flex justify-center">
                <Button
                  className="min-w-[14rem] border-0 bg-[linear-gradient(180deg,#D71BC5_0%,#BC14B4_100%)] px-8 py-4 text-[1.02rem] font-semibold text-white shadow-none hover:bg-[linear-gradient(180deg,#D71BC5_0%,#BC14B4_100%)]"
                  href={discountBanner.cta.href}
                  size="lg"
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
