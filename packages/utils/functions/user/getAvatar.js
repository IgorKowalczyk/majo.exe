/**
 * Get the avatar of a user.
 * @param {object} user The user object.
 * @param {number} size The size of the avatar.
 * @returns {string}
 * @example
 * const avatar = getAvatar(message.author, 128);
 * console.log(avatar);
 * */
export function getAvatar(user, size) {
 return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=${size.toString() || 128}`;
}
