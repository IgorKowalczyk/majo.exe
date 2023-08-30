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
     global_name: profile.global_name || profile.username,
     avatar: profile.avatar,
     discriminator: profile.discriminator !== "0" ? profile.discriminator : "0",
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
  strategy: "jwt",
  maxAge: 1 * 60 * 60, // 1 hour
 },
 callbacks: {
  async jwt({ token, account, profile }) {
   if (account) {
    token = {
     ...token,
     ...account,
     ...profile,
    };
    return token;
   } else {
    return token;
   }
  },
  async session({ token }) {
   if (token.avatar) {
    token.image = `https://cdn.discordapp.com/avatars/${token.id}/${token.avatar}.${token.avatar.startsWith("a_") ? "gif" : "png"}?size=2048`;
   } else if (token.discriminator !== "0") {
    token.image = `https://cdn.discordapp.com/embed/avatars/${Number(token.discriminator) % 5}.png`;
   } else {
    token.image = `https://cdn.discordapp.com/embed/avatars/${(token.id >> 22) % 6}.png`;
   }

   return {
    ...token,
   };
  },
 },
};

export default authOptions;
