import { getDiscordUser } from "@majoexe/util/functions/user";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
 const params = await props.params;
 try {
  const { id } = params;

  if (!id || !/^\d{17,19}$/.test(id)) return redirect("/assets/fallback.webp");

  const user = await getDiscordUser(id);
  if (!user || !user.avatar) return redirect("/assets/fallback.webp");

  if (user.avatar.startsWith("a_")) return NextResponse.redirect(`https://cdn.discordapp.com/avatars/${id}/${user.avatar}.gif?size=1024`);
  return NextResponse.redirect(`https://cdn.discordapp.com/avatars/${id}/${user.avatar}.webp?size=1024`);
 } catch (_error) {
  return redirect("/assets/fallback.webp");
 }
}
