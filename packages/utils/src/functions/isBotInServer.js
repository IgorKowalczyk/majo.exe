/**
 * Checks if the bot is in a server
 * @param {string} guildId The guild ID.
 * @returns {boolean} If the bot is in the server.
 * */
export async function isBotInServer(guildId) {
 try {
  const res = await fetch(`https://discord.com/api/guilds/${guildId}/members/${process.env.CLIENT_ID}`, {
   headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
   },
  });
  return res.status === 200;
 } catch (err) {
  return false;
 }
}
