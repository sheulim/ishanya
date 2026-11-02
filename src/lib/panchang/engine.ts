import * as Astronomy from "astronomy-engine";
import {
  AVOID_NAK,
  BAD_YOGA,
  GOOD_YOGA,
  MASAS,
  NAKSHATRAS,
  PREFERRED_NAK,
  RASIS,
  RITES,
  RITUS,
  SAMVATSARA,
  SOFT_NAK,
  VARAS,
  WEEKDAYS,
  YOGAS,
  tithiName,
  type RiteId,
} from "./names";
import type { Band, CalendarCell, DayReport, HorizonInput, HorizonReport, Span } from "./types";
import { istKey, istMidnight, todayIst } from "./time";

const IST_MS = (5 * 60 + 30) * 60 * 1000;
const NAK_SPAN = 360 / 27;

const CHOG = ["Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubh", "Rog"] as const;
const CHOG_START = [0, 3, 6, 2, 5, 1, 4];
const RAHU_PART = [8, 2, 7, 5, 6, 4, 3];
const YAMA_PART = [5, 4, 3, 2, 1, 7, 6];
const GULIKA_PART = [7, 6, 5, 4, 3, 2, 1];
const MOVABLE = ["Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti"];
const TARA = ["Janma", "Sampat", "Vipat", "Kshema", "Pratyari", "Sadhaka", "Vadha", "Mitra", "Ati Mitra"];
const TARA_GOOD = new Set([2, 4, 6, 8, 9]);
const ENTRY = new Set<RiteId>(["griha-pravesh", "shilanyas", "shop"]);

function norm(deg: number): number {
  const x = deg % 360;
  return x < 0 ? x + 360 : x;
}

