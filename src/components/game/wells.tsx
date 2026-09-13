import { useRef, type HTMLAttributes, type ReactNode, type TouchEvent } from "react";
import { WELL } from "@/game/types";
import type { GameApi } from "@/game/use-game";
import { cn } from "@/lib/utils";

function xzOf(cells: readonly (readonly [number, number, number, number])[], w: number) {
  const s = new Set<string>();
  for (const [x, , z, ww] of cells) if (ww === w) s.add(`${x},${z}`);
  return s;
}
function yzOf(cells: readonly (readonly [number, number, number, number])[], w: number) {
  const s = new Set<string>();
  for (const [, y, z, ww] of cells) if (ww === w) s.add(`${y},${z}`);
  return s;
}

function Grid({
  title,
  width,
  height,
  fill,
  piece,
  ghost,
  color,
  swipe,
}: {
  title: string;
  width: number;
  height: number;
  fill: Set<string>;
  piece: Set<string>;
  ghost: Set<string>;
  color: string;
  swipe?: HTMLAttributes<HTMLDivElement>;
}) {
  const cells: ReactNode[] = [];
  for (let z = height - 1; z >= 0; z--) {
    for (let x = 0; x < width; x++) {
      const k = `${x},${z}`;
      const isPiece = piece.has(k);
      const isFill = fill.has(k);
      const isGhost = ghost.has(k);
      cells.push(
        <div
          key={k}
          className="rounded-[2px] transition-colors duration-150"
          style={{
            background: isPiece
              ? color
              : isFill
                ? "rgba(255,255,255,0.16)"
                : isGhost
                  ? "rgba(125,211,252,0.12)"
                  : "rgba(255,255,255,0.025)",
            boxShadow: isPiece
              ? `0 0 6px ${color}99, inset 0 0 0 1px ${color}`
              : isFill
                ? "inset 0 0 0 1px rgba(255,255,255,0.18)"
                : "inset 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        />,
      );
    }
  }
  return (
    <div>
      <div className="mb-1.5 text-[10px] tracking-[0.22em] uppercase text-subtle">{title}</div>
      <div
        {...swipe}
        className="grid gap-[2px] rounded-lg border border-border bg-white/[0.015] p-1.5"
        style={{
          gridTemplateColumns: `repeat(${width}, 1fr)`,
          gridTemplateRows: `repeat(${height}, 1fr)`,
          aspectRatio: `${width} / ${height}`,
          touchAction: swipe ? "none" : "auto",
        }}
      >
        {cells}
      </div>
    </div>
  );
}

function PhaseStrip({
  w,
  active,
  fill,
  piece,
  color,
}: {
  w: number;
  active: boolean;
  fill: Set<string>;
  piece: Set<string>;
  color: string;
}) {
  const cells: ReactNode[] = [];
  for (let z = WELL.Z - 1; z >= 0; z--) {
    for (let x = 0; x < WELL.X; x++) {
      const k = `${x},${z}`;
      const on = piece.has(k) || fill.has(k);
      cells.push(
        <div
          key={k}
          className="rounded-[1px]"
          style={{
            background: piece.has(k) ? color : on ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.03)",
          }}
        />,
      );
    }
  }
  return (
    <div
      className={cn(
        "rounded-md border p-1",
        active ? "border-accent/60 bg-accent/5" : "border-border bg-white/[0.015]",
      )}
    >
      <div className="mb-0.5 text-center text-[9px] text-subtle">w{w}</div>
      <div
        className="grid gap-px"
        style={{
          gridTemplateColumns: `repeat(${WELL.X}, 1fr)`,
          gridTemplateRows: `repeat(${WELL.Z}, 1fr)`,
          aspectRatio: `${WELL.X} / ${WELL.Z}`,
        }}
      >
        {cells}
      </div>
    </div>
  );
}

export function DualWells({ api }: { api: GameApi }) {
  const { snap, move, rotate, softDrop, hardDrop } = api;
  const { well, piece, activeW, inPhase } = snap;
  const origin = useRef({ x: 0, y: 0, t: 0, active: false });

  const swipe = inPhase
    ? undefined
    : {
        onTouchStart: (e: TouchEvent) => {
          const t = e.touches[0];
          if (!t) return;
          origin.current = { x: t.clientX, y: t.clientY, t: Date.now(), active: true };
        },
        onTouchEnd: (e: TouchEvent) => {
          if (!origin.current.active) return;
          const t = e.changedTouches[0];
          if (!t) return;
          const dx = t.clientX - origin.current.x;
          const dy = t.clientY - origin.current.y;
          const dt = Date.now() - origin.current.t;
          const ax = Math.abs(dx);
          const ay = Math.abs(dy);
          if (ax < 18 && ay < 18) rotate("xy");
          else if (ax > ay) move(dx > 0 ? 1 : -1, 0, 0, 0);
          else if (dy > 70 && dt < 220) hardDrop();
          else if (dy > 0) softDrop();
          origin.current.active = false;
        },
      };

  const fillXZ = new Set<string>();
  const fillYZ = new Set<string>();
  for (const cell of well) {
    const [x, y, z, w] = cell.key.split(",").map(Number);
    if (w === activeW) {
      fillXZ.add(`${x},${z}`);
      fillYZ.add(`${y},${z}`);
    }
  }
  const pieceXZ = piece ? xzOf(piece.cells, activeW) : new Set<string>();
  const pieceYZ = piece ? yzOf(piece.cells, activeW) : new Set<string>();

  const ghostXZ = new Set<string>();
  if (piece) {
    let drop = 0;
    const ok = (dz: number) =>
      piece.cells.every(([x, y, z, w]) => {
        const nz = z + dz;
        if (nz < 0) return false;
        return !well.some((c) => {
          const [wx, wy, wz, ww] = c.key.split(",").map(Number);
          return ww === w && wx === x && wy === y && wz === nz;
        });
      });
    while (ok(drop - 1)) drop--;
    for (const [x, , z, w] of piece.cells) {
      if (w === activeW) ghostXZ.add(`${x},${z + drop}`);
    }
  }

  const color = piece?.color ?? "#7dd3fc";

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        <Grid
          title="Width × Height (X · Z)"
          width={WELL.X}
          height={WELL.Z}
          fill={fillXZ}
          piece={pieceXZ}
          ghost={ghostXZ}
          color={color}
          swipe={swipe}
        />
        <Grid
          title="Depth × Height (Y · Z)"
          width={WELL.Y}
          height={WELL.Z}
          fill={fillYZ}
          piece={pieceYZ}
          ghost={new Set()}
          color={color}
        />
      </div>
      <div>
        <div className="mb-1.5 text-[10px] tracking-[0.22em] uppercase text-subtle">Phase axis · W</div>
        <div className="grid grid-cols-4 gap-1.5">
          {Array.from({ length: WELL.W }, (_, w) => {
            const fill = new Set<string>();
            for (const cell of well) {
              const [x, , z, ww] = cell.key.split(",").map(Number);
              if (ww === w) fill.add(`${x},${z}`);
            }
            return (
              <PhaseStrip
                key={w}
                w={w}
                active={w === activeW}
                fill={fill}
                piece={piece ? xzOf(piece.cells, w) : new Set()}
                color={color}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
