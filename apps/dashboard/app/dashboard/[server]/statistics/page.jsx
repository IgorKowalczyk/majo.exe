import prismaClient from "@majoexe/database";
import { getGuildMember, getServer } from "@majoexe/util/functions";
import { json2csv } from "json-2-csv";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { ServerStatsChart } from "@/components/blocks/client/ServerStatsChart";

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
  !serverMember.permissions_names.includes("MANAGE_GUILD") ||
  !serverMember.permissions_names.includes("ADMINISTRATOR")
 )
  return redirect("/auth/error?error=It%20looks%20like%20you%20do%20not%20have%20permission%20to%20access%20this%20page.");

 const guild = await prismaClient.guild.findFirst({
  where: {
   guildId: serverDownload.id,
  },
  select: {
   guildId: true,
   GuildJoin: {
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
   GuildLeave: {
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

 const parseDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date) ? null : date.toISOString().split("T")[0];
 };

 guild.GuildJoin.forEach((guildJoinData) => {
  const dateFormatted = parseDate(guildJoinData.date);
  if (dateFormatted !== null) {
   guildJoinMap.set(dateFormatted, (guildJoinMap.get(dateFormatted) || 0) + guildJoinData.joins);
  }
 });

 guild.GuildLeave.forEach((guildLeaveData) => {
  const dateFormatted = parseDate(guildLeaveData.date);
  if (dateFormatted !== null) {
   guildLeaveMap.set(dateFormatted, (guildLeaveMap.get(dateFormatted) || 0) + guildLeaveData.leaves);
  }
 });

 const currentDate = new Date();
 const pastDays = 30;
 const guildJoin = [];
 const guildLeave = [];

 for (let i = 0; i < pastDays; i++) {
  const date = new Date(currentDate);
  date.setDate(currentDate.getDate() - i);
  const dateFormatted = parseDate(date.toISOString().split("T")[0]);

  const joins = guildJoinMap.get(dateFormatted) || 0;
  const leaves = guildLeaveMap.get(dateFormatted) || 0;

  guildJoin.unshift({ date: dateFormatted, Joins: joins });
  guildLeave.unshift({ date: dateFormatted, Leaves: leaves });
 }

 const guildJoinCSV = await json2csv(guildJoin);
 const guildLeaveCSV = await json2csv(guildLeave);

 return (
  <>
   <ServerStatsChart guildJoin={guildJoin} guildLeave={guildLeave} guildJoinCSV={guildJoinCSV} guildLeaveCSV={guildLeaveCSV} />
  </>
 );
}
