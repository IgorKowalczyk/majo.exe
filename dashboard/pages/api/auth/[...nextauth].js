import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { credentials, social } from "@/config";

// https://next-auth.js.org/configuration/options
export const authOptions = {
 providers: [
  DiscordProvider({
   clientId: credentials.clientId,
   clientSecret: credentials.clientSecret,
  }),
 ],
 pages: {
  signIn: "/auth/signin",
  signOut: "/auth/signout",
 },
 secret: credentials.secret,
 session: {
  strategy: "jwt",
  maxAge: 30 * 24 * 60 * 60, // 30 days
 },
 theme: {
  colorScheme: "auto", // "auto" | "dark" | "light"
  brandColor: "#111927",
  logo: social.logo,
  buttonText: "#000000",
 },
 callbacks: {
  async jwt({ token }) {
   token.userRole = "admin";
   return token;
  },
 },
};

export default NextAuth(authOptions);
