import { generateDates } from "./generateDates";

interface DataEntry {
 date: string | Date;
 /* eslint-disable typescript/no-explicit-any */
 [key: string]: any;
}

export function fillMissingDates(array: DataEntry[], property: string) {
 const arrayDates = array.map((e) => new Date(e.date));
 let minDate = new Date(Math.min(...arrayDates.map((date) => date.getTime())));
 const today = new Date();
 const thirtyDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);

 minDate = minDate < thirtyDaysAgo ? thirtyDaysAgo : minDate;
 const dateSet = new Set(arrayDates.map((date) => date.toISOString().split("T")[0]));

 generateDates(minDate, today).forEach((date) => {
  const [dateString] = date.toISOString().split("T");
  if (dateString && !dateSet.has(dateString)) {
   array.push({ date: dateString, [property]: 0 });
  }
 });

 return array.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
