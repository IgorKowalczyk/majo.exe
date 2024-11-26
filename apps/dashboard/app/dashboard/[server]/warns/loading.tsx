import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { Skeleton } from "@/components/ui/Skeletons";
import { cn } from "@/lib/utils";

export default function Loading() {
 return (
  <>
   <Header className={cn(headerVariants({ variant: "h1" }))}>
    <Icons.warning className={iconVariants({ variant: "extraLarge" })} />
    Warns <Icons.refresh className={iconVariants({ variant: "extraLarge", className: "stroke-accent-primary animate-spin" })} />
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">
    Here you can view all users warns issued by users with the <code>Manage Server</code> permission.
   </p>
   <div className="mx-auto mt-4 flex w-full items-center justify-start overflow-auto">
    <Skeleton className="h-96 w-full" />
   </div>
  </>
 );
}
