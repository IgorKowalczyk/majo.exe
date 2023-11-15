import { ListBulletIcon } from "@heroicons/react/24/outline";
import { Header1 } from "@/components/blocks/Headers";
import { GraphSkeleton } from "@/components/blocks/Skeletons";

export default function Loading() {
 return (
  <>
   <Header1>
    <ListBulletIcon className="min-h-9 min-w-9 h-9 w-9" />
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
