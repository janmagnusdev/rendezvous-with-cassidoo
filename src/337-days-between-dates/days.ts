import { Temporal, toTemporalInstant } from "@js-temporal/polyfill";

// @ts-ignore
Date.prototype.toTemporalInstant = toTemporalInstant;

export function daysBetween(firstDate: string, secondDate: string) {
  // @ts-ignore
  const date1 = new Date(
    firstDate
  ).toTemporalInstant() as unknown as Temporal.Instant;
  const zonedDateTime1 = date1.toZonedDateTimeISO("Europe/Berlin");
  // @ts-ignore
  const date2 = new Date(
    secondDate
  ).toTemporalInstant() as unknown as Temporal.Instant;
  const zonedDateTime2 = date2.toZonedDateTimeISO("Europe/Berlin");
  return zonedDateTime1.until(zonedDateTime2, { largestUnit: "days" }).days;
}
