import Header, { headerVariants } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import { Skeleton } from "@/components/Skeletons";
import { twMerge } from "tailwind-merge";

export default function Loading() {
 return (
  <>
   <Header className={twMerge(headerVariants({ variant: "h1", margin: "normal" }))}>
    <Icons.Sparkles className={iconVariants({ variant: "extraLarge" })} />
    Leaderboard
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">View the leaderboard for your server, see who's the most active</p>
   <Skeleton className="h-64 w-full" />
  </>
 );
}
