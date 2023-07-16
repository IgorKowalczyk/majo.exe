import { PlusSmallIcon, RectangleStackIcon } from "@heroicons/react/24/outline";
import { canAddBotToServer } from "@majoexe/util/functions";
import { getServers } from "@majoexe/util/functions";
import { isBotInServer } from "@majoexe/util/functions";
import clsx from "clsx";
import { PrimaryButton } from "components/buttons/server/Primary";
import { SecondaryButton } from "components/buttons/server/Secondary";
import { getSession } from "lib/session";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CodeCard } from "@/components/blocks/Block";
import { Refetch } from "@/components/blocks/client/Refetch";
import { Header1 } from "@/components/blocks/Headers";

export default async function Dashboard() {
 const session = await getSession();
 if (!session || !session.access_token) redirect("/auth/login");
 const data = (await getServers(session.access_token)) || [];
 const filteredServers = data.length > 0 ? data.filter((server) => canAddBotToServer(server.permissions)) : [];
 const promises = filteredServers.map(async (server) => {
  server.bot = await isBotInServer(server.id);
  return server;
 });
 const servers = await Promise.all(promises);

 servers.sort((a, b) => {
  if (a.bot && !b.bot) return -1;
  if (!a.bot && b.bot) return 1;
  return 0;
 });

 return (
  <div className="flex w-full flex-col items-center bg-background-primary px-8 pb-8 pt-16 antialiased md:px-16 md:py-16">
   <div className="flex flex-col justify-center gap-4">
    <Header1>
     <RectangleStackIcon className="h-10 w-10" aria-hidden="true" role="img" />
     Dashboard
    </Header1>
    <h2 className="text-center text-xl text-white/50">
     You can only add the bot to servers you have the <CodeCard>Manage Server</CodeCard> permission in.
    </h2>
    <div className="flex flex-row flex-wrap justify-center gap-4 sm:flex-col">
     {servers && servers.length > 0 ? (
      servers.map((server) => (
       <>
        <div key={server.id} className="hidden flex-row items-center justify-start gap-4 sm:flex">
         {server.icon ? <Image src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.icon.startsWith("a_") ? "gif" : "png"}`} alt={server.name} quality={95} width={64} height={64} className="h-16 w-16 rounded-full" /> : <div className="h-16 w-16 rounded-full bg-button-secondary" />}
         <h3 className="text-center  text-xl font-bold">{server.name}</h3>

         <>
          {server.bot ? (
           <PrimaryButton href={`/dashboard/${server.id}`} className="ml-auto">
            <PlusSmallIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" /> Manage
           </PrimaryButton>
          ) : (
           <SecondaryButton href={`/api/invite/${server.id}`} className="ml-auto cursor-copy">
            <PlusSmallIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" /> Add bot
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
             "h-24 w-24 rounded-md"
            )}
           />
          ) : (
           <div
            className={clsx(
             {
              "opacity-20": !server.bot,
             },
             "h-24 w-24 rounded-md bg-button-secondary"
            )}
           />
          )}
         </Link>
        </div>
       </>
      ))
     ) : (
      <div className="flex flex-col items-center justify-center gap-4">
       <h3 className="text-center text-xl font-bold">You don't have any servers!</h3>
       <div className="flex flex-row items-center justify-start gap-2">
        <PrimaryButton href={"/api/invite"}>
         <PlusSmallIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" /> Add bot
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
