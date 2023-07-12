import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { getFlags } from "@majoexe/util/functions";
import { Emojis } from "components/decorations/emojis";
import { getSession } from "lib/session";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Tooltip } from "@/components/blocks/client/Tooltip";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/dist/tippy.css";

export default async function Profile() {
 const user = await getSession();
 if (!user) return redirect("/auth/login");

 return (
  <div className="flex w-full flex-col items-center bg-background-primary px-8 py-8 antialiased md:px-16 md:py-16">
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
      <div className="flex h-[72px] w-auto  flex-row justify-between gap-6 bg-background-navbar p-12">
       <div className="ml-[-16px] mt-[-20px] box-content flex items-center rounded-full">
        <Tooltip content="Click to see full size">
         <Link href={`${user.image}?size=2048`} target="_blank" className="h-24 w-24">
          <Image quality={100} src={user.image} alt={user.username} width={94} height={94} className="rounded-full !border-4 !border-solid !border-background-navbar backdrop-blur-sm duration-200 hover:opacity-75" />
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
       <div className="mb-[-14px] hidden w-full items-end justify-end font-semibold md:flex">
        <Link href={`https://discord.com/users/${user.id}`} target="_blank" className="flex h-[40px] cursor-pointer items-center rounded bg-button-primary px-4 py-0 font-normal  text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none">
         <ArrowTopRightOnSquareIcon className="mr-2 h-4 w-4" aria-hidden="true" role="img" /> See global profile
        </Link>
       </div>
      </div>
      <div className="m-[8px_16px_16px] rounded-lg border border-neutral-800 bg-background-menu-button/70 p-4">Note: By default your banner and accent color are taken from Discord</div>
     </>
    </div>
   </div>
  </div>
 );
}
