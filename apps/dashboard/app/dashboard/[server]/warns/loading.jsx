import { Block } from "@/components/Block";
import { Header1, Header5 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import { EmbedSkeleton } from "@/components/Skeletons";

export default function Loading() {
 return (
  <>
   <Header1>
    <Icons.warning className={iconVariants({ variant: "extraLarge" })} />
    Warns <Icons.refresh className={iconVariants({ variant: "extraLarge", className: "stroke-accent-primary animate-spin" })} />
   </Header1>
   <Header5 className="mb-4 !block !justify-start gap-1 !text-left">
    Here you can view all users warns issued by users with the <code>Manage Server</code> permission.
   </Header5>
   <div className="mx-auto mt-4 flex w-full items-center justify-start overflow-auto">
    <Block className="w-full">
     <EmbedSkeleton />
    </Block>
   </div>
  </>
 );
}
