export function splitCamelCase(str: string) {
 return str.split(/(?=[A-Z])/).join(" ");
}
