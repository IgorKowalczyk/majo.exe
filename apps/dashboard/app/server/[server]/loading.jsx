import { Block } from "@/components/blocks/Block";
import { Header1, Header4, Header5 } from "@/components/blocks/Headers";
import { EmbedSkeleton, TextSkeleton } from "@/components/blocks/Skeletons";

export default function Loading() {
 return (
  <>
   <Header1 className={"mb-4 !justify-normal"}>
    <div className="h-16 w-16 rounded-full bg-button-secondary" />
    <div className="ml-4 flex flex-col !justify-start text-left">
     <TextSkeleton className="w-32" />
     <Header5 className="mt-2 opacity-60">
      <TextSkeleton className="w-32" />
     </Header5>
    </div>
   </Header1>

   <Block className="!mt-4 flex w-full flex-row">
    <div className="flex flex-row items-center gap-4">
     <div className="flex items-center">
      <div className="mr-2 h-3 w-3 rounded-full bg-[#81848f]" />0 members
     </div>
     <div className="flex items-center">
      <div className="mr-2 h-3 w-3 rounded-full bg-[#22a55b]" />0 online
     </div>
    </div>
    <span className="ml-auto whitespace-nowrap">Powered by Majo.exe</span>
   </Block>

   <div className="mt-6 block gap-6 lg:flex lg:items-start">
    <Block className="flex flex-col justify-start [flex:3_1_0] ">
     <Header4 className="mb-4 !items-start !justify-normal opacity-80">Leaderboard</Header4>
     <EmbedSkeleton className="h-64 w-full" />
    </Block>
    <div className="mt-6 flex flex-col justify-start gap-6 [flex:2_1_0%] lg:mt-0">
     <Block>
      <Header4 className="!items-start !justify-normal opacity-80">
       Language
       <span className="ml-auto font-medium">Loading...</span>
      </Header4>
     </Block>
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
  </>
 );
}
