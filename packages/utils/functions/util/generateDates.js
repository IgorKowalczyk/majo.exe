/**
 * Generate dates between two dates
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {Date[]}
 */
export function generateDates(startDate, endDate) {
 const dates = [];
 const currentDate = new Date(startDate);

 while (currentDate <= endDate) {
  dates.push(new Date(currentDate));
  currentDate.setDate(currentDate.getDate() + 1);
 }

 return dates;
}
