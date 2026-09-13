import type { CSSProperties } from "react";

export function TesseractHero() {
  return (
    <div className="relative mx-auto grid h-[340px] w-full max-w-[420px] place-items-center overflow-hidden sm:h-[420px]">
      <div className="absolute size-64 rounded-full bg-accent/10 blur-3xl" />
      <div
        className="relative h-40 w-40 sm:h-48 sm:w-48"
        style={{ perspective: "900px", transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            animation: "cube-spin 28s linear infinite",
          }}
        >
          <Cube size={160} color="color-mix(in oklab, var(--color-accent) 70%, white)" fill />
          <div
            className="absolute inset-0"
            style={{ transform: "translateZ(-28px) scale(0.62)", transformStyle: "preserve-3d" }}
          >
            <Cube size={160} color="color-mix(in oklab, var(--color-fg) 45%, transparent)" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Cube({ size, color, fill }: { size: number; color: string; fill?: boolean }) {
  const half = size / 2;
  const face: CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    left: 0,
    top: 0,
    border: `1px solid ${color}`,
    background: fill ? "color-mix(in oklab, var(--color-accent) 8%, transparent)" : "transparent",
    boxShadow: fill
      ? "inset 0 0 28px color-mix(in oklab, var(--color-accent) 16%, transparent)"
      : undefined,
  };
  return (
    <div style={{ width: size, height: size, transformStyle: "preserve-3d" }}>
      <div style={{ ...face, transform: `translateZ(${half}px)` }} />
      <div style={{ ...face, transform: `rotateY(180deg) translateZ(${half}px)` }} />
      <div style={{ ...face, transform: `rotateY(90deg) translateZ(${half}px)` }} />
      <div style={{ ...face, transform: `rotateY(-90deg) translateZ(${half}px)` }} />
      <div style={{ ...face, transform: `rotateX(90deg) translateZ(${half}px)` }} />
      <div style={{ ...face, transform: `rotateX(-90deg) translateZ(${half}px)` }} />
    </div>
  );
}
