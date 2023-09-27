import { ListBulletIcon } from "@heroicons/react/24/outline";
import { TextSkeleton } from "@/components/blocks/Skeletons";
import { Header1 } from "@/components/blocks/Headers";

export default function Loading() {
 return (
  <>
   <Header1>
    <ListBulletIcon className="h-12 w-12" />
    Activity Logs
   </Header1>
   <div className="gap-4 overflow-auto">
    {[...Array(5)].map((_, i) => (
     <TextSkeleton className={"my-4 !h-20 !w-full flex-row items-center justify-start"} key={i} />
    ))}
   </div>
  </>
 );
}
