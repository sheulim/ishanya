import { createServerFn } from "@tanstack/react-start";
import { isRite } from "./names";
import type { HorizonInput, HorizonReport } from "./types";

const cache = new Map<string, HorizonReport>();

function clean(input: HorizonInput): HorizonInput {
  const span = input.spanDays === 90 || input.spanDays === 365 ? input.spanDays : 180;
  const nak = (value: number | null) =>
    typeof value === "number" && value >= 0 && value <= 26 ? Math.floor(value) : null;
  return {
    fromKey: typeof input.fromKey === "string" ? input.fromKey : "1970-01-01",
    spanDays: span,
    lat: Math.min(37, Math.max(6, Number(input.lat))),
    lon: Math.min(98, Math.max(68, Number(input.lon))),
    place: String(input.place || "Hyderabad").slice(0, 80),
    rite: isRite(input.rite) ? input.rite : "vastu-shanti",
    strict: Boolean(input.strict),
    yajamana: nak(input.yajamana),
    spouse: nak(input.spouse),
  };
}

export const computeHorizon = createServerFn({ method: "POST" })
  .validator((input: HorizonInput) => clean(input))
  .handler(async ({ data }) => {
    const key = JSON.stringify(data);
    const hit = cache.get(key);
    if (hit) return hit;
    const { buildHorizon } = await import("./engine");
    const report = buildHorizon(data);
    cache.set(key, report);
    if (cache.size > 8) {
      const first = cache.keys().next().value;
      if (first) cache.delete(first);
    }
    return report;
  });
