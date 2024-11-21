import prismaClient from "@majoexe/database";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Account, AuthOptions, DefaultSession } from "next-auth";
import DiscordProvider, { DiscordProfile } from "next-auth/providers/discord";

declare module "next-auth" {
 interface Session extends DefaultSession, Account, DiscordProfile {}
}

const authOptions = {
 adapter: PrismaAdapter(prismaClient),
 providers: [
  DiscordProvider({
   clientId: process.env.CLIENT_ID as string,
   clientSecret: process.env.CLIENT_SECRET as string,
   authorization: { params: { scope: "identify guilds guilds.join" } },
   async profile(profile, tokens) {
    if (tokens.access_token && process.env.DISCORD_SUPPORT_SERVER_ID) {
     try {
      await fetch(`https://discord.com/api/guilds/${process.env.DISCORD_SUPPORT_SERVER_ID}/members/${profile.id}`, {
       method: "PUT",
       body: JSON.stringify({
        access_token: tokens.access_token,
       }),
       headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${process.env.TOKEN}`,
       },
      });
     } catch (error) {
      console.log("Failed to add user to support server, error: ", error);
     }
    }

    const user = await prismaClient.user.upsert({
     where: {
      discordId: profile.id,
     },
     update: {
      name: profile.username,
      global_name: profile.global_name || profile.username,
      avatar: profile.avatar,
      discriminator: profile.discriminator ?? "0",
      public_flags: profile.public_flags,
      flags: profile.flags,
      locale: profile.locale,
      nitro: profile.premium_type,
      lastLogin: new Date(),
     },
     create: {
      discordId: profile.id,
      name: profile.username,
      global_name: profile.global_name || profile.username,
      avatar: profile.avatar,
      discriminator: profile.discriminator ?? "0",
      public_flags: profile.public_flags,
      flags: profile.flags,
      locale: profile.locale,
      nitro: profile.premium_type,
      lastLogin: new Date(),
     },
     include: {
      accounts: true,
     },
    });

    if (user && (!user.accounts || user.accounts.length === 0)) {
     await prismaClient.account.create({
      data: {
       userId: user.id,
       type: "oauth",
       provider: "discord",
       providerAccountId: profile.id,
       access_token: tokens.access_token,
       refresh_token: tokens.refresh_token,
       expires_at: tokens.expires_at,
       token_type: tokens.token_type,
       scope: tokens.scope,
       id_token: tokens.id_token,
       session_state: tokens.session_state,
      },
     });
    }

    return {
     id: profile.id,
     discordId: profile.id,
     name: profile.username,
     global_name: profile.global_name || profile.username,
     avatar: profile.avatar,
     discriminator: profile.discriminator ?? "0",
     public_flags: profile.public_flags,
     flags: profile.flags,
     locale: profile.locale,
     nitro: profile.premium_type,
    };
   },
  }),
 ],
 pages: {
  signIn: "/auth/login",
  signOut: "/auth/signout",
 },
 secret: process.env.SECRET,
 session: {
  strategy: "jwt",
  maxAge: 1 * 60 * 60, // 1 hour
 },
 callbacks: {
  jwt({ token, account, profile }) {
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
  session({ session, token }) {
   token.avatar = `${process.env.NEXTAUTH_URL}/api/user/avatar/${token.id}`;

   return {
    ...token,
    ...session,
   };
  },
 },
} satisfies AuthOptions;

export default authOptions;
