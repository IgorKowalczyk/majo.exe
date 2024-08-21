import prismaClient from "@majoexe/database";

/**
 * Create a user in the database
 *
 * @param {Object} user - The user object containing user details.
 * @returns {Promise<boolean>} - Whether the user was created
 * @throws {Error} - Throws an error if the operation fails.
 */
export async function createUser(user) {
 try {
  const createdUser = await prismaClient.user.upsert({
   where: {
    discordId: user.id,
   },
   update: {
    name: user.username,
    global_name: user.globalName || user.username,
    avatar: user.avatar,
    discriminator: user.discriminator,
   },
   create: {
    discordId: user.id,
    name: user.username,
    global_name: user.globalName || user.username,
    avatar: user.avatar,
    discriminator: user.discriminator,
   },
  });
  return createdUser;
 } catch (e) {
  console.log("Failed to create user:", e);
  throw e;
 }
}
