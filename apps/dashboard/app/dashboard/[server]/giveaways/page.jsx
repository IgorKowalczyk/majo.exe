import prismaClient from "@majoexe/database";
import { getGuildMember, getServer } from "@majoexe/util/functions/guild";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { Block } from "@/components/Block";
import { Giveaways } from "@/components/client/lists/Giveaways";
import { Header1 } from "@/components/Headers";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/dist/tippy.css";
import { Icons, iconVariants } from "@/components/Icons";

export const metadata = {
 title: "Giveaways",
 description: "View the giveaways for your server.",
};

export default async function GiveawaysPage(props) {
 const params = await props.params;
 const session = await getSession();
 if (!session || !session.access_token) redirect("/auth/login");
 const { server } = params;
 const serverDownload = await getServer(server);
 if (!serverDownload || serverDownload.code === 10004 || !serverDownload.bot) return notFound();
 const serverMember = await getGuildMember(serverDownload.id, session.access_token);
 if (
  // prettier
  !serverMember ||
  !serverMember.permissions_names ||
  !serverMember.permissions_names.includes("ManageGuild") ||
  !serverMember.permissions_names.includes("Administrator")
 )
  return notFound();

 const guild = await prismaClient.guild.upsert({
  where: {
   guildId: serverDownload.id,
  },
  update: {},
  create: {
   guildId: serverDownload.id,
  },
  include: {
   giveaway: {
    orderBy: {
     createdAt: "desc",
    },
   },
  },
 });

 const data = await Promise.all(
  guild.giveaway.map(async (giveaway) => {
   const hostedBy = giveaway.data.hostedBy.replace(/<@!?(\d+)>/g, "$1");
   const startedBy = await prismaClient.user.findUnique({
    where: {
     discordId: hostedBy,
    },
    select: {
     discordId: true,
     global_name: true,
     name: true,
     avatar: true,
    },
   });

   if (startedBy.avatar) startedBy.avatar = `https://cdn.discordapp.com/avatars/${hostedBy}/${startedBy.avatar}.${startedBy.avatar.startsWith("a_") ? "gif" : "png"}` || "https://cdn.discordapp.com/embed/avatars/0.png";

   return {
    id: giveaway.id,
    prize: giveaway.data.prize
     .replace(/<a?:\w+:\d+>/g, "")
     .replace("Giveaway: ", "")
     .trim(),
    winners: giveaway.data.winnerCount,
    time: {
     startedAt: new Date(giveaway.data.startAt),
     ended: new Date(giveaway.data.endAt) < new Date() || giveaway.data.ended,
     endedAt: new Date(giveaway.data.endAt),
    },
    startedBy: startedBy || {
     global_name: "Unknown",
     discordId: hostedBy,
     name: "Unknown",
     avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
    },
   };
  })
 );

 return (
  <>
   <Header1>
    <Icons.gift className={iconVariants({ variant: "extraLarge" })} />
    Giveaways
   </Header1>
   <Block className="mt-4 flex w-full overflow-auto">
    {data.length > 0 ? (
     <Giveaways data={data} />
    ) : (
     <span className="leading-none opacity-50">
      No giveaways found. You can create one by using <code>/giveaway</code> command in chat.
     </span>
    )}
   </Block>
  </>
 );
}
