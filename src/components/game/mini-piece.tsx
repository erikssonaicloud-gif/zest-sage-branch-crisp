import type { ReactNode } from "react";
import type { Cell } from "@/game/types";

export function MiniPiece({
  cells,
  color,
  label,
}: {
  cells: Cell[];
  color: string;
  label?: string;
}) {
  let maxX = 0,
    maxZ = 0;
  const set = new Set<string>();
  for (const [x, , z] of cells) {
    if (x > maxX) maxX = x;
    if (z > maxZ) maxZ = z;
    set.add(`${x},${z}`);
  }
  const cols = Math.max(1, maxX + 1);
  const rows = Math.max(1, maxZ + 1);
  const tiles: ReactNode[] = [];
  for (let z = rows - 1; z >= 0; z--) {
    for (let x = 0; x < cols; x++) {
      const on = set.has(`${x},${z}`);
      tiles.push(
        <div
          key={`${x},${z}`}
          className="rounded-[1px]"
          style={{
            background: on ? color : "transparent",
            boxShadow: on ? `0 0 6px ${color}88` : undefined,
          }}
        />,
      );
    }
  }
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="grid gap-px"
        style={{
          gridTemplateColumns: `repeat(${cols}, 8px)`,
          gridTemplateRows: `repeat(${rows}, 8px)`,
        }}
      >
        {tiles}
      </div>
      {label ? (
        <span className="text-[9px] tracking-[0.16em] uppercase text-subtle">{label}</span>
      ) : null}
    </div>
  );
}
