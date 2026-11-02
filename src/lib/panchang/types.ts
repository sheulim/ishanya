import type { RiteId } from "./names";

export type Band = "strong" | "workable" | "thin" | "avoid";

export interface Span {
  label: string;
  start: string;
  end: string;
  tone: "strong" | "neutral" | "avoid";
}

export interface DayReport {
  date: string;
  weekday: number;
  vara: string;
  sunrise: string;
  sunset: string;
  tithiIndex: number;
  tithiName: string;
  paksha: string;
  tithiEnd: string;
  sunriseTithiName: string;
  nakshatra: string;
  nakshatraIndex: number;
  pada: number;
  nakshatraEnd: string;
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
  band: Band;
  score: number;
  because: string[];
  cautions: string[];
  blocks: string[];
  suggestion: { label: string; start: string; end: string; note: string } | null;
  choghadiya: Span[];
  rahu: Span;
  yama: Span;
  gulika: Span;
  abhijit: Span;
  vishti: Span[];
  panchaka: boolean;
  eclipse: string | null;
  taraNote: string | null;
  passed: boolean;
}

export interface CalendarCell {
  date: string;
  band: Band;
  weekday: number;
}

export interface HorizonReport {
  place: string;
  lat: number;
  lon: number;
  rite: RiteId;
  riteLabel: string;
  strict: boolean;
  from: string;
  until: string;
  spanDays: number;
  rules: string[];
  days: DayReport[];
  calendar: CalendarCell[];
  counts: { strong: number; workable: number; thin: number; avoid: number };
}

export interface HorizonInput {
  fromKey: string;
  spanDays: number;
  lat: number;
  lon: number;
  place: string;
  rite: RiteId;
  strict: boolean;
  yajamana: number | null;
  spouse: number | null;
}
