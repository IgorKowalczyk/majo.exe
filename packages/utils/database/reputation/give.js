import prismaClient from "@majoexe/database";

/**
 * Give Reputation to user
 * @param {string} user The user to give reputation to
 * @param {string} guild The guild to give reputation in
 * @returns {Promise<number>} The reputation
 */
export async function giveReputation(user, guild) {
 try {
  const rep = await prismaClient.reputation.findFirst({
   where: {
    guildId: guild.id,
    userId: user.id,
   },
  });

  if (!rep) {
   await prismaClient.reputation.create({
    data: {
     guild: {
      connectOrCreate: {
       where: {
        guildId: guild.id,
       },
       create: {
        guildId: guild.id,
       },
      },
     },
     user: {
      connectOrCreate: {
       where: {
        discordId: user.id,
       },
       create: {
        discordId: user.id,
        name: user.username,
        global_name: user.globalName || user.username,
        avatar: user.avatar,
        discriminator: user.discriminator,
       },
      },
     },
     reputation: 1,
    },
   });
   return 1;
  }

  // 32-bit integer limit
  if (rep.reputation >= 2147483647) {
   return rep.reputation;
  }

  await prismaClient.reputation.update({
   where: {
    id: rep.id,
   },
   data: {
    reputation: rep.reputation + 1,
   },
  });

  return rep.reputation + 1;
 } catch (error) {
  console.error("Failed to give reputation:", error);
  throw error;
 }
}
