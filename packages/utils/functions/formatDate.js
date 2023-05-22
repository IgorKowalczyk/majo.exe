export function formatDate(date) {
 return new Date(date).toLocaleDateString("en-US", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
 });
}
