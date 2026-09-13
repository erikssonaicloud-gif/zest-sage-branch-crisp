import { MiniPiece } from "@/components/game/mini-piece";
import type { GameApi } from "@/game/use-game";
import { cn } from "@/lib/utils";

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface-2/80 px-3 py-2.5">
      <div className="text-[10px] tracking-[0.22em] uppercase text-subtle">{label}</div>
      <div className="mt-0.5 font-display text-2xl tabular-nums leading-none text-fg">{value}</div>
      {sub ? <div className="mt-1 text-[11px] text-muted">{sub}</div> : null}
    </div>
  );
}

export function GameHud({ api }: { api: GameApi }) {
  const { snap, high } = api;
  const hdPct = Math.round(snap.hd * 100);
  const hdColor =
    snap.hdState === "breathing"
      ? "text-ok"
      : snap.hdState === "pressure"
        ? "text-danger"
        : "text-accent";

  return (
    <aside className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
        <Stat label="Score" value={snap.score.toLocaleString()} sub={`best ${high.toLocaleString()}`} />
        <Stat label="Level" value={String(snap.level)} sub={`${snap.slabs} slabs`} />
      </div>
      <div className="rounded-lg border border-border bg-surface-2/80 px-3 py-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-[0.22em] uppercase text-subtle">Hyperdensity</span>
          <span className={cn("text-[11px] capitalize", hdColor)}>{snap.hdState}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
          <div
            className={cn(
              "h-full rounded-full transition-[width] duration-300",
              snap.hdState === "breathing"
                ? "bg-ok"
                : snap.hdState === "pressure"
                  ? "bg-danger"
                  : "bg-accent",
            )}
            style={{ width: `${Math.min(100, Math.max(4, hdPct))}%` }}
          />
        </div>
        <div className="mt-1.5 text-[11px] tabular-nums text-muted">
          {hdPct}% · slab {snap.slabs}
        </div>
      </div>
      {snap.inPhase ? (
        <div className="rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-[12px] text-accent">
          Phase Slide window · {Math.max(0, Math.round(snap.phaseRemaining))}ms · step {snap.phaseSteps}/8
        </div>
      ) : null}
      <div className="rounded-lg border border-border bg-surface-2/80 px-3 py-2.5">
        <div className="mb-2 text-[10px] tracking-[0.22em] uppercase text-subtle">Next</div>
        <div className="flex items-end justify-around gap-2">
          {snap.next.map((p) => (
            <MiniPiece key={p.id + p.name} cells={p.cells} color={p.color} label={p.name} />
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-border bg-surface-2/80 px-3 py-2.5">
        <div className="mb-2 text-[10px] tracking-[0.22em] uppercase text-subtle">Hold (C)</div>
        {snap.hold ? (
          <MiniPiece cells={snap.hold.cells} color={snap.hold.color} label={snap.hold.name} />
        ) : (
          <div className="py-3 text-center text-[11px] text-subtle">empty</div>
        )}
      </div>
    </aside>
  );
}
