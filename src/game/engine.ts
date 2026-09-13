import { PIECE_BY_ID, PIECE_COLORS, shuffleBag } from "./pieces";
import type {
  ActivePiece,
  Axis,
  Cell,
  GameController,
  GameEvent,
  HdState,
  PieceDef,
  PieceId,
  Plane,
  Snapshot,
  WellCell,
} from "./types";
import { WELL } from "./types";

const KEY = (x: number, y: number, z: number, w: number) => `${x},${y},${z},${w}`;
const PARSE = (k: string): Cell => k.split(",").map(Number) as unknown as Cell;

const NEIGHBORS: Cell[] = [
  [1, 0, 0, 0],
  [-1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, -1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, -1, 0],
  [0, 0, 0, 1],
  [0, 0, 0, -1],
];

const KICKS: Cell[] = [
  [0, 0, 0, 0],
  [-1, 0, 0, 0],
  [1, 0, 0, 0],
  [0, -1, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, -1],
  [0, 0, 0, 1],
  [-1, -1, 0, 0],
  [1, 1, 0, 0],
  [-1, 1, 0, 0],
  [1, -1, 0, 0],
  [0, 0, 1, 1],
  [0, 0, 1, -1],
  [0, 0, 0, 2],
  [0, 0, 2, 0],
];

const ROTATE: Record<Plane, (c: Cell) => Cell> = {
  xy: ([x, y, z, w]) => [-y, x, z, w],
  xz: ([x, y, z, w]) => [-z, y, x, w],
  xw: ([x, y, z, w]) => [-w, y, z, x],
  yz: ([x, y, z, w]) => [x, -z, y, w],
  yw: ([x, y, z, w]) => [x, -w, z, y],
  zw: ([x, y, z, w]) => [x, y, -w, z],
};

const AXIS_I: Record<Axis, number> = { x: 0, y: 1, z: 2, w: 3 };

type Bounds = {
  minx: number;
  miny: number;
  minz: number;
  minw: number;
  maxx: number;
  maxy: number;
  maxz: number;
  maxw: number;
};

function bounds(cells: Cell[]): Bounds {
  let minx = Infinity,
    miny = Infinity,
    minz = Infinity,
    minw = Infinity;
  let maxx = -Infinity,
    maxy = -Infinity,
    maxz = -Infinity,
    maxw = -Infinity;
  for (const [x, y, z, w] of cells) {
    if (x < minx) minx = x;
    if (x > maxx) maxx = x;
    if (y < miny) miny = y;
    if (y > maxy) maxy = y;
    if (z < minz) minz = z;
    if (z > maxz) maxz = z;
    if (w < minw) minw = w;
    if (w > maxw) maxw = w;
  }
  return { minx, miny, minz, minw, maxx, maxy, maxz, maxw };
}

function centroid(cells: Cell[], axis: 0 | 1 | 2 | 3): number {
  const b = bounds(cells);
  const mins = [b.minx, b.miny, b.minz, b.minw];
  const maxs = [b.maxx, b.maxy, b.maxz, b.maxw];
  return (mins[axis]! + maxs[axis]!) / 2;
}

function normalize(cells: Cell[]): Cell[] {
  const b = bounds(cells);
  return cells.map(([x, y, z, w]) => [x - b.minx, y - b.miny, z - b.minz, w - b.minw]);
}

function translate(cells: Cell[], dx: number, dy: number, dz: number, dw: number): Cell[] {
  return cells.map(([x, y, z, w]) => [x + dx, y + dy, z + dz, w + dw]);
}

function rotate(cells: Cell[], plane: Plane): Cell[] {
  const fn = ROTATE[plane];
  const cx = centroid(cells, 0);
  const cy = centroid(cells, 1);
  const cz = centroid(cells, 2);
  const cw = centroid(cells, 3);
  return cells.map(([x, y, z, w]) => {
      const [nx, ny, nz, nw] = fn([x - cx, y - cy, z - cz, w - cw]);
      return [Math.round(nx + cx), Math.round(ny + cy), Math.round(nz + cz), Math.round(nw + cw)];
    });
}

function inBounds(cells: Cell[]): boolean {
  for (const [x, y, z, w] of cells) {
    if (x < 0 || x >= WELL.X || y < 0 || y >= WELL.Y || z < 0 || z >= WELL.Z + 2 || w < 0 || w >= WELL.W) {
      return false;
    }
  }
  return true;
}

function sliceSignature(points: number[][]): string {
  const min = [Infinity, Infinity, Infinity];
  for (const p of points) {
    for (let i = 0; i < 3; i++) min[i] = Math.min(min[i]!, p[i]!);
  }
  return points
    .map((p) => `${p[0]! - min[0]!},${p[1]! - min[1]!},${p[2]! - min[2]!}`)
    .sort()
    .join(";");
}

