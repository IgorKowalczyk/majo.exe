import { Container } from "@components/blocks/Container";
import { Login } from "@components/buttons/Login";
import { Invite } from "@components/buttons/Invite";

export default function Main() {
 return (
  <Container>
   <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-cover md:bg-shapes">
    <h1 className="ml-[61px] flex items-start text-center font-inter text-6xl font-normal text-white">
     Majo.exe <span className="ml-2 rounded bg-background-secondary py-1 px-2 text-base">v6.0.0</span>
    </h1>
    <h2 className="text-center font-inter text-xl text-white opacity-50">Don't log into the panel unless you know what you're doing</h2>
    <div className="flex gap-4">
     <Login />
     <Invite />
    </div>
   </div>
  </Container>
 );
}
