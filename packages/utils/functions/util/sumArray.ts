export const sumArray = (array: Record<string, number>[], metric: string): number => array.reduce((accumulator, currentValue) => accumulator + (currentValue[metric] || 0), 0);
