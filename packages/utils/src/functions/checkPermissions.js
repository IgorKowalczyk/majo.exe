export function canAddBotToServer(permission) {
 const flag = 0x0000000000000020;
 return (permission & flag) === flag;
}
