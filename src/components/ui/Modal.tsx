"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

import { cn } from "@/lib/cn";

interface ModalProps {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function Modal({
  children,
  className,
  isOpen,
  onClose,
  title,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-labelledby="modal-title"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
      role="dialog"
    >
      <button
        aria-label="Close modal"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        type="button"
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-xl rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_28px_90px_rgba(7,27,84,0.18)] sm:p-7",
          className,
        )}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand)]">
              Inventory
            </p>
            <h2 className="text-2xl font-semibold text-slate-950" id="modal-title">
              {title}
            </h2>
          </div>
          <button
            aria-label="Close modal"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
            onClick={onClose}
            type="button"
          >
            <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
