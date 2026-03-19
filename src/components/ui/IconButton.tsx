import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
};

export default function IconButton({ icon, className, ...props }: IconButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-white/70 text-[var(--color-primary)] shadow-[0_10px_30px_rgba(7,27,84,0.08)] transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_14px_36px_rgba(7,27,84,0.12)]",
        className,
      )}
      type="button"
      {...props}
    >
      {icon}
    </button>
  );
}
