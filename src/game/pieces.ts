import type { Cell, PieceDef, PieceId } from "./types";

export const PIECE_COLORS: Record<PieceId, string> = {
  MONOLITH: "#7dd3fc",
  REACTOR: "#a78bfa",
  CRADLE: "#f472b6",
  PLATE: "#fbbf24",
  BAR: "#34d399",
  BLADE: "#fb7185",
  FIN: "#60a5fa",
  STEP: "#c084fc",
};

/** 2D tetromino templates used as the three mating parents. */
const SHAPES = {
  I_v: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  I_h: [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  O: [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ],
  T_d: [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  S: [
    [1, 0],
    [2, 0],
    [0, 1],
    [1, 1],
  ],
} as const;

type XY = readonly [number, number];

function groupByHeight(shape: readonly XY[]): Record<number, number[]> {
  const g: Record<number, number[]> = {};
  for (const [a, z] of shape) {
    (g[z] ??= []).push(a);
  }
  return g;
}

/**
 * Ternary mating product: 𝟙_M(x,y,z,w) = 𝟙_A(x,z) · 𝟙_B(y,z) · 𝟙_C(w,z)
 * For each shared height z, take the cartesian product of the three parents.
 */
function mate(A: readonly XY[], B: readonly XY[], C: readonly XY[]): Cell[] {
  const aZ = groupByHeight(A);
  const bZ = groupByHeight(B);
  const cZ = groupByHeight(C);
  const heights = new Set<number>();
  for (const k of Object.keys(aZ)) heights.add(Number(k));
  for (const k of Object.keys(bZ)) heights.add(Number(k));
  for (const k of Object.keys(cZ)) heights.add(Number(k));

  const cells: Cell[] = [];
  for (const z of heights) {
    const xs = aZ[z] ?? [];
    const ys = bZ[z] ?? [];
    const ws = cZ[z] ?? [];
    if (!xs.length || !ys.length || !ws.length) continue;
    for (const x of xs) for (const y of ys) for (const w of ws) {
      cells.push([x, y, z, w]);
    }
  }
  return cells;
}

const SPECS: { id: PieceId; name: string; A: readonly XY[]; B: readonly XY[]; C: readonly XY[] }[] = [
  { id: "MONOLITH", name: "MONOLITH-Δ", A: SHAPES.I_v, B: SHAPES.I_v, C: SHAPES.I_v },
  { id: "REACTOR", name: "REACTOR-Δ", A: SHAPES.O, B: SHAPES.O, C: SHAPES.O },
  { id: "CRADLE", name: "HYPERCRADLE", A: SHAPES.T_d, B: SHAPES.T_d, C: SHAPES.T_d },
  { id: "PLATE", name: "PLATE-Δ", A: SHAPES.I_h, B: SHAPES.I_h, C: SHAPES.I_h },
  { id: "BAR", name: "BAR-Δ", A: SHAPES.I_v, B: SHAPES.O, C: SHAPES.I_v },
  { id: "BLADE", name: "BLADE-Δ", A: SHAPES.T_d, B: SHAPES.I_h, C: SHAPES.O },
  { id: "FIN", name: "FIN-Δ", A: SHAPES.O, B: SHAPES.T_d, C: SHAPES.I_h },
  { id: "STEP", name: "STEP-Δ", A: SHAPES.S, B: SHAPES.O, C: SHAPES.I_v },
];

export const PIECES: PieceDef[] = SPECS.map((s) => ({
  id: s.id,
  name: s.name,
  cells: mate(s.A, s.B, s.C),
}));

export const PIECE_BY_ID: Record<PieceId, PieceDef> = Object.fromEntries(
  PIECES.map((p) => [p.id, p]),
) as Record<PieceId, PieceDef>;

export function shuffleBag(): PieceDef[] {
  const bag = [...PIECES];
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bag[i], bag[j]] = [bag[j]!, bag[i]!];
  }
  return bag;
}
