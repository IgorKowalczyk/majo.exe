import ms from "ms";

export function formatDuration(durationInMs: number | string) {
 if (typeof durationInMs === "string") durationInMs = parseInt(durationInMs);

 return ms(durationInMs, {
  long: true,
 });
}
