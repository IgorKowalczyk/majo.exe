import { isBotInServer } from "./isBotInServer.js";

/**
 * @param {string} id The id of the server.
 * @returns {Promise<any>} The id of the server.
 * @example getServer(id)
 * */
export async function getServer(id) {
 const res = await fetch(`https://discord.com/api/guilds/${id}`, {
  headers: {
   Authorization: `Bot ${process.env.TOKEN}`,
  },
 });
 if (!res.ok) return { error: "Invalid server ID" };
 const json = await res.json();
 json.bot = await isBotInServer(id);
 return json;
}
