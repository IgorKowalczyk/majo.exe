import { ArrowPathIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Block } from "@/components/Block";
import { Header1, Header5 } from "@/components/Headers";
import { EmbedSkeleton } from "@/components/Skeletons";

export default function Loading() {
 return (
  <>
   <Header1>
    <ExclamationTriangleIcon className="min-h-9 min-w-9 h-9 w-9" />
    Warns <ArrowPathIcon className="min-h-9 min-w-9 stroke-accent-primary h-9 w-9 animate-spin stroke-2" />
   </Header1>
   <Header5 className="mb-4 !block !justify-start gap-1 !text-left">
    Here you can view all users warns issued by users with the <code>Manage Server</code> permission.
   </Header5>
   <div className="mx-auto flex w-full mt-4 items-center justify-start overflow-auto">
    <Block className="w-full">
     <EmbedSkeleton />
    </Block>
   </div>
  </>
 );
}
