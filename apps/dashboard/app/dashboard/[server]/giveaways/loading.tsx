import { Block } from "@/components/Block";
import Header, { headerVariants } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import { Skeleton } from "@/components/Skeletons";
import { twMerge } from "tailwind-merge";

export default function Loading() {
 return (
  <>
   <Header className={twMerge(headerVariants({ variant: "h1" }))}>
    <Icons.Gift className={iconVariants({ variant: "extraLarge" })} />
    Giveaways
   </Header>
   <Block className="mt-4 flex w-full overflow-auto">
    <Skeleton className="h-64 w-full" />
   </Block>
  </>
 );
}
