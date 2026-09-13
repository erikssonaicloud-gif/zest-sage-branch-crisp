import { useCallback, useEffect, useRef, useState } from "react";
import { createEngine } from "./engine";
import type { GameController, Plane, Snapshot } from "./types";

const HS_KEY = "nestris-delta-highscore";

const EMPTY: Snapshot = {
  well: [],
  piece: null,
  next: [],
  hold: null,
  score: 0,
  level: 1,
  slabs: 0,
  status: "playing",
  activeW: 1,
  inPhase: false,
  phaseRemaining: 0,
  phaseSteps: 0,
  hd: 1,
  hdState: "breathing",
  lastEvent: null,
};

function readHigh(): number {
  try {
    return Number(localStorage.getItem(HS_KEY) ?? 0) || 0;
  } catch {
    return 0;
  }
}

function writeHigh(n: number) {
  try {
    localStorage.setItem(HS_KEY, String(n));
  } catch {
    /* ignore */
  }
}

export function useGame() {
  const engine = useRef<GameController | null>(null);
  const [snap, setSnap] = useState<Snapshot>(EMPTY);
  const [high, setHigh] = useState(0);
  const [ready, setReady] = useState(false);
  const raf = useRef(0);
  const last = useRef(0);

  useEffect(() => {
    engine.current = createEngine();
    setSnap(engine.current.snapshot());
    setHigh(readHigh());
    setReady(true);
    last.current = performance.now();
    const loop = (t: number) => {
      const dt = Math.min(100, t - last.current);
      last.current = t;
      engine.current!.tick(dt);
      const next = engine.current!.snapshot();
      setSnap(next);
      if (next.status === "over" && next.score > readHigh()) {
        writeHigh(next.score);
        setHigh(next.score);
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const restart = useCallback(() => {
    engine.current = createEngine();
    setSnap(engine.current.snapshot());
  }, []);

  const move = useCallback((dx: number, dy: number, dz: number, dw: number) => {
    return engine.current?.tryMove(dx, dy, dz, dw) ?? false;
  }, []);
  const rotate = useCallback((p: Plane) => engine.current?.tryRotate(p) ?? false, []);
  const softDrop = useCallback(() => engine.current?.softDrop(), []);
  const hardDrop = useCallback(() => engine.current?.hardDrop(), []);
  const phaseStep = useCallback((dir: number) => engine.current?.phaseStep(dir) ?? false, []);
  const confirm = useCallback(() => engine.current?.confirmPhase(), []);
  const hold = useCallback(() => engine.current?.holdPiece(), []);

  return {
    snap,
    high,
    ready,
    restart,
    move,
    rotate,
    softDrop,
    hardDrop,
    phaseStep,
    confirm,
    hold,
  };
}

export type GameApi = ReturnType<typeof useGame>;
