import { CubeIcon, CubeTransparentIcon, SquaresPlusIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { botConfig } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import { getGuildMember, getServer } from "@majoexe/util/functions";
import clsx from "clsx";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { Block } from "@/components/blocks/Block";
import { UpdateCategories } from "@/components/blocks/client/UpdateCategories";
import { UpdateCommands } from "@/components/blocks/client/UpdateCommands";
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
   guildDisabledCommands: true,
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
     description: true,
     categoryName: true,
    },
   },
  },
 });

 return (
  <>
   <Header1>
    <SquaresPlusIcon className="min-h-12 min-w-12 min-h-12 min-w-12 h-12 w-12" />
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
        {botConfig.emojis.categories.find((cat) => cat.name === category.name.toLowerCase())?.emoji || "❔"} {category.name}
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

   <Block className="mt-4">
    <Header2>
     <CubeTransparentIcon className="min-h-8 min-w-8 h-8 w-8" />
     Commands
    </Header2>
    <p className="mb-4 mt-2 text-left">Enable or disable commands.</p>

    {categories.map((category) => (
     <div key={category.name}>
      <Header3 className="mb-4 mt-8">
       {botConfig.emojis.categories.find((cat) => cat.name === category.name.toLowerCase())?.emoji || "❔"} {category.name} ({category.commands.length} commands)
      </Header3>

      {guild.guildDisabledCategories.some((cat) => cat.categoryName === category.name) && (
       <div className="border-accent-primary bg-accent-primary/10 my-4 flex flex-row items-start whitespace-nowrap rounded-md border p-4">
        <span className="mr-1 flex flex-row items-center whitespace-nowrap font-bold">
         <InformationCircleIcon className="stroke-accent-primary min-w-5 min-h-5 mr-1 h-5 w-5" />
         Note:
        </span>
        <span className="whitespace-normal">You have to enable this category to change status of individual commands in it!</span>
       </div>
      )}
      <div
       className={clsx(
        {
         "pointer-events-none cursor-not-allowed opacity-30": guild.guildDisabledCategories.some((cat) => cat.categoryName === category.name),
        },
        "flex flex-wrap items-stretch justify-start gap-8"
       )}
      >
       {category.commands.map((command) => (
        <Block className="min-w-48" key={command.name}>
         <Header3 className="mb-4">
          /{command.name}
          <span className="ml-auto mr-0">
           <UpdateCommands serverId={serverDownload.id} commandName={command.name} commandEnabled={!guild.guildDisabledCommands.some((com) => com.commandName.toLowerCase() === command.name.toLowerCase())} />
          </span>
         </Header3>
         <p className="mb-4 mt-2 text-left">{command.description}</p>
        </Block>
       ))}
      </div>
     </div>
    ))}
   </Block>
  </>
 );
}
