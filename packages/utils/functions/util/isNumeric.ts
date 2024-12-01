export function isNumeric(num: string | number): boolean {
 return (typeof num === "number" || (typeof num === "string" && num.trim() !== "")) && !isNaN(Number(num)) && Number.isInteger(Number(num));
}
