import prismaClient from "@majoexe/database";
/**
 * Fetch profanity setting for Guild
 * @param { string } guild The id of the guild
 * @returns { boolean } The profanity setting
 */
export async function fetchProfanity(guildId) {
 try {
  const guild = await prismaClient.guild.findUnique({
   where: {
    guildId: guildId,
   },
  });
  
  if (!guild) {
   return false;
  }

  return guild.profanityLevel;
 } catch (e) {
  console.log(e);
  throw e;
 }
}
