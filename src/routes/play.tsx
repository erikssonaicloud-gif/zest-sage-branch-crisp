import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ControlPads } from "@/components/game/pads";
import { GameHud } from "@/components/game/hud";
import { DualWells } from "@/components/game/wells";
import { DeltaMark } from "@/components/mark";
import { Button } from "@/components/ui/button";
import { useGame } from "@/game/use-game";

export const Route = createFileRoute("/play")({ component: Play });

function Play() {
  const api = useGame();
  const { snap, restart, move, rotate, softDrop, hardDrop, hold, phaseStep, confirm } = api;
  const hdPct = Math.round(snap.hd * 100);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (snap.status !== "playing") {
        if (e.key === "Enter") restart();
        return;
      }
      const code = e.code;
      const prevent = new Set([
        "ArrowLeft",
        "ArrowRight",
        "ArrowDown",
        "ArrowUp",
        "Space",
        "KeyA",
        "KeyD",
        "KeyQ",
        "KeyE",
        "KeyR",
        "KeyF",
        "KeyC",
        "KeyZ",
        "KeyX",
        "Enter",
      ]);
      if (prevent.has(code)) e.preventDefault();
      switch (code) {
        case "ArrowLeft":
          move(-1, 0, 0, 0);
          break;
        case "ArrowRight":
          move(1, 0, 0, 0);
          break;
        case "ArrowDown":
          softDrop();
          break;
        case "ArrowUp":
          rotate("xy");
          break;
        case "Space":
          hardDrop();
          break;
        case "KeyA":
          move(0, -1, 0, 0);
          break;
        case "KeyD":
          move(0, 1, 0, 0);
          break;
        case "KeyQ":
          move(0, 0, 0, -1);
          break;
        case "KeyE":
          move(0, 0, 0, 1);
          break;
        case "KeyR":
          rotate("xw");
          break;
        case "KeyF":
          rotate("xz");
          break;
        case "KeyC":
          hold();
          break;
        case "Enter":
          confirm();
          break;
        case "KeyZ":
          phaseStep(-1);
          break;
        case "KeyX":
          phaseStep(1);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [snap.status, restart, move, rotate, softDrop, hardDrop, hold, phaseStep, confirm]);

  return (
    <div className="game-shell min-h-dvh overflow-x-hidden bg-bg text-fg lg:overflow-visible">
      <header
        className="sticky top-0 z-20 border-b border-border bg-bg/80 backdrop-blur-xl"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <span className="relative grid size-6 place-items-center">
              <span className="absolute size-6 rounded bg-accent/40 blur-[5px] opacity-50" />
              <DeltaMark className="relative size-3.5" />
            </span>
            <span className="font-display text-xs tracking-[0.2em]">
              NESTRIS <span className="text-accent">Δ</span>
              <span className="text-subtle"> · prototype</span>
            </span>
          </div>
          <span className="hidden text-[11px] text-subtle sm:block">v0.1 · 4D engine</span>
        </div>
      </header>

      <main className="game-main mx-auto flex max-w-6xl flex-col gap-2 px-3 py-2 sm:gap-4 sm:px-4 sm:py-5 lg:grid lg:h-auto lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-6 lg:px-6">
        <div className="flex min-h-0 flex-1 flex-col gap-2 sm:gap-4">
          <div className="grid shrink-0 grid-cols-3 gap-2 lg:hidden">
            <MobileStat label="Score" value={snap.score.toLocaleString()} />
            <MobileStat label="Level" value={String(snap.level)} />
            <MobileStat label="Density" value={`${hdPct}%`} accent={snap.hdState === "pressure"} />
          </div>
          <DualWells api={api} />
          <ControlPads api={api} />
          <p className="hidden text-[12px] leading-relaxed text-muted sm:block">
            <span className="font-medium text-fg">Controls:</span> ←/→ move x · ↓ soft drop ·
            Space hard drop · ↑ rotate (xy) · R rotate phase (xw) · F rotate (xz) · A/D depth
            (y) · Q/E phase (w) · Z/X Phase Slide · Enter confirm · C hold.
          </p>
          <p className="hidden text-[12px] leading-relaxed text-subtle sm:hidden">
            Swipe the board ←/→ to move, ↓ to soft drop, flick down to hard drop, tap to rotate.
            Pads below handle depth, phase, and Phase Slide.
          </p>
          <p className="mt-auto text-center text-[10px] tracking-wide text-subtle sm:hidden">
            Swipe a board to move · tap to rotate · use the pads for phase
          </p>
          <p className="hidden text-[12px] leading-relaxed text-muted sm:block">
            Clear a full <span className="text-fg">x·y·w hyper-slab</span> at one height. Nest
            small pieces into hyperpockets (≥6/8 shielded) across phase to raise{" "}
            <span className="text-accent">hyperdensity</span> — stack only in one brane and the
            shadow-stacking penalty kills you faster.
          </p>
        </div>
        <div className="hidden lg:block">
          <GameHud api={api} />
        </div>
      </main>

      {snap.status === "over" ? (
        <div className="fixed inset-0 z-30 grid place-items-center bg-bg/70 px-6 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-6 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <div className="font-display text-lg text-danger">Hyper-well collapse</div>
            <div className="mt-1 text-sm text-muted">
              Final score {snap.score.toLocaleString()}
            </div>
            <Button onClick={restart} className="mt-5 w-full">
              Re-enter the transdimension
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MobileStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-md border border-border bg-surface-2/80 px-2.5 py-1.5">
      <div className="text-[9px] tracking-[0.18em] text-subtle uppercase">{label}</div>
      <div className={accent ? "text-danger text-sm tabular-nums" : "text-fg text-sm tabular-nums"}>
        {value}
      </div>
    </div>
  );
}
