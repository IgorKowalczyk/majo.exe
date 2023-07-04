import { NextResponse } from "next/server";
import { config } from "@majoexe/config";
export const runtime = "edge";

export function GET(request, { params }) {
 const invite = params.invite;
 if (!invite) return NextResponse.redirect("/dashboard");
 return NextResponse.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=${config.global.permissions}&scope=${config.global.scopes}%20identifys&guild_id=${invite}&redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL + "/dashboard")}&response_type=code`);
}
