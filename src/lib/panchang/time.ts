const IST_MS = (5 * 60 + 30) * 60 * 1000;

export function istKey(date: Date): string {
  const shifted = new Date(date.getTime() + IST_MS);
  const y = shifted.getUTCFullYear();
  const m = String(shifted.getUTCMonth() + 1).padStart(2, "0");
  const d = String(shifted.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function istMidnight(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month - 1, day) - IST_MS);
}

export function todayIst(): { year: number; month: number; day: number; key: string } {
  const key = istKey(new Date());
  const [year, month, day] = key.split("-").map(Number);
  return { year, month, day, key };
}

export function formatClock(iso: string): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(iso));
}

export function formatWhen(iso: string, dayKey: string): string {
  if (!iso) return "—";
  const clock = formatClock(iso);
  return istKey(new Date(iso)) === dayKey ? clock : `${clock} (next day)`;
}

export function formatPretty(dayKey: string): string {
  const [y, m, d] = dayKey.split("-").map(Number);
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}
