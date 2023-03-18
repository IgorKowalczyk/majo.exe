import { PlusSmallIcon } from "@heroicons/react/24/outline";
import { canAddBotToServer } from "@majoexe/util/src/functions/checkPermissions";
import { getServers } from "@majoexe/util/src/functions/getServers";
import Tippy from "@tippyjs/react";
import { PrimaryButton } from "components/buttons/Primary";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { animateFill } from "tippy.js";
import { Container } from "../components/blocks/Container";
import { authOptions } from "./api/auth/[...nextauth]";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/dist/tippy.css";

export default function Dashboard({ filteredServers }) {
 return (
  <Container>
   <div className="flex min-h-screen flex-col justify-center gap-4">
    <h1 className="flex items-center justify-center gap-4 text-center font-inter text-5xl font-bold">Dashboard</h1>
    <h2 className="text-center font-inter text-xl opacity-50">You can only add the bot to servers you have the "Manage Server" permission in.</h2>
    <div className="flex flex-col gap-4">
     {filteredServers.length > 0 ? (
      filteredServers.map((server) => (
       <div key={server.id} className="flex flex-row items-center justify-start gap-4">
        {server.icon ? <Image src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.icon.startsWith("a_") ? "gif" : "png"}`} alt={server.name} quality={95} width={64} height={64} className="w-16 h-16 rounded-full" /> : <div className="w-16 h-16 rounded-full bg-button-secondary" />}
        <h3 className="text-center font-inter text-xl font-bold">{server.name}</h3>

        <Tippy animation="shift-away" placement="left" hideOnClick={false} duration={250} animateFill={true} plugins={[animateFill]} className="tippy-box" theme="translucent" content={"Soon!"}>
         <div className="ml-auto opacity-50 cursor-not-allowed">
          <PrimaryButton className="ml-auto opacity-50 cursor-not-allowed">
           <PlusSmallIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" /> Add bot
          </PrimaryButton>
         </div>
        </Tippy>
       </div>
      ))
     ) : (
      <h3 className="text-center font-inter text-xl font-bold text-red-400">No servers found! You need 'Manage Server" permission in any server!</h3>
     )}
    </div>
   </div>
  </Container>
 );
}

export async function getServerSideProps(context) {
 const session = await getServerSession(context.req, context.res, authOptions);
 if (!session) return { redirect: { destination: "/auth/login", permanent: false } };
 const servers = (await getServers(session.access_token)) || [];
 const filteredServers = servers.length > 0 ? servers.filter((server) => canAddBotToServer(server.permissions)) : [];
 return { props: { session, filteredServers } };
}
