import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/cn";

type SharedProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "yellow" | "outline-light";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
};

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

const variantClasses = {
  primary: "bg-[var(--brand)] text-white hover:bg-[var(--brand-strong)] hover:shadow-[0_18px_38px_rgba(79,99,255,0.24)]",
  secondary: "bg-slate-900 text-white hover:bg-slate-700 hover:shadow-[0_18px_38px_rgba(7,27,84,0.16)]",
  ghost: "bg-transparent text-slate-900 hover:bg-white/60",
  yellow: "bg-[var(--accent)] text-slate-950 hover:bg-amber-400 hover:shadow-[0_18px_40px_rgba(244,180,0,0.24)]",
  "outline-light": "border border-white/35 bg-transparent text-white hover:bg-white/10",
};

const sizeClasses = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-[0.98rem]",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-lg font-medium tracking-[0.01em] shadow-sm transition duration-200 ease-[var(--ease-smooth)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 hover:-translate-y-0.5",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;

    return (
      <a className={classes} href={href} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={classes} type={buttonProps.type ?? "button"} {...buttonProps}>
      {children}
    </button>
  );
}
