import prismaClient from "@majoexe/database/index.js";
/**
 * Fetch profanity setting for Guild
 * @param { string } guild The id of the guild
 * @returns { boolean } The profanity setting
 */
export async function fetchProfanity(guildId) {
 const guild = await prismaClient.guild.findUnique({
  where: {
   guildId: guildId,
  },
 });

 return guild?.profanityLevel;
}
