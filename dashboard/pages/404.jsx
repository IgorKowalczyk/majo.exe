import { Container } from "@components/blocks/Container";
import { Link } from "@components/blocks/Link";

export default function Main(props) {
 return (
  <Container>
   <div className="flex h-screen flex-col items-center justify-center gap-4">
    <h1 className="flex items-start text-center font-poppins text-5xl">
     Error 404!
    </h1>
    <h2 className="text-center font-poppins text-xl opacity-50">We're sorry — we can't find the page you're looking for.</h2>
    <div className="flex gap-4">
    <Link href="/discord">
        <div className="flex cursor-pointer items-center rounded px-5 py-2 font-poppins leading-6 text-white duration-200 bg-button-secondary hover:bg-button-secondary-hover motion-reduce:transition-none">
         <svg className="mr-1 h-5 w-5" aria-hidden="true" role="img" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 4l-8 8l8 8" />
         </svg>{" "}
         Support
        </div>
       </Link>
    <Link href="/">
        <div className="flex cursor-pointer items-center rounded px-5 py-2 font-poppins leading-6 text-white duration-200 bg-button-primary hover:bg-button-primary-hover motion-reduce:transition-none">
         <svg className="mr-1 h-5 w-5" aria-hidden="true" role="img" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 4l-8 8l8 8" />
         </svg>{" "}
         Go back
        </div>
       </Link>
       </div>
   </div>
  </Container>
 );
}
