import { PlusSmallIcon, RectangleStackIcon } from "@heroicons/react/24/outline";
import { PrimaryButton } from "components/buttons/Primary";
import { SecondaryButton } from "components/buttons/Secondary";
import { SWR } from "lib/swr";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { Container } from "../../components/blocks/Container";
import { authOptions } from "../api/auth/[...nextauth]";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/dist/tippy.css";

export default function Dashboard() {
 const { data: servers } = SWR("/api/servers/fetch");
 return (
  <Container>
   <div className="flex min-h-screen flex-col justify-center gap-4">
    <h1 className="flex items-center justify-center gap-4 text-center font-inter text-5xl font-bold">
     {servers ? <RectangleStackIcon className="h-10 w-10" aria-hidden="true" role="img" /> : <div className="box-border h-9 w-9 animate-[spin_500ms_linear_infinite] rounded-[50%] border-[4px] border-solid border-transparent border-t-white border-l-white motion-reduce:transition-none" />}
     Dashboard
    </h1>
    <h2 className="text-center font-inter text-xl opacity-50">You can only add the bot to servers you have the "Manage Server" permission in.</h2>
    <div className="flex flex-col gap-4">
     {servers && servers.length > 0 ? (
      servers.map((server) => (
       <div key={server.id} className="flex flex-row items-center justify-start gap-4">
        {server.icon ? <Image src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.icon.startsWith("a_") ? "gif" : "png"}`} alt={server.name} quality={95} width={64} height={64} className="w-16 h-16 rounded-full" /> : <div className="w-16 h-16 rounded-full bg-button-secondary" />}
        <h3 className="text-center font-inter text-xl font-bold">{server.name}</h3>

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
      <>
       {[...Array(5)].map((_, i) => (
        <div key={i} className="flex flex-row items-center">
         <div className="flex flex-row items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-button-secondary animate-pulse" style={{ animationDelay: `${150 * i - 50}ms` }} />
          <div className="w-40 h-8 rounded-full bg-button-secondary animate-pulse" style={{ animationDelay: `${150 * i - 50}ms` }} />
         </div>
         <div className="ml-auto">
          <div className="h-[40px] w-32 rounded bg-button-secondary animate-pulse" style={{ animationDelay: `${150 * i - 50}ms` }} />
         </div>
        </div>
       ))}
      </>
     )}
    </div>
   </div>
  </Container>
 );
}

export async function getServerSideProps(context) {
 const session = await getServerSession(context.req, context.res, authOptions);
 if (!session) return { redirect: { destination: "/auth/login", permanent: false } };
 return { props: { session } };
}