function julianDay(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

function lahiri(date: Date): number {
  const t = (julianDay(date) - 2451545) / 36525;
  const arcsec = 5028.796195 * t + 1.1054348 * t * t + 0.00007964 * t * t * t;
  return 23 + 51 / 60 + 25.53 / 3600 + arcsec / 3600;
}

function sunTrop(date: Date): number {
  return norm(Astronomy.SunPosition(date).elon);
}

function moonTrop(date: Date): number {
  return norm(Astronomy.EclipticGeoMoon(date).lon);
}

function elongation(date: Date): number {
  return norm(moonTrop(date) - sunTrop(date));
}

function sunSid(date: Date): number {
  return norm(sunTrop(date) - lahiri(date));
}

function moonSid(date: Date): number {
  return norm(moonTrop(date) - lahiri(date));
}

function yogaLon(date: Date): number {
  return norm(sunSid(date) + moonSid(date));
}

function istWeekday(date: Date): number {
  return new Date(date.getTime() + IST_MS).getUTCDay();
}

function formatAyan(deg: number): string {
  const d = Math.floor(deg);
  const mf = (deg - d) * 60;
  let m = Math.floor(mf);
  let s = Math.round((mf - m) * 60);
  if (s === 60) {
    s = 0;
    m += 1;
  }
  return `${d}°${String(m).padStart(2, "0")}′${String(s).padStart(2, "0")}″`;
}

function nextCrossing(start: Date, measure: (d: Date) => number, target: number, maxDays: number): Date | null {
  let origin = start.getTime();
  let base = measure(new Date(origin));
  let need = norm(target - base);
  if (need < 0.001) {
    origin += 5 * 60 * 1000;
    base = measure(new Date(origin));
    need = norm(target - base);
  }
  const later = measure(new Date(origin + 6 * 3600 * 1000));
  let speed = norm(later - base) / 6;
  if (speed < 0.02 || speed > 30) speed = 0.5;
  let hi = origin + Math.min(maxDays * 24, need / speed + 6) * 3600 * 1000;
  let guard = 0;
  while (guard < 8 && norm(measure(new Date(hi)) - base) + 1e-6 < need) {
    hi += 12 * 3600 * 1000;
    guard += 1;
  }
  let lo = origin;
  for (let k = 0; k < 20; k += 1) {
    const mid = (lo + hi) / 2;
    const prog = norm(measure(new Date(mid)) - base);
    if (prog < need) lo = mid;
    else hi = mid;
  }
  if (hi - origin > maxDays * 86400000 + 86400000) return null;
  return new Date(hi);
}

function karanaName(index: number): string {
  const k = ((index % 60) + 60) % 60;
  if (k === 0) return "Kimstughna";
  if (k === 57) return "Shakuni";
  if (k === 58) return "Chatushpada";
  if (k === 59) return "Naga";
  return MOVABLE[(k - 1) % 7];
}

function toneOf(label: string): Span["tone"] {
  if (label === "Amrit" || label === "Shubh" || label === "Labh") return "strong";
  if (label === "Char") return "neutral";
  return "avoid";
}

interface LMonth {
  start: Date;
  end: Date;
  nameIndex: number;
  adhika: boolean;
  kshaya: boolean;
}

function amavasyaSequence(from: Date, until: Date): Date[] {
  const out: Date[] = [];
  let cursor = new Date(from.getTime() - 2 * 86400000);
  while (out.length < 24) {
    const next = nextCrossing(cursor, elongation, 0, 36);
    if (!next) break;
    out.push(next);
    if (next.getTime() > until.getTime() + 40 * 86400000) break;
    cursor = new Date(next.getTime() + 2 * 86400000);
  }
  return out;
}

function sankrantisBetween(a: Date, b: Date): number[] {
  const signs: number[] = [];
  let cursor = new Date(a.getTime() + 60 * 1000);
  for (let i = 0; i < 3; i += 1) {
    const lon = sunSid(cursor);
    const nextSign = (Math.floor(lon / 30) + 1) % 12;
    const at = nextCrossing(cursor, sunSid, nextSign * 30, 34);
    if (!at || at.getTime() >= b.getTime()) break;
    if (at.getTime() >= a.getTime()) signs.push(nextSign);
    cursor = new Date(at.getTime() + 2 * 86400000);
  }
  return signs;
}

function lunarMonths(from: Date, until: Date): LMonth[] {
  const knots = amavasyaSequence(new Date(from.getTime() - 40 * 86400000), until);
  const raw: { start: Date; end: Date; signs: number[] }[] = [];
  for (let i = 0; i < knots.length - 1; i += 1) {
    raw.push({ start: knots[i], end: knots[i + 1], signs: sankrantisBetween(knots[i], knots[i + 1]) });
  }
  return raw.map((row, index) => {
    const adhika = row.signs.length === 0;
    const kshaya = row.signs.length > 1;
    let sign = row.signs[0];
    if (adhika) {
      const nxt = raw.slice(index + 1).find((item) => item.signs.length > 0);
      sign = nxt ? nxt.signs[0] : 0;
    }
    const nameIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][sign ?? 0];
    return { start: row.start, end: row.end, nameIndex, adhika, kshaya };
  });
}

const chaitraCache = new Map<number, Date>();

function chaitraStart(year: number): Date | null {
  const cached = chaitraCache.get(year);
  if (cached) return cached;
  const from = istMidnight(year, 2, 1);
  const until = istMidnight(year, 5, 20);
  const knots = amavasyaSequence(from, until);
  for (let i = 0; i < knots.length - 1; i += 1) {
    const signs = sankrantisBetween(knots[i], knots[i + 1]);
    if (signs.includes(0)) {
      chaitraCache.set(year, knots[i]);
      return knots[i];
    }
  }
  return null;
}

function samvatsaraAt(moment: Date): string {
  const year = Number(istKey(moment).slice(0, 4));
  const thisYear = chaitraStart(year);
  const use = thisYear && moment.getTime() >= thisYear.getTime() ? year : year - 1;
  if (!chaitraStart(use) && thisYear) {
    /* fall through to the year we could resolve */
  }
  const idx = (((use - 7) % 60) + 60) % 60;
  return SAMVATSARA[idx] ?? "\u2014";
}

function monthAt(months: LMonth[], moment: Date): LMonth | null {
  return months.find((month) => moment >= month.start && moment < month.end) ?? null;
}

function planetSep(body: Astronomy.Body, date: Date): number {
  const vec = Astronomy.GeoVector(body, date, true);
  const lon = norm(Astronomy.Ecliptic(vec).elon);
  const gap = Math.abs(norm(lon - sunTrop(date)));
  return gap > 180 ? 360 - gap : gap;
}

