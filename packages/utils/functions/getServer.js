import { isBotInServer } from "./isBotInServer.js";

/**
 * @param {string} id The id of the server.
 * @returns {Promise<any>} The id of the server.
 * @example getServer(id)
 * */
export async function getServer(id) {
 try {
  const res = await fetch(`https://discord.com/api/guilds/${id}`, {
   next: { revalidate: 10 },
   headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
   },
  });
  if (!res.ok) return { error: "Invalid server ID" };
  const json = await res.json();
  json.bot = await isBotInServer(id);
  return json;
 } catch (e) {
  return { error: "Invalid server ID" };
 }
}
