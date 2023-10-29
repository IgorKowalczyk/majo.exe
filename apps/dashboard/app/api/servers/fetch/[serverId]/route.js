import { getServer, getGuildMember } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
 const serverId = params.serverId;
 const start = Date.now();

 if (!serverId) {
  return new NextResponse.json(
   {
    error: "Bad Request",
   },
   {
    status: 400,
    headers: {
     "server-timing": `response;dur=${Date.now() - start}`,
    },
   }
  );
 }
 const session = await getSession();

 if (!session || !session.access_token) {
  return new NextResponse.json(
   {
    error: "Unauthorized",
   },
   {
    status: 401,
    headers: {
     "server-timing": `response;dur=${Date.now() - start}`,
    },
   }
  );
 }
 try {
  const server = await getServer(serverId);

  if (!server || server.error) {
   return new NextResponse.json(
    {
     error: "Server not found",
    },
    {
     status: 404,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  if (!server.bot) {
   return new NextResponse.json(
    {
     error: "Unauthorized",
    },
    {
     status: 401,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  const serverMember = await getGuildMember(server.id, session.access_token);

  if (!serverMember || !serverMember.permissions_names || !serverMember.permissions_names.includes("ManageGuild") || !serverMember.permissions_names.includes("Administrator")) {
   return new NextResponse.json(
    {
     error: "Unauthorized",
     code: 401,
    },
    {
     status: 401,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  return new NextResponse.json(
   {
    server,
   },
   {
    status: 200,
    headers: {
     "server-timing": `response;dur=${Date.now() - start}`,
    },
   }
  );
 } catch (err) {
  return new NextResponse.json(
   {
    error: "Internal Server Error",
   },
   {
    status: 500,
   }
  );
 }
}
