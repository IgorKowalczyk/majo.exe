import { ArrowPathIcon, UserMinusIcon, ChatBubbleLeftRightIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { Block } from "@/components/blocks/Block";
import { GraphCard } from "@/components/blocks/Card";
import { Header4 } from "@/components/blocks/Headers";
import { GraphSkeleton } from "@/components/blocks/Skeletons";

export default function Loading() {
 return (
  <>
   <div className="mb-4 grid grid-cols-1 gap-0 md:grid-cols-1 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
    <GraphCard
     className={"mt-0"}
     data={{
      icon: <UserPlusIcon className="min-h-8 min-w-8 h-8 w-8" />,
      title: "New Members",
      description: "The amount of new members that joined your server.",
      value: "Loading",
      graph: <ArrowPathIcon className="min-h-5 min-w-5 h-5 w-5 animate-spin" />,
     }}
    />
    <GraphCard
     className={"mt-0"}
     data={{
      icon: <UserMinusIcon className="min-h-8 min-w-8 h-8 w-8" />,
      title: "Members Left",
      description: "The amount of members that left your server.",
      value: "Loading",
      graph: <ArrowPathIcon className="min-h-5 min-w-5 h-5 w-5 animate-spin" />,
     }}
    />
    <GraphCard
     className={"col-span-1 mt-0 lg:col-span-2 xl:col-span-1"}
     data={{
      icon: <ChatBubbleLeftRightIcon className="min-h-8 min-w-8 h-8 w-8" />,
      title: "New Messages",
      description: "The amount of messages that were sent in your server.",
      value: "Loading",
      graph: <ArrowPathIcon className="min-h-5 min-w-5 h-5 w-5 animate-spin" />,
     }}
    />
   </div>
   <Block className="mt-4">
    <Header4 className="mb-4 flex-col !justify-normal whitespace-nowrap sm:flex-row">
     <span className="opacity-80">Members Joined</span>
     <ArrowPathIcon className="min-h-5 text-accent-primary min-w-6 h-6 w-6 animate-spin" />
    </Header4>
    <GraphSkeleton className="mt-10 h-80" />
   </Block>
   <Block className="mt-4">
    <Header4 className="mb-4 flex-col !justify-normal whitespace-nowrap sm:flex-row">
     <span className="opacity-80">Members Left</span>
     <ArrowPathIcon className="min-h-5 text-accent-primary min-w-6 h-6 w-6 animate-spin" />
    </Header4>
    <GraphSkeleton className="mt-10 h-80" />
   </Block>
   <Block className="mt-4">
    <Header4 className="mb-4 flex-col !justify-normal whitespace-nowrap sm:flex-row">
     <span className="opacity-80">Messages Sent</span>
     <ArrowPathIcon className="min-h-5 text-accent-primary min-w-6 h-6 w-6 animate-spin" />
    </Header4>
    <GraphSkeleton className="mt-10 h-80" />
   </Block>
  </>
 );
}
