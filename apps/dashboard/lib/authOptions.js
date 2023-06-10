/* eslint-disable func-names, space-before-function-paren */

import prismaClient from "@majoexe/database";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { credentials } from "config";
import DiscordProvider from "next-auth/providers/discord";

const authOptions = {
 adapter: PrismaAdapter(prismaClient),
 providers: [
  DiscordProvider({
   clientId: credentials.clientId,
   clientSecret: credentials.clientSecret,
   authorization: { params: { scope: "identify email guilds" } },
   profile(profile) {
    return {
     id: profile.id,
     discordId: profile.id,
     name: profile.username,
     global_name: profile.global_name,
     avatar: profile.avatar,
     discriminator: profile.discriminator,
     public_flags: profile.public_flags,
     flags: profile.flags,
     locale: profile.locale,
     nitro: profile.premium_type,
     verified: profile.verified,
     email: profile.email,
    };
   },
  }),
 ],
 pages: {
  signIn: "/auth/login",
  signOut: "/auth/signout",
 },
 secret: credentials.secret,
 session: {
  strategy: "database",
  maxAge: 24 * 60 * 60, // 24 hours
  updateAge: 60 * 30, // 30 minutes
 },
 callbacks: {
  async session({ session, token, user }) {
   BigInt.prototype.toJSON = function () {
    return this.toString();
   };
   if (user.avatar) {
    user.image = `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.${user.avatar.startsWith("a_") ? "gif" : "png"}?size=2048`;
   } else if (user.discriminator !== "0") {
    user.image = `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator) % 5}.png`;
   } else {
    user.image = `https://cdn.discordapp.com/embed/avatars/${(user.id >> 22) % 6}.png`;
   }

   return {
    ...session,
    ...token,
    ...user,
   };
  },
 },
};

export default authOptions;
