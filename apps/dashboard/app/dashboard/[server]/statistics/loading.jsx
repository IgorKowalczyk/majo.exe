import { Block } from "@/components/Block";
import { GraphCard } from "@/components/Card";
import { Header2 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import { GraphSkeleton, InputSkeleton } from "@/components/Skeletons";

export default function Loading() {
 return (
  <>
   <div className="mb-4 grid grid-cols-1 gap-0 md:grid-cols-1 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
    <GraphCard
     className="mt-0"
     data={{
      icon: <Icons.userAdd className={iconVariants({ variant: "extraLarge" })} />,
      title: "New Members",
      description: "The amount of new members that joined your server.",
      value: "Loading",
      graph: <Icons.refresh className={iconVariants({ variant: "normal", className: "animate-spin" })} />,
     }}
    />
    <GraphCard
     className="mt-0"
     data={{
      icon: <Icons.userMinus className={iconVariants({ variant: "extraLarge" })} />,
      title: "Members Left",
      description: "The amount of members that left your server.",
      value: "Loading",
      graph: <Icons.refresh className={iconVariants({ variant: "normal", className: "animate-spin" })} />,
     }}
    />
    <GraphCard
     className="col-span-1 mt-0 lg:col-span-2 xl:col-span-1"
     data={{
      icon: <Icons.commentAdd className={iconVariants({ variant: "extraLarge" })} />,
      title: "New Messages",
      description: "The amount of messages that were sent in your server.",
      value: "Loading",
      graph: <Icons.refresh className={iconVariants({ variant: "normal", className: "animate-spin" })} />,
     }}
    />
   </div>
   <div className="flex flex-col gap-6">
    <Block>
     <div className="mb-4 flex flex-col items-center justify-normal gap-2 whitespace-nowrap lg:flex-row">
      <Header2 className="w-full flex-col items-center gap-1 lg:items-start">
       <span>
        New Members <Icons.refresh className={iconVariants({ variant: "large", className: "text-accent-primary ml-2 inline-block animate-spin !stroke-2 align-middle" })} />
       </span>
       <span class="text-left text-sm font-normal opacity-40">Loading...</span>
      </Header2>
      <div className="relative mx-auto flex flex-row items-center justify-center gap-3 lg:ml-auto lg:mr-0">
       <InputSkeleton className="!w-32" />
       <InputSkeleton className="!w-48" />
      </div>
     </div>
     <GraphSkeleton className="mt-10 h-80" />
    </Block>
    <Block>
     <div className="mb-4 flex flex-col items-center justify-normal gap-2 whitespace-nowrap lg:flex-row">
      <Header2 className="w-full flex-col items-center gap-1 lg:items-start">
       <span>
        Members left <Icons.refresh className={iconVariants({ variant: "large", className: "text-accent-primary ml-2 inline-block animate-spin !stroke-2 align-middle" })} />
       </span>
       <span class="text-left text-sm font-normal opacity-40">Loading...</span>
      </Header2>
      <div className="relative mx-auto flex flex-row items-center justify-center gap-3 lg:ml-auto lg:mr-0">
       <InputSkeleton className="!w-32" />
       <InputSkeleton className="!w-48" />
      </div>
     </div>
     <GraphSkeleton className="mt-10 h-80" />
    </Block>
    <Block>
     <div className="mb-4 flex flex-col items-center justify-normal gap-2 whitespace-nowrap lg:flex-row">
      <Header2 className="w-full flex-col items-center gap-1 lg:items-start">
       <span>
        Messages Sent <Icons.refresh className={iconVariants({ variant: "large", className: "text-accent-primary ml-2 inline-block animate-spin !stroke-2 align-middle" })} />
       </span>
       <span class="text-left text-sm font-normal opacity-40">Loading...</span>
      </Header2>
      <div className="relative mx-auto flex flex-row items-center justify-center gap-3 lg:ml-auto lg:mr-0">
       <InputSkeleton className="!w-32" />
       <InputSkeleton className="!w-48" />
      </div>
     </div>
     <GraphSkeleton className="mt-10 h-80" />
    </Block>
   </div>
  </>
 );
}