interface EclipseHit {
  key: string;
  label: string;
  hard: boolean;
}

function eclipsesBetween(start: Date, end: Date): EclipseHit[] {
  const out: EclipseHit[] = [];
  const push = (when: Date, label: string, hard: boolean) => {
    if (when >= start && when <= end) out.push({ key: istKey(when), label, hard });
  };
  try {
    let cursor = new Date(start.getTime() - 40 * 86400000);
    for (let i = 0; i < 8; i += 1) {
      const lunar = Astronomy.SearchLunarEclipse(cursor);
      const when = lunar.peak.date;
      if (when.getTime() > end.getTime() + 86400000) break;
      push(when, `Lunar eclipse (${lunar.kind})`, String(lunar.kind) !== "penumbral");
      cursor = new Date(when.getTime() + 20 * 86400000);
    }
  } catch {
    /* ephemeris has no eclipse in range */
  }
  try {
    let cursor = new Date(start.getTime() - 40 * 86400000);
    for (let i = 0; i < 6; i += 1) {
      const solar = Astronomy.SearchGlobalSolarEclipse(cursor);
      const when = solar.peak.date;
      if (when.getTime() > end.getTime() + 86400000) break;
      push(when, `Solar eclipse (${solar.kind})`, true);
      cursor = new Date(when.getTime() + 30 * 86400000);
    }
  } catch {
    /* ignore */
  }
  return out;
}

function partSpan(sunrise: Date, sunset: Date, part: number): { start: number; end: number } {
  const len = (sunset.getTime() - sunrise.getTime()) / 8;
  const start = sunrise.getTime() + (part - 1) * len;
  return { start, end: start + len };
}

function toSpan(label: string, start: number, end: number, tone: Span["tone"]): Span {
  return { label, start: new Date(start).toISOString(), end: new Date(end).toISOString(), tone };
}

function clearPieces(start: number, end: number, blocks: Array<[number, number]>): Array<[number, number]> {
  let parts: Array<[number, number]> = [[start, end]];
  for (const [b0, b1] of blocks) {
    const next: Array<[number, number]> = [];
    for (const [p0, p1] of parts) {
      if (b1 <= p0 || b0 >= p1) {
        next.push([p0, p1]);
        continue;
      }
      if (b0 > p0) next.push([p0, Math.min(b0, p1)]);
      if (b1 < p1) next.push([Math.max(b1, p0), p1]);
    }
    parts = next.filter(([a, b]) => b - a >= 20 * 60 * 1000);
  }
  return parts;
}

function isPanchaka(nak: number, pada: number): boolean {
  if (nak === 22) return pada >= 3;
  return nak >= 23 && nak <= 26;
}

function taraLine(from: number | null, dayNak: number, who: string): { text: string; bad: boolean } | null {
  if (from == null) return null;
  const count = ((dayNak - from + 27) % 27) + 1;
  const t = ((count - 1) % 9) + 1;
  const good = TARA_GOOD.has(t);
  return {
    text: `${who}: ${TARA[t - 1]} tara from ${NAKSHATRAS[from]} to ${NAKSHATRAS[dayNak]}${good ? "" : " \u2014 usually set aside"}.`,
    bad: !good,
  };
}

function addDays(key: string, n: number): string {
  const [y, m, d] = key.split("-").map(Number);
  return istKey(new Date(istMidnight(y, m, d).getTime() + n * 86400000 + 12 * 3600 * 1000));
}

function riteMeta(id: RiteId) {
  return RITES.find((rite) => rite.id === id) ?? RITES[0];
}

