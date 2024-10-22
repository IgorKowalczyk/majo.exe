import { Block } from "@/components/Block";
import { CategoryBar } from "@/components/CategoryBar";
import { Header4, Header5 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import { AvatarSkeleton, EmbedSkeleton, TextSkeleton } from "@/components/Skeletons";

export default function Loading() {
 return (
  <>
   <div className="mb-4 flex max-h-[73px] flex-col items-center justify-normal gap-4 sm:flex-row">
    <AvatarSkeleton className="size-16 rounded-full" />
    <div className="flex flex-col text-center sm:ml-4 sm:text-left">
     <TextSkeleton className="!h-[43px] w-44" />
     <TextSkeleton className="mt-2 !h-5 w-64 opacity-60" />
    </div>
   </div>
   <div className="mb-4 grid grid-cols-1 gap-0 md:grid-cols-1 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
    <div className="mt-4 overflow-auto rounded-lg border border-neutral-800 bg-background-secondary p-4">
     <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-4">
       <Icons.userAdd className={iconVariants({ variant: "extraLarge" })} />
       <div className="flex flex-col">
        <Header4 className="!justify-start whitespace-nowrap">
         New members
         <span className="rounded-md bg-accent-primary px-2 text-sm font-normal text-white">Loading...</span>
        </Header4>
        <p className="text-sm text-gray-400">Amount of new members that joined your server in the last 7 days.</p>
       </div>
      </div>
      <div className="ml-2 flex min-h-[40px] min-w-[144px] flex-row items-center gap-4" />
     </div>
    </div>

    <div className="mt-4 overflow-auto rounded-lg border border-neutral-800 bg-background-secondary p-4">
     <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-4">
       <Icons.commentAdd className={iconVariants({ variant: "extraLarge" })} />
       <div className="flex flex-col">
        <Header4 className="!justify-start whitespace-nowrap">
         Messages sent
         <span className="rounded-md bg-accent-primary px-2 text-sm font-normal text-white">Loading...</span>
        </Header4>
        <p className="text-sm text-gray-400">Amount of messages that were sent in your server in the last 7 days.</p>
       </div>
      </div>
      <div className="ml-2 flex min-h-[40px] min-w-[144px] flex-row items-center gap-4" />
     </div>
    </div>

    <div className="mt-4 overflow-auto rounded-lg border border-neutral-800 bg-background-secondary p-4">
     <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-4">
       <Icons.userMinus className={iconVariants({ variant: "extraLarge" })} />
       <div className="flex flex-col">
        <Header4 className="!justify-start whitespace-nowrap">
         Members left
         <span className="rounded-md bg-accent-primary px-2 text-sm font-normal text-white">Loading...</span>
        </Header4>
        <p className="text-sm text-gray-400">Amount of members that left your server in the last 7 days.</p>
       </div>
      </div>
      <div className="ml-2 flex min-h-[40px] min-w-[144px] flex-row items-center gap-4" />
     </div>
    </div>
   </div>
   <div className="mt-6 block gap-6 lg:flex lg:items-start">
    <div className="flex flex-col justify-start gap-6 overflow-x-scroll [flex:3_1_0]">
     <Block>
      <Header4 className="mb-2 !block !text-left">
       <span className="flex flex-row flex-wrap items-center gap-2">
        <Icons.gauge className={iconVariants({ variant: "normal", className: "!stroke-2" })} />
        <span className="opacity-80">Server Score: </span>
        <span>Calculating...</span>
       </span>
      </Header4>

      <Header5 className="!text-left !text-base opacity-60">We are still calculating your server score in the background, this may take a few seconds.</Header5>

      <CategoryBar percent={0} className="my-4" />
     </Block>

     <Block className="scrollbar-show">
      <Header4 className="mb-4 !items-start !justify-normal opacity-80">Leaderboard</Header4>
      <EmbedSkeleton className="h-64 w-full" />
     </Block>
    </div>

    <div className="mt-6 flex flex-col justify-start gap-6 [flex:2_1_0%] lg:mt-0">
     <Block>
      <Header4 className="mb-4 !items-start !justify-normal opacity-80">
       Quick Stats
       <span className="ml-auto font-medium opacity-60">Loading...</span>
      </Header4>
      <div className="flex flex-row flex-wrap gap-2">
       <div className="flex items-center">
        <div className="mr-2 size-3 min-h-3 min-w-3 rounded-full bg-[#81848f]" />
        Loading...
       </div>
       <div className="flex items-center">
        <div className="mr-2 size-3 min-h-3 min-w-3 rounded-full bg-[#22a55b]" />
        Loading...
       </div>
      </div>
     </Block>
     <Block>
      <Header4 className="mb-4 !items-start !justify-normal opacity-80">
       Emojis
       <span className="ml-auto font-medium opacity-60">Loading...</span>
      </Header4>
      <div className="flex flex-row flex-wrap gap-4">
       {Array.from({ length: 25 }).map((_, i) => (
        // eslint-disable-next-line @eslint-react/no-array-index-key
        <AvatarSkeleton key={`emoji-${i}`} className="!h-8 !min-h-8 !w-8 !min-w-8 !rounded-md" />
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
        // eslint-disable-next-line @eslint-react/no-array-index-key
        <AvatarSkeleton key={`sticker-${i}`} className="!h-24 !min-h-24 !w-24 !min-w-24 !rounded-md" />
       ))}
      </div>
     </Block>
    </div>
   </div>
  </>
 );
}
