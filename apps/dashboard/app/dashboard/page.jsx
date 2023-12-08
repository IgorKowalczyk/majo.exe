import { PlusSmallIcon, RectangleStackIcon } from "@heroicons/react/24/outline";
import { getServers } from "@majoexe/util/functions";
import { isBotInServer } from "@majoexe/util/functions";
import clsx from "clsx";
import { getSession } from "lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "@/components/blocks/client/shared/Image";
import { Refetch } from "@/components/blocks/client/shared/Refetch";
import { Header1 } from "@/components/blocks/Headers";
import { PrimaryButton } from "@/components/blocks/Primary";
import { SecondaryButton } from "@/components/blocks/Secondary";

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
   <div className="flex flex-col justify-center gap-4">
    <Header1 className={"!justify-center"}>
     <RectangleStackIcon className="min-h-10 min-w-10 h-10 w-10" aria-hidden="true" role="img" />
     Dashboard
    </Header1>
    <h2 className="text-center text-xl text-white/50">
     You can only add the bot to servers you have the <code>Manage Server</code> permission in.
    </h2>
    <div className="flex flex-row flex-wrap justify-center gap-4 sm:flex-col">
     {servers && servers.length > 0 ? (
      servers.map((server) => (
       <div key={server.id}>
        <div className="hidden flex-row items-center justify-start gap-4 sm:flex">
         {server.icon ? <Image src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.icon.startsWith("a_") ? "gif" : "png"}`} alt={server.name} quality={95} width={64} height={64} className="min-h-16 min-w-16 h-16 w-16 rounded-full" /> : <div className="bg-button-secondary min-h-16 min-w-16 h-16 w-16 rounded-full" />}
         <h3 className="text-center text-xl font-bold">{server.name}</h3>
         <>
          {server.bot ? (
           <PrimaryButton href={`/dashboard/${server.id}`} className="ml-auto">
            <PlusSmallIcon className="min-h-5 min-w-5 mr-2 h-5 w-5" aria-hidden="true" role="img" /> Manage
           </PrimaryButton>
          ) : (
           <SecondaryButton href={`/api/invite/${server.id}`} className="ml-auto cursor-copy">
            <PlusSmallIcon className="min-h-5 min-w-5 mr-2 h-5 w-5" aria-hidden="true" role="img" /> Add bot
           </SecondaryButton>
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
             "min-w-24 min-h-24 h-24 w-24 rounded-md"
            )}
           />
          ) : (
           <div
            className={clsx(
             {
              "opacity-20": !server.bot,
             },
             "bg-button-secondary min-w-24 min-h-24 h-24 w-24 rounded-md"
            )}
           />
          )}
         </Link>
        </div>
       </div>
      ))
     ) : (
      <div className="flex flex-col items-center justify-center gap-4">
       <h3 className="text-center text-xl font-bold">You don't have any servers!</h3>
       <div className="flex flex-row items-center justify-start gap-2">
        <PrimaryButton href={"/api/invite"}>
         <PlusSmallIcon className="min-h-5 min-w-5 mr-2 h-5 w-5" aria-hidden="true" role="img" /> Add bot
        </PrimaryButton>
        <Refetch />
       </div>
      </div>
     )}
    </div>
   </div>
  </div>
 );
}
