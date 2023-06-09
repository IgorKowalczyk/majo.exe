import prismaClient from "@majoexe/database";
import { getServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Block } from "@/components/blocks/Block";
import { Tooltip } from "@/components/blocks/client/Tooltip";

export default async function ServerLogs({ params }) {
 const user = await getSession();
 if (!user) return redirect("/auth/login");
 const { server } = params;
 const serverDownload = await getServer(server);
 if (!serverDownload) return redirect("/dashboard");
 if (serverDownload.code === 10004) return redirect("/dashboard");
 if (!serverDownload.bot) return redirect("/dashboard");

 const xp = await prismaClient.guildXp.findMany({
  where: {
   guildId: serverDownload.id,
  },
  take: 20,
  skip: 0,
  orderBy: {
   xp: "desc",
  },
  include: {
   user: true,
  },
 });

 return (
  <div className="flex w-full flex-col items-center bg-background-primary antialiased md:py-16 md:px-16 px-8 py-8">
   <h1 className="flex items-center justify-center gap-4 text-center text-5xl font-bold">
    <svg className="w-12 h-12 fill-white" viewBox="-2 -4 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin">
     <path d="M2.776 5.106L3.648 11h12.736l.867-5.98-3.493 3.02-3.755-4.827-3.909 4.811-3.318-2.918zm10.038-1.537l-.078.067.141.014 1.167 1.499 1.437-1.242.14.014-.062-.082 2.413-2.086a1 1 0 0 1 1.643.9L18.115 13H1.922L.399 2.7a1 1 0 0 1 1.65-.898L4.35 3.827l-.05.06.109-.008 1.444 1.27 1.212-1.493.109-.009-.06-.052L9.245.976a1 1 0 0 1 1.565.017l2.005 2.576zM2 14h16v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
    </svg>
    Leaderboard
   </h1>
   <div className="overflow-auto w-full max-w-2xl">
    {xp.length === 0 && <h3 className="text-center text-xl mt-4 font-bold">No users found!</h3>}
    {xp.length > 0 && (
     <>
      <div className="flex w-full text-neutral-400 px-6 mb-4 justify-between items-center gap-4">
       <span className="text-left">#</span>
       <span className="text-left">User</span>
       <span className="ml-auto space-x-4">
        <span className="text-right">XP</span>
        <span className="text-right opacity-70">Level</span>
       </span>
      </div>
      <div className="flex flex-col w-full">
       {xp.map((item, index) => (
        <Block key={index} className="flex flex-row duration-200 items-center py-2 justify-start gap-4">
         <span className="text-left">{index + 1}</span>
         <div className="relative">{item.user?.avatar && <Image src={`https://cdn.discordapp.com/avatars/${item.user?.discordId}/${item.user?.avatar}.${item.user?.avatar.startsWith("a_") ? "gif" : "png"}`} alt={item.user?.username} quality={95} width={32} height={32} className="w-12 h-12 rounded-full" />}</div>
         <Tooltip content={`Discord ID: ${item.user?.discordId}`}>
          <p className="font-bold text-left">
           {item.user?.name || item.user?.id}
           <span className="opacity-70">#{item.user?.discriminator || "0000"}</span>
          </p>
         </Tooltip>
         <div className="ml-auto space-x-4">
          <span className="text-right">{item.xp}xp</span>
          <span className="text-right opacity-70">{Math.floor(0.1 * Math.sqrt(item.xp || 0))}</span>
         </div>
        </Block>
       ))}
      </div>
     </>
    )}
   </div>
  </div>
 );
}