export function buildHorizon(input: HorizonInput): HorizonReport {
  const today = todayIst().key;
  const fromKey = input.fromKey < today ? today : input.fromKey;
  const span = input.spanDays === 90 || input.spanDays === 365 ? input.spanDays : 180;
  const [fy, fm, fd] = fromKey.split("-").map(Number);
  const startDate = istMidnight(fy, fm, fd);
  const endKey = addDays(fromKey, span - 1);
  const [ey, em, ed] = endKey.split("-").map(Number);
  const endDate = new Date(istMidnight(ey, em, ed).getTime() + 36 * 3600 * 1000);
  const observer = new Astronomy.Observer(input.lat, input.lon, 0);
  const months = lunarMonths(startDate, endDate);
  const eclipse = eclipsesBetween(startDate, endDate);
  const now = Date.now();
  const days: DayReport[] = [];
  const calendar: CalendarCell[] = [];
  const counts = { strong: 0, workable: 0, thin: 0, avoid: 0 };

  for (let i = 0; i < span; i += 1) {
    const date = addDays(fromKey, i);
    const [y, m, d] = date.split("-").map(Number);
    const midnight = istMidnight(y, m, d);
    const riseHit = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, midnight, 2);
    const sunrise = riseHit?.date;
    if (!sunrise) continue;
    const setHit = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, sunrise, 2);
    const sunset = setHit?.date;
    if (!sunset) continue;
    const report = buildDay({
      date,
      sunrise,
      sunset,
      months,
      eclipse: eclipse.filter((item) => item.key === date),
      input,
      now,
    });
    counts[report.band] += 1;
    calendar.push({ date, band: report.band, weekday: report.weekday });
    if (report.band !== "avoid") days.push(report);
  }

  const meta = riteMeta(input.rite);
  return {
    place: input.place,
    lat: input.lat,
    lon: input.lon,
    rite: input.rite,
    riteLabel: meta.label,
    strict: input.strict,
    from: fromKey,
    until: endKey,
    spanDays: span,
    rules: rulesFor(input.rite, input.strict, input.yajamana != null || input.spouse != null),
    days,
    calendar,
    counts,
  };
}

function rulesFor(rite: RiteId, strict: boolean, tara: boolean): string[] {
  return [
    "Only today and later dates are kept. Sunrise, sunset and the eight day-parts are for the chosen city.",
    "The working tithi is the one current at the suggested start, not merely the tithi at dawn. Both are shown when they differ.",
    "Amanta months: a lunar month with no solar sankranti is adhika, and these rites wait.",
    "Lahiri ayanamsha. Nakshatra and yoga are sidereal. Tithi is the Moon's elongation from the Sun.",
    "Hard bars: Amavasya, rikta tithi (4, 9, 14) at the working hour, Vishti over every clear window, a hard eclipse, adhika masa.",
    rite === "well"
      ? "Tuesday is refused for breaking ground for water."
      : "Tuesday and Saturday lower the day. Strict mode refuses them.",
    ENTRY.has(rite)
      ? "Krishna paksha cannot rank as strong for entry, foundation or a shop. Strict mode refuses it."
      : "Krishna paksha is allowed for this rite, with a lower score. Strict mode still refuses it.",
    strict
      ? "Strict mode also refuses avoided nakshatras, panchaka, and a bad janma tara."
      : "Householder mode keeps avoided nakshatras, panchaka and a weak tara visible as cautions, capped below a strong morning.",
    tara
      ? "Tara is counted inclusively from the birth star you entered to the day's star. Vadha, Vipat, Pratyari and Janma are the weak four."
      : "No birth star is set, so tara bala is not applied. The priest still should.",
  ];
}

