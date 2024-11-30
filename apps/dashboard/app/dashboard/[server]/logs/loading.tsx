import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { InputWithIcon } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeletons";
import { cn } from "@/lib/utils";

export default function Loading() {
 return (
  <>
   <Header className={cn(headerVariants({ variant: "h1", margin: "normal" }))}>
    <Icons.list className={iconVariants({ variant: "extraLarge" })} />
    Activity Logs
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">View the logs of your server, see what's been happening recently</p>
   <div className="mt-4 gap-4 overflow-auto">
    <div className="mb-4 flex items-center justify-center gap-2">
     <InputWithIcon placeholder="Search..." icon={<Icons.Search className={iconVariants({ variant: "normal", className: "text-white/50" })} />} />
     <span className="flex h-[41.6px] cursor-pointer items-center justify-center rounded-md border border-neutral-800 px-3 py-2 text-white duration-200 hover:border-button-primary">
      <Icons.refresh className={iconVariants({ variant: "normal", className: "stroke-accent-primary animate-spin" })} />
     </span>
    </div>
    {[...Array(5)].map((_, i) => (
     // eslint-disable-next-line @eslint-react/no-array-index-key
     <Skeleton className="my-4 h-[81.6px]" key={`skeleton-${i}`} />
    ))}
   </div>
  </>
 );
}
