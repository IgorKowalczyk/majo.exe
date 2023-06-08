import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { getFlags } from "@majoexe/util/functions";
import { Emojis } from "components/decorations/emojis";
import { getSession } from "lib/session";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Tooltip } from "@/components/blocks/client/Tooltip";

export default async function Profile() {
 const user = await getSession();
 if (!user) return redirect("/auth/login");

 return (
  <div className="flex w-full flex-col items-center bg-background-primary antialiased md:py-16 md:px-16 px-8 py-8">
   <div className="flex flex-col justify-center gap-4">
    <div className="relative md:w-full overflow-hidden rounded-lg bg-background-navbar border border-neutral-800">
     <>
      <div
       className="h-[100px] w-full bg-cover bg-center bg-no-repeat"
       style={{
        backgroundColor: "#" + (!user.accent_color ? "5c64f4" : user.accent_color.toString(16)),
        backgroundImage: `url(${user.banner})`,
       }}
      />
      <div className="flex h-[72px] gap-6  w-auto justify-between bg-background-navbar p-12 flex-row">
       <div className="mt-[-20px] ml-[-16px] box-content rounded-full flex items-center">
        <Tooltip content="Click to see full size">
         <Link href={`${user.image}?size=2048`} target="_blank" className="w-24 h-24">
          <Image quality={100} src={user.image} alt={user.username} width={94} height={94} className="hover:opacity-75 duration-200 rounded-full backdrop-blur-sm !border-4 !border-solid !border-background-navbar" />
         </Link>
        </Tooltip>
        <div className="flex text-lg items-center font-bold ml-2">
         <div className="text-white">{user.username}</div>
         <div className="text-white/60">#{user.discriminator}</div>
         {user.premium_type > 0 && <Tooltip content="Nitro">{Emojis["nitro"]}</Tooltip>}

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
       <div className="mb-[-14px] w-full items-end justify-end font-semibold md:flex hidden">
        <Link href={`https://discord.com/users/${user.id}`} target="_blank" className="flex h-[40px] cursor-pointer items-center rounded bg-button-primary px-4 py-0 font-normal  text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none">
         <ArrowTopRightOnSquareIcon className="mr-2 h-4 w-4" aria-hidden="true" role="img" /> See global profile
        </Link>
       </div>
      </div>
      <div className="m-[8px_16px_16px] rounded-lg bg-background-menu-button/70 border border-neutral-800 p-4">Note: By default your banner and accent color are taken from Discord</div>
     </>
    </div>
   </div>
  </div>
 );
}
