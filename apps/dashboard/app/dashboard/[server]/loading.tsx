import { CategoryBar } from "@/components/CategoryBar";
import { Block } from "@/components/ui/Block";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { Skeleton } from "@/components/ui/Skeletons";
import { cn } from "@/lib/utils";

export default function Loading() {
 return (
  <>
   <div className="mb-4 flex max-h-[73px] flex-col items-center justify-normal gap-2 sm:flex-row">
    <Skeleton className="size-16 rounded-full" />
    <div className="flex flex-col text-center sm:ml-4 sm:text-left">
     <Skeleton className="h-[36px] w-44" />
     <Skeleton className="mt-1 h-5 w-64 opacity-60" />
    </div>
   </div>
   <div className="my-4 grid grid-cols-1 gap-0 md:grid-cols-1 md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
    <div className="overflow-auto rounded-xl border border-neutral-800 bg-background-secondary p-4">
     <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-3">
       <Icons.userAdd className={iconVariants({ variant: "extraLarge" })} />
       <div className="flex flex-col">
        <Header className={cn(headerVariants({ variant: "h4" }), "justify-start whitespace-nowrap")}>
         New members
         <span className="rounded-md bg-accent-primary px-2 text-sm font-normal text-white">Loading...</span>
        </Header>
        <p className="text-sm text-gray-400">Amount of new members that joined your server in the last 7 days.</p>
       </div>
      </div>
      <div className="ml-2 flex min-h-[40px] min-w-[144px] flex-row items-center gap-3" />
     </div>
    </div>

    <div className="overflow-auto rounded-lg border border-neutral-800 bg-background-secondary p-4">
     <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-3">
       <Icons.commentAdd className={iconVariants({ variant: "extraLarge" })} />
       <div className="flex flex-col">
        <Header className={cn(headerVariants({ variant: "h4" }), "justify-start whitespace-nowrap")}>
         Messages sent
         <span className="rounded-md bg-accent-primary px-2 text-sm font-normal text-white">Loading...</span>
        </Header>
        <p className="text-sm text-gray-400">Amount of messages that were sent in your server in the last 7 days.</p>
       </div>
      </div>
      <div className="ml-2 flex min-h-[40px] min-w-[144px] flex-row items-center gap-3" />
     </div>
    </div>

    <div className="overflow-auto rounded-lg border border-neutral-800 bg-background-secondary p-4">
     <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-3">
       <Icons.userMinus className={iconVariants({ variant: "extraLarge" })} />
       <div className="flex flex-col">
        <Header className={cn(headerVariants({ variant: "h4" }), "justify-start whitespace-nowrap")}>
         Members left
         <span className="rounded-md bg-accent-primary px-2 text-sm font-normal text-white">Loading...</span>
        </Header>
        <p className="text-sm text-gray-400">Amount of members that left your server in the last 7 days.</p>
       </div>
      </div>
      <div className="ml-2 flex min-h-[40px] min-w-[144px] flex-row items-center gap-3" />
     </div>
    </div>
   </div>
   <div className="mt-6 block gap-6 lg:flex lg:items-start">
    <div className="flex flex-col justify-start gap-6 overflow-x-scroll [flex:3_1_0]">
     <Block>
      <Header className={cn(headerVariants({ variant: "h4", margin: "normal" }), "block")}>
       <span className="flex flex-row flex-wrap items-center gap-2">
        <Icons.Gauge className={iconVariants({ variant: "normal", className: "stroke-2!" })} />
        <span className="opacity-80">Server Score: </span>
        <span>Calculating...</span>
       </span>
      </Header>

      <p className="text-left text-base opacity-60">We are still calculating your server score in the background, this may take a few seconds.</p>

      <CategoryBar percent={0} className="my-4" />
     </Block>

     <Block className="scrollbar-show">
      <Header className={cn(headerVariants({ variant: "h4", margin: "wide" }), "items-start justify-normal opacity-80")}>Leaderboard</Header>
      <Skeleton className="h-64 w-full" />
     </Block>
    </div>

    <div className="mt-6 flex flex-col justify-start gap-6 [flex:2_1_0%] lg:mt-0">
     <Block>
      <Header className={cn(headerVariants({ variant: "h4", margin: "wide" }), "items-start justify-normal opacity-80")}>
       Quick Stats
       <span className="ml-auto font-medium opacity-60">Loading...</span>
      </Header>
      <div className="flex flex-row flex-wrap gap-2">
       <div className="flex items-center">
        <div className="mr-2 size-3 shrink-0 rounded-full bg-[#81848f]" />
        Loading...
       </div>
       <div className="flex items-center">
        <div className="mr-2 size-3 shrink-0 rounded-full bg-[#22a55b]" />
        Loading...
       </div>
      </div>
     </Block>
     <Block>
      <Header className={cn(headerVariants({ variant: "h4", margin: "wide" }), "items-start justify-normal opacity-80")}>
       Emojis
       <span className="ml-auto font-medium opacity-60">Loading...</span>
      </Header>
      <div className="flex flex-row flex-wrap gap-3">
       {Array.from({ length: 25 }).map((_, i) => (
        <Skeleton key={`emoji-${i}`} className="size-8 shrink-0 rounded-lg" />
       ))}
      </div>
     </Block>

     <Block>
      <Header className={cn(headerVariants({ variant: "h4", margin: "wide" }), "items-start justify-normal opacity-80")}>
       Stickers
       <span className="ml-auto font-medium opacity-60">Loading...</span>
      </Header>
      <div className="flex flex-row flex-wrap gap-3">
       {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton key={`sticker-${i}`} className="size-24 shrink-0 rounded-lg" />
       ))}
      </div>
     </Block>
    </div>
   </div>
  </>
 );
}
