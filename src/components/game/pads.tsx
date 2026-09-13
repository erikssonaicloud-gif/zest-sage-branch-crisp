import { Button } from "@/components/ui/button";
import type { GameApi } from "@/game/use-game";
import { cn } from "@/lib/utils";

function Pad({
  label,
  onClick,
  wide,
  accent,
}: {
  label: string;
  onClick: () => void;
  wide?: boolean;
  accent?: boolean;
}) {
  return (
    <Button
      variant="pad"
      onClick={onClick}
      className={cn(
        "h-11 min-w-11 touch-manipulation px-2 text-xs tracking-wide",
        wide && "col-span-2",
        accent && "border-accent/50 bg-accent/10 text-accent hover:bg-accent/20",
      )}
    >
      {label}
    </Button>
  );
}

export function ControlPads({ api }: { api: GameApi }) {
  const { move, rotate, softDrop, hardDrop, hold, phaseStep, confirm, snap } = api;
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-4 gap-1.5">
        <Pad label="◀" onClick={() => move(-1, 0, 0, 0)} />
        <Pad label="▼" onClick={softDrop} />
        <Pad label="▶" onClick={() => move(1, 0, 0, 0)} />
        <Pad label="⤓" onClick={hardDrop} />
        <Pad label="⟳" onClick={() => rotate("xy")} />
        <Pad label="Hold" onClick={hold} />
        <Pad label="Y−" onClick={() => move(0, -1, 0, 0)} />
        <Pad label="Y+" onClick={() => move(0, 1, 0, 0)} />
        <Pad label="w−" onClick={() => move(0, 0, 0, -1)} />
        <Pad label="w+" onClick={() => move(0, 0, 0, 1)} />
        <Pad label="⟲w" onClick={() => rotate("xw")} />
        <Pad label="F" onClick={() => rotate("xz")} />
        <Pad label="⇆w−" onClick={() => phaseStep(-1)} />
        <Pad label="⇆w+" onClick={() => phaseStep(1)} />
        <Pad
          label="✓ Confirm Phase"
          onClick={confirm}
          wide
          accent={snap.inPhase}
        />
      </div>
    </div>
  );
}
