import { Invite } from "../components/buttons/Invite";
import { Login } from "../components/buttons/Login";

export default async function Main() {
 return (
  <div className="mb-36">
   <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-cover md:bg-shapes">
    <h1 className="text-center font-inter text-6xl font-bold text-white">
     <p>The only one Discord Bot</p>
     <p className="bg-gradient-to-r from-[#007CF0] to-[#00DFD8] box-decoration-clone bg-clip-text text-fill-transparent">you will ever need.</p>
    </h1>
    <h1></h1>
    <h2 className="max-w-[600px] text-center font-inter text-xl text-[#939DB8] px-4">Majo.exe will not only keep your server entertained but also assist you with moderation and many other things!</h2>
    <div className="mt-2 flex gap-4">
     <div className="shadow-xl shadow-button-primary/10 duration-300 hover:shadow-none">
      <Login />
     </div>
     <div className="shadow-xl shadow-button-secondary/10 duration-300 hover:shadow-none">
      <Invite />
     </div>
    </div>
   </div>

   <div className="flex flex-col items-center justify-center gap-4">
    <h1 className="text-center font-inter text-6xl font-bold text-white">
     Majo.exe is a <span className="bg-gradient-to-r from-[#007CF0] to-[#00DFD8] box-decoration-clone bg-clip-text text-fill-transparent">multipurpose</span> Discord Bot
    </h1>
    <h2 className="max-w-[600px] text-center font-inter text-xl text-[#939DB8] px-4">Majo.exe will not only keep your server entertained but also assist you with moderation and many other things!</h2>
   </div>
  </div>
 );
}
