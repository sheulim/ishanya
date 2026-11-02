import { buildHorizon } from "./engine";

const t0 = Date.now();
const report = buildHorizon({
  fromKey: "2026-11-02",
  spanDays: 90,
  lat: 17.385,
  lon: 78.4867,
  place: "Hyderabad",
  rite: "vastu-shanti",
  strict: false,
  yajamana: null,
  spouse: null,
});
const nov9 = report.calendar.find((day) => day.date === "2026-11-09");
const full9 = report.days.find((day) => day.date === "2026-11-09");
console.log(
  JSON.stringify(
    {
      ms: Date.now() - t0,
      counts: report.counts,
      from: report.from,
      until: report.until,
      nov9band: nov9?.band,
      nov9: full9
        ? {
            tithi: full9.tithiName,
            sunriseTithi: full9.sunriseTithiName,
            tithiEnd: full9.tithiEnd,
            nak: full9.nakshatra,
            masa: full9.masa,
            year: full9.samvatsara,
            sunrise: full9.sunrise,
            suggestion: full9.suggestion,
            band: full9.band,
            ayan: full9.ayanamsha,
          }
        : null,
      strong: report.days.filter((day) => day.band === "strong").slice(0, 8).map((day) => ({
        date: day.date,
        tithi: day.tithiName,
        nak: day.nakshatra,
        vara: day.vara,
        start: day.suggestion?.label,
      })),
    },
    null,
    2,
  ),
);
