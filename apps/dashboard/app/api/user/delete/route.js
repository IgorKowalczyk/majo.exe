import prismaClient from "@majoexe/database";
import { getSession } from "lib/session";
import { NextResponse } from "next/server";

export async function POST() {
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
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  const userExists = await prismaClient.user.findFirst({
   where: {
    id: session.sub,
   },
  });

  if (!userExists) {
   return NextResponse.json(
    {
     error: "Unable to find this user",
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

  await prismaClient.user.delete({
   where: {
    id: session.sub,
   },
  });

  return NextResponse.json(
   {
    code: 200,
    message: "Your account has been deleted! We're sad to see you go.",
   },
   {
    status: 200,
    headers: {
     "server-timing": `response;dur=${Date.now() - start}`,
    },
   }
  );
 } catch (error) {
  return NextResponse.json(
   {
    error: "Internal Server Error",
    code: 500,
   },
   {
    status: 500,
   }
  );
 }
}
