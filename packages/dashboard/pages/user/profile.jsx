import { useSession } from "next-auth/react";
import { Container } from "../../components/blocks/Container";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { Emojis } from "components/decorations/emojis";
import { getFlags } from "@majoexe/util/src/functions/getFlags";
import Tippy from "@tippyjs/react";
import { animateFill } from "tippy.js";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/dist/tippy.css";

export default function Profile() {
 const { data: session, loading } = useSession();
 if (typeof window !== "undefined" && loading) return null;
 if (!session) {
  return;
 }

 console.log(getFlags(session.public_flags));
 return (
  <Container>
   <div className="m-auto flex h-screen min-w-[24em] md:min-w-[40em] max-w-4xl w-auto flex-col items-center justify-center gap-4 ">
    <h1 className="flex items-start text-center font-inter text-5xl"></h1>
    <div className="relative w-full overflow-hidden rounded-lg bg-[#141f2f]">
     <div
      className="h-[100px] w-full bg-cover bg-center bg-no-repeat"
      style={{
       backgroundColor: "#" + (!session.accent_color ? "5c64f4" : session.accent_color.toString(16)),
       backgroundImage: `url(${session.banner})`,
      }}
     />
     <div className="flex h-[72px] w-auto min-w-[24em] md:min-w-[40em] max-w-4xl justify-between bg-[#141f2f] p-[16px_16px_0_120px]">
      <div className="absolute top-[80px] left-[16px] box-content rounded-full flex items-center">
       <Tippy animation="shift-away" hideOnClick={false} duration={400} animateFill={true} plugins={[animateFill]} className="tippy-box" theme="translucent" content={"View avatar"}>
        <Link href={`${session.user.image}?size=2048`} target="_blank">
         <Image quality={100} src={session.user.image} alt={session.username} width={94} height={94} className="hover:opacity-75 duration-200 rounded-full !border-4 !border-solid !border-[#141f2f]" />
        </Link>
       </Tippy>
       <div className="flex text-lg items-center font-bold ml-2">
        <div className="text-white">{session.username}</div>
        <div className="text-white/60">#{session.discriminator}</div>
        {session.premium_type > 0 && (
         <Tippy animation="shift-away" hideOnClick={false} duration={400} animateFill={true} plugins={[animateFill]} className="tippy-box" theme="translucent" content={"Nitro"}>
          {Emojis["nitro"]}
         </Tippy>
        )}

        {getFlags(session.public_flags) &&
         getFlags(session.public_flags).map((flag, i) => {
          return (
           <Tippy key={i} animation="shift-away" hideOnClick={false} duration={400} animateFill={true} plugins={[animateFill]} className="tippy-box" theme="translucent" content={flag.content}>
            {Emojis[flag.name]}
           </Tippy>
          );
         })}
       </div>
      </div>
      <div className="mb-[14px] w-full items-end justify-end font-semibold md:flex hidden">
       <Link href={`https://discord.com/users/${session.id}`} target="_blank" className="flex h-[40px] cursor-pointer items-center rounded bg-button-primary px-4 py-0 font-normal  text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none">
        <ArrowTopRightOnSquareIcon className="mr-2 h-4 w-4" aria-hidden="true" role="img" /> See global profile
       </Link>
      </div>
     </div>
     <div className="m-[8px_16px_16px] rounded-lg bg-[#1c293c] p-4">Your servers: NaN</div>
    </div>
   </div>
  </Container>
 );
}
