import { AtSymbolIcon, ChatBubbleBottomCenterTextIcon, ChatBubbleLeftEllipsisIcon, LinkIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import prismaClient from "@majoexe/database";
import { getGuildMember, getServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { Block } from "@/components/blocks/Block";
import { Header1, Header5 } from "@/components/blocks/Headers";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/dist/tippy.css";

export const metadata = {
 title: "Leaderboard",
 description: "View the leaderboard for your server.",
};

export default async function ServerAutomod({ params }) {
 const session = await getSession();
 if (!session || !session.access_token) redirect("/auth/login");
 const { server } = params;
 const serverDownload = await getServer(server);
 if (!serverDownload || serverDownload.code === 10004 || !serverDownload.bot) return redirect("/auth/error?error=It%20looks%20like%20the%20server%20you%20are%20trying%20to%20display%20does%20not%20exist");
 const serverMember = await getGuildMember(serverDownload.id, session.access_token);
 if (
  // prettier
  !serverMember ||
  !serverMember.permissions_names ||
  !serverMember.permissions_names.includes("ManageGuild") ||
  !serverMember.permissions_names.includes("Administrator")
 )
  return redirect("/auth/error?error=It%20looks%20like%20you%20do%20not%20have%20permission%20to%20access%20this%20page.");

 await prismaClient.guild.upsert({
  where: {
   guildId: serverDownload.id,
  },
  update: {},
  create: {
   guildId: serverDownload.id,
  },
  include: {
   AutoMod: true,
  },
 });

 return (
  <>
   <Header1>
    <ChatBubbleBottomCenterTextIcon className="min-h-9 min-w-9 h-9 w-9" />
    Automod
   </Header1>
   <Header5 className="mb-4 mt-2 !justify-start !text-left">
    <span>Automatically moderate your server, block bad words, links and other things.</span>
   </Header5>
   <Block className="mb-4">
    <h2 className="mb-1 flex items-center justify-start gap-2 text-left text-2xl font-bold">
     <LinkIcon className="min-h-6 min-w-6 h-6 w-6" />
     Anti-Invite
    </h2>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing Discord server invites.</span>
    </p>
   </Block>
   <Block className="mb-4">
    <h2 className="mb-1 flex items-center justify-start gap-2 text-left text-2xl font-bold">
     <LinkIcon className="min-h-6 min-w-6 h-6 w-6" />
     Anti-Link
    </h2>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing links.</span>
    </p>
   </Block>
   <Block className="mb-4">
    <h2 className="mb-1 flex items-center justify-start gap-2 text-left text-2xl font-bold">
     <AtSymbolIcon className="min-h-6 min-w-6 h-6 w-6" />
     Anti-Menion
    </h2>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing mentions.</span>
    </p>
   </Block>
   <Block className="mb-4">
    <h2 className="mb-1 flex items-center justify-start gap-2 text-left text-2xl font-bold">
     <ChatBubbleLeftEllipsisIcon className="min-h-6 min-w-6 h-6 w-6" />
     Anti-Spam
    </h2>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages deemed as spam.</span>
    </p>
   </Block>
   <Block className="mb-4">
    <h2 className="mb-1 flex items-center justify-start gap-2 text-left text-2xl font-bold">
     <NoSymbolIcon className="min-h-6 min-w-6 h-6 w-6" />
     Anti-Badwords
    </h2>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing bad words.</span>
    </p>
   </Block>
  </>
 );
}
