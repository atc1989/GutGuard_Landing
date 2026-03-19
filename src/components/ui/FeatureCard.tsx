interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <article className="h-full rounded-[30px] border border-[var(--line)] bg-white/88 p-7 shadow-[0_18px_56px_rgba(7,27,84,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_68px_rgba(7,27,84,0.1)]">
      {icon ? <div className="mb-5 text-2xl text-[var(--brand)]">{icon}</div> : null}
      <h3 className="mb-3 text-xl font-semibold tracking-[-0.03em] text-slate-900">{title}</h3>
      <p className="text-sm leading-7 text-slate-600">{description}</p>
    </article>
  );
}
