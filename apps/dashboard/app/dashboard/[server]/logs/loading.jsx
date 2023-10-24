import { ListBulletIcon } from "@heroicons/react/24/outline";
import { Header1 } from "@/components/blocks/Headers";
import { GraphSkeleton } from "@/components/blocks/Skeletons";

export default function Loading() {
 return (
  <>
   <Header1>
    <ListBulletIcon className="h-12 w-12" />
    Activity Logs
   </Header1>
   <div className="gap-4 overflow-auto">
    {[...Array(5)].map((_, i) => (
     <GraphSkeleton className={"my-2 !h-20"} key={i} />
    ))}
   </div>
  </>
 );
}
