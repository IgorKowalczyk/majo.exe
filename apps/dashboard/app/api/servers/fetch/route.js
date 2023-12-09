import { getServers, isBotInServer } from "@majoexe/util/functions/guild";
import { getSession } from "lib/session";
import { NextResponse } from "next/server";

export async function GET() {
 try {
  const session = await getSession();
  const start = Date.now();

  if (!session || !session.access_token) {
   return NextResponse.json(
    {
     error: "Unauthorized - you need to log in first",
    },
    {
     status: 401,
     headers: {
      ...(process.env.NODE_ENV !== "production" && {
       "Server-Timing": `response;dur=${Date.now() - start}ms`,
      }),
     },
    }
   );
  }

  const data = (await getServers(session.access_token)) || [];
  if (data.error) {
   return NextResponse.json(
    {
     error: "Unauthorized - you need to log in first",
    },
    {
     status: 401,
     headers: {
      ...(process.env.NODE_ENV !== "production" && {
       "Server-Timing": `response;dur=${Date.now() - start}ms`,
      }),
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

  return NextResponse.json(
   {
    servers: servers || [],
   },
   {
    status: 200,
    headers: {
     ...(process.env.NODE_ENV !== "production" && {
      "Server-Timing": `response;dur=${Date.now() - start}ms`,
     }),
    },
   }
  );
 } catch (err) {
  return NextResponse.json(
   {
    error: "Internal Server Error",
   },
   {
    status: 500,
   }
  );
 }
}
