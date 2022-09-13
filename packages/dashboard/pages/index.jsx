import { Container } from "@components/blocks/Container";
import { Login } from "@components/buttons/Login";
import { Invite } from "@components/buttons/Invite";

export default function Main() {
 return (
  <Container>
   <div className="flex h-screen  flex-col items-center justify-center gap-4 md:bg-shapes bg-cover">
    <h1 className="ml-[61px] flex items-start text-center font-poppins text-5xl text-white">
     Majo.exe <span className="rounded bg-background-secondary ml-2 py-1 px-2 text-base">v6.0.0</span>
    </h1>
    <h2 className="text-center font-poppins text-xl opacity-50 text-white">Don't log into the panel unless you know what you're doing</h2>
    <div className="flex gap-4">
     <Login />
     <Invite />
    </div>
   </div>
  </Container>
 );
}
