'use client';

import { useId, useState } from "react";

import { cn } from "@/lib/cn";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="overflow-hidden rounded-[26px] border border-white/70 bg-white/82 px-6 shadow-[0_18px_46px_rgba(7,27,84,0.06)] backdrop-blur">
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="text-[1.05rem] font-semibold leading-7 tracking-[-0.02em] text-slate-900">
          {question}
        </span>
        <span
          className={cn(
            "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-white text-xl leading-none text-[var(--brand)] transition-transform duration-300",
            isOpen && "rotate-45",
          )}
        >
          +
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
            <p className="max-w-3xl text-[0.98rem] leading-8 text-slate-600">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