function buildDay(args: {
  date: string;
  sunrise: Date;
  sunset: Date;
  months: LMonth[];
  eclipse: EclipseHit[];
  input: HorizonInput;
  now: number;
}): DayReport {
  const { date, sunrise, sunset, months, eclipse, input, now } = args;
  const weekday = istWeekday(sunrise);
  const dayLen = sunset.getTime() - sunrise.getTime();
  const ab0 = sunrise.getTime() + (7 * dayLen) / 15;
  const ab1 = sunrise.getTime() + (8 * dayLen) / 15;
  const choghadiya: Span[] = [];
  const slice = dayLen / 8;
  for (let i = 0; i < 8; i += 1) {
    const label = CHOG[(CHOG_START[weekday] + i) % 7];
    const start = sunrise.getTime() + i * slice;
    choghadiya.push(toSpan(label, start, start + slice, toneOf(label)));
  }
  const rahuN = partSpan(sunrise, sunset, RAHU_PART[weekday]);
  const yamaN = partSpan(sunrise, sunset, YAMA_PART[weekday]);
  const gulikaN = partSpan(sunrise, sunset, GULIKA_PART[weekday]);
  const vishti = vishtiSpans(sunrise, sunset);
  const blocks: Array<[number, number]> = [
    [rahuN.start, rahuN.end],
    [yamaN.start, yamaN.end],
    [gulikaN.start, gulikaN.end],
    ...vishti.map((span) => [Date.parse(span.start), Date.parse(span.end)] as [number, number]),
  ];
  const options = listSuggestions(weekday, choghadiya, ab0, ab1, blocks);
  let suggestion = options[0] ?? null;
  let work = facts(suggestion ? new Date(Date.parse(suggestion.start) + 60 * 1000) : new Date((ab0 + ab1) / 2), months, false);
  for (const option of options) {
    const trial = facts(new Date(Date.parse(option.start) + 60 * 1000), months, false);
    if (!tithiBars(trial.tithiIndex)) {
      suggestion = option;
      work = trial;
      break;
    }
  }
  if (suggestion) work = facts(new Date(Date.parse(suggestion.start) + 60 * 1000), months, true);
  const dawn = facts(sunrise, months, false);
  const hardEclipse = eclipse.find((item) => item.hard);
  const softEclipse = eclipse.find((item) => !item.hard);
  const taras = [
    taraLine(input.yajamana, work.nakshatraIndex, "Yajamana"),
    taraLine(input.spouse, work.nakshatraIndex, "Spouse"),
  ].filter((item): item is { text: string; bad: boolean } => item != null);
  const badTara = taras.some((item) => item.bad);
  const scored = scoreDay({
    rite: input.rite,
    strict: input.strict,
    work,
    dawn,
    suggestion,
    weekday,
    hardEclipse: hardEclipse?.label ?? null,
    softEclipse: softEclipse?.label ?? null,
    badTara,
    date,
    now,
  });
  const passed = suggestion ? Date.parse(suggestion.end) < now : sunrise.getTime() < now && sunset.getTime() < now;
  return {
    date,
    weekday,
    vara: `${WEEKDAYS[weekday]} \u00b7 ${VARAS[weekday]}`,
    sunrise: sunrise.toISOString(),
    sunset: sunset.toISOString(),
    tithiIndex: work.tithiIndex,
    tithiName: work.tithiName,
    paksha: work.paksha,
    tithiEnd: work.tithiEnd,
    sunriseTithiName: dawn.tithiName,
    nakshatra: work.nakshatra,
    nakshatraIndex: work.nakshatraIndex,
    pada: work.pada,
    nakshatraEnd: work.nakshatraEnd,
    yoga: work.yoga,
    yogaEnd: work.yogaEnd,
    karana: work.karana,
    rashi: work.rashi,
    sunRashi: work.sunRashi,
    masa: work.masa,
    adhika: work.adhika,
    kshaya: work.kshaya,
    ritu: work.ritu,
    ayana: work.ayana,
    samvatsara: work.samvatsara,
    ayanamsha: work.ayanamsha,
    band: passed && scored.band !== "avoid" ? "thin" : scored.band,
    score: scored.score,
    because: scored.because,
    cautions: passed
      ? ["Today's suggested window has already passed.", ...scored.cautions, ...taras.map((item) => item.text)]
      : [...scored.cautions, ...taras.map((item) => item.text)],
    blocks: scored.blocks,
    suggestion,
    choghadiya,
    rahu: toSpan("Rahu", rahuN.start, rahuN.end, "avoid"),
    yama: toSpan("Yamaganda", yamaN.start, yamaN.end, "avoid"),
    gulika: toSpan("Gulika", gulikaN.start, gulikaN.end, "avoid"),
    abhijit: toSpan("Abhijit", ab0, ab1, "strong"),
    vishti,
    panchaka: work.panchaka,
    eclipse: hardEclipse?.label ?? softEclipse?.label ?? null,
    taraNote: taras.length ? taras.map((item) => item.text).join(" ") : null,
    passed,
  };
}

