import { Container } from "@components/elements/blocks/Container";
import { Nav } from "@components/elements/nav/Nav";
import Login from "@components/elements/buttons/Login";

export default function Main(props) {
 return (
  <>
   <Nav />
   <Container>
    <div className="flex h-screen flex-col items-center justify-center gap-4">
     <h1 className="text-center font-poppins text-5xl flex items-start ml-[61px]">Majo.exe <span className="bg-background-secondary rounded py-1 px-2 text-base">v6.0.0</span></h1>
     <h3 className="text-center font-poppins text-xl opacity-50">Don't log into the panel unless you know what you're doing

</h3>
     <Login />
    </div>
   </Container>
  </>
 );
}
