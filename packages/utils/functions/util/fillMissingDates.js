import { generateDates } from "./generateDates.js";

/**
 *  Fill missing dates in an array of objects
 *
 *  @param {Object[]} array - The array to fill
 *  @param {string} property - The property to fill in the array
 *  @returns {Object[]} The array with the missing dates filled
 */
export function fillMissingDates(array, property) {
 const arrayDates = array.map((e) => new Date(e.date));
 let minDate = new Date(Math.min(...arrayDates));
 const today = new Date();
 const thirtyDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);

 minDate = minDate < thirtyDaysAgo ? thirtyDaysAgo : minDate;
 const dateSet = new Set(arrayDates.map((date) => date.toISOString().split("T")[0]));

 generateDates(minDate, today).forEach((date) => {
  const dateString = date.toISOString().split("T")[0];
  if (!dateSet.has(dateString)) {
   array.push({ date: dateString, [property]: 0 });
  }
 });

 return array.sort((a, b) => new Date(a.date) - new Date(b.date));
}
