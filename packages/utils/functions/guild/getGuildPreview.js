/**
 * @param {string} id The id of the server.
 * @returns {Promise<any>} The preview of the server.
 * @example getGuildPreview(id)
 * */
export async function getGuildPreview(id) {
 try {
  const res = await fetch(`https://discord.com/api/guilds/${id}/preview`, {
   next: { revalidate: 10 },
   headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
   },
  });
  if (!res.ok) return { error: "Invalid server ID" };
  const json = await res.json();
  return json;
 } catch (e) {
  return { error: "Invalid server ID" };
 }
}
