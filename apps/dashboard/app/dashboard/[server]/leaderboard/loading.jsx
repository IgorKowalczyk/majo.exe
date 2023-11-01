import { StarIcon } from "@heroicons/react/24/outline";
import { Block } from "@/components/blocks/Block";
import { Header1 } from "@/components/blocks/Headers";
import { EmbedSkeleton, TextSkeleton } from "@/components/blocks/Skeletons";

export default function Loading() {
 return (
  <>
   <Header1>
    <StarIcon className="min-h-12 min-w-12 h-12 w-12" />
    Leaderboard
   </Header1>
   <TextSkeleton className="mb-4 mt-2 w-32 justify-start" />
   <div className="mx-auto flex w-full items-center justify-start overflow-auto">
    <Block className="mt-4 w-full">
     <EmbedSkeleton />
    </Block>
   </div>
  </>
 );
}
