import { getServers } from "@majoexe/util/functions";
import { isBotInServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { NextResponse } from "next/server";

export async function GET() {
 try {
  const session = await getSession();
  const start = Date.now();

  if (!session || !session.access_token) {
   return new NextResponse(
    JSON.stringify({
     error: "Unauthorized",
    }),
    {
     status: 401,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  const data = (await getServers(session.access_token)) || [];
  if (data.error) {
   return new NextResponse(
    JSON.stringify({
     error: "Unauthorized",
    }),
    {
     status: 401,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }
  const servers =
   (await Promise.all(
    data
     .filter((server) => server.permissions_names.includes("ManageGuild") || server.permissions_names.includes("Administrator"))
     .map(async (server) => {
      server.bot = await isBotInServer(server.id);
      return server;
     })
   )) || [];

  servers.sort((a, b) => (a.bot && !b.bot ? -1 : !a.bot && b.bot ? 1 : 0));

  return new NextResponse(
   JSON.stringify({
    servers: servers || [],
   }),
   {
    status: 200,
    headers: {
     "server-timing": `response;dur=${Date.now() - start}`,
    },
   }
  );
 } catch (err) {
  console.log(err);
  return new NextResponse(
   JSON.stringify({
    error: "Internal Server Error",
   }),
   {
    status: 500,
   }
  );
 }
}
