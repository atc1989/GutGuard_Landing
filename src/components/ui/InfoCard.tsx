interface InfoCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function InfoCard({ title, description, icon }: InfoCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[32px] border border-white/70 bg-white/84 p-7 shadow-[0_22px_60px_rgba(7,27,84,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(7,27,84,0.1)]">
      {icon ? (
        <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(79,99,255,0.14),rgba(79,99,255,0.04))] text-2xl text-[var(--brand)]">
          {icon}
        </div>
      ) : null}
      <h3 className="mb-4 text-xl font-semibold tracking-[-0.03em] text-slate-900">{title}</h3>
      <p className="mt-auto text-sm leading-7 text-slate-600">{description}</p>
    </article>
  );
}
