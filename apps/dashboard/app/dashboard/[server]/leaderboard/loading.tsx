import { SparklesIcon } from "lucide-react";
import Header, { headerVariants } from "@/components/ui/Headers";
import { iconVariants } from "@/components/ui/Icons";
import { Skeleton } from "@/components/ui/Skeletons";
import { cn } from "@/lib/utils";

export default function Loading() {
 return (
  <>
   <Header className={cn(headerVariants({ variant: "h1", margin: "normal" }))}>
    <SparklesIcon className={iconVariants({ variant: "extraLarge" })} />
    Leaderboard
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">View the leaderboard for your server, see who's the most active</p>
   <Skeleton className="h-64 w-full" />
  </>
 );
}
