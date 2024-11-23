import { Block } from "@/components/Block";
import Header, { Header4, headerVariants } from "@/components/Headers";
import { Skeleton } from "@/components/Skeletons";
import { twMerge } from "tailwind-merge";

export default function Loading() {
 return (
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
   <Header className={twMerge(headerVariants({ variant: "h1" }), "mb-6 justify-normal flex-col")}>
    <div className="size-24 shrink-0 rounded-full bg-button-secondary" />
    <div className="flex flex-col items-center justify-center text-center sm:ml-4">
     <Skeleton className="h-6 w-32" />
     <Skeleton className="h-6 w-64 mt-2 opacity-60" />
    </div>
   </Header>

   <Block className="!mt-4 flex w-full flex-col gap-4 !p-4 sm:flex-row sm:gap-0">
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
     <div className="flex items-center">
      <div className="mr-2 size-3 shrink-0 rounded-full bg-[#81848f]" />0 members
     </div>
     <div className="flex items-center">
      <div className="mr-2 size-3 shrink-0 rounded-full bg-[#22a55b]" />0 online
     </div>
    </div>
    <span className="mx-auto whitespace-nowrap sm:ml-auto sm:mr-0">Powered by Majo.exe</span>
   </Block>

   <div className="mt-6 block gap-6 lg:flex lg:items-start">
    <Block className="scrollbar-show flex flex-col justify-start overflow-x-scroll [flex:3_1_0]">
     <Header4 className="mb-4 !items-start !justify-normal opacity-80">Leaderboard</Header4>
     <Skeleton className="h-64 w-full" />
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
