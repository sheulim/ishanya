import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { groups } from "@/lib/samagri";

const STORAGE_KEY = "ishanya-samagri";

export const Route = createFileRoute("/samagri")({
  head: () => ({
    meta: [
      { title: "What to gather — Ishanya" },
      {
        name: "description",
        content:
          "A household list for one Vastu Shanti fire: cloth, mandala powders, two kalasas, homa, bali, and gifts.",
      },
    ],
  }),
  component: SamagriPage,
});

function readTicks(value: unknown): Record<string, boolean> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const ticks: Record<string, boolean> = {};
  for (const [id, checked] of Object.entries(value)) {
    if (typeof checked === "boolean") ticks[id] = checked;
  }
  return ticks;
}

function SamagriPage() {
  const [ticks, setTicks] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let next: Record<string, boolean> = {};
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) next = readTicks(JSON.parse(raw) as unknown);
    } catch {
      next = {};
    }
    setTicks(next);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ticks));
  }, [ready, ticks]);

  const total = groups.reduce((sum, group) => sum + group.items.length, 0);
  const done = groups.reduce(
    (sum, group) => sum + group.items.filter((item) => ticks[item.id]).length,
    0,
  );

  function toggle(id: string) {
    setTicks((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function clearTicks() {
    setTicks({});
  }

  return (
    <Shell>
      <h1 className="font-display text-3xl text-ink">What to gather</h1>
      <p className="mt-3 text-base text-ink-soft">
        Quantities are for one house fire. The priest may scale them if several brāhmaṇas are fed.
      </p>
      <p className="mt-4 text-sm text-ink">
        {done} of {total} set aside
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          className="no-print min-h-11 rounded-md border border-line bg-paper px-4 text-ink"
          onClick={clearTicks}
        >
          Clear ticks
        </button>
        <button
          type="button"
          className="no-print min-h-11 rounded-md border border-forest bg-forest px-4 text-paper"
          onClick={() => window.print()}
        >
          Print the list
        </button>
      </div>

      {groups.map((group) => (
        <section key={group.id} className="mt-8">
          <h2 className="font-display text-2xl text-ink">{group.title}</h2>
          <p className="mt-2 text-sm text-ink-soft">{group.lede}</p>
          <ul className="mt-4">
            {group.items.map((item) => (
              <li key={item.id} className="border-b border-line">
                <label className="flex min-h-11 items-start gap-3 py-3">
                  <input
                    type="checkbox"
                    className="mt-1 size-5 shrink-0"
                    checked={ticks[item.id] === true}
                    onChange={() => toggle(item.id)}
                  />
                  <span className="min-w-0">
                    <span className="block font-medium text-ink">{item.name}</span>
                    <span className="block text-ink-soft">{item.qty}</span>
                    <span className="mt-1 block text-sm text-muted">{item.note}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Shell>
  );
}
