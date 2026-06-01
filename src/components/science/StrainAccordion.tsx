"use client";

import { useId, useState } from "react";

import { scienceStrains } from "@/data/science-reference";

function StrainItem({
  description,
  name,
}: {
  description: string;
  name: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="overflow-hidden rounded-[18px] bg-white text-slate-950 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left sm:px-8"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="text-[1rem] font-medium tracking-[-0.025em] sm:text-[1.1rem]">{name}</span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-[1.1rem] font-light text-slate-500">
          {isOpen ? "-" : "+"}
        </span>
      </button>
      <div
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        id={panelId}
      >
        <div className="min-h-0">
          <p className="border-t border-slate-100 px-6 pb-6 pt-5 text-[0.95rem] leading-7 text-slate-600 sm:px-8">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function StrainAccordion() {
  return (
    <div className="mt-7 space-y-2.5">
      {scienceStrains.map((strain) => (
        <StrainItem key={strain.name} {...strain} />
      ))}
    </div>
  );
}
