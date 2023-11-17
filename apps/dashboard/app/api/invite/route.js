import { globalPermissions } from "@majoexe/config/permissions";
import { NextResponse } from "next/server";

export const runtime = "edge";

export function GET() {
 return NextResponse.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=${globalPermissions.permissions}&scope=guilds%20identify%20${globalPermissions.scopes}&redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL + "/dashboard")}&response_type=code`);
}
