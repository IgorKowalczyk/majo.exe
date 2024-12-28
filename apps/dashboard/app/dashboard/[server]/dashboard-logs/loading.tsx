import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { Skeleton } from "@/components/ui/Skeletons";
import { cn } from "@/lib/utils";

export default function Loading() {
 return (
  <>
   <Header className={cn(headerVariants({ variant: "h1", margin: "normal" }))}>
    <Icons.Logs className={iconVariants({ variant: "extraLarge" })} />
    Dashboard Logs
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">All the logs of the different actions that have been happening on your dashboard.</p>
   <div className="mt-4 overflow-auto">
    <Skeleton className="mb-6 mt-2 h-10 w-full" />
    {Array.from({ length: 20 }).map((_, i) => (
     <Skeleton className="mb-4 h-20" key={`log-skeleton-${i}`} />
    ))}
   </div>
  </>
 );
}
