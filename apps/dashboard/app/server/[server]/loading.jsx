import { Block } from "@/components/Block";
import { Header1, Header4, Header5 } from "@/components/Headers";
import { EmbedSkeleton, TextSkeleton } from "@/components/Skeletons";

export default function Loading() {
 return (
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
   <Header1 className="!mb-6 flex flex-col !justify-normal">
    <div className="size-24 min-h-24 min-w-24 rounded-full bg-button-secondary" />
    <div className="flex flex-col items-center justify-center text-center sm:ml-4">
     <TextSkeleton className="w-32" />
     <Header5 className="mt-2 text-center opacity-60">
      <TextSkeleton className="w-64" />
     </Header5>
    </div>
   </Header1>

   <Block className="!mt-4 flex w-full flex-col gap-4 !p-4 sm:flex-row sm:gap-0">
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
     <div className="flex items-center">
      <div className="mr-2 size-3 min-h-3 min-w-3 rounded-full bg-[#81848f]" />0 members
     </div>
     <div className="flex items-center">
      <div className="mr-2 size-3 min-h-3 min-w-3 rounded-full bg-[#22a55b]" />0 online
     </div>
    </div>
    <span className="mx-auto whitespace-nowrap sm:ml-auto sm:mr-0">Powered by Majo.exe</span>
   </Block>

   <div className="mt-6 block gap-6 lg:flex lg:items-start">
    <Block className="scrollbar-show flex flex-col justify-start overflow-x-scroll [flex:3_1_0]">
     <Header4 className="mb-4 !items-start !justify-normal opacity-80">Leaderboard</Header4>
     <EmbedSkeleton className="h-64 w-full" />
    </Block>
    <div className="mt-6 flex flex-col justify-start gap-6 [flex:2_1_0%] lg:mt-0">
     <Block>
      <Header4 className="mb-4 !items-start !justify-normal opacity-80">
       Emojis
       <span className="ml-auto font-medium opacity-60">Loading...</span>
      </Header4>
     </Block>

     <Block>
      <Header4 className="mb-4 !items-start !justify-normal opacity-80">
       Stickers
       <span className="ml-auto font-medium opacity-60">Loading...</span>
      </Header4>
     </Block>
    </div>
   </div>
  </div>
 );
}
