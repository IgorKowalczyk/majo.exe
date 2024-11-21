import { ButtonPrimary, ButtonSecondary } from "@/components/Buttons";
import Header, { headerVariants } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";

export const metadata = {
 title: "Error",
 description: "Something went wrong! Please try again later, or contact us if the problem persists.",
};

export default async function ErrorPage(props: { searchParams: Promise<{ error: string }> }) {
 const searchParams = await props.searchParams;
 return (
  <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center gap-4 px-3 before:absolute before:z-10 before:size-full before:opacity-5 before:grayscale before:md:bg-grid-[#fff]">
   <div className="absolute left-0 top-0 z-10 size-full bg-[radial-gradient(circle,rgba(2,0,36,0)0,rgb(16,17,16,100%))]" />
   <div className="z-30">
    <>
     <Icons.warning className="mx-auto mb-2 size-20 rounded-full border border-neutral-700 bg-neutral-700/25 p-4 text-red-500 backdrop-blur-md" />
     <Header className={headerVariants({ variant: "h1", alignment: "center" })}>Something went wrong!</Header>
     <p className="my-1 mt-2 text-center text-xl text-[#939DB8]">{searchParams.error}</p>
     <div className="mt-4 flex flex-wrap justify-center gap-2">
      <ButtonPrimary href="/">
       <Icons.arrowLeft className={iconVariants({ variant: "button" })} />
       Go back home
      </ButtonPrimary>
      <ButtonSecondary href="/discord">
       <Icons.help className={iconVariants({ variant: "button" })} /> Contact support
      </ButtonSecondary>
     </div>
    </>
   </div>
  </div>
 );
}
