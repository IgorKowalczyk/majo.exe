import { NextResponse } from "next/server";
import prismaClient from "@majoexe/database";
import { getServer } from "@majoexe/util/functions";

export async function GET(request, { params }) {
 const id = params.id;
 if (!id) {
  return new NextResponse(
   JSON.stringify({
    error: "Invalid ID",
   }),
   {
    status: 400,
    headers: {
     "Content-Type": "application/json",
    },
   }
  );
 }

 const server = await getServer(id);
 if (server.error || !server.bot) {
  return new NextResponse(
   JSON.stringify({
    error: "Invalid ID",
   }),
   {
    status: 400,
    headers: {
     "Content-Type": "application/json",
    },
   }
  );
 }

 const guild = await prismaClient.guild.findFirst({
  where: {
   guildId: id,
  },
 });

 if (!guild || !guild.guildId || !guild.publicPage) {
  return new NextResponse(
   JSON.stringify({
    error: "Invalid ID",
   }),
   {
    status: 400,
    headers: {
     "Content-Type": "application/json",
    },
   }
  );
 }

 return new NextResponse(
  JSON.stringify({
   name: server.name,
   description: server.description,
   icon: server.icon ? `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.icon.startsWith("a_") ? "gif" : "png"}` : `${process.env.NEXTAUTH_URL}/assets/avatar.png`,
  }),
  {
   headers: {
    "Content-Type": "application/json",
   },
  }
 );
}
