/* eslint-disable complexity */

import prismaClient from "@majoexe/database";
import { getGuildMember, getServer } from "@majoexe/util/functions/guild";
import { fillMissingDates } from "@majoexe/util/functions/util";
import { json2csv } from "json-2-csv";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { GraphCard } from "@/components/Card";
import { ServerStatsChart } from "@/components/client/charts/ServerStatsChart";
import { Icons, iconVariants } from "@/components/Icons";

export default async function StatisticsPage({ params }) {
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
  select: {
   guildJoin: true,
   guildLeave: true,
   guildMessage: true,
  },
 });

 const sumArray = (array, metric) => array.reduce((accumulator, currentValue) => accumulator + currentValue[metric], 0);

 let guildJoin = guild.guildJoin.map((guildJoinData) => ({
  date: guildJoinData.date.toISOString().split("T")[0],
  Joins: guildJoinData.joins,
 }));

 let guildLeave = guild.guildLeave.map((guildLeaveData) => ({
  date: guildLeaveData.date.toISOString().split("T")[0],
  Leaves: guildLeaveData.leaves,
 }));

 let guildMessage = guild.guildMessage.map((guildMessageData) => ({
  date: guildMessageData.date.toISOString().split("T")[0],
  Messages: guildMessageData.messages,
 }));

 guildJoin = fillMissingDates(guildJoin, "Joins");
 guildLeave = fillMissingDates(guildLeave, "Leaves");
 guildMessage = fillMissingDates(guildMessage, "Messages");

 const guildJoinCSV = json2csv(guildJoin);
 const guildLeaveCSV = json2csv(guildLeave);
 const guildMessageCSV = json2csv(guildMessage);

 const newMembers = sumArray(guildJoin.slice(-7), "Joins") - sumArray(guildLeave.slice(-7), "Leaves");
 const membersLeft = sumArray(guildLeave.slice(-7), "Leaves");
 const newMessages = sumArray(guildMessage.slice(-7), "Messages");

 return (
  <>
   <div className="mb-4 grid grid-cols-1 gap-0 md:grid-cols-1 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
    <GraphCard
     className="mt-0"
     data={{
      icon: <Icons.userAdd className={iconVariants({ variant: "extraLarge" })} />,
      title: "New Members",
      description: "Amount of new members that joined your server in the last 7 days.",
      value: newMembers,
      graph: newMembers === 0 ? <Icons.minus className={iconVariants({ variant: "normal" })} /> : newMembers < 0 ? <Icons.trendingDown className={iconVariants({ variant: "normal" })} /> : <Icons.trendingUp className={iconVariants({ variant: "normal" })} />,
     }}
    />
    <GraphCard
     className="mt-0"
     data={{
      icon: <Icons.userMinus className={iconVariants({ variant: "extraLarge" })} />,
      title: "Members Left",
      description: "Amount of members that left your server in the last 7 days.",
      value: membersLeft,
      graph: membersLeft === 0 ? <Icons.minus className={iconVariants({ variant: "normal" })} /> : membersLeft < 0 ? <Icons.trendingDown className={iconVariants({ variant: "normal" })} /> : <Icons.trendingUp className={iconVariants({ variant: "normal" })} />,
     }}
    />
    <GraphCard
     className="col-span-1 mt-0 lg:col-span-2 xl:col-span-1"
     data={{
      icon: <Icons.commentAdd className={iconVariants({ variant: "extraLarge" })} />,
      title: "New Messages",
      description: "The amount of messages that were sent in your server in the last 7 days.",
      value: newMessages,
      graph: newMessages === 0 ? <Icons.minus className={iconVariants({ variant: "normal" })} /> : newMessages < 0 ? <Icons.trendingDown className={iconVariants({ variant: "normal" })} /> : <Icons.trendingUp className={iconVariants({ variant: "normal" })} />,
     }}
    />
   </div>
   <ServerStatsChart guildJoin={guildJoin} guildLeave={guildLeave} guildJoinCSV={guildJoinCSV} guildLeaveCSV={guildLeaveCSV} guildMessage={guildMessage} guildMessageCSV={guildMessageCSV} />
  </>
 );
}
