import { SparklesIcon } from "@heroicons/react/24/outline";
import { Block } from "@/components/Block";
import { Header1 } from "@/components/Headers";
import { EmbedSkeleton, TextSkeleton } from "@/components/Skeletons";

export default function Loading() {
 return (
  <>
   <Header1>
    <SparklesIcon className="min-h-9 min-w-9 h-9 w-9" />
    Leaderboard
   </Header1>
   <TextSkeleton className="mb-4 mt-2 w-64 justify-start" />
   <div className="mx-auto flex w-full items-center justify-start overflow-auto">
    <Block className="mt-4 w-full">
     <EmbedSkeleton />
    </Block>
   </div>
  </>
 );
}
