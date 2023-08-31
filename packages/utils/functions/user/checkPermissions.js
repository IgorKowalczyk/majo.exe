import { PermissionFlagsBits } from "discord-api-types/v10";

/**
 * @param {bigint} permissionNumber The permission number.
 * @returns {string[]} The permission names.
 * @example getPermissionNames(8n)
 */
export function getPermissionNames(permissionNumber) {
 const permissionNames = [];

 for (const permission in PermissionFlagsBits) {
  if (Object.prototype.hasOwnProperty.call(PermissionFlagsBits, permission)) {
   const permissionValue = PermissionFlagsBits[permission];
   if ((BigInt(permissionNumber) & permissionValue) === permissionValue) {
    permissionNames.push(permission);
   }
  }
 }

 return permissionNames;
}
