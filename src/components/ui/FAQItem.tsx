'use client';

import { useId, useState } from "react";

import { cn } from "@/lib/cn";

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  defaultOpen?: boolean;
}

export default function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className="overflow-hidden rounded-[14px] border border-[#D8DDE8] bg-white px-5 shadow-none">
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="text-[1rem] font-normal leading-8 tracking-[-0.02em] text-black sm:text-[1.05rem]">
          {question}
        </span>
        <span
          className={cn(
            "inline-flex h-8 w-8 shrink-0 items-center justify-center text-[1.65rem] leading-none text-black transition-transform duration-300",
          )}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <div
        id={panelId}
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <div className={cn("pb-6", !isOpen && "invisible")}>
            <div className="max-w-3xl text-[0.98rem] leading-8 text-[#7B869B]">{answer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
