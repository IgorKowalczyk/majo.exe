import { Block } from "@/components/ui/Block";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeletons";

export default function Loading() {
 return (
  <>
   <Header className={cn(headerVariants({ variant: "h1", margin: "normal" }))}>
    <Icons.ScrollText className={iconVariants({ variant: "extraLarge" })} />
    Logs
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">Manage the actions that Majo.exe can watch and log in selected channels.</p>

   {Array.from({ length: 8 }).map((_, i) => (
    <div key={i}>
     <Skeleton className="w-32 h-8 mt-6 mb-2" />

     <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 2xl:grid-cols-3">
      <Skeleton className="h-[289px]" />
      <Skeleton className="h-[289px]" />
      {i % 2 === 0 && <Skeleton className="h-[289px]" />}
     </div>
    </div>
   ))}
  </>
 );
}
