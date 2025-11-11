import { getMemberGuilds, isBotInServer } from "@majoexe/util/functions/guild";
import { getSession } from "lib/session";
import { HomeIcon, InfoIcon, NavigationIcon, PlusIcon, TriangleAlertIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { buttonVariants } from "@/components/ui/Buttons";
import Header, { headerVariants } from "@/components/ui/Headers";
import { iconVariants } from "@/components/ui/Icons";
import Image from "@/components/ui/Image";
import { cn } from "@/lib/utils";

export default async function Page() {
  const session = await getSession();
  if (!session || !session.access_token) redirect("/auth/login");

  const data = (await getMemberGuilds(session.access_token)) || [];

  const servers = await Promise.all(
    data
      .filter((server) => server.permissions_names.includes("ManageGuild") || server.permissions_names.includes("Administrator"))
      .map(async (server) => {
        server.bot = await isBotInServer(server.id);
        return server;
      })
  );

  servers.sort((a, b) => (a.bot && !b.bot ? -1 : !a.bot && b.bot ? 1 : 0));

  return (
    <div className="flex w-full flex-col items-center px-8 pb-8 pt-16 antialiased md:p-16">
      <div className="flex flex-col justify-center">
        <div className="mt-4 flex flex-row flex-wrap justify-center gap-3 sm:flex-col">
          {servers && servers.length > 0 ? (
            <>
              <div>
                <Header className={cn(headerVariants({ variant: "h1", alignment: "center", margin: "normal" }))}>
                  <NavigationIcon className={iconVariants({ variant: "extraLarge" })} />
                  Choose a server
                </Header>
                <p className="mb-4 text-center text-base text-white/50 md:text-xl">Select a server to manage, or add the bot to a new server.</p>
              </div>
              {servers.map((server) => (
                <div key={server.id}>
                  <div className="hidden flex-row items-center justify-start gap-3 sm:flex">
                    {server.icon ? (
                      <Image
                        src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.icon.startsWith("a_") ? "gif" : "png"}`}
                        alt={server.name}
                        quality={95}
                        width={64}
                        height={64}
                        className="size-16 shrink-0 rounded-full"
                      />
                    ) : (
                      <div className="size-16 shrink-0 rounded-full bg-button-secondary" />
                    )}
                    <Header className={cn(headerVariants({ variant: "h3" }))}>{server.name}</Header>
                    <>
                      {server.bot ? (
                        <Link href={`/dashboard/${server.id}`} className={cn(buttonVariants({ variant: "primary" }), "ml-auto")}>
                          <PlusIcon className={iconVariants({ variant: "button" })} /> Manage
                        </Link>
                      ) : (
                        <Link href={`/api/invite/${server.id}`} className={cn(buttonVariants({ variant: "secondary" }), "ml-auto cursor-copy")}>
                          <PlusIcon className={iconVariants({ variant: "button" })} /> Invite
                        </Link>
                      )}
                    </>
                  </div>
                  <div className="sm:hidden">
                    <Link href={server.bot ? `/dashboard/${server.id}` : `/api/invite/${server.id}`}>
                      {server.icon ? (
                        <Image
                          src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.icon.startsWith("a_") ? "gif" : "png"}`}
                          alt={server.name}
                          quality={95}
                          width={64}
                          height={64}
                          className={cn(
                            {
                              "opacity-20": !server.bot,
                            },
                            "size-24 shrink-0 rounded-lg"
                          )}
                        />
                      ) : (
                        <div
                          className={cn(
                            {
                              "opacity-20": !server.bot,
                            },
                            "bg-button-secondary size-24 shrink-0 rounded-lg"
                          )}
                        />
                      )}
                    </Link>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Header className={cn(headerVariants({ variant: "h1", alignment: "center", margin: "normal" }))}>
                <TriangleAlertIcon className={iconVariants({ variant: "extraLarge" })} />
                You don&apos;t have any servers!
              </Header>
              <p className="mb-6 text-center text-base text-white/50 md:text-xl">
                It seems like you&apos;re not in any servers that you can manage, try joining a server or creating one.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/api/invite" className={cn(buttonVariants({ variant: "primary" }))}>
                  <PlusIcon className={iconVariants({ variant: "button" })} /> Invite Majo.exe
                </Link>
                <Link href="/" className={cn(buttonVariants({ variant: "secondary" }))}>
                  <HomeIcon className={iconVariants({ variant: "button" })} /> Go home
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="my-4 mt-12 flex flex-row flex-wrap items-start whitespace-nowrap rounded-lg border border-accent-primary bg-accent-primary/10 p-4">
          <span className="mr-1 flex flex-row items-center gap-1 whitespace-nowrap font-bold">
            <InfoIcon className={iconVariants({ variant: "normal", className: "stroke-accent-primary" })} /> Note:
          </span>
          <span className="whitespace-normal">
            You can only add the bot to servers you have the <code className="inline">Manage Server</code> permission in.
          </span>
        </div>
      </div>
    </div>
  );
}
