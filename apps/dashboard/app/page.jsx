import { Invite } from "components/buttons/Invite";
import { Login } from "components/buttons/Login";

export default async function Main() {
 return (
  <div className="mb-36 -mt-11">
   <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-cover md:bg-shapes">
    <h1 className="text-center  text-6xl font-bold bg-gradient-to-b from-white to-white/60 box-decoration-clone bg-clip-text text-fill-transparent">
     <p>The only one Discord Bot</p>
     <p>you will ever need.</p>
    </h1>
    <h1></h1>
    <h2 className="max-w-[600px] text-center  text-xl text-[#939DB8] px-4">Majo.exe will not only keep your server entertained but also assist you with moderation and many other things!</h2>
    <div className="mt-2 flex gap-4">
     <Login />
     <Invite />
    </div>
   </div>

   <div className="flex flex-col items-center justify-center gap-4">
    <h1 className="text-center  text-6xl font-bold text-white">
     Majo.exe is a <span className="bg-gradient-to-r from-[#007CF0] to-[#00DFD8] box-decoration-clone bg-clip-text text-fill-transparent">multipurpose</span> Discord Bot
    </h1>
    <h2 className="max-w-[600px] text-center  text-xl text-[#939DB8] px-4">Majo.exe will not only keep your server entertained but also assist you with moderation and many other things!</h2>
   </div>
  </div>
 );
}
