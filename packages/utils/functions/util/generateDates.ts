export function generateDates(startDate: Date, endDate: Date): Date[] {
 const dates = [];
 const currentDate = new Date(startDate);

 while (currentDate <= endDate) {
  dates.push(new Date(currentDate));
  currentDate.setDate(currentDate.getDate() + 1);
 }

 return dates;
}
