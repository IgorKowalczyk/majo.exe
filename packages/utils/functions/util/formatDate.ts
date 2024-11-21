export function formatDate(date: string | number | Date) {
 return new Date(date).toLocaleDateString("en-US", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
 });
}
