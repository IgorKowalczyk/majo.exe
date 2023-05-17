import { getServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
 const serverId = params.serverId;
 if (!serverId)
  return new NextResponse(
   JSON.stringify({
    error: "Bad Request",
   }),
   {
    status: 400,
   }
  );
 const session = await getSession();
 if (!session)
  return new NextResponse(
   JSON.stringify({
    error: "Unauthorized",
   }),
   {
    status: 401,
   }
  );
 try {
  const server = await getServer(serverId);
  if (!server)
   return new NextResponse(
    JSON.stringify({
     error: "Server not found",
    }),
    {
     status: 404,
    }
   );
  if (server.error)
   return new NextResponse(
    JSON.stringify({
     error: "Server not found",
    }),
    {
     status: 404,
    }
   );
  return new NextResponse(
   JSON.stringify({
    server,
   }),
   {
    status: 200,
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
