import prismaClient from "@majoexe/database";

/**
 * Check XP for user
 * @param { string } userId The id of the user
 * @param { string } guildId The id of the guild
 * @returns { number } The amount of XP
 * */
export async function checkXP(userId, guildId) {
 const xp = await prismaClient.guildXp.findFirst({
  where: {
   guildId: guildId,
   userId: userId,
  },
 });

 if (!xp || !xp.xp) return 0;
 return xp.xp;
}
