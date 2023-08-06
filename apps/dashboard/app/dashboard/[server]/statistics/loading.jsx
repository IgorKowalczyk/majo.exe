import { Block } from "@/components/blocks/Block";
import { Header4 } from "@/components/blocks/Headers";
import { GraphSkeleton } from "@/components/blocks/Skeletons";

export default function Loading() {
 return (
  <div className="flex flex-col gap-6">
   <Block>
    <Header4 className="mb-4 !items-start !justify-normal">
     <span className="opacity-80">Members Joined</span> <span className="text-accent-primary">(Loading...)</span>
    </Header4>
    <GraphSkeleton className="mt-10 h-80" />
   </Block>
   <Block>
    <Header4 className="mb-4 !items-start !justify-normal opacity-80">
     <span className="opacity-80">Members Left</span>
     <span className="text-accent-primary">(Loading...)</span>
    </Header4>
    <GraphSkeleton className="mt-10 h-80" />
   </Block>
  </div>
 );
}
