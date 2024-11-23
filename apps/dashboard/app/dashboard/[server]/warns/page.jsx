import prismaClient from "@majoexe/database";
import { getGuildFromMemberGuilds, getGuild } from "@majoexe/util/functions/guild";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { Block } from "@/components/Block";
import { Warns } from "@/components/client/lists/Warns";
import { Header1, Header5 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";

export const metadata = {
 title: "Warns",
 description: "View the warn logs of your server.",
};

export default async function WarnsPage(props) {
 const params = await props.params;
 const session = await getSession();
 if (!session || !session.access_token) redirect("/auth/login");
 const { server } = params;
 const serverDownload = await getGuild(server);
 if (!serverDownload || serverDownload.code === 10004 || !serverDownload.bot) return notFound();
 const serverMember = await getGuildFromMemberGuilds(serverDownload.id, session.access_token);
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
   guildWarns: {
    orderBy: {
     createdAt: "desc",
    },
    include: {
     user: {
      select: {
       discordId: true,
       name: true,
       avatar: true,
       discriminator: true,
      },
     },
    },
   },
  },
 });

 const data =
  guild.guildWarns?.map((warn) => {
   if (warn.createdAt instanceof Date) {
    warn.createdAt = warn.createdAt.toISOString();
   } else {
    warn.createdAt = new Date().toISOString();
   }
   warn.link = warn.user.discordId;

   return warn;
  }) || [];

 return (
  <>
   <Header1>
    <Icons.warning className={iconVariants({ variant: "extraLarge" })} />
    Warns <span className="text-accent-primary">({data.length})</span>
   </Header1>
   <Header5 className="mb-4 !block !justify-start gap-1 !text-left">
    Here you can view all users warns issued by users with the <code>Manage Server</code> permission.
   </Header5>
   <Block className="mt-4 flex w-full overflow-auto">
    {data.length === 0 && (
     <p className="flex items-center gap-2 text-left">
      <Icons.sparkles className={iconVariants({ variant: "normal" })} />
      Hooray! No warns have been issued yet.
     </p>
    )}
    {data.length > 0 && <Warns data={data} />}
   </Block>
  </>
 );
}
