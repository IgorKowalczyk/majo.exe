import { SparklesIcon } from "@heroicons/react/24/outline";
import { Block } from "@/components/Block";
import { Header1 } from "@/components/Headers";
import { EmbedSkeleton } from "@/components/Skeletons";

export default async function Loading() {
 return (
  <>
   <Header1>
    <SparklesIcon className="h-9 min-h-9 w-9 min-w-9" />
    Leaderboard
   </Header1>
   <Block className="mt-4 flex w-full overflow-auto">
    <EmbedSkeleton className="h-64 w-full" />
   </Block>
  </>
 );
}
