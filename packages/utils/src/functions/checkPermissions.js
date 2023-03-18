/**
 * Checks if the user can add bot to the server.
 * @param {number} permission The permission number.
 * @returns {boolean} If the user can add bot to the server.
 * */
export function canAddBotToServer(permission) {
 const flag = 0x0000000000000020;
 return (permission & flag) === flag;
}
