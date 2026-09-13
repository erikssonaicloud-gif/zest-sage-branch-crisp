export const WELL = { X: 5, Y: 5, Z: 12, W: 4 } as const;

export type Cell = readonly [x: number, y: number, z: number, w: number];
export type Vec4 = [number, number, number, number];
export type Axis = "x" | "y" | "z" | "w";
export type Plane = "xy" | "xz" | "xw" | "yz" | "yw" | "zw";

export type PieceId =
  | "MONOLITH"
  | "REACTOR"
  | "CRADLE"
  | "PLATE"
  | "BAR"
  | "BLADE"
  | "FIN"
  | "STEP";

export type PieceDef = {
  id: PieceId;
  name: string;
  cells: Cell[];
};

export type ActivePiece = {
  id: PieceId;
  name: string;
  color: string;
  cells: Cell[];
  channel: Axis;
};

export type WellCell = { color: string; host: number };

export type HdState = "breathing" | "neutral" | "pressure";

export type GameEvent =
  | { type: "over" }
  | { type: "nest"; host: number }
  | { type: "clear"; count: number; pts: number }
  | null;

export type PreviewPiece = {
  id: PieceId;
  name: string;
  color: string;
  cells: Cell[];
};

export type Snapshot = {
  well: { key: string; color: string }[];
  piece: ActivePiece | null;
  next: PreviewPiece[];
  hold: PreviewPiece | null;
  score: number;
  level: number;
  slabs: number;
  status: "playing" | "over";
  activeW: number;
  inPhase: boolean;
  phaseRemaining: number;
  phaseSteps: number;
  hd: number;
  hdState: HdState;
  lastEvent: GameEvent;
};

export type GameController = {
  tick: (dtMs: number) => void;
  tryMove: (dx: number, dy: number, dz: number, dw: number) => boolean;
  tryRotate: (plane: Plane) => boolean;
  softDrop: () => void;
  hardDrop: () => void;
  phaseStep: (dir: number) => boolean;
  confirmPhase: () => void;
  holdPiece: () => void;
  snapshot: () => Snapshot;
};
