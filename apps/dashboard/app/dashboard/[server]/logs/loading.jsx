import { Header1 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import { InputWithIcon } from "@/components/Input";
import { GraphSkeleton } from "@/components/Skeletons";

export default function Loading() {
 return (
  <>
   <Header1>
    <Icons.list className={iconVariants({ variant: "extraLarge" })} />
    Activity Logs
   </Header1>
   <div className="mt-4 gap-4 overflow-auto">
    <div className="mb-4 flex items-center justify-center gap-2">
     <InputWithIcon placeholder="Search..." icon={<Icons.search className={iconVariants({ variant: "normal", className: "text-white/50" })} />} disabled={true} />
     <span className="hover:border-button-primary flex h-[41.6px] cursor-pointer items-center justify-center rounded-md border border-neutral-800 px-3 py-2 text-white duration-200">
      <Icons.refresh className={iconVariants({ variant: "normal", className: "stroke-accent-primary animate-spin" })} />
     </span>
    </div>
    {[...Array(5)].map((_, i) => (
     // eslint-disable-next-line @eslint-react/no-array-index-key
     <GraphSkeleton className="my-4 !h-[81.6px]" key={`skeleton-${i}`} />
    ))}
   </div>
  </>
 );
}
