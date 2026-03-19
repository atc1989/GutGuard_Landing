import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  subtitle,
  className = "",
  align = "center",
}: SectionHeadingProps) {
  const body = description ?? subtitle;

  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand)]",
            align === "center" && "mx-auto",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-serif text-[2.2rem] font-semibold tracking-tight text-slate-900 sm:text-[2.65rem]">
        {title}
      </h2>
      {body ? (
        <p
          className={cn(
            "mt-4 text-base leading-8 text-slate-600 sm:text-lg",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
