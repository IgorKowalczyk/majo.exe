import prismaClient from "@majoexe/database";

/**
 * Gives reputation to a user in a guild.
 *
 * @param {Object} user - The user object containing user details.
 * @param {string} user.id - The ID of the user.
 * @param {string} user.username - The username of the user.
 * @param {string} [user.globalName] - The global name of the user.
 * @param {string} user.discriminator - The discriminator of the user.
 * @param {string} user.avatar - The avatar of the user.
 * @param {Object} guild - The guild object containing guild details.
 * @returns {Promise<number>} - Returns the updated reputation of the user in the guild.
 * @throws {Error} - Throws an error if the operation fails.
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
