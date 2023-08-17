/**
 * Format number to a readable format
 * @param {number} num
 * @returns {string}
 * @example
 * const number = formatNumber(1000);
 * console.log(number);
 * // => "1K"
 * */
export function formatNumber(num) {
 if (!num || isNaN(num)) return "0";
 if (typeof num === "string") num = parseInt(num);
 return new Intl.NumberFormat("en", { notation: "compact" }).format(num);
}
