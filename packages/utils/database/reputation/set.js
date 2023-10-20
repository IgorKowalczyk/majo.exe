import prismaClient from "@majoexe/database";

/**
 * Set Reputation for user
 * @param {string} user The user to set reputation for
 * @param {string} guild The guild to set reputation in
 * @param {number} amount The amount of reputation to set
 * @returns {Promise<number>} The reputation
 */
export async function setReputation(user, guild, amount) {
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
