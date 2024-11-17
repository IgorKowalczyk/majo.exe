import { redirect } from "next/navigation";
import { globalConfig } from "@majoexe/config";
import { NextResponse } from "next/server";
import type { APIUser } from "discord-api-types/v10";

export async function GET(request, props) {
 const params = await props.params;
 try {
  const { id } = params;

  if (!id || !/^\d{17,19}$/.test(id)) return redirect("/assets/fallback.webp");

  const discordApiFetch = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/users/${id}`, {
   headers: {
    "Content-Type": "application/json",
    Authorization: `Bot ${process.env.TOKEN}`,
   },
  });

  if (!discordApiFetch.ok) return redirect("/assets/fallback.webp");

  const user: APIUser = await discordApiFetch.json();
  if (!user || !user.avatar) return redirect("/assets/fallback.webp");

  return NextResponse.redirect(`https://cdn.discordapp.com/avatars/${id}/${user.avatar}.webp?size=1024`);
 } catch (error) {
  return redirect("/assets/fallback.webp");
 }
}
