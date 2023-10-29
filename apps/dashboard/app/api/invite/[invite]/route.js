import { NextResponse } from "next/server";

export const runtime = "edge";

export function GET(request, { params }) {
 const invite = params.invite;
 if (!invite) return NextResponse.redirect(new URL("/dashboard", request.url));
 return NextResponse.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=1916267615&scope=guilds%20identify%20bot%20applications.commands&guild_id=${invite}&redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL + "/dashboard")}&response_type=code`);
}
