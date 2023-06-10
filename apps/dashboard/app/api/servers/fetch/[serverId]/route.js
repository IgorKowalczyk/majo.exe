import { getServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
 const serverId = params.serverId;
 const start = Date.now();
 if (!serverId) {
  return new NextResponse(
   JSON.stringify({
    error: "Bad Request",
   }),
   {
    status: 400,
    headers: {
     "server-timing": `response;dur=${Date.now() - start}`,
    },
   }
  );
 }
 const session = await getSession();
 if (!session) {
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
 try {
  const server = await getServer(serverId);
  if (!server || server.error) {
   return new NextResponse(
    JSON.stringify({
     error: "Server not found",
    }),
    {
     status: 404,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  return new NextResponse(
   JSON.stringify({
    server,
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
