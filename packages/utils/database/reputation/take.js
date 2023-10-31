import prismaClient from "@majoexe/database";

/**
 * Take reputation from user
 *
 * @param {string} user - The user to take reputation from
 * @param {string} user.id - The ID of the user.
 * @param {string} user.username - The username of the user.
 * @param {string} [user.globalName] - The global name of the user.
 * @param {string} user.discriminator - The discriminator of the user.
 * @param {string} user.avatar - The avatar of the user.
 * @param {string} guild - The guild to take reputation in
 * @returns {Promise<number>} - The reputation of the user in the guild
 * @throws {Error} - If there is an error in taking reputation
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
