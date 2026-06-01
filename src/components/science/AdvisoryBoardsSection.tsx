import Image from "next/image";

import Container from "@/components/ui/Container";
import { advisoryBoards } from "@/data/science-approach";

export default function AdvisoryBoardsSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container size="lg">
        <div className="space-y-14">
          {advisoryBoards.map((board) => (
            <div key={board.title}>
              <h2 className="text-center text-[2rem] font-normal tracking-[-0.055em] text-slate-950 sm:text-[2.8rem]">
                {board.title}
              </h2>
              <div className="mx-auto mt-6 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {board.members.map((member) => (
                  <Image
                    alt={member.alt}
                    className="aspect-square h-auto w-full object-cover"
                    height={1024}
                    key={member.src}
                    src={member.src}
                    width={1024}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
