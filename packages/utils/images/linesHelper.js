export function getLines(ctx, text, maxWidth) {
 const lines = [];
 if (!text) return lines;

 while (text.length) {
  let i;
  for (i = text.length; ctx.measureText(text.substr(0, i)).width > maxWidth; i -= 1);
  const result = text.substr(0, i);
  let j;
  if (i !== text.length) for (j = 0; result.indexOf(" ", j) !== -1; j = result.indexOf(" ", j) + 1);

  lines.push(result.substr(0, j || result.length));
  text = text.substr(lines[lines.length - 1].length, text.length);
 }

 return lines;
}
