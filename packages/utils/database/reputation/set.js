import prismaClient from "@nyxia/database";

/**
 * Sets the reputation of a user in a guild.
 *
 * @param {Object} user - The user object containing user details.
 * @param {string} user.id - The ID of the user.
 * @param {string} user.username - The username of the user.
 * @param {string} [user.globalName] - The global name of the user.
 * @param {string} user.discriminator - The discriminator of the user.
 * @param {string} user.avatar - The avatar of the user.
 * @param {Object} guildId - The ID of the guild.
 * @param {number} amount - The amount of reputation to set.
 * @returns {Promise<number>} - Returns the set amount of reputation for the user in the guild.
 * @throws {Error} - Throws an error if the operation fails.
 */
export async function setReputation(user, guildId, amount) {
 try {
  const rep = await prismaClient.reputation.findFirst({
   where: {
    guildId,
    userId: user.id,
   },
  });

  if (!rep) {
   await prismaClient.reputation.create({
    data: {
     guild: {
      connectOrCreate: {
       where: {
        guildId,
       },
       create: {
        guildId,
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
     reputation: amount,
    },
   });
   return amount;
  }

  await prismaClient.reputation.update({
   where: {
    id: rep.id,
   },
   data: {
    reputation: amount,
   },
  });

  return amount;
 } catch (error) {
  console.error("Failed to take reputation:", error);
  throw error;
 }
}
