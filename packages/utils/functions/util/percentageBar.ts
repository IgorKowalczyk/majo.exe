export function percentageBar(full: number, curr: number, numBars: number = 25): string {
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