function isExtruded(cells: Cell[], axis: Axis): boolean {
  const ai = AXIS_I[axis];
  const slices: Record<number, number[][]> = {};
  for (const c of cells) {
    const v = c[ai]!;
    const rest = c.filter((_, i) => i !== ai) as number[];
    (slices[v] ??= []).push(rest);
  }
  const keys = Object.keys(slices);
  if (keys.length < 2) return false;
  const sig = sliceSignature(slices[Number(keys[0])]!);
  return keys.every((k) => sliceSignature(slices[Number(k)]!) === sig);
}

function channelOf(cells: Cell[]): Axis {
  const b = bounds(cells);
  const ext = {
    x: b.maxx - b.minx + 1,
    y: b.maxy - b.miny + 1,
    w: b.maxw - b.minw + 1,
    z: b.maxz - b.minz + 1,
  };
  const rank: Record<Axis, number> = { x: 0, y: 1, w: 2, z: 3 };
  const extruded = (["x", "y", "w", "z"] as Axis[]).filter((a) => ext[a] >= 2 && isExtruded(cells, a));
  const score = (a: Axis): [number, number] => [ext[a], -rank[a]];
  const pool = extruded.length ? extruded : (["x", "y", "w", "z"] as Axis[]);
  return pool.slice().sort((a, b) => {
    const [ea, ra] = score(a);
    const [eb, rb] = score(b);
    return eb - ea || rb - ra;
  })[0]!;
}

function floodPockets(candidates: Set<string>): Cell[][] {
  const seen = new Set<string>();
  const groups: Cell[][] = [];
  for (const start of candidates) {
    if (seen.has(start)) continue;
    const stack = [start];
    const group: string[] = [];
    seen.add(start);
    while (stack.length) {
      const cur = stack.pop()!;
      group.push(cur);
      const [x, y, z, w] = PARSE(cur);
      for (const [dx, dy, dz, dw] of NEIGHBORS) {
        const nk = KEY(x + dx, y + dy, z + dz, w + dw);
        if (candidates.has(nk) && !seen.has(nk)) {
          seen.add(nk);
          stack.push(nk);
        }
      }
    }
    if (group.length >= 4) groups.push(group.map(PARSE));
  }
  return groups;
}

function findPockets(cells: Cell[]): Cell[][] {
  const occupied = new Set(cells.map((c) => KEY(...c)));
  const b = bounds(cells);
  const lo: Vec4Like = [
    Math.max(0, b.minx - 1),
    Math.max(0, b.miny - 1),
    Math.max(0, b.minz - 1),
    Math.max(0, b.minw - 1),
  ];
  const hi: Vec4Like = [
    Math.min(WELL.X - 1, b.maxx + 1),
    Math.min(WELL.Y - 1, b.maxy + 1),
    Math.min(WELL.Z - 1, b.maxz + 1),
    Math.min(WELL.W - 1, b.maxw + 1),
  ];
  type Vec4Like = [number, number, number, number];
  const pocket = new Set<string>();
  for (let x = lo[0]; x <= hi[0]; x++) {
    for (let y = lo[1]; y <= hi[1]; y++) {
      for (let z = lo[2]; z <= hi[2]; z++) {
        for (let w = lo[3]; w <= hi[3]; w++) {
          if (occupied.has(KEY(x, y, z, w))) continue;
          let shielded = 0;
          for (const [dx, dy, dz, dw] of NEIGHBORS) {
            let cx = x + dx,
              cy = y + dy,
              cz = z + dz,
              cw = w + dw;
            while (
              cx >= lo[0] &&
              cx <= hi[0] &&
              cy >= lo[1] &&
              cy <= hi[1] &&
              cz >= lo[2] &&
              cz <= hi[2] &&
              cw >= lo[3] &&
              cw <= hi[3]
            ) {
              if (occupied.has(KEY(cx, cy, cz, cw))) {
                shielded++;
                break;
              }
              cx += dx;
              cy += dy;
              cz += dz;
              cw += dw;
            }
          }
          if (shielded >= 6) pocket.add(KEY(x, y, z, w));
        }
      }
    }
  }
  return floodPockets(pocket);
}

function majorityHost(cells: Cell[], pocketIndex: Map<string, number>): number | null {
  const counts: Record<number, number> = {};
  for (const c of cells) {
    const h = pocketIndex.get(KEY(...c));
    if (h != null) counts[h] = (counts[h] ?? 0) + 1;
  }
  for (const [host, n] of Object.entries(counts)) {
    if (n / cells.length >= 0.75) return Number(host);
  }
  return null;
}

