/**
 * Invert a hex color
 *
 * @param {string} hex - The hex color to invert
 * @returns {string} - The inverted hex color
 **/
export function invertColor(hex) {
 hex = hex.replace("#", "");

 if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
 if (hex.length !== 6) return "#FFFFFF";

 const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16);
 const g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16);
 const b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);

 const pad = (txt, length) => {
  length = length || 2;
  const arr = [length].join("0");
  return (arr + txt).slice(-length);
 };

 const finalHex = `#${pad(r)}${pad(g)}${pad(b)}`;
 return finalHex;
}
