import prismaClient from "@majoexe/database";
import { getGuildFromMemberGuilds, getGuild } from "@majoexe/util/functions/guild";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { Block } from "@/components/Block";
import { Giveaways } from "@/components/client/lists/Giveaways";
import Header, { headerVariants } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import type { GiveawayData } from "discord-giveaways";
import { cn } from "@/lib/utils";

export const metadata = {
 title: "Giveaways",
 description: "View the giveaways for your server.",
};

export default async function GiveawaysPage(props: { params: Promise<{ server: string }> }) {
 const params = await props.params;
 const session = await getSession();
 if (!session || !session.access_token) redirect("/auth/login");
 const { server } = params;
 const serverDownload = await getGuild(server);
 if (!serverDownload || !serverDownload.bot) return notFound();
 const serverMember = await getGuildFromMemberGuilds(serverDownload.id, session.access_token);
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
   if (!giveaway.data) return null;

   const data = giveaway.data as unknown as GiveawayData;

   const hostedBy = data.hostedBy ? data.hostedBy.replace(/<@!?(\d+)>/g, "$1") : data.hostedBy;

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

   if (startedBy && startedBy.avatar) startedBy.avatar = `https://cdn.discordapp.com/avatars/${hostedBy}/${startedBy.avatar}.${startedBy.avatar.startsWith("a_") ? "gif" : "png"}` || "https://cdn.discordapp.com/embed/avatars/0.png";

   return {
    id: giveaway.id,
    prize: data.prize
     .replace(/<a?:\w+:\d+>/g, "")
     .replace("Giveaway: ", "")
     .trim(),
    winners: data.winnerCount,
    time: {
     startedAt: new Date(data.startAt),
     ended: new Date(data.endAt) < new Date() || data.ended,
     endedAt: new Date(data.endAt),
    },
    startedBy: startedBy,
   };
  })
 ).then((data) => data.filter((x) => x !== null));

 return (
  <>
   <Header className={cn(headerVariants({ variant: "h1", margin: "normal" }))}>
    <Icons.Gift className={iconVariants({ variant: "extraLarge" })} />
    Giveaways
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">Create and manage giveaways for your server, let your members win some cool prizes</p>
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
