import Image from "next/image";

import Button from "@/components/ui/LegacyButton";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { landingData } from "@/data/landing";

export default function ShopSection() {
  const { shop } = landingData;

  return (
    <section className="section-space bg-white" id="shop">
      <Container size="xl">
        <Reveal>
          <div className="text-center">
            <p className="text-[0.92rem] font-medium uppercase tracking-[0.18em] text-slate-950">
              {shop.eyebrow}
            </p>
            <h2 className="mt-4 text-[2.8rem] font-normal leading-[1.02] tracking-[-0.05em] text-black sm:text-[3.6rem] lg:text-[4.2rem]">
              {shop.title}
            </h2>
            <p className="mt-3 text-[0.95rem] text-slate-500">{shop.subtitle}</p>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-3xl gap-8 sm:grid-cols-2">
          {shop.products.map((product, index) => (
            <Reveal key={product.name} delay={index * 100} variant="up">
              <article className="group flex flex-col overflow-hidden rounded-[20px] border border-[#E8ECF4] bg-white shadow-[0_8px_32px_rgba(7,27,84,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(7,27,84,0.12)]">
                <div className="flex items-center justify-center bg-[#F2F3F5] px-10 py-10">
                  <Image
                    alt={product.image.alt}
                    className="h-auto w-full max-w-[200px] object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.14)] transition duration-300 group-hover:scale-105"
                    height={product.image.height}
                    src={product.image.src}
                    width={product.image.width}
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[1.08rem] font-semibold leading-snug tracking-[-0.02em] text-slate-900">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-[1.4rem] font-bold tracking-[-0.02em] text-[#1A26C8]">
                    {product.price}
                  </p>
                  <div className="mt-5">
                    <Button
                      className="w-full bg-[#F7C34A] py-3 text-[0.97rem] font-semibold text-black hover:bg-[#FFD063]"
                      href={product.href}
                      size="md"
                      variant="yellow"
                    >
                      {product.cta}
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
