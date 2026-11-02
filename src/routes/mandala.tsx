import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { outerClockwise, padas, type Pada, type Zone } from "@/lib/mandala";

export const Route = createFileRoute("/mandala")({
  head: () => ({
    meta: [
      { title: "Eighty-one squares — Ishanya" },
      {
        name: "description",
        content:
          "The Paramasayika Vastu mandala of eighty-one padas, with zone, direction, limb, and a house note for each square.",
      },
    ],
  }),
  component: MandalaPage,
});

const zoneLabel: Record<Zone, string> = {
  outer: "Outer guardian",
  inner: "Inner lord",
  brahma: "Brahma",
};

function cellClass(zone: Zone, pressed: boolean): string {
  const base =
    "min-h-11 w-full min-w-0 break-words rounded-md border px-1 py-1 text-center text-xs leading-tight";
  if (pressed) return `${base} border-forest bg-forest text-paper`;
  if (zone === "brahma") return `${base} border-forest bg-copper-soft text-ink`;
  if (zone === "inner") return `${base} border-line bg-forest-soft text-ink`;
  return `${base} border-line bg-paper text-ink`;
}

function MandalaPage() {
  const [cell, setCell] = useState({ row: 0, col: 8 });
  const selected: Pada =
    padas.find((pada) => pada.row === cell.row && pada.col === cell.col) ?? padas[8];

  return (
    <Shell>
      <h1 className="font-display text-3xl text-ink">Eighty-one squares</h1>
      <p className="mt-3 max-w-3xl text-base text-ink-soft">
        One classical allotment after the Matsya Purana / Brihat Samhita family. North is up.
        Regional paddhatis move a border square; the priest who sits the fire is the authority. Head
        of Vastu Purusha lies to the northeast, feet to the southwest.
      </p>

      <div className="mt-6 lg:flex lg:items-start lg:gap-6">
        <div className="min-w-0 flex-1">
          <div className="overflow-x-auto">
            <div className="flex items-center gap-2">
              <p className="shrink-0 text-xs text-muted">West</p>
              <div className="min-w-0 flex-1">
                <p className="mb-2 text-center text-xs text-muted">North</p>
                <div
                  className="grid w-full min-w-lg grid-cols-9 gap-1"
                  role="group"
                  aria-label="Paramasayika mandala, north at the top"
                >
                  {padas.map((pada) => {
                    const pressed = pada.row === selected.row && pada.col === selected.col;
                    return (
                      <button
                        key={`${pada.row}-${pada.col}`}
                        type="button"
                        aria-pressed={pressed}
                        aria-label={`${pada.name}, row ${pada.row + 1}, column ${pada.col + 1}`}
                        className={cellClass(pada.zone, pressed)}
                        onClick={() => setCell({ row: pada.row, col: pada.col })}
                      >
                        {pada.name}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-center text-xs text-muted">South</p>
              </div>
              <p className="shrink-0 text-xs text-muted">East</p>
            </div>
          </div>

          <ul className="mt-4 flex flex-wrap gap-4 text-sm text-ink">
            <li className="flex items-center gap-2">
              <span className="inline-block size-4 rounded-md border border-line bg-paper" />
              Outer guardian
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block size-4 rounded-md border border-line bg-forest-soft" />
              Inner lord
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block size-4 rounded-md border border-forest bg-copper-soft" />
              Brahma
            </li>
          </ul>
        </div>

        <aside className="mt-6 border border-line bg-paper-deep p-4 lg:mt-0 lg:w-80 lg:shrink-0">
          <p className="font-display text-3xl text-ink">{selected.sa}</p>
          <h2 className="mt-1 text-xl text-ink">{selected.name}</h2>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-muted">Zone</dt>
              <dd className="text-ink">{zoneLabel[selected.zone]}</dd>
            </div>
            <div>
              <dt className="text-muted">Direction</dt>
              <dd className="text-ink">{selected.direction}</dd>
            </div>
            <div>
              <dt className="text-muted">Seats</dt>
              <dd className="text-ink">{selected.seats}</dd>
            </div>
            {selected.limb ? (
              <div>
                <dt className="text-muted">Limb</dt>
                <dd className="text-ink">{selected.limb}</dd>
              </div>
            ) : null}
          </dl>
          <p className="mt-4 text-sm text-ink">{selected.note}</p>
          <p className="mt-4 text-base text-ink">Om {selected.name} namah</p>
          <p className="mt-1 text-sm text-muted">One akshata, and a petal if you have flowers.</p>
        </aside>
      </div>

      <section className="mt-8">
        <p className="max-w-3xl text-sm text-ink-soft">
          Worship from Shikhi clockwise around the outer 32, then the corner lords, then the four
          direction lords, then Brahma as one seat.
        </p>
        <ol className="mt-3 flex flex-wrap gap-2">
          {outerClockwise.map((name, index) => (
            <li key={name} className="rounded-md border border-line px-2 py-1 text-xs text-ink">
              {index + 1}. {name}
            </li>
          ))}
        </ol>
      </section>
    </Shell>
  );
}
