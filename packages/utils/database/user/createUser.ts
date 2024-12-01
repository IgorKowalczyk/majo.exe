import prismaClient from "@majoexe/database";
import type { APIUser } from "discord-api-types/v10";
import type { User } from "discord.js";
import { isAPIUser } from "../../functions/user";

export async function createUser(user: APIUser | User) {
 try {
  const globalName = (isAPIUser(user) ? user.global_name : user.globalName) || user.username;

  const createdUser = await prismaClient.user.upsert({
   where: {
    discordId: user.id,
   },
   update: {
    name: user.username,
    global_name: globalName,
    avatar: user.avatar,
    discriminator: user.discriminator,
   },
   create: {
    discordId: user.id,
    name: user.username,
    global_name: globalName,
    avatar: user.avatar,
    discriminator: user.discriminator,
   },
  });
  return createdUser;
 } catch (error) {
  console.log("Failed to create user:", error);
  throw error;
 }
}
