export function invertColor(hex: string): string {
  if (!hex) return "#FFFFFF";
  hex = hex.replace("#", "");
  if (!hex[0] || !hex[1] || !hex[2] || !hex[3] || !hex[4] || !hex[5]) return "#FFFFFF";
  if (hex && hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  if (hex.length !== 6) return "#FFFFFF";

  const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16);
  const g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16);
  const b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);

  const pad = (txt: string, length: number = 2): string => {
    const arr = [length].join("0");
    return (arr + txt).slice(-length);
  };

  const finalHex = `#${pad(r)}${pad(g)}${pad(b)}`;
  return finalHex;
}
