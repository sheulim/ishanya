import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { computeHorizon } from "@/lib/panchang/api";
import { NAKSHATRAS, RITES, isRite, type RiteId } from "@/lib/panchang/names";
import { formatClock, formatPretty, formatWhen, todayIst } from "@/lib/panchang/time";
import type { Band, DayReport } from "@/lib/panchang/types";
import { PLACES, getPlace } from "@/lib/places";
import { buildSankalpa } from "@/lib/sankalpa";

type SpanChoice = 90 | 180 | 365;

type MuhurtaSearch = {
  place: string;
  rite: RiteId;
  strict: boolean;
  span: SpanChoice;
  yajamana: number | null;
  spouse: number | null;
  day: string | null;
};

function nakIndex(value: unknown): number | null {
  const n = typeof value === "number" ? value : typeof value === "string" && value !== "" ? Number(value) : NaN;
  return Number.isInteger(n) && n >= 0 && n <= 26 ? n : null;
}

function parseSearch(search: Record<string, unknown>): MuhurtaSearch {
  const span: SpanChoice = search.span === 90 || search.span === "90" ? 90 : search.span === 365 || search.span === "365" ? 365 : 180;
  const place = typeof search.place === "string" && PLACES.some((item) => item.id === search.place) ? search.place : "hyderabad";
  return {
    place,
    rite: isRite(search.rite) ? search.rite : "vastu-shanti",
    strict: search.strict === true || search.strict === "true" || search.strict === "1" || search.strict === 1,
    span,
    yajamana: nakIndex(search.yajamana),
    spouse: nakIndex(search.spouse),
    day: typeof search.day === "string" && /^\d{4}-\d{2}-\d{2}$/.test(search.day) ? search.day : null,
  };
}

export const Route = createFileRoute("/muhurta")({
  validateSearch: (search) => parseSearch(search),
  loaderDeps: ({ search }) => ({
    place: search.place,
    rite: search.rite,
    strict: search.strict,
    span: search.span,
    yajamana: search.yajamana,
    spouse: search.spouse,
  }),
  loader: ({ deps }) => {
    const place = getPlace(deps.place);
    return computeHorizon({
      data: {
        fromKey: todayIst().key,
        spanDays: deps.span,
        lat: place.lat,
        lon: place.lon,
        place: place.name,
        rite: deps.rite,
        strict: deps.strict,
        yajamana: deps.yajamana,
        spouse: deps.spouse,
      },
    });
  },
  pendingMs: 200,
  pendingComponent: Pending,
  head: () => ({
    meta: [
      { title: "Upcoming mornings — Ishanya" },
      {
        name: "description",
        content: "Future Vastu mornings for a chosen Indian city, with sunrise and a working window in Indian Standard Time.",
      },
    ],
  }),
  component: MuhurtaPage,
});

function Pending() {
  return (
    <Shell>
      <p className="text-ink-soft">Reading sunrise and a working hour for each coming day in this city…</p>
    </Shell>
  );
}

const field = "min-h-11 w-full rounded-md border border-line bg-paper px-3 text-sm text-ink";

