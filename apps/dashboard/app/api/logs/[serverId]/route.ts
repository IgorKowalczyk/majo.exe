import { fetchLogs } from "@majoexe/util/database";
import { getGuild, getGuildFromMemberGuilds } from "@majoexe/util/functions/guild";
import { getSession } from "lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, props: { params: Promise<{ serverId: string }> }) {
 const params = await props.params;
 try {
  const { serverId } = params;
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1", 10);
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

  const server = await getGuild(serverId);

  if (!server || ("error" in server && server.error)) {
   return NextResponse.json(
    {
     error: "Unable to find this server",
     code: 404,
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

  if (!("bot" in server) || !server.bot) {
   return NextResponse.json(
    {
     error: "Bot is unable to find this server",
     code: 404,
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

  const serverMember = await getGuildFromMemberGuilds(server.id, session.access_token);

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

  const logs = await fetchLogs(serverId, page);
  const newLogs = logs.map((log) => {
   return {
    ...log,
    createdAt: new Date(log.createdAt).toISOString(),
   };
  });

  /* eslint-disable func-names */
  (BigInt.prototype as any).toJSON = function() {
   return this.toString();
  };

  return NextResponse.json(newLogs, {
   status: 200,
   headers: {
    ...(process.env.NODE_ENV !== "production" && {
     "Server-Timing": `response;dur=${Date.now() - start}ms`,
    }),
   },
  });
 } catch (err) {
  console.log(err);
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
