import { getFlags } from "@nyxia/util/functions/user";
import { getSession } from "lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Block } from "@/components/Block";
import { ButtonPrimary } from "@/components/Buttons";
import DeleteAccount from "@/components/client/settings/DeleteUserData";
import Image from "@/components/client/shared/Image";
import { Tooltip } from "@/components/client/shared/Tooltip";
import { Emojis } from "@/components/DiscordEmojis";
import { Header2 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";

export const revalidate = 3600; // 1 hour

export default async function UserProfilePage() {
 const user = await getSession();
 if (!user) return redirect("/auth/login");

 return (
  <div className="flex w-full flex-col items-center px-8 pb-8 pt-16 antialiased md:px-16 md:py-16">
   <div className="flex flex-col justify-center gap-4">
    <div className="bg-background-navbar relative overflow-hidden rounded-lg border border-neutral-800 md:w-full">
     <>
      <div
       className="h-[100px] w-full bg-cover bg-center bg-no-repeat"
       style={{
        backgroundColor: "#" + (!user.accent_color ? "5c64f4" : user.accent_color.toString(16)),
        backgroundImage: `url(${user.banner})`,
       }}
      />
      <div className="bg-background-navbar flex h-[72px] w-auto flex-row justify-between gap-6 p-12">
       <div className="ml-[-16px] mt-[-20px] box-content flex items-center rounded-full">
        <Tooltip content="Click to see full size">
         <Link href={`${user.image}?size=2048`} target="_blank" className="h-24 min-h-24 w-24 min-w-24">
          <Image quality={100} src={user.image} alt={user.username} width={95} height={96} className="!border-background-navbar rounded-full !border-4 !border-solid backdrop-blur-sm duration-200 hover:opacity-75" />
         </Link>
        </Tooltip>
        <div className="ml-2 flex items-center text-lg font-bold">
         {user.discriminator === "0" ? (
          <>
           {user.global_name && user.username && <Tooltip content={`@${user.username}`} />}
           <div className="text-white">{user.global_name}</div>
          </>
         ) : (
          <>
           <div className="text-white">{user.username}</div>
           <div className="text-white/60">#{user.discriminator}</div>
          </>
         )}

         {user.nitro > 0 && <Tooltip content="Nitro">{Emojis["nitro"]}</Tooltip>}

         {getFlags(user.public_flags) &&
          getFlags(user.public_flags).map((flag, i) => {
           return (
            <Tooltip key={i} content={flag.content}>
             {Emojis[flag.name]}
            </Tooltip>
           );
          })}
        </div>
       </div>
       <div className="mb-[-14px] hidden w-full items-end justify-end md:flex">
        <ButtonPrimary href={`https://discord.com/users/${user.id}`} target="_blank">
         <Icons.externalLink className={iconVariants({ variant: "button" })} /> Discord profile
        </ButtonPrimary>
       </div>
      </div>
      <div className="bg-background-menu-button/70 m-[8px_16px_16px] rounded-lg border border-neutral-800 p-4">Note: By default your banner and accent color are taken from Discord</div>
     </>
    </div>

    <div className="bg-background-navbar relative overflow-hidden rounded-lg border border-neutral-800 p-4 md:w-full">
     <Header2>
      <Icons.download className={iconVariants({ variant: "large", className: "!stroke-2" })} />
      Download data
     </Header2>
     <p className="mt-2 leading-none text-white/70">
      Download all your data in a <code>.json</code> file. This includes your profile, data from all servers you are in and more.
     </p>
     <ButtonPrimary className="mt-4 w-fit" href="/api/user/download" target="_blank">
      <Icons.download className={iconVariants({ variant: "button" })} />
      Download data
     </ButtonPrimary>
    </div>

    <Block theme="danger">
     <Header2 className="text-red-400">
      <Icons.warning className={iconVariants({ variant: "large", className: "stroke-red-400 !stroke-2" })} />
      Delete account
     </Header2>
     <p className="mt-2 text-white/70">If you want to delete all your data and your account, click the button below. This action is irreversible.</p>
     <DeleteAccount userId={user.id} />
    </Block>
   </div>
  </div>
 );
}
