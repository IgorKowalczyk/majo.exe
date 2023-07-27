import prismaClient from "@majoexe/database";
import { getServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { ServerStatsChart } from "../../../../components/blocks/client/ServerStatsChart";

export default async function Statistics({ params }) {
 const user = await getSession();
 if (!user) return redirect("/auth/login");
 const { server } = params;
 const serverDownload = await getServer(server);
 if (!serverDownload) return redirect("/dashboard");
 if (serverDownload.code === 10004) return redirect("/dashboard");
 if (!serverDownload.bot) return redirect("/dashboard");

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

 const guildJoinMap = new Map();
 const guildLeaveMap = new Map();

 for (const guildJoinData of guild.GuildJoin || []) {
  const date = guildJoinData.date;
  guildJoinMap.set(date, guildJoinData.joins);
 }

 for (const guildLeaveData of guild.GuildLeave || []) {
  const date = guildLeaveData.date;
  guildLeaveMap.set(date, guildLeaveData.leaves);
 }

 const currentDate = new Date();
 const pastDays = 30;

 let guildJoin = [];
 let guildLeave = [];

 for (let i = 0; i < pastDays; i++) {
  const date = currentDate.getDate() - i;
  const joins = guildJoinMap.get(date) || 0;
  const leaves = guildLeaveMap.get(date) || 0;

  guildJoin.push({
   date,
   Joins: joins,
  });

  guildLeave.push({
   date,
   Leaves: leaves,
  });
 }

 if (guildJoinMap.size === 0) {
  guildJoin = [
   {
    date: currentDate.getDate(),
    Joins: 0,
   },
  ];
 }

 if (guildLeaveMap.size === 0) {
  guildLeave = [
   {
    date: currentDate.getDate(),
    Leaves: 0,
   },
  ];
 }

 return (
  <>
   {/*
   <ServerStatsChart guildJoin={guildJoin} guildLeave={guildLeave} />
   */}
  </>
 );
}
