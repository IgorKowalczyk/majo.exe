import authOptions from "lib/authOptions";
import { Account, DefaultSession } from "next-auth";
import { getServerSession } from "next-auth/next";
import { DiscordProfile } from "next-auth/providers/discord";

export async function getSession() {
 return (await getServerSession(authOptions)) as DefaultSession & Account & DiscordProfile;
}

export async function getCurrentUser() {
 const session = await getSession();

 return session?.user;
}
