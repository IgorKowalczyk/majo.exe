import prismaClient from "@majoexe/database";
import { getGuildMember, getServer } from "@majoexe/util/functions";
import { json2csv } from "json-2-csv";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { ServerStatsChart } from "@/components/blocks/client/ServerStatsChart";
import { GraphCard } from "@/components/blocks/Card";
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, ChatBubbleLeftRightIcon, MinusIcon, UserMinusIcon, UserPlusIcon, UsersIcon } from "@heroicons/react/24/outline";

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

 const guild = await prismaClient.guild.findFirst({
  where: {
   guildId: serverDownload.id,
  },
  select: {
   guildId: true,
   guildJoin: {
    where: {
     date: {
      gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
     },
    },
    select: {
     date: true,
     joins: true,
    },
   },
   guildLeave: {
    where: {
     date: {
      gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
     },
    },
    select: {
     date: true,
     leaves: true,
    },
   },
   guildMessage: {
    where: {
     date: {
      gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
     },
    },
    select: {
     date: true,
     messages: true,
    },
   },
  },
 });

 if (!guild) {
  await prismaClient.guild.create({
   data: {
    guildId: serverDownload.id,
   },
  });
 }

 const guildJoinMap = new Map();
 const guildLeaveMap = new Map();
 const guildMessageMap = new Map();

 const parseDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date) ? null : date.toISOString().split("T")[0];
 };

 guild.guildJoin.forEach((guildJoinData) => {
  const dateFormatted = parseDate(guildJoinData.date);
  if (dateFormatted !== null) {
   guildJoinMap.set(dateFormatted, (guildJoinMap.get(dateFormatted) || 0) + guildJoinData.joins);
  }
 });

 guild.guildLeave.forEach((guildLeaveData) => {
  const dateFormatted = parseDate(guildLeaveData.date);
  if (dateFormatted !== null) {
   guildLeaveMap.set(dateFormatted, (guildLeaveMap.get(dateFormatted) || 0) + guildLeaveData.leaves);
  }
 });

 guild.guildMessage.forEach((guildMessageData) => {
  const dateFormatted = parseDate(guildMessageData.date);
  if (dateFormatted !== null) {
   guildMessageMap.set(dateFormatted, (guildMessageMap.get(dateFormatted) || 0) + guildMessageData.messages);
  }
 });

 const currentDate = new Date();
 const pastDays = 30;
 const guildJoin = [];
 const guildLeave = [];
 const guildMessage = [];

 for (let i = 0; i < pastDays; i++) {
  const date = new Date(currentDate);
  date.setDate(currentDate.getDate() - i);
  const dateFormatted = parseDate(date.toISOString().split("T")[0]);

  const joins = guildJoinMap.get(dateFormatted) || 0;
  const leaves = guildLeaveMap.get(dateFormatted) || 0;
  const messages = guildMessageMap.get(dateFormatted) || 0;

  guildJoin.unshift({ date: dateFormatted, Joins: joins });
  guildLeave.unshift({ date: dateFormatted, Leaves: leaves });
  guildMessage.unshift({ date: dateFormatted, Messages: messages });
 }

 const guildJoinCSV = await json2csv(guildJoin);
 const guildLeaveCSV = await json2csv(guildLeave);
 const guildMessageCSV = await json2csv(guildMessage);

 function sumArray(array, metric) {
  return array.reduce((accumulator, currentValue) => accumulator + currentValue[metric], 0);
 }

 const newMembers = sumArray(guildJoin, "Joins") - sumArray(guildLeave, "Leaves");
 const membersLeft = sumArray(guildLeave, "Leaves");
 const newMessages = sumArray(guildMessage, "Messages");

 return (
  <>
   <div className="mb-4 grid grid-cols-1 md:grid-cols-1 gap-0 lg:grid-cols-2 xl:grid-cols-3 md:gap-4">
    <GraphCard
     key="1"
     data={{
      icon: <UserPlusIcon className="h-8 w-8" />,
      title: "New Members",
      description: "The amount of new members that joined your server.",
      value: newMembers,
      graph: newMembers === 0 ? <MinusIcon className="h-5 min-h-[1.25rem] w-5 min-w-[1.25rem]" /> : newMembers < 0 ? <ArrowTrendingDownIcon className="h-5 min-h-[1.25rem] w-5 min-w-[1.25rem]" /> : <ArrowTrendingUpIcon className="h-5 min-h-[1.25rem] w-5 min-w-[1.25rem]" />,
     }}
    />
    <GraphCard
     key="2"
     data={{
      icon: <UserMinusIcon className="h-8 w-8" />,
      title: "Members Left",
      description: "The amount of members that left your server.",
      value: membersLeft,
      graph: membersLeft === 0 ? <MinusIcon className="h-5 min-h-[1.25rem] w-5 min-w-[1.25rem]" /> : membersLeft < 0 ? <ArrowTrendingDownIcon className="h-5 min-h-[1.25rem] w-5 min-w-[1.25rem]" /> : <ArrowTrendingUpIcon className="h-5 min-h-[1.25rem] w-5 min-w-[1.25rem]" />,
     }}
    />
    <GraphCard
     key="2"
     className={"col-span-1 lg:col-span-2 lg:mt-0 xl:mt-4 xl:col-span-1"}
     data={{
      icon: <ChatBubbleLeftRightIcon className="h-8 w-8" />,
      title: "New Messages",
      description: "The amount of new messages that were sent in your server.",
      value: newMessages,
      graph: newMessages === 0 ? <MinusIcon className="h-5 min-h-[1.25rem] w-5 min-w-[1.25rem]" /> : newMessages < 0 ? <ArrowTrendingDownIcon className="h-5 min-h-[1.25rem] w-5 min-w-[1.25rem]" /> : <ArrowTrendingUpIcon className="h-5 min-h-[1.25rem] w-5 min-w-[1.25rem]" />,
     }}
    />
   </div>
   <ServerStatsChart guildJoin={guildJoin} guildLeave={guildLeave} guildJoinCSV={guildJoinCSV} guildLeaveCSV={guildLeaveCSV} guildMessage={guildMessage} guildMessageCSV={guildMessageCSV} />
  </>
 );
}
