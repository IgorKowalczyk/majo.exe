import prismaClient from "@majoexe/database";
import { getGuildFromMemberGuilds, getGuild } from "@majoexe/util/functions/guild";
import { getDiscordUser, getFlags } from "@majoexe/util/functions/user";
import { formatNumber } from "@majoexe/util/functions/util";
import { getSession } from "lib/session";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { ChangeUserReputation } from "@/app/dashboard/[server]/user/components/ChangeUserReputation";
import { ResetUserXP } from "@/app/dashboard/[server]/user/components/ResetUserXP";
import { ManageUserWarns, UserWarns } from "@/app/dashboard/[server]/warns/components/Warns";
import { Emojis } from "@/components/DiscordEmojis";
import { Block } from "@/components/ui/Block";
import { buttonVariants } from "@/components/ui/Buttons";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import Image from "@/components/ui/Image";
import { Tooltip } from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ server: string; id: string }> }): Promise<Metadata> {
 const { id, server } = await params;

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

export default async function User(props: { params: Promise<{ server: string; id: string }> }) {
 const params = await props.params;
 const session = await getSession();
 if (!session || !session.access_token) redirect("/auth/login");
 const { server, id } = params;
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
     guildId: true,
     userId: true,
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

 if (!user) return redirect("/auth/error?error=It%20looks%20like%20the%20user%20you%20are%20trying%20to%20display%20does%20not%20exist");

 await prismaClient.guild.upsert({
  where: {
   guildId: serverDownload.id,
  },
  update: {},
  create: {
   guildId: serverDownload.id,
  },
 });

 const warns = (await Promise.all(
  user.guildWarns.map(async (warn) => {
   return {
    ...warn,
    createdAt: warn.createdAt instanceof Date ? warn.createdAt : new Date(warn.createdAt),
    loading: false,
    addedBy: await prismaClient.user.findFirst({
     where: {
      discordId: warn.createdById,
     },
     select: {
      discordId: true,
      name: true,
      global_name: true,
      avatar: true,
      discriminator: true,
     },
    }),
   };
  })
 )) satisfies UserWarns[];

 const userXP = user.guildXp.reduce((a, b) => a + (b["xp"] || 0), 0);
 const userRepuation = user.reputation.reduce((a, b) => a + (b["reputation"] || 0), 0);

 const discordUser = await getDiscordUser(id);
 if (!discordUser) return redirect("/auth/error?error=It%20looks%20like%20the%20user%20you%20are%20trying%20to%20display%20does%20not%20exist");

 return (
  <>
   <div className="relative overflow-hidden rounded-lg border border-neutral-800 bg-background-navbar md:w-full">
    <>
     <div
      className={cn("h-[100px] w-full bg-cover bg-center bg-no-repeat", typeof discordUser.banner == "string" ? "h-40" : "h-24")}
      style={{
       backgroundColor: "#" + (!discordUser.accent_color ? "5c64f4" : discordUser.accent_color.toString(16)),
       backgroundImage: typeof discordUser.banner == "string" ? `url(/api/user/banner/${discordUser.id})` : undefined,
      }}
     />
     <div className="flex h-[72px] w-auto flex-row justify-between gap-6 bg-background-navbar p-12">
      <div className="ml-[-16px] mt-[-20px] box-content flex w-full items-center rounded-full">
       <Tooltip content="Click to see full size">
        <Link href={`/api/user/avatar/${discordUser.id}`} target="_blank" className="relative size-24 shrink-0">
         <Image quality={100} src={`/api/user/avatar/${discordUser.id}`} alt={`${discordUser.global_name || discordUser.username} Avatar`} width={96} height={96} className="rounded-full border-4! border-solid! border-background-navbar! duration-200 hover:opacity-75" />
         {discordUser.avatar_decoration_data ? <Image quality={100} src={`/api/user/avatar-decoration/${discordUser.id}`} alt={`${discordUser.global_name || discordUser.username} Avatar decoration`} width={96} height={96} className="absolute left-0 top-0 rounded-full" /> : null}
        </Link>
       </Tooltip>

       <div className="ml-2 flex items-center text-lg font-bold">
        {discordUser.discriminator === "0" ? (
         <>
          {discordUser.global_name && discordUser.username && (
           <Tooltip content={`@${discordUser.username}`}>
            <span className="text-white">{discordUser.global_name}</span>
           </Tooltip>
          )}
         </>
        ) : (
         <>
          <div className="text-white">{discordUser.username}</div>
          <div className="text-white/60">#{discordUser.discriminator}</div>
         </>
        )}

        {user.nitro && user.nitro > 0 ? (
         <Tooltip content="Nitro">
          <div className="mx-1 size-5">{Emojis["nitro"]}</div>
         </Tooltip>
        ) : null}

        {user.public_flags !== null &&
         getFlags(Number(user.public_flags)) &&
         getFlags(Number(user.public_flags)).map((flag) => {
          return (
           <Tooltip key={`flag-tooltip-${flag.name}`} content={flag.content}>
            <div className="mx-1 size-5">{Emojis[flag.name as keyof typeof Emojis]}</div>
           </Tooltip>
          );
         })}
       </div>
      </div>
      <div className="mb-[-14px] hidden w-full items-end justify-end lg:flex">
       <Link href={`https://discord.com/users/${user.discordId}`} className={cn(buttonVariants({ variant: "primary" }))} target="_blank">
        <Icons.ExternalLink className={iconVariants({ variant: "button" })} /> Discord profile
       </Link>
      </div>
     </div>
     <div className="m-[8px_16px_16px] rounded-lg border border-neutral-800 bg-background-menu-button/70 p-4">
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-start">
       <Tooltip content="Total gained XP">
        <div className="flex cursor-help items-center">
         <div className="mr-2 size-3 shrink-0 rounded-full bg-[#81848f]" />
         {formatNumber(userXP || 0)} XP ({Math.floor(0.1 * Math.sqrt(userXP || 0))} level)
        </div>
       </Tooltip>

       <Tooltip content="Total reputation given by other users">
        <div className="flex cursor-help items-center">
         <div className="mr-2 size-3 shrink-0 rounded-full bg-[#81848f]" />
         {formatNumber(userRepuation || 0)} Reputation
        </div>
       </Tooltip>

       <Tooltip content="Total warns given by moderators">
        <div className="flex cursor-help items-center">
         <div className="mr-2 size-3 shrink-0 rounded-full bg-[#81848f]" />
         {formatNumber(warns.length || 0)} warns
        </div>
       </Tooltip>
      </div>
     </div>
    </>
   </div>
   <Block className="mt-4">
    <Header className={cn(headerVariants({ variant: "h2" }))}>
     <Icons.MessageSquareWarning className={iconVariants({ variant: "large", className: "stroke-2!" })} />
     Warns
    </Header>
    <p className="mb-4 text-left opacity-70">You can view all warns given to this user in this server. You can also manage them by deleting them.</p>
    {warns.length === 0 ? (
     <p className="mb-4 flex items-center justify-start gap-2 text-left text-red-400">
      <Icons.warning className={iconVariants({ variant: "normal", className: "mr-1" })} />
      This user has no warns in this server.
     </p>
    ) : (
     <ManageUserWarns data={warns} guildId={serverDownload.id} />
    )}
   </Block>
   <Block className="mt-4">
    <Header className={cn(headerVariants({ variant: "h2" }))}>
     <Icons.like className={iconVariants({ variant: "large", className: "stroke-2!" })} />
     Reputation
    </Header>
    <p className="mt-2 text-white/70">Change the reputation of this user in this server, set it to 0 to remove it.</p>
    <ChangeUserReputation userId={user.discordId} guildId={serverDownload.id} userReputation={userRepuation} className="my-2" />
   </Block>
   <Block theme="danger" className="mt-4">
    <Header className={cn(headerVariants({ variant: "h2" }), "text-red-400")}>
     <Icons.warning className={iconVariants({ variant: "large", className: "stroke-2!" })} />
     Reset XP
    </Header>
    <p className="mt-2 text-white/70">Reset the XP of this user in this server. This action cannot be undone and will reset the XP of this user to 0.</p>

    <p className="mt-2 text-white/70">
     <span className="font-semibold">The user currently has: </span>
     {formatNumber(userXP || 0)} XP ({Math.floor(0.1 * Math.sqrt(userXP || 0))} level)
    </p>
    <ResetUserXP userId={user.discordId} guildId={serverDownload.id} />
   </Block>
  </>
 );
}
