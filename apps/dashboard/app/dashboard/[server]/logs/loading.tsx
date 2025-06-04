import { ScrollTextIcon } from "lucide-react";
import Header, { headerVariants } from "@/components/ui/Headers";
import { iconVariants } from "@/components/ui/Icons";
import { Skeleton } from "@/components/ui/Skeletons";
import { cn } from "@/lib/utils";

export default function Loading() {
 return (
  <>
   <Header className={cn(headerVariants({ variant: "h1", margin: "normal" }))}>
    <ScrollTextIcon className={iconVariants({ variant: "extraLarge" })} />
    Logs
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">Manage the actions that Majo.exe can watch and log in selected channels.</p>

   {Array.from({ length: 8 }).map((_, i) => (
    <div key={i}>
     <Skeleton className="mb-2 mt-6 h-8 w-32" />

     <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
      <Skeleton className="h-[289px]" />
      <Skeleton className="h-[289px]" />
      {i % 2 === 0 && <Skeleton className="h-[289px]" />}
     </div>
    </div>
   ))}
  </>
 );
}
