export function shortenText(text: string, maxLen: number | 25 = 25): string {
  if (text.length > maxLen) text = text.slice(0, maxLen) + "...";
  return text;
}
