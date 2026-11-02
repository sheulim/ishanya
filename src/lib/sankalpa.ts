import { MASA_SA, MASAS, NAKSHATRA_SA, RITES, RITU_SA, VARA_SA, tithiSa, type RiteId } from "./panchang/names";
import type { DayReport } from "./panchang/types";

export function buildSankalpa(day: DayReport, rite: RiteId, who: string): { sa: string; en: string } {
  const name = who.trim() || "अहं";
  const masaIndex = MASAS.findIndex((masa) => day.masa.endsWith(masa));
  const masa = masaIndex >= 0 ? MASA_SA[masaIndex] : day.masa;
  const ayana = day.ayana === "Uttarayana" ? "उत्तरायणे" : "दक्षिणायने";
  const ritu = RITU_SA[day.ritu] ?? day.ritu;
  const paksha = day.tithiIndex >= 15 ? "कृष्ण" : "शुक्ल";
  const riteSa = RITES.find((item) => item.id === rite)?.sa ?? "वास्तुशान्तिं";
  const person = who.trim() ? who.trim() : "the householder";
  const sa = `ॐ अद्य ${day.samvatsara}नामसंवत्सरे ${ayana} ${ritu}ऋतौ ${day.adhika ? "अधिक" : ""}${masa}मासे ${paksha}पक्षे ${tithiSa(day.tithiIndex)}तिथौ ${VARA_SA[day.weekday]}वासरे ${NAKSHATRA_SA[day.nakshatraIndex]}नक्षत्रे ${name} मम सपरिवारस्य गृहक्षेत्रे ${riteSa} करिष्ये।`;
  const en = `On this ${day.vara.split(" · ")[0]}, ${day.tithiName} of ${day.masa}, under ${day.nakshatra}, in ${day.samvatsara} — ${person} states the intention to perform ${RITES.find((item) => item.id === rite)?.label ?? "the rite"} in this dwelling, for a quiet house and the welfare of the people who live here.`;
  return { sa, en };
}
