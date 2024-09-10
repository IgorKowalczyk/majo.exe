/**
 * Get the lines of a text
 *
 * @param {CanvasRenderingContext2D | SKRSContext2D} context - The canvas context
 * @param {string} text - The text to split
 * @param {number} maxWidth - The max width of the text before a line break
 * @returns {string[]} - The lines of the text
 * */
export function getLines(context, text, maxWidth) {
 const lines = [];
 if (!text) return lines;

 while (text.length) {
  let i;
  for (i = text.length; context.measureText(text.substr(0, i)).width > maxWidth; i -= 1);
  const result = text.substr(0, i);
  let j;
  if (i !== text.length) for (j = 0; result.indexOf(" ", j) !== -1; j = result.indexOf(" ", j) + 1);

  lines.push(result.substr(0, j || result.length));
  text = text.substr(lines[lines.length - 1].length, text.length);
 }

 return lines;
}