function hyperdensity(filled: number, maxZ: number): number {
  if (filled === 0) return 1;
  return filled / ((maxZ + 1) * WELL.X * WELL.Y * WELL.W);
}

function fallRate(level: number): number {
  return 2 * 1.28 ** (level - 1);
}
function lockDelay(level: number): number {
  return Math.max(200, 500 - 15 * (level - 1));
}
function phaseWindow(level: number): number {
  return Math.max(120, 400 - 10 * level);
}

const SLAB_PTS = [0, 100, 300, 500, 800, 1200];

export function createEngine(): GameController {
  const well = new Map<string, WellCell>();
  const hosts = new Map<number, { cells: Cell[]; pockets: Cell[][] }>();
  const pocketIndex = new Map<string, number>();
  let hostSeq = 0;

  const state = {
    piece: null as ActivePiece | null,
    next: shuffleBag(),
    hold: null as PieceId | null,
    canHold: true,
    score: 0,
    level: 1,
    slabs: 0,
    status: "playing" as "playing" | "over",
    activeW: 1,
    lockTimer: 0,
    lockResets: 0,
    grounded: false,
    phaseRemaining: 0,
    phaseSteps: 0,
    inPhase: false,
    fallAcc: 0,
    hdRolling: [] as number[],
    lastEvent: null as GameEvent,
  };

  function collide(cells: Cell[]): boolean {
    for (const [x, y, z, w] of cells) {
      if (
        x < 0 ||
        x >= WELL.X ||
        y < 0 ||
        y >= WELL.Y ||
        z < 0 ||
        z >= WELL.Z + 2 ||
        w < 0 ||
        w >= WELL.W ||
        well.has(KEY(x, y, z, w))
      ) {
        return true;
      }
    }
    return false;
  }

  function groundedNow(): boolean {
    if (!state.piece) return false;
    return collide(translate(state.piece.cells, 0, 0, -1, 0));
  }

  function placeAtTop(def: PieceDef): Cell[] | null {
    const cells = normalize(def.cells);
    const b = bounds(cells);
    const ox = Math.floor((WELL.X - (b.maxx - b.minx + 1)) / 2);
    const oy = Math.floor((WELL.Y - (b.maxy - b.miny + 1)) / 2);
    const oz = WELL.Z - (b.maxz - b.minz + 1);
    const placed = translate(cells, ox, oy, oz, state.activeW);
    if (!inBounds(placed) || collide(placed)) return null;
    return placed;
  }

  function spawn(): void {
    const def = state.next[0];
    if (!def) return;
    state.next = state.next.slice(1);
    if (state.next.length < 3) state.next = state.next.concat(shuffleBag());
    const placed = placeAtTop(def);
    if (!placed) {
      state.status = "over";
      state.lastEvent = { type: "over" };
      return;
    }
    state.piece = {
      id: def.id,
      name: def.name,
      color: PIECE_COLORS[def.id],
      cells: placed,
      channel: channelOf(placed),
    };
    state.canHold = true;
    state.lockTimer = 0;
    state.lockResets = 0;
    state.grounded = false;
    state.inPhase = false;
    state.phaseRemaining = 0;
    state.phaseSteps = 0;
    state.fallAcc = 0;
  }

  function tryMove(dx: number, dy: number, dz: number, dw: number): boolean {
    if (!state.piece || state.status !== "playing" || state.inPhase) return false;
    const next = translate(state.piece.cells, dx, dy, dz, dw);
    if (collide(next) || !inBounds(next)) return false;
    state.piece.cells = next;
    if (dw !== 0) state.activeW = Math.max(0, Math.min(WELL.W - 1, state.activeW + dw));
    if (groundedNow()) {
      state.grounded = true;
      if (state.lockResets < 8) {
        state.lockTimer = 0;
        state.lockResets++;
      }
    } else {
      state.grounded = false;
      state.lockTimer = 0;
    }
    return true;
  }

  function tryRotate(plane: Plane): boolean {
    if (!state.piece || state.status !== "playing" || state.inPhase) return false;
    const rotated = rotate(state.piece.cells, plane);
    for (const [kx, ky, kz, kw] of KICKS) {
      const kicked = translate(rotated, kx, ky, kz, kw);
      if (!collide(kicked) && inBounds(kicked)) {
        state.piece.cells = kicked;
        state.piece.channel = channelOf(kicked);
        if (groundedNow()) {
          state.grounded = true;
          if (state.lockResets < 8) {
            state.lockTimer = 0;
            state.lockResets++;
          }
        } else {
          state.grounded = false;
          state.lockTimer = 0;
        }
        return true;
      }
    }
    return false;
  }

  function softDrop(): void {
    if (!state.piece || state.inPhase) return;
    if (tryMove(0, 0, -1, 0)) state.score += 1;
  }

  function beginPhase(): void {
    const piece = state.piece;
    if (!piece) return;
    for (const c of piece.cells) {
      if (c[2] >= WELL.Z) {
        state.status = "over";
        state.lastEvent = { type: "over" };
        return;
      }
    }
    state.inPhase = true;
    state.phaseRemaining = phaseWindow(state.level);
    state.phaseSteps = 0;
  }

  function hardDrop(): void {
    if (!state.piece || state.inPhase) return;
    let n = 0;
    while (tryMove(0, 0, -1, 0)) n++;
    state.score += 2 * n;
    beginPhase();
  }

  function holdPiece(): void {
    if (!state.piece || !state.canHold || state.inPhase) return;
    const current = state.piece.id;
    if (state.hold) {
      const swapped = state.hold;
      state.hold = current;
      spawnHeld(swapped);
    } else {
      state.hold = current;
      spawn();
    }
    state.canHold = false;
  }

  function spawnHeld(id: PieceId): void {
    const def = PIECE_BY_ID[id];
    const placed = placeAtTop(def);
    if (!placed) {
      state.status = "over";
      return;
    }
    state.piece = {
      id: def.id,
      name: def.name,
      color: PIECE_COLORS[def.id],
      cells: placed,
      channel: channelOf(placed),
    };
    state.lockTimer = 0;
    state.lockResets = 0;
    state.grounded = false;
    state.inPhase = false;
  }

  function refreshNearbyPockets(cells: Cell[], skipHost: number): void {
    const b = bounds(cells);
    for (const [hid, host] of hosts) {
      if (hid === skipHost) continue;
      const hb = bounds(host.cells);
      const overlap =
        b.minx - 1 <= hb.maxx + 1 &&
        b.maxx + 1 >= hb.minx - 1 &&
        b.miny - 1 <= hb.maxy + 1 &&
        b.maxy + 1 >= hb.miny - 1 &&
        b.minz - 1 <= hb.maxz + 1 &&
        b.maxz + 1 >= hb.minz - 1 &&
        b.minw - 1 <= hb.maxw + 1 &&
        b.maxw + 1 >= hb.minw - 1;
      if (!overlap) continue;
      for (const pocket of host.pockets) {
        for (const c of pocket) pocketIndex.delete(KEY(...c));
      }
      const next = findPockets(host.cells);
      host.pockets = next;
      for (const pocket of next) {
        for (const c of pocket) pocketIndex.set(KEY(...c), hid);
      }
    }
  }

  function phaseStep(dir: number): boolean {
    if (!state.inPhase || !state.piece || state.phaseSteps >= 8 || state.phaseRemaining <= 0) {
      return false;
    }
    const ch = state.piece.channel;
    const delta: [number, number, number, number] = [0, 0, 0, 0];
    delta[AXIS_I[ch]] = dir;
    const next = translate(state.piece.cells, ...delta);
    if (collide(next) || !inBounds(next)) return false;
    state.piece.cells = next;
    if (ch === "w") state.activeW = Math.max(0, Math.min(WELL.W - 1, state.activeW + dir));
    state.phaseSteps++;
    state.phaseRemaining -= 40;
    return true;
  }

  function settle(): void {
    state.inPhase = false;
    const piece = state.piece;
    if (!piece) return;
    for (const c of piece.cells) {
      if (c[2] >= WELL.Z) {
        state.status = "over";
        state.lastEvent = { type: "over" };
        return;
      }
    }
    const hid = ++hostSeq;
    for (const c of piece.cells) well.set(KEY(...c), { color: piece.color, host: hid });
    const pockets = findPockets(piece.cells);
    hosts.set(hid, { cells: piece.cells.slice(), pockets });
    for (const pocket of pockets) {
      for (const c of pocket) pocketIndex.set(KEY(...c), hid);
    }
    refreshNearbyPockets(piece.cells, hid);
    const nest = majorityHost(piece.cells, pocketIndex);
    if (nest != null) {
      state.score += 4 * piece.cells.length * state.level;
      state.lastEvent = { type: "nest", host: nest };
      if (state.phaseSteps >= 2 && piece.channel === "w") {
        state.score += 200 * state.level;
      }
    }
    clearSlabs();
    sampleHd();
    state.piece = null;
    if (state.status === "playing") spawn();
  }

  function confirmPhase(): void {
    if (!state.inPhase) return;
    for (;;) {
      const dropped = translate(state.piece!.cells, 0, 0, -1, 0);
      if (!collide(dropped) && inBounds(dropped)) state.piece!.cells = dropped;
      else break;
    }
    settle();
  }

  function clearSlabs(): void {
    let cleared = 0;
    for (let z = 0; z < WELL.Z; z++) {
      let full = true;
      outer: for (let x = 0; x < WELL.X; x++) {
        for (let y = 0; y < WELL.Y; y++) {
          for (let w = 0; w < WELL.W; w++) {
            if (!well.has(KEY(x, y, z, w))) {
              full = false;
              break outer;
            }
          }
        }
      }
      if (!full) continue;
      cleared++;
      for (let x = 0; x < WELL.X; x++) {
        for (let y = 0; y < WELL.Y; y++) {
          for (let w = 0; w < WELL.W; w++) well.delete(KEY(x, y, z, w));
        }
      }
      const moving: [string, number, number, number, number][] = [];
      for (const k of well.keys()) {
        const [x, y, zz, w] = PARSE(k);
        if (zz > z) moving.push([k, x, y, zz, w]);
      }
      moving.sort((a, b) => b[3] - a[3]);
      for (const [k, x, y, zz, w] of moving) {
        const cell = well.get(k)!;
        well.delete(k);
        well.set(KEY(x, y, zz - 1, w), cell);
      }
    }
    if (cleared > 0) {
      const pts = (SLAB_PTS[Math.min(cleared, 5)] ?? 1200) * state.level;
      state.score += pts;
      state.slabs += cleared;
      state.lastEvent = { type: "clear", count: cleared, pts };
      if (state.slabs >= state.level * 10) state.level++;
      if (well.size === 0) state.score += 5000 * state.level;
    }
  }

  function sampleHd(): void {
    let maxZ = -1;
    for (const k of well.keys()) {
      const z = Number(k.split(",")[2]);
      if (z > maxZ) maxZ = z;
    }
    const hd = hyperdensity(well.size, maxZ);
    state.hdRolling.push(hd);
    if (state.hdRolling.length > 10) state.hdRolling.shift();
  }

  function meanHd(): number {
    if (!state.hdRolling.length) return 1;
    return state.hdRolling.reduce((a, b) => a + b, 0) / state.hdRolling.length;
  }

  function tick(dtMs: number): void {
    if (state.status !== "playing") return;
    const dt = Math.min(dtMs, 100);
    if (state.inPhase) {
      state.phaseRemaining -= dt;
      if (state.phaseRemaining <= 0) confirmPhase();
      return;
    }
    if (!state.piece) {
      spawn();
      return;
    }
    const hd = meanHd();
    const hdMul = hd > 0.75 ? 0.9 : hd < 0.45 ? 1.15 : 1;
    const cellsPerSec = fallRate(state.level) * hdMul;
    state.fallAcc += (cellsPerSec * dt) / 1000;
    while (state.fallAcc >= 1) {
      state.fallAcc--;
      if (!tryMove(0, 0, -1, 0)) {
        state.grounded = true;
        break;
      }
    }
    if (state.grounded) {
      state.lockTimer += dt;
      if (state.lockTimer >= lockDelay(state.level)) beginPhase();
    }
  }

  function snapshot(): Snapshot {
    const hd = meanHd();
    const hdState: HdState = hd > 0.75 ? "breathing" : hd < 0.45 ? "pressure" : "neutral";
    return {
      well: [...well.entries()].map(([key, v]) => ({ key, color: v.color })),
      piece: state.piece ? { ...state.piece, cells: state.piece.cells } : null,
      next: state.next.slice(0, 3).map((p) => ({
        id: p.id,
        name: p.name,
        color: PIECE_COLORS[p.id],
        cells: normalize(p.cells),
      })),
      hold: state.hold
        ? {
            id: state.hold,
            name: PIECE_BY_ID[state.hold].name,
            color: PIECE_COLORS[state.hold],
            cells: normalize(PIECE_BY_ID[state.hold].cells),
          }
        : null,
      score: state.score,
      level: state.level,
      slabs: state.slabs,
      status: state.status,
      activeW: state.activeW,
      inPhase: state.inPhase,
      phaseRemaining: state.phaseRemaining,
      phaseSteps: state.phaseSteps,
      hd,
      hdState,
      lastEvent: state.lastEvent,
    };
  }

  spawn();
  return {
    tick,
    tryMove,
    tryRotate,
    softDrop,
    hardDrop,
    phaseStep,
    confirmPhase,
    holdPiece,
    snapshot,
  };
}