interface Facts {
  tithiIndex: number;
  tithiName: string;
  paksha: string;
  tithiEnd: string;
  nakshatraIndex: number;
  nakshatra: string;
  pada: number;
  nakshatraEnd: string;
  yogaIndex: number;
  yoga: string;
  yogaEnd: string;
  karana: string;
  rashi: string;
  sunRashi: string;
  masa: string;
  adhika: boolean;
  kshaya: boolean;
  ritu: string;
  ayana: string;
  samvatsara: string;
  ayanamsha: string;
  panchaka: boolean;
}

function facts(moment: Date, months: LMonth[], ends = true): Facts {
  const e = elongation(moment);
  const tithiIndex = Math.floor(e / 12) % 30;
  const tithiEnd = ends ? nextCrossing(moment, elongation, ((tithiIndex + 1) * 12) % 360, 3) : null;
  const moon = moonSid(moment);
  const nakshatraIndex = Math.floor(moon / NAK_SPAN) % 27;
  const into = moon % NAK_SPAN;
  const pada = Math.min(4, Math.floor(into / (NAK_SPAN / 4)) + 1);
  const nakEnd = ends ? nextCrossing(moment, moonSid, ((nakshatraIndex + 1) * NAK_SPAN) % 360, 3) : null;
  const yogaIndex = Math.floor(yogaLon(moment) / NAK_SPAN) % 27;
  const yogaEnd = ends ? nextCrossing(moment, yogaLon, ((yogaIndex + 1) * NAK_SPAN) % 360, 3) : null;
  const kIndex = Math.floor(e / 6) % 60;
  const sunSign = Math.floor(sunSid(moment) / 30) % 12;
  const moonSign = Math.floor(moon / 30) % 12;
  const lunar = monthAt(months, moment);
  const nameIndex = lunar?.nameIndex ?? 0;
  const ayana = [9, 10, 11, 0, 1, 2].includes(sunSign) ? "Uttarayana" : "Dakshinayana";
  const masa = `${lunar?.adhika ? "Adhika " : ""}${MASAS[nameIndex]}`;
  return {
    tithiIndex,
    tithiName: tithiName(tithiIndex),
    paksha: tithiIndex === 29 ? "Krishna" : tithiIndex < 15 ? "Shukla" : "Krishna",
    tithiEnd: tithiEnd ? tithiEnd.toISOString() : "",
    nakshatraIndex,
    nakshatra: NAKSHATRAS[nakshatraIndex],
    pada,
    nakshatraEnd: nakEnd ? nakEnd.toISOString() : "",
    yogaIndex,
    yoga: YOGAS[yogaIndex],
    yogaEnd: yogaEnd ? yogaEnd.toISOString() : "",
    karana: karanaName(kIndex),
    rashi: RASIS[moonSign],
    sunRashi: RASIS[sunSign],
    masa,
    adhika: lunar?.adhika ?? false,
    kshaya: lunar?.kshaya ?? false,
    ritu: RITUS[Math.floor(nameIndex / 2)] ?? "Vasanta",
    ayana,
    samvatsara: samvatsaraAt(moment),
    ayanamsha: formatAyan(lahiri(moment)),
    panchaka: isPanchaka(nakshatraIndex, pada),
  };
}

function vishtiSpans(sunrise: Date, sunset: Date): Span[] {
  const spans: Span[] = [];
  let cursor = sunrise;
  const limit = sunset.getTime() + 3 * 3600 * 1000;
  for (let i = 0; i < 6 && cursor.getTime() < limit; i += 1) {
    const e = elongation(cursor);
    const index = Math.floor(e / 6);
    const end = nextCrossing(cursor, elongation, ((index + 1) * 6) % 360, 2);
    if (!end) break;
    if (karanaName(index) === "Vishti") {
      spans.push({
        label: "Vishti",
        start: cursor.toISOString(),
        end: end.toISOString(),
        tone: "avoid",
      });
    }
    cursor = new Date(end.getTime() + 1000);
  }
  return spans;
}

function tithiBars(index: number): boolean {
  const day = index % 15;
  return index === 29 || day === 3 || day === 8 || day === 13;
}

