/**
 * Returns a string representing a percentage bar.
 *
 * @param {number} full - The full value.
 * @param {number} curr - The current value.
 * @param {number} [numBars=25] - The number of bars to display.
 * @returns {string} - The percentage bar.
 * @example
 * const bar = percentageBar(100, 50);
 * console.log(bar);
 * // => "[██████████████████████████░░░░░░░░]   50.00%"
 * */
export function percentageBar(full, curr, numBars = 25) {
 if (full <= 0) return "Error: Full value must be greater than 0.";
 if (curr < 0) return "Error: Current value must be greater than or equal to 0.";
 if (curr > full) return "Error: Current value must be less than or equal to full value.";

 const percent = (curr / full) * 100;
 const numCompleteBars = Math.floor(percent / (100 / numBars));
 const numEmptyBars = numBars - numCompleteBars;
 const completeBar = "█".repeat(numCompleteBars);
 const emptyBar = "░".repeat(numEmptyBars);

 return `[${completeBar}${emptyBar}]   ${percent.toFixed(2)}%`;
}
