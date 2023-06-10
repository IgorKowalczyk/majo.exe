import prismaClient from "@majoexe/database";

/**
 * Set profanity setting for Guild
 * @param { string } guildId The id of the guild
 * @param { boolean } profanityLevel The profanity setting
 * @returns { boolean } The profanity setting
 * */
export async function setProfanity(guildId, profanityLevel) {
 try {
  await prismaClient.guild.update({
   where: {
    guildId: guildId,
   },
   data: {
    profanityLevel: profanityLevel,
   },
  });

  return true;
 } catch (e) {
  console.log("Failed to set profanity:", e);
  throw error;
 }
}