function listSuggestions(
  weekday: number,
  choghadiya: Span[],
  ab0: number,
  ab1: number,
  blocks: Array<[number, number]>,
): NonNullable<DayReport["suggestion"]>[] {
  const host = choghadiya.find((span) => Date.parse(span.start) <= (ab0 + ab1) / 2 && Date.parse(span.end) >= (ab0 + ab1) / 2);
  const abClear = clearPieces(ab0, ab1, blocks);
  const abWhole = abClear.some(([s, e]) => s <= ab0 + 2000 && e >= ab1 - 2000);
  const options: Array<{ label: string; start: number; end: number; rank: number; note: string }> = [];
  if (weekday !== 3 && abWhole && host && host.tone !== "avoid") {
    options.push({
      label: "Abhijit",
      start: ab0,
      end: ab1,
      rank: 0,
      note: `Inside ${host.label}. Clear of Rahu, Yamaganda, Gulika and Vishti.`,
    });
  }
  const rank: Record<string, number> = { Amrit: 1, Shubh: 2, Labh: 3 };
  for (const span of choghadiya) {
    const weight = rank[span.label];
    if (!weight) continue;
    for (const [start, end] of clearPieces(Date.parse(span.start), Date.parse(span.end), blocks)) {
      let note = "A clear stretch of at least twenty minutes.";
      if (weekday === 3) note = "Abhijit is not taken on Wednesday. " + note;
      else if (!abWhole) note = "Abhijit is crossed by Rahu, Yamaganda, Gulika or Vishti. " + note;
      else if (host && host.tone === "avoid") note = `Abhijit falls in ${host.label}. ${note}`;
      options.push({ label: span.label, start, end, rank: weight, note });
    }
  }
  options.sort((a, b) => a.rank - b.rank || a.start - b.start);
  return options.map((option) => ({
    label: option.label,
    start: new Date(option.start).toISOString(),
    end: new Date(option.end).toISOString(),
    note: option.note,
  }));
}

