import prismaClient from "@majoexe/database";
import { getServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
 const serverId = params.serverId;
 const { searchParams } = new URL(request.url);
 const page = Number.parseInt(searchParams.get("page") || "1", 10);
 if (!serverId) return new NextResponse(JSON.stringify({ error: "Bad Request" }), { status: 400 });
 const session = await getSession();
 if (!session) return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
 const server = await getServer(serverId);
 if (!server) return new NextResponse(JSON.stringify({ error: "Server not found" }), { status: 404 });
 if (server.error) return new NextResponse(JSON.stringify({ error: "Server not found" }), { status: 404 });
 if (!server.bot) return new NextResponse(JSON.stringify({ error: "Bot is not in server" }), { status: 404 });

 const logs = await prismaClient.guildLogs.findMany({
  where: {
   guildId: serverId,
  },
  take: 20,
  skip: (page - 1) * 20,
  orderBy: {
   createdAt: "desc",
  },
 });

 return new NextResponse(JSON.stringify(logs), { status: 200 });
}
