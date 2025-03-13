import prismaClient from "@majoexe/database";
import { getGuildFromMemberGuilds, getGuild } from "@majoexe/util/functions/guild";
import { fillMissingDates, sumArray } from "@majoexe/util/functions/util";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { StatisticCharts } from "@/app/dashboard/[server]/statistics/components/StatisticCharts";
import { ChartConfig } from "@/components/ui/Chart";
import { GraphCard } from "@/components/ui/GraphCard";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export const statisticsChartConfig = {
 Joins: {
  label: "Members Joined",
  color: "hsl(var(--chart-blue))",
 },
 Leaves: {
  label: "Members Left",
  color: "hsl(var(--chart-red))",
 },
 Messages: {
  label: "Messages Sent",
  color: "hsl(var(--chart-blue))",
 },
} satisfies ChartConfig;

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

 const newMembers = sumArray(guildJoin.slice(-7), "Joins") - sumArray(guildLeave.slice(-7), "Leaves");
 const membersLeft = sumArray(guildLeave.slice(-7), "Leaves");
 const newMessages = sumArray(guildMessage.slice(-7), "Messages");

 return (
  <>
   <Header className={cn(headerVariants({ variant: "h1", margin: "normal" }))}>
    <Icons.TrendingUp className={iconVariants({ variant: "extraLarge" })} />
    Statistics
   </Header>
   <div className="mb-4 grid grid-cols-1 gap-0 md:grid-cols-1 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
    <GraphCard className="mt-0" icon={<Icons.userAdd className={iconVariants({ variant: "extraLarge" })} />} title="New Members" description="Amount of new members that joined your server in the last 7 days." value={newMembers.toString()} graph={newMembers === 0 ? <Icons.Minus className={iconVariants({ variant: "normal" })} /> : newMembers < 0 ? <Icons.TrendingDown className={iconVariants({ variant: "normal" })} /> : <Icons.TrendingUp className={iconVariants({ variant: "normal" })} />} />
    <GraphCard className="mt-0" icon={<Icons.userMinus className={iconVariants({ variant: "extraLarge" })} />} title="Members Left" description="Amount of members that left your server in the last 7 days." value={membersLeft.toString()} graph={membersLeft === 0 ? <Icons.Minus className={iconVariants({ variant: "normal" })} /> : membersLeft < 0 ? <Icons.TrendingDown className={iconVariants({ variant: "normal" })} /> : <Icons.TrendingUp className={iconVariants({ variant: "normal" })} />} />
    <GraphCard className="mt-0" icon={<Icons.commentAdd className={iconVariants({ variant: "extraLarge" })} />} title="New Messages" description="The amount of messages that were sent in your server in the last 7 days." value={newMessages.toString()} graph={newMessages === 0 ? <Icons.Minus className={iconVariants({ variant: "normal" })} /> : newMessages < 0 ? <Icons.TrendingDown className={iconVariants({ variant: "normal" })} /> : <Icons.TrendingUp className={iconVariants({ variant: "normal" })} />} />
   </div>
   <StatisticCharts guildJoin={fillMissingDates(guildJoin, "Joins")} guildLeave={fillMissingDates(guildLeave, "Leaves")} guildMessage={fillMissingDates(guildMessage, "Messages")} chartConfig={statisticsChartConfig} />
  </>
 );
}
