import { CubeIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";
import { botConfig } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import { getGuildMember, getServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { Block } from "@/components/blocks/Block";
import { UpdateCategories } from "@/components/blocks/client/UpdateCategories";
import { Header1, Header2, Header3 } from "@/components/blocks/Headers";

export default async function Settings({ params }) {
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

 const guild = await prismaClient.guild.findFirst({
  where: {
   guildId: serverDownload.id,
  },
  include: {
   guildDisabledCategories: true,
  },
 });

 if (!guild) {
  await prismaClient.guild.create({
   data: {
    guildId: serverDownload.id,
   },
  });
 }

 const categories = await prismaClient.commandCategories.findMany({
  select: {
   name: true,
   commands: {
    select: {
     name: true,
    },
   },
  },
 });

 return (
  <>
   <Header1>
    <SquaresPlusIcon className="min-h-12 min-w-12 h-12 w-12" />
    Modules
   </Header1>
   <Block>
    <Header2>
     <CubeIcon className="min-h-8 min-w-8 h-8 w-8" />
     Categories
    </Header2>
    <p className="mb-4 mt-2 text-left">Enable or disable categories of commands.</p>

    <div className="flex flex-wrap items-stretch justify-start gap-8">
     {categories.map((category) => (
      <Block className="min-w-48" key={category.name}>
       <Header3 className="mb-4">
        {botConfig.emojis.categories.find((cat) => cat.name === category.name.toLowerCase()).emoji} {category.name}
        <span className="ml-auto mr-0">
         <UpdateCategories serverId={serverDownload.id} categoryName={category.name} categoryEnabled={!guild.guildDisabledCategories.some((cat) => cat.categoryName === category.name)} />
        </span>
       </Header3>
       {category.commands.slice(0, 6).map((command) => (
        <code className="ml-2" key={command.name}>
         /{command.name}
        </code>
       ))}

       {category.commands.length > 6 && <p className="mb-4 mt-2 text-left opacity-60">...and {category.commands.length - 6} more commands</p>}
      </Block>
     ))}
    </div>
   </Block>
  </>
 );
}
