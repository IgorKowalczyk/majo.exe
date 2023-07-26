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

 for (const guildJoinData of guild.GuildJoin) {
  const date = new Date(guildJoinData.date);
  const dateFormatted = date.toISOString().split("T")[0];
  guildJoinMap.set(dateFormatted, guildJoinData.joins);
 }

 for (const guildLeaveData of guild.GuildLeave) {
  const date = new Date(guildLeaveData.date);
  const dateFormatted = date.toISOString().split("T")[0];
  guildLeaveMap.set(dateFormatted, guildLeaveData.leaves);
 }

 const currentDate = new Date();
 const pastDays = 30;

 const guildJoin = [];
 const guildLeave = [];

 for (let i = 0; i < pastDays; i++) {
  const date = new Date(currentDate);
  date.setDate(currentDate.getDate() - i);
  const dateFormatted = date.toISOString().split("T")[0];

  const joins = guildJoinMap.get(dateFormatted) || 0;
  const leaves = guildLeaveMap.get(dateFormatted) || 0;

  guildJoin.push({
   date: dateFormatted,
   Joins: joins,
  });

  guildLeave.push({
   date: dateFormatted,
   Leaves: leaves,
  });
 }

 guildJoin.reverse();
 guildLeave.reverse();

 return (
  <>
   <ServerStatsChart guildJoin={guildJoin} guildLeave={guildLeave} />
  </>
 );
}
