import { SKRSContext2D } from "@napi-rs/canvas";

export function getLines(context: SKRSContext2D, text: string, maxWidth: number): string[] {
 const lines: string[] = [];
 if (!text) return lines;

 while (text.length) {
  let i;
  for (i = text.length; context.measureText(text.substring(0, i)).width > maxWidth; i -= 1);
  const result: string = text.substring(0, i);
  let j;
  if (i !== text.length) for (j = 0; result.indexOf(" ", j) !== -1; j = result.indexOf(" ", j) + 1);

  lines.push(result.substring(0, j || result.length));
  const lastLine = lines[lines.length - 1];
  text = text.slice(lastLine ? lastLine.length : 0);
 }

 return lines;
}
