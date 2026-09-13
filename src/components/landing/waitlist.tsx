import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EDITIONS = ["Early Access", "Standard", "Collector's", "Patron"] as const;
const STORE_KEY = "nestris-delta-waitlist";

export function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [edition, setEdition] = useState<(typeof EDITIONS)[number]>("Standard");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.includes("@") || email.length < 5) {
      setError("Enter a valid email so we can phase you in.");
      return;
    }
    try {
      const existing = JSON.parse(localStorage.getItem(STORE_KEY) ?? "[]") as unknown[];
      existing.push({ name, email, edition, at: Date.now() });
      localStorage.setItem(STORE_KEY, JSON.stringify(existing));
    } catch {
      /* still confirm */
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-xl border border-accent/30 bg-accent/10 px-6 py-8 text-center">
        <div className="font-display text-2xl text-fg">You’re on the axis</div>
        <p className="mt-2 text-sm text-muted">
          {edition} reserved for {email}. We’ll open the gate in waves with the v0.2 census.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <label className="flex flex-col gap-1.5">
        <span className="text-[10px] tracking-[0.22em] uppercase text-subtle">Name (optional)</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-11 rounded-md border border-border bg-surface-2 px-3 text-sm text-fg outline-none transition-colors placeholder:text-subtle focus:border-accent/50 focus:ring-2 focus:ring-accent/30"
          placeholder="Callsign"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-[10px] tracking-[0.22em] uppercase text-subtle">Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 rounded-md border border-border bg-surface-2 px-3 text-sm text-fg outline-none transition-colors placeholder:text-subtle focus:border-accent/50 focus:ring-2 focus:ring-accent/30"
          placeholder="you@brane.local"
        />
      </label>
      <fieldset>
        <legend className="mb-2 text-[10px] tracking-[0.22em] uppercase text-subtle">Edition</legend>
        <div className="grid grid-cols-2 gap-2">
          {EDITIONS.map((ed) => (
            <button
              key={ed}
              type="button"
              onClick={() => setEdition(ed)}
              className={cn(
                "h-11 rounded-md border text-sm transition-colors",
                edition === ed
                  ? "border-accent/50 bg-accent/15 text-accent"
                  : "border-border bg-surface-2 text-muted hover:text-fg",
              )}
            >
              {ed}
            </button>
          ))}
        </div>
      </fieldset>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" className="h-12 w-full">
        Reserve my spot
      </Button>
    </form>
  );
}
