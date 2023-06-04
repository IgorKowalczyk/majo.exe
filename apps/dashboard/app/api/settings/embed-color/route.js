import prismaClient from "@majoexe/database";
import { getServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { NextResponse } from "next/server";

export async function POST(request) {
 try {
  const session = await getSession();
  console.log(session);
  if (!session || !session.access_token) return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  const cloned = await request.clone();
  const body = await cloned.json();
  const { id, color } = body;
  if (!id || !color) return new NextResponse(JSON.stringify({ error: "Bad Request", code: 400 }), { status: 400 });
  const server = await getServer(id);
  if (!server) return new NextResponse(JSON.stringify({ error: "Server not found", code: 404 }), { status: 404 });
  if (server.error) return new NextResponse(JSON.stringify({ error: "Server not found", code: 404 }), { status: 404 });
  if (!server.bot) return new NextResponse(JSON.stringify({ error: "Bot is not in server", code: 404 }), { status: 404 });
  if (!/^#[0-9A-F]{6}$/i.test(color)) return new NextResponse(JSON.stringify({ error: "Invalid color", code: 400 }), { status: 400 });

  const current = await prismaClient.guild.findUnique({
   where: {
    guildId: id,
   },
  });

  if (!current) {
   await prismaClient.guild.create({
    data: {
     guildId: id,
     embedColor: color,
     embedLastChanged: new Date(),
    },
   });

   await prismaClient.guildLogs.create({
    data: {
     guild: {
      connect: {
       guildId: id,
      },
     },
     user: {
      connect: {
       id: session.sub,
      },
     },
     content: `Changed global embed color to ${color}`,
     type: "embed_color",
    },
   });

   return new NextResponse(JSON.stringify({ message: "Embed color updated", code: 200 }), { status: 200 });
  }

  if (current.embedColor === color) return new NextResponse(JSON.stringify({ error: "Embed color is already set to that", code: 400 }), { status: 200 });
  if (new Date().getTime() - current.embedLastChanged.getTime() < 10000) return new NextResponse(JSON.stringify({ error: "You can only change the embed color every 10 seconds", code: 400 }), { status: 200 });
  await prismaClient.guild.update({
   where: {
    guildId: id,
   },
   data: {
    embedColor: color,
    embedLastChanged: new Date(),
   },
  });

  await prismaClient.guildLogs.create({
   data: {
    guild: {
     connect: {
      guildId: id,
     },
    },
    user: {
     connect: {
      id: session.sub,
     },
    },
    content: `Changed global embed color to ${color}`,
    type: "embed_color",
   },
  });
  return new NextResponse(JSON.stringify({ message: "Embed color updated", code: 200 }), { status: 200 });
 } catch (err) {
  console.log(err);
  return new NextResponse(JSON.stringify({ error: "Internal Server Error", code: 500 }), { status: 500 });
 }
}

export async function PUT(request) {
 try {
  const session = await getSession();
  if (!session || !session.access_token) return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  const cloned = await request.clone();
  const body = await cloned.json();
  const { id } = body;
  if (!id) return new NextResponse(JSON.stringify({ error: "Bad Request", code: 400 }), { status: 400 });
  const server = await getServer(id);
  if (!server) return new NextResponse(JSON.stringify({ error: "Server not found", code: 404 }), { status: 404 });
  if (server.error) return new NextResponse(JSON.stringify({ error: "Server not found", code: 404 }), { status: 404 });
  if (!server.bot) return new NextResponse(JSON.stringify({ error: "Bot is not in server", code: 404 }), { status: 404 });

  const current = await prismaClient.guild.findUnique({
   where: {
    guildId: id,
   },
  });

  if (!current) {
   await prismaClient.guild.create({
    data: {
     guildId: id,
     embedColor: "#5865F2",
    },
   });

   await prismaClient.guildLogs.create({
    data: {
     guild: {
      connect: {
       guildId: id,
      },
     },
     user: {
      connect: {
       id: session.sub,
      },
     },
     content: "Changed global embed color to default",
     type: "embed_color",
    },
   });

   return new NextResponse(JSON.stringify({ message: "Embed color updated", code: 200 }), { status: 200 });
  }

  if (current.embedColor === "#5865F2") return new NextResponse(JSON.stringify({ error: "Embed color is already set to that", code: 400 }), { status: 200 });
  if (new Date().getTime() - current.embedLastChanged.getTime() < 10000) return new NextResponse(JSON.stringify({ error: "You can only change the embed color every 10 seconds", code: 400 }), { status: 200 });

  await prismaClient.guild.update({
   where: {
    guildId: id,
   },
   data: {
    embedColor: "#5865F2",
    embedLastChanged: new Date(),
   },
  });

  await prismaClient.guildLogs.create({
   data: {
    guild: {
     connect: {
      guildId: id,
     },
    },
    user: {
     connect: {
      id: session.sub,
     },
    },
    content: "Changed global embed color to default",
    type: "embed_color",
   },
  });
  return new NextResponse(JSON.stringify({ message: "Embed color updated", code: 200 }), { status: 200 });
 } catch (err) {
  console.log(err);
  return new NextResponse(JSON.stringify({ error: "Internal Server Error", code: 500 }), { status: 500 });
 }
}
