import { Container } from "@components/elements/blocks/Container";
import { Nav } from "@components/elements/nav/Nav";
import Login from "@components/elements/buttons/Login";

export default function Main(props) {
 return (
  <>
   <Nav />
   <Container>
    <div className="flex h-screen flex-col items-center justify-center gap-2">
     <h1 className="font-poppins text-5xl">Soon!</h1>
     <h3 className="font-poppins text-3xl opacity-50">Majo.exe - v6.0.0</h3>
     <Login />
    </div>
   </Container>
  </>
 );
}
