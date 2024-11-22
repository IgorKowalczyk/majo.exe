import { PermissionFlagsBits } from "discord-api-types/v10";

export function getPermissionNames(permissionNumber: bigint | string) {
 const permissionNames = [];

 if (typeof permissionNumber === "string") permissionNumber = BigInt(permissionNumber);

 for (const permission in PermissionFlagsBits) {
  if (Object.prototype.hasOwnProperty.call(PermissionFlagsBits, permission)) {
   const permissionValue = PermissionFlagsBits[permission as keyof typeof PermissionFlagsBits];
   if ((BigInt(permissionNumber) & permissionValue) === permissionValue) {
    permissionNames.push(permission);
   }
  }
 }

 return permissionNames;
}
