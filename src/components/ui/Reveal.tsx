'use client';

import { type ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { getRevealClasses, type RevealVariant } from "@/lib/reveal";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, isVisible]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-[var(--duration-reveal)] ease-[var(--ease-smooth)] motion-reduce:transform-none motion-reduce:opacity-100",
        getRevealClasses(isVisible, variant),
        className,
      )}
    >
      {children}
    </div>
  );
}
