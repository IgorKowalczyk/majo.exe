import { GiftIcon } from "lucide-react";
import Header, { headerVariants } from "@/components/ui/Headers";
import { iconVariants } from "@/components/ui/Icons";
import { Skeleton } from "@/components/ui/Skeletons";
import { cn } from "@/lib/utils";

export default function Loading() {
 return (
  <>
   <Header className={cn(headerVariants({ variant: "h1", margin: "normal" }))}>
    <GiftIcon className={iconVariants({ variant: "extraLarge" })} />
    Giveaways
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">
    View all the giveaways for your server. You can create a giveaway by using <code>/giveaway</code> command in chat.
   </p>
   <Skeleton className="h-64 w-full" />
  </>
 );
}
