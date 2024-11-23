import Header, { headerVariants } from "@/components/Headers";
import { Icons } from "@/components/Icons";
import { Skeleton } from "@/components/Skeletons";
import { twMerge } from "tailwind-merge";

export default function Loading() {
 return (
  <div className="flex w-full flex-col items-center px-8 pb-8 pt-16 antialiased md:p-16">
   <div className="flex flex-col justify-center">
    <Header className={twMerge(headerVariants({ variant: "h1", alignment: "center", margin: "normal" }))}>
     <Icons.dashboard className="size-10 shrink-0" />
     Dashboard
    </Header>
    <p className="mb-4 text-center text-base md:text-xl text-white/50">
     You can only add the bot to servers you have the <code>Manage Server</code> permission in.
    </p>
    <div className="mt-4 flex flex-row flex-wrap justify-center gap-4 sm:flex-col">
     {[...Array(10)].map((_, i) => (
      // eslint-disable-next-line @eslint-react/no-array-index-key
      <div key={`skeleton-${i}`}>
       <div className="hidden flex-row items-center justify-start gap-4 sm:flex">
        <Skeleton className="size-16 shrink-0 rounded-full" />
        <Skeleton className="h-7 w-full" />
        <Skeleton className="ml-auto h-10 w-32" />
       </div>
       <Skeleton className="size-24 rounded-md sm:hidden" />
      </div>
     ))}
    </div>
   </div>
  </div>
 );
}
