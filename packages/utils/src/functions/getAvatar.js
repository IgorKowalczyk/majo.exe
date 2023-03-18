/**
 * Get the avatar of a user.
 * @param {Object} user The user object.
 * @param {number} size The size of the avatar.
 * @returns {string} The avatar URL.
 * */
export function getAvatar(user, size) {
 return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=${size.toString() || 128}`;
}
