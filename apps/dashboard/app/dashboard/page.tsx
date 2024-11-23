import { getMemberGuilds, isBotInServer } from "@majoexe/util/functions/guild";
import clsx from "clsx";
import { getSession } from "lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import { buttonVariants } from "@/components/Buttons";
import Image from "@/components/client/shared/Image";
import Header, { headerVariants } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import { twMerge } from "tailwind-merge";

export default async function Dashboard() {
 const session = await getSession();
 if (!session || !session.access_token) redirect("/auth/login");

 const data = (await getMemberGuilds(session.access_token)) || [];
 if (!data) return redirect("/auth/error?error=We%20were%20unable%20to%20get%20a%20list%20of%20your%20servers,%20if%20the%20problem%20persists%20log%20out%20and%20log%20back%20in.");

 const servers =
  (await Promise.all(
   data
    .filter((server) => server.permissions_names.includes("ManageGuild") || server.permissions_names.includes("Administrator"))
    .map(async (server) => {
     server.bot = await isBotInServer(server.id);
     return server;
    })
  )) || [];

 servers.sort((a, b) => (a.bot && !b.bot ? -1 : !a.bot && b.bot ? 1 : 0));

 return (
  <div className="flex w-full flex-col items-center px-8 pb-8 pt-16 antialiased md:p-16">
   <div className="flex flex-col justify-center">
    <Header className={twMerge(headerVariants({ variant: "h1", alignment: "center", margin: "normal" }))}>
     <Icons.dashboard className="size-10 shrink-0" />
     Dashboard
    </Header>
    <p className="mb-4 text-center text-base md:text-xl text-white/50">
     You can only add the bot to servers you have the <code>Manage Server</code> permission in.
    </p>
    <div className="mt-4 flex flex-row flex-wrap justify-center gap-4 sm:flex-col">
     {servers && servers.length > 0 ? (
      servers.map((server) => (
       <div key={server.id}>
        <div className="hidden flex-row items-center justify-start gap-4 sm:flex">
         {server.icon ? <Image src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.icon.startsWith("a_") ? "gif" : "png"}`} alt={server.name} quality={95} width={64} height={64} className="size-16 shrink-0 rounded-full" /> : <div className="size-16 shrink-0 rounded-full bg-button-secondary" />}
         <Header className={twMerge(headerVariants({ variant: "h3" }))}>{server.name}</Header>
         <>
          {server.bot ? (
           <Link href={`/dashboard/${server.id}`} className={twMerge(buttonVariants({ variant: "primary" }), "ml-auto")}>
            <Icons.Minus className={iconVariants({ variant: "button" })} /> Manage
           </Link>
          ) : (
           <Link href={`/api/invite/${server.id}`} className={twMerge(buttonVariants({ variant: "secondary" }), "ml-auto cursor-copy")}>
            <Icons.Minus className={iconVariants({ variant: "button" })} /> Add bot
           </Link>
          )}
         </>
        </div>
        <div className="sm:hidden">
         <Link href={server.bot ? `/dashboard/${server.id}` : `/api/invite/${server.id}`}>
          {server.icon ? (
           <Image
            src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.icon.startsWith("a_") ? "gif" : "png"}`}
            alt={server.name}
            quality={95}
            width={64}
            height={64}
            className={clsx(
             {
              "opacity-20": !server.bot,
             },
             "size-24 shrink-0 rounded-md"
            )}
           />
          ) : (
           <div
            className={clsx(
             {
              "opacity-20": !server.bot,
             },
             "size-24 shrink-0 rounded-md bg-button-secondary"
            )}
           />
          )}
         </Link>
        </div>
       </div>
      ))
     ) : (
      <div className="flex flex-col items-center justify-center gap-4">
       <Header className={twMerge(headerVariants({ variant: "h3", alignment: "center" }))}>You don't have any servers!</Header>
       <Link href="/api/invite" className={twMerge(buttonVariants({ variant: "primary" }))}>
        <Icons.Minus className={iconVariants({ variant: "button" })} /> Add bot
       </Link>
      </div>
     )}
    </div>
   </div>
  </div>
 );
}
