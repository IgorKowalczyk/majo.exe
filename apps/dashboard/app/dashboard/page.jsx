import { getServers, isBotInServer } from "@majoexe/util/functions/guild";
import clsx from "clsx";
import { getSession } from "lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ButtonPrimary } from "@/components/Buttons";
import { ButtonSecondary } from "@/components/Buttons";
import Image from "@/components/client/shared/Image";
import { Header1, Header2, Header3 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";

export default async function Dashboard() {
 const session = await getSession();
 if (!session || !session.access_token) redirect("/auth/login");

 const data = (await getServers(session.access_token)) || [];
 if (!data || data.error) return redirect("/auth/error?error=We%20were%20unable%20to%20get%20a%20list%20of%20your%20servers,%20if%20the%20problem%20persists%20log%20out%20and%20log%20back%20in.");

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
  <div className="flex w-full flex-col items-center px-8 pb-8 pt-16 antialiased md:px-16 md:py-16">
   <div className="flex flex-col justify-center">
    <Header1 className="!justify-center">
     <Icons.dashboard className="h-10 min-h-10 w-10 min-w-10" />
     Dashboard
    </Header1>
    <Header2 className="text-xl font-normal text-white/50">
     You can only add the bot to servers you have the <code>Manage Server</code> permission in.
    </Header2>
    <div className="mt-4 flex flex-row flex-wrap justify-center gap-4 sm:flex-col">
     {servers && servers.length > 0 ? (
      servers.map((server) => (
       <div key={server.id}>
        <div className="hidden flex-row items-center justify-start gap-4 sm:flex">
         {server.icon ? <Image src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.icon.startsWith("a_") ? "gif" : "png"}`} alt={server.name} quality={95} width={64} height={64} className="h-16 min-h-16 w-16 min-w-16 rounded-full" /> : <div className="bg-button-secondary h-16 min-h-16 w-16 min-w-16 rounded-full" />}
         <Header3 className="text-center">{server.name}</Header3>
         <>
          {server.bot ? (
           <ButtonPrimary href={`/dashboard/${server.id}`} className="ml-auto">
            <Icons.plus className={iconVariants({ variant: "button" })} /> Manage
           </ButtonPrimary>
          ) : (
           <ButtonSecondary href={`/api/invite/${server.id}`} className="ml-auto cursor-copy">
            <Icons.plus className={iconVariants({ variant: "button" })} /> Add bot
           </ButtonSecondary>
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
             "h-24 min-h-24 w-24 min-w-24 rounded-md"
            )}
           />
          ) : (
           <div
            className={clsx(
             {
              "opacity-20": !server.bot,
             },
             "bg-button-secondary h-24 min-h-24 w-24 min-w-24 rounded-md"
            )}
           />
          )}
         </Link>
        </div>
       </div>
      ))
     ) : (
      <div className="flex flex-col items-center justify-center gap-4">
       <Header3 className="text-center">You don't have any servers!</Header3>
       <ButtonPrimary href="/api/invite">
        <Icons.plus className={iconVariants({ variant: "button" })} /> Add bot
       </ButtonPrimary>
      </div>
     )}
    </div>
   </div>
  </div>
 );
}
