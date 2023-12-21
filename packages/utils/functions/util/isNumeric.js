/**
 * Checks if the given value is a number.
 *
 * @param {any} num The value to check.
 * @returns {boolean} Whether the value is a number.
 **/
export function isNumeric(num) {
 return (typeof num === "number" || (typeof num === "string" && num.trim() !== "")) && !isNaN(num) && Number.isInteger(Number(num));
}
