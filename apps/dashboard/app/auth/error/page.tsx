import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Buttons";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";

export const metadata = {
  title: "Error",
  description: "Something went wrong! Please try again later, or contact us if the problem persists.",
};

export default async function ErrorPage(props: { searchParams: Promise<{ error: string }> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center gap-3 px-3">
      <div className="absolute left-0 top-0 z-10 size-full bg-[radial-gradient(circle,rgba(2,0,36,0)0,rgb(16,17,16,100%))]" />
      <div className="z-30">
        <>
          <Icons.warning className="mx-auto mb-2 size-20 rounded-full border border-neutral-700 bg-neutral-700/25 p-4 text-red-500 backdrop-blur-md" />
          <Header className={headerVariants({ variant: "h1", alignment: "center" })}>Something went wrong!</Header>
          <p className="my-1 mt-2 text-center text-xl text-white/50">{searchParams.error}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link href="/" className={buttonVariants({ variant: "primary" })}>
              <HomeIcon className={iconVariants({ variant: "button" })} />
              Go back home
            </Link>
            <Link href="/discord" className={buttonVariants({ variant: "secondary" })}>
              <Icons.help className={iconVariants({ variant: "button" })} /> Contact support
            </Link>
          </div>
        </>
      </div>
    </div>
  );
}
