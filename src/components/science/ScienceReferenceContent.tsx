import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import { facilityImages, formulaBenefits } from "@/data/science-reference";

function FormulaCheck() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-[#1017C8] text-[0.72rem] font-bold text-white">
      ✓
    </span>
  );
}

export default function ScienceReferenceContent() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container size="lg">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-slate-700">
              The only Triple-Biotics formula
            </p>
            <h2 className="mt-4 text-[2rem] font-normal leading-[1.08] tracking-[-0.055em] text-slate-950 sm:text-[2.75rem]">
              What&apos;s Inside{" "}
              <span className="block font-semibold text-[#1118C9]">GutGuard SynBIOTIC+?</span>
            </h2>
            <ul className="mt-8 space-y-3">
              {formulaBenefits.map((benefit) => (
                <li className="flex items-start gap-3 text-[0.85rem] leading-5 text-slate-800" key={benefit}>
                  <FormulaCheck />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <Link
              className="mt-8 inline-flex rounded-md bg-[#FFC23E] px-7 py-3 text-[0.82rem] font-semibold text-slate-950 transition hover:bg-[#F4B400]"
              href="/shop"
            >
              Try SynBIOTIC+ Now
            </Link>
          </div>
          <Image
            alt="GutGuard SynBIOTIC+ bottle held in hand"
            className="h-auto w-full object-cover"
            height={744}
            src="/images/synbiotic-1.png"
            width={614}
          />
        </div>

        <div className="pt-16 sm:pt-20">
          <h2 className="text-center text-[2rem] font-normal tracking-[-0.05em] text-slate-950 sm:text-[2.7rem]">
            Facilities
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-1 sm:grid-cols-4">
            {facilityImages.map((image) => (
              <Image
                alt={image.alt}
                className="aspect-square h-auto w-full object-cover"
                height={300}
                key={image.src}
                src={image.src}
                width={300}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
