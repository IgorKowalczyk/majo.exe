import { PrismaAdapter } from "@next-auth/prisma-adapter";
import DiscordProvider from "next-auth/providers/discord";
import { credentials, social } from "config";
import prismaClient from "@majoexe/database";

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
     global_name: profile.username, // TODO: Switch to global_name from Discord API
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
  strategy: "jwt",
  maxAge: 24 * 60 * 60, // 24 hours
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
   return {
    ...token,
    image: token.avatar ? `https://cdn.discordapp.com/avatars/${token.id}/${token.avatar}.${token.avatar.startsWith("a_") ? "gif" : "png"}?size=2048` : `https://cdn.discordapp.com/embed/avatars/${Number(token.discriminator) % 5}.png`,
   };
  },
 },
};

export default authOptions;
