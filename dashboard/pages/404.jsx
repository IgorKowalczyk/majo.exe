import { Container } from "@components/elements/blocks/Container";
import { Link } from "@components/elements/blocks/Link";

export default function Main(props) {
 return (
  <Container>
   <div className="flex h-screen flex-col items-center justify-center gap-4">
    <h1 className="flex items-start text-center font-poppins text-5xl">
     Error 404!
    </h1>
    <h2 className="text-center font-poppins text-xl opacity-50">This page does not exist</h2>
    <Link href="/">
        <div className="flex h-8 cursor-pointer items-center rounded bg-button-primary px-4 py-0 leading-6 text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none">
         <svg className="mr-1 h-5 w-5" aria-hidden="true" role="img" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 4l-8 8l8 8" />
         </svg>{" "}
         Back to Dashboard
        </div>
       </Link>
   </div>
  </Container>
 );
}