function MuhurtaPage() {
  const search = Route.useSearch();
  const report = Route.useLoaderData();
  const navigate = useNavigate({ from: "/muhurta" });
  const [showThin, setShowThin] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("ishanya-name") ?? "");
  }, []);

  function update(patch: Partial<MuhurtaSearch>) {
    navigate({
      to: "/muhurta",
      replace: true,
      search: (prev) => ({ ...prev, ...patch, day: patch.day === undefined ? null : patch.day }),
    });
  }

  const shown = useMemo(
    () => report.days.filter((day) => !day.passed && (day.band === "strong" || day.band === "workable" || (showThin && day.band === "thin"))),
    [report.days, showThin],
  );
  const selected = shown.find((day) => day.date === search.day) ?? shown[0] ?? null;
  const groups = useMemo(() => groupByMonth(shown), [shown]);

  return (
    <Shell>
      <p className="text-sm text-forest">Future dates</p>
      <h1 className="mt-2 font-display text-4xl text-forest">Mornings still ahead</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Choose the city where the rite will be done. Sunrise, Rahu, Gulika and the suggested start are for that
        place, in Indian Standard Time, from today forward. Past dates are not listed.
      </p>

      <form className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" onSubmit={(event) => event.preventDefault()}>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">City</span>
          <select className={field} value={search.place} onChange={(event) => update({ place: event.target.value })}>
            {PLACES.map((place) => (
              <option key={place.id} value={place.id}>
                {place.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">Rite</span>
          <select className={field} value={search.rite} onChange={(event) => update({ rite: isRite(event.target.value) ? event.target.value : "vastu-shanti" })}>
            {RITES.map((rite) => (
              <option key={rite.id} value={rite.id}>
                {rite.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">How far ahead</span>
          <select
            className={field}
            value={search.span}
            onChange={(event) => update({ span: Number(event.target.value) === 90 ? 90 : Number(event.target.value) === 365 ? 365 : 180 })}
          >
            <option value={90}>Next 3 months</option>
            <option value={180}>Next 6 months</option>
            <option value={365}>Next 12 months</option>
          </select>
        </label>
        <label className="flex min-h-11 items-center gap-2 self-end text-sm">
          <input
            type="checkbox"
            className="size-4"
            checked={search.strict}
            onChange={(event) => update({ strict: event.target.checked })}
          />
          Strict filtering
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">Yajamana birth star</span>
          <select className={field} value={search.yajamana ?? ""} onChange={(event) => update({ yajamana: nakIndex(event.target.value) })}>
            <option value="">Not used</option>
            {NAKSHATRAS.map((star, index) => (
              <option key={star} value={index}>
                {star}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">Spouse birth star</span>
          <select className={field} value={search.spouse ?? ""} onChange={(event) => update({ spouse: nakIndex(event.target.value) })}>
            <option value="">Not used</option>
            {NAKSHATRAS.map((star, index) => (
              <option key={star} value={index}>
                {star}
              </option>
            ))}
          </select>
        </label>
      </form>

      <p className="mt-4 text-sm text-ink-soft">
        {report.place} · {report.lat.toFixed(2)}°N, {report.lon.toFixed(2)}°E · {report.riteLabel}
        {" · "}
        {report.counts.strong} strong, {report.counts.workable} workable, {report.counts.thin} thin
        {" · "}
        {formatPretty(report.from)} to {formatPretty(report.until)}
      </p>
      <p className="mt-1 text-sm text-muted">{RITES.find((rite) => rite.id === search.rite)?.hint}</p>

      <label className="mt-3 flex min-h-11 items-center gap-2 text-sm">
        <input type="checkbox" className="size-4" checked={showThin} onChange={(event) => setShowThin(event.target.checked)} />
        Also show thin days
      </label>

      {shown.length === 0 ? (
        <p className="mt-6 text-ink-soft">
          No open morning in this window under these rules. Try a longer span, another city, or turn strict filtering off.
        </p>
      ) : (
        <div className="mt-6 flex flex-col-reverse gap-8 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            {groups.map((group) => (
              <section key={group.key} className="mb-8">
                <h2 className="font-display text-2xl text-forest">{group.label}</h2>
                <ul className="mt-3 divide-y divide-line border-y border-line">
                  {group.days.map((day) => (
                    <li key={day.date}>
                      <button
                        type="button"
                        onClick={() => update({ day: day.date })}
                        className={
                          selected?.date === day.date
                            ? "flex w-full min-h-11 flex-col items-start gap-1 bg-forest px-3 py-3 text-left text-paper sm:flex-row sm:items-baseline sm:justify-between"
                            : "flex w-full min-h-11 flex-col items-start gap-1 px-3 py-3 text-left sm:flex-row sm:items-baseline sm:justify-between"
                        }
                      >
                        <span>
                          <span className="block font-medium">{formatPretty(day.date)}</span>
                          <span className={selected?.date === day.date ? "block text-sm text-paper" : "block text-sm text-ink-soft"}>
                            {day.tithiName} · {day.nakshatra} pada {day.pada} · {day.yoga}
                          </span>
                        </span>
                        <span className="text-sm">
                          <BandMark band={day.band} selected={selected?.date === day.date} />
                          {day.suggestion
                            ? ` ${formatClock(day.suggestion.start)} – ${formatWhen(day.suggestion.end, day.date)} IST · ${day.suggestion.label}`
                            : " No clear window"}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          {selected ? <DayPanel day={selected} rite={search.rite} name={name} setName={setName} /> : null}
        </div>
      )}

      <details className="mt-8 max-w-2xl">
        <summary className="min-h-11 text-sm text-forest">Rules used for this list</summary>
        <ul className="mt-2 list-disc pl-5 text-sm text-ink-soft">
          {report.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </details>
    </Shell>
  );
}

function BandMark({ band, selected }: { band: Band; selected: boolean }) {
  const label = band === "strong" ? "Strong" : band === "workable" ? "Workable" : "Thin";
  return <span className={selected ? "text-paper" : "text-forest"}>{label}</span>;
}

function DayPanel({
  day,
  rite,
  name,
  setName,
}: {
  day: DayReport;
  rite: RiteId;
  name: string;
  setName: (value: string) => void;
}) {
  const vow = buildSankalpa(day, rite, name);
  return (
    <aside className="w-full rounded-md border border-line bg-paper-deep p-4 lg:sticky lg:top-4 lg:w-80">
      <p className="text-sm text-muted">{day.vara}</p>
      <h2 className="font-display text-2xl text-forest">{formatPretty(day.date)}</h2>
      {day.suggestion ? (
        <p className="mt-3 rounded-md bg-forest px-3 py-3 text-sm text-paper">
          Begin between {formatClock(day.suggestion.start)} and {formatWhen(day.suggestion.end, day.date)}. {day.suggestion.label}. {day.suggestion.note}
        </p>
      ) : (
        <p className="mt-3 text-sm text-ink-soft">No clear daytime window.</p>
      )}
      <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
        <Fact label="Sunrise" value={formatClock(day.sunrise)} />
        <Fact label="Sunset" value={formatClock(day.sunset)} />
        <Fact label="Tithi" value={`${day.tithiName}${day.tithiEnd ? `, until ${formatWhen(day.tithiEnd, day.date)}` : ""}`} />
        <Fact label="At sunrise" value={day.sunriseTithiName} />
        <Fact label="Nakshatra" value={`${day.nakshatra}, pada ${day.pada}${day.nakshatraEnd ? `, until ${formatWhen(day.nakshatraEnd, day.date)}` : ""}`} />
        <Fact label="Yoga" value={day.yoga} />
        <Fact label="Karana" value={day.karana} />
        <Fact label="Month" value={`${day.masa}${day.adhika ? " (adhika)" : ""}`} />
        <Fact label="Year" value={day.samvatsara} />
        <Fact label="Ayana" value={day.ayana} />
        <Fact label="Rahu" value={`${formatClock(day.rahu.start)} – ${formatWhen(day.rahu.end, day.date)}`} />
        <Fact label="Yamaganda" value={`${formatClock(day.yama.start)} – ${formatWhen(day.yama.end, day.date)}`} />
        <Fact label="Gulika" value={`${formatClock(day.gulika.start)} – ${formatWhen(day.gulika.end, day.date)}`} />
        <Fact label="Abhijit" value={`${formatClock(day.abhijit.start)} – ${formatWhen(day.abhijit.end, day.date)}`} />
        <Fact label="Moon" value={day.rashi} />
        <Fact label="Sun" value={day.sunRashi} />
      </dl>
      {day.because.length > 0 ? (
        <ul className="mt-4 list-disc pl-4 text-sm text-ink-soft">
          {day.because.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : null}
      {day.cautions.length > 0 ? (
        <ul className="mt-3 list-disc pl-4 text-sm text-copper">
          {day.cautions.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : null}
      {day.blocks.length > 0 ? (
        <ul className="mt-3 list-disc pl-4 text-sm text-ink">
          {day.blocks.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : null}
      <h3 className="mt-4 font-display text-lg">Daytime parts</h3>
      <ul className="mt-2 grid grid-cols-2 gap-2 text-xs">
        {day.choghadiya.map((part) => (
          <li key={part.start} className="rounded-md border border-line px-2 py-1">
            <span className="block font-medium">{part.label}</span>
            <span className="text-muted">
              {formatClock(part.start)} – {formatWhen(part.end, day.date)}
            </span>
          </li>
        ))}
      </ul>
      <label className="mt-4 block text-sm">
        <span className="mb-1 block text-muted">Name in the vow</span>
        <input
          className={field}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            localStorage.setItem("ishanya-name", event.target.value);
          }}
        />
      </label>
      <p className="mt-3 text-sm">{vow.sa}</p>
      <p className="mt-2 text-sm text-ink-soft">{vow.en}</p>
      <p className="mt-3 text-xs text-muted">Lahiri {day.ayanamsha}. {day.taraNote ?? "Tara is not applied until a birth star is chosen."}</p>
    </aside>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="col-span-2 sm:col-span-1">
      <dt className="text-muted">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function groupByMonth(days: DayReport[]) {
  const groups: { key: string; label: string; days: DayReport[] }[] = [];
  for (const day of days) {
    const key = day.date.slice(0, 7);
    const last = groups[groups.length - 1];
    if (!last || last.key !== key) {
      groups.push({ key, label: formatPretty(day.date).replace(/^\w+,\s*/, "").replace(/^\d+\s/, ""), days: [day] });
    } else last.days.push(day);
  }
  return groups;
}
