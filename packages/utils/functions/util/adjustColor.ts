export function adjustColor(hexColor: string, percent: number, action: "darken" | "lighten" = "darken") {
 hexColor = hexColor.replace("#", "");

 const r = parseInt(hexColor.slice(0, 2), 16);
 const g = parseInt(hexColor.slice(2, 4), 16);
 const b = parseInt(hexColor.slice(4, 6), 16);

 const factor = action === "lighten" ? 1 + percent / 100 : 1 - percent / 100;

 const adjustedR = Math.round(r * factor);
 const adjustedG = Math.round(g * factor);
 const adjustedB = Math.round(b * factor);

 const finalR = Math.min(255, Math.max(0, adjustedR));
 const finalG = Math.min(255, Math.max(0, adjustedG));
 const finalB = Math.min(255, Math.max(0, adjustedB));

 const adjustedHex = `#${finalR.toString(16).padStart(2, "0")}${finalG.toString(16).padStart(2, "0")}${finalB.toString(16).padStart(2, "0")}`;

 return adjustedHex;
}
