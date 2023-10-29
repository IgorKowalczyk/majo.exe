import { fetchLogs } from "@majoexe/util/database";
import { getServer, getGuildMember } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
 try {
  const serverId = params.serverId;
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1", 10);
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

  const server = await getServer(serverId);

  if (!server || server.error) {
   return new NextResponse.json(
    {
     error: "Server not found",
     code: 404,
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
     error: "Bot is not in server",
     code: 404,
    },
    {
     status: 404,
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

  const logs = await fetchLogs(serverId, page);

  logs.forEach((log) => {
   log.createdAt = log.createdAt.toISOString();
  });

  /* eslint-disable func-names, space-before-function-paren */
  BigInt.prototype.toJSON = function () {
   return this.toString();
  };
  /* eslint-enable func-names, space-before-function-paren */

  return new NextResponse.json(
   {
    logs,
   },
   {
    status: 200,
    headers: {
     "server-timing": `response;dur=${Date.now() - start}`,
    },
   }
  );
 } catch (err) {
  console.log(err);
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
