import prisma, { GuildWarns, GuildXp } from "@majoexe/database";
import { ExtendedAPIGuild, getMemberGuilds } from "@majoexe/util/functions/guild";
import { getFlags } from "@majoexe/util/functions/user";
import { formatNumber } from "@majoexe/util/functions/util";
import { getSession } from "lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DeleteUserData } from "@/app/user/components/DeleteUserData";
import { Emojis } from "@/components/DiscordEmojis";
import { Block } from "@/components/ui/Block";
import { buttonVariants } from "@/components/ui/Buttons";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import Image from "@/components/ui/Image";
import { Tooltip } from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";

export const revalidate = 3600; // 1 hour

export default async function Page() {
 const user = await getSession();
 if (!user) return redirect("/auth/login");
 if (!user.access_token) return redirect("/auth/login");

 const userServers = (await getMemberGuilds(user.access_token)) || [];
 const userServerIds = userServers.map((server) => server.id);

 const userData = await prisma.user.findUnique({
  where: {
   discordId: user.id,
  },
  include: {
   guildWarns: true,
   guildXp: true,
  },
 });
 if (!userData) return redirect("/auth/login");

 type GroupedGuilds = {
  [guildId: string]: {
   guild: ExtendedAPIGuild;
   warns: GuildWarns[];
   xp: GuildXp[];
  };
 };

 const groupedGuilds: GroupedGuilds = {};

 userData.guildWarns.forEach((warn: GuildWarns) => {
  const { guildId } = warn;
  if (!userServerIds.includes(guildId)) return;
  const guild = userServers.find((server) => server.id === guildId);
  if (!guild) return;
  if (!groupedGuilds[guildId]) {
   groupedGuilds[guildId] = {
    guild,
    warns: [],
    xp: [],
   };
  }
  groupedGuilds[guildId].warns.push(warn);
 });

 userData.guildXp.forEach((xp: GuildXp) => {
  const { guildId } = xp;
  if (!userServerIds.includes(guildId)) return;
  const guild = userServers.find((server) => server.id === guildId);
  if (!guild) return;
  if (!groupedGuilds[guildId]) {
   groupedGuilds[guildId] = {
    guild,
    warns: [],
    xp: [],
   };
  }
  groupedGuilds[guildId].xp.push(xp);
 });

 return (
  <div className="flex w-full flex-col items-center px-8 pb-8 pt-16 antialiased md:p-16">
   <div className="flex flex-col justify-center gap-4">
    <div className="relative overflow-hidden rounded-lg border border-neutral-800 bg-background-navbar md:w-full">
     <>
      <div
       className={cn("h-[100px] w-full bg-cover bg-center bg-no-repeat", typeof user.banner == "string" ? "h-40" : "h-24")}
       style={{
        backgroundColor: "#" + (!user.accent_color ? "5c64f4" : user.accent_color.toString(16)),
        backgroundImage: typeof user.banner == "string" ? `url(/api/user/banner/${user.id})` : undefined,
       }}
      />
      <div className="flex h-[72px] w-auto flex-row justify-between gap-6 bg-background-navbar p-12">
       <div className="ml-[-16px] mt-[-20px] box-content flex items-center rounded-full">
        <Tooltip content="Click to see full size">
         <Link href={`${user.avatar}?size=2048`} target="_blank" className="relative size-24 shrink-0">
          <Image quality={100} src={`/api/user/avatar/${user.id}`} alt={`${user.global_name || user.username} Avatar`} width={96} height={96} className="rounded-full border-4 border-solid border-background-navbar backdrop-blur-sm duration-200 hover:opacity-75" />
          {user.avatar_decoration_data ? <Image quality={100} src={`/api/user/avatar-decoration/${user.id}`} alt={`${user.global_name || user.username} Avatar decoration`} width={96} height={96} className="absolute left-0 top-0 rounded-full" /> : null}
         </Link>
        </Tooltip>
        <div className="ml-2 flex items-center text-lg font-bold">
         {user.discriminator === "0" ? (
          <>
           {user.global_name && user.username && (
            <Tooltip content={`Tag: @${user.username}`} className="font-normal">
             <div className="text-white">{user.global_name}</div>
            </Tooltip>
           )}
          </>
         ) : (
          <>
           <div className="text-white">{user.username}</div>
           <div className="text-white/60">#{user.discriminator}</div>
          </>
         )}

         {user.nitro > 0 && (
          <Tooltip content="Nitro" className="font-normal">
           {Emojis["nitro"]}
          </Tooltip>
         )}

         {getFlags(user.public_flags) &&
          getFlags(user.public_flags).map((flag) => {
           return (
            <Tooltip key={`flag-${flag.name}`} content={flag.content} className="font-normal">
             {Emojis[flag.name as keyof typeof Emojis]}
            </Tooltip>
           );
          })}
        </div>
       </div>
       <div className="mb-[-14px] hidden w-full items-end justify-end md:flex">
        <Link href={`https://discord.com/users/${user.id}`} className={cn(buttonVariants({ variant: "primary" }))} target="_blank">
         <Icons.ExternalLink className={iconVariants({ variant: "button" })} /> Discord profile
        </Link>
       </div>
      </div>
      {/* <div className="m-[8px_16px_16px] rounded-lg border border-neutral-800 bg-background-menu-button/70 p-4">{groupedGuilds && Object.keys(groupedGuilds).length} servers</div> */}
     </>
    </div>

    <Block>
     <Header className={cn(headerVariants({ variant: "h2" }))}>
      <Icons.Server className={iconVariants({ variant: "large", className: "!stroke-2" })} />
      Servers
     </Header>
     <p className="mt-2 leading-none text-white/70">A list of servers you are in and some information about them.</p>
     {groupedGuilds ? (
      <div className="mt-4 flex flex-col gap-4">
       {Object.keys(groupedGuilds).map((guildId) => {
        const guild = groupedGuilds[guildId];
        if (!guild) return null;
        const userXP = guild.xp.reduce((acc, curr) => acc + curr.xp, 0);
        return (
         <div key={guild.guild.id} className="relative flex justify-between overflow-hidden rounded-lg border border-neutral-800 bg-background-navbar p-4">
          <div className="flex flex-row items-center gap-4">
           {guild.guild.icon ? <Image src={`https://cdn.discordapp.com/icons/${guild.guild.id}/${guild.guild.icon}.${guild.guild.icon.startsWith("a_") ? "gif" : "png"}`} alt={guild.guild.name} quality={95} width={64} height={64} className="size-14 shrink-0 rounded-full" /> : <div className="size-14 shrink-0 rounded-full bg-button-secondary" />}
           <div className="flex flex-col">
            <Header className={cn(headerVariants({ variant: "h4" }))}>{guild.guild.name}</Header>
            <p className="text-sm text-white/70">Server ID: {guild.guild.id}</p>
           </div>
          </div>
          <div className="flex flex-row items-center gap-4">
           <div className="flex flex-col">
            {/* <p className="text-white font-semibold">Warns</p> */}
            <p className="text-white/70">{guild.warns.length} warns</p>
           </div>
           <div className="flex flex-col">
            {/* <p className="text-white font-semibold">XP</p> */}
            <Tooltip content={`Total XP: ${userXP}`}>
             <p className="text-white/70">
              {formatNumber(userXP || 0)} XP ({Math.floor(0.1 * Math.sqrt(userXP || 0))} level)
             </p>
            </Tooltip>
           </div>
          </div>
         </div>
        );
       })}
      </div>
     ) : (
      <div className="mt-4 text-white/70">No servers found.</div>
     )}
    </Block>

    <Block>
     <Header className={cn(headerVariants({ variant: "h2" }))}>
      <Icons.Download className={iconVariants({ variant: "large", className: "!stroke-2" })} />
      Download data
     </Header>
     <p className="mt-2 leading-none text-white/70">
      Download all your data in a <code>.json</code> file. This includes your profile, data from all servers you are in and more.
     </p>
     <Link href="/api/user/download" className={cn(buttonVariants({ variant: "primary" }), "mt-4 w-fit")} target="_blank">
      <Icons.Download className={iconVariants({ variant: "button" })} />
      Download data
     </Link>
    </Block>

    <Block theme="danger">
     <Header className={cn(headerVariants({ variant: "h2" }), "text-red-400")}>
      <Icons.warning className={iconVariants({ variant: "large", className: "stroke-red-400 !stroke-2" })} />
      Delete account
     </Header>
     <p className="mt-2 text-white/70">If you want to delete all your data and your account, click the button below. This action is irreversible - all your data will be lost.</p>
     <DeleteUserData />
    </Block>
   </div>
  </div>
 );
}
