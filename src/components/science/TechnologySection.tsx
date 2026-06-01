import Image from "next/image";

import Container from "@/components/ui/Container";
import { postbioticMethods } from "@/data/science-approach";

export default function TechnologySection() {
  return (
    <section className="bg-[#06104E] py-16 text-white sm:py-20">
      <Container size="lg">
        <div className="text-center">
          <p className="text-[1.1rem] font-medium !text-white sm:text-[1.35rem]">Technology Behind</p>
          <h1 className="mt-1 text-[2.5rem] font-semibold tracking-[-0.065em] text-[#31B4FF] sm:text-[3.25rem]">
            GutGuard SynBIOTIC+
          </h1>
        </div>
        <Image
          alt="Methods used in the production of postbiotics"
          className="mx-auto mt-3 h-auto w-full max-w-3xl"
          height={576}
          priority
          src="https://gutguard.ph/wp-content/uploads/2025/07/science-1024x576.webp"
          width={1024}
        />
        <div className="mt-5 grid gap-x-12 gap-y-6 md:grid-cols-2">
          {postbioticMethods.map((method) => (
            <div key={method.title}>
              <h2 className="text-[0.88rem] font-semibold leading-5 tracking-[-0.01em] text-white">{method.title}</h2>
              <p className="mt-1 text-[0.82rem] leading-5 !text-white/90">{method.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
