import { ArrowPathIcon, ListBulletIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Header1 } from "@/components/Headers";
import { InputWithIcon } from "@/components/Input";
import { GraphSkeleton } from "@/components/Skeletons";

export default function Loading() {
 return (
  <>
   <Header1>
    <ListBulletIcon className="min-h-9 min-w-9 h-9 w-9" />
    Activity Logs
   </Header1>
   <div className="gap-4 overflow-auto">
    <div className="mb-4 flex items-center justify-center gap-2">
     <InputWithIcon placeholder="Search..." icon={<MagnifyingGlassIcon className="min-h-5 min-w-5 h-5 w-5 text-white/50" aria-hidden="true" role="img" />} disabled={true} />
     <span className="hover:border-button-primary flex h-[41.6px] cursor-pointer items-center justify-center rounded-md border border-neutral-800 px-3 py-2 text-white duration-200">
      <ArrowPathIcon className="min-h-5 min-w-5 h-5 w-5 animate-spin" />
     </span>
    </div>
    {[...Array(5)].map((_, i) => (
     <GraphSkeleton className={"my-4 !h-[81.6px]"} key={i} />
    ))}
   </div>
  </>
 );
}
