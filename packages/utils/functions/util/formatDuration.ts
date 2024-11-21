import ms from "ms";

export function formatDuration(durationInMs: number | string) {
 return ms(durationInMs, {
  long: true,
 });
}
