import prismaClient from "@majoexe/database";
import { getServer } from "@majoexe/util/functions";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
 const id = params.id;
 if (!id) {
  return NextResponse.json(
   {
    error: "Invalid ID",
   },
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
  return NextResponse.json(
   {
    error: "Invalid ID",
   },
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
  return NextResponse.json(
   {
    error: "Invalid ID",
   },
   {
    status: 400,
    headers: {
     "Content-Type": "application/json",
    },
   }
  );
 }

 return NextResponse.json(
  {
   name: server.name,
   description: server.description,
   icon: server.icon ? `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.icon.startsWith("a_") ? "gif" : "png"}` : `${process.env.NEXTAUTH_URL}/assets/avatar.png`,
  },
  {
   headers: {
    "Content-Type": "application/json",
   },
  }
 );
}
