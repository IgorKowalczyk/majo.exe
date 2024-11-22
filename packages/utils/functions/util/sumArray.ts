export const sumArray = (array: any[], metric: string) => array.reduce((accumulator, currentValue) => accumulator + currentValue[metric], 0);
