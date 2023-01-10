import clientPromise from "@majoexe/util/src/database/database.js";

export async function fetchProfanity(guildId) {
 const client = await clientPromise;
 const db = await client.db();
 const collection = await db.collection("guilds");
 await collection.findOne({ id: guildId }).then((res) => {
  console.log(res);
  return res;
 });
}
