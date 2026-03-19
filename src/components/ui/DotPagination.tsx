import { cn } from "@/lib/cn";

type DotPaginationProps = {
  count: number;
  activeIndex: number;
};

export default function DotPagination({ count, activeIndex }: DotPaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className={cn(
            "h-2.5 rounded-full transition-all duration-300",
            index === activeIndex ? "w-6 bg-[var(--color-accent)]" : "w-2.5 bg-slate-300/90",
          )}
        />
      ))}
    </div>
  );
}
