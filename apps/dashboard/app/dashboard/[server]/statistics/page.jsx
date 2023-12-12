/* eslint-disable complexity */

import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, ChatBubbleLeftRightIcon, MinusIcon, UserMinusIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import prismaClient from "@majoexe/database";
import { getGuildMember, getServer } from "@majoexe/util/functions/guild";
import { json2csv } from "json-2-csv";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { GraphCard } from "@/components/Card";
import { ServerStatsChart } from "@/components/client/charts/ServerStatsChart";

export default async function Statistics({ params }) {
 const session = await getSession();
 if (!session || !session.access_token) redirect("/auth/login");
 const { server } = params;
 const serverDownload = await getServer(server);
 if (!serverDownload || serverDownload.code === 10004 || !serverDownload.bot) return redirect("/auth/error?error=It%20looks%20like%20the%20server%20you%20are%20trying%20to%20display%20does%20not%20exist");
 const serverMember = await getGuildMember(serverDownload.id, session.access_token);
 if (
  // prettier
  !serverMember ||
  !serverMember.permissions_names ||
  !serverMember.permissions_names.includes("ManageGuild") ||
  !serverMember.permissions_names.includes("Administrator")
 )
  return redirect("/auth/error?error=It%20looks%20like%20you%20do%20not%20have%20permission%20to%20access%20this%20page.");

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

 const parseDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date) ? null : date.toISOString().split("T")[0];
 };

 const sumArray = (array, metric) => {
  return array.reduce((accumulator, currentValue) => accumulator + currentValue[metric], 0);
 };

 let guildJoin = guild.guildJoin.map((guildJoinData) => ({
  date: parseDate(guildJoinData.date),
  Joins: guildJoinData.joins,
 }));

 let guildLeave = guild.guildLeave.map((guildLeaveData) => ({
  date: parseDate(guildLeaveData.date),
  Leaves: guildLeaveData.leaves,
 }));

 let guildMessage = guild.guildMessage.map((guildMessageData) => ({
  date: parseDate(guildMessageData.date),
  Messages: guildMessageData.messages,
 }));

 const generateDates = (startDate, endDate) => {
  let dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
   dates.push(new Date(currentDate));
   currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
 };

 const fillMissingDates = (array, property) => {
  let minDate = new Date(Math.min(...array.map((e) => new Date(e.date))));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const thirtyDaysAgo = new Date(today.getTime());
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  if (minDate < thirtyDaysAgo) minDate = thirtyDaysAgo;

  const allDates = generateDates(minDate, today);
  const dateSet = new Set(array.map((e) => new Date(e.date).toISOString().split("T")[0]));

  allDates.forEach((date) => {
   const dateString = date.toISOString().split("T")[0];
   if (!dateSet.has(dateString)) {
    array.push({ date: dateString, [property]: 0 });
   }
  });

  return array.sort((a, b) => new Date(a.date) - new Date(b.date));
 };

 guildJoin = fillMissingDates(guildJoin, "Joins");
 guildLeave = fillMissingDates(guildLeave, "Leaves");
 guildMessage = fillMissingDates(guildMessage, "Messages");

 const guildJoinCSV = json2csv(guildJoin);
 const guildLeaveCSV = json2csv(guildLeave);
 const guildMessageCSV = json2csv(guildMessage);

 const newMembers = sumArray(guildJoin, "Joins") - sumArray(guildLeave, "Leaves");
 const membersLeft = sumArray(guildLeave, "Leaves");
 const newMessages = sumArray(guildMessage, "Messages");

 return (
  <>
   <div className="mb-4 grid grid-cols-1 gap-0 md:grid-cols-1 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
    <GraphCard
     className={"mt-0"}
     data={{
      icon: <UserPlusIcon className="min-h-8 min-w-8 h-8 w-8" />,
      title: "New Members",
      description: "The amount of new members that joined your server.",
      value: newMembers,
      graph: newMembers === 0 ? <MinusIcon className="min-h-5 min-w-5 h-5 w-5" /> : newMembers < 0 ? <ArrowTrendingDownIcon className="min-h-5 min-w-5 h-5 w-5" /> : <ArrowTrendingUpIcon className="min-h-5 min-w-5 h-5 w-5" />,
     }}
    />
    <GraphCard
     className={"mt-0"}
     data={{
      icon: <UserMinusIcon className="min-h-8 min-w-8 h-8 w-8" />,
      title: "Members Left",
      description: "The amount of members that left your server.",
      value: membersLeft,
      graph: membersLeft === 0 ? <MinusIcon className="min-h-5 min-w-5 h-5 w-5" /> : membersLeft < 0 ? <ArrowTrendingDownIcon className="min-h-5 min-w-5 h-5 w-5" /> : <ArrowTrendingUpIcon className="min-h-5 min-w-5 h-5 w-5" />,
     }}
    />
    <GraphCard
     className={"col-span-1 mt-0 lg:col-span-2 xl:col-span-1"}
     data={{
      icon: <ChatBubbleLeftRightIcon className="min-h-8 min-w-8 h-8 w-8" />,
      title: "New Messages",
      description: "The amount of messages that were sent in your server.",
      value: newMessages,
      graph: newMessages === 0 ? <MinusIcon className="min-h-5 min-w-5 h-5 w-5" /> : newMessages < 0 ? <ArrowTrendingDownIcon className="min-h-5 min-w-5 h-5 w-5" /> : <ArrowTrendingUpIcon className="min-h-5 min-w-5 h-5 w-5" />,
     }}
    />
   </div>
   <ServerStatsChart guildJoin={guildJoin} guildLeave={guildLeave} guildJoinCSV={guildJoinCSV} guildLeaveCSV={guildLeaveCSV} guildMessage={guildMessage} guildMessageCSV={guildMessageCSV} />
  </>
 );
}
