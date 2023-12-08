/* eslint-disable complexity */

import { ArrowTopRightOnSquareIcon, ExclamationCircleIcon, ShieldExclamationIcon } from "@heroicons/react/24/outline";
import prismaClient from "@majoexe/database";
import { formatNumber, getFlags, getGuildMember, getServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Block } from "@/components/blocks/Block";
import { ManageWarns } from "@/components/blocks/client/lists/Warns";
import Image from "@/components/blocks/client/shared/Image";
import { Tooltip } from "@/components/blocks/client/shared/Tooltip";
import { Emojis } from "@/components/blocks/emojis";

export async function generateMetadata({ params }) {
 const { id, server } = params;

 const guild = await prismaClient.guild.findFirst({
  where: {
   guildId: server,
  },
 });

 if (!guild) {
  return {
   title: "User profile",
   description: "View the profile of a user.",
  };
 }

 const user = await prismaClient.user.findFirst({
  where: {
   discordId: id,
  },
 });

 if (!user) {
  return {
   title: "Server profile",
   description: "View the profile of a user.",
  };
 }

 return {
  title: `${user.global_name || user.name} profile`,
  description: `View the profile of ${user.global_name}.`,
 };
}

export default async function ServerLogs({ params }) {
 const session = await getSession();
 if (!session || !session.access_token) redirect("/auth/login");
 const { server, id } = params;
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

 const user = await prismaClient.user.findFirst({
  where: {
   discordId: id,
  },
  include: {
   guildWarns: {
    orderBy: {
     createdAt: "desc",
    },
    where: {
     guildId: serverDownload.id,
    },
    select: {
     id: true,
     warnId: true,
     message: true,
     createdAt: true,
     createdById: true,
    },
   },
   guildXp: {
    where: {
     guildId: serverDownload.id,
    },
    select: {
     xp: true,
    },
   },
   reputation: {
    where: {
     guildId: serverDownload.id,
    },
    select: {
     reputation: true,
    },
   },
  },
 });

 if (!user) {
  return redirect("/auth/error?error=It%20looks%20like%20the%20user%20you%20are%20trying%20to%20display%20does%20not%20exist");
 }

 await prismaClient.guild.upsert({
  where: {
   guildId: serverDownload.id,
  },
  update: {},
  create: {
   guildId: serverDownload.id,
  },
 });

 user.guildWarns.forEach(async (warn) => {
  warn.createdAt instanceof Date ? (warn.createdAt = warn.createdAt.toISOString()) : (warn.createdAt = new Date().toISOString());
  warn.loading = false;
  warn.addedBy = await prismaClient.user.findFirst({
   where: {
    discordId: warn.createdById,
   },
  });
 });

 const userXP = user.guildXp.reduce((a, b) => a + (b["xp"] || 0), 0);
 const userRepuation = user.reputation.reduce((a, b) => a + (b["reputation"] || 0), 0);

 return (
  <>
   <div className="bg-background-navbar relative overflow-hidden rounded-lg border border-neutral-800 md:w-full">
    <>
     <div
      className="h-[100px] w-full bg-cover bg-center bg-no-repeat"
      style={{
       backgroundColor: "#" + (!user.accent_color ? "5c64f4" : user.accent_color.toString(16)),
       backgroundImage: `url(${user.banner})`,
      }}
     />
     <div className="bg-background-navbar flex h-[72px] w-auto flex-row justify-between gap-6 p-12">
      <div className="ml-[-16px] mt-[-20px] box-content flex items-center rounded-full">
       <Tooltip content="Click to see full size">
        <Link href={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.${user.avatar.startsWith("a_") ? "gif" : "png"}?size=2048`} target="_blank" className="min-w-24 min-h-24 h-24 w-24">
         <Image quality={100} src={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.${user.avatar.startsWith("a_") ? "gif" : "png"}`} alt={`${user.global_name || user.username} Avatar`} width={94} height={94} className="!border-background-navbar rounded-full !border-4 !border-solid duration-200 hover:opacity-75" />
        </Link>
       </Tooltip>
       <div className="ml-2 flex items-center text-lg font-bold">
        {user.discriminator === "0" ? (
         <>
          {user.global_name && user.username && <Tooltip content={`@${user.username}`} />}
          <div className="text-white">{user.global_name}</div>
         </>
        ) : (
         <>
          <div className="text-white">{user.username}</div>
          <div className="text-white/60">#{user.discriminator}</div>
         </>
        )}

        {user.nitro > 0 && <Tooltip content="Nitro">{Emojis["nitro"]}</Tooltip>}

        {getFlags(user.public_flags) &&
         getFlags(user.public_flags).map((flag, i) => {
          return (
           <Tooltip key={i} content={flag.content}>
            {Emojis[flag.name]}
           </Tooltip>
          );
         })}
       </div>
      </div>
      <div className="mb-[-14px] hidden w-full items-end justify-end font-semibold md:flex">
       <Link href={`https://discord.com/users/${user.discordId}`} target="_blank" className="bg-button-primary hover:bg-button-primary-hover flex h-[40px] cursor-pointer items-center rounded px-4 py-0 font-normal text-white duration-200 motion-reduce:transition-none">
        <ArrowTopRightOnSquareIcon className="min-h-4 min-w-4 mr-2 h-4 w-4" aria-hidden="true" role="img" /> See global profile
       </Link>
      </div>
     </div>
     <div className="bg-background-menu-button/70 m-[8px_16px_16px] rounded-lg border border-neutral-800 p-4">
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
       <Tooltip content="Total gained XP">
        <div className="flex cursor-help items-center">
         <div className="min-h-3 min-w-3 mr-2 h-3 w-3 rounded-full bg-[#81848f]" />
         {formatNumber(userXP || 0)} XP ({Math.floor(0.1 * Math.sqrt(userXP || 0))} level)
        </div>
       </Tooltip>

       <Tooltip content="Total reputation given by other users">
        <div className="flex cursor-help items-center">
         <div className="min-h-3 min-w-3 mr-2 h-3 w-3 rounded-full bg-[#81848f]" />
         {formatNumber(userRepuation || 0)} Reputation
        </div>
       </Tooltip>

       <Tooltip content="Total warns given by moderators">
        <div className="flex cursor-help items-center">
         <div className="min-h-3 min-w-3 mr-2 h-3 w-3 rounded-full bg-[#81848f]" />
         {formatNumber(user.guildWarns.length || 0)} warns
        </div>
       </Tooltip>
      </div>
     </div>
    </>
   </div>
   <Block className="mt-4">
    <h2 id="warns" className="mb-1 flex items-center justify-start gap-2 text-left text-2xl font-bold">
     <ShieldExclamationIcon className="min-h-6 min-w-6 h-6 w-6" />
     Warns
    </h2>
    <p className="mb-4 text-left opacity-70">You can view all warns given to this user in this server. You can also manage them by deleting them.</p>
    {user.guildWarns.length === 0 ? (
     <p className="mb-4 flex items-center justify-start gap-2 text-left text-red-400">
      <ExclamationCircleIcon className="min-h-5 min-w-5 h-5 w-5" />
      This user has no warns in this server.
     </p>
    ) : (
     <ManageWarns data={user.guildWarns} guildId={serverDownload.id} />
    )}
   </Block>
  </>
 );
}
