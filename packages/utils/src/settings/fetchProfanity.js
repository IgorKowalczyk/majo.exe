import clientPromise from "../database/database.js";

/**
 * Fetch profanity setting for Guild
 * @param { string } guild The id of the guild
 * @returns { boolean } The profanity setting
 */
export async function fetchProfanity(guild) {
 const client = await clientPromise;
 const db = await client.db();
 const collection = await db.collection("guilds");
 try {
  await collection.findOne({ guildID: guild }).then((res) => {
   return res;
  });
 } catch (err) {
  return false;
 }
}
