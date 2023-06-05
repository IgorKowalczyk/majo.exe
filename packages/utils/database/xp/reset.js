import prismaClient from "@majoexe/database";

/**
 * Reset XP for user
 * @param { string } userId The id of the user
 * @param { string } guildId The id of the guild
 * @returns { boolean } If the XP was reset
 * */
export async function resetXP(userId, guildId) {
 await prismaClient.guildXp.deleteMany({
  where: {
   guildId: guildId,
   userId: userId,
  },
 });

 return true;
}
