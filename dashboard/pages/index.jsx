import { Container } from "@components/elements/blocks/Container";
import { Nav } from "@components/elements/nav/Nav";
import Link from "next/link";
import { parseUser } from "@/utils/parse-user";

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
     <div className="flex gap-2">
      Logged as {props.user.username}#{props.user.discriminator} 
     <Link href="/api/logout">
      <a className=" text-blue-500 font-bold hover:text-blue-700">Logout</a>
     </Link>
     </div>
    </div>
   </Container>
  </>
 );
}

export async function getServerSideProps(ctx) {
 const user = await parseUser(ctx);
 const isDashboardPage = ["/guilds", "/dashboard"].includes(ctx.resolvedUrl);
 if (!user && isDashboardPage) {
   return {
     redirect: {
       destination: "/api/oauth",
       permanent: false,
     },
   };
 }

 return { props: { user } };
};