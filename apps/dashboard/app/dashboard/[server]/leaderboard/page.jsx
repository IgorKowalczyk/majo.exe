import { StarIcon } from "@heroicons/react/24/outline";
import prismaClient from "@majoexe/database";
import { getGuildMember, getServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { Block } from "@/components/blocks/Block";
import { Leaderboard } from "@/components/blocks/client/Leaderboard";
import { Header1, Header5 } from "@/components/blocks/Headers";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/dist/tippy.css";

export const metadata = {
 title: "Leaderboard",
 description: "View the leaderboard for your server.",
};

export default async function ServerLeaderboard({ params }) {
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
 });

 if (!guild) {
  await prismaClient.guild.create({
   data: {
    guildId: serverDownload.id,
   },
  });
 }

 const xp = await prismaClient.guildXp.findMany({
  where: {
   guildId: serverDownload.id,
  },
  orderBy: {
   xp: "desc",
  },
  include: {
   user: {
    select: {
     discordId: true,
     name: true,
     global_name: true,
     avatar: true,
     discriminator: true,
    },
   },
  },
 });

 const data = xp.map((x, i) => {
  return {
   id: i + 1,
   user: x.user,
   xp: x.xp,
   level: Math.floor(0.1 * Math.sqrt(x.xp || 0)),
  };
 });

 const currentUser = xp.findIndex((x) => x.user.discordId === session.id) + 1;

 return (
  <>
   <Header1>
    <StarIcon className="h-12 w-12" />
    Leaderboard
   </Header1>
   <Header5 className="mb-4 mt-2 !justify-start !text-left">
    <span>
     There are {xp.length} users in the leaderboard right now.{" "}
     {currentUser && currentUser > 0 && (
      <span>
       You are currently <span className="text-accent-primary">#{currentUser}</span> in the leaderboard.
      </span>
     )}
    </span>
   </Header5>
   <Block className="flex w-full overflow-auto">
    {xp.length === 0 && <h3 className="text-left text-xl font-bold">No users found!</h3>}
    {xp.length > 0 && (
     <div className="mt-4 w-full">
      <Leaderboard data={data} />
     </div>
    )}
   </Block>
  </>
 );
}
