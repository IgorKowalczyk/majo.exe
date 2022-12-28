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
       <Link href={`${session.user.image}?size=2048`} target="_blank">
        <Image src={session.user.image} alt={session.username} width={94} height={94} className="rounded-full !border-4 !border-solid !border-[#141f2f]" />
       </Link>
       <div className="flex text-lg items-center font-bold ml-2">
        <div className="text-white">{session.username}</div>
        <div className="text-white/60">#{session.discriminator}</div>
        {session.premium_type > 0 && (
         <svg className="ml-2" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="12" fill="#fff" r="6" />
          <path clip-rule="evenodd" d="m2.20812 10.124c.42636 0 .7816-.34817.7816-.76611 0-.41793-.35524-.76615-.7816-.76615h-.42635c-.42636 0-.78177.34822-.78177.76615 0 .41794.35541.76611.78177.76611zm16.13038 9.2643c4.0504-1.811 5.7558-6.4083 3.9083-10.23937-1.2791-2.71657-3.9793-4.31859-6.8217-4.45801h-8.02965c-.71065 0-1.20812.55735-1.20812 1.18425 0 .69645.56859 1.18409 1.20812 1.18409h2.06067c.42635 0 .78158.34822.78158.76616 0 .41793-.35523.76632-.78158.76632h-5.04517c-.42635 0-.78176.34822-.78176.76615 0 .41794.35541.76611.78176.76611h3.62404c.42635 0 .78159.3484.78159.7664 0 .4179-.35524.7661-.78159.7661h-2.27402c-.42636 0-.7816.3482-.7816.7662 0 .4179.35524.7663.7816.7663h1.56336c.07112.8359.2843 1.6717.63954 2.4379 1.77654 3.8311 6.46643 5.5028 10.37463 3.7614zm-7.2725-5.1884c-1.0318-2.2025-.0466-4.80794 2.2003-5.81933 2.2469-1.0114 4.9049-.04564 5.9366 2.15683 1.0318 2.2025.0468 4.8079-2.2003 5.8193-2.2469 1.0114-4.9048.0457-5.9366-2.1568z" fill="#4f5d7f" fill-rule="evenodd" />
          <path d="m16.8142 9.86662 1.4212 2.36838c.0711.1392.0711.2089 0 .3482l-1.4212 2.3683c-.0711.1393-.2131.1393-.2842.1393h-2.7714c-.142 0-.2131-.0697-.2841-.1393l-1.4213-2.3683c-.0709-.1393-.0709-.209 0-.3482l1.4213-2.36838c.071-.13926.2132-.13926.2841-.13926h2.7714c.1422-.06971.2131 0 .2842.13926z" fill="#c5cedd" />
         </svg>
        )}
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
