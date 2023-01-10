export function CreateAvatar(user, size) {
 return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=${size.toString() || 128}`;
}