function scoreDay(args: {
  rite: RiteId;
  strict: boolean;
  work: Facts;
  dawn: Facts;
  suggestion: DayReport["suggestion"];
  weekday: number;
  hardEclipse: string | null;
  softEclipse: string | null;
  badTara: boolean;
  date: string;
  now: number;
}): { band: Band; score: number; because: string[]; cautions: string[]; blocks: string[] } {
  const { rite, strict, work, dawn, suggestion, weekday, hardEclipse, softEclipse, badTara } = args;
  const blocks: string[] = [];
  const cautions: string[] = [];
  const because: string[] = [];
  const pakshaDay = work.tithiIndex % 15;
  const rikta = pakshaDay === 3 || pakshaDay === 8 || pakshaDay === 13;
  const amavasya = work.tithiIndex === 29;
  const krishna = work.tithiIndex > 14;
  const badNak = AVOID_NAK.has(work.nakshatraIndex);
  const prefNak = PREFERRED_NAK.has(work.nakshatraIndex);
  const softNak = SOFT_NAK.has(work.nakshatraIndex);
  const badYoga = BAD_YOGA.has(work.yogaIndex);
  const goodYoga = GOOD_YOGA.has(work.yogaIndex);
  const goodTithi = [1, 2, 4, 6, 9, 10, 12].includes(pakshaDay);
  const okTithi = [0, 5, 11].includes(pakshaDay);
  const purnima = work.tithiIndex === 14;
  const ashtami = pakshaDay === 7;
  const tueSat = weekday === 2 || weekday === 6;
  const preferredVara = [1, 3, 4, 5].includes(weekday);

  if (work.adhika) blocks.push("Adhika month \u2014 these rites wait for the nija month.");
  if (hardEclipse) blocks.push(`${hardEclipse} peaks this civil day.`);
  if (rikta) blocks.push(`${work.tithiName} is a rikta tithi (4th, 9th or 14th).`);
  if (amavasya) blocks.push("Amavasya covers the working hour.");
  if (!suggestion) blocks.push("No clear window of twenty minutes outside Rahu, Yamaganda, Gulika and Vishti.");
  if (rite === "well" && weekday === 2) blocks.push("Tuesday is refused for breaking ground for water.");
  if (strict && tueSat && !(rite === "well" && weekday === 2)) blocks.push("Tuesday or Saturday, with strict filtering on.");
  if (strict && krishna) blocks.push("Krishna paksha, with strict filtering on.");
  if (strict && badNak) blocks.push(`${work.nakshatra} is in the avoided set, and strict filtering is on.`);
  if (strict && work.panchaka && (ENTRY.has(rite) || rite === "bhumi-puja")) {
    blocks.push("Panchaka is running, and strict filtering is on.");
  }
  if (strict && badTara) blocks.push("Janma tara is weak for a person you named, and strict filtering is on.");

  let score = 0;
  if (blocks.length === 0) {
    if (prefNak) {
      score += 3;
      because.push(`${work.nakshatra} is one of the stars usually kept for this rite.`);
    } else if (badNak) {
      score -= 4;
      cautions.push(`${work.nakshatra} is usually set aside.`);
    } else if (softNak) {
      score -= 2;
      cautions.push(`${work.nakshatra} is a middling star for a start.`);
    } else {
      score += 1;
      because.push(`${work.nakshatra} is neither a preferred star nor a refused one.`);
    }
    if (goodTithi) {
      score += 2;
      because.push(`${work.tithiName} is a steady tithi for the vow.`);
    } else if (okTithi) {
      score += 1;
      because.push(`${work.tithiName} is acceptable.`);
    } else if (purnima) {
      score += ENTRY.has(rite) ? 0 : 1;
      cautions.push(ENTRY.has(rite) ? "Purnima is fine for worship, and many delay an entry." : "Purnima can carry a shanti.");
    } else if (ashtami) {
      score -= 1;
      cautions.push("Ashtami is a thin tithi for these rites.");
    }
    if (goodYoga) {
      score += 2;
      because.push(`${work.yoga} yoga supports the hour.`);
    } else if (badYoga) {
      score -= 3;
      cautions.push(`${work.yoga} is one of the harder yogas.`);
    }
    if (preferredVara) {
      score += 2;
      because.push(`${WEEKDAYS[weekday]} is a preferred weekday.`);
    } else if (tueSat) {
      score -= 2;
      cautions.push(`${WEEKDAYS[weekday]} is a weak weekday for this start.`);
    }
    if (!krishna) {
      score += 1;
      because.push("Shukla paksha.");
    } else {
      score -= ENTRY.has(rite) ? 2 : 1;
      cautions.push("Krishna paksha \u2014 allowed in the householder setting, refused if strict mode is on.");
    }
    if (suggestion) {
      score += 1;
      because.push(`Start in ${suggestion.label}, ${suggestion.note}`);
    }
    if (work.panchaka) cautions.push("Panchaka is running. Families who observe it move the rite or do the five-pot shanti first.");
    if (work.kshaya) cautions.push("This lunar month holds two solar entries. Ask the priest before fixing the day.");
    if (softEclipse) cautions.push(`${softEclipse} peaks this civil day. It is noted, not treated as a full eclipse bar.`);
    if (dawn.tithiName !== work.tithiName) {
      cautions.push(`At sunrise the tithi is still ${dawn.tithiName}. Do not begin the vow before ${work.tithiName} is current.`);
    }
    const venus = planetSep(Astronomy.Body.Venus, new Date(suggestion?.start ?? args.date));
    const jupiter = planetSep(Astronomy.Body.Jupiter, new Date(suggestion?.start ?? args.date));
    if (venus < 8) cautions.push("Venus is close to the Sun (Shukra asta, approximate). Entry rites sometimes pause; a shanti usually does not.");
    if (jupiter < 11) cautions.push("Jupiter is close to the Sun (Guru asta, approximate).");
    if (badTara) cautions.push("A named birth star gives a weak tara for this nakshatra.");
  }

  let band: Band = "avoid";
  if (blocks.length) band = "avoid";
  else if (score >= 8) band = "strong";
  else if (score >= 5) band = "workable";
  else band = "thin";
  if (band === "strong" && (badNak || badYoga || badTara)) band = "workable";
  if (band === "strong" && ENTRY.has(rite) && (krishna || purnima)) band = "workable";
  if (badNak && band !== "avoid") band = "thin";
  return { band, score, because, cautions, blocks };
}
