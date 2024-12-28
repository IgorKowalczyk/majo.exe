import { Block } from "@/components/ui/Block";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeletons";

export default function Loading() {
 return (
  <>
   <Skeleton className="w-full h-[276px]" />
   <Block className="mt-4">
    <Header className={cn(headerVariants({ variant: "h2" }))}>
     <Icons.MessageSquareWarning className={iconVariants({ variant: "large", className: "!stroke-2" })} />
     Warns
    </Header>
    <p className="mb-4 text-left opacity-70">You can view all warns given to this user in this server. You can also manage them by deleting them.</p>
    <Skeleton className="w-full h-24" />
   </Block>
   <Block className="mt-4">
    <Header className={cn(headerVariants({ variant: "h2" }))}>
     <Icons.like className={iconVariants({ variant: "large", className: "!stroke-2" })} />
     Reputation
    </Header>
    <p className="mt-2 mb-4 text-white/70">Change the reputation of this user in this server, set it to 0 to remove it.</p>
    <Skeleton className="w-full h-[106px]" />
   </Block>
   <Block theme="danger" className="mt-4">
    <Header className={cn(headerVariants({ variant: "h2" }), "text-red-400")}>
     <Icons.warning className={iconVariants({ variant: "large", className: "!stroke-2" })} />
     Reset XP
    </Header>
    <p className="mt-2 mb-4  text-white/70">Reset the XP of this user in this server. This action cannot be undone and will reset the XP of this user to 0.</p>

    <Skeleton className="w-full h-20" />
   </Block>
  </>
 );
}
