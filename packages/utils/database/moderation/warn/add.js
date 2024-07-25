import prismaClient from "@nyxia/database";

/**
 * Warns a user in a guild.
 *
 * @param {string} guildId - The ID of the guild.
 * @param {Object} user - The user to be warned.
 * @param {string} user.id - The ID of the user.
 * @param {string} user.username - The username of the user.
 * @param {string} [user.globalName] - The global name of the user.
 * @param {string} user.discriminator - The discriminator of the user.
 * @param {string} reason - The reason for the warning.
 * @param {string} warnedBy - The ID of the user who issued the warning.
 * @returns {Promise<Object>} A promise that resolves to the created warning.
 * @throws {Error} If there is an error in creating the warning.
 */
export async function warnUser(guildId, user, reason, warnedBy) {
 try {
  const warning = await prismaClient.guildWarns.findMany({
   where: {
    guildId,
    user: {
     discordId: user.id,
    },
   },
   take: 1,
   orderBy: {
    warnId: "desc",
   },
  });

  const warnNumber = warning.length === 0 ? 1 : warning[0].warnId + 1;

  const createdWarning = await prismaClient.guildWarns.create({
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
       discriminator: user.discriminator,
      },
     },
    },
    warnId: warnNumber,
    message: reason,
    createdById: warnedBy,
   },
  });

  return createdWarning;
 } catch (error) {
  console.error("Failed to warn user: ", error);
  throw error;
 }
}
