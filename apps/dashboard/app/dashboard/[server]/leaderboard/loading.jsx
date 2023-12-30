import { Block } from "@/components/Block";
import { Header1 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import { EmbedSkeleton } from "@/components/Skeletons";

export default async function Loading() {
 return (
  <>
   <Header1>
    <Icons.sparkles className={iconVariants({ variant: "extraLarge" })} />
    Leaderboard
   </Header1>
   <Block className="mt-4 flex w-full overflow-auto">
    <EmbedSkeleton className="h-64 w-full" />
   </Block>
  </>
 );
}
