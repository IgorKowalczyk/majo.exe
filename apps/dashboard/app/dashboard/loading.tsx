import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { Skeleton } from "@/components/ui/Skeletons";
import { cn } from "@/lib/utils";

export default function Loading() {
 return (
  <div className="flex w-full flex-col items-center px-8 pb-8 pt-16 antialiased md:p-16">
   <div className="mt-4 flex flex-row flex-wrap justify-center gap-4 sm:flex-col">
    <Header className={cn(headerVariants({ variant: "h1", alignment: "center", margin: "normal" }))}>
     <Icons.Navigation className={iconVariants({ variant: "extraLarge" })} />
     Choose a server
    </Header>
    <p className="mb-4 text-center text-base text-white/50 md:text-xl">Select a server to manage, or add the bot to a new server.</p>
    <div className="flex flex-row flex-wrap justify-center gap-4 sm:flex-col">
     {[...Array(10)].map((_, i) => (
      // eslint-disable-next-line @eslint-react/no-array-index-key
      <div key={`skeleton-${i}`}>
       <div className="hidden flex-row items-center justify-start gap-4 sm:flex">
        <Skeleton className="size-16 shrink-0 rounded-full" />
        <Skeleton className="h-7 w-1/3" />
        <Skeleton className="ml-auto h-10 w-[115px]" />
       </div>
       <Skeleton className="size-24 rounded-lg sm:hidden" />
      </div>
     ))}
    </div>
    <div className="my-4 mt-12 flex flex-row flex-wrap items-start whitespace-nowrap rounded-lg border border-accent-primary bg-accent-primary/10 p-4">
     <span className="mr-1 flex flex-row items-center gap-1 whitespace-nowrap font-bold">
      <Icons.Info className={iconVariants({ variant: "normal", className: "stroke-accent-primary" })} /> Note:
     </span>
     <span className="whitespace-normal">
      You can only add the bot to servers you have the <code className="inline">Manage Server</code> permission in.
     </span>
    </div>
   </div>
  </div>
 );
}
