import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { Skeleton } from "@/components/ui/Skeletons";
import { cn } from "@/lib/utils";

export default function Loading() {
 return (
  <>
   <Header className={cn(headerVariants({ variant: "h1", margin: "normal" }))}>
    <Icons.Gift className={iconVariants({ variant: "extraLarge" })} />
    Giveaways
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">Create and manage giveaways for your server, let your members win some cool prizes</p>
   <Skeleton className="h-64 w-full" />
  </>
 );
}
