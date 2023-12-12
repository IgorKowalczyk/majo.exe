import { Block } from "@/components/Block";
import { Header4 } from "@/components/Headers";
import { AvatarSkeleton, EmbedSkeleton, TextSkeleton } from "@/components/Skeletons";

export default function Loading() {
 return (
  <>
   <div className="mb-4 flex max-h-[73px] flex-col items-center justify-normal gap-4 text-2xl font-bold sm:flex-row md:text-3xl">
    <AvatarSkeleton className="h-16 w-16 rounded-full" />
    <div className="flex flex-col text-center sm:ml-4 sm:text-left">
     <TextSkeleton className="!h-[43px] w-44" />
     <TextSkeleton className="mt-2 !h-5 w-64 opacity-60" />
    </div>
   </div>

   <Block className="!mt-4 flex w-full flex-col gap-4 !p-4 sm:flex-row sm:gap-0">
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
     <div className="flex items-center">
      <div className="min-h-3 min-w-3 mr-2 h-3 w-3 rounded-full bg-[#81848f]" />0 members
     </div>
     <div className="flex items-center">
      <div className="min-h-3 min-w-3 mr-2 h-3 w-3 rounded-full bg-[#22a55b]" />0 online
     </div>
    </div>
    <span className="mx-auto whitespace-nowrap py-2 sm:ml-auto sm:mr-0">Powered by Majo.exe</span>
   </Block>

   <div className="mt-6 block gap-6 lg:flex lg:items-start">
    <Block className="scrollbar-show flex flex-col justify-start overflow-x-scroll [flex:3_1_0] ">
     <Header4 className="mb-4 !items-start !justify-normal opacity-80">Leaderboard</Header4>
     <EmbedSkeleton className="h-64 w-full" />
    </Block>
    <div className="mt-6 flex flex-col justify-start gap-6 [flex:2_1_0%] lg:mt-0">
     <Block>
      <Header4 className="mb-4 !items-start !justify-normal opacity-80">
       Emojis
       <span className="ml-auto font-medium opacity-60">Loading...</span>
      </Header4>
      <div className="flex flex-row flex-wrap gap-4">
       {Array.from({ length: 25 }).map((_, i) => (
        <AvatarSkeleton key={i} className="!min-h-8 !min-w-8 !h-8 !w-8 !rounded-md" />
       ))}
      </div>
     </Block>

     <Block>
      <Header4 className="mb-4 !items-start !justify-normal opacity-80">
       Stickers
       <span className="ml-auto font-medium opacity-60">Loading...</span>
      </Header4>
      <div className="flex flex-row flex-wrap gap-4">
       {Array.from({ length: 10 }).map((_, i) => (
        <AvatarSkeleton key={i} className="!min-h-24 !min-w-24 !h-24 !w-24 !rounded-md" />
       ))}
      </div>
     </Block>
    </div>
   </div>
  </>
 );
}
