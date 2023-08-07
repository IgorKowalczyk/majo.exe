import prismaClient from "@majoexe/database";

/**
 * Take reputation from user
 * @param {string} user The user to take reputation from
 * @param {string} guild The guild to take reputation in
 * @returns {number} The amount of reputation
 */
export async function takeReputation(user, guild) {
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
        verified: user.verified,
       },
      },
     },
     reputation: 0,
    },
   });
   return 0;
  }

  await prismaClient.reputation.update({
   where: {
    id: rep.id,
   },
   data: {
    reputation: rep.reputation - 1,
   },
  });

  return rep.reputation - 1;
 } catch (error) {
  console.error("Failed to take reputation:", error);
  throw error;
 }
}
