import Header, { headerVariants } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import { Skeleton } from "@/components/Skeletons";
import { twMerge } from "tailwind-merge";

export default function Loading() {
 return (
  <>
   <Header className={twMerge(headerVariants({ variant: "h1", margin: "normal" }))}>
    <Icons.Gift className={iconVariants({ variant: "extraLarge" })} />
    Giveaways
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">Create and manage giveaways for your server, let your members win some cool prizes</p>
   <Skeleton className="h-64 w-full" />
  </>
 );
}
