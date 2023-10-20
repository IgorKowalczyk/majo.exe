import prismaClient from "@majoexe/database";

/**
 * Create a user in the database
 * @param {string} user The user object to create
 * @returns {Promise<boolean>} Whether the user was created
 */
export async function createUser(user) {
 try {
  await prismaClient.user.create({
   data: {
    discordId: user.id,
    name: user.username,
    global_name: user.globalName || user.username,
    avatar: user.avatar,
    discriminator: user.discriminator,
   },
  });
  return true;
 } catch (e) {
  console.log("Failed to create user:", e);
  throw e;
 }
}
