import { Container } from "@components/elements/blocks/Container";
import Login from "@components/elements/buttons/Login";

export default function Main(props) {
 return (
  <Container>
   <div className="flex h-screen  flex-col items-center justify-center  gap-4 ">
    <h1 className="ml-[61px] flex items-start text-center font-poppins text-5xl">
     Majo.exe <span className="rounded bg-background-secondary py-1 px-2 text-base">v6.0.0</span>
    </h1>
    <h2 className="text-center font-poppins text-xl opacity-50">Don't log into the panel unless you know what you're doing</h2>
    <Login />
   </div>
  </Container>
 );
}
