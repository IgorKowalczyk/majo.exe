import { Container } from "@components/elements/blocks/Container";
import { Nav } from "@components/elements/nav/Nav";
import Link from "next/link";

export default function Main(props) {
 return (
  <>
   <Nav>Test?</Nav>
   <Container>
    <div className="flex h-screen flex-col items-center justify-center gap-2">
     <h1 className="font-poppins text-5xl">Soon!</h1>
     <h3 className="font-poppins text-3xl opacity-50">Majo.exe - v6.0.0</h3>
     <Link href="/api/oauth">
      <a className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">Login</a>
     </Link>
    </div>
   </Container>
  </>
 );
}
