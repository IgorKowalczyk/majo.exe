export function pseudoRandom(index: number) {
 const seed = index;
 const random1 = Math.sin(seed) * 10000;
 const baseValue1 = random1 - Math.floor(random1);
 const random2 = Math.cos(seed * 2) * 10000;
 const baseValue2 = random2 - Math.floor(random2);
 const growthFactor = Math.pow(index + 1, 1.5);
 const variationFactor = 26;

 const result = (baseValue1 + baseValue2) * (1 + variationFactor) + growthFactor;
 return result;
}
