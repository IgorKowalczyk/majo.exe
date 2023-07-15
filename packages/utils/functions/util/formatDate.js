/**
 * @param {string} date
 * @returns {string} - The date in the format "MM/DD/YYYY"
 * @example
 * const date = formatDate("2021-09-10T15:00:00.000Z");
 * console.log(date);
 * // => "9/10/2021"
 * */
export function formatDate(date) {
 return new Date(date).toLocaleDateString("en-US", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
 });
}
