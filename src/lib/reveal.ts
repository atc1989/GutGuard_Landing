export type RevealVariant = "up" | "left" | "right" | "scale";

const hiddenState: Record<RevealVariant, string> = {
  up: "opacity-0 translate-y-6",
  left: "opacity-0 -translate-x-8",
  right: "opacity-0 translate-x-8",
  scale: "opacity-0 scale-[0.96]",
};

export const getRevealClasses = (
  isVisible: boolean,
  variant: RevealVariant = "up",
) => (isVisible ? "opacity-100 translate-x-0 translate-y-0 scale-100" : hiddenState[variant]);
