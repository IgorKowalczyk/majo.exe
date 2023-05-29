import { PlusSmallIcon, RectangleStackIcon } from "@heroicons/react/24/outline";
import { canAddBotToServer } from "@majoexe/util/functions";
import { getServers } from "@majoexe/util/functions";
import { isBotInServer } from "@majoexe/util/functions";
import { PrimaryButton } from "components/buttons/Primary";
import { SecondaryButton } from "components/buttons/Secondary";
import { getSession } from "lib/session";
import Image from "next/image";
import { redirect } from "next/navigation";

export async function getAllServers(session) {
 const servers = (await getServers(session.access_token)) || [];
 const filteredServers = servers.length > 0 ? servers.filter((server) => canAddBotToServer(server.permissions)) : [];
 const promises = filteredServers.map(async (server) => {
  server.bot = await isBotInServer(server.id);
  return server;
 });

 return await Promise.all(promises);
}

export default async function Dashboard() {
 const session = await getSession();
 if (!session) redirect("/auth/login");
 const servers = await getAllServers(session);

 return (
  <div className="flex w-full flex-col items-center bg-background-primary antialiased md:py-16 md:px-16 px-8 py-8">
   <div className="flex flex-col justify-center gap-4">
    <h1 className="flex items-center justify-center gap-4 text-center text-5xl font-bold">
     <RectangleStackIcon className="h-10 w-10" aria-hidden="true" role="img" />
     Dashboard
    </h1>
    <h2 className="text-center  text-xl opacity-50">You can only add the bot to servers you have the "Manage Server" permission in.</h2>
    <div className="flex flex-col gap-4">
     {servers && servers.length > 0 ? (
      servers.map((server) => (
       <div key={server.id} className="flex flex-row items-center justify-start gap-4">
        {server.icon ? <Image src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.icon.startsWith("a_") ? "gif" : "png"}`} alt={server.name} quality={95} width={64} height={64} className="w-16 h-16 rounded-full" /> : <div className="w-16 h-16 rounded-full bg-button-secondary" />}
        <h3 className="text-center  text-xl font-bold">{server.name}</h3>

        <>
         {server.bot ? (
          <PrimaryButton href={`/dashboard/${server.id}`} className="ml-auto">
           <PlusSmallIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" /> Manage
          </PrimaryButton>
         ) : (
          <SecondaryButton href={`/api/invite/${server.id}`} className="ml-auto">
           <PlusSmallIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" /> Add bot
          </SecondaryButton>
         )}
        </>
       </div>
      ))
     ) : (
      <h3 className="text-center  text-xl font-bold">You don't have any servers!</h3>
     )}
    </div>
   </div>
  </div>
 );
}
