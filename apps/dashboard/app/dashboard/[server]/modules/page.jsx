import { botConfig } from "@nyxia/config";
import prismaClient from "@nyxia/database";
import { getGuildMember, getServer } from "@nyxia/util/functions/guild";
import clsx from "clsx";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { Block } from "@/components/Block";
import { UpdateCategories } from "@/components/client/commandModules/UpdateCategories";
import { UpdateCommands } from "@/components/client/commandModules/UpdateCommands";
import { Tooltip } from "@/components/client/shared/Tooltip";
import { Header1, Header2, Header3 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";

export default async function ModulesPage({ params }) {
 const session = await getSession();
 if (!session || !session.access_token) redirect("/auth/login");
 const { server } = params;
 const serverDownload = await getServer(server);
 if (!serverDownload || serverDownload.code === 10004 || !serverDownload.bot) return notFound();
 const serverMember = await getGuildMember(serverDownload.id, session.access_token);
 if (
  // prettier
  !serverMember ||
  !serverMember.permissions_names ||
  !serverMember.permissions_names.includes("ManageGuild") ||
  !serverMember.permissions_names.includes("Administrator")
 )
  return notFound();

 const guild = await prismaClient.guild.upsert({
  where: {
   guildId: serverDownload.id,
  },
  update: {},
  create: {
   guildId: serverDownload.id,
  },
  include: {
   guildDisabledCategories: true,
   guildDisabledCommands: true,
  },
 });

 const categories = await prismaClient.commandCategories.findMany({
  select: {
   name: true,
   commands: {
    select: {
     name: true,
     description: true,
     options: true,
     categoryName: true,
    },
   },
  },
 });

 return (
  <>
   <Header1>
    <Icons.packagePlus className={iconVariants({ variant: "extraLarge" })} />
    Modules
   </Header1>
   <Block className="mt-4">
    <Header2>
     <Icons.blocks className={iconVariants({ variant: "large", className: "!stroke-2" })} />
     Categories
    </Header2>
    <p className="mb-4 mt-2 text-left">Enable or disable categories of commands.</p>

    <div className="flex flex-wrap items-stretch justify-start gap-8">
     {categories.map((category) => (
      <Block className="min-w-48" key={category.name}>
       <p className="mb-4 flex items-center gap-4 text-center text-xl font-bold">
        {botConfig.emojis.categories.find((cat) => cat.name === category.name.toLowerCase())?.emoji || "❔"} {category.name}
        <span className="ml-auto mr-0">
         <UpdateCategories serverId={serverDownload.id} categoryName={category.name} categoryEnabled={!guild.guildDisabledCategories.some((cat) => cat.categoryName === category.name)} />
        </span>
       </p>
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
     <Icons.slash className={iconVariants({ variant: "large", className: "!stroke-2" })} />
     Commands
    </Header2>
    <p className="mb-4 mt-2 text-left">Enable or disable commands.</p>

    {categories.map((category) => (
     <div key={category.name}>
      <Header3 className="mb-4 mt-8">
       {botConfig.emojis.categories.find((cat) => cat.name === category.name.toLowerCase())?.emoji || "❔"} {category.name} ({category.commands.length} commands)
      </Header3>

      {guild.guildDisabledCategories.some((cat) => cat.categoryName === category.name) && (
       <div className="border-accent-primary bg-accent-primary/10 my-4 flex flex-row flex-wrap items-start whitespace-nowrap rounded-md border p-4">
        <span className="mr-1 flex flex-row items-center whitespace-nowrap font-bold">
         <Icons.info className={iconVariants({ variant: "normal", className: "stroke-accent-primary mr-1" })} /> Note:
        </span>
        <span className="whitespace-normal">You have to enable this category to change status of individual commands in it!</span>
       </div>
      )}
      <div
       className={clsx(
        {
         "pointer-events-none cursor-not-allowed opacity-30": guild.guildDisabledCategories.some((cat) => cat.categoryName === category.name),
        },
        "flex flex-col items-stretch justify-start"
       )}
      >
       {category.commands.map((command) => (
        <div key={command.name} className="bg-background-navbar hide-scrollbar my-2 w-full overflow-scroll rounded-md border border-neutral-800 px-6 py-4">
         <div className="flex flex-row items-center justify-between">
          <div
           className={clsx(
            {
             "cursor-not-allowed opacity-70": guild.guildDisabledCommands.some((com) => com.commandName.toLowerCase() === command.name.toLowerCase()),
            },
            "flex flex-col items-start gap-2"
           )}
          >
           <div className="flex items-center font-bold">
            /{command.name}{" "}
            {command.options &&
             command.options.map((option) => (
              <span
               key={option.name}
               className={clsx(
                {
                 "!font-normal opacity-70": !option.required,
                 "opacity-100": option.required,
                },
                "ml-2 [line-height:normal]"
               )}
              >
               <Tooltip content={`${option.description} ${option.required ? "(required)" : "(optional)"}`}>
                <code className="cursor-pointer">
                 {option.name}
                 {option.required ? <span className="text-red-400">*</span> : ""}
                </code>
               </Tooltip>
              </span>
             ))}
           </div>
           <p className="opacity-70">{command.description}</p>
          </div>
          <UpdateCommands serverId={serverDownload.id} commandName={command.name} commandEnabled={!guild.guildDisabledCommands.some((com) => com.commandName.toLowerCase() === command.name.toLowerCase())} />
         </div>
        </div>
       ))}
      </div>
     </div>
    ))}
   </Block>
  </>
 );
}
