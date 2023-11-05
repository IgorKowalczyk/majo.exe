import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import prismaClient from "@majoexe/database";
import { getGuildMember, getServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import Balancer from "react-wrap-balancer";
import { Block } from "@/components/blocks/Block";
import { ManageWarns } from "@/components/blocks/client/lists/Warns";
import Image from "@/components/blocks/client/shared/Image";
import { Header5 } from "@/components/blocks/Headers";
import { SecondaryButton } from "@/components/buttons/server/Secondary";

export async function generateMetadata({ params }) {
 const { id, server } = params;

 const guild = await prismaClient.guild.findFirst({
  where: {
   guildId: server,
  },
 });

 if (!guild) {
  return {
   title: "Server warns",
   description: "View the warn logs of your server.",
  };
 }

 const user = await prismaClient.user.findFirst({
  where: {
   discordId: id,
  },
 });

 if (!user) {
  return {
   title: "Server warns",
   description: "View the warn logs of your server.",
  };
 }

 return {
  title: `${user.global_name || user.name} warns`,
  description: `View the warn logs of ${user.global_name}.`,
 };
}

export default async function ServerLogs({ params }) {
 const session = await getSession();
 if (!session || !session.access_token) redirect("/auth/login");
 const { server, id } = params;
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

 const user = await prismaClient.user.findFirst({
  where: {
   discordId: id,
  },
 });

 if (!user) {
  return redirect("/auth/error?error=It%20looks%20like%20the%20user%20you%20are%20trying%20to%20display%20does%20not%20exist");
 }

 const guild = await prismaClient.guild.findFirst({
  where: {
   guildId: serverDownload.id,
  },
 });

 if (!guild) {
  await prismaClient.guild.create({
   data: {
    guildId: serverDownload.id,
   },
  });
 }

 const warns = await prismaClient.guildWarns.findMany({
  where: {
   guildId: serverDownload.id,
   userId: id,
  },
  orderBy: {
   createdAt: "desc",
  },
  include: {
   user: true,
  },
 });

 warns.forEach(async (warn) => {
  if (warn.createdAt instanceof Date) {
   warn.createdAt = warn.createdAt.toISOString();
  } else {
   warn.createdAt = new Date().toISOString();
  }
  warn.loading = false;

  warn.addedBy = await prismaClient.user.findFirst({
   where: {
    discordId: warn.createdById,
   },
  });
 });

 return (
  <>
   <div className="mb-4 flex flex-col items-center justify-normal gap-4 text-3xl font-bold sm:flex-row md:text-4xl">
    {user.avatar ? <Image src={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.${user.avatar.startsWith("a_") ? "gif" : "png"}`} alt={`${user.global_name || user.name} avatar`} quality={95} width={96} height={96} className="min-h-24 min-w-24 h-24 w-24 rounded-full" /> : <div className="bg-button-secondary min-h-24 min-w-24 h-24 w-24 rounded-full" />}
    <div className="ml-4 flex flex-col text-center sm:text-left">
     <span>
      {user.global_name || user.name} warns <span className="text-accent-primary">({warns.length})</span>
     </span>
     <Header5 className="mt-2 text-center opacity-60 sm:text-left">
      <Balancer>This user has {warns.length} warns. Here you can view all of them and manage them.</Balancer>
     </Header5>
    </div>
    <span className="ml-auto mr-0 text-base font-normal">
     <SecondaryButton className="w-fit" href={`/dashboard/${server}/warns`}>
      <ArrowLeftIcon className="min-h-5 min-w-5 -ml-1 mr-2 h-5 w-5" />
      Go back
     </SecondaryButton>
    </span>
   </div>

   <Block className="flex w-full overflow-auto">
    {warns.length === 0 && <h3 className="text-left text-xl font-bold">Hooray! No warns have been issued yet.</h3>}
    {warns.length > 0 && (
     <div className="mt-4 w-full">
      <ManageWarns data={warns} guildId={serverDownload.id} />
     </div>
    )}
   </Block>
  </>
 );
}
