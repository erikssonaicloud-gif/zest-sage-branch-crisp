import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "pad";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg hover:bg-accent-strong font-medium shadow-[0_0_24px_color-mix(in_oklab,var(--color-accent)_28%,transparent)]",
  ghost: "bg-transparent text-muted hover:text-fg hover:bg-white/5",
  outline: "border border-border bg-transparent text-fg hover:bg-white/5 hover:border-white/20",
  pad: "border border-border bg-surface-2 text-fg hover:bg-white/8 hover:border-white/20 font-medium",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = "primary", type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm",
        "transition-[transform,background-color,color,border-color,box-shadow] duration-150 ease-out",
        "active:not-disabled:scale-[0.96] disabled:opacity-40 disabled:pointer-events-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
});
