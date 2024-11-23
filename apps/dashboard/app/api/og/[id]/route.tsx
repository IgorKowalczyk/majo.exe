/* eslint-disable next/no-img-element */
import { getGuild } from "@majoexe/util/functions/guild";
import { shortenText } from "@majoexe/util/functions/util";
import { redirect } from "next/navigation";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
 const params = await props.params;
 const { id } = params;
 if (!id) return redirect("/opengraph-image");

 const server = await getGuild(id);
 if (!server || !server.bot) return redirect("/opengraph-image");

 const icon = server.icon ? `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.icon.startsWith("a_") ? "gif" : "png"}` : `${process.env.NEXTAUTH_URL}/assets/avatar.png`;

 const fontBold = await fetch(new URL("public/fonts/bold.ttf", import.meta.url)).then((res) => res.arrayBuffer());
 const fontRegular = await fetch(new URL("public/fonts/regular.ttf", import.meta.url)).then((res) => res.arrayBuffer());

 return new ImageResponse(
  (
   <div
    style={{
     height: "100%",
     width: "100%",
     display: "flex",
     flexDirection: "column",
     alignItems: "center",
     justifyContent: "center",
     backgroundColor: "#101110",
     fontFamily: "PoppinsBold",
     fontSize: 64,
     fontWeight: 900,
     boxShadow: "inset 0px 0px 277px 3px #101110",
     backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255,255,255,0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
    }}
   >
    <img src={icon} alt="avatar" style={{ width: "125px", height: "125px", marginBottom: "20px", borderRadius: "50%", boxShadow: "0px 0px 277px 3px #101110" }} />
    <div
     style={{
      backgroundImage: "linear-gradient(to bottom, rgb(255, 255, 255), rgb(163, 163, 163))",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      color: "transparent",
      fontFamily: "PoppinsBold",
     }}
    >
     {shortenText(server.name)}
    </div>
    <div
     style={{
      color: "rgba(255, 255, 255, 0.5)",
      fontFamily: "PoppinsRegular",
      fontSize: 32,
      textAlign: "center",
      maxWidth: "80%",
      marginTop: "15px",
     }}
    >
     {shortenText(server.description || "This server has no description", 100)}
    </div>
   </div>
  ),
  {
   width: 1200,
   height: 630,
   fonts: [
    {
     name: "PoppinsBold",
     data: fontBold,
     style: "normal",
     weight: 900,
    },
    {
     name: "PoppinsRegular",
     data: fontRegular,
     style: "normal",
     weight: 400,
    },
   ],
  }
 );
}
