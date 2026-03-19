import Image from "next/image";
import type { ReactNode } from "react";

interface PartnerCardProps {
  logo?: string;
  name: string;
  description?: string;
  icon?: ReactNode;
  cta?: string;
}

export default function PartnerCard({ logo, name, description, icon, cta }: PartnerCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[30px] border border-white/70 bg-white/84 p-7 shadow-[0_22px_60px_rgba(7,27,84,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(7,27,84,0.1)]">
      {logo ? (
        <Image
          alt={name}
          className="mb-6 h-12 w-auto opacity-75"
          height={48}
          src={logo}
          width={120}
        />
      ) : null}
      {icon ? (
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(79,99,255,0.14),rgba(79,99,255,0.04))] text-xl font-semibold text-[var(--brand)]">
          {icon}
        </div>
      ) : null}
      <h3 className="text-xl font-semibold tracking-[-0.03em] text-slate-900">{name}</h3>
      {description ? <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p> : null}
      {cta ? (
        <p className="mt-auto pt-6 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">
          {cta}
        </p>
      ) : null}
    </article>
  );
}
