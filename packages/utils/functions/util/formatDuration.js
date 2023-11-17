import ms from "ms";

/**
 * Formats a duration in milliseconds to a human readable string.
 *
 * @param {number} durationInMs - The duration in milliseconds.
 * @returns {string} - The formatted duration.
 * @example
 * const duration = formatDuration(1000 * 60 * 60 * 24);
 * console.log(duration);
 * // => "1d"
 */
export function formatDuration(durationInMs) {
 return ms(durationInMs, {
  long: true,
 });
}
