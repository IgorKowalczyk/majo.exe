import prismaClient from "@majoexe/database";
import { getGuildFromMemberGuilds, getGuild } from "@majoexe/util/functions/guild";
import { fillMissingDates, sumArray } from "@majoexe/util/functions/util";
import { json2csv } from "json-2-csv";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { GraphCard } from "@/components/Card";
import { ServerStatsChart } from "@/components/client/charts/ServerStatsChart";
import { Icons, iconVariants } from "@/components/Icons";
import Header, { headerVariants } from "@/components/Headers";
import { cn } from "@/lib/utils";

export default async function Page(props: { params: Promise<{ server: string }> }) {
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
  select: {
   guildJoin: true,
   guildLeave: true,
   guildMessage: true,
  },
 });

 const mapGuildData = (data: any[], key: string) =>
  data.map((item) => ({
   date: item.date.toISOString().split("T")[0],
   [key]: item[key.toLowerCase()],
  }));

 const guildJoin = mapGuildData(guild.guildJoin, "Joins");
 const guildLeave = mapGuildData(guild.guildLeave, "Leaves");
 const guildMessage = mapGuildData(guild.guildMessage, "Messages");

 const guildJoinData = fillMissingDates(guildJoin, "Joins");
 const guildLeaveData = fillMissingDates(guildLeave, "Leaves");
 const guildMessageData = fillMissingDates(guildMessage, "Messages");

 const guildJoinCSV = json2csv(guildJoin);
 const guildLeaveCSV = json2csv(guildLeave);
 const guildMessageCSV = json2csv(guildMessage);

 const newMembers = sumArray(guildJoin.slice(-7), "Joins") - sumArray(guildLeave.slice(-7), "Leaves");
 const membersLeft = sumArray(guildLeave.slice(-7), "Leaves");
 const newMessages = sumArray(guildMessage.slice(-7), "Messages");

 return (
  <>
   <Header className={cn(headerVariants({ variant: "h1", margin: "normal" }))}>
    <Icons.TrendingUp className={iconVariants({ variant: "extraLarge" })} />
    Statistics
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">Here you can view the statistics of your server, see how it's been doing recently.</p>
   <div className="mb-4 grid grid-cols-1 gap-0 md:grid-cols-1 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
    <GraphCard // prettier
     className="mt-0"
     icon={<Icons.userAdd className={iconVariants({ variant: "extraLarge" })} />}
     title="New Members"
     description="Amount of new members that joined your server in the last 7 days."
     value={newMembers.toString()}
     graph={newMembers === 0 ? <Icons.Minus className={iconVariants({ variant: "normal" })} /> : newMembers < 0 ? <Icons.TrendingDown className={iconVariants({ variant: "normal" })} /> : <Icons.TrendingUp className={iconVariants({ variant: "normal" })} />}
    />
    <GraphCard // prettier
     className="mt-0"
     icon={<Icons.userMinus className={iconVariants({ variant: "extraLarge" })} />}
     title="Members Left"
     description="Amount of members that left your server in the last 7 days."
     value={membersLeft.toString()}
     graph={membersLeft === 0 ? <Icons.Minus className={iconVariants({ variant: "normal" })} /> : membersLeft < 0 ? <Icons.TrendingDown className={iconVariants({ variant: "normal" })} /> : <Icons.TrendingUp className={iconVariants({ variant: "normal" })} />}
    />
    <GraphCard // prettier
     className="col-span-1 mt-0 lg:col-span-2 xl:col-span-1"
     icon={<Icons.commentAdd className={iconVariants({ variant: "extraLarge" })} />}
     title="New Messages"
     description="The amount of messages that were sent in your server in the last 7 days."
     value={newMessages.toString()}
     graph={newMessages === 0 ? <Icons.Minus className={iconVariants({ variant: "normal" })} /> : newMessages < 0 ? <Icons.TrendingDown className={iconVariants({ variant: "normal" })} /> : <Icons.TrendingUp className={iconVariants({ variant: "normal" })} />}
    />
   </div>
   <ServerStatsChart guildJoin={guildJoinData} guildLeave={guildLeaveData} guildJoinCSV={guildJoinCSV} guildLeaveCSV={guildLeaveCSV} guildMessage={guildMessageData} guildMessageCSV={guildMessageCSV} />
  </>
 );
}
