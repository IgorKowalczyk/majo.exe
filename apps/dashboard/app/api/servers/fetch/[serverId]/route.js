import { getServer, getGuildMember } from "@majoexe/util/functions/guild";
import { getSession } from "lib/session";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
 const serverId = params.serverId;
 const start = Date.now();

 if (!serverId) {
  return NextResponse.json(
   {
    error: "Bad Request - incomplete data",
   },
   {
    status: 400,
    headers: {
     ...(process.env.NODE_ENV !== "production" && {
      "Server-Timing": `response;dur=${Date.now() - start}ms`,
     }),
    },
   }
  );
 }
 const session = await getSession();

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
 try {
  const server = await getServer(serverId);

  if (!server || server.error) {
   return NextResponse.json(
    {
     error: "Unable to find this server",
    },
    {
     status: 404,
     headers: {
      ...(process.env.NODE_ENV !== "production" && {
       "Server-Timing": `response;dur=${Date.now() - start}ms`,
      }),
     },
    }
   );
  }

  if (!server.bot) {
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

  const serverMember = await getGuildMember(server.id, session.access_token);

  if (!serverMember || !serverMember.permissions_names || !serverMember.permissions_names.includes("ManageGuild") || !serverMember.permissions_names.includes("Administrator")) {
   return NextResponse.json(
    {
     error: "Unauthorized - you need to log in first",
     code: 401,
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

  return NextResponse.json(
   {
    server,
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
