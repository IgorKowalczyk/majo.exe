import { getFlags } from "@majoexe/util/functions/user";
import { getSession } from "lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Block } from "@/components/ui/Block";
import { buttonVariants } from "@/components/ui/Buttons";
import { DeleteUserData } from "@/app/user/components/DeleteUserData";
import Image from "@/components/ui/Image";
import { Tooltip } from "@/components/ui/Tooltip";
import { Emojis } from "@/components/DiscordEmojis";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export const revalidate = 3600; // 1 hour

export default async function Page() {
 const user = await getSession();
 if (!user) return redirect("/auth/login");

 return (
  <div className="flex w-full flex-col items-center px-8 pb-8 pt-16 antialiased md:p-16">
   <div className="flex flex-col justify-center gap-4">
    <div className="relative overflow-hidden rounded-lg border border-neutral-800 bg-background-navbar md:w-full">
     <>
      <div
       className="h-[100px] w-full bg-cover bg-center bg-no-repeat"
       style={{
        backgroundColor: "#" + (!user.accent_color ? "5c64f4" : user.accent_color.toString(16)),
        backgroundImage: `url(${user.banner})`,
       }}
      />
      <div className="flex h-[72px] w-auto flex-row justify-between gap-6 bg-background-navbar p-12">
       <div className="ml-[-16px] mt-[-20px] box-content flex items-center rounded-full">
        <Tooltip content="Click to see full size">
         <Link href={`${user.avatar}?size=2048`} target="_blank" className="size-24 shrink-0">
          <Image quality={100} src={user.avatar} alt={user.username} width={95} height={96} className="rounded-full !border-4 !border-solid !border-background-navbar backdrop-blur-sm duration-200 hover:opacity-75" />
         </Link>
        </Tooltip>
        <div className="ml-2 flex items-center text-lg font-bold">
         {user.discriminator === "0" ? (
          <>
           {user.global_name && user.username && (
            <Tooltip content={`@${user.username}`}>
             <div className="text-white">{user.global_name}</div>
            </Tooltip>
           )}
          </>
         ) : (
          <>
           <div className="text-white">{user.username}</div>
           <div className="text-white/60">#{user.discriminator}</div>
          </>
         )}

         {user.nitro > 0 && <Tooltip content="Nitro">{Emojis["nitro"]}</Tooltip>}

         {getFlags(user.public_flags) &&
          getFlags(user.public_flags).map((flag) => {
           return (
            <Tooltip key={`flag-${flag.name}`} content={flag.content}>
             {Emojis[flag.name as keyof typeof Emojis]}
            </Tooltip>
           );
          })}
        </div>
       </div>
       <div className="mb-[-14px] hidden w-full items-end justify-end md:flex">
        <Link href={`https://discord.com/users/${user.id}`} className={cn(buttonVariants({ variant: "primary" }))} target="_blank">
         <Icons.ExternalLink className={iconVariants({ variant: "button" })} /> Discord profile
        </Link>
       </div>
      </div>
      <div className="m-[8px_16px_16px] rounded-lg border border-neutral-800 bg-background-menu-button/70 p-4">Note: By default your banner and accent color are taken from Discord</div>
     </>
    </div>

    <div className="relative overflow-hidden rounded-lg border border-neutral-800 bg-background-navbar p-4 md:w-full">
     <Header className={cn(headerVariants({ variant: "h2" }))}>
      <Icons.Download className={iconVariants({ variant: "large", className: "!stroke-2" })} />
      Download data
     </Header>
     <p className="mt-2 leading-none text-white/70">
      Download all your data in a <code>.json</code> file. This includes your profile, data from all servers you are in and more.
     </p>
     <Link href="/api/user/download" className={cn(buttonVariants({ variant: "primary" }), "mt-4 w-fit")} target="_blank">
      <Icons.Download className={iconVariants({ variant: "button" })} />
      Download data
     </Link>
    </div>

    <Block theme="danger">
     <Header className={cn(headerVariants({ variant: "h2" }), "text-red-400")}>
      <Icons.warning className={iconVariants({ variant: "large", className: "stroke-red-400 !stroke-2" })} />
      Delete account
     </Header>
     <p className="mt-2 text-white/70">If you want to delete all your data and your account, click the button below. This action is irreversible.</p>
     <DeleteUserData />
    </Block>
   </div>
  </div>
 );
}
