import { useSession } from "next-auth/react";
import { Container } from "@components/blocks/Container";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

export default function Profile() {
 const { data: session, loading } = useSession();

 if (typeof window !== "undefined" && loading) return null;

 if (!session) {
  return;
 }

 return (
  <Container>
   <div className="m-auto flex h-screen min-w-[40rem] max-w-4xl flex-col items-center justify-center gap-4 ">
    <h1 className="flex items-start text-center font-poppins text-5xl"></h1>
    <div className="relative w-full overflow-hidden rounded-lg bg-[#141f2f]">
     <div
      className="h-[100px] w-full bg-cover bg-center bg-no-repeat"
      style={{
       backgroundColor: "#" + (!session.accent_color ? "5c64f4" : session.accent_color.toString(16)),
      }}
     />
     <div className="flex h-[72px] w-full justify-between bg-[#141f2f] p-[16px_16px_0_120px]">
      <div className="absolute top-[72px] left-[16px] box-content rounded-full">
       <Link href={`${session.user.image}?size=2048`}>
        <a target="_blank">
         <Image src={session.user.image} alt={session.username} width={94} height={94} className="rounded-full !border-4 !border-solid !border-[#141f2f]" />
        </a>
       </Link>
      </div>
      <div className="mb-[14px] flex w-full items-center justify-between font-semibold">
       <div className="flex text-lg">
        <div className="text-white">{session.username}</div>
        <div className="text-white/60">#{session.discriminator}</div>
       </div>
       <Link href="/invite">
        <a href="/invite" className="flex h-[40px] cursor-pointer items-center rounded bg-button-primary px-5 py-0 font-normal  text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none">
         <ArrowTopRightOnSquareIcon className="mr-2 h-4 w-4" aria-hidden="true" role="img" /> See global profile
        </a>
       </Link>
      </div>
     </div>
     <div className="m-[8px_16px_16px] rounded-lg bg-[#1c293c] p-4">Placeholder</div>
    </div>
   </div>
  </Container>
 );
}
